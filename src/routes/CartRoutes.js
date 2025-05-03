const routes = require("express").Router()
const cartControllers = require("../controllers/CartControllers")

routes.post("/addtocart", cartControllers.addToCart)
routes.get("/getcart", cartControllers.getCart)
routes.get("/getCartByUserId/:userId", cartControllers.getAllCartByUserId)
routes.delete("/removeProductFromCart/:productId", cartControllers.deleteAllCartByProductId)
routes.delete("/removeFromCart/:userId", cartControllers.deleteAllCartByUserId)
routes.put("/updateQuantity/:userId/:productId", cartControllers.updateCartByUserId);

module.exports = routes