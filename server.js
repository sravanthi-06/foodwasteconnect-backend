const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// ✅ Import both route files
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;


// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Mount routes
app.use('/api/auth', userRoutes);
app.use('/api/donations', donationRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
