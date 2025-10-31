import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('staff').findOne({ email: credentials?.email });
        if (user && await compare(credentials!.password, user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email };
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
