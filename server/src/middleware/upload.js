const multer = require("multer");
const path = require("path");
const connection = require("../database/db.config");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const location = path.join(__dirname, "../images");
    cb(null, location);
  },
  filename: function (req, file, cb) {
        const rendom = Math.floor(Math.random() * 100);
    const fileName = Date.now() + rendom + ".webp";


    const url = "/images/" + fileName;
    const sql = `INSERT INTO upload (url,name) VALUES ('${url}','${fileName}')`;
    connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        cb(null, fileName);
      }
   
    });
  },
});

let upload = multer({ storage: storage });

module.exports = upload;
