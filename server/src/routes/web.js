const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const upload = require("../middleware/upload.js");
const Select = require("../controllers/select");
const Deletes = require("../controllers/delete");

const routes = (app) => {
  router.get("/", homeController.getHome);

router.post("/upload", upload.single("file"), (req, res) => {
  res.send(req.file);
});

router.get("/upload/images", Select);

router.delete("/upload/delete/:filename", Deletes);
    

  router.get("/images/:filename", (req, res) => {
    const file = req.params.filename;
    res.sendFile(file, { root: "src/images" });
    
  });
  router.get("/assets/:filename", (req, res) => {
    const file = req.params.filename;
    res.sendFile(file, { root: "../dist/assets" });
  });

  return app.use("/", router);
};

module.exports = routes;
