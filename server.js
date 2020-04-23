const express = require('express')
const nunjucks = require('nunjucks')
const cursos = require('./data')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})

server.get("/", function(req, res){
    return res.render("about")
})

server.get("/curses", function(req, res){
    return res.render("curses", { items: cursos })
})

server.use(function(req, res){
    res.status(404).render("not-found")
})

server.listen(5000, function(){
    console.log("server is running")
})