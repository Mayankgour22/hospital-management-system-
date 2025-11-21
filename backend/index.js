const  express =require("express");
const cors = require("cors");
const dotenv =require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes =require("./routes/authRoutes.js");

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

connectDB();
app.use("/api", authRoutes);
const appointmentRoutes =require("./routes/appointmentRoutes.js");
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
