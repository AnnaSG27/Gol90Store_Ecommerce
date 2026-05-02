"use client"

import { ContractHeader } from "./components/ContractHeader"
import { ContractFilters } from "./components/ContractFilters"
import { ContractList } from "./components/ContractList"
import { MOCK_CONTRACTS } from "./data"

export function ActiveContracts() {
    return (
        <div className="space-y-6">
            <ContractHeader />
            <ContractFilters />
            <ContractList contracts={MOCK_CONTRACTS} />
        </div>
    )
}
