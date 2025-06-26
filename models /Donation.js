const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  food_type: String,
  quantity: String,
  pickup_time: Date,
  location: String,
  contact_number: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'picked'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Donation', donationSchema);
