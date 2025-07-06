const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },  // 👈 Add this
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
  type: String,
  enum: [
    'master',
    'partyMaster',
    'vehicleMaster',
    'vendorMaster',
    'rateCardMaster',
    'bankMaster'
  ],
  default: 'partyMaster'
}
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
