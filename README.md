# Developer-Profile-Generator
  A command-line application that dynamically generates a PDF profile from a GitHub username
  
The program will generate a PDF and will be populated with the following:

1. Profile image
2. User name
3. Links to the following:

    * User location via Google Maps
    * User GitHub profile
    * User blog

4. User bio
5. Number of public repositories
6. Number of followers
7. Number of GitHub stars
8. Number of users following
  

 # User Story
 AS A product manager

I WANT a developer profile generator

SO THAT I can easily prepare reports for stakeholders

# Business Context
When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

# Install

 In order to run the program, the following must be installed:
 
 * npm init -y - to create a json file
 * npm i axios - in order to make promise request
 * npm install inquire - in order to ask user for a prompt
 * npm i puppeteer - in order to create a PDF file of the html

 
# Deploy
The application will be invoked with the following command:
* node index.js

## Demo
<a href="https://drive.google.com/file/d/1S2UGT1OmhEsEEWPQHaLFJIaxe4lV0tjT/view">View live demo here</a>

![](image/generator.PNG)

# Build With
* HMTL
* CSS
* JavaScript
* Node.js

API: <a href="https://developer.github.com/v3/">Github API</a> 

## Author
* Lloyd Marcelino, 2020

# License
This project is licensed under the MIT License - see the LICENSE.md file for details

