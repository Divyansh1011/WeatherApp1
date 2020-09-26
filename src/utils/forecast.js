const request = require('request')

const forecast = (latitude,longitude,callback)=>{

    const options = {
           method: 'GET',
           url: 'https://api.climacell.co/v3/weather/realtime',
           json:true,
           qs: {
             lat: latitude,
             lon: longitude ,
             unit_system: 'si',
             fields: 'precipitation,temp,feels_like,dewpoint,wind_speed,baro_pressure,weather_code,humidity',
             apikey: '3lquMOPNg89IO1is9O7irDYFvskq5Jfn'
           }
         };

         request(options, function (error, response, body) {
               if(error)
               {
                 callback('Could not connect to weather services pls try again',undefined)
               }else if(body.statusCode===400)
               {
                 callback('Unable to find the location',undefined)
               }
               else
               {
                 callback(undefined,body.weather_code.value + '. It is currently ' + body.temp.value +' degress out'+ '. There is a ' + body.precipitation.value + '% chance of rain')
               }
               
             });
}



module.exports = forecast


