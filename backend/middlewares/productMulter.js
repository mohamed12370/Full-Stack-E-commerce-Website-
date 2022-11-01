const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nanoid = require('nanoid');

function productMulter(customPath) {
  if (!customPath || customPath === null) {
    customPath = 'productsFolfer';
  }
  if (!fs.existsSync(path.join(__dirname, `../uploads/${customPath}`))) {
    fs.mkdirSync(path.join(__dirname, `../uploads/${customPath}`), {
      recursive: true,
    });
  }
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      req.dest = `uploads/${customPath}`;
      //console.log(req.file);
      cb(null, path.join(__dirname, `../uploads/${customPath}`));
    },
    filename: function (req, file, cb) {
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
      //console.log(file);
      cb(null, false, req.imageError);
    }
  };

  const upload = multer({
    dest: path.join(__dirname, `../uploads/${customPath}`),
    fileFilter,
    storage,
  });

  return upload;
}

module.exports = productMulter;
