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

const promptManager = () => {
  return inquirer.prompt([
    {
      type: `input`,
      name: `name`,
      message: `What is your name? (Required)`,
      validade: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter your name!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `id`,
      message: ` What is your Manager ID? (Required)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log(`Please enter your ID!`);
          return false;
        }
      },
    },
    {
      type: `input`,
      name: `email`,
      message: `What is your email adress? (Require)`,
      validate: (answer) => {
        if (answer) {
          return true;
        } else {
          console.log("Please provide your Email!");
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
