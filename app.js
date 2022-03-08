//setup the constants and variables
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

//setup database connection as a Promise
MongoClient.connect(url, {useUnifiedTopology: true})
    .then(client => {
        console.log('connected to database');
        //adding the database and collection
        const db = client.db('favorite-costumes');
        const costumeCollection = db.collection('subscription');
//========================Middleware==============================
        //setup body-parser
        app.use(bodyParser.urlencoded({extended: true})); 
        //setup view engine
        app.set('view engine', 'ejs');
        //route to index and to read data
//========================Routes==================================
       //route to retrieve data and display index.ejs
       app.get('/', (req, res) => {
            db.collection('subscription').find().toArray()
              .then(subscription => {
                res.render('index.ejs', { subscription: subscription})
              })
              .catch(/* ... */)
          })

        //route--adding an item to the collection
        app.post('/subscription', (req, res)=>{
            costumeCollection.insertOne(req.body)
            .then(result =>{
                res.redirect('/');
                //console.log(result);
            })
            .catch(error => console.error(error));
        })
 //==============Server=====================================
    app.listen(8000, function(){
        console.log('server is working');
    })
})//ending the connection
.catch(console.error);