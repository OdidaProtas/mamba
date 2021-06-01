module.exports = {
    "type": "postgres",
    "host": process.env.database_host,
    "port": process.env.database_port,
    "username": process.env.database_username,
    "password": process.env.database_password,
    "database": process.env.database_name,
    "synchronize": false,
    "logging": false,
    "entities": [
        "build/entity/**/*.js"
    ],
    "migrations": [
        "build/migration/**/*.js"
    ],
    "subscribers": [
        "build/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": "build/entity",
        "migrationsDir": "build/migration",
        "subscribersDir": "build/subscriber"
    }
}
