const Donation = require('../models/donation');

// @desc Add a new donation
exports.addDonation = async (req, res) => {
  try {
    const { title, description, quantity } = req.body;
    const donation = new Donation({
      title,
      description,
      quantity,
      donor: req.user.id, // assuming auth middleware sets req.user
    });
    await donation.save();
    res.status(201).json({ message: 'Donation created', donation });
  } catch (error) {
    console.error("❌ Error adding donation:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get all approved donations
exports.getApprovedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ approved: true });
    res.json(donations);
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Approve a donation (admin only)
exports.approveDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    donation.approved = true;
    await donation.save();
    res.json({ message: 'Donation approved' });
  } catch (error) {
    console.error("❌ Error approving donation:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
