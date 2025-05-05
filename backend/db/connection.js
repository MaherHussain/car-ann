import mongoose from 'mongoose'
import config from '../config.js'


const dbconnection = async ()=> {
    try {
        await mongoose.connect( config.databaseURI)
        console.log('database connected.')
        
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}

export default dbconnection