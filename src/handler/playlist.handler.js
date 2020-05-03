const axios = require('axios')

const getPlaylist = async(category, headers) => {
    const spotifyResponse = await axios.get(`https://api.spotify.com/v1/browse/categories/${category}/playlists`, { headers })
    return spotifyResponse.data.playlists.items[0].external_urls.spotify
}

const list = async(req, h) => {
    const { city, lat, lon, access_token } = req.query
    let openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
    if (city) openWeatherUrl = `${openWeatherUrl}q=${city}&appid=${process.env.OPENWEATHERMAP_ID}&units=metric`
    else openWeatherUrl = `${openWeatherUrl}lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_ID}&units=metric`
    try {
        const response = await axios.get(openWeatherUrl)
        const temperature = response.data.main.temp
        const headers = { 'Authorization': `Bearer ${access_token}` }
        try {
            if (temperature > 30) {
                return h.response({ temperature, category: 'party', playlist: await getPlaylist('party', headers) }).code(200)
            }
            if (temperature >= 15 && temperature <= 30) {
                return h.response({ temperature, category: 'pop', playlist: await getPlaylist('pop', headers) }).code(200)
            }
            if (temperature >= 10 && temperature <= 14) {
                return h.response({ temperature, category: 'rock', playlist: await getPlaylist('rock', headers) }).code(200)
            }
            return h.response({ temperature, category: 'classical', playlist: await getPlaylist('classical', headers) }).code(200)
        } catch (error) {
            if (error.response)
                return h.response({ message: error.response.data.error.message }).code(error.response.status)
            if (error.request)
                return h.response({ message: error.request.data.error.message }).code(400)
        }
    } catch (error) {
        return h.response({ message: 'City not found' }).code(404)
    }
}

module.exports = { list }