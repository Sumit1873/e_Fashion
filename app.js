const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors()) // *
app.use(express.json()) //to accept data as json...
app.use(express.urlencoded({ extended: true }));

//import role routes

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state", stateRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city", cityRoutes)

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area", areaRoutes)

const addressRoutes = require("./src/routes/AddressRoutes")
app.use("/address", addressRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category", categoryRoutes)

const subCategoryRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subcategory", subCategoryRoutes)

const sellerprofileRoutes = require("./src/routes/SellerProfileRoutes")
app.use("/sellerprofile", sellerprofileRoutes)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product", productRoutes)

const cartRoutes = require("./src/routes/CartRoutes")
app.use("/cart", cartRoutes)

const orderRoutes = require("./src/routes/OrderRoutes")
app.use("/order", orderRoutes)

const orderDetailsRoutes = require("./src/routes/OrderDetailsRoutes")
app.use("/orderdetails", orderDetailsRoutes)

const wishlistRoutes = require("./src/routes/WishlistRoutes")
app.use("/wishlist", wishlistRoutes)

const reviewRoutes = require("./src/routes/ReviewsRoutes")
app.use("/review", reviewRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/efashion").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})