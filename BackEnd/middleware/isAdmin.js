const isAdmin = (req, res, next) => {
  try {
    // If req.user is missing or user is not an admin
    if (!req.user || req.user.isAdmin !== true) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    // ✅ Admin verified
    next();
  } catch (err) {
    console.error("isAdmin middleware error:", err);
    res.status(500).json({ message: "Server error in isAdmin middleware" });
  }
};

module.exports = isAdmin;