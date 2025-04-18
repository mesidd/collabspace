import mongoose, { Schema, Document, mongo} from "mongoose";

type AccountType = 'personal' | 'business' | 'admin'

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  accountType: AccountType;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlenght: 8
    },
    email: {
      type: String,
      requied: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpiry: {
      type: Date,
    },
    accountType : {
      type: String,
      enum: ['personal','admin','business'],
      default: 'personal'
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User;