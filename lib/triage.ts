import mongoose from 'mongoose';

const TriageSchema = new mongoose.Schema({
  context: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String }, // Optional: set if you want to track user
});

export default mongoose.models.Triage || mongoose.model('Triage', TriageSchema);
