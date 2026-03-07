import mongoose from 'mongoose';
const { Schema } = mongoose;

export type TAccount = {
  firstName: string;
  lastName: string;
  email: string;
  hashPass: string;
};

const accountSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  hashPass: { type: String },
});

export default mongoose.model('Account', accountSchema);
