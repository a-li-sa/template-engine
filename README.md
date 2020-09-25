<div align="center">

# Template Engine - Employee Summary

Built with Node.js

* URL of the GitHub repository: https://github.com/a-li-sa/template-engine

* URL of sample team page created by the application: https://a-li-sa.github.io/template-engine/output/team.html

</div>

## Table of Contents 

* [Description](#description)
  * [User Story](#user-story)
* [Installation](#installation)
* [Usage](#usage)
* [Tests](#tests)
* [Built With](#built-with)
* [Credits](#credits)
* [License](#license)

## Description

This command line application will prompt the user for information about an engineering team. The user can input any number of team members, and they may be a mix of managers, engineers and interns. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user.

### User Story

As a manager,
I want to generate a webpage that displays my team's basic info,
so that I have quick access to emails and GitHub profiles.

## Installation

The dependencies are [jest](https://jestjs.io/), for running the provided tests and [inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user. To install the dependencies, run the following command:
```
npm i
```

## Usage

The user will be prompted for their name, email, id, and specific information based on their role with the company. This application uses validation to ensure that the information provided is in the proper expected format. The application will be invoked with the following command:
```
node app.js
```

### Roster output

After the user finishes inputting all the team members, the [team.html](output/team.html) page gets generated in the `output` directory and displays a nicely formatted team roster. Each team member should display the following: name, role, ID, and role-specific property (school, link to GitHub profile, or office number).

This [video](https://youtu.be/56PzSG-JFZQ) demonstrates application functionality and produced this [HTML file](output/team.html). Below is a screenshot of the [responsive page](https://a-li-sa.github.io/template-engine/output/team.html).

<p float="left">
    <img src="https://i.imgur.com/o0F6jWv.png" alt="screenshot" height="320px">
    <img src="https://i.imgur.com/h6sPbUL.png" alt="responsive" height="320px">
</p>

## Tests

To run the tests in the test directory, run the following command:
```
npm test
```

## Built With

* [Node.js](https://nodejs.org/en/) - An open-source JavaScript runtime environment that executes JavaScript outside of the browser. 

## Credits

Starting files from © 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.

## License

Copyright 2020 Alisa Poon

Licensed under the [MIT License](https://opensource.org/licenses/MIT)