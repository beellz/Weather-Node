const express = require("express")
const app = express();
const https = require("https");
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    // this will send index.html when request of get comes .


    res.sendFile(__dirname + "/index.html")
     
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
                                const temp = weatherData.list[0].main.temp;
                                const description = weatherData.list[0].weather.description;
                                const icon = weatherData.list[0].weather[0].icon;
                                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                                const city = weatherData.city.name;
                                console.log(temp, description);
                                
                                res.write(`<h1>the temperatur in ${city} is </h1> `);
                                res.write(`<h1> ${temp} degree celcius and its describe as ${description}</h1>`);
                                res.write(`<img src="${iconUrl}" alt="icon">`);
                                res .send();
                        
        });
    } 
        else {
            res.write("wrong city do refresh");
            res.send();
        }
    });
});


// this is app listen to the port 
 app.listen(process.env.PORT || 3000, () => { 
     console.log("app is on port 3000")
    });