import { createConnection, getRepository } from 'typeorm';
import { resolve } from 'path';
import { config } from 'dotenv';
import { User } from './entity/user';
import { CPU } from './entity/cpu';
import { GPU } from './entity/gpu';
import { watchlistCPU } from './entity/watchlistCPU';
import { watchlistGPU } from './entity/watchlistGPU';
import { deviceToken } from './entity/deviceToken';

config({ path: resolve(__dirname, "../.env") })

/**
 * Creates connection to database for typeorm and loads environment variables
 */
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
                User,
                CPU,
                GPU,
                watchlistCPU,
                watchlistGPU,
                deviceToken
            ],
            synchronize: false,
            logging: false
        });
    } catch(error) {
        console.log(error);
        console.log('Database connection error');
    }
}