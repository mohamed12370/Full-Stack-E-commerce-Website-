const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nanoid = require('nanoid');

function myMulter(customPath) {
  try {
    if (!customPath || customPath == null) {
      customPath = 'generalFilder';
    }
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        req.dest = `uploads/${customPath}/${req.user._id}`;

        if (
          !fs.existsSync(
            path.join(__dirname, `../uploads/${customPath}/${req.user._id}`)
          )
        ) {
          fs.mkdirSync(
            path.join(__dirname, `../uploads/${customPath}/${req.user._id}`),
            {
              recursive: true,
            }
          );
        } else {
          fs.rmSync(
            path.join(__dirname, `../uploads/${customPath}/${req.user._id}`),
            { recursive: true, force: true }
          );
          fs.mkdirSync(
            path.join(__dirname, `../uploads/${customPath}/${req.user._id}`),
            {
              recursive: true,
            }
          );
        }
        cb(
          null,
          path.join(__dirname, `../uploads/${customPath}/${req.user._id}`)
        );
      },
      filename: function (req, file, cb) {
        //console.log(file);
        const fullFileName = nanoid() + '_' + file.originalname;
        cb(null, fullFileName);
      },
    });

    const fileFilter = function (req, file, cb) {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
      ) {
        cb(null, true);
      } else {
        req.imageError = true;
        cb(null, false, req.imageError);
      }
    };

    const upload = multer({
      dest: path.join(__dirname, `../uploads/${customPath}`),
      fileFilter,
      storage,
    });

    return upload;
  } catch (error) {
    console.log('catch error from multer method');
    console.log(error.message);
  }
}

module.exports = myMulter;
