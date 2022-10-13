const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '_' + file.originalname)
    }
})
const uploder = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filter = /png|jpg|mkv/
        const ext = path.extname(file.originalname)
        if (filter.test(ext)) {
            cb(null, true)
        } else {
            cb(new Error('required png and jpg format '), false)
        }
    }
})
module.exports = uploder