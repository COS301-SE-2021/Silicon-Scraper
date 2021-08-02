import dotenv from 'dotenv';

dotenv.config();

interface dbConfig {
    port: number,
    name: string,
    host: string,
    pw: string,
    user: string
}

const config: dbConfig = {
    port : Number(process.env.DB_PORT!),
    name : process.env.DB_NAME!,
    host : process.env.DB_HOST!,
    pw : process.env.DB_PW!,
    user : process.env.DB_USER!
}

export default config;