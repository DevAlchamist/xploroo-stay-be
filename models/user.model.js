const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    location: { type: String },
    bio: { type: String },
    image: [{ type: String }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookings" }], // Array of Booking ObjectIds
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Array of Review ObjectIds
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
