const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;

// Using a connection pool instead of a single connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

app.get('/', async (req, res) => {
    try {
        // Using async/await with Promises to manage MySQL queries
        const createTableSql = 'CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))';
        await queryDb(createTableSql);

        const name = 'Chico';
        const insertSql = 'INSERT INTO people (name) VALUES (?)';
        await queryDb(insertSql, [name]);

        const selectSql = 'SELECT name FROM people';
        const results = await queryDb(selectSql);

        const responseHtml = '<h1>Full Cycle Rocks!</h1>' + results.map(person => `<p>${person.name}</p>`).join('');
        res.send(responseHtml);
    } catch (error) {
        res.status(500).send('An error occurred: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Helper function to perform queries using Promises
function queryDb(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}
