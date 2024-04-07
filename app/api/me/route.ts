import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "../../../dbConfig";

connect();

export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json();
        const { email } = reqBody;
        if(!email){return NextResponse.json({error: "please share email"}, {status: 400});}
        const user = await User.findOne({email: email}).select("-password");
        if(user?.accessTokenExpiry){
            let presentTimestamp = Math.floor(Date.now() / 1000);
            if (presentTimestamp <= user.accessTokenExpiry) {
                return NextResponse.json({
                    message: "User found",
                    data: user
                },{status: 200});
            }
        }
        return NextResponse.json({error: "token invalid or user doesnot exist"}, {status: 400});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}