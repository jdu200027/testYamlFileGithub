const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded())

app.use(bodyParser.json())

app.get('/test', (req, res)=>{
    res.status(200).json({message: 'test'});
})

app.get('/test-2', (req,res)=>{
    res.status(200).json({message: 'abcd'});
})

app.get('/test-3', (req, res)=>{
    res.send("Hello World!");
})

const PORT = 5000;

app.listen(PORT, ()=> console.log(`Port listen ${PORT}`));