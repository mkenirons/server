const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')))


const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//mongodb+srv://admin:<password>@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority
// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

const bookModel = mongoose.model('fdgdfgdfgdfg', bookSchema);

app.post('/api/books',(req,res)=>{
  console.log(req.body);

  bookModel.create({
    title: req.body.title,
    cover:req.body.cover,
    author:req.body.author
  })
  
  res.send('Data Recieved');
})

app.get('/api/books', (req, res) => {
  bookModel.find((error, data)=>{
    res.json(data);
  })
})

app.get('/api/book/:id', (req, res)=>{
  console.log(req.params.id);
  bookModel.findById(req.params.id,(error,data)=>{
    res.json(data);
  })
})

app.put('/api/book/:id', (req, res)=>{
  console.log("Update: "+req.params.id);

  bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error,data)=>{
      res.send(data);
    })
})

app.delete('/api/book/:id',(req, res)=>{
  console.log('Deleting: '+req.params.id);
  bookModel.findByIdAndDelete({_id:req.params.id},(error,data)=>{
    if(error){
      res.status(500).send(error);
    }
    res.status(200).send(data);
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})