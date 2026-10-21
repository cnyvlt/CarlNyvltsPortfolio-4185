import { projects } from "../../web/data/projects";
import { clients, process, services, site, toolGroups } from "../../web/data/site";

/**
 * Everything the agent is allowed to know is assembled from the same data
 * modules the site renders from, so the assistant can never drift away from
 * what the portfolio actually says.
 */
export function buildKnowledge() {
  const servicesBlock = services
    .map((s) => `- ${s.title}: ${s.body}`)
    .join("\n");

  const processBlock = process.map((p) => `${p.index} ${p.label}`).join(" → ");

  const toolsBlock = toolGroups
    .map((g) => `${g.label}: ${g.items.join(", ")}`)
    .join("; ");

  const projectsBlock = projects
    .map(
      (p) =>
        `- "${p.title}" (slug: ${p.slug}) — client: ${p.client}. Disciplines: ${p.disciplines.join(
          ", ",
        )}. Tools: ${p.tools.join(", ")}. Summary: ${p.context}`,
    )
    .join("\n");

  return `# Carl Nyvlt — portfolio knowledge base

## Who he is
${site.statement}
${site.intro}
${site.bio.join(" ")}

Role: ${site.role}. Based in ${site.location}. Over 20 years of experience. Companies in
Canada, the US and Europe.

Areas of work: ${site.capabilities.join(", ")}.

## Services offered
${servicesBlock}

## How he works (process)
${processBlock}

## Tools and software
${toolsBlock}

## Projects (12 case studies)
${projectsBlock}

## Clients (worked with directly or indirectly)
${clients.join(", ")}

## Contact
Email: ${site.email}
Cell: ${site.phone}
Based in: ${site.location}
`;
}
