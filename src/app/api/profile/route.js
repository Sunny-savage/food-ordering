import mongoose from "mongoose";

import { auth } from "../auth/[...nextauth]/route";
import { User } from "../../../models/User";
import { UserInfo } from "../../../models/userInfos";
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URI);
  const data = await req.json();

  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  if (_id) {
    filter = { _id };
  } else {
    const session = await auth();
    const email = session.user?.email;
    filter = { email };
  }
  const user = await User.findOne(filter).lean();

  const updatawone = await User.updateOne(filter, {
    name: data.name,
    image: data.image,
  }).lean();

  const info = await UserInfo.findOneAndUpdate(
    { email: user.email },
    otherUserInfo,
    {
      upsert: true,
    }
  ).lean();

  return Response.json("ok");
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URI);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }

    filterUser = { email };
  }

  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json({ ...user, ...userInfo });
}
