const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// lest build a team

const menuQuestions = [
  {
    type: "list",
    message: "Choose an option: ",
    name: "option",
    choices: ["Add an Engineer", "Add an Intern", "Finish Building the team"],
  },
];

// manager questions
const promptManager = [
  {
    type: "input",
    name: "name",
    message: "What is the Manager name? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the Manager name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "id",
    message: " What is the Manager ID? (Required)",
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is the Manager email adress? (Require)",
    validate: (answer) => {
      const testEmail = /\S+@\S+\.\S+/.test(answer);
      if (testEmail === false || testEmail == "") {
        return "Please provide a valid email";
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    message: "Enter the office's number: ",
    name: "officeNumber",
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
  },
];

//Engineer questions
const EngineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the Engineer name? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the Engineer name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "id",
    message: " What is the Engineer ID? (Required)",
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is the Engineer email adress? (Require)",
    validate: (answer) => {
      const testEmail = /\S+@\S+\.\S+/.test(answer);
      if (testEmail === false || testEmail == "") {
        return "Please provide a valid email";
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "github",
    message: "What is the Engineer's Github username? ",
    validate: (answer) => {
      if (answer) {
        return true;
      } else {
        console.log("Please provide the Engineer Email!");
        return false;
      }
    },
  },
];

const InternQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the Intern name? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Please enter the Intern name!");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "id",
    message: " What is the Intern ID? (Required)",
    validate: function (value) {
      const valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is the Intern email adress? (Require)",
    validate: (answer) => {
      const testEmail = /\S+@\S+\.\S+/.test(answer);
      if (testEmail === false || testEmail == "") {
        return "Please provide a valid email";
      } else {
        return true;
      }
    },
  },

  {
    type: "input",
    name: "school",
    message: "What School did the Inten attend?",
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
        console.log("Thank");
      }
    });
}

function init() {
  inquirer.prompt(promptManager).then((managerData) => {
    // Use the managerData object to create a new manager instante
    const manager = new Manager(
      managerData.name,
      managerData.id,
      managerData.email,
      managerData.officeNumber
    );
    team.push(manager);
    returnToMenu();
  });
}

//after create the manage instance, display menu questions to the user
//after create the manage instance, display menu questions to the user
function promptMenu() {
  inquirer.prompt(menuQuestions).then((menuData) => {
    // Check which option the user selected
    switch (menuData.option) {
      case "Add an Engineer":
        // Prompt user for engineer information
        inquirer.prompt(EngineerQuestions).then((engineerData) => {
          // Use the engineerData object to create a new engineer instance
          const engineer = new Engineer(
            engineerData.name,
            engineerData.id,
            engineerData.email,
            engineerData.github
          );
          team.push(engineer);
          returnToMenu();
        });
        break;
      case "Add an Intern":
        // Prompt user for intern information
        inquirer.prompt(InternQuestions).then((internData) => {
          // Use the internData object to create a new intern instance
          const intern = new Intern(
            internData.name,
            internData.id,
            internData.email,
            internData.school
          );
          team.push(intern);
          returnToMenu();
        });
        break;
      case "Finish Building the team":
        // Generate HTML file using the team array
        const html = render(team);
        // Write HTML file to output directory
        fs.writeFile(outputPath, html, (err) => {
          if (err) throw err;
          console.log("HTML file generated successfully!");
        });
        break;
    }
  });
}

init();
