const mongoose = require('mongoose');

const connectDatabase = () => {
  return mongoose
    .connect(
      `mongodb+srv://shopIt:01226571893@cluster0.sexdsve.mongodb.net/shopit?retryWrites=true&w=majority`
    )
    .then((con) => {
      console.log(
        `MongoDB Database Connected With Host ${con.connection.host}`
      );
    })
    .catch((err) => {
      console.log(`Catch Error From Database ` + err);
    });
};

module.exports = connectDatabase;
