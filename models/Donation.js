const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  quantity: Number,
  approved: { type: Boolean, default: false },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
