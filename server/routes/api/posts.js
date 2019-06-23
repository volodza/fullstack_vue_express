const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req,res) => {
    const posts = await getPosts();
    res.send(posts.find({}).toArray())
});

router.post('/', async (req,res) => {
    const posts = await getPosts();
    await posts.insertOne({
        text:req.body.text,
        created:new Date()
    })
    res.status(201).send();
});

router.delete('/:id', async (req,res) => {
    const posts = await getPosts();
    await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})


async function getPosts () {
    const uri = "mongodb+srv://abc123:Vkfltytwjou9df9@vueexpress-nq8xi.mongodb.net/test?retryWrites=true&w=majority";
    const client = await mongodb.MongoClient.connect(uri,{ useNewUrlParser: true })
    return client.db("vueExpress").collection("posts");
}

module.exports = router;