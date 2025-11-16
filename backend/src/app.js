const express = require('express');
require('dotenv').config();
const db = require('./models/db');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const urlRoutes = require('./routes/urlRoutes');
app.use('/', urlRoutes);

const PORT = process.env.APP_PORT || 3000;
db.sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database sync failed:', err);
    });

module.exports = app;