import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [60, 'Plate cannot be more than 20 characters'],
      unique: false,
    },
    email: {
      type: String,
      trim: true,
      maxlength: [40, 'Plate cannot be more than 40 characters'],
      unique: true,
    },
    gender: {
      type: String,
      trim: true,
      maxlength: [20, 'Plate cannot be more than 20 characters'],
    },
    birthdate: {
      type: String,
      trim: true,
      maxlength: [20, 'Plate cannot be more than 20 characters'],
    },
    ci: {
      type: String,
      trim: true,
      maxlength: [20, 'Plate cannot be more than 20 characters'],
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [8, 'Plate cannot be more than 20 characters'],
      unique: true,
    },
    password: {
      type: String,
      maxlength: [60, 'Plate cannot be more than 40 characters'],
    },
    type: {
      type: String,
      trim: true,
      maxlength: [20, 'Plate cannot be more than 20 characters'],
      default: 'cashier',
    },
    status: {
      type: String,
      default: '1',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
