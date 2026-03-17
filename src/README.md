# Welcome 👋

This is an example mdBook documentation project.

It supports:
- Code highlighting
- Navigation sidebar
- GitHub integration

## Example `asmeta` code

```asmeta
module Example {
  import "std"

  rule init -> state {
    let x = 10
    if x > 5 then
      print("x is big")
    else
      print("x is small")
  }
}
```
