import { createConnection, getRepository } from 'typeorm';
import { config } from 'dotenv';
import { User } from './entity/user';
import { CPU } from './entity/cpu';
import { GPU } from './entity/gpu';
import { watchlistCPU } from './entity/watchlistCPU';
import { watchlistGPU } from './entity/watchlistGPU';
import RecommendationCPU from './entity/recommendationCPU';
import RecommendationGPU from './entity/recommendationGPU';

config();

export const connection = async () => {
    try {
        await createConnection({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME,
            entities: [
                User,
                CPU,
                GPU,
                watchlistCPU,
                watchlistGPU,
                RecommendationCPU,
                RecommendationGPU
            ],
            cli: {
                entitiesDir: 'entity'
            },
            synchronize: false,
            logging: false
        });
        console.log('Database connection established')
    } catch(error) {
        console.log(error);
        console.log('Database connection error');
    }
}