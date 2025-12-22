import { eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";
import db from "@/db";
import { articles } from "@/db/schema";
import resend from "@/email";
import CelebrationTemplate from "./templates/celebration-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number
) {
  const response = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  const { email, id, title, name } = response[0];
  if (!email) {
    return;
  }

  const emailRes = await resend.emails.send({
    from: "Contentify <onboarding@resend.dev>",
    to: email,
    subject: `✨ Your article got ${pageviews} views! ✨`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
  } else {
    console.error(
      `❌ error sending ${id} a celebration for getting ${pageviews} on article ${articleId}`,
      emailRes.error
    );
  }
}
