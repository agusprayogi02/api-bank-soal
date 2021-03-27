import multer = require('multer');

const storage = (disk: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/' + disk);
    },
    filename: (req, file, cb) => {
      console.log(file);
      var files = file.originalname.split('.');
      cb(null, 'IMG' + Date.now() + '.' + files[files.length - 1]);
    },
  });

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = (type: string, name: string) =>
  multer({storage: storage(type), fileFilter: fileFilter}).single(name);
