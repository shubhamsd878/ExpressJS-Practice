Whenever we create a project using npm, we need to provide a package.json file, which has all the details about our project. npm makes it easy for us to set up this file. Let us set up our development project.

1.  npm init
2.  will ask for questions
3.  npm install --save express      --> can also use -S flag instead  of save

4.  to confirm for successfull installation code:
        ls node_modules #(dir node_modules for windows)

    To make our development process a lot easier, we will install a tool from npm, nodemon. This tool restarts our server as soon as we make a change in any of our files, otherwise we need to restart the server manually after each file modification. To install nodemon, use the following command

5.  npm install -g nodemon

6.  Create a new file called index.js

7.  type your code and run it through
    nodemon index.js


    HELLO WORLD


    Routing

 1. curl -X POST "http://localhost:3000/hello"
    if didn't work:
    remove-item alias:\curl

    templates

1.  npm install -S pug

    forms
1.  body-parser(for json and url-encoded data) and multer (for parsing multipart/form data) middleware
    npm -I --save body-parser multer

    database
    install api for node -> Mongoose
    npm install mongodb
    npm insatll mongoose