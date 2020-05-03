const playlistRoutes = require('./playlist.route')
const spotifyRoutes = require('./spotify.route')

module.exports = [...playlistRoutes, ...spotifyRoutes]