import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const parsed = newsletterSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message }, { status: 400 });

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      console.info("MilanoFloral demo newsletter signup", parsed.data.email);
      return NextResponse.json({ message: "Demo subscription received." });
    }

    const { error } = await supabase.from("newsletter_subscribers").upsert({ email: parsed.data.email }, { onConflict: "email", ignoreDuplicates: true });
    if (error) throw error;
    return NextResponse.json({ message: "Subscribed." });
  } catch (error) {
    console.error("Newsletter route error", error);
    return NextResponse.json({ message: "Unable to subscribe." }, { status: 500 });
  }
}
