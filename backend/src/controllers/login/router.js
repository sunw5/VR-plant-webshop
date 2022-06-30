const express = require('express');
const router = express.Router();

const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res, next) => {  

  

  const { email, password, role } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.sendStatus(401);
  }

  user.comparePassword(password, function (err, isMatch) {
    if (err) {
      return res.sendStatus(401);
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      }
    );

    res.json({
      success: true,
      accessToken,
      user: { ...user._doc, password: '' },
    });
  });
});

module.exports = router;
