import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "../../../dbConfig";

connect();

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { _id, ...update } = reqBody;
        const newUser: any = {};
        if (update.name) newUser.name = update.name;
        if (update.email) newUser.email = update.email;
        if (update.password) newUser.password = update.password;
        if (update.isAdmin) newUser.isAdmin = update.isAdmin;
        if (update.isPrivate) newUser.isPrivate = update.isPrivate;
        if (!_id) {
            return NextResponse.json({ error: "Please provide a valid user ID" }, { status: 400 });
        }

        const user = await User.findByIdAndUpdate(_id, newUser, { new: true });

        if (!user) {
            return NextResponse.json({ message: "User not found", updated: false }, { status: 200 });
        }

        return NextResponse.json({ message: "User updated successfully", user, updated: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", updated: false }, { status: 200 });
    }
}
