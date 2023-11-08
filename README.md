# MVC-based-based-tech-blog
  
![MIT License](https://img.shields.io/badge/License-MIT-green)
  
## Description
  
This is a full stack application that was developed so users can created and interact with content(blog posts and comments) about the tech industry.
The application links to a database with tables for Users, Blog posts, and Comments. When arriving at the home page, users are able to see all the blog post titles in the database displayed in a list. If a user is not logged in when they attempt to interact with the site, they will be redirected to a log in/sign up page.
Once logged in, users are able to view blog posts, comment on blog posts, create their own blog posts, and edit and delete their own blog posts.

Users passwords are hashed through bcrypt to help secure them. The application implements a MVC (model view controller) set up with express routing and sequalise to connect to the front end code.
  
## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Questions](#questions)
  - [License](#license)
  
## Installation
  
Pull down a copy of the repository and navigate to the files location.
Navigate to the 'root' folder, Enter your MYSQL credentials into the `.env.EXAMPLE` file then remove the `.EXAMPLE` from the file name and save it.
After that open the terminal and run `npm i` to intstall the package.json dependencies.
Next run `npm run seed` to seed the database
Next run `npm start` to start the server.
Once done use your broswer of choice to navigate to `http://localhost:3001/` to view the homepage and begin your journey through the application.
Or you may use an application like Insomnia to interact with the database directly.

  
## Usage
  
Usage is straight forward and easy to intuit. 
Users will interact with the application through the front end site, creating an account or logging in to a seeded account is needed to access the full functionality of the site.

  
  
## Contributing
  
No one may contribute to this project.
  
  
## Questions
  
GHOSTDADS's [GITHUB](https://github.com/GHOSTDADS)
  
If you have any questions regarding this project please contact me at [dont@emailme.com](dont@emailme.com).
  
          
## License
          
This project is licensed under the MIT License - see the [License](https://choosealicense.com/licenses/mit/) page for more details.
          
  