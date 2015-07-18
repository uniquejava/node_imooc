# imooc movie.

node+mongodb 建站攻略（一期）练习
http://www.imooc.com/learn/75

###Tech stack
    nodejs
    express
    jade
    mongoose
    moment
    underscore
    bower
    jquery
    bootstrap

Developed with sublime text 2 under Ubuntu.

###Install

    bower install #front-end
    npm install #backend

###Run
Type `node app.js`

|#|module|url|
|---|---|---|
|1|home|http://localhost:3000
|2|add|http://localhost:3000/admin/movie
|3|detail|http://localhost:3000/movie/:id
|4|lis|http://localhost:3000/admin/list

###Release
`bower init` and `npm init`.

###Todo
Fix warning
> body-parser deprecated bodyParser: use individual json/urlencoded middlewares app.js:14:9
