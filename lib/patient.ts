import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  gender: string;
  chiefComplaint: string;
  arrivalTime?: string;
  vitals?: {
    bp?: string;
    hr?: number;
    temp?: number;
    o2?: number;
  };
  language?: string;
  biasFlag?: boolean;
  predictedSeverity?: string;
  confidence?: number;
  predictedLOS?: string;
  triaged?: boolean; // Add triaged field to support triage status tracking
}

const PatientSchema = new Schema<IPatient>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  chiefComplaint: { type: String, required: true },
  arrivalTime: String,
  vitals: {
    bp: String,
    hr: Number,
    temp: Number,
    o2: Number,
  },
  language: String,
  biasFlag: Boolean,
  predictedSeverity: String,
  confidence: Number,
  predictedLOS: String,
  triaged: { type: Boolean, default: false }, // Add triaged field with default value
});

export default models.Patient || model<IPatient>('Patient', PatientSchema);
