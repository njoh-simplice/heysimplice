import { CONTACT_EMAIL, SITE_HOST, SITE_URL } from "./site";

export interface PageMeta {
  title: string;
  description: string;
}

// Re-exported so existing `import { SITE_URL } from "./pageMeta"` call sites keep working.
export { SITE_URL };

/**
 * Site-wide fallbacks — must match the hard-coded tags in index.html. Blog
 * posts override keywords / og:image / og:type per-post (scripts/prerender.mjs
 * at build time, BlogPost.tsx on SPA nav); usePageMeta resets them back to
 * these on every other route so a post's values don't leak after navigation.
 */
export const SITE_KEYWORDS =
  "Njoh Simplice Junior, software developer, web developer, WordPress developer, SEO specialist, freelance developer, Yaoundé, Cameroon web developer, React developer, Laravel developer, web design, mobile app development";
export const SITE_OG_IMAGE = `${SITE_URL}/images/logo.gif`;

/**
 * Per-route `<title>` / `<meta name="description">`.
 *
 * Single source of truth: `usePageMeta` applies these on client-side
 * navigation, and scripts/prerender.mjs bakes them into each prerendered HTML
 * file so crawlers get them without running JS.
 */
export const PAGE_META = {
  "/": {
    title: "Njoh Simplice Junior | Web Developer & SEO in Yaoundé",
    description:
      "I am a Software developer and content creator. I craft websites and mobile apps that align with your brand and engage your audience.",
  },
  "/about": {
    title: "About Njoh Simplice Junior | WordPress & SEO Developer",
    description:
      "Who is Njoh Simplice Junior? A software developer, WordPress integrator and SEO specialist in Yaoundé, Cameroon, working remotely with clients across Cameroon, France and internationally.",
  },
  "/projects": {
    title: "Web Development Projects | Njoh Simplice Junior",
    description:
      "Websites, web apps and mobile apps delivered by Njoh Simplice Junior for clients in Cameroon and France.",
  },
  "/blog": {
    title: "SEO & Web Development Blog | Njoh Simplice Junior",
    description:
      "Notes from Njoh Simplice Junior on web development, WordPress and SEO — practical write-ups from client work.",
  },
  "/contact": {
    title: "Contact | Freelance Web Developer in Yaoundé",
    description:
      `Get in touch with Njoh Simplice Junior — email ${CONTACT_EMAIL}, phone +237 652 02 59 01, based in Yaoundé, Cameroon.`,
  },
  "/legal-mentions": {
    title: "Legal Notice | Njoh Simplice Junior",
    description:
      `Legal information for ${SITE_HOST}: site editor, hosting, intellectual property, personal data and cookies.`,
  },
  "/404": {
    title: "Page Not Found | Njoh Simplice Junior",
    description: "The page you're looking for doesn't exist or has moved.",
  },
} as const satisfies Record<string, PageMeta>;

export type PageMetaKey = keyof typeof PAGE_META;

const TITLE_SUFFIX = " | Njoh Simplice Junior";
const MAX_TITLE_LENGTH = 70;

/**
 * `<title>` for a blog post. The brand suffix is only appended when the result
 * stays within 70 characters (Bing flags longer titles as truncated); long
 * post titles go out bare. Shared by prerender.mjs and BlogPost.tsx so the
 * static and client-side titles can't drift apart.
 */
export function postDocumentTitle(postTitle: string): string {
  const withSuffix = `${postTitle}${TITLE_SUFFIX}`;
  return withSuffix.length <= MAX_TITLE_LENGTH ? withSuffix : postTitle;
}

/** Routes prerendered to static HTML at build time (see scripts/prerender.mjs). */
export const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/blog",
  "/contact",
  "/legal-mentions",
] as const;
