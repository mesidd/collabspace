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
  currentPosition: String;
  goals: String;
  challenges: String;
  achievements: String;
  motivationalInterests: String;
  nickname: String;
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


    // currentPosition: String;
    // goals: String;
    // challenges: String;
    // achievements: String;
    // motivationalInterests: String;
    // nickname: String;
    // Personal Details For Summary

    currentPosition:{
      type: String,
      default: ''
    },
    goals:{
      type: [String],
      default: [],
    },
    challenges:{
      type: [String],
      default:[]
    },
    achievements:{
      type:[String],
      default:[]
    },
    motivationalInterests:{
      type:[String],
      default:[]
    },
    nickname:{
      type: String,
      default:''
    },
    // createdAt: {type: Date, default: Date.now},
    // upadaedAt: {type: Date, default: Date.now},
  },
  {
    timestamps: true
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User;