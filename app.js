const express = require("express");
const path = require("path");
const app = express();
// getting-started.js
const bodyparser=require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/foodWebsites');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const port = 800;

const FoodSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,

  });

const Contact = mongoose.model('Contact', FoodSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('index.pug');
})

app.post("/contact", (req, res)=>{
  var myData=new Contact(req.body);
  myData.save().then(()=>{
    res.send("Login Successfully")
  }).catch(()=>{
    res.status(400).send("Not Login Successfully")
  });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
