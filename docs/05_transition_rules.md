---
title: Transition Rules
---

In a given state, a
transition rule of an ASM produces for each variable assignment an update set
for some dynamic functions of the signature. We classify transition rules in
two groups: *basic rules* and *turbo rules*. The former are
simply rules, like the *skip rule* and the *update rule*, while
the latter are rules, like the *sequence rule* and the *iterate rule*,
introduced to support practical composition and structuring principles of the ASMs. Other rule schemes are derived from the basic and the
turbo rules.

  - [SkipRule](#SkipR)
  - [UpdateRule](#UpdateR)
  - [BlockRule](#BlockR)
  - [ConditionalRule](#CondR)
  - [CaseRule](#CaseR)
  - [LetRule](#LetR)
  - [ForallRule](#ForallR)
  - [ChooseRule](#ChooseR)
  - [MacroCallRule](#MacroCallR)
  - [ExtendRule](#ExtendR)
  - [SeqRule](#SeqR)
  - [IterateRule](#IteraterR)
  - [IterativeWhileRule](#IterativeWhileR)
  - [TurboCallRule](#TurboCallR)
  - [RecursiveWhileRule](#RecWhileR)
  - [TurboLocalStateRule](#TurboLocalStateR)
  - [TryCatchRule](#tryCatchR)
  - [TurboReturnRule](#TurboReturnR)
  - [TermAsRule](#TermAsR)

#### SkipRule
**`skip`** 
#### UpdateRule
**`l:=t`**    where:  - t is a generic term.      - l can be either a location term f(t1,...,tn) or a location variable.      Note that all the rules, which return a value t, contain an update rule as in result:=t, where result is a reserved 0-ary function  acting as placeholder in which to store the intended return value. 
#### BlockRule
**`par`** R1 R2 ... Rn **`endpar`**  where R1,R2,...,Rn are transition rules. 


| **Model element** | **Concrete syntax** |
| --- | --- |
| **SkipRule** | **`skip`** |
| **UpdateRule** | **`l:=t`**    where:  - t is a generic term.      - l can be either a location term f(t1,...,tn) or a location variable.      Note that all the rules, which return a value t, contain an update rule as in result:=t, where result is a reserved 0-ary function  acting as placeholder in which to store the intended return value. |
| **BlockRule** | **`par`** R1 R2 ... Rn **`endpar`**  where R1,R2,...,Rn are transition rules. |
| **ConditionalRule** | **if**G **then** Rthen [**else** Relse] **endif**  where:  - G is a term representing a boolean condition.  - Rthen and Relse are transition rules. If  Relse is omitted it  is assumed "**else skip**" as default. |
| **CaseRule** | **switch** t **case** t1 **:** R1 ... **case** tn **:** Rn [**otherwise** Rn+1] **endswitch**  where:  - t,t1,...,tn are terms.   - R1,...,Rn,Rn+1 are transition rules. If  Rn+1 is omitted it is assumed "**otherwise  skip**" as default. |
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

