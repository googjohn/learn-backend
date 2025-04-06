import { Schema, model } from "mongoose";

const goalSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please fill in your goal"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

/* goalSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  let genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt);
})

goalSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
} */

const Goals = model("Goal", goalSchema);

export default Goals;