const inquirer = require("inquirer");

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "input",
    name: "name",
    message: "模板名称",
    validate: (val) => true,
  },
  {
    type: "list",
    name: "type",
    message: "模板类型",
    choices: ["表单", "动态表单", "嵌套表单"],
    filter: (val) => {
      const dict = {
        表单: "form",
        动态表单: "dynamicForm",
        嵌套表单: "nestedForm",
      };
      return dict[val];
    },
    validate: (val) => true,
  },
  {
    type: "list",
    message: "使用什么框架开发",
    choices: ["vue2", "vue3", "react"],
    name: "frame",
  },
];

const inquirerPrompt = (argv) => {
  const questionMap = new Map(questions.map((item, index) => [item.name, index]))
  Object.keys(argv).map(key => {
    if(questionMap.get(key) >= 0) {
      questions[questionMap.get(key)].default = argv[key]
    }
  })
  return prompt(questions)
    .then(async (answers) => {
      const { frame } = answers;
      let res = {};
      if (frame === "react") {
        res = await prompt([
          {
            type: "list",
            message: "使用什么UI组件库开发",
            choices: ["Ant Design"],
            name: "library",
          },
        ]);
      }
      return Promise.resolve({ ...answers, ...res });
    })
    .then((answers) => {
      return Promise.resolve(answers);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.inquirerPrompt = inquirerPrompt;
