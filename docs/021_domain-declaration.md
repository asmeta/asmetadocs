---
title: Domain declarations
---

## 5. Domain declarations

The ASM domains (or
universes) are classified in: *typedomains*
and *concrete-domains*. 

The *type-domains*
represent all possible *super domains* (for practical reasons, the superuniverse |S| of an ASM state S is divided into smaller
universes) and are further classified in: *basic type-domains*, domains
for primitive data values like booleans, reals, integers, naturals, strings, etc.; *structured
type-domains*, domains for building

    data structures (like sets, sequences, bags, maps, tuples
    etc.) over other domains; *abstract type-domain*s,
    dynamic user-named domains whose elements have no precise structure and are
    imported as fresh elements from a possibly infinite reserve by means of extend
    rules (see section [Transition rules](#rules)); and *enum**
    domains*, finite user-named enumerations to introduce new concepts of
    type (e.g. one may define the enumeration Color
    = {RED, GREEN, BLUE} to introduce the new concept of "color").

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

