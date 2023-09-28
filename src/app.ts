import express, { Express, Request, Response } from "express";
import cors from "cors";
// const { errorHandler } = require("./errors");
// const authRouter = require("./routes/authRoutes");
// const productsRouter = require("./routes/productRoutes");

const app: Express = express();

app.use(cors());
app.use(express.json());

// app.use("/auth", authRouter);
// app.use("/products", productsRouter);

// app.use(errorHandler);

export default app
