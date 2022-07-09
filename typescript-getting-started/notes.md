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
      - Managing null and undefined with `--strictNullChecks` compiler option

  - type assertion:
    E.g., `(<number>value).toFixed(4)` or `(value as number).toFixed(4)`.

  - type annotations and type inference
    - Array as, e.g., `number[]`.

  - control flow-based type analysis (!)
    - typeof conditions - for the most specific type possible

- better functions
  - type annotations
    - parameter? as optional
    - return type as `funFunc(): void {}`
    - `--noImplicitAny` compiler option
  - arrow functions
    - one typed parameter needs parentheses too 
    
  - declaring function types: arrow-function like

- custom types
  - Interfaces
    - Properties (signatures - a name and a type)
    - Methods (signatures - number and type of parameters and the return type, but no implementation)
    - Cannot be instantiated, but define a contract
  - Classes
    - Properties (with implementation)
      - Custom accessor functions (getters and setters)
      - `private privateProperty: string`
      - `#protectedProperty: string` (Typescript 3.8+)

    - Methods (with implementation)
      - do not need function keyword
    - Can be instantiated

    - `new` constructor
    - `extends`, `implements`
    - `static` properties/methods are only available via class, they don't use this. to refer to other class properties
    - `constructor()`
    - `readonly` property
    

- modules
  - supporting technologies for typescript modules in browser applications
    - Typescript compiler -> JS Modules: AMD, CommonJS, UMD, System, ES2015
    - Loader/Bundler: Node, RequireJS, SystemJS, Webpack

  - import and export syntax
  - module resolution (location)
    - `tsc --moduleResolution Classic | Node`
      - Classic: AMD, UMD, System, ES2015
        - 
      - Node: CommonJS
        - Closely mirrors Node module resolution
        - More configurable: reads `project.json`

    - tsconfig: 
      - "paths": {"my_lib": ["./customPath"]} is relative to "baseUrl": "..."
      - "rootDirs": [] for source files spread accross multiple directories


- type-declaration files
