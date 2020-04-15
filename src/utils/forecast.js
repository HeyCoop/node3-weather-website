const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/226c5373cf9d21ed687d168142e466d7/' + latitude + ',' + longitude

    //regular way
    // request({ url: url, json: true }, (error, response) => {
    //desctruct way    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location. Try different values.', undefined)
        } else {
            console.log(body.daily)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. The humidity is at ' + body.currently.humidity + '%')

        }
    })

}

module.exports = forecast