const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// seting config file
dotenv.config({ path: './config/config.env' });

// connecting to database
connectDatabase();

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server Started On Port: ${process.env.PORT} In ${process.env.NODE_ENV} Mode.`
  );
});
