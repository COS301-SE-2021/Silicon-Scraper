import pg from 'pg';

const connectClient = () => {
    const client = new pg.Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    });
    client.connect();
    
    client.query('LISTEN table_modified');

    client.on('notification' ,msg => {
        console.log(msg.payload);
    })
}

export default connectClient;