var express = require('express');
var router = express.Router();
var { createClient } = require('redis');
console.log('process.env.REDIS_URL: ', process.env.REDIS_TLS_URL);
const client = createClient({
  url: process.env.REDIS_URL
});
client.on('error', (err) => console.log('Redis Client Error', err));

var q = 'tasks';

var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var open = require('amqplib').connect(url);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/redis', async function(req, res, next) {
  try{
    await client.connect();
  } catch(e){

  }

  await client.set(Math.random() + "_akey", "BOYAHHHH")
  const allkeys = await client.keys("*");
  console.log("allkeys: ", allkeys);
  res.render('index', { title: 'Redis key created' });
});

router.get('/addtoqueue', async function(req, res, next) {
  // Publisher
  const conn = await open;
  const channel = await conn.createChannel();
  await channel.assertQueue(q);
  await channel.sendToQueue(q, new Buffer('something to do' + Math.random()));
  res.render('index', { title: 'Queue entry created' });

});

module.exports = router;
