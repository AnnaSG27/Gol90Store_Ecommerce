import { RiArrowDownSLine } from "@remixicon/react"
import { Contract } from "../models"
import { ContractCard } from "./ContractCard"

interface ContractListProps {
    contracts: Contract[]
}

export function ContractList({ contracts }: ContractListProps) {
    return (
        <div className="space-y-4">
            {contracts.map((contract) => (
                <ContractCard key={contract.title} contract={contract} />
            ))}

            {/* Show Archived */}
            <div className="flex justify-center pt-2">
                <button
                    type="button"
                    className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    Show Archived Contracts
                    <RiArrowDownSLine className="size-4" />
                </button>
            </div>
        </div>
    )

}
