// import needed package/libraries
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

// hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt);
})

// create a method to compare hashed password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password)
}

const User = model("User", userSchema);

export { User }
