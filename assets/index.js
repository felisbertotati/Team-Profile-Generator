const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// lest build a team

const menuQuestions = [
  {
    type: "list",
    message: "Choose an option",
    name: `option`,
    choice: ["Add a Manager", "Add an Engineer", "Add an Intern"],
  },
];
// manager questions
const promptManager = () => {
  return inquirer.prompt([
    {
      type: `input`,
      name: `name`,
      message: `What is the Manager name? (Required)`,
      validade: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter the Manager name!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `id`,
      message: ` What is teh Manager ID? (Required)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log(`Please enter the Manager ID!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `email`,
      message: `What is the Manager email adress? (Require)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Please provide the Manger Email!");
          return false;
        }
      },
    },
    {
      type: `input`,
      message: `Enter the office's number: `,
      name: `OfficeNumber`,
      validade: (answer) => confirmNumber(answer),
    },
  ]);
};
//Engineer questions
const EngineerQuestions = () => {
  return inquirer.prompt([
    {
      type: `input`,
      name: `name`,
      message: `What is the Engineer name? (Required)`,
      validade: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter the Engineer name!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `id`,
      message: ` What is the Engineer ID? (Required)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log(`Please enter the Engineer ID!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `email`,
      message: `What is the Engineer email adress? (Require)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Please provide the Engineer Email!");
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `github`,
      message: `What is the Engineer's Github username? `,
      validade: (answer) => confirmUsername(answer, "Github username"),
    },
  ]);
};

const InternQuestions = () => {
  return inquirer.prompt([
    {
      type: `input`,
      name: `name`,
      message: `What is the Intern name? (Required)`,
      validade: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter the Intern name!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `id`,
      message: ` What is the Intern ID? (Required)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log(`Please enter the Intern ID!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `email`,
      message: `What is the Intern email adress? (Require)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Please provide the Intern Email!");
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `school`,
      message: `What School did the Inten attend?`,
      validate: (answer) => confirmShool(answer, "School"),
    },
  ]);
};
