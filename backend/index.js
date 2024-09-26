import express from "express"
import mongoose, { plugin } from "mongoose"
import { PORT, mongoDBURL } from "./config.js"
import router from "./routes/bookRoute.js"
import cors from "cors"

const app = express()

//middlewares
app.use(express.json())

//using cors to allow only custom cross origin requests.
app.use(
    cors(
        {
            origin: "http://localhost:3000",
            methods: ['GET', 'POST', 'DELETE', 'PUT'],
            allowedHeaders: ['Content-Type']
        }
    )
)


//connecting to database
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to DB")

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    }).catch((err) => {
        console.log("Mongoose connnection error: ", err)
    })

//root route
app.get("/", (req, res) => {
    console.log(res)
    return res.status(200).send("Welcome to first react project")
})

app.use("/books", router)



