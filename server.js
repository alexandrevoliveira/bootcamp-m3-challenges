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
    const about = {
        image_url: "https://pbs.twimg.com/profile_images/953595371875422210/0pWsfSSp_400x400.jpg",
        title: "Rocketseat",
        description: "Somos líder no mercado de formacão para área de desenvolvimento web com a utilizacão das seguintes tecnologias:",
        technologies: [
            {name: "HTML"},
            {name: "CSS"},
            {name: "JavaScript"},
            {name: "NodeJS"}
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", { items: cursos })
})

server.get("/courses/:id", function(req, res) {
    const id = req.params.id
    
    const curso = cursos.find(function(curso) {
            return curso.id == id
    })

    if(!curso) {
        return res.send(`O id fornecido da roda é ${id}`)
    }

    return res.render("courses", { item: curso })
})

server.use(function(req, res){
    res.status(404).render("not-found")
})

server.listen(5000, function(){
    console.log("server is running")
})