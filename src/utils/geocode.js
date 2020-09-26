const request = require('request')

const geoCode = (address,callback)=>{

    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGl2eWFuc2hhZ2Fyd2FsIiwiYSI6ImNrZWxjM3J1MTFjaHkyc3BjZGc0bDA3c3oifQ.ZhXu6RwkljYX0SCqJy2Dtg&limit=1'
  
    request({url:geoURL,json:true},(error,{body})=>{
      if(error)
      {
        callback('Could not connect to server pls try again',undefined)
      }else if(body.features.length === 0)
      {
        callback('Could Not Find the Result!Invalid Location Given',undefined)
  
      }else{
        callback(undefined,{
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
      
    })}
  

    module.exports = geoCode 