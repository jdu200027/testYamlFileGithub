const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded())

app.use(bodyParser.json())

app.get('/test', (req, res)=>{
    res.status(200).json({message: 'test'});
})

const PORT = 5000;

app.listen(PORT, ()=> console.log(`Port listen ${PORT}`));