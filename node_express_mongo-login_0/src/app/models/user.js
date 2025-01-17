const mongoose = require("../../database");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowecase: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  type: {
    type: Number,
    required: true,
    select: true,
  },
  passwordResetToken: {
    type: String,
    select: true,
  },
  passwordResetExpires: {
    type: Date,
    select: true,
  },
  codSala: [
    {
      type: String,
      required: false,
    },
  ],
  qtdQuestoesCertas: {
    type: Number,
    required: false,
  },
  hasStarted: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
