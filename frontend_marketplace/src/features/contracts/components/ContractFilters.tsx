import {
    RiArrowDownSLine,
    RiSearchLine,
} from "@remixicon/react"

export function ContractFilters() {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
                <RiSearchLine className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by project, client, or keyword..."
                    className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
            </div>
            <div className="flex gap-3">
                <button
                    type="button"
                    className="flex h-10 items-center gap-1.5 rounded-lg border border-border bg-white px-4 text-sm text-foreground transition-colors hover:bg-muted"
                >
                    <span className="text-muted-foreground">Status:</span> All
                    <RiArrowDownSLine className="size-4 text-muted-foreground" />
                </button>
                <button
                    type="button"
                    className="flex h-10 items-center gap-1.5 rounded-lg border border-border bg-white px-4 text-sm text-foreground transition-colors hover:bg-muted"
                >
                    <span className="text-muted-foreground">Sort:</span> Newest
                    <RiArrowDownSLine className="size-4 text-muted-foreground" />
                </button>
            </div>
        </div>
    )
}
