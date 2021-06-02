module.exports = {
    type: "postgres",
    host: process.env.database_host,
    port: process.env.database_port,
    username: process.env.database_username,
    password: process.env.database_password,
    database: process.env.database_name,
    synchronize: false,
    logging: false,
    entities: [
        process.env.entities
    ],
    migrations: [
        process.env.migrations
    ],
    subscribers: [
        process.env.subscribers
    ],
    cli: {
        entitiesDir: `${process.env.dir}/entity`,
        migrationsDir: `${process.env.dir}/migration`,
        subscribersDir: `${process.env.dir}/subscriber`
    }
}
