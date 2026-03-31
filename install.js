// Installationsfil för sqlite3-databasen
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((error) => {
    if (error) {
        console.log("Fel vid anslutning till databasen:", error);
        return;
    } else {
        console.log("Anslutningen till databasen lyckades!");
        createTable();
    }
});

async function createTable() {
    try {
        const response = await client.query(`
        CREATE TABLE IF NOT EXISTS course (
            id SERIAL PRIMARY KEY,
            code VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            progression VARCHAR(255) NOT NULL,
            syllabus TEXT NOT NULL,
            posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
        `);
        console.log(response);
    } catch (error) {
        console.log("Fel när tabellen skapades:", error);
    } finally {
        await client.end();
    }
}