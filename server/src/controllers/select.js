const connection = require("../database/db.config");

const formImages = (req, res) => {
 
  const sql = "SELECT * FROM upload";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }

  });
} 

module.exports = formImages;