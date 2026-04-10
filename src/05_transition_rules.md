# Transition Rules

In a given state, a transition rule of an ASM produces for each variable assignment an update set for some dynamic functions of the signature. We classify transition rules in
two groups: *basic rules* and *turbo rules*. The former are simply rules, like the *skip rule* and the *update rule*, while the latter are rules, like the *sequence rule* and the *iterate rule*, introduced to support practical composition and structuring principles of the ASMs. Other rule schemes are derived from the basic and the turbo rules.

### Skip Rule
```asmeta
skip
```
The *skip* rule, when executed, does not update any function, and the system state remains unchanged.

### Update Rule
```asmeta
l:=t
```
The *update* rule assigns a new value to a function, modifying the system state.
* *t* is a generic term;
* *l* can be either a location term *f(t1,...,tn)* or a location variable (like `$x`).      

**Example**
```asmeta
signature:
  controlled counter: Integer

definitions:
  main rule r_Main =
    counter := counter + 1

default init s0:
	function counter = 0
```
The value of *counter* function is incremented by 1 at each step.

### Block Rule
```asmeta
par
  R1 R2 ... Rn
endpar
```
* *R1,R2,...,Rn* are transition rules executed simultaneously (in parallel). 

**Example**
This model describes a system in which the value of a controlled counter is updated based on an external input. 
```asmeta
signature:
  monitored userchoice: Integer
  controlled counter: Integer
  out message: String

definitions:
  main rule r_Main = 
    par
      counter := counter + userchoice
      message := "Counter increased by " + toString(userchoice)
    endpar

default init s0:
	function counter = 0
```
The monitored function *userchoice* represents a value provided by the environment. At each execution step, the system increases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed increment.

### Conditional Rule
```asmeta
if G then Rthen [else Relse] endif
```  
The *conditional* rule selects which rule to execute based on a boolean condition.
* *G* is a term representing a Boolean condition;
* *Rthen* and *Relse* are transition rules. If *Relse* is omitted, it is assumed `else skip` as default.

**Example**
These models describe a system in which the value of a controlled counter is updated based on an external input. 
```asmeta
signature:
  monitored userchoice: Integer
  controlled counter: Integer
  out message: String

definitions:
  main rule r_Main = 
    if counter > 10 then
      par
        counter := counter + userchoice
        message := "Counter increased by " + toString(userchoice)
      endpar
    endif

default init s0:
	function counter = 0
```
The monitored function *userchoice* represents a value provided by the environment. At each execution step, if the *userchoice* function is greater than 10, the system increases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed increment.

```asmeta
signature:
  monitored userchoice: Integer
  controlled counter: Integer
  out message: String

definitions:
  main rule r_Main = 
    if counter > 10 then
      par
        counter := counter + userchoice
        message := "Counter increased by " + toString(userchoice)
      endpar
    else
      par
        counter := counter - userchoice
        message := "Counter decreased by " + toString(userchoice)
      endpar
    endif

default init s0:
	function counter = 0
```
The monitored function *userchoice* represents a value provided by the environment. At each execution step, if the *userchoice* function is greater than 10, the system increases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed increment; otherwise the system decreases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed decrement.

### Case Rule
```asmeta
switch t
	case t₁ : R₁ ...
	case tₙ : Rₙ
	[otherwise Rₙ₊₁] endswitch
```
The *case* rule selects one rule among multiple alternatives based on the value of a term *t*.
* *t,t₁,...,tₙ* are terms;
* *R₁,...,Rₙ,Rₙ₊₁* are transition rules. If *Rₙ₊₁* is omitted, it is assumed "**otherwise  skip**" as default.

**Examples**
```asmeta
asm TrafficLight

import StandardLibrary

signature:
 enum domain Light = {RED | YELLOW | GREEN}
 controlled currentLight: Light

definitions:

 main rule r_Main =
  switch currentLight
    case RED:
      currentLight := GREEN
    case GREEN:
      currentLight := YELLOW
    case YELLOW:
      currentLight := RED
  endswitch

default init s0:
 function currentLight = RED
```
This example models the behavior of a traffic light. Depending on the current light value, the switch rule selects the appropriate transition: from *RED* to *GREEN*, from *GREEN* to *YELLOW*, and from *YELLOW* to *RED*, thus forming a continuous cycle of states.

```asmeta
asm SimpleMode

import StandardLibrary

signature:
 enum domain Mode = {AUTO | MANUAL | OFF}
 controlled systemMode: Mode

definitions:

 main rule r_Main =
  switch systemMode
    case AUTO:
      systemMode := MANUAL
    case MANUAL:
      systemMode := OFF
    otherwise
      systemMode := AUTO
  endswitch

default init s0:
 function systemMode = AUTO
```
This example shows how the switch rule selects behavior based on the current mode. If no case matches, the otherwise branch ensures a default transition, keeping the system in a valid state.

### Let Rule
```asmeta
let( v₁=t₁,  ..., vₙ=tₙ ) in Rv₁,...,vₙ endlet
```
The *let* rule introduces local variables that can be used within a rule for temporary computations.
* *v₁,...,vₙ* are variables;
* *t₁,...,tₙ* are terms;
* *Rv₁,...,vₙ* is a transition rule which contains occurrences of variables *v₁,...,vₙ*.

**Example**
```asmeta
asm LetExample

import StandardLibrary

signature:
 controlled x: Integer
 controlled y: Integer

definitions:

 main rule r_Main =
  let ($sum = x + y) in
    x := $sum
  endlet

default init s0:
 function x = 2
 function y = 3
```
This example uses a let rule to define a temporary value *sum* as the sum of *x* and *y*. The variable *sum* is local to the rule and is used to update *x*.

## Reference Card

| **Model element** | **Concrete syntax** |
| --- | --- |
| **LetRule** | **`let(`** v1**=**t1,  ..., vn**=**tn **)** **`in`** Rv1,...,vn **`endlet`**  where:  - v1,...,vn are variables.  - t1,...,tn are terms.   - Rv1,...,vn is a transition rule which  contains occurrences of variables v1,...,vn. |
| **ForallRule** | **forall** v1 **in** D1, ..., vn **in** Dn **with** Gv1,...,vn **do** Rv1,...,vn  where:  - v1,...,vn are variable.   - D1,...,Dn are terms representing the domains where v1,...,vn take their values.     - Gv1,...,vn is a term representing a boolean condition over v1,...,vn.      - Rv1,...,vn is a transition rule which  contains occurrences of variables v1,...,vn. |
| **ChooseRule** | **`choose`** v1 **`in`** D1, ..., vn **`in`** Dn [**`with`** Gv1,...,vn] **`do`** Rv1,...,vn [ **`ifnone`** P ]  
||where:  - v1,...,vn are variables.     - D1,...,Dn are terms representing the  domains where v1,...,vn take their values.   - Gv1,...,vn is a term representing a boolean condition over v1,...,vn.   - Rv1,...,vn is a transition rule which  contains the free variables v1,...,vn.      - P is a transition  rule. If  P is omitted it is assumed "**ifnone** **skip**" as default. |
| **MacroCallRule** | r**[**t1,...,tn**]**  where:  - r is the name of the macro.   - t1,...,tn are terms representing the arguments.  r **[]**  is used for a macro with no  arguments. |
| **ExtendRule** | **extend** D **with** v1,...,vn **do** R  where:  - D is the name of the abstract type-domain to be extended.  - v1,...,vn are logical variables which are bound to the  new elements imported in D from the reserve      - R is a transition rule. |
| **SeqRule** | **seq**  R1 R2 ... Rn **endseq**  where R1,R2,...,Rn are transition rules. |
| **IterateRule** | **iterate** R **enditerate**  where R is a transition rule. |
| **IterativeWhileRule** | **while** G **do** R      where:  - G is a term representing a boolean condition.    - R is a transition rule. |
| **TurboCallRule** | **`r(t1,...,tn)`**  where:  - r is the name of the called transition rule.   - t1,...,tn are terms representing the arguments.  r**(****)** is used to call a rule with no  arguments. |
| **RecursiveWhileRule** | **recwhile**  G**do** R  where G is a term representing a boolean condition and R is a transition rule. |
| **TurboLocalStateRule** | [**dynamic**] **local** f1 **:**[D1 **->**]C1 **[** Init1 **]**  ...  [**dynamic**] **local** fk **:**[Dk **->**]Ck **[** Initk **]**  body  where:  - Init1,...,Initkand body  are transition rules.      - [**dynamic**] **local** fi **:**[Di **->**]Ci are declarations of local dynamic functions (see [DynamicFunction](#FDDynamFun) declaration). |
| **TryCatchRule** | **try** P **catch** l1,...,ln Q  where:   - P and Q are transition rules.      - l1,...,ln are either location terms or location  variables. |
| **TurboReturnRule** |  **`l<-r(t1,...,tn)`**  where:  - l is either a location term or a location variable.   - r(t1,...,tn) is a TurboCall rule. |
| **TermAsRule** | v  where v is either a rule variable or a  function term. This rule works as a form of wrapper to allow the use of  either a function term or a variable term where a rule is expected. |

