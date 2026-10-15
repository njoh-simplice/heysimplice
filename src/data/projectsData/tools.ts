export interface Tool {
  /** Stable key. */
  id: string;
  /** Display name. */
  name: string;
  /** Absolute path under public/ — e.g. "/images/tools/foo.webp". Served at the
   *  site root, NOT imported as a bundled asset. */
  image: string;
  /** Live URL of the tool. */
  link: string;
  /** Short kind label, e.g. "Web tool". */
  type: string;
  /** One line describing what the tool does. */
  description: string;
  /** Master on/off switch — `false` hides the tool (e.g. if the site goes down). */
  isDisplay: boolean;
}

// Maintained by hand. Shown in the "Tools I Built" section of the Projects page.
export const tools: Tool[] = [
  {
    id: "cits26-participation-card-generator",
    name: "CITS26 Participation Card Generator",
    image: "/images/tools/cits26-participation-card-generator.webp",
    link: "https://cits26.heysimplice.com",
    type: "Web tool",
    description:
      "Create your “Je serai au CITS26” participation card from a photo, name and role.",
    isDisplay: true,
  },
];
