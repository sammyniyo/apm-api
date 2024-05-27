import express, { json } from 'express';
import { createConnection } from 'mysql';

const app = express();
const port = 3000;

// Create MySQL database connection
const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aqm'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(json());

// Endpoint to retrieve sensor data
app.get('/sensor-data', (req, res) => {
  const query = 'SELECT * FROM sensor_data';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving sensor data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
