const express = require('express');



let Router = express.Router();

Router.get('/', async(req, res) => {
   let data=[{fname:'zhangsan'},{age:'18'}];
    
    res.send(data);
});

Router.route('/:id').get(async(req, res) => {
    res.set({'Content-Type':'text/html;'});
    var fs = require('fs');
    var data = fs.readFileSync('.//lay//html//index.html');
    res.send(data);
    })


module.exports = Router;
