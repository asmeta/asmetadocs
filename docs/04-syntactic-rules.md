---
title: Syntactic Rules on Identifiers
---

# 4.
Syntactic rules on ID names

## 4.
Syntactic rules on ID names

We
use the following rules to distinguish among names of *domains*, *functions*,
*enumeration elements*, *rules*, *variables*:

**ID_VARIABLE**          a
string begining with the dollar sign "$";
e.g.   $x      $abc    $pippo

        

**ID_ENUM**          
       a string of length greater than or equal
to two and consisting of upper-case letters only; e.g.   ON      OFF    
RED 

        

**ID_DOMAIN**            
a string begining with an upper-case letter;
e.g.     Integer    
X      SetOfBags      
Person

        

**ID_RULE**     
             
a string begining the lower-case letter "r"
followed by the underscore symbol "_"; e.g.     r_SetMyPerson    r_update

    

**ID_FUNCTION**          a
string begining with a lower-case letter, but not
starting with "r_"; e.g.      plus      
minus        re
