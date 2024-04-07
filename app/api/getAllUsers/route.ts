import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "../../../dbConfig";

connect();

export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json();
        const { email, isAdmin } = reqBody;
        if(!email){return NextResponse.json({error: "please share email"}, {status: 400});}
        const user = await User.findOne({email: email}).select("-password");
        if(!user){
            return NextResponse.json({message: "token invalid or user doesnot exist"}, {status: 200});
        }
        const users = await User.find().select("-password");
        if(user.isAdmin==true){
            return NextResponse.json(users, { status: 200 });
        } else {
            const users_tobe_sent: any[] = [];
            user.forEach((element: any) => {
                if(element.isPublic=="true"){
                    users_tobe_sent.push(element)
                }
            });
            return NextResponse.json(users_tobe_sent, { status: 200 });
        }

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}