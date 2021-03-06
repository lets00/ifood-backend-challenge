const Joi = require('@hapi/joi')
const playlistHandler = require('../handler/playlist.handler')

const playlist = [{
    path: '/playlist',
    method: 'GET',
    options: {
        tags: ['api'],
        description: 'Get a playlist according to temperature',
        notes: 'The access token can be get by /login route',
        validate: {
            query: Joi.object({
                city: Joi.string(),
                lat: Joi.number(),
                lon: Joi.number(),
                access_token: Joi.string().required()
            }).xor('city', 'lat').xor('city', 'lon').and('lat', 'lon'),
            failAction: (req, res, error) => {
                throw error;
            }
        }
    },
    handler: playlistHandler.list
}]

module.exports = playlist