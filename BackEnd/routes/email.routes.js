// const express = require("express");
// const sendEmail  = require("../utils/sendEmail");
// const router = express.Router();

// router.post("/testemail", async (req, res) => {
//   try {
//     await sendEmail("yourpersonalemail@gmail.com", "Testing", "<p>Hello Anwaar 👋</p>");
//     res.send("✅ Email sent");
//   } catch (err) {
//     res.status(500).send("❌ Failed to send email: " + err.message);
//   }
// });

// module.exports = router;

// routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/testemail", async (req, res) => {
  const { to } = req.body;

  try {
    await sendEmail(
      user.email,
      "Order Confirmation",
      `
     <h2>Thank you for your order!</h2>
     <p>Your order #${order._id} has been placed successfully.</p>
     `
    );

    res.json({ message: "✅ Email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "❌ Failed to send email", error: error.message });
  }
});

module.exports = router;
