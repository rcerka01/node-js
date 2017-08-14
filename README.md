# node-js

Install:  https://nodejs.org

Run:
```
cd modules
cd events
...
node test-nod.js
```
## How Node works
Machine code <- V8(c++) <- JavaScript ( or Node.js(c++) )

V8 can be downloaded and edited. It is Google opensource JS engine, translates JS to diferent machine languages (ARM, X86-64, etc.)

ECMASCRIPT -> standart V8 (and other engines) use to translate JS (example: this function must do that, etc.)
You can embede (or hook) V8 into any C++ application, then write any C++ code to JS to understand (e.g. read file, connnect DB). That is what Node.js does.
Good example of embeded V8 is AJAX or Dom. None of them are descripted in ECMASCRIPT


Apart of C++ functions Node has also JS utilities written for you. Often C wrappers 
```
var binding = process.binding('c_function_name')
```
##### Events
* system events - libuv(c++)
* custom events - EventEmitter(js)

JS itself is synchronous (!), however, Node passes events to the event loop (libuv c++ library), where they are processed in OS level (read file e.g.), and returning a callback when it's done. So, the Node is not sitting and waiting for the file to be read. That makes Node not blocking and really fast.

Run cli: 
```
node
```
## Npm

Package manager (kind of sbt for JS) https://www.npmjs.com/

Start new project: 
```
npm init
```

Add package: 
* --save Adds it to the package.json
* -dev Add only for dev environment
* -g Add for all projects in the computer
* ^ Auto update minor versions or patches, but NOT for major
* ~ Would be only for major)
```
npm install moment --save
npm install jasmine-node --save-dev
npm install nodemon -g
```
"nodemon file.js" use instead of "node file.js", it is automatically restarting server if any file changes in the project

Update all packages: 
```
npm update
```
## Express
Node framework http://expressjs.com

Can add middleware, like cookies, sessions, login etc.

"passport" - popular for login.

* how to: http://expressjs.com/en/guide/writing-middleware.html
* available: http://expressjs.com/en/resources/middleware.html

To deal with POST parameters use body parser.
Install:
```
npm install body-parser --save
```

#### EJS template engine for Express http://ejs.co/ 
Install:
```
npm install ejs --save
```

#### DB
Install:
```
npm install mysql --save
npm install mongoose --save
```
Free 500mb mongo db - https://mlab.com/
* user: gmail
* password: usual

#### Angular
Generate CDN for Angular 1: https://angularjs.org/

## Add

*https://www.npmjs.com/ NPM opensource JS packages*

*https://babeljs.io translate JS6+ to older*

*https://code.visualstudio.com/ Visual Studio Code - seems good IDE - fast with great debuger*

*cli: powershell for windows, more powerful than comand line*
