const multer = require("multer");
const path = require("path");
const Customerror = require("../errors/customErrorHandler");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    cb(null, path.join(rootDir, "/public/uploads"));
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    req.saveProfileImage = "image_" + req.user.id + "." + extension;
    cb(null, req.saveProfileImage);
  },
});

const fileFilter = (req, file, cb) => {
  let allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/jpg",
    "image/svg+xml",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Customerror("resim sorunu", 400),false);
  }
  return cb(null, true);
};


const ProfileImageUpload = multer({storage,fileFilter})

module.exports = ProfileImageUpload;

