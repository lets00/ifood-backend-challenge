const axios = require('axios')

const getPlaylist = (category) => {
    // TODO
    // getPlaylist by category
    return { category }
}


const list = async(req, h) => {
    const { city, lat, lon } = req.query
    let openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
    if (city) openWeatherUrl = `${openWeatherUrl}q=${city}&appid=${process.env.OPENWEATHERMAP_ID}&units=metric`
    else openWeatherUrl = `${openWeatherUrl}lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_ID}&units=metric`
    try {
        const response = await axios.get(openWeatherUrl)
        const temperature = response.data.main.temp

        if (temperature > 30) {
            return h.response({ temperature, ...getPlaylist('party') }).code(200)
        }
        if (temperature >= 15 && temperature <= 30) {
            return h.response({ temperature, ...getPlaylist('pop') }).code(200)
        }
        if (temperature >= 10 && temperature <= 14) {
            return h.response({ temperature, ...getPlaylist('rock') }).code(200)
        }
        return h.response({ temperature, ...getPlaylist('classical') }).code(200)
    } catch {
        return h.response({ message: 'City not found' }).code(404)
    }
}

module.exports = { list }