export type ContractStatus = "EN PROGRESO" | "PENDIENTE" | "COMPLETADO"

export type ContractIconType = "time" | "signature" | "calendar"

export interface Contract {
    title: string
    status: ContractStatus
    price: string
    type: string
    client: string
    initials: string
    icon: ContractIconType
    detail: string
}
