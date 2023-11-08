import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name'],
      maxlength: [20, 'Plate cannot be more than 20 characters'],
      unique: false,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [120, 'Plate cannot be more than 60 characters'],
      default: 'user',
    },
    rack: {
      type: Schema.Types.ObjectId,
      ref: 'Rack',
      required: [true, 'Please add a rack'],
    },
    receptionDate: {
      type: Date,
      default: Date.now,
    },
    weight: {
      type: Number,
      required: [true, 'Please add a weight'],
      maxlength: [4, 'Plate cannot be more than 4 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      maxlength: [4, 'Plate cannot be more than 4 characters'],
    },
    photos: {
      type: [String],
      required: false,
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

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
