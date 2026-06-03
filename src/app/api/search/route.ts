import { NextResponse } from "next/server"
import { source } from "@/lib/source"
import type { ReactNode } from "react"

function getTitleString(title: ReactNode): string {
  if (!title) return ""
  if (typeof title === "string") return title
  if (typeof title === "number") return String(title)
  if (Array.isArray(title)) return title.map(getTitleString).join("")
  if (typeof title === "object" && title !== null && "props" in title) {
    const element = title as { props?: { children?: ReactNode } }
    return getTitleString(element.props?.children)
  }
  return ""
}

export async function GET() {
  const items = [
    {
      id: "home",
      title: "Homepage",
      description: "Rune Lang landing page, pipeline visualizer, and scope explorer.",
      url: "/",
      type: "static",
    },
    {
      id: "roadmap",
      title: "Roadmap",
      description: "Rune Lang compiler execution roadmap, VM, and milestones.",
      url: "/roadmap",
      type: "static",
    },
  ]

  try {
    const pages = source.getPages()
    pages.forEach((page) => {
      // Add page level item
      items.push({
        id: page.url,
        title: page.data.title,
        description: page.data.description || "",
        url: page.url,
        type: "page",
      })

      // Add heading level items from Table of Contents (toc)
      if (page.data.toc) {
        page.data.toc.forEach((heading) => {
          if (heading.depth <= 3) {
            items.push({
              id: `${page.url}-${heading.url}`,
              title: getTitleString(heading.title),
              description: `Section inside ${page.data.title}`,
              url: `${page.url}${heading.url}`,
              type: "heading",
            })
          }
        })
      }
    })
  } catch (error) {
    console.error("Error generating search index:", error)
  }

  return NextResponse.json(items)
}
