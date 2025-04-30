import express from "express";
import cors from "cors";
import connectToDB from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import taskRoutes from "./routes/task.mjs";



//Connecting MongoDB
connectToDB()
const app = express();
const port = 5000;

app.use(
    cors({
        origin: ['http://localhost:5174',
            'http://localhost:5173',
            'https://track-it-one-phi.vercel.app/',

        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE','PATCH'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);


app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);


app.use("/", (req, res, next) => {
    console.log("Request URL:", req.url, "method: ", req.method);
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
