const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require("express");
const userRoutes = require("./routes/userRouter");

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch(console.log);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`app listen on port ${port}`)
});