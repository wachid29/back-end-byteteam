const multer = require("multer");
const multerUtils = require("./multer");

const uploadprofile = (req, res, next) => {
  const uploadSingle = multerUtils.single("profile");
  uploadSingle(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(400).send(err?.message ?? "Something went wrong!");
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? "Something went wrong!");
        return;
      }
      next();
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
};

module.exports = {
  uploadprofile,
};
