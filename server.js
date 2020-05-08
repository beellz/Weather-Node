const express = require("express")
const app = express();
const https = require("https");




app.get("/", (req, res) => {
    
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=paris&appid=cdefebdefc2001cd562f7af991ab145e&units=metric"

    https.get(url , (response) => {
        console.log(response.statusCode);

        response.on("data",(data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.list[0].main.temp;
            const description = weatherData.list[0].weather[0].description;
            // const temp = weatherData[0].main.temp
            // const weatherData2 = JSON.stringify(weatherData);
            // console.log(weatherData2);
            // const weatherData3 = JSON.parse(weatherData2);
            // console.log(weatherData3);
            console.log(temp, description);
        });
    })
    res .send("its working")


});



 app.listen(3000, () => { console.log("app is on port 3000")});