const express = require("express");
const app = express();
app.engine('html',require('ejs').renderFile);
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function(req, res){
 
 var keyWords = ["otters","apple","beach","space"];
 
 let parsedData = await getImages(keyWords[0]);
 let parsedData2 = await getImages(keyWords[1]);
 let parsedData3 = await getImages(keyWords[2]);
 let parsedData4 = await getImages(keyWords[3]);
 
 //console.dir("parsedData: " + parsedData); //displays content of the object
 
 let rand1 = Math.floor(Math.random() * parsedData.hits.length);
 let rand2 = Math.floor(Math.random() * parsedData2.hits.length);
 let rand3 = Math.floor(Math.random() * parsedData3.hits.length);
 let rand4 = Math.floor(Math.random() * parsedData4.hits.length); 
 
 res.render("index", {"like":parsedData.hits[rand1].likes,
                        "image":parsedData.hits[rand1].largeImageURL,
                        "like2":parsedData2.hits[rand2].likes,
                        "image2":parsedData2.hits[rand2].largeImageURL,
                        "like3":parsedData3.hits[rand3].likes,
                        "image3":parsedData3.hits[rand3].largeImageURL,
                        "like4":parsedData4.hits[rand4].likes,
                        "image4":parsedData4.hits[rand4].largeImageURL
    }); 
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orientation = req.query.orientation;
    
    let parsedData = await getImages(keyword);
    
    let rdm1 = Math.floor(Math.random() * parsedData.hits.length);
    let rdm2 = Math.floor(Math.random() * parsedData.hits.length);
    let rdm3 = Math.floor(Math.random() * parsedData.hits.length);
    let rdm4 = Math.floor(Math.random() * parsedData.hits.length);
    
    
    res.render("results", {"likes":parsedData.hits[rdm1].likes,
                           "images":parsedData.hits[rdm1].largeImageURL,
                           "likes2":parsedData.hits[rdm2].likes,
                           "images2":parsedData.hits[rdm2].largeImageURL,
                           "likes3":parsedData.hits[rdm3].likes,
                           "images3":parsedData.hits[rdm3].largeImageURL,
                           "likes4":parsedData.hits[rdm4].likes,
                           "images4":parsedData.hits[rdm4].largeImageURL
    });
    
    
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});

