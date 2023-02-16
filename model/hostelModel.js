const mongoose = require("mongoose");
const validator = require("validator");

const hostelSchema = new mongoose.Schema({
  hostel: {
    type: String,
    enum: ['CS', 'EE', 'ME', 'CE', 'ECE', 'PHD', 'MSC', 'MTECH'],
  },
  voted: [
    {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
  ],
  coordinator: {
    nota: { type: Number, default: 0 },
    abstain: { type: Number, default: 0 },
    contestants: [
      {
        name: { type: String },
        email: { type: String },
        votes: { type: Number, default: 0 },
      },
    ],
  }
});

const Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;
