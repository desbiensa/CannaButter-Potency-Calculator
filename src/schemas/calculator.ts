import { z } from 'zod'

export const calculatorSchema = z.object({
  totalThc: z
    .number()
    .min(0.01, 'THC Percentage must be greater than 0')
    .max(100, 'THC Percentage cannot exceed 100%'),
  amountOfCannabis: z
    .number()
    .min(0.01, 'Amount of Cannabis must be greater than 0')
    .max(10000, 'Amount of Cannabis seems too high'),
  producedButter: z
    .number()
    .min(0.01, 'Produced Butter must be greater than 0')
    .max(10000, 'Produced Butter seems too high'),
})

export type CalculatorInput = z.infer<typeof calculatorSchema>

export const calculatePotency = (input: CalculatorInput): { optimalPotency: number; finalApproximation: number } => {
  const { totalThc, amountOfCannabis, producedButter } = input
  
  // Convert THC percentage to mg/g: 1% = 10mg/g
  // Then calculate total THC in mg: (percentage * 10) * amountOfCannabis
  // Formula: ((thcPercentage * 10) * 0.877 * amountOfCannabis) / producedButter
  // 0.877 is the decarboxylation factor (THCA to THC conversion)
  const totalThcInMg = (totalThc / 100) * amountOfCannabis * 1000 // Convert percentage to mg
  const optimalPotency = (totalThcInMg * 0.877) / producedButter
  const finalApproximation = optimalPotency * 0.9 // Remove 10% for accuracy
  
  return {
    optimalPotency: Number(optimalPotency.toFixed(2)),
    finalApproximation: Number(finalApproximation.toFixed(2)),
  }
}
