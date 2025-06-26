const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    // 🔒 No token provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = decoded;

    next(); // ✅ move to the next middleware or route handler
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth;
