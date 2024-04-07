import { connect } from "../../../dbConfig/index";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email, "herere");
        if(!email){
            return NextResponse.json({ message: "please send email", access: false }, { status: 200 })
        }
        const user = await User.findOne({ email: email });
        if (!user || !user?.accessTokenExpiry) {
            return NextResponse.json({ message: "user is not valid", access: false }, { status: 200 })
        }
        let presentTimestamp = Math.floor(Date.now() / 1000);
        if (user?.accessTokenExpiry) {
            if (presentTimestamp >= user?.accessTokenExpiry) {
                return NextResponse.json({ message: "Invalid user", access: false }, { status: 200 });
            } else {
                console.log("hiii");
                return NextResponse.json({ message: "access token is valid", access: true }, { status: 200 })
            }
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}