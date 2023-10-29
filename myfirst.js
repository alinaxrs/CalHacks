let https = require('http');
let url = require('url')
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
let fs = require('fs');
const cheerio = require('cheerio');
const { text } = require('body-parser');
//import * as cherio from 'cheerio';

//const controller = new AbortController();
//let wss = new require('ws').server;({server: server});

let db = new sqlite3.Database('C:\\sqlite3\\recipes.db', sqlite3.OPEN_READONLY, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database');
});

let results = [];


let server = https.createServer(async function (req, res) {
    server.on('request', app);

    var q = url.parse(req.url, true);
    var data = q.query;
    let sql = 'SELECT name FROM recipes WHERE minutes = ' + data.time;
    db.serialize(() => {
        db.each(sql, (err, row) => {
            if(err) {
                console.log(err.message);
            }
           // console.log(row);
            results.push(row.name);
        });
    });

    // const $ = await cheerio.fromURL('search_page/index.html');
    // $('ul').append('<li>xyzz</li>');


    // Putting results into the html file.
    fs.readFile('./search_page/index.html', 'utf8', function(err, data){
        var $ = cheerio.load(data);
        //const mylist=document.getElementById("mylist");
        for(let i = 0; i < 5; i++)
        {
            // let recipeName = results[i].name;
            // let node = document.createElement("li");
            // let textnode = document.createTextNode(recipeName);
            // node.appendChild(textnode);
            // mylist.appendChild(node);
            console.log($('ul'));
            $('ul').append('<li>' + results[i] + '</li>');
            console.log(results[i]);

        }
        console.log($);
        
    });
    //res.write(JSON.stringify(results));

    res.end();
});
server.listen(8080);
server.close();

/*app.get('/', (req, res)=>{
    // for(let i = 0; i < 5; i++)
    // {
    //     res.send(results[i].name);
    // }
    res.send("Hello World");
    //res.send("results");
});*/


server.listen(8080);

function buildHTML(req)
{

}


var myEventHandler = function() {
    console.log("I HEAR A SCREAM!");
}

/*
eventEmitter.on('scream', myEventHandler);
eventEmitter.emit('scream')
*/

/*db.close((err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('Close the database connection');
})*/