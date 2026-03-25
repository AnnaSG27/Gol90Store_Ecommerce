import { Contract } from "./models"

export const MOCK_CONTRACTS: Contract[] = [
    {
        title: "Enterprise E-commerce Platform Redesign",
        status: "EN PROGRESO",
        price: "$4,500.00",
        type: "Fixed",
        client: "Sarah Jenkins",
        initials: "SJ",
        icon: "time",
        detail: "12 days remaining",
    },
    {
        title: "Mobile App UX Audit & Strategy",
        status: "PENDIENTE",
        price: "$85.00",
        type: "/ hr",
        client: "Marcus Thorne",
        initials: "MT",
        icon: "signature",
        detail: "Awaiting signature",
    },
    {
        title: "Branding & Visual Identity System",
        status: "COMPLETADO",
        price: "$2,200.00",
        type: "Milestone",
        client: "Elena Rodriguez",
        initials: "ER",
        icon: "calendar",
        detail: "Ended Oct 24, 2025",
    },
    {
        title: "SaaS Dashboard Development (React/Tailwind)",
        status: "EN PROGRESO",
        price: "$12,000.00",
        type: "Fixed",
        client: "TechFlow Solutions",
        initials: "TF",
        icon: "time",
        detail: "45 days remaining",
    },
]

export const STATUS_STYLES: Record<Contract["status"], string> = {
    "EN PROGRESO": "bg-blue-100 text-blue-700",
    PENDIENTE: "bg-orange-100 text-orange-700",
    COMPLETADO: "bg-green-100 text-green-700",
}
