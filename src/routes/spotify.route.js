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
        handler: spotifyHandler.login
    }
]

module.exports = spotify