# Ifood backend challenge

This project implements the [ifood backend challenge](https://github.com/ifood/vemproifood-backend). It creates a RESTful micro-service that receive as parameter either city name or lat long coordinates and return a Spotify playlist according to the celsius current temperature (See ifood challenge to know the business rules).

# Technologies
* nodejs
* hapijs (REST API)
* joi (Validator)
* axios (HTTP requests using Promises)
* dotenv (Charge environment variable)
* swagger (API Documentation)

# How to run

1- Install dependencies via npm cli:
```
$ npm i
```

2- Run server
```
$ node index.js
```

To verify how to use, please consult the [API documentation](http://localhost:3000/documentation) gennerated by Swagger.


# License

MIT