const Joi = require('joi');
const crypto = require('crypto');
const mail = require('../../services/mail');
const { User } = require('../../models/User');

const validate = body => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
  };

  return Joi.validate(body, schema);
};

/**
 * Will send an email to reset password
 *
 * endpoint ➜ POST /api/auth/forgot
 */
const forgot = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `${process.env.FRONTEND_URL}/reset/${user.resetPasswordToken}`;
    await mail.send({
      user,
      subject: 'Password reset',
      resetURL,
      filename: 'password-reset',
    });
  }
  return res.status(200).json();
};

module.exports = forgot;
