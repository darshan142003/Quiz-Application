import express from "express";
import routes from "./routes/routes"

const app = express();
app.use(express.json());

app.use("/quizzes", routes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server running on port 3000"));