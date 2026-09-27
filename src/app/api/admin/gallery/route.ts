import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server-auth";
import { supabaseService } from "@/lib/supabase";

function clean(body: Record<string, unknown>) {
  const text = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const urls = Array.isArray(body.image_urls) ? body.image_urls.filter((url): url is string => typeof url === "string" && url.startsWith("http")).map((url) => url.trim()) : [];
  const date = text("event_date");
  return { post: { title: text("title"), title_zh: text("title_zh") || null, description: text("description") || null, description_zh: text("description_zh") || null, event_date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null, status: text("status") === "published" ? "published" : "draft", updated_at: new Date().toISOString() }, urls };
}
async function authorized() { return Boolean(supabaseService && await requireAdmin()); }
async function imagesFor(posts: Record<string, unknown>[]) {
  const ids = posts.map((post) => String(post.id));
  const { data: images } = ids.length ? await supabaseService!.from("gallery_images").select("*").in("post_id", ids).order("sort_order") : { data: [] };
  return posts.map((post) => ({ ...post, images: (images || []).filter((image) => image.post_id === post.id) }));
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseService!.from("gallery_posts").select("*").order("event_date", { ascending: false, nullsFirst: false });
  if (error) return NextResponse.json({ error: "Unable to load gallery" }, { status: 500 });
  return NextResponse.json({ posts: await imagesFor(data || []) });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { post, urls } = clean(body);
  if (!post.title || !urls.length) return NextResponse.json({ error: "A title and at least one image are required" }, { status: 400 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseService!.from("gallery_posts").insert(post).select().single();
  if (error) return NextResponse.json({ error: "Unable to create gallery post" }, { status: 400 });
  const { error: imageError } = await supabaseService!.from("gallery_images").insert(urls.map((image_url, index) => ({ post_id: data.id, image_url, sort_order: index })));
  if (imageError) return NextResponse.json({ error: "Post created but images could not be saved" }, { status: 500 });
  return NextResponse.json({ post: { ...data, images: urls.map((image_url, sort_order) => ({ image_url, sort_order })) } }, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const id = typeof body?.id === "string" ? body.id : "";
  if (!body || !id) return NextResponse.json({ error: "Gallery post id is required" }, { status: 400 });
  const { post, urls } = clean(body);
  if (!post.title || !urls.length) return NextResponse.json({ error: "A title and at least one image are required" }, { status: 400 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseService!.from("gallery_posts").update(post).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: "Unable to update gallery post" }, { status: 400 });
  await supabaseService!.from("gallery_images").delete().eq("post_id", id);
  const { error: imageError } = await supabaseService!.from("gallery_images").insert(urls.map((image_url, index) => ({ post_id: id, image_url, sort_order: index })));
  if (imageError) return NextResponse.json({ error: "Post updated but images could not be saved" }, { status: 500 });
  return NextResponse.json({ post: { ...data, images: urls.map((image_url, sort_order) => ({ image_url, sort_order })) } });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null) as { id?: string } | null;
  if (!body?.id) return NextResponse.json({ error: "Gallery post id is required" }, { status: 400 });
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { error } = await supabaseService!.from("gallery_posts").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: "Unable to delete gallery post" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
