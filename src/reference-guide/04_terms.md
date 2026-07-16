# Terms


There are two types of terms, *basic terms* as in first-order logic (*variables*, *constants* and *function applications)* and *extended terms* to represent special terms like *tuple* *terms*, *collection terms* (sets, maps, sequences, bags), the *conditional term*, *variable-binding terms*, etc.


## Basic Terms

### Constant Term

#### Complex Number
as in  x**+i**y, where x and y are real numbers and **i**  is the imaginary  unit. A complex number must be written without spaces within, because it is  considered a unique token. E.g.: -2-**i**3

#### Real Terms
as floating point numbers. E.g: +3.4 , -3.4  , 3.4, 0.0  ,etc...

#### Integer Terms
as signed numbers. E.g.: 3, +3, -3, 0, etc...

#### Natural Numbers
as unsigned numbers plus the  suffix "n". E.g.: 3n, 0n, etc...

#### Char Terms
as char literals delimited by single  quotes. E.g.: 'a', '5',  etc...

#### String Terms
as a string of literals delimited of double quotes: E.g.: "hello", "1256", etc...

#### Boolean Terms
**true**,  **false**

#### Undef Term
**undef**

#### Enum Term
is an element of an enumeration  type-domain.

### Variable Term
The variable *v* can  be a *location variable* (which is replaced by a *location term*), or a *rule  variable* (which is replaced by a *rule term* ), or a *logical  variable* (which is replaced by a term that is neither a location term  nor a rule term).

### Function Term
```asmeta
[id.]f[(t₁,...tₙ)]
```
* *f* is the function to apply and *(t₁,...tₙ)* is a tuple term representing the actual parameters of the function *f*. If *f* is a 0-ary  function, there is no tuple term.     
* *id* is the agent that applies the function *f*. Within the rules of the ASM, each agent can  identify itself by means of a special reserved 0-ary function *self:Agent*, which is interpreted by each agent *a* as *a*. For a function *f:X->Y*, for example, the expression *f(self,x)* or *self.f(x)* denotes the private version *f(x)* belonging  to agent *self*. When it is clear from the context who is  denoted by *self*, notationally *self* is omitted.

### Location Term
A specialized function term where *f* is a dynamic  function fixed by the ASM signature.

## Extended Terms

### Tuple Term
```asmeta
( t₁,...tₙ )
``` 
* *t₁,...tₙ* are terms, that can have a distinct nature. The empty tuple is not allowed. 

### Sequence Term
```asmeta
[ t₁,...tₙ ]
```
* *t₁,...tₙ* are terms of the same nature.
* **[ ]** denotes  the empty sequence.  A  finite sequence over numbers (real, integer and natural)  can be also defined by means of an **interval notation**, as in   **[** tlow  : tupp [ ,s ] **]**
* tlow and tuppare numbers representing, respectively,  the lower and the upper elements of the sequence.      
* *s* is a positive number representing the step used to take the elements.  If *s* is omitted it is assumed "**s=1**" by default.

### SequenceCT
```asmeta
[v₁ in S₁,...,Sₙ in Sₙ [|Gv₁,...,vₙ ] : tv₁,...,vₙ]
```
* *v₁,...,vₙ* are variables.     
* *tv₁,...,vₙ* is the main term containing free  occurrences of *v₁,...,vₙ*.
* *S₁,...,Sₙ* are terms representing the  sequences where the variables *v₁,...,vₙ* take their value.
* *Gv₁,...,vₙ* is a term representing a boolean condition containing occurrences of *v₁,...,vₙ*. If  *Gv₁,...,vₙ* is omitted, it is assumed "**true**"  as the default condition.

### Set Term
```asmeta
{ t₁,...tₙ }
```
* *t₁,...tₙ* are terms of the same nature.
* **{ }**  denotes the empty set.  A  finite set over numbers (real, integer and natural)  can be also defined by means of an **interval notation**, as in   **[** tₘᵢₙ  : tₘₐₓ [ ,s ] **]**  
* *tₘᵢₙ* and tₘₐₓ are real number representing,  respectively, the lower and the upper elements of the set  
* *s* is a positive number representing the step used to take the elements.  If s is omitted it is assumed "**s=1**" by default. 

### Set Comprehension Term
```asmeta
{v₁ in D₁,...,vₙ in Dₙ   [|Gv₁,...,vₙ ] : tv₁,...,vₙ}
```
* *v₁,...,vₙ* are variables.     
* *tv₁,...,vₙ* is the main term containing free  occurrences of *v₁,...,vₙ*.
* *D₁,...,Dₙ* are terms representing the domains where the variables *v₁,...,vₙ* take their value.      
* *Gv₁,...,vₙ* is a term representing a boolean condition containing occurrences of *v₁,...,vₙ*. If  *Gv₁,...,vₙ* is omitted, it is assumed "**true**"  as the default condition.

### Bag Term
```asmeta
< t₁,...tₙ >
```
* *t₁,...,tₙ* are terms of the same nature.
* **< >** denotes the empty bag.
The notation for a bag of bags needs at least one space before to list the  bag elements as in **<****<****...** **>,****...****,<****...****>>**.
A  finite bag over numbers (real, integer and natural)  can also be defined by means of an **interval notation**:
```asmeta
[ tlow  : tupp [ ,s ] ]
```
* *tlow* and *tupp* are real numbers representing,  respectively, the lower and the upper elements of the bag.      
* *s* is a positive number representing the step used to take the elements. If *s* is omitted, it is assumed "**s=1**" by default.

### BagCT
```asmeta
< v₁ in B₁,...,vₙ in Bₙ   [|Gv₁,...,vₙ ] : tv₁,...,vₙ >
```
* *v₁,...,vₙ* are variables.  
* *tv₁,...,vₙ* is a term containing free occurrences of *v₁,...vₙ*.     
* *B₁,...,Bₙ* are terms representing the bags where the variables *v₁,...vₙ* take their value.   
* *Gv₁,...,vₙ * is a term representing a boolean condition containing occurrences of *v₁,...vₙ*. If *Gv₁,...,vₙ* is omitted, it is assumed "**true**"  as the default condition.

### Map Term
```asmeta
{t₁ -> s₁,...,tₙ -> sₙ }
```
* *t₁,...,tₙ* are terms of the same nature. 
* *s₁,...,sₙ* are terms of the same nature.
* **{** **->}** denotes the empty map.

### MapCT
```asmeta
{v₁ in D₁,...,vₙ in Dₙ   [|Gv₁,...,vₙ ] : tv₁,...,vₙ -> sv₁,...,svₙ **}
```
* *v₁,...,vₙ* are variables.  
* *tv₁,...,vₙ* and *sv₁,...,vₙ* are terms containing  free occurrences of *v₁,...vₙ*.
* *D₁,...,Dₙ* are terms representing the domains where the  variables *v₁,...vₙ* take their value.   
* *Gv₁,...,vₙ* is a term representing a boolean condition containing occurrences of *v₁,...vₙ*. If  *Gv₁,...,vₙ* is omitted, it is assumed "**true**"  as the default condition.

### Conditional Term
```asmeta
if G then tthen [else telse] endif
```
* *G* is a term representing a boolean condition.  
* *tthen* and *telse* are terms of the same  nature. If  *telse* is omitted, it is assumed "**else undef**" as the default.

### Case Term
```asmeta
switch t case t₁ : s1 ... case tₙ : sn [ otherwise sn+1 ] endswitch
```
* *t,t₁,...,tₙ* are terms of the same  nature.   
* *s₁,...,sₙ,sn+1* are terms of the same  nature. If *sn+1* is omitted, it is assumed "**otherwise  undef**" as the default.

### Let Term
```asmeta
let ( v₁=t₁,  ..., vₙ=tₙ ) in tv₁,...,vₙ endlet
```
* *v₁,...,vₙ* are variables. 
* *t₁,...tₙ* are terms.  
* *tv₁,...,vₙ* is a term containing free  occurrences of *v₁,...,vₙ*.

### Exists Term
```asmeta
( exists v₁ in D₁,...,vₙ in Dₙ [with Gv₁,...,vₙ ])
```
* *v₁,...,vₙ* are *logical* variables.
* *D₁,...,Dₙ* are terms representing the domains where v₁,...,vₙ take their value.
* *Gv₁,...,vₙ* is a term representing a boolean condition containing occurrences of v₁,...,vₙ. If  Gv₁,...,vₙ is omitted, it is assumed "**with  true**" as the default condition.
```asmeta
if (exists $p1 in Process with status($p1) = RUNNABLE) then phase := EVALUATION endif
```

### Exists Unique Term
```asmeta
( exists unique v₁ in D₁,...,vₙ in Dₙ [with Gv₁,...,vₙ ])
```
* *v₁,...,vₙ* are variables. 
* *D₁,...,Dₙ* are terms representing the domains where v₁,...,vₙ take their value.
* *Gv₁,...,vₙ* is a term representing a boolean condition containing occurrences of v₁,...,vₙ. If  Gv₁,...,vₙ is omitted, it is assumed "**with  true**" as the default condition.

### Forall Term 
```asmeta
( forall v₁ in D₁,...,vₙ in Dₙ [with Gv₁,...,vₙ ])
```
* *v₁,...,vₙ* are variables. 
* *D₁,...,Dₙ* are terms representing the domains where v₁,...,vₙ take their value.
* *Gv₁,...,vₙ* is a term representing a boolean condition containing occurrences of v₁,...,vₙ. If  Gv₁,...,vₙ is omitted, it is assumed "**with  true**" as the default condition.

  
### Domain Term
**D**
* *D* is the name of a domain declared  in the ASM signature or directly the expression for a structured type-domain.

### Rule As Term
```asmeta
<< R[ ( D₁,...,Dₙ  ) ] >>
```
* *R* is the name of a defined transition  rule, and *D₁,...,Dₙ* (if any) are the domains of the formal rule  parameters.
It is a special term used to denote a transition rule where a term is  expected (e.g as actual parameter in a rule  application to represent a transition rule). Its interpretation results,  therefore, in a transition rule.  
Similarly to functions, rules can  be overloaded. When rules are overloaded, it is necessary to indicate  the domains of the formal rule parameters.



### *Standard* Operators 

In addition to these terms, the AsmM concrete syntax admits special expressions to support the *infix notation* for some well-known functions on basic domains (like *plus*, *minus*, *mult*, etc.) of the AsmM *Standard Library*. In these expressions, basic
terms and the domain term are used as operands. The table
below show the infix operators corresponding to these functions,
together with their associativies and priorities. The
operator priorities range from 0 to 9, where 9 indicates the strongest one and 0 the weakest one.

| **Function** | **Infix****operator** | **Type** | **Associativity** | **Priority** |
| --- | --- | --- | --- | --- |
| minus (unary)  plus (unary) | -  + | Complex → Complex   Real → Real   Integer → Integer | left | 9 |
| pwr | ^ | Real × Real → Real | left | 8 |
| mult | * | Complex × Complex →  Complex  Real × Real → Real  Integer × Integer →  Integer  Natural × Natural →  Natural | left | 7 |
| div | / | Complex × Complex →  Complex  Real × Real → Real  Integer × Integer →  Real  Natural × Natural →  Real | left | 7 |
| mod | mod | Integer × Integer → Integer     Natural × Natural → Natural | left | 7 |
| plus | + | Complex × Complex →  Complex  Real × Real → Real  Integer × Integer →  Integer  Natural × Natural →  Natural | left | 6 |
| minus | - | Complex × Complex →  Complex  Real × Real → Real   Integer × Integer →  Integer  Natural × Natural →  Natural | left | 6 |
| lt | < | Real × Real → Boolean      Integer × Integer → Boolean     Natural × Natural → Boolean     Char × Char → Boolean | left | 5 |
| le | <= | Real × Real → Boolean      Integer × Integer → Boolean     Natural × Natural → Boolean     Char × Char → Boolean | left | 5 |
| gt | > | Real × Real → Boolean      Integer × Integer → Boolean     Natural × Natural → Boolean     Char × Char → Boolean | left | 5 |
| ge | >= | Real × Real → Boolean      Integer × Integer → Boolean     Natural × Natural → Boolean     Char × Char → Boolean | left | 5 |
| eq | = | D × D → Boolean  where D stands for a  basic type domain (except the Rule type domain), or aEnum type domain. | left | 5 |
| neq | != | D × D → Boolean  where D stands for a  basic type domain (except the Rule type domain), or aEnum type domain. | left | 5 |
| in | in | powerset(D) × D → Boolean | left | 4 |
| notin | notin | powerset(D) × D → Boolean | left | 4 |
| not | not | Boolean → Boolean | left | 3 |
| and | and | Boolean × Boolean →  Boolean | left | 2 |
| xor | xor | Boolean × Boolean →  Boolean | left | 1 |
| or | or | Boolean × Boolean →  Boolean | left | 1 |
| implies | implies | Boolean × Boolean →  Boolean | left | 0 |
| iff | iff | Boolean × Boolean →  Boolean | left | 0 |
