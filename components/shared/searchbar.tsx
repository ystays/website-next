"use client";

import { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Search, X, FileText } from "lucide-react";
import { useDebounce } from "use-debounce";

interface PagefindResult {
    id: string;
    data: () => Promise<{
        url: string;
        meta: { title?: string };
        excerpt: string;
    }>;
}

interface SearchResult {
    url: string;
    title: string;
    excerpt: string;
}

// Pagefind module loaded lazily after mount
let pagefind: any = null;

async function loadPagefind() {
    if (pagefind) return pagefind;
    try {
        // webpackIgnore: true keeps webpack from bundling this — it's served statically
        // @ts-expect-error – pagefind.js is a runtime-only static file generated after build
        pagefind = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
        await pagefind.init();
    } catch {
        // silently fail in dev (stub handles it)
        pagefind = { search: async () => ({ results: [] }) };
    }
    return pagefind;
}

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load pagefind on first open
    useEffect(() => {
        if (open) loadPagefind();
    }, [open]);

    // Focus input when dialog opens
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
            setResults([]);
        }
    }, [open]);

    // Run search when debounced query changes
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }
        let cancelled = false;
        const runSearch = async () => {
            setLoading(true);
            const pf = await loadPagefind();
            const search = await pf.search(debouncedQuery);
            // Resolve first 8 results
            const resolved: SearchResult[] = await Promise.all(
                (search.results as PagefindResult[]).slice(0, 8).map(async (r) => {
                    const data = await r.data();
                    return {
                        url: data.url,
                        title: data.meta?.title ?? "Untitled",
                        excerpt: data.excerpt,
                    };
                }),
            );
            if (!cancelled) {
                setResults(resolved);
                setLoading(false);
            }
        };
        runSearch();
        return () => {
            cancelled = true;
        };
    }, [debouncedQuery]);

    // Global keyboard shortcut: Ctrl+K / Cmd+K
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button
                    aria-label="Open search"
                    className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <Search className="h-4 w-4" />
                    <span className="hidden font-display sm:inline">Search</span>
                    <kbd className="hidden rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 sm:inline">
                        ⌘K
                    </kbd>
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
                <Dialog.Content
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="fixed left-1/2 top-[15vh] z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out"
                >
                    <VisuallyHidden.Root>
                        <Dialog.Title>Search</Dialog.Title>
                    </VisuallyHidden.Root>

                    {/* Search input row */}
                    <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                        <Search className="h-4 w-4 shrink-0 text-gray-400" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search posts, pages…"
                            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="rounded-md p-0.5 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                        <Dialog.Close asChild>
                            <button className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-100">
                                Esc
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {loading && (
                            <div className="flex items-center justify-center py-8 text-sm text-gray-400">
                                Searching…
                            </div>
                        )}

                        {!loading && debouncedQuery && results.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-10 text-sm text-gray-400">
                                <Search className="mb-2 h-8 w-8 opacity-30" />
                                No results for &ldquo;{debouncedQuery}&rdquo;
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <ul className="divide-y divide-gray-50 py-1">
                                {results.map((result) => (
                                    <li key={result.url}>
                                        <a
                                            href={result.url}
                                            onClick={() => setOpen(false)}
                                            className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                                        >
                                            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 group-hover:text-gray-500" />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {result.title}
                                                </p>
                                                <p
                                                    className="mt-0.5 line-clamp-2 text-xs text-gray-500"
                                                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                                                />
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!debouncedQuery && (
                            <div className="flex items-center justify-center py-8 text-sm text-gray-400">
                                Start typing to search…
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
