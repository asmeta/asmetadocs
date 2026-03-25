# Structure of an ASMETA model

An ASMETA model is structured into four sections: a header, a body, a main rule, and an initialization.

This example defines a simple ASMETA model of a counter that ranges from 0 to 60.

```asmeta
asm counter 

//Header
import StandardLibrary 

signature:
 domain Sixty subsetof Integer
 controlled count: Integer

//Body
definitions:
domain Sixty = {0 : 60}

macro rule r_Increment =
 count := count + 1

//Main rule
main rule r_Main =
 if count = 60 then
   count := 0
 else
  r_Increment[]
 endif

//Initialization
default init s0:
 function count = 0
```

In the following, we analyze each component of the ASMETA model in detail.

## ASMETA declaration

```asmeta
[asyncr] asm name
```
where *name* is the name of the ASMETA model. It must be equal to the name of the file (as *name.asm*). The keyword **asyncr** specifies if the ASM is an *asynchronous* multi-agent or not. If omitted, the ASMETA model is considered a *synchronous* multi-agent ASM.


## Header

### Import/Export
```asmeta
[ import m1 [( id11,...,id1h1 )]
 ...
 import mk [( idk1,...,idkhk )]
]
[ export id1,...,ide ]  or   [ export * ]
``` 
* *m1,...,mk* are the names of the imported modules</br> 
* *idi1,...,idihi* are names for domains, functions and rules which are imported from module mi (if they are omitted all the content of the export clause of mi is imported);
* id1,...,ide are names for domains, functions and rules which can be exported from the ASM.

  **export*** denotes that all functions and rules of the ASM can be exported; 

 ### Signature
```asmeta
signature:
 [ dom_decl1 ... dom_decln ]
 [ fun_decl1 ... fun_declm ]
```
* *dom_decl1,...,dom_decln* are declarations of domains used in the ASM (see section [Domain declarations](02_domain_declaration.md));
* *fun_decl1,...,fun_declm* are declarations of functions used in the ASM (see section [Function declarations](03_function_declarations.md)).


### Body
```asmeta
definitions:
```
#### Domain Definitions
```asmeta
[ domain D1 = Dterm1 …
domain Ds = Dterms ]
```

* *D1,...,Dd* are names of static concrete domains declared in the signature (see [Header](#headerASM)); 
* *Dterm1,...,Dtermd* are terms (see section [Terms](#terms)).

#### Function Definitions
```asmeta
[ function F1 [( p11 in d11,…,p1k1 in d1k1 )]= Fterm1 …
function Ff [( pf1 in df1,…,pfkf in dfkf )]= Ftermf ]
```

* *F1,...,Ff* are names of static or derived functions declared in the signature (see [Header](#headerASM));* 
*  *pij* are variables which specify the formal parameters of the function *Fi*, and *dij* are the domains where *pij* take their value;
*  *Fterm1,...,Ftermf* are terms (see section [Terms](#terms)).
  
#### Macro Rule Definitions
```asmeta
[ [macro] rule R1 [( x11 in b11,…,x1k1 in b1k1 )] = rule1 …
[macro] rule Rr [( xr1 in br1,…,xrkr in brkr )] = ruler ]
```
* *R1,...,Rr* are names for macro rules;
* *xij* are variables which specify the formal parameters of the macro rule *Ri*, and *bij* are the domains where *xij* take their value;
* *rule1,...,ruler* are transition rules (see section [Transition rules](#rules));
    
#### Turbo Rule Definitions
```asmeta
[ turbo rule TR1 [( x11 in b11,…,x1k1 in b1k1 )] [in b1] = rule1 …
turbo rule TRr [( xr1 in br1,…,xrkr in brkr )] [in bx]= ruler ]
```

* *TR1,...,TRr* are names for turbo rules;
* *xij* are variables which specify the formal parameters of the turbo rule *TRi*, and *bij* are the domains where *xij* take their value;
* *bi* are domains where the return values of turbo rules (with return value) range;
* *rule1,...,ruler* are transition rules (see section [Transition rules](#rules)).
  
#### Invariant Definitions
```asmeta
[ invariant I1 over id11,…,id1s1 : term1 …
invariant Iv over idv1,…,idvsv : termv ]
```
* *I1,...,Iv* are names for invariants;
* *idij* are names of domains, functions (when functions are overloaded, it is necessary to indicate their domain, as in f(d)with f the function name and d the name of the function domain), and rules constrained by the invariants;
* *termi* is a term (see section [Terms](#terms)) representing the boolean-valued expression of the constraint.

#### Temporal Logic Properties
```asmeta
[ TLPROP name_1 over id1i,…,id1n: term1 ...
 TLPROP name_i over idii,…,idin: termi ]
```
* *name_1,...,name_i* are names for the properites;
* *idij* are names of domains, functions (when functions are overloaded, it is necessary to indicate their domain, as in f(d)with f the function name and d the name of the function domain), and rules constrained by the property;
* *termi* is a term (see section [Terms](#terms)) representing the boolean-valued expression of the constraint.
* *TLPROP* is one of:
  * CTL properties:
  ```asmeta
  [ CTLSPEC | ctlspec ]
  ```
  * LTL properties:
  ```asmeta
  [ LTLSPEC | ltlspec ]
  ```
  * A justice constraint consists of a formula *f*, which is assumed to be true infinitely often in all the fair paths:
  ```asmeta
  [ JUSTICE | justice ]
  ```
  * It indicates a justice constraint as well (in NuSMV it has been kept for backward compatibility):
  ```asmeta
  [ FAIRNESS | fairness ]
  ```
  * A compassion constraint consists of a pair of formulas (p,q); if property p is true infinitely often in a fair path, then also formula q has to be true infinitely often in the fair path:
  ```asmeta
  [ COMPASSION | compassion ]
  ```
  * Invariants (assumptions about the state):
  ```asmeta
  [ INVAR | invar ]
  ```

 
### Main
```asmeta
main rule R = rule1
```
* *R* is the name of the main rule; 
* *rule1* is a transition rule (see section [Transition rules](#rules)).
* If the ASM has no main rule, as a default, the ASM starts executing in parallel the agent programs as specified by the agent initialization clauses (see [initializations](#initASM)) in the initial state.

### Initialization
```asmeta
[ init I1 :
      [  domain D11 = Dterm11  ...
         domain D1n1 = Dterm1n1
      ]
      [  function F11 [(  p11 in d11,...,p1s1 in d1s1 )]= Fterm11 ...
         function F1m1 [( pm11 in dm11,...,pm1sm1 in dm1sm1 )]= Fterm1m1
      ]
      [  agent A11 : r11  ...
         agent A1u1 : r1u1
       ]
  ...
]
default init Id :
      [  domain Dd1 = Dterm11 ...
         domain Ddnd = Dtermdnd
      ]
      [  function Fd1 [( p11 in d11,...,p1s1 in d1s1 )]= Ftermd1 ...
         function Fdmd [( pmd1 in dmd1,...,pmdsmd in dmdsmd )]= Ftermdmd
      ]
      [
         agent Ad1 : rd1 ...
         agent Adud : rdud
      ]
[ ...
   init It :
       [ domain Dt1 = Dtermt1 ...
         domain Dtnt = Dtermtnt
       ]
       [  function Ft1 [( p11 in d11,...,p1s1 in d1s1 )]= Ftermt1 ...
          function Ftmt[( pmt1 in dmt1,...,pmtsmt in dmtsmt )] = Ftermtmt
       ]
       [  agent At1 : rt1 ...
          agent Atut: rtut
       ]
]
```

* *I1,...,Id,...,It* are names for the initial states of the ASM;
* the default initial state *Id* is compulsory; 
* *Dij* are names of dynamic concrete domains, already declared in the signature (see [Header](#headerASM)) and initialized in the initial state *Ii*;
* *Fij* are names of dynamic functions, already declared in the signature (see [Header](#headerASM)) and initialized in the initial state *Ii*;
* *pij* are variable terms which specify the formal parameters of the corresponding function, and *dij* are the domains where *pij* take their value; 
* *Ftermij* e *Dtermij* are terms (see section [Terms](#terms)) specifying the initial value for the function *Fij* and domain *Dij*;
* *Aij* and *rtut* are agent domains (concrete sub-domains of the Agent type-domain) and rules assigned as *programs* to the agents, respectively.  If no agent initialization clause is specified, by default, the ASM is assumed to be *single-agent* and the program and the identifier of
 the unique agent are respectively the ASM's *main rule* (see [Main rule](#Mainrule)) and the ASM's name.

<!--
| **Model element** | **Concrete syntax** |
| --- | --- |
| **Asm declaration**  | [ <span style="color: red;">asyncr</span> ] <span style="color: red;">asm</span> *name* |
| |where:</br> - *name* is the name of the ASM. It must be equal to the name of the ASM file (as name.asm) The keyword **asyncr** specifies if the ASM is an *asynchronous* multi-agent or not. If omitted, the ASM is considered a *synchronous* multi-agent ASM. |
| **Header** | [ <span style="color: red;">`import`</span> *m1* [**(** id11,...,id1h1 **)**] **...**</br>    <span style="color: red;">import</span> mk [**(** idk1,...,idkhk **)**]] </br> [ <span style="color: red;">export</span> id1,...,ide ] or [ <span style="color: red;">export *</span>] |
| |where:</br> -*m1,...,mk* are the names of the imported modules</br> - idi1,...,idihi are names for domains, functions and rules which are imported from module mi (if they are omitted all the content of the export clause of mi is imported);</br>- id1,...,ide are names for domains, functions and rules which can be exported from the ASM. **export*** denotes that all functions and rules of the ASM can be exported; |
||**`signature:`** </br> [ dom_decl1 ... dom_decln ] </br> [ fun_decl1 ... fun_declm ] |
|| - dom_decl1,...,dom_decln are declarations of domains used in the ASM (see section [Domain declarations](02_domain_declaration.md));</br> - fun_decl1,...,fun_declm are declarations of functions used in the ASM (see section [Function declarations](03_function_declarations.md)). |
| **Body** | **`definitions:`**|
|domain definitions|[**`domain`** D1 **=** Dterm1 ... </br>**`domain`** Ds **=** Dterms ]  
|function definitions|[ **`function`** F1 [**(** p11 **`in`** d11,...,p1k1 **in** d1k1 **)**]**=** Fterm1 ...</br>&nbsp;&nbsp;**`function`** Ff [**(** pf1 **`in`** df1,...,pfkf **in** dfkf **)**]**=** Ftermf]|
|macro rule definitions|[ [**`macro`**] **`rule`** R1 [**(** x11 **in** b11,...,x1k1 **in** b1k1 **)**] = rule1 ...</br>&nbsp;&nbsp; [**`macro`**] **`rule`** Rr [**(** xr1 **in** br1,...,xrkr **in** brkr **)**] = ruler]|
|turbo rule definitions|[ **`turbo rule`** TR1 [**(** x11 **in** b11,...,x1k1 **in** b1k1 **)**] [ **`in`** b1] = rule1 ...</br> **`turbo rule`** TRr [**(** xr1 **in** br1,...,xrkr **in** brkr **)**] [**in**bx]= ruler ]|
|invariant definitions|[ **`invariant`** I1 **`over`** id11,...,id1s1 : term1 ... **`axiom`** Iv **`over`** idv1,...,idvsv : termv ]| 
|| where:</br> - D1,...,Dd are names of static concrete domains declared in the signature (see [Header](#headerASM)); - F1,...,Ff are names of static or derived functions declared in the signature (see [Header](#headerASM)); - Dterm1,...,Dtermd and Fterm1,...,Ftermf are terms (see section [Terms](#terms)); - pij are variables which specify the formal parameters of the function Fi, and dij are the domains where pij take their value; - R1,...,Rr TR1,...,TRr are names for transition rules (see section [Transition rules](#rules)); - I1,...,Iv are names for axioms - xij are variables which specify the formal parameters of the rule Ri, and bij are the domains where pij take their value; - bi are domains where return values of turbo rules (with return value) range; - rule1,...,ruler are transition rules (see section [Transition rules](#rules)); - idij are names of domains, functions* and rules constrained by the axioms; - termi is a term (see section [Terms](#terms)) representing the boolean-valued expression of the constraint. *When functions are overloaded it is necessary to indicate their domain, as in f(d)with f the function name and d the name of the function domain. |
|TL invariants| [ *TLPROP* name<sub>i</sub>**`over`** id<sub>ii</sub>,...,id<sub>in</sub>: term<sub>i</sub>]* |
||where  *TLPROP* is one of: |
|| [**`CTLSPEC`** \| **`ctlspec`**]: for CTL specifications |
|| [**`LTLSPEC`** \| **`ltlspec`**]: for LTL specifications |
|| [**`JUSTICE`** \| **`justice`**]: A justice constraint consists of a formula f, which is assumed to be true infinitely often in all the fair paths
|| [**`FAIRNESS`** \| **`fairness`**]:  It indicates a justice constraint as well (in NuSMV it has been kept for backward compatibility)
|| [**`COMPASSION`** \| **`compassion`**]:  A compassion constraint consists of a pair of formulas (p,q); if property p is true infinitely often in a fair path, then also formula q has to be true infinitely often in the fair path
|| [**`INVAR`** \| **`invar`**]: Invariants (assumption abut the state)
|**Main**|**rule** [ **main rule** R **=** rule ]
|| where: - R is the name of the main rule; - rule is a transition rule (see section [Transition rules](#rules)); If the ASM has no main rule, as default, the ASM is started executing in parallel the agent programs as specified by the agent initialization clauses (see [initializations](#initASM)) in the initial state.
|**Inizializations**| [ **init** I1 **:** </br> [ **domain** D11 **=** Dterm11 ... **domain** D1n1 **=** Dterm1n1]</br> [ **function** F11 [**(** p11 **in** d11,...,p1s1 **in** d1s1 **)**] = Fterm11 ... **function** F1m1 [**(** pm11 **in** dm11,...,**pm1**sm1** **in** dm1**sm1** **)**]**=** Fterm1m1] </br> [**agent** A11 **:** r11 **... agent**A**1u1** **:** r**1u1**] ... ] </br> </br> **default init** Id **:** </br> [ **domain** Dd1 **=** Dterm11 ... **domain** Ddnd **=** Dtermdnd ] [ **function** Fd1 [**(** p11**in** d11**,****...,**p1s1 **in** d1s1 **)**]**=** Ftermd1 ... **function** Fdmd [**(** pmd1 **in** dmd1**,****...,**pmd**smd** **in** dmd**smd** **)**]**=** Ftermdmd]</br>||[ **agent** Ad1 **:** rd1... **agent** A**dud** **:** r**dud** ] [ ... **init** It **:** [ **domain** Dt1 **=** Dtermt1 ... **domain** Dtnt **=** Dtermtnt ] [ **function** Ft1 [**(** p11**in** d11**,****...,**p1s1 **in** d1s1 **)**]**=** Ftermt1 ... **function** Ftmt[**(** pmt1**in** dmt1,...,pmt**smt** **in** dmt**smt** **)**] **=** Ftermtmt ] [ **agent**A**t1** **:** rt1**...** **agent**A**tut****:** r**tut**]]
||where: - I1,...,Id,...,It are names for the initial states of the ASM; the default initial state Id is compulsory; - Dij are names of dynamic concrete domains - already declared in the signature (see Header) - initialized in the initial state Ii; - Fij are names of dynamic functions - already declared in the signature (see [Header](#headerASM)) - initialized in the initial state Ii; - pij are variable terms which specify the formal parameters of the corresponding function and dij are the domains where pij take their value; - Ftermij e Dtermij are terms (see section [Terms](#terms)) specifying the intial value for the function Fij and domain Dij; - Aij and rij are agent domains (concrete sub-domains of the Agent type-domain) and rules* assigned as *programs* to the agents, respectively. 

*Note that, rij is a macro-call
 rule (see section [Transition rules](#rules)), i.e. the invocation of a named rule declared
 in the ASM or imported from an other module.
 If no agent initialization clause is specified, as default the ASM is
 assumed *single-agent* and the program and the identifier of
 the unique agent are respectively the ASM's *main rule* (see [Main rule](#Mainrule)) and the ASM's name.
-->

## ASMETA module

A lightweight notion of *module* is also supported. An ASMETA module is an ASM without a main rule and without initialization. 
We write a module in the same way as ASMs, with the keyword **asm** replaced by the keyword **module**.

```asmeta
module name
```
where *name* is the name of the ASMETA module. It must be equal to the name of the ASMETA file (as *name.asm*).

This example defines a simple ASMETA model of a counter that ranges from 0 to 60 by introducing a module.

```asmeta
module counterModule 

//Header
import StandardLibrary 

signature:
 domain Sixty subsetof Integer
 controlled count: Integer

//Body
definitions:
domain Sixty = {0 : 60}

macro rule r_Increment =
 count := count + 1
```

```asmeta
asm counter 

//Header
import counterModule 

signature:
 
//Body
definitions:

//Main rule
main rule r_Main =
 if count = 60 then
   count := 0
 else
  r_Increment[]
 endif

//Initialization
default init s0:
 function count = 0
```

<!--
| | **module** name where name is the name of the ASM module. It must be equal to the name of the ASM file (as name.asm). |
| --- | --- |
| **Header** | [ **import** m1 [**(** id11,...,id1h1 **)**] **...** **import** mk [**(** idk1,...,idkhk **)**] ] [ **export** id1,...,ide ] or [ **export *** ] **signature** **:** [ dom_decl1 ... dom_decln ] [ fun_decl1 ... fun_declm ] where: - m1,...,mk are the names of the imported modules - idi1,...,idihi are names for domains, functions and rules which are imported from module mi (if they are omitted all the content of the export clause of mi is imported); - id1,...,ide are names for domains, functions and rules which can be exported from the module. **export*** denotes that all functions and rules of the module can be exported; - dom_decl1,...,dom_decln are declarations of domains used in the ASM (see section [Domain declarations](#domdecl)); - fun_decl1,...,fun_declm are declarations of functions used in the ASM (see section [Function declarations](#funDecl)). |
| **Body** | **definitions :** [ **domain** D1 **=** Dterm1 ... **domain**Dd **=** Dtermd ] [ **function** F1 [**(** p11 **in** d11,...,p1k1 **in** d1k1 **)**]**=** Fterm1 ... **function** Ff [**(** pf1 **in** df1,...,pfkf **in** dfkf **)**]**=** Ftermf ] [ **rule** [**macro**]R1 [**(** x11 **in** b11,...,x1k **in** b1k1 **)**] = rule1 ... **rule** [**macro**] Rr [**(** xr1 **in** br1,...,xrkr **in** brkr **)**] = ruler ] [ **axiom** **over** id11,...,id1s1 : term1 ... **axiom over**idv1,...,idvsv : termv ] where: - D1,...,Dd are names of static concrete domains declared in the signature (see [Header](#headerASM)); - F1,...,Ff are names of static or derived functions declared in the signature (see [Header](#headerASM)); - Dterm1,...,Dtermd and Fterm1,...,Ftermf are terms (see section [Terms](#terms)); - pij are variables which specify the formal parameters of the function Fi, and dij are the domains where pij take their value; - R1,...,Rr are names for transition rules (see section [Transition rules](#rules)); - xij are variables which specify the formal parameters of the rule Ri, and bij are the domains where pij take their value; - rule1,...,ruler are transition rules (see section [Transition rules](#rules)); - idij are names of domains, functions* and rules constrained by the axioms; - termi is a term (see section [Terms](#terms)) representing the boolean-valued expression of the constraint. *When functions are overloaded it is necessary to indicate their domain, as in f(d) with f is the function name and d is the name of the function domain. |
-->

# ASMETA Standard Libraries
In ASMETA, libraries are predefined ASM modules that can be imported into your models to reuse common definitions and extend the language with additional functionality.
They typically contain:
* domains
* functions
* rules
Using libraries helps avoid redefining standard elements and simplifies model development.

### StandardLibrary.asm

This is the core library and is almost always required.
It provides:
* standard domains (e.g., Integer, Boolean)
* basic operators (arithmetic and logical)
* commonly used functions

### LTLLibrary.asm and CTLLibrary.asm

These libraries are used for formal verification with the model checker:
* LTL (Linear Temporal Logic): used to express properties over execution traces
* CTL (Computation Tree Logic): used to express properties over branching execution paths
They allow you to specify temporal properties.

### TimeLibrary.asm and TimeLibrarySimple.asm

TimeLibrary introduces the concept of time into ASMETA models.
It provides:
* time-related variables
* functions for handling time
* support for modeling time-dependent behavior

TimeLibrarySimple is a simplified version of TimeLibrary.
It offers:
* basic time-related features
* easier usage compared to the full TimeLibrary
* Note: this library is considered experimental.

All the libraries, if necessary, must be imported into the ASMETA model:
```asmeta
import StandardLibrary
import LTLLibrary
import CTLLibrary
import TimeLibrary
import TimeLibrarySimple
```

