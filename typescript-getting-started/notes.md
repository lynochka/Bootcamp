Typescript 4: Getting Started

Cltr+Space to see the list of settings in tsconfig.json file.

- built-in types
  - replace all var with let and const

  - new types:
    - Enum
    - Void: abscence of a type
    - Null
    - Undefined
    - Never: type assigned to values that will never occur
    - Any
    - Union, aka, number | string
      - Managing null and undefined with --strictNullChecks compiler option

  - type assertion:
    E.g.,(<number>value).toFixed(4) or (value as number).toFixed(4)

  - type annotations and type inference

  - control flow-based type analysis (!)
    - typeof conditions - for the most specific type possible
- better functions
- custom types
- modules
- type-declaration files
