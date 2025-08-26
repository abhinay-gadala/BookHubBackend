import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/userroute.js";
import cors from "cors";
 // ✅ correct import

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", routes);
// Routes


const URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Ensure URL exists
if (!URL) {
  console.error("❌ MongoDB URL not found in .env file");
  process.exit(1);
}

async function main() {
  try {
    // Connect DB
    await connectDB(URL);

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
}

main();



