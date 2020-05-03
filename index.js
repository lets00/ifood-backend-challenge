// dotenv var config
const { config } = require('dotenv')
const { join } = require('path')

const env = process.env.NODE_ENV || 'dev'
const configPath = join(__dirname, './env', `.env.${env}`)
config({ path: configPath })

const hapi = require('@hapi/hapi')
const routes = require('./src/routes')
const Joi = require('@hapi/joi')

const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')

const init = async() => {
    const server = hapi.server({
        port: process.env.HAPI_PORT,
        host: process.env.HAPI_HOST
    })

    const swaggerOptions = {
        info: {
            title: 'Ifood Backend Challenge Documentation',
            version: 'v1.0',
        },
    };
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    server.route(routes)
    server.validator(Joi)

    await server.start()
    console.log(`Server running on ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init()