const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/donations', donationRoutes);

// ✅ Add a test route
app.get("/test", (req, res) => {
  console.log("✅ /test route was hit");
  res.send("✅ Test route is working");
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

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("✅ App started successfully");
});
