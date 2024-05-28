import mongoose from "mongoose";
export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URI);
  const data = await req.formData();
  console.log(data);
  if (data.get("file")) {
    //upload file
  }

  return Response.json("ok");
}
