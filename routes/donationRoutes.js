const express = require('express');
const router = express.Router();
const { addDonation, getApprovedDonations, approveDonation } = require('../controllers/donationController');
const auth = require('../middleware/auth');

// ✅ This route is used by DonorDashboard.js
router.post('/add', auth, addDonation);

router.get('/approved', getApprovedDonations);
router.put('/approve/:id', auth, approveDonation);

module.exports = router;
