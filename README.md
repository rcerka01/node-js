# node-js

Install node, then:
```
cd modules
cd events
...
node test-nod.js
```
## How node works
https://nodejs.org

machine code <- V8(c++) <- JavaScript ( or Node.js(c++) )

V8 can be downloaded and edited. It is Google opensource JS engine, translates JS to diferent machine languages (ARM, X86-64, etc.)

ECMASCRIPT -> standart V8 (and other engines) use to translate JS (example: this function must do that, etc.)
You can embede (or hook) V8 into any C++ application, then write any C++ code to JS to understand (e.g. read file, connnect DB). That is what Node.js does.
Good example of embeded V8 is AJAX or Dom. None of them are descripted in ECMASCRIPT


Apart of C++ functions Node has also JS utilities written for you. Often C wrappers 
```
var binding = process.binding('c_function_name')
```
run cli: 
```
node
```
*Visual Studio Code - seems good IDE - fast with great debuger*

*cli: powershell for windows, more powerful than comand line*
