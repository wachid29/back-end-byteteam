const multer = require("multer");
const path = require("path");
//const uploadimage = require("./middleware/upload");

// image storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (file.fieldname === "photo") {
      callback(null, "./images/user_photos");
    // } else if (file.fieldname === "profile") {
    //   callback(null, "./profiles");
    // } else if (file.fieldname === "company") {
    //   callback(null, "./company");
    }
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: fileFilter,
});

function fileFilter(req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;

  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Can edit image with format jpeg/jpg/png !");
  }
}

module.exports = upload;
