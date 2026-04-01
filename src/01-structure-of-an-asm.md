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
[ import m₁ [( id₁₁,...,id₁ₕ₁ )]
 ...
 import mₖ [( idₖ₁,...,idₖₕₖ )]
]
[ export id₁,...,idₑ ]  or   [ export * ]
``` 
* *m₁,...,mₖ* are the names of the imported modules</br> 
* *idᵢ₁,...,idᵢₕᵢ* are names for domains, functions, and rules which are imported from module mᵢ (if they are omitted, all the content of the export clause of mi is imported);
* id₁,...,idₑ are names for domains, functions, and rules which can be exported from the ASM.

  **export*** denotes that all functions and rules of the ASM can be exported; 

 ### Signature
```asmeta
signature:
 [ dom_decl₁ ... dom_declₙ ]
 [ fun_decl₁ ... fun_declₘ ]
```
* *dom_decl₁,...,dom_declₙ* are declarations of domains used in the ASM (see section [Domain declarations](02_domain_declaration.md));
* *fun_decl₁,...,fun_declₘ* are declarations of functions used in the ASM (see section [Function declarations](03_function_declarations.md)).


### Body
```asmeta
definitions:
```
#### Domain Definitions
```asmeta
[ domain D₁ = Dterm₁ …
domain Dₙ = Dtermₙ ]
```

* *D₁,...,Dₙ* are names of static concrete domains declared in the signature (see [Header](#headerASM)); 
* *Dterm₁,...,Dtermₙ* are terms (see section [Terms](#terms)).

#### Function Definitions
```asmeta
[ function F₁ [( p₁₁ in d₁₁,…,p₁ₖ₁ in d₁ₖ₁ )]= Fterm₁ …
function Fₙ [( pₙ₁ in dₙ₁,…,pₙₖₙ in dₙₖₙ )]= Ftermₙ ]
```

* *F₁,...,Fₙ* are names of static or derived functions declared in the signature (see [Header](#headerASM));* 
*  *pᵢⱼ* are variables which specify the formal parameters of the function *Fᵢ*, and *dᵢⱼ* are the domains where *pᵢⱼ* take their value;
*  *Fterm₁,...,Ftermₙ* are terms (see section [Terms](#terms)).
  
#### Macro Rule Definitions
```asmeta
[ [macro] rule R₁ [( x₁₁ in b₁₁,…,x₁ₖ₁ in b₁ₖ₁ )] = rule₁ …
[macro] rule Rₙ [( xₙ₁ in bₙ₁,…,xₙₖₙ in bₙₖₙ )] = ruleₙ ]
```
* *R₁,...,Rₙ* are names for macro rules;
* *xᵢⱼ* are variables which specify the formal parameters of the macro rule *Rᵢ*, and *bᵢⱼ* are the domains where *xᵢⱼ* take their value;
* *rule₁,...,ruleₙ* are transition rules (see section [Transition rules](#rules));
    
#### Turbo Rule Definitions
```asmeta
[ turbo rule TR₁ [( x₁₁ in b₁₁,…,x₁ₖ₁ in b₁ₖ₁ )] [in b₁] = rule₁ …
turbo rule TRₙ [( xₙ₁ in bₙ₁,…,xₙₖₙ in bₙₖₙ )] [in bₓ]= ruleₙ ]
```

* *TR₁,...,TRₙ* are names for turbo rules;
* *xᵢⱼ* are variables which specify the formal parameters of the turbo rule *TRᵢ*, and *bᵢⱼ* are the domains where *xᵢⱼ* take their value;
* *bᵢ* are domains where the return values of turbo rules (with return value) range;
* *rule₁,...,ruleₙ* are transition rules (see section [Transition rules](#rules)).
  
#### Invariant Definitions
```asmeta
[ invariant I₁ over id₁₁,…,id₁ₛ₁ : term₁ …
invariant Iₙ over idₙ₁,…,idₙₛₙ : termₙ ]
```
* *I₁,...,Iₙ* are names for invariants;
* *idᵢⱼ* are names of domains, functions (when functions are overloaded, it is necessary to indicate their domain, as in f(d)with f the function name and d the name of the function domain), and rules constrained by the invariants;
* *term₁,...,termₙ* is a term (see section [Terms](#terms)) representing the boolean-valued expression of the constraint.

#### Temporal Logic Properties
```asmeta
[ TLPROP name₁ over id₁ᵢ,…,id₁ₙ: term₁ ...
 TLPROP nameₙ over idₙₙ,…,idₙₘ: termₙ ]
```
* *name₁,...,nameᵢ* are names for the properites;
* *idₙⱼ* are names of domains, functions (when functions are overloaded, it is necessary to indicate their domain, as in *f(d)* with f the function name and d the name of the function domain), and rules constrained by the property;
* *term₁,...,termₙ* are terms (see section [Terms](#terms)) representing the boolean-valued expression of the constraint.
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
main rule R = rule₁
```
* *R* is the name of the main rule; 
* *rule₁* is a transition rule (see section [Transition rules](#rules)).
* If the ASM has no main rule, as a default, the ASM starts executing in parallel the agent programs as specified by the agent initialization clauses (see [initializations](#initASM)) in the initial state.

### Initialization
```asmeta
[ init I₁ :
      [  domain D₁₁ = Dterm₁₁  ...
         domain D₁ₙ₁ = Dterm₁ₙ₁
      ]
      [  function F₁₁ [(  p₁₁ in d₁₁,...,p₁ₛ₁ in d₁ₛ₁ )]= Fterm₁₁ ...
         function F₁ₘ₁ [( pₘ₁₁ in dₘ₁₁,...,pₘ₁ₛₘ₁ in dₘ₁ₛₘ₁ )]= Fterm₁ₘ₁
      ]
      [  agent A₁₁ : r₁₁  ...
         agent A₁ᵤ₁ : r₁ᵤ₁
       ]
  ...
]
default init Iₓ :
      [  domain Dₓ₁ = Dterm₁₁ ...
         domain Dₓₙₓ = Dtermₓₙₓ
      ]
      [  function Fₓ₁ [( p₁₁ in d₁₁,...,p₁ₛ₁ in d₁ₛ₁ )]= Ftermₓ₁ ...
         function Fₓₘₓ [( pₘₓ₁ in dₘₓ₁,...,pₘₓₛₘₓ in dₘₓₛₘₓ )]= Ftermₓₘₓ
      ]
      [
         agent Aₓ₁ : rₓ₁ ...
         agent Aₓᵤₓ : rₓᵤₓ
      ]
[ ...
   init Iₜ :
       [ domain Dₜ₁ = Dtermₜ₁ ...
         domain Dₜₙₜ = Dtermₜₙₜ
       ]
       [  function Fₜ₁ [( p₁₁ in d₁₁,...,p₁ₛ₁ in d₁ₛ₁ )]= Ftermₜ₁ ...
          function Fₜmₜ[( pₘₜ₁ in dₘₜ₁,...,pₘₜₛₘₜ in dₘₜₛₘₜ )] = Ftermₜₘₜ
       ]
       [  agent Aₜ₁ : rₜ₁ ...
          agent Aₜᵤₜ: rₜᵤₜ
       ]
]
```

* *I₁,...,Iₓ,...,Iₜ* are names for the initial states of the ASM;
* the default initial state *Iₓ* is compulsory; 
* *Dᵢⱼ* are names of dynamic concrete domains, already declared in the signature (see [Header](#headerASM)) and initialized in the initial state *Iᵢ*;
* *Fᵢⱼ* are names of dynamic functions, already declared in the signature (see [Header](#headerASM)) and initialized in the initial state *Iᵢ*;
* *pᵢⱼ* are variable terms which specify the formal parameters of the corresponding function, and *dᵢⱼ* are the domains where *pᵢⱼ* take their value; 
* *Ftermᵢⱼ* e *Dtermᵢⱼ* are terms (see section [Terms](#terms)) specifying the initial value for the function *Fᵢⱼ* and domain *Dᵢⱼ*;
* *Aᵢⱼ* and *rtut* are agent domains (concrete sub-domains of the Agent type-domain) and rules assigned as *programs* to the agents, respectively.  If no agent initialization clause is specified, by default, the ASM is assumed to be *single-agent* and the program and the identifier of
 the unique agent are respectively the ASM's *main rule* (see [Main rule](#Mainrule)) and the ASM's name.


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


## ASMETA Standard Libraries
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

