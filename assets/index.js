const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const managers = [];
const engineers = [];
const interns = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// lest build a team

const menuQuestions = [
  {
    type: "list",
    message: "Choose an option: ",
    name: `option`,
    choices: ["Add an Engineer", "Add an Intern", "Finish Building the team"],
  },
];

// manager questions
const promptManager = [
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
    message: ` What is the Manager ID? (Required)`,
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
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
];

//Engineer questions
const EngineerQuestions = [
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
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
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
];

const InternQuestions = [
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
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
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
    validate: (answer) => {
      if (answer) {
        return true;
      } else {
        console.log("Please provide the Intern's School!");
        return false;
      }
    },
  },
];

// Define a function to prompt the user to return to the menu
function returnToMenu() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Do you want to return to the menu?",
        name: "returnToMenu",
      },
    ])
    .then((answer) => {
      if (answer.returnToMenu) {
        promptMenu();
      } else {
        console.log("Goodbye!");
      }
    });
}

inquirer.prompt(promptManager).then((managerData) => {
  // Use the managerData object to create a new manager instante
  const manager = new Manager(
    managerData.name,
    managerData.id,
    managerData.email,
    managerData.officeNumbe
  );
  managers.push(manager);
  returnToMenu();
});

//after create the manage instance, display menu questions to the user
function promptMenu() {
  inquirer.prompt(menuQuestions).then((menuData) => {
    //use the menu data object to determine which option the user selected and perfom the appropriate action

    switch (menuData.option) {
      case "Add an Engineer":
        inquirer.prompt(EngineerQuestions).then((engineerData) => {
          const engineer = new Engineer(
            engineerData.name,
            engineerData.id,
            engineerData.email,
            engineerData.github
          );
          engineers.push(engineer);
          returnToMenu();
        });

        break;

      case "Add an Intern":
        inquirer.prompt(InternQuestions).then((internData) => {
          const intern = new Intern(
            internData.name,
            internData.id,
            internData.email,
            internData.school
          );
          interns.push(intern);
          returnToMenu();
        });
        break;

      case "Finish building the team":
        const teamData = (managers, engineers, interns);
        const html = render(teamData);

        fs.writeFile(outputPath, html, (err) => {
          if (err) throw err;
          console.log(`Team profile successfully generated at ${outputPath}`);
        });
        break;
      default:
        console.log("Invalid option selected");
        break;
    }
  });
}
