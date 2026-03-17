# AsmetaL — Reference Guide
*March 2026*

The AsmM concrete syntax (AsmetaL) is a textual notation
 to be used by modelers to effectively write ASM
 models within the ASMETA framework. It is defined in terms of an EBNF (extended
 Backus-Naur Form) grammar derived from a semantic interpretation of the AsmM metamodel (the abstract syntax).

The AsmetaL language  can be divided roughly into four parts: the *structural
 language* (provides the constructs required for describing the structure
 of an ASM model.), the *definitional language* (provides the basic
 definitional elements such as functions, domains, rules and axioms characterizing
 an algebraic specification), the *language of terms* (provides all
 kinds of syntactic expressions which can be evaluated in a state of an ASM),
 and the *behavioral* *language* or
 the *language of rules* (provides a notation to specify the transition
 rule schemes of an ASM).

This quick guide gives a description of each part by presenting the notation in an intuitive style
 for better readability, instead of reporting the grammar productions. For
 a more formal definition see the [EBNF grammar](https://asmeta.github.io/material/AsmetaL_EBNF.html).

Note that, to write an ASM  model of a system, the file containing the ASM spec must contain a single
 ASM structure definition and take the ".asm"
 extension (e.g. MyAsmModel.asm).

## Index

1. [Notational conventions](#notConv)
2. [Structure of an ASM](01-structure-of-an-asm.md)
5. [Domain declarations](02_domain_declaration.md)
6. [Function declarations](03_function_declarations.md)
7. [Terms](04_terms.md)
8. [Transition rules](05_transition_rules.md) 
4. [Syntactic rules on ID names](#id)
9. [Comments](#comments)


## Notational Conventions


In this guide the following
conventions are adopted:

 - the AsmM
     concrete syntax appears in red text

 - keywords appear in bold face

 - a pair of square braces (not in bold face)
     is not considered part of the concrete
     notation, it indicates only that the enclosed expression is optional

 - the notation as in t1,...,tn indicates one or more
     elements.


## Syntactic rules on ID names

We use the following rules to distinguish among names of *domains*, *functions*, *enumeration elements*, *rules*, *variables*:  

<span style="color: red;">ID_VARIABLE</span>
a string beginning with the dollar sign "$"; `$x $abc`

<span style="color: red;">ID_ENUM</span>
a string of length greater than or equal
to two and consisting of upper-case letters only;  `ON OFF RED`

<span style="color: red;">ID_DOMAIN</span>  a string beginning with an upper-case letter;  `Integer` `X` `SetOfBags` `Person`

<span style="color: red;">ID_RULE</span>  a string beginning with the lower-case letter "r" followed by the underscore symbol "\_";  `r_SetMyPerson` `r_update` 

<span style="color: red;">ID_FUNCTION</span>  a string beginning with a lower-case letter, but not starting with "r\_";  `plus` `minus` `re`

<!-- **ID_VARIABLE** a
string begining with the dollar sign "$";
e.g. $x $abc $pippo  

**ID_ENUM** a string of length greater than or equal
to two and consisting of upper-case letters only; e.g. ON OFF
RED  

**ID_DOMAIN** a string beginning with an upper-case letter;
e.g. Integer
X SetOfBags Person  

**ID_RULE** a string beginning with the lower-case letter "r"
followed by the underscore symbol "_"; e.g. r_SetMyPerson    r_update  

**ID_FUNCTION** a
string beginning with a lower-case letter, but not
starting with "r_"; e.g. plus minus re
-->

## Comments

Comments can be written as
follows:

// text to be commented

/* text to be
commented*/
