# Function Declarations


To declare an ASMETA function, it is necessary to specify the name, the domain, and the codomain of the function.

The schema below shows the concrete syntax for declaring a function *F* (the name) from *D* (the domain) to *C* (the codomain). 
0-ary functions (state variables) have only the codomain.

### Static Function
```asmeta
static F : [ D -> ] C
```
A static function *F* is a function whose value is fixed and does not change during execution. It is defined in the *definitions* section.
*static* functions cannot contain in their definition dynamic or derived  functions.


**Examples**
``` asmeta
signature:
 static maxValue: Integer

definitions:
 function maxValue = 60
```
The static function *maxValue* is a constant and always evaluates to 60.

``` asmeta
signature:
 static max: Prod(Integer,Integer) -> Integer

definitions:
 function max ($a in Integer, $b in Integer)= ...
```
The static function *max* given two integers returns the maximum of them.

### Dynamic Function
```asmeta
[ dynamic ] ( monitored | controlled | shared | out | local ) F : [ D -> ] C
```
 A dynamic function *F* is declared specifying its kind (*monitored*, *controlled*, *shared*, or *out*);  optionally, the keyword *dynamic* can also be added as a prefix. 
 *Local*  dynamic functions can be declared only in the scope of a turbo transition  rule with local state (see section [Transition rules](#rules)).


### Derived Function
```asmeta
derived F : [ D -> ] C
```
*derived* functions are computed from other functions; they can contain in their definition both static and dynamic (and derived) functions (but they must contain at least a dynamic function). *dynamic* functions are re-evaluated at each state.

**Examples**
```asmeta
 signature:
 controlled x: Integer
 controlled y: Integer
 derived sum: Integer

definitions:
 function sum = x + y
```
The function *sum* is derived from *x* and *y*. It is automatically updated whenever *x* or *y* changes.

```asmeta
signature:
 controlled grade: Integer -> Integer
 derived passed: Integer -> Boolean

definitions:
 function passed($g in Integer) =
  grade($g) >= 18
```
The value of the function *passed* is true, if the student *grade* is *>= 18*.
