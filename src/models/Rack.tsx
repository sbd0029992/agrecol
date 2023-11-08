import mongoose, { Schema } from 'mongoose';

const RackSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [60, 'Plate cannot be more than 20 characters'],
      unique: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [120, 'Plate cannot be more than 60 characters'],
      default: 'user',
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Rack || mongoose.model('Rack', RackSchema);
