const express = require("express");
const router = express.Router();

const {
  addDonation,
  getApprovedDonations,
  approveDonation,
  getUserDonations, // ✅ import this function
} = require("../controllers/donationController");

const auth = require("../middleware/auth");

// ✅ Add a donation (POST)
router.post("/add", auth, addDonation);

// ✅ Get all approved donations (GET)
router.get("/approved", getApprovedDonations);

// ✅ Approve a donation by admin (PUT)
router.put("/approve/:id", auth, approveDonation);

// ✅ Get logged-in user's donations (GET)
router.get("/my", auth, getUserDonations); // ✅ NEW ROUTE

module.exports = router;
