module.exports = app => {
    const restaurant = require("../controllers/restaurantdao.controller.js");
    var router = require("express").Router();
    router.post("/", restaurant.create);
    router.get("/", restaurant.findAll);
    router.get("/:id", restaurant.findOne);
    router.delete("/:id", restaurant.delete);
    router.put("/:id", restaurant.put);
    app.use('/api/restaurant', router);
};
