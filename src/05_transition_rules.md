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
asm IncreaseByOne

import StandardLibrary

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
asm IncreaseByUserValue

import StandardLibrary

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
asm IncreaseCounter

import StandardLibrary

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
asm CountSteps

import StandardLibrary

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

### Forall Rule
```asmeta
forall v₁ in D₁, ..., vₙ in Dₙ [with Gv₁,...,vₙ] do Rv₁,...,vₙ
```
The *forall* rule applies in parallel a given rule to all elements of a domain that satisfy a specified condition.
* *v₁,...,vₙ* are variables;
* *D₁,...,Dₙ* are terms representing the domains where *v₁,...,vₙ* take their values;
* *Gv₁,...,vₙ* is a term representing a boolean condition over *v₁,...,vₙ*;
* *Rv₁,...,vₙ* is a transition rule which contains occurrences of variables *v₁,...,vₙ*.


**Example**
```asmeta
asm ForallExample

import StandardLibrary

signature:
 domain Index subsetof Integer
 controlled value: Index -> Integer

definitions:
 domain Index = {0:10}

 main rule r_Main =
  forall $i in Index with ($i mod 2 = 0) do
    value($i) := value($i) + 1
  
default init s0:
 function value($i in Index) = 0
```
This example uses a *forall* rule to apply the same update to all even elements of the domain *Index*. For each index *$i*, the value *value($i)* is incremented by one. The rule is executed simultaneously for all elements.

### Choose Rule
```asmeta
choose v₁ in D₁, ..., vₙ in Dₙ [with Gv₁,...,vₙ] do Rv₁,...,vₙ [ifnone P]
```
The *choose* rule selects one element from a domain that satisfies a given condition and applies a rule to it. The choice is **non-deterministic**.
* *v₁,...,vₙ* are variables;
* *D₁,...,Dₙ* are terms representing the domains where *v₁,...,vₙ* take their values;
* *Gv₁,...,vₙ* is a term representing a boolean condition over *v₁,...,vₙ*;
* *Rv₁,...,vₙ* is a transition rule which  contains the free variables *v₁,...,vₙ*;
* *P* is a transition  rule. If  *P* is omitted, it is assumed `ifnone skip` as default. 

**Example**
```asmeta
asm SimpleCoffeeVendingMachine

import StandardLibrary

signature:
 enum domain Product = {ESPRESSO | CAPPUCCINO | LATTE}
 controlled available: Product -> Boolean
 controlled selected: Product

definitions:

 main rule r_Main =
  choose $p in Product with available($p) do
    selected := $p

default init s0:
 function available($p in Product) = true
 function selected = ESPRESSO
```
This example models a coffee vending machine that selects a product among the available ones. The *choose* rule non-deterministically selects one product *$p* from the domain *Product* such that *available($p)* holds, and assigns it to *selected*. Only one product is chosen at each step, even if multiple options are available.


### Macro Call Rule
```asmeta
 r [t₁,...,tₙ]
```
The *macro call* rule invokes a macro rule, allowing its execution within another rule.
* *r* is the name of the macro rule;
* *t₁,...,tₙ* are terms representing the arguments;
* *r []* is used for a macro with no  arguments. 

**Example**
```asmeta
asm CountSteps

import StandardLibrary

signature:
  monitored userchoice: Integer
  controlled counter: Integer
  out message: String

definitions:

 rule r_increase =
	par
      counter := counter + userchoice
      message := "Counter increased by " + toString(userchoice)
    endpar

 rule r_decrease =
	par
      counter := counter - userchoice
      message := "Counter decreased by " + toString(userchoice)
    endpar

  main rule r_Main = 
    if counter > 10 then
      r_increase[]
    else
      r_decrease[]
    endif

default init s0:
	function counter = 0
```
The monitored function *userchoice* represents a value provided by the environment. At each execution step, if the *userchoice* function is greater than 10, the system invokes the *r_increase* rule which increases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed increment; otherwise the system invokes the *r_decrease* rule wich decreases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed decrement. 


### Extend Rule
```asmeta
 extend D with v₁,...,vₙ do R
```
The *extend* rule adds a new element to a dynamic domain and applies a rule to it.
* *D* is the name of the abstract type-domain to be extended;
* *v₁,...,vₙ* are logical variables which are bound to the  new elements imported in *D* from the reserve;
* *R* is a transition rule. 

**Example**
```asmeta
asm CountSteps

import StandardLibrary

signature:
  monitored userchoice: Integer
  controlled counter: Integer
  out message: String

definitions:

 rule r_increase =
	par
      counter := counter + userchoice
      message := "Counter increased by " + toString(userchoice)
    endpar

 rule r_decrease =
	par
      counter := counter - userchoice
      message := "Counter decreased by " + toString(userchoice)
    endpar

  main rule r_Main = 
    if counter > 10 then
      r_increase[]
    else
      r_decrease[]
    endif

default init s0:
	function counter = 0
```
The monitored function *userchoice* represents a value provided by the environment. At each execution step, if the *userchoice* function is greater than 10, the system invokes the *r_increase* rule which increases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed increment; otherwise the system invokes the *r_decrease* rule wich decreases the controlled function *counter* by the value of *userchoice* and updates the output function *message* to reflect the performed decrement. 


### Seq Rule
```asmeta
 seq  R₁ ... Rₙ endseq
```
The *seq* rule is used to define a sequence of rule executions, ensuring that updates are applied in order.
* *R₁ ... Rₙ* are transition rules. 

**Example**
```asmeta
asm DoBySeq

import StandardLibrary

signature:
 controlled x: Integer

definitions:

 main rule r_Main =
  seq
    x := x + 1
    x := x * 2
  endseq

default init s0:
 function x = 2
```
*x* is incremented by 1, and then the result is multiplied by 2. Each update uses the result of the previous one.


### Iterate Rule
```asmeta
 iterate R enditerate
```
The *iterate* rule repeatedly executes a rule until no further updates are possible.
* *R* is a transition rule. 

> [!CAUTION]
> Up to now, the simulator does not support the *iterate* rule.


**Example**
```asmeta
asm DoBySeq

import StandardLibrary

signature:
 controlled x: Integer

definitions:

 main rule r_Main =
    iterate 
    	if (x<10) then x:= x+1 endif
    enditerate


default init s0:
 function x = 2
```
*x* is incremented by 1, until it is lower than 10. Each update uses the result of the previous one.


### Iterative-While Rule
```asmeta
 while G do R 
```
The *while* rule repeatedly executes a rule until the condition *G* is true.
* *G* is a term representing a boolean condition;
* *R* is a transition rule. 

> [!TIP]
> An *iterative-while* rule is a derived rule since it can be de ned in terms of a turbo iterate rule as follows: `while G do R ≡ iterate if G then R endif enditerate`.


**Example**
```asmeta
asm DoBySeq

import StandardLibrary

signature:
 controlled x: Integer

definitions:

 main rule r_Main =
    while (x<10) do
      x:= x+1


default init s0:
 function x = 2
```
*x* is incremented by 1, until it is lower than 10. Each update uses the result of the previous one.


### Turbo Call Rule
```asmeta
  r (t₁,...,tₙ)
```
A *turbo call* rule invokes a rule in a single step, executing all its internal computations instantaneously.
* *r* is the name of the called transition rule;
* *t₁,...,tₙ* are terms representing the arguments;
* *r ()* is used to call a rule with no  arguments.

**Example**
```asmeta
asm turboReturnRule

import StandardLibrary

signature:
	dynamic controlled value: Integer
	dynamic monitored inputA: Integer
	dynamic monitored inputB: Integer
	
definitions:

	turbo rule r_sum($x in Integer, $y in Integer) in Integer =
		result := $x + $y
			
	main rule r_Main =
		r_sum(inputA, inputB)

default init s0:
	function value = 0
```
The monitored functions *inputA* and *inputB* represent values provided by the environment. The turbo rule *r_sum* takes these inputs as parameters, computes their sum, and returns the result in a single atomic step. The main rule assigns the returned value to the controlled function *value*.


### Turbo Return Rule
```asmeta
   l<-r(t₁,...,tₙ)
```
A *turbo return* rule is a turbo rule that computes and returns a value as the result of its execution.
* *l* is either a location term or a location variable;
* *r(t₁,...,tₙ)* is a Turbo Call rule.

**Example**
```asmeta
asm turboReturnRule

import StandardLibrary

signature:
	dynamic controlled value: Integer
	dynamic monitored inputA: Integer
	dynamic monitored inputB: Integer
	
definitions:

	turbo rule r_sum($x in Integer, $y in Integer) in Integer =
		result := $x + $y
			
	main rule r_Main =
		value <- r_sum(inputA, inputB)

default init s0:
	function value = 0
```
The monitored functions *inputA* and *inputB* represent values provided by the environment. The turbo rule *r_sum* takes these inputs as parameters, computes their sum, and returns the result in a single atomic step. The main rule invokes the turbo rule *r_sum*.

### Turbo Local State Rule
```asmeta
   [dynamic] local f₁:[D₁ ->]C₁ [ Init₁ ] ...
   [dynamic] local fₙ :[Dₙ ->]Cₙ [ Initₙ ]
	body
```
A *turbo local state* rule defines a turbo rule that uses local state variables during its execution.
* *Init₁,...,Initₙ* and *body* are transition rules;
* *[dynamic] local f₁:[D₁ ->]C₁* are declarations of local dynamic functions (see [DynamicFunction](#FDDynamFun) declaration).

### Try-Catch Rule
```asmeta
   try P catch l₁,...,lₙ Q
```
The *try-catch* rule executes a rule and handles possible failures by specifying an alternative rule.
* *P* and *Q* are transition rules;
* *l₁,...,lₙ* are either location terms or location variables.

### Term As Rule
```asmeta
   v
```
A *term as rule* allows the use of  either a function term or a variable term where a rule is expected.
* *v* is either a rule variable or a  function term.



