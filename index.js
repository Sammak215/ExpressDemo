var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const e = require('express')

const signKey = 'sammak'


const users = [
    {
        username: 'sam',
        password: '112233'
    },
];

app.use(bodyParser.json())

app.use(cookieParser())


var validateCookie = function(req, res, next) {
    if(req.cookies.name === 'express')
    {
        res.send('<h1>Cookies at: ' + req.cookies['name'] + '</h1>')
        console.log(req.cookies.name)
    }
    else
    {
        console.error("NO Cookies")
    }
    next()
}

var Auth = function(request, response, next){


    console.log(request)


}


app.get('/',validateCookie, function(req,res){

    res.cookie('name','express').send('cookie set')
    res.send('HELLO WORLD')
    
})


app.get('/auth/get', Auth, function(req,res){

    res.send('Authorized GET REQUEST')
})

app.post('/auth/post', function(req,res){

    console.log(req.body)


   const { accessTokenJWT } = req.body
   var decode = jwt.verify(accessTokenJWT,signKey)
   console.log(decode)

   if(decode.username === "sam")
   {
       res.send(res.send('Authorized POST REQUEST'))
   }
   else
   {
       res.send('UnAuthorized')
   }
  


})

app.get('/get', function(req,res) {
    res.send('GET REQUEST')
})

app.post('/post', function(req, res) {
    const { username , password } = req.body;

    console.log(req.body)

    const user = users.find(u => {

        return u.username === username && u.password === password
    })

    if(user) {
        const accessTokenJWT = jwt.sign({ username: user.username}, signKey );

        res.json({accessTokenJWT})

    }
    else
    {
        res.send('username or password incorrect')
    }
    
})

app.post('/setauth',function(req , res){

    res.json({username:'Sammak', password: '112233'})

})




app.listen(3000)