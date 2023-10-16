#!/usr/bin/env node
const yargs = require("yargs");
const { inquirerPrompt } = require("./inquirer");
const { copyFile, copyDir, checkMkdirExists, copyTemplate } = require("./copy")
const path = require('path')
const { install } = require('./manager');

// 当 command 方法，在console.log()前面时，该方法不执行？
// pnpm libra create --name=zhou
yargs.command(
  "create",
  "新建一个模板",
  (yargs) => {
    return yargs.option("name", {
      alias: "n",
      demand: true,
      describe: "模板名称",
      type: "string",
    });
  },
  (argv) => {
    inquirerPrompt(argv).then(answers =>{
      const { name, type } = answers
      const fromPath = path.resolve(__dirname, `./template/${type}`)
      const toPath = path.resolve(process.cwd(), `./src/pages/${name}`)
      const isMkdirExists = checkMkdirExists(toPath)
      if(isMkdirExists) {
        console.log(`${name}文件夹已存在`)
      } else {
        // copyDir(fromPath, toPath)
        // copyFile(`${fromPath}/index.js`, `${toPath}/index.js`)
        copyTemplate(`${fromPath}\\index.tpl`, `${toPath}\\index.js`, { name })
        install(process.cwd(), answers);
      }
    })
    // console.log("argv", argv);
  }
).argv;

// pnpm libra --name=zhou
// console.log("libra/bin/index.js", yargs.argv.name);
