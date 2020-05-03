const Joi = require('@hapi/joi')
const spotifyHandler = require('../handler/spotify.handler')

const spotify = [{
        path: '/callback',
        method: 'GET',
        options: {
            validate: {
                query: Joi.object({
                    code: Joi.string().required()
                }),
                failAction: (req, res, error) => {
                    throw error;
                }
            }
        },
        handler: spotifyHandler.callback
    },
    {
        path: '/login',
        method: 'GET',
        options: {
            tags: ['api'],
            description: 'Get access_token to access spotify API',
            notes: 'the access_token must be used on /playlist route',
        },
        handler: spotifyHandler.login
    }
]

module.exports = spotify