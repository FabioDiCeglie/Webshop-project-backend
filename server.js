const express = require("express");
const cors = require("cors");

const productsRoute = require("./routes/productsRoute");
const categoriesRoute = require("./routes/categoriesRoute");
const authRoute = require("./routes/auth");

const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/products", productsRoute);
app.use("/categories", categoriesRoute);
app.use("/auth", authRoute);

app.listen(port, () => console.log("Listening on port", port));
