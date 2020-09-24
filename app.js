const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function validateName(name) {
  let reg = /^[a-zA-Z.,\s]*$/;
  return reg.test(name) || "May only contain letters, spaces, periods, or commas";
}
function validateNumber(number)
{
  let reg = /^\d+$/;
  return reg.test(number) || "Must be a number";
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What is the employee's full name?",
    validate: validateName
  },
  {
    type: 'input',
    name: 'id',
    message: "What is the employee's ID?",
    validate: validateNumber
  },
  {
    type: 'input',
    name: 'email',
    message: "What is the employee's email?",
    validate: function validateEmail(email)
    {
      let reg = /@/;
      return reg.test(email) || "Must be a valid email";
    }
  },
  {
    type: 'list',
    name: 'role',
    message: "What is the employee's role?",
    choices: ['Manager', 'Engineer', 'Intern']
  },
  // HINT: each employee type (manager, engineer, or intern) has slightly different
  // information; write your code to ask different questions via inquirer depending on
  // employee type.
  {
    type: 'input',
    name: 'officeNumber',
    message: "What is the manager's office number?",
    when: (answers) => answers.role === 'Manager',
    validate: validateNumber
  },
  {
    type: 'input',
    name: 'school',
    message: "What school is the intern attending?",
    when: (answers) => answers.role === 'Intern',
    validate: validateName
  },
  {
    type: 'input',
    name: 'github',
    message: "What is the engineer's GitHub username?",
    when: (answers) => answers.role === 'Engineer',
    validate: function validateGitHub(input)
    {
      return input !== '' || "Must enter GitHub username";
    }
  }
]
const employees = [];
// Write code to use inquirer to gather information about the development team members,
function inquire() {
  inquirer
    .prompt(questions)
    .then(answers => {
      // and to create objects for each team member (using the correct classes as blueprints!)
      const name = answers.name;
      const id = answers.id;
      const email = answers.email;
      const role = answers.role;
      switch (role) {
        case 'Manager':
          const manager = new Manager(name, id, email, answers.officeNumber);
          employees.push(manager);
          break;
        case 'Engineer':
          const engineer = new Engineer(name, id, email, answers.github);
          employees.push(engineer);
          break;
        case 'Intern':
          const intern = new Intern(name, id, email, answers.school);
          employees.push(intern);
          break;
      }
      console.log(employees);
      inquirer.prompt({
        type: 'confirm',
        name: 'more',
        message: 'Would you like to input another employee?'
      })
        .then (answers => {
          if (answers.more) {
            inquire();
          } else {
            // After the user has input all employees desired, call the `render` function (required
            // above) and pass in an array containing all employee objects; the `render` function will
            // generate and return a block of HTML including templated divs for each employee!
            // After you have your html, you're now ready to create an HTML file using the HTML
            // returned from the `render` function. Now write it to a file named `team.html` in the
            // `output` folder. You can use the variable `outputPath` above target this location.
            // Hint: you may need to check if the `output` folder exists and create it if it
            // does not.
            fs.writeFile(outputPath, render(employees), err => {
              if (err) throw err;
            });
          }
        });
    })
}
inquire();
