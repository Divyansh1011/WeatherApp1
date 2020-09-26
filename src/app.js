const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name:"Divyansh Agarwal"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Divyansh Agarwal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'Welcome to help page',
        title: 'Help',
        name: 'Divyansh Agarwal'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address)
    {
        return res.send({
            error: 'Please enter a valid address'
        })
    }
   geocode(req.query.address,(error,{latitude, longitude , location}={})=>{
       if(error)
       {
           return res.send({error})
       }

       forecast(latitude,longitude,(error,forecastdata)=>{
           if(error)
           {
               return res.send({error})
           }

           res.send({
               forecast:forecastdata,
               location,
               address:req.query.address
           })
       })

   })

})

app.get('/products',(req, res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You have not provided a search query'
        })
    }
    console.log(req.query)
    res.send({
        procuct:[]
    })
})
app.get('/help/*',(req,res)=>{
   res.render('404',{
        title: '404-help',
        errormessage:'Help Article not found',
        name: 'Divyansh Agarwal'
   })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errormessage:'Page Not Found',
        name: 'Divyansh Agarwal'
   })
})




app.listen(port,()=>{
    console.log("Server is up running on port"+port)
})

