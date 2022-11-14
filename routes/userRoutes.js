const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/save", requireLogin, (req, res) => {
    // TODO
  });

  app.delete("/api/unsave/:restaurantId", requireLogin, (req, res) => {
    // TODO
  });

  app.get("/api/saved_restaurants", requireLogin, (req, res) => {
    // TODO
  });
};
