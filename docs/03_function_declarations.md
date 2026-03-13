---
title: Function Declarations
---


To declare an ASM function
it is necessary to specify the name, the domain, and the codomain of the function. Moreover, the function name must be preceded by one of the
keywords **static**, **dynamic** or **derived**,
depending on its kind. Dynamic functions are further classified in **monitored**, **controlled**, **shared**, **out** and **local**.
Local dynamic functions are not considered part of the signature; they are
declared and used only in the scope of a turbo transition rule with "local
state" (see section [Transition rules](#rules)).

The schema below shows the
concrete syntax for declaring a function F (the name) from D (the domain)
to C (the codomain).

| **Model** **element** | **Concrete syntax** |
| --- | --- |
| **StaticFunction** | **static** F : [ D -> ] C |
| **DynamicFunction** | [ **dynamic** ] ( **monitored** \| **controlled**\| **shared** \| **out**\| **local** ) F **:** [ D **->** ] C  A dynamic function is declared specifying its  kind (*monitored*, *controlled*, *shared*, or *out*);  optionally, the keyword **dynamic** can be also added as prefix. *Local*  dynamic functions can be declared only in the scope of a turbo transition  rule with local state (see section [Transition rules](#rules)). |
| **DerivedFunction** | **derived** F **:** [ D **->** ] C |

> **_NOTE:_**  derived functions can contain in their body .. TODO



