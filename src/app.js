const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)

//console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up express to use handlebars.js
//handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setuo static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mike Cooper'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        imgpath: '/img/img33.jpg',
        name: 'Mike Cooper'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mike Cooper'
    })
})

//route for home page
/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) */

//routes

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })

    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        //regular way
        //forecast(data.latitude, data.longitude, (error, forecastData) => {

        //destructing way
        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

            //above is callback chaining
        })
    })

    /* res.send({
        location: 'Philly',
        forecast: 'Partly sunny and cool',
        address: req.query.address
    }) */
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    //console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'Help article not found',
        name: 'Mike Cooper'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page Not Found',
        name: 'Mike Cooper'
    })
})

//app.comc
//app.com/help
//app.com/about

//listen starts the webserver, CTL - C stops it
app.listen(3000, () => {
    console.log('web server started on port 3000')
})

