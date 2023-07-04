import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  try {
    const { name, password, email, role } = await req.json();

    // Trim input values
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();
    const trimmedRole = role.trim();

    // Validate required fields
    if (!trimmedName || !trimmedPassword || !trimmedEmail || !trimmedRole) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const { uid } = await adminAuth.createUser({
      displayName: trimmedName,
      password: trimmedPassword,
      email: trimmedEmail,
    });
    await adminAuth.setCustomUserClaims(uid, { role: trimmedRole });

    return NextResponse.json({ uid }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error.message}` }, { status: 500 });
  }
}
