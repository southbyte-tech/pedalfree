export const IMPACT_ASSUMPTIONS = {
  workDays: 22,
  tripsPerDay: 2,
  activeMinutesPerDay: 30,
  maxBikes: 120,
} as const

export function calculateImpact(bikes: number) {
  const count = Math.max(1, Math.min(IMPACT_ASSUMPTIONS.maxBikes, Math.round(bikes)))
  return {
    bikes: count,
    trips: count * IMPACT_ASSUMPTIONS.workDays * IMPACT_ASSUMPTIONS.tripsPerDay,
    activeHours: count * IMPACT_ASSUMPTIONS.workDays * IMPACT_ASSUMPTIONS.activeMinutesPerDay / 60,
  }
}

export const formatNumber = (value: number) => new Intl.NumberFormat('pt-BR').format(value)
