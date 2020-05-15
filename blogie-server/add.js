const express = require('express')
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const { param, query, validationResult } = require('express-validator')


// Connection URL
const url = 'mongodb+srv://admin:9915879502@api-wqyyk.gcp.mongodb.net/blogie?retryWrites=true';

async function setTags() {
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    let tags = await db.collection('tags').findOne({})
    await db.collection("tags").updateOne({_id: "tags"}, {$set: {
        tags: [ { "popularity": 1, "tag": "android", "enabled": false }, { 
"popularity": 1, "tag": "ios", "enabled": false }, { "popularity": 1, 
"tag": "windows", "enabled": false }, { "popularity": 1, "tag": 
"linux", "enabled": false }, { "popularity": 1, "tag": 
"cryptocurrency", "enabled": false }, { "popularity": 1, "tag": 
"blockchain", "enabled": false }, { "popularity": 1, "tag": 
"cybersecurity", "enabled": false }, { "popularity": 1, "tag": 
"hacking", "enabled": false }, { "popularity": 1, "tag": 
"programming", "enabled": false }, { "popularity": 1, "tag": "games", 
"enabled": false }, { "popularity": 1, "tag": "news", "enabled": 
false }, { "popularity": 1, "tag": "data", "enabled": false }, { 
"popularity": 1, "tag": "digital art", "enabled": false } ]

    }}, {upsert: true})
}

setTags()
