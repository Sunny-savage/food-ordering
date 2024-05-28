import mongoose from "mongoose";
import { User } from "../../../models/User";
import bcrypt from "bcrypt";
export async function POST(req) {
  const body = await req.json();
  await mongoose.connect(process.env.MONGO_URI);

  if (!body.password?.length || body.password?.length < 5) {
    new Error("password must be atleast 5 characters");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(body.password, salt);
  console.log(body, hashedpassword);
  const user = await User.create({
    name: body.name,
    email: body.email,
    password: hashedpassword,
  });
  return Response.json("ok");
}
