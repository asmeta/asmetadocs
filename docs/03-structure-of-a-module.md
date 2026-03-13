---
title: Structure of an ASM module
---

# 3.
Structure of an ASM module

## 3.
Structure of an ASM module

A
lightweight notion of *module* is also supported. An ASM module is an
```asmetal
ASM without a main rule and without a characterization of the set of initial
```

states. We write a module in the same way as ASMs
with the keyword **asm** replaced by the
keyword **module**.

```asmetal
|  | **module** name       where name is the name of the ASM module. It   must be equal to the name of the ASM file (as name.asm). |
| --- | --- |
| **Header** | [ **import** m1 [**(** id11,...,id1h1 **)**]    ** ...**     **import**** **mk [**(** idk1,...,idkhk** )**]**     **]    [ **export** id1,...,ide ]  or   [ **export * **]    **signature**** :        **[   dom_decl1        ...        dom_decln             ]        [   fun_decl1        ...        fun_declm             ]       where:    - m1,...,mk are the names of the imported modules    - idi1,...,idihi are names for domains, functions   and rules which are imported from module mi (if they are omitted all the   content of the export clause of mi is imported);    - id1,...,ide are names for domains, functions and rules which can be exported from   the module.** export   *** denotes that all functions and rules of the module can be   exported;     - dom_decl1,...,dom_decln are declarations of domains used in the ASM (see section Domain   declarations);    - fun_decl1,...,fun_declm are declarations of functions used in the ASM (see section Function   declarations). |
| **Body** | **definitions :**    **   **[ **domain** D1 **=** Dterm1                   ...            **       domain**           Dd **=** Dtermd                    ]            **             **[**   function** F1 [**(** p11 **in** d11,...,p1k1 **in** d1k1 **)**]**=** Fterm1              ...                    **function** Ff [**(** pf1 **in** df1,...,pfkf **in** dfkf **)**]**=** Ftermf       ]               [   **rule **[**macro**]**           **R1 [**(** x11 **in** b11,...,x1k **in** b1k1 **)**] = rule1             ...                    **rule           **[**macro**]** **Rr [**(** xr1 **in** br1,...,xrkr **in** brkr **)**] =           ruler       ]              [   ** axiom** **over** id11,...,id1s1 : term1             ...                             **axiom over**           idv1,...,idvsv : termv        ]       where:    - D1,...,Dd are names of static concrete   domains declared in the signature (see Header);     - F1,...,Ff are names of static or derived   functions declared in the signature (see Header);    - Dterm1,...,Dtermd and Fterm1,...,Ftermf are terms (see section Terms);     - pij are variables which specify the   formal parameters of the function Fi, and dij are the domains where pij take their value;    - R1,...,Rr are names for transition rules   (see section Transition rules);    - xij are variables which specify the   formal parameters of the rule Ri, and bij are the domains where pij take their value;    - rule1,...,ruler are transition rules (see section   Transition   rules);    - idij are names of domains, functions*   and rules constrained by the axioms;    - termi is a term (see section Terms) representing the boolean-valued expression of the constraint.                *When functions are overloaded it is necessary to indicate their domain,           as in f(d) with           f is the function name and d is the name of the function domain. |
```

