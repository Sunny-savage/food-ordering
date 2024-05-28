import mongoose from "mongoose";
import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/db";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";
import { User } from "./models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET,

  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === "google") {
  //       return profile.email_verified && profile.email.endsWith("@example.com");
  //     }
  //     return true; // Do different verification for other providers that don't have `email_verified`
  //   },
  // },

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
      id: "credentials",
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

export const { GET, POST } = NextAuth(authOptions);
export default NextAuth(authOptions);
