const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cors = require('cors');
const { param, query, validationResult } = require('express-validator')


// Connection URL
const url = 'mongodb+srv://admin:9915879502@api-wqyyk.gcp.mongodb.net/blogie?retryWrites=true';

var jwt = require('jsonwebtoken');

const secret = '148e34ded3d805405596314dc5e4f377';

app.use(express.json({type: '*/*'}));
app.use(cors({ origin: true }))

// For geting individual posts by tag
async function getArticleByTag(db, tag, limit, page) {
    /*
    ::param tag: A keyword to search in articles.
    ::param limit: for limiting response
    */
    
    let skip = page > 1 ? limit : 0;
    console.log(skip);
    const collection = db.collection('data');
    let query = {tags: tag};
    let options = {
      "limit": limit,
      "skip": skip,
    }
    data = await collection.find(query, options).toArray()
    data.forEach((val) => {
        val.searched_for = tag
    });
    return data
}

//Used as main function for getting articles
async function getArticles(tags, limit=20, page=1) {
    /*
    function to get posts from database by using separate threads.
    ::param tags - Keywords to find in articles.
    ::param limit - for limiting response.
    ::param page - for paginating response.
    */
    
    let items = Array();  //empty list to append item into
    let bisect = Math.round(limit / tags.length); //bisect limit by length
    
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    
    for(let tag of tags) {
        items.push(...await getArticleByTag(db, tag, bisect, page))
    }
    client.close();
    
    console.log(items.length);
    return items
    
    
    /*
    Depending upon length of items list, return the given data specified by limit param and distribute results to individual pages
    */
}

const authenticate = (req, res, next) => {
    const auth = req.query.auth;

    if (auth) {

        jwt.verify(auth, secret, (err, user) => {
            if (err) {
                res.json({
                    status: 'error',
                    message: 'invalid or expired authentication token'
                });
                return res.status(403); 
            }

            req.user = user;
            console.log(user);
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//main route
app.get('/api/', 
            [
                query('q')
                .isString()
                .notEmpty()
                .trim()
                .exists(),
                
                query('page')
                .optional()
                .isInt()
                .toInt()
                .withMessage('Page number you want to go to.'),
                
                //~ query('auth')
                //~ .isString()
                //~ .notEmpty()
                //~ .trim()
                //~ .exists(),
             ],
                async (req, res, nest) => {

    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {     
    return res.status(422).json({ errors: errors.array() });   
    }
    let q = req.query.q.split(',');
    let limit = req.query.limit ? req.query.limit : 10;
    let page = req.query.page ? req.query.page : 1;
    let auth = req.query.auth
    
    const data = await getArticles(q, limit, page);
    
    res.json({
            status: 'ok',
            total_length: data.length,
            content: data
            });
});


app.get('/api/user/', async (req, res) => {
    let email = req.query.email.split(':')[0];
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    let user = await db.collection('user').findOne({email: email})
    
    if (user) {
        res.json(
            {
              status: 'ok',
              data: user
            });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        res.sendStatus(404);
        res.json(
            {
              status: 'error',
              message: 'user does not exists'
            });
    }
})

app.get('/api/setuser/', async (req, res) => {
  
    let email = req.query.email;
    
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    const user = await db.collection('user').findOne({email: email})
    
    if (!user) {
        let tags = await db.collection('tags').findOne({})
        
        let data = {
            email: email,
            preferences: tags.tags
        }
            
        db.collection("user").insertOne(
        {
            email: data.email,
            preferences: data.preferences
        }
        ).then((err, val) => {
            res.status(201).json({status: "ok"});
        })
        .catch((err) => {
            res.sendStatus(500);
        })
    } else {
        res.status(401).json({status: "error", message: "email already in use"});
    }
})

app.post('/api/updateuser/', async (req, res) => {
  
    let email = req.query.email;
    let tags = req.query.tags.split(',');
    
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    
    let newTags = Array();

    tags.forEach((val) => {
      newTags.push({
        tag: val,
        popularity: 1,
        enabled: true
        });
    })
      
    let data = {
        email: email,
        preferences: newTags
    }
    await db.collection("user").updateOne({email: email}, {$set: {
        email: data.email,
        preferences: data.preferences
    }}, {upsert: true})
    res.sendStatus(201);
})

app.post('/api/removeuser/', async (req, res) => {
    let email = req.query.email.split(':')[0];
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    let user = await db.collection('user').deleteOne({email: email})
    res.sendStatus(200);
})

app.get('/api/tags/', async (req, res) => {
    let client = await MongoClient.connect(url, {useUnifiedTopology: true})
    let db = client.db('blogie');
    let tags = await db.collection('tags').findOne({})
    res.json(
            {
              status: 'ok',
              data: tags
            });
})


app.listen(8000, () => {
  console.log('Runing on Port 5000!')
});
