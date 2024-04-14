const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;

const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
});

connection.connect();

app.get('/', (req, res) => {
    const name = 'Chico';
    connection.query('INSERT INTO people (name) VALUES (?)', [name], (err, result) => {
        if (err) throw err;
        connection.query('SELECT name FROM people', (err, results) => {
            if (err) throw err;
            res.send('<h1>Full Cycle Rocks!</h1>' + results.map(person => `<p>${person.name}</p>`).join(''));
        });
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
