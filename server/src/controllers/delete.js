const connection = require("../database/db.config");
 const fs = require("fs");
  const path = require("path");
  
const DelectImages = (req, res) => {
 const { filename } = req.params;
 const url = path.join(__dirname, "../images/" + filename);

  const sql = `DELETE FROM upload WHERE url = '/images/${filename}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      fs.unlink(url, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("success");
        }
      });
    }
  });
  
  

};

module.exports = DelectImages;
