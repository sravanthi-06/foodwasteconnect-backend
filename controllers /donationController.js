const Donation = require('../models/Donation');

exports.addDonation = async (req, res) => {
  const donation = new Donation({ ...req.body, user_id: req.user.id });
  await donation.save();
  res.status(201).json({ message: 'Donation added' });
};

exports.getApprovedDonations = async (req, res) => {
  const donations = await Donation.find({ status: 'approved' });
  res.json(donations);
};

exports.approveDonation = async (req, res) => {
  await Donation.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.json({ message: 'Donation approved' });
};
