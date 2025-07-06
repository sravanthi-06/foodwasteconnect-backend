const Donation = require('../models/Donation'); // ✅ Capital 'D' to match file name

// ➕ Add new donation
exports.addDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: 'Donation added successfully', donation });
  } catch (error) {
    console.error('❌ Error adding donation:', error);
    res.status(500).json({ message: 'Server error while adding donation' });
  }
};

// ✅ Get all approved donations
exports.getApprovedDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ approved: true });
    res.status(200).json(donations);
  } catch (error) {
    console.error('❌ Error fetching approved donations:', error);
    res.status(500).json({ message: 'Server error while fetching donations' });
  }
};

// ✅ Approve a donation
exports.approveDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Donation.findByIdAndUpdate(id, { approved: true }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Donation not found' });
    res.status(200).json({ message: 'Donation approved', donation: updated });
  } catch (error) {
    console.error('❌ Error approving donation:', error);
    res.status(500).json({ message: 'Server error while approving donation' });
  }
};
