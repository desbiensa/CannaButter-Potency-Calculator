export interface CalculatorInputs {
  totalThc: number;
  amountOfCannabis: number;
  producedButter: number;
}

export interface CalculationResult {
  optimalPotency: number;
  finalApproximation: number;
}

export interface ValidationError {
  field: keyof CalculatorInputs;
  message: string;
}
