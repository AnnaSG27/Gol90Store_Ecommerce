import {
    RiCalendarCheckLine,
    RiQuillPenLine,
    RiTimeLine,
} from "@remixicon/react"
import { Contract, ContractIconType } from "../models"
import { STATUS_STYLES } from "../data"

interface ContractCardProps {
    contract: Contract
}

const detailIcons: Record<ContractIconType, React.ElementType> = {
    time: RiTimeLine,
    signature: RiQuillPenLine,
    calendar: RiCalendarCheckLine,
}

export function ContractCard({ contract }: ContractCardProps) {
    const DetailIcon = detailIcons[contract.icon]

    return (
        <div className="rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
            {/* Top row: status + price */}
            <div className="mb-3 flex items-center justify-between">
                <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLES[contract.status]}`}
                >
                    {contract.status}
                </span>
                <span className="text-sm font-semibold text-foreground">
                    {contract.price}{" "}
                    <span className="font-normal text-muted-foreground">
                        {contract.type}
                    </span>
                </span>
            </div>

            {/* Title */}
            <h3 className="mb-4 text-base font-semibold text-foreground">
                {contract.title}
            </h3>

            {/* Bottom row: client + detail + button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    {/* Client */}
                    <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                            {contract.initials}
                        </span>
                        <div>
                            <p className="text-[11px] text-muted-foreground">Client</p>
                            <p className="text-sm font-medium text-foreground">
                                {contract.client}
                            </p>
                        </div>
                    </div>

                    {/* Detail */}
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <DetailIcon className="size-4" />
                        {contract.detail}
                    </div>
                </div>

                <a
                    href={`/contracts/${contract.title.toLowerCase().replaceAll(" ", "-")}`}
                    className="rounded-lg border border-border bg-action px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                    View Details
                </a>
            </div>
        </div>
    )
}
