export function ContractHeader() {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-2xl font-bold text-foreground">Active Contracts</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Review and manage your ongoing professional engagements.
                </p>
            </div>
            <button
                type="button"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
                + Post a Job
            </button>
        </div>
    )
}
