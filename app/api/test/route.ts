import { NextRequest, NextResponse } from "next/server";
interface RequestBody {
    theme: string;
    // Add other properties
  }

export async function POST(req: NextRequest) {
    try {
        const reqBody: RequestBody = await req.json();
        console.log(reqBody);
        return NextResponse.json({
            message: "success",
            status: 200,
            theme: reqBody?.theme
        },{status:200});
    } catch (err) {
        console.log(err);
        return new NextResponse("Failed to send email", { status: 500 });
    }
}
