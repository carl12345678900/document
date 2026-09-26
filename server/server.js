require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const dashboardRoute = require("./routes/dashboard.route");
const authRouter = require("./routes/authRoute");
const categoryRoute = require("./routes/category.route");
const documentRoute = require("./routes/document.route");

const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRoute);
app.use("/category", categoryRoute);
app.use("/document", documentRoute);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on PORT: ${PORT}`);
});
