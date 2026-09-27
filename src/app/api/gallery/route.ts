import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase";

export async function GET() {
  if (!supabaseService) return NextResponse.json({ posts: [] });
  const { data: posts, error } = await supabaseService.from("gallery_posts").select("*").eq("status", "published").order("event_date", { ascending: false, nullsFirst: false });
  if (error) return NextResponse.json({ error: "Unable to load gallery" }, { status: 500 });
  const ids = (posts || []).map((post) => post.id);
  const { data: images } = ids.length ? await supabaseService.from("gallery_images").select("*").in("post_id", ids).order("sort_order") : { data: [] };
  const result = (posts || []).map((post) => ({ ...post, images: (images || []).filter((image) => image.post_id === post.id) }));
  return NextResponse.json({ posts: result });
}
