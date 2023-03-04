import express, { Application} from "express";
import userRoutes from "./routes/user.route";
import { connectDB } from "./config/db";
const app: Application = express();
app.use(express.json());
let port: number = 3009;
connectDB()
app.use("/user", userRoutes);

app.listen(port, () => console.log(`express server listening on port ${port}`));