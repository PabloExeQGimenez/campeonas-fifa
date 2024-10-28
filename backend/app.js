const express = require('express');
const app = express();
const morgan = require('morgan');
const sequelize = require('./config/database');
require('dotenv').config();
const router = require('./routes/playerRoutes')

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hola Campeonas")
})
app.use('/api/v1', router);

const PORT = process.env.PORT
sequelize.sync()
  .then(() => {
    console.log("conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`App campeonas en puerto: ${PORT}`)
    });
  })
  .catch((err) => console.error('No se pudo conectar a la base de datos', err));


