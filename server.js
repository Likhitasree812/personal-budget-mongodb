const express = require('express');
const fileSystem = require('fs');
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const budgetsModel = require('./models/budget');

mongoose.connect('mongodb://0.0.0.0:27017/personal-budget', 
                {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})
.catch(err=>console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    budgetsModel.find()
    .then( budgets =>  res.json(budgets))
    .catch(err=>next(err));
});

app.post("/new" , (req,res) => {
    let budget = new budgetsModel(req.body);
    budget.save()
    .then( data => {
        console.log("inserted the new budget",data);
        res.send("Document inserted successfully");
    })
    .catch(err=>{
        console.log(err);
        res.send(err.errors);
    });
})

app.use('/',express.static('public'));