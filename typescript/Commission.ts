interface RateCard {
    name: string,
    rate: number
}

interface Commission {
    name: string,
    rate: number,
    amount: number
}

interface PayableReport {
    payableAmount: number,
    commissions: Commission[]
}

const platformRate: RateCard = {
    name: "platform",
    rate: 20
}

const brokerRate: RateCard = {
    name: "broker",
    rate: 10
}

function computeSampleCommision(amount): PayableReport {
    return null
}