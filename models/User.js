const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client'], default: 'client' },
});

module.exports = mongoose.model('User', UserSchema);


const RegistroSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    dob: { type: String },
    cedula: { type: String, required: true },
    cellular: { type: String, required: true },
    city: { type: String, required: true },
  });