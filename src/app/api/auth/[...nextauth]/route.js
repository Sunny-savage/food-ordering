import NextAuth from "next-auth";
import mongoose from "mongoose";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/db";
import { User } from "../../../../models/User";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { UserInfo } from "../../../../models/userInfos";
const authoptions = {
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // let user = null;
        const { email, password } = credentials;

        mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email });
        const Passwordok = user && bcrypt.compareSync(password, user.password);

        if (Passwordok) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}
export const { handlers, auth, signIn, signOut } = NextAuth(authoptions);

export const { GET, POST } = handlers;
