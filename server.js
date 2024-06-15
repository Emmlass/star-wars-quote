import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import {MongoClient} from "mongodb";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());

const connectionString = "mongodb://localhost:27017/"; //
//mongodb+srv://emmlass:6ooW49QtuBo6485q@star-wars-quotes.zbxnon3.mongodb.net/Replace with your actual connection string
// let db;

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(client => {
    console.log('Connected to Database');
    const db = client.db('star-wars-quotes'); 
    const quotesCollection = db.collection('quotes'); // Ensure the collection name matches your MongoDB setup
    app.set("view engine",'ejs')
  

    app.get('/', (req, res) => {
      // res.sendFile(path.join(__dirname, 'index.html'));
      db.collection("quotes").find().toArray()
      .then((results)=>{
        res.render("index.ejs", {quotes: results})
      })
    });


    app.post("/quotes", (req, res) => {
      quotesCollection.insertOne(req.body)
      .then(result=>{
        console.log(result)
        res.redirect("/")
      })
        
    app.put('/quotes',(req,res)=>{
      console.log(req.body)
    })
    // app.listen(3000,()=>{
    //     console.log('Server is running on port 3000');
    //   });
  

    // app.use();
    // app.get();
    // app.post();
    // app.listen();
  })
  
  app.listen(3000,()=>{
    console.log('Server is running on port 3000');
  });
  
})
.catch(error => console.error(error));
