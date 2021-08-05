import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

const db_env = dotenv.config();

export const connection = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username:process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME,
            entities: [
                'entity/*.ts'
            ],
            synchronize: false,
            logging: false
        });
    } catch(error) {
        console.log('Database connection error');
    }
}