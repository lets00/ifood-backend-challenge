const axios = require('axios')
const qs = require('querystring');

// Get token API
const callback = async(req, h) => {
    const code = req.query.code
    const headers = {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const data = {
        code,
        redirect_uri: 'http://localhost:3000/callback',
        grant_type: 'authorization_code'
    }

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), { headers })
        return h.response(response.data).code(response.status)
    } catch (error) {
        return h.response({ error: error.response.data.error.message }).code(error.response.status)
    }
}

// Get Authorization code to thown in redirect API
const login = (req, h) => {
    const query = {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: 'code',
        scope: 'user-read-private user-read-email',
        redirect_uri: 'http://localhost:3000/callback'
    }
    return h.redirect('https://accounts.spotify.com/authorize?' + qs.stringify(query))
}

module.exports = { login, callback }