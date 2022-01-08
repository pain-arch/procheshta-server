const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId  = require('mongodb').ObjectID;
const app = express()
const cors = require('cors');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Procheshta Backend')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hwouc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const adminsCollection = client.db("procheshta").collection("admins");
  const campaignsCollection = client.db("procheshta").collection("campaigns");
  const articlesCollection = client.db("procheshta").collection("articles");
  const donationCollection = client.db("procheshta").collection("donations");
  const contactCollection = client.db("procheshta").collection("contacts");
  const joinedCampaignCollection = client.db("procheshta").collection("joinedcampaign");

  console.log("Data base connected");


  //Admin Database Section
  app.post("/adminupload",(req,res)=>{
    const newAdmin = req.body;
    adminsCollection.insertOne(newAdmin)
    .then(result => {
      res.send(result.insertedCount > 0)
      res.redirect("/")
    })
  })

  app.get("/showadmins", (req,res)=>{
    adminsCollection.find()
    .toArray((err, admins)=>{
      res.send(admins)
    })
  })

  //Campaigns Database Section
  app.post("/campaignupload",(req,res)=>{
    const newCampaign = req.body;
    campaignsCollection.insertOne(newCampaign)
    .then(result => {
      res.send(result.insertedCount > 0)
      res.redirect("/")
    })
  })

  app.get("/showcampaigns", (req,res)=>{
    campaignsCollection.find()
    .toArray((err, campaigns)=>{
      res.send(campaigns)
    })
  })

  //Articles Database Section
  app.post("/articleupload",(req,res)=>{
    const newArticle = req.body;
    articlesCollection.insertOne(newArticle)
    .then(result => {
      res.send(result.insertedCount > 0)
      res.redirect("/")
    })
  })

  app.get("/showarticles", (req,res)=>{
    articlesCollection.find()
    .toArray((err, articles)=>{
      res.send(articles)
    })
  })

  //Donation Database Section
  app.post("/givedonation",(req,res)=>{
    const newDonation = req.body;
    donationCollection.insertOne(newDonation)
    .then(result => {
      res.send(result.insertedCount > 0)
      res.redirect("/")
    })
  })

  app.get("/showdonations", (req,res)=>{
    donationCollection.find()
    .toArray((err, donations)=>{
      res.send(donations)
    })
  })

  //Contact Database Section
  app.post("/contact",(req,res)=>{
    const newContact = req.body;
    contactCollection.insertOne(newContact)
    .then(result => {
      res.send(result.insertedCount > 0)
      res.redirect("/")
    })
  })

  app.get("/showcontacts", (req,res)=>{
    contactCollection.find()
    .toArray((err, contacts)=>{
      res.send(contacts)
    })
  })

  //Joined Campaign Database Section
  app.post("/joinedcampaign",(req,res)=>{
    const newJoinedCampaign = req.body;
    joinedCampaignCollection.insertOne(newJoinedCampaign)
    .then(result => {
      res.send(result.insertedCount > 0)
      res.redirect("/")
    })
  })

  app.get("/showjoinedcampaigns", (req,res)=>{
    joinedCampaignCollection.find()
    .toArray((err, joined)=>{
      res.send(joined)
    })
  })




 
});







app.listen(process.env.PORT || port)