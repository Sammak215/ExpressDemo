var express = require('express')
var app = express()

app.get('/auth/get', function(req,res){
    res.send('Hello World')
})

app.listen(3000)

module.exports =  app;