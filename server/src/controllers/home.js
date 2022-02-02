const path = require("path");

const home = (_req, res) => {
  return res.sendFile(path.join(`${__dirname}/../../../dist/index.html`));
};


module.exports = {
  getHome: home,
};
