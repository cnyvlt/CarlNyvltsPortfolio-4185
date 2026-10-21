import z from "zod";
import { tool } from "ai";
import { getProject } from "../../../web/data/projects";

/**
 * Pulls the full detail of one case study on demand — context, task list,
 * tools and disciplines — so the system prompt can stay compact.
 */
export const getProjectDetail = tool({
  description:
    "Look up the full detail of one of Carl Nyvlt's case studies by its slug (for example \"eadvisor-aviso\" or \"poets-pathway\"). Use this whenever a visitor asks about a specific project so you can quote its context, task list and tools accurately.",
  inputSchema: z.object({
    slug: z.string().describe("The project slug, e.g. \"microsoft-ramp\""),
  }),
  async execute({ slug }) {
    const project = getProject(slug);
    if (!project) {
      return {
        found: false,
        message: `No project with the slug "${slug}".`,
      };
    }
    return {
      found: true,
      title: project.title,
      client: project.client,
      context: project.context,
      tasks: project.tasks,
      tools: project.tools,
      disciplines: project.disciplines,
      screens: project.images.map((i) => i.caption),
    };
  },
});
