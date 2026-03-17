---
title: Reference — Full Extract
---

# Reference — Full Extract

## Introduction

AsmM Concrete Syntax 2.0.0 - A Quick Guide

  
# AsmetaL syntax

## A Quick Guide

## A Quick Guide

  

1st April 2020

	

The AsmM
    concrete syntax (AsmetaL) is a textual notation
    to be used by modelers to effectively write ASM
    models within the ASMETA framework. It is defined in terms of an EBNF (extended
    Backus-Naur Form) grammar derived from a semantic interpretation of the AsmM
    metamodel (the abstract syntax).

  

The AsmetaL
    language  can be divided roughly into four parts: the *structural
    language *(provides the constructs required for describing the structure
    of an ASM model.), the *definitional language* (provides the basic
    definitional elements such as functions, domains, rules and axioms characterizing
    an algebraic specification), the *language of terms* (provides all
    kinds of syntactic expressions which can be evaluated in a state of an ASM),
    and the *behavioral** language* or
    the *language of rules* (provides a notation to specify the transition
```asmetal
    rule schemes of an ASM).
```

This quick guide gives a
    description of each part by presenting the notation in an intuitive style
```asmetal
    for better readability, instead of reporting the grammar productions. For
    a more formal definition see the [EBNF grammar](AsmetaL_EBNF.html).
```

Note that, to write an ASM
    model of a system, the file containing the ASM spec must contain a single
```asmetal
    ASM structure definition and take the ".asm"
    extension (e.g. MyAsmModel.asm).
```

## 5.
```asmetal
Domain declarations
```

## 5.
```asmetal
Domain declarations
```

The ASM domains (or
universes) are classified in: *typedomains*
and *concrete-domains*. 

The *type-domains*
represent all possible *super domains* (for practical reasons, the superuniverse |S| of an ASM state S is divided into smaller
universes) and are further classified in: *basic type-domains*, domains
```asmetal
for primitive data values like booleans, reals, integers, naturals, strings, etc.; *structured
```

type-domains*, domains for building

    data structures (like sets, sequences, bags, maps, tuples
    etc.) over other domains; *abstract type-domain*s,
```asmetal
    dynamic user-named domains whose elements have no precise structure and are
    imported as fresh elements from a possibly infinite reserve by means of extend
    rules (see section [Transition rules](#rules)); and *enum**
    domains*, finite user-named enumerations to introduce new concepts of
    type (e.g. one may define the enumeration Color
    = {RED, GREEN, BLUE} to introduce the new concept of "color").
```

*Concrete domains* are user-named sub-domains of
type-domains. As for functions, a concrete domain can be static or dynamic. 

The schema below shows the
notation for declaring a domain. Domains declared as "anydomain"
are generic domains representing any other type-domain. The standard library
defines one "predefined" anydomain, named Any, which represents the most generic one. As basic
type-domains only Complex, Real, Integer, Natural, String, Char, Boolean, Rule,
and the singleton Undef={undef} are allowed and defined in the standard library as
predefined basic type-domains. Moreover, two other special abstract domains are
considered predefined: the Agent domain for agents, and the Reserve domain
which works as "reserve" to increase the working space of an ASM. Note
that, the Reserve domain is considered "abstract", and therefore
"dynamic", since it is updated automatically upon execution of an
extend rule (see section [Transition rules](#rules)) – it can not be updated directly by
other transition rules –.

```asmetal
| **Model****   element** | **Concrete syntax** |
| --- | --- |
| **AnyDomain** | **anydomain** D       where D is the name   of the domain representing any other type-domain. A predefined generic domain   named Any is declared in the standard library and considered the most generic   one. |
| **BasicTD** | **basic** **domain** D       Only **Complex**, **Real**, **Integer**,   **Natural**, **String**, **Char**, **Boolean**, **Rule**, and **Undef** are allowed (users can not define other   basic domains). They are declared in the standard library as   "predefined" basic type-domains. |
| **AbstractTD** | **abstract** **domain** D        where D is the name   of the type-domain. |
| **EnumTD** | **enum** **domain** D **= { **EL1|...|ELn** }**        where:    - D is the name of the enum type-domain;     - EL1,...,ELn** **are the elements of the   enumeration. |
| **ProductDomain** | **Prod** **(** d1,d2,...,dn **)**              where d1,...,dn** **are the domains over which the cartesian           product is defined. |
| **SequenceDomain** | **Seq** **(** d **)**              where d** **is the domain over which the sequence domain is defined. |
| **PowersetDomain** | **Powerset** **(** d **)**             where d** **is the domain over which the power set is defined. |
| **BagDomain** | **Bag** **(** d **)**             where d** **is the domain over which the bag domain is defined. |
| **MapDomain** | **Map** **(** d1,d2 **)**             where d1,d2 are the domains over which the map domain is defined. |
| **ConcreteDomain** | [** dynamic **] **domain** D **subsetof** td       where:    - D is the name of the concrete domain to declare;     - td is a type-domain which identifies the structure of the elements of the   declared concrete domain. The keyword **dynamic **denotes that the   declared domain is *dynamic*. If omitted, the domain is considered *static*. |
```


## 6. Function Declarations

## 6. Function Declarations

To declare an ASM function
it is necessary to specify the name, the domain, and the codomain
of the function. Moreover, the function name must be preceded by one of the
keywords **static**, **dynamic** or **derived**,
depending on its kind. Dynamic functions are further classified in **monitored**,
**controlled**, **shared**, **out** and **local**.
Local dynamic functions are not considered part of the signature; they are
declared and used only in the scope of a turbo transition rule with "local
state" (see section [Transition rules](#rules)).

The schema below shows the
concrete syntax for declaring a function F (the name) from D (the domain)
to C (the codomain).

```asmetal
| **Model****   element** | **Concrete syntax** |
| --- | --- |
| **StaticFunction** | **static** F : [ D -> ] C |
| **DynamicFunction****** | [ **dynamic** ] ( **monitored** | **controlled**   | **shared** | **out**   | **local** ) F **:** [ D **->** ] C       A dynamic function is declared specifying its   kind (*monitored*, *controlled*, *shared*, or *out*);   optionally, the keyword **dynamic **can be also added as prefix. *Local*   dynamic functions can be declared only in the scope of a turbo transition   rule with local state (see section Transition rules). |
| **DerivedFunction****** | **derived** F **:** [ D **->** ] C |
```


## 7. Terms

## 7. Terms

There are two types of terms, *basic terms*
as in first-order logic (*variables*, *constants* and *function
applications) *and *extended terms* to represent special terms like *tuple** terms*, *collection terms*
(sets, maps, sequences, bags), the* conditional term*, *variable-binding
terms*, etc. 

### Basic Terms

```asmetal
| **Model****   element** | **Concrete syntax** |
| --- | --- |
| **ConstantTerm** | **Complex number**, as in  x**+i**y, where x and y are real numbers and **i**** **is the imaginary   unit. A complex number must be written without spaces within, because it is   considered a unique token. E.g.: -2-**i**3       **Real terms **as floating point numbers. E.g: +3.4 , -3.4   , 3.4, 0.0   ,etc...       **Integer terms **as signed numbers. E.g.: 3, +3, -3, 0, etc...       **Natural numbers **as unsigned numbers plus the   suffix "n". E.g.: 3n, 0n, etc...       **Char terms** as char literals delimited by single   quotes. E.g.: 'a', '5',   etc...       **String terms** as a string of literals delimited   of double quotes: E.g.: "hello", "1256", etc...       **Boolean terms**: **true**,   **false        Undef term: undef**       **Enum**** term:** e  where e is an element of an enumeration   type-domain. |
| **VariableTerm** | v        where v is a variable. The variable can   be a *location variable* (which is replaced by a *location term )*, or a *rule   variable *(which is replaced by a *rule term* ), or a  *logical   variable* (which is replaced by a term that is neither a location term   nor a rule term). |
| **FunctionTerm** | [id **.** ]f [ **( **t1,...,tn** )** ]       where:    - f is the function   to apply and (t1,...,tn) is a tuple   term representing the actual parameters of the function f. If f is a 0-ary   function, there is no tuple term.    - id is the agent that applies the function f.    Within  the rules of the ASM, each agent can   identify itself by means of a special reserved 0-ary function  self:Agent, which is interpreted by each agent a as a. For a  function f:X->Y, for example, the expression f(self,x) or self.f(x) denotes the private version f(x) belonging   to agent self. When it is clear from the contex who is   denoted by self, notationally self is omitted. |
| **LocationTerm** | A specialized function term where f is a dynamic   function fixed by the ASM signature. |
```


 

### Extended Terms

```asmetal
| **Model****   element** | **Concrete syntax** |
| --- | --- |
| **TupleTerm** | **( **t1,...,tn** )**** **       where t1,...,tn are terms, that can have a distinct nature. The empty tuple is not allowed. |
| **SequenceTerm** | **[ **t1,...,tn** ]**       where t1,...,tn are terms of the same nature.       **[ ] **denotes   the empty sequence.             A           finite sequence over numbers (real, integer and natural)           can be also defined by means of an **interval notation**, as in        **[ **tlow     : tupp [ ,s ] **]**       where:            -  tlow and tupp           are numbers representing, respectively,           the lower and the upper elements of the sequence.             -  s is a positive number representing the step used to take the elements.           If s is omitted it is assumed "**s=1**" by default. |
| **SequenceCT** | **[**           v1 **in** S1,...,vn **in** Sn            [**|****           **Gv1,...,vn ] : tv1,...,vn           **]**       where:     - v1,...,vn are variables.            - tv1,...,vn is the main term containing free           occurrences of  v1,...,vn.    - S1,...,Sn are terms representing the   sequences where the variables v1,...,vn take their value.             - Gv1,...,vn is a term representing a boolean condition containing occurrences of  v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**true**"           as default condition. |
| **SetTerm** | **{ **t1,...,tn** }**       where t1,...,tn are terms of the same nature.       **{ }**** **denotes the empty set.             A           finite set over numbers (real, integer and natural)           can be also defined by means of an **interval notation**, as in        **[ **tlow     :    tupp [ ,s ] **]**       where:    - tlow and tupp are real number representing,   respectively, the lower and the upper elements of the set             - s is a positive number representing the step used to take the elements.           If s is omitted it is assumed "**s=1**" by default. |
| **SetCT** | **{**           v1 **in** D1,...,vn **in** Dn   [**|****           **Gv1,...,vn ] : tv1,...,vn           **}**       where:    - v1,...,vn are variables.            - tv1,...,vn is the main term containing free           occurrences of  v1,...,vn.    - D1,...,Dn are terms representing the   domains where the variables v1,...,vn take their value.             - Gv1,...,vn is a term representing a boolean condition containing occurrences of  v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**true**"           as default condition. |
| **BagTerm** | ****t1,...,tn** >**       where t1,...,tn are terms of the same nature.       ** **denotes the empty bag.    The notation for a bag of bags needs at least one space before to list the   bag elements as in ******   ********...**** >,****...****,****...****>>**.             A           finite bag over numbers (real, integer and natural)           can be also defined by means of an **interval notation**, as in        **[ **tlow     : tupp [ ,s ] **]**       where:    - tlow and tupp are real number representing,   respectively, the lower and the upper elements of the bag.             - s is a positivel number representing the step used to take the elements.           If s is omitted it is assumed "**s=1**" by default. |
| **BagCT** | **** **in** B1,...,vn **in** Bn   [**|****           **Gv1,...,vn ] : tv1,...,vn            **>**       where:    -  v1,...,vn are variables.    - tv1,...,vn is a term containing free   occurrences of  v1,...,vn.     - B1,...,Bn are terms representing the bags   where the variables v1,...,vn take their value.             - Gv1,...,vn is a term representing a boolean condition containing occurrences of  v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**true**"           as default condition. |
| **MapTerm** | **{**   t1** -> **s1,...,tn **-> **sn **}**       where:    -  t1,...,tn are terms of the same nature.    -  s1,...,sn are terms of the same nature.       **{ ****->} **denotes the empty map. |
| **MapCT** | **{**v1 in D1,...,vn in Dn  [|           Gv1,...,vn ] : tv1,...,vn -> sv1,...,vn **           }**       where:    -  v1,...,vn are variables.    -  tv1,...,vn  sv1,...,vn   are terms containing   free occurrences of  v1,...,vn.    - D1,...,Dn are terms representing the domains where the   variables v1,...,vn take their value.             - Gv1,...,vn is a term representing a boolean condition containing occurrences of  v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**true**"           as default condition. |
| **ConditionalTerm** | **if**   G **then** tthen [**   else** telse ] **endif**       where:    - G is a term representing a boolean condition.    - tthen and telse are terms of the same   nature. If  telse is omitted it is assumed "**else undef**" as default. |
| **CaseTerm** | **switch** t **case** t1 **:** s1 ... **case **tn **:** sn [** otherwise **sn+1 ] **endswitch**       where:** **    - t,t1,...,tn are terms of the same   nature.     - s1,...,sn,sn+1 are terms of the same   nature. If sn+1 is omitted it is assumed "**otherwise   undef**" as default. |
| **LetTerm** | **let ( **v**1=**t1,   ..., v**n****=**tn** )** **in** tv1,...,vn **endlet**       where:    - v1,...,vn are variables.    - t1,...,tn are terms.     - tv1,...,vn is a term containing free   occurrences of v1,...,vn. |
| **ExistTerm** | **( exist **v**1** **in** D1,...,vn **in **Dn**   **[** with **Gv1,...,vn ]**)**       where:     - v1,...,vn are variables.     - D1,...,Dn are terms representing the domains where v1,...,vn take their value.     - Gv1,...,vn is a term representing a boolean condition containing occurrences of v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**with   true**" as default condition. |
| **ExistUniqueTerm** | **( exist unique **v**1** **in** D1,...,vn **in **Dn**   **[** with **Gv1,...,vn ]**)**       where:    - v1,...,vn are variables.    - D1,...,Dn are terms representing the domains where v1,...,vn take their value.    - Gv1,...,vn is a term representing a boolean condition containing occurrences of v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**with   true**" as default condition. |
| **ForallTerm** | **( forall **v**1** **in** D1,...,vn **in **Dn**   **[** with **Gv1,...,vn ]**)**       where:    - v1,...,vn are variables.    - D1,...,Dn are terms representing the domains where v1,...,vn take their value.    - Gv1,...,vn is a term representing a boolean condition containing occurrences of v1,...,vn. If  Gv1,...,vn  is omitted it is assumed "**with   true**" as default condition. |
| **DomainTerm** | D       where D is the name of a domain declared   in the ASM signature or directly the expression for a structured type-domain. |
| **RuleAsTerm** | **** R[ **( **D1,...,Dn** ****)** ]** >>**             where R is the name of a defined transition           rule, and D1,...,Dn (if any) are the domains of the formal rule           parameters*.           It is a special term used to denote a transition rule where a term is           expected (e.g as actual parameter in a rule           application to represent a transition rule). Its           interpretation results,           therefore, in a transition rule.             *Similarly to functions, rules can           be overloaded. When rules are overloaded, it is necessary to indicate           the domains of the formal rule parameters. |
```


In addition to these terms, the AsmM
concrete syntax admits special expressions to support the *infix notation*  for some well-known functions on basic domains (like *plus*,
*minus*, *mult*, etc.) of the AsmM *Standard Library*. In these expressions, basic
terms and the domain term are used as operands. The table
below show the infix operators corresponding to these functions,
together with their associativies and priorities. The
operator priorities range from 0 to 9, where 9 indicates
the strongest one and 0 the weakest one. 

```asmetal
| **Function****** | **Infix****   operator** | **Type****** | **Associativity****** | **Priority****** |
| --- | --- | --- | --- | --- |
| minus (unary)       plus (unary) | -       + | Complex → Complex     Real → Real     Integer → Integer | left | 9 |
| pwr | ^ | Real × Real → Real | left | 8 |
| mult | * | Complex × Complex →   Complex    Real × Real → Real    Integer × Integer →   Integer    Natural × Natural →   Natural | left | 7 |
| div | / | Complex × Complex →   Complex    Real × Real → Real    Integer × Integer →   Real    Natural × Natural →   Real | left | 7 |
| mod | mod | Integer × Integer → Integer    Natural × Natural → Natural | left | 7 |
| plus | + | Complex × Complex →   Complex    Real × Real → Real    Integer × Integer →   Integer    Natural × Natural →   Natural | left | 6 |
| minus | - | Complex × Complex →   Complex    Real × Real → Real             Integer × Integer →   Integer    Natural × Natural →   Natural | left | 6 |
| lt |  | Real × Real → Boolean     Integer × Integer → Boolean    Natural × Natural → Boolean    Char × Char → Boolean | left | 5 |
| le |  | Real × Real → Boolean     Integer × Integer → Boolean    Natural × Natural → Boolean    Char × Char → Boolean | left | 5 |
| gt | > | Real × Real → Boolean     Integer × Integer → Boolean    Natural × Natural → Boolean    Char × Char → Boolean | left | 5 |
| ge | >= | Real × Real → Boolean     Integer × Integer → Boolean    Natural × Natural → Boolean    Char × Char → Boolean | left | 5 |
| eq | = | D × D → Boolean    where D stands for a   basic type domain (except the Rule type domain), or a   Enum type domain. | left | 5 |
| neq | != | D × D → Boolean    where D stands for a   basic type domain (except the Rule type domain), or a   Enum type domain. | left | 5 |
| in | in | powerset(D) × D → Boolean | left | 4 |
| notin | notin | powerset(D) × D → Boolean | left | 4 |
| not | not | Boolean → Boolean | left | 3 |
| and | and | Boolean × Boolean →   Boolean | left | 2 |
| xor | xor | Boolean × Boolean →   Boolean | left | 1 |
| or | or | Boolean × Boolean →   Boolean | left | 1 |
| implies | implies | Boolean × Boolean →   Boolean | left | 0 |
| iff | iff | Boolean × Boolean →   Boolean | left | 0 |
```


## 8. Transition Rules

## 8. Transition Rules

In a given state, a
transition rule of an ASM produces for each variable assignment an update set
```asmetal
for some dynamic functions of the signature. We classify transition rules in
```

two groups: *basic rules* and *turbo rules*. The former are
simply rules, like the *skip rule* and the *update rule*, while
the latter are rules, like the *sequence rule* and the *iterate rule*,
introduced to support practical composition and structuring principles of the ASMs. Other rule schemes are derived from the basic and the
turbo rules.

```asmetal
| **Model****   element** | **Concrete syntax ** |
| --- | --- |
| **SkipRule** | **skip** |
| **UpdateRule** | l **:=** t         where:    - t is a generic term.     - l can be either a location term f(t1,...,tn) or a location variable.     Note that all the rules, which return a value t, contain an update rule as in result:=t, where result is a reserved 0-ary function   acting as placeholder in which to store the intended return value.** ** |
| **BlockRule** | **par** R1 R2 ... Rn **endpar**        where R1,R2,...,Rn are transition rules. |
| **ConditionalRule** | **if**   G **then** Rthen [**else** Relse] **endif**       where:    - G is a term representing a boolean condition.    - Rthen and Relse are transition rules. If  Relse is omitted it   is assumed "**else skip**" as default. |
| **CaseRule****** | **switch** t **case** t1 **:** R1 ... **case   **tn **:** Rn [**otherwise **Rn+1] **endswitch**       where:    - t,t1,...,tn are terms.     - R1,...,Rn,Rn+1 are transition rules. If  Rn+1 is omitted it is assumed "**otherwise   skip**" as default. |
| **LetRule** | **let ( **v1**=**t1,   ..., vn**=**tn** )** **in** Rv1,...,vn **endlet**       where:    - v1,...,vn are variables.    - t1,...,tn are terms.     - Rv1,...,vn is a transition rule which   contains occurrences of variables v1,...,vn. |
| **ForallRule** | **forall** v1 **in **D1, ..., vn **in **Dn **with** Gv1,...,vn **do** Rv1,...,vn       where:    - v1,...,vn  are variable.     - D1,...,Dn are terms representing the domains where v1,...,vn  take their values.    - Gv1,...,vn is a term representing a boolean condition over v1,...,vn.     - Rv1,...,vn is a transition rule which   contains occurrences of variables v1,...,vn. |
| **ChooseRule** | **choose** v1 **in **D1, ..., vn **in **Dn **with** Gv1,...,vn **do** Rv1,...,vn [** ifnone   **P ]       where:    - v1,...,vn are variables.    - D1,...,Dn are terms representing the   domains where v1,...,vn take their values.     - Gv1,...,vn is a term representing a boolean condition over v1,...,vn.     - Rv1,...,vn is a transition rule which   contains the free variables v1,...,vn.     - P is a transition   rule. If  P is omitted it is assumed "**ifnone**** skip**" as default. |
| **MacroCallRule** | r **[**t1,...,tn**]**        where:    - r is the name of the macro.     - t1,...,tn are terms representing the arguments.       r **[]**  is used for a macro with no   arguments. |
| **ExtendRule** | **extend** D **with **v1,...,vn **do** R       where:    - D is the name of the abstract type-domain to be extended.    - v1,...,vn are logical variables which are bound to the   new elements imported in D from the reserve     - R is a transition rule. |
| **SeqRule** | **seq**** **R1 R2 ... Rn** endseq**       where R1,R2,...,Rn are transition rules. |
| **IterateRule** | **iterate **R **enditerate**       where R is a transition rule. |
| **IterativeWhileRule** | **while** G** do **R            where:    - G is a term representing a boolean condition.       - R is a transition rule. |
| **TurboCallRule** | r**(**t1,...,tn**)**       where:    - r is the name of the called transition rule.     - t1,...,tn are terms representing the arguments.       r**(****) **is used to call a rule with no   arguments. |
| **RecursiveWhileRule** | **recwhile**** **G**   do **R** **       where G is a term representing a boolean condition and R is a transition rule. |
| **TurboLocalStateRule****** | [**dynamic**]** local** f1 **:**[D1 **->**]C1 **[** Init1 **]    **...    [**dynamic**]** local **fk **:**[Dk **->**]Ck **[** Initk **]    **body       where:    - Init1,...,Initk   and body** **are transition rules.     - [**dynamic**]** local** fi **:**[Di **->**]Ci are declarations of local dynamic functions (see DynamicFunction declaration). |
| **TryCatchRule** | **try** P **catch **l1,...,ln Q       where:     - P and Q are transition rules.     - l1,...,ln are either location terms or location   variables. |
| **TurboReturnRule****** | l ** r**(**t1,...,tn**)**       where:    - l is either a location term or a location variable.     - r(t1,...,tn) is a TurboCall rule. |
| **TermAsRule** | v       where v is either a rule variable or a   function term. This rule works as a form of wrapper to allow the use of   either a function term or a variable term where a rule is expected. |
```


## 9.
Comments

## 9.
Comments

Comments can be written as
follows:

// text to be commented 

 /* text to be
commented*/
