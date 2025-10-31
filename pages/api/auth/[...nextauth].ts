import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';
import { compare } from 'bcryptjs';

const StaffSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'clinician' },
  department: { type: String },
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await Staff.findOne({ email: credentials?.email });
        if (user && await compare(credentials!.password, user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role, department: user.department };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
});
