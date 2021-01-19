import multer = require('multer')

const storage = (disk: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/' + disk)
    },
    filename: (req, file, cb) => {
      console.log(file)
      cb(null, 'IMG' + Date.now() + file.mimetype)
    },
  })
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
export const upload = (type: string) => multer({storage: storage(type), fileFilter: fileFilter})
