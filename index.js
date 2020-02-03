"use strict";

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFiles = util.promisify(fs.writeFile);
const puppeteer = require('puppeteer');
const { resolve } = require("path");
let gitName;
let github;
let gitBlog;
let gitImg;
let gitBio;
let gitCompany;
let gitFollowers;
let gitStars;
let gitFollowing;
let gitRep;
let gitLocation;
let test;



const colors = {
    green: {
        bodyColor: '#E6E1C3',
        cardColor: '#C1C72C',
        fontColor: '#000000',
        photo: '#000000'
    },
    blue: {
        bodyColor: '#5F64D3',
        cardColor: '#26175A',
        fontColor: '#ffffff',
        photo: '#73448C'
    },
    pink: {
        bodyColor: '#879CDF',
        cardColor: '#FF8374',
        fontColor: '#ffffff',
        photo: '#FEE24C'
    },
    red: {
        bodyColor: '#DE9967',
        cardColor: '#870603',
        fontColor: '#ffffff',
        photo: '#ffffff'
    },
    black: {
        bodyColor: '#808080',
        cardColor: '#000000',
        fontColor: '#ffffff',
        photo: '#808080'
    },
    orange: {
        bodyColor: '#C36900',
        cardColor: '#FFA500',
        fontColor: '#ffffff',
        photo: '#FF8374'
    }
};


inquirer
    .prompt([
        {
            message: "What is your GitHub username? ",
            name: "username"
        },
        {
            type: "list",
            message: "What color do you want for your background? ",
            name: "color",
            choices: [
                "green", "blue", "black", "red", "pink", "orange"
            ]
        }
    ])
    .then(({ username, color }) => {
        const qURL = `https://api.github.com/users/${username}`;
        const qSTAR = `https://api.github.com/users/${username}/starred`;

        axios.get(qSTAR).then(response => {

            gitStars = response.data.length;



        });

        axios.get(qURL).then(response => {


            gitName = response.data.name;
            gitImg = response.data.avatar_url;
            gitBio = response.data.bio;
            gitCompany = response.data.company;
            gitFollowers = response.data.followers;
            gitFollowing = response.data.following;
            gitRep = response.data.public_repos;
            gitLocation = response.data.location;
            github = response.data.html_url;
            gitBlog = response.data.gists_url;

        }).then(function () {

            const generateHTML = `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
                    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
                    <link rel="stylesheet" href="https://fontawesome.com/v4.7.0/path/to/font-awesome/css/font-awesome.min.css">
                    
                    <title>Github Discovery</title>
                    <style>
                        body{
                            background-color: ${colors[color].bodyColor};
                            color: ${colors[color].fontColor};
                        }
                        #top-card {
                            padding-top: 70px;
                        }
                        .card-body, .test-body {
                            background-color: ${colors[color].cardColor};
                            border: solid 5px ${colors[color].fontColor};
                        }
                        #photo {
                            height: 300px;
                            width: 300px;
                            border: solid 5px;
                            border-radius: 50%;
                            border-color: ${colors[color].photo};
                        }

                        #firstRow {
                            padding-top: 70px;
                        }

                        #secondRow {
                            padding-top: 20px;
                            padding-bottom: 70px;

                        }
                    </style>
                
                </head>
                
                <body>
                    <div class="container text-center" id="top-card">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <img src="${gitImg}" class="img-responsive img-circle" id="photo">
                                        <h1>Hi!</h1>
                                        <h2>My name is ${gitName}</h2>
                                        <p>${gitBio}</p>
                                        <h5>Currenty at ${gitCompany}</h5>
                                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-4">
                                        <p><i class="fa fa-map-marker"></i> ${gitLocation}</p>   
                                    </div>
                                    <div class="col-sm-12 col-md-4">     
                                        <p><a href=${github}><i class="fa fa-github" aria-hidden="true"></i> Github</a></p>          
                                    </div>
                                    <div class="col-sm-12 col-md-4">
                                        <p><a href=${gitBlog}><i class="fa fa-rss" aria-hidden="true"></i> Blog</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container text-center">
                        <div class="row" id="firstRow">
                            <div class="col-sm-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="card-title">Public Repos</h3>
                                        <h4 class="card-text"><i class="fa fa-file-code-o" aria-hidden="true"></i> ${gitRep}</h4>
                                    </div>
                                </div>
                            </div>
                    
                            <div class="col-sm-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="card-title">Followers</h3>
                                        <h4 class="card-text"><i class="fa fa-heart" aria-hidden="true"></i> ${gitFollowers}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="secondRow">
                            <div class="col-sm-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="card-title">Github Stars</h3>
                                        <h4 class="card-text"><i class="fa fa-star" aria-hidden="true"></i> ${gitStars}</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h3 class="card-title">Following</h3>
                                        <h4 class="card-text"><i class="fa fa-users" aria-hidden="true"></i> ${gitFollowing}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                
                </html>`;
            writeFiles("index.html", generateHTML, function (err) {
                if (err) {
                    return console.error(err);
                }
            });

            toPDF();

        });
    });




async function toPDF() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`file://${resolve(__dirname, `index.html`)}`, { waitUntil: `networkidle0` });
    const pdf = await page.pdf({ path: `Profile.pdf`, format: 'A4', printBackground: true });

    await browser.close();
    return pdf
}
