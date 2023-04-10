const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png|pdf|doc|docx|gif$i/)) {
      cb(new Error("File is not supported"), false);
      return;
    }

    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = { upload };
