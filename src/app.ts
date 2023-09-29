import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./errors";
import authRouter from "./routes/authRoutes";
// import productsRouter from "./routes/productRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
// app.use("/products", productsRouter);

app.use(errorHandler);

export default app;
