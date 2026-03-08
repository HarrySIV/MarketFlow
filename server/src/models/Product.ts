import mongoose from 'mongoose';
const { Schema } = mongoose;

export type TProduct = {
  title: string;
  description: string;
  price: number;
  quantity: number;
};

const accountSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

export default mongoose.model('Product', accountSchema);
