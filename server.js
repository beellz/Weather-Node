const express = require("express")
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
// const ejs = require("ejs");


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.get("/", (req, res) => {
    // this will send index.html when request of get comes .
    let temp = "";
    let city = "";
    let description = "";
    let iconUrl = "";
    // res.sendFile(__dirname + "/index.html")
    res.render("weather" ,{degree: temp , city: city , description: description , icon: iconUrl} );
     
});

app.post("/" , (req, res ) => {

    // this the url 
    const url ="https://api.openweathermap.org/data/2.5/forecast?q="
    // this is to get the response from the body
    const city = req.body.cityName
    const appid = "&appid=cdefebdefc2001cd562f7af991ab145e&"
    const units = "units=metric"
    const urlAll = url + city + appid + units;
    
// this url ends here .


    https.get(urlAll , (response) => {
                        if (response.statusCode == 200) {
                            console.log(response.statusCode);
                            // this is the response request 
                                response.on("data",(data) => {
                                const weatherData = JSON.parse(data);
                                console.log(weatherData.list[0].main.temp);
                                var temp = weatherData.list[0].main.temp;
                                const description = weatherData.list[0].weather[0].description;
                                const icon = weatherData.list[0].weather[0].icon;
                                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                                const city = weatherData.city.name;
                                console.log(temp, description);
                                 res.render("weather", {degree: temp , city: city , description: description , icon: iconUrl}   );
                              
                        
        });
    } 
        else {
            res.write("<h1>You Have entered wrong city </h1>");
            res.write("<h2> Please change city Name</h2>")
            res.send();
        }
    });
});


// this is app listen to the port 
 app.listen(process.env.PORT || 3000, () => { 
     console.log("app is on port 3000")
    });

    // this is the comment for heroku