const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your full name?'
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is your ID number?'
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?'
  },
  {
    type: 'list',
    name: 'role',
    message: 'What is your role?',
    choices: ['Manager', 'Engineer', 'Intern']
  },
  // HINT: each employee type (manager, engineer, or intern) has slightly different
  // information; write your code to ask different questions via inquirer depending on
  // employee type.
  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is your office number?',
    when: (answers) => answers.role === 'Manager'
  },
  {
    type: 'input',
    name: 'school',
    message: 'What school are you attending?',
    when: (answers) => answers.role === 'Intern'
  },
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
    when: (answers) => answers.role === 'Engineer'
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
