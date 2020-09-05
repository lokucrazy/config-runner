# Config Runner
version: 1.0.0

this is an npm tool to help me run multiple configs for webpack or rollup.  Sometimes with projects I have mutltiple config files for separate parts so I wrote this to help.

install via npm
`npm i --save-dev config-runner`

run passing in the cli used and the configs
`npx config-runner webpack first.config.js second.config.js ...`

if you don't provide configs it will look for a `./configs` directory

do note that configs need to match the following regex
`[A-Za-z]+\.config\.js$`
or they will fail

Currently supporting webpack and rollup, might add some others 🤷🏽‍♂️
