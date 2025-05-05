import dotenv from 'dotenv'
dotenv.config()

const config = Object.freeze({
    port: process.env.PORT ||3000,
    databaseURI: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV || 'development',
})

 export default config