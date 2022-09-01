import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import pkg from 'validator';
const { isEmail } = pkg;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('Users', userSchema);
export default UserModel;
