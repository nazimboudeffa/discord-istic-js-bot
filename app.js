const Discord = require('discord.js');
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')

//const { CONFIG_TOKEN } = require('./config.json');
//var token = CONFIG_TOKEN || process.env.TOKEN
var token = process.env.TOKEN
var port = process.env.PORT || 3000

const client = new Discord.Client();

// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/public'))

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(port, function () {
  console.log('ISTIC app listening on port 3000!')
})

const prefix = 'istic!';
let isticChannel = 'istic-bot';

/* User joins the server */
client.on('message', (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    var actualChannel = message.channel.name

    if(actualChannel != isticChannel) {
        message.channel.send(`${message.author} you cannot use a istic! command here, please move to #${isticChannel}`);
    } else {

      if(command === 'ping'){

        message.channel.send("pong");
        return;

      }

    }
});

client.on('ready', () => {
    console.log('ISTICjs bot is now connected to Discord');
});

client.login(token);
