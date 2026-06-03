"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Search, FileText, CornerDownLeft, Hash } from "lucide-react"

interface SearchItem {
  id: string
  title: string
  description?: string
  url: string
  type: "page" | "heading" | "static"
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const router = useRouter()

  // 1. Gather all pages and headings to index dynamically from server-side API
  const [searchItems, setSearchItems] = React.useState<SearchItem[]>([
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
  ])

  React.useEffect(() => {
    let active = true
    fetch("/api/search")
      .then((res) => res.json())
      .then((data) => {
        if (active && Array.isArray(data)) {
          setSearchItems(data)
        }
      })
      .catch((err) => console.error("Failed to load search index:", err))
    return () => {
      active = false
    }
  }, [])

  // 2. Keyboard shortcut event listener (⌘K / Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    const handleOpenEvent = () => setOpen(true)

    window.addEventListener("keydown", down)
    window.addEventListener("open-search", handleOpenEvent)

    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("open-search", handleOpenEvent)
    }
  }, [])

  // 3. Selection handler
  const handleSelect = (url: string) => {
    setOpen(false)
    setSearch("")
    router.push(url)
  }

  // Filter items client-side
  const filteredItems = React.useMemo(() => {
    if (!search.trim()) return searchItems
    const query = search.toLowerCase()
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
    )
  }, [search, searchItems])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="md:max-w-2xl sm:max-w-lg max-w-md p-0 bg-[var(--rune-bg-raised)] border border-[var(--rune-border-strong)] rounded-lg overflow-hidden shadow-2xl"
      >
        <DialogTitle className="sr-only">Rune Search</DialogTitle>

        <Command
          label="Search Guide"
          className="flex flex-col h-full max-h-[420px] font-sans"
        >
          {/* Search Input block */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--rune-border)] bg-[var(--rune-bg-overlay)]">
            <Search className="size-4 text-[var(--rune-fg-muted)] shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search guides, headings, and files..."
              className="w-full bg-transparent text-sm text-[var(--rune-fg-base)] placeholder-[var(--rune-fg-faint)] border-none outline-none focus:ring-0"
              autoFocus
            />
            <span className="text-[10px] font-mono bg-[var(--rune-bg-subtle)] text-[var(--rune-fg-muted)] border border-[var(--rune-border)] px-1.5 py-0.5 rounded select-none">
              ESC
            </span>
          </div>

          {/* Search Results List */}
          <Command.List className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-8 text-center text-xs text-[var(--rune-fg-muted)] font-mono">
              No matching specifications found.
            </Command.Empty>

            {filteredItems.length > 0 && (
              <Command.Group heading="Documentation Index" className="text-[10px] font-mono text-[var(--rune-fg-faint)] px-2 py-1.5 uppercase tracking-wider">
                {filteredItems.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.title} ${item.description || ""}`}
                    onSelect={() => handleSelect(item.url)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer select-none outline-none text-xs text-[var(--rune-fg-base)] hover:bg-[var(--rune-bg-subtle)] focus:bg-[var(--rune-bg-subtle)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1 rounded bg-[var(--rune-bg-subtle)] border border-[var(--rune-border)] text-[var(--rune-fg-muted)] group-hover:border-[var(--rune-accent-dim)] group-hover:text-[var(--rune-accent)] transition-all">
                        {item.type === "heading" ? (
                          <Hash className="size-3.5" />
                        ) : (
                          <FileText className="size-3.5" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[var(--rune-fg-base)] group-hover:text-[var(--rune-accent)] transition-colors">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="text-[10px] text-[var(--rune-fg-muted)] mt-0.5 leading-normal truncate max-w-[280px] sm:max-w-sm">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[9px] font-mono text-[var(--rune-fg-faint)]">
                      Go <CornerDownLeft className="size-3" />
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          {/* Dialog footer */}
          <div className="px-4 py-2 border-t border-[var(--rune-border)] bg-[var(--rune-bg-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--rune-fg-faint)] select-none">
            <div className="flex gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
            <span>Rune Compiler Index</span>
          </div>

        </Command>
      </DialogContent>
    </Dialog>
  )
}
