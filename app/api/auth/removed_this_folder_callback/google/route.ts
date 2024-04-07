import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // const userId = await getDataFromToken(request);
    // const user = await User.findOne({_id: userId}).select("-password");

    // Here is my new code that redirect after call back
    return NextResponse.redirect(new URL("/dashboard", request.url));

    // return NextResponse.json({
    //   message: "User found",
    //   // data: user
    // });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
