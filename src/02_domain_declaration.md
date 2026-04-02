# Domain declarations

The ASMETA domains (or universes) are classified into: *typedomains* and *concrete-domains*.

The *type-domains* represent all possible *super domains* (for practical reasons, the superuniverse |S| of an ASM state S is divided into smaller
universes) and are further classified in: 
* *basic type-domains*, domains for primitive data values like booleans, reals, integers, naturals, strings, etc.;
* *structured type-domains*, domains for building  data structures (like sets, sequences, bags, maps, tuples etc.) over other domains;
* *abstract type-domains*,  dynamic user-named domains whose elements have no precise structure and are imported as fresh elements from a possibly infinite reserve by means of extend rules (see section [Transition rules](05_transition_rules.md)); 
* *enum* *domains*, finite user-named enumerations to introduce new concepts of  type (e.g. one may define the enumeration `Color = {RED, GREEN, BLUE}` to introduce the new concept of "color").

*Concrete domains* are user-named sub-domains of type-domains. As for functions, a concrete domain can be static or dynamic.

The schema below shows the notation for declaring a domain. Domains declared as *anydomain* are generic domains representing any other type-domain. The standard library defines one "predefined" anydomain, named *Any*, which represents the most generic one. As basic type-domains only *Complex, Real, Integer, Natural, String, Char, Boolean, Rule*, and the singleton *Undef={undef}* are allowed and defined in the standard library as predefined basic type-domains. Moreover, two other special abstract domains are considered predefined: the *Agent* domain for agents, and the *Reserve* domain, which works as "reserve" to increase the working space of an ASM. Note that the *Reserve* domain is considered *abstract*, and therefore *dynamic*, since it is updated automatically upon execution of an
*extend rule* (see section [Transition rules](#rules)) – it can not be updated directly by other transition rules.

### Any Domain

```asmeta
anydomain D
```
* *D* is the name  of the domain representing any other type-domain.
* A predefined generic domain named `Any` is declared in the standard library and considered the most generic one.

### Basic Domain
```asmeta
basic domain D
```
Only **Complex**, **Real**, **Integer**,  **Natural**, **String**, **Char**, **Boolean**, **Rule**, and **Undef** are allowed (users can not define other  basic domains). They are declared in the standard library as  "predefined" basic type-domains.

### Abstract Domain
```asmeta
abstract domain D
```
* *D* is the name  of the type-domain.

**Example**
```asmeta
abstract domain Lift
```

### Enumerative Domain
```asmeta
enum domain D = { EL₁|...|ELₙ }
```
or 
```asmeta
enum domain D = { EL₁,...,ELₙ }
```

* *D* is the name of the enum type-domain;  
* *EL₁,...,ELₙ*  are the elements of the enumeration which must be written in all caps.

**Example**
```asmeta
enum domain Sign = {CROSS | NOUGHT}
enum domain Status = {TURN_USER, TURN_PC}
```
The *Sign* domain contains *CROSS* and *NOUGHT* as elements of the domain.
The *Status* domain contains *TURN_USER* and *TURN_PC* as elements of the domain.

### Concrete Domain
```asmeta
[ dynamic ] domain D subsetof td
```
* *D* is the name of the concrete domain to declare;  
* *td* is a type-domain which identifies the structure of the elements of the  declared concrete domain;
* the keyword **dynamic** denotes that the  declared domain is *dynamic*. If omitted, the domain is considered *static*.

**Example**
```asmeta
domain Coord subsetof Integer
```
The *Coord* domain contains a subset of elements taken from the *Integer* basic domain. The definition of the elements in the *Coord* domain is done in the *definitions* section.

### Product Domain
```asmeta
Prod ( d₁,d₂,...,dₙ )
```
* *d₁,d₂,...,dₙ*  are the domains over which the Cartesian product is defined.

**Example**
```asmeta
domain Position subsetof Prod(Coord, Coord)
```
The *Position* domain is defined over the Cartesian product of the *Coord* domain. If we consider that the elements of *Coord* are *{1,2,3}*, the elments of domain *Position* are *{(1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3)}*. 

### Sequence Domain
```asmeta
Seq ( d )
```
* *d*  is the domain over which the sequence domain is defined. It is an ordered collection of elements belonging to the domain *d*.

**Example**
```asmeta
domain Plan subsetof Seq(Position)
```
The *Plan* domain is a finite sequence of elements defined in the *Position* domain. If we consider that the elements of *Position* are *{(1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3)}*, the elements of domain *Plan* can be, for example, *((1,1),(1,2),(2,2)}, {(2,2),(2,3),(3,1),(3,3))*. 

### Powerset Domain
```asmeta
Powerset ( d )
```
* *d*  is the domain over which the power set domain is defined.  It is the set of all subsets of a given base domain.

**Example**
```asmeta
domain SignCombination subsetof Powerset(Sign)
```
The *SignCombination* domain contains the set of all subsets of the *Sign* domain. If we consider that the elements of *Sign* are *{CROSS | NOUGHT}*, the elements of the domain *SignCombination* are *{}, {CROSS}, {NOUGHT}, {CROSS, NOUGHT}*.


### Bag Domain
```asmeta
Bag ( d )
```
* *d*  is the domain over which the bag domain is defined.  It is an unordered collection of elements where an element can appear more than once.

**Example**
```asmeta
domain ListOfStudentGrade subsetof Bag(Grade)
```
The *ListOfStudentGrade* domain contains an unordered collection of elements from the *Grade* domain.  If we consider that the elements of *Grade* are *{0,1,2,3,4,5}*, the elements of the domain *ListOfStudentGrade* can be, for example, *{4,5,4,3,5}*.


### Map Domain
```asmeta
Map ( d1,d2 )
```
* *d1,d2*  are the domains over which the map domain is defined.  It is a structured domain used to represent a mapping from a key domain to a value domain, effectively functioning as a mathematical map or dictionary.

**Example**
```asmeta
domain CourseGrade subsetof Map(Course -> Grade)
```
The *CourseGrade* domain contains a map from elements in the *Course* domain to elements in the *Grade* domain.  If we consider that the elements of *Grade* are *{0,1,2,3,4,5}* and elements of *Course* domain are *{MATHS, ARTS, SCIENCE}, the elements of the domain *CourseGrade* can be, for example, *{(MATHS,5), (ARTS,5), (SCIENCE,4)}*.

  
