import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { calculatorSchema, calculatePotency } from '@/schemas/calculator'
import type { CalculatorInputs } from '@/types/calculator'

const DownArrow = () => (
  <div className="flex justify-center py-3">
    <div className="w-28 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-md">
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#a8bc95" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
)

interface InputFieldProps {
  id: keyof CalculatorInputs
  label: string
  placeholder: string
  value: number
  error?: string
  tooltipContent: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ id, label, placeholder, value, error, tooltipContent, onChange }: InputFieldProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-xl font-bold text-[#8c5d42] text-shadow">
        {label}
      </label>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="inline-flex">
            <HelpCircle className="h-5 w-5 text-[#8c5d42] cursor-help" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-white text-gray-800">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </div>
    <input
      id={id}
      type="number"
      step="0.01"
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 bg-white text-gray-600 text-lg placeholder-gray-400 focus:outline-none focus:border-[#0777da] transition-colors"
    />
    {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}
  </div>
)

const Calculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    totalThc: 0,
    amountOfCannabis: 0,
    producedButter: 0,
  })

  const [result, setResult] = useState<{ optimalPotency: number; finalApproximation: number } | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof CalculatorInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setInputs((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleSubmit = () => {
    try {
      // Validate inputs with Zod
      const validatedInputs = calculatorSchema.parse(inputs)
      
      // Calculate result
      const calculationResult = calculatePotency(validatedInputs)
      setResult(calculationResult)
      setErrors({})
    } catch (error) {
      // Handle Zod validation errors
      if (error && typeof error === 'object' && 'errors' in error) {
        const zodError = error as { errors: Array<{ path: (string | number)[]; message: string }> }
        const newErrors: Record<string, string> = {}
        zodError.errors.forEach((err) => {
          const field = err.path[0]
          if (typeof field === 'string') {
            newErrors[field] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen py-12 px-4 flex items-center justify-center relative bg-white">        
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="bg-[#b8ce9f]/95 rounded-[2.5rem] p-10 md:p-12 shadow-2xl border-[5px] border-white/50 relative backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 text-shadow">
              Cannabutter THC Calculator
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch relative">
              {/* Input Form */}
              <div className="flex flex-col justify-evenly h-full min-h-[600px]">
                <InputField
                  id="totalThc"
                  label="Total THC Percentage %"
                  placeholder="0.00%"
                  value={inputs.totalThc}
                  error={errors.totalThc}
                  onChange={handleInputChange('totalThc')}
                  tooltipContent={
                    <p>
                      The Total THC percentage (by weight) in your cannabis. This will be calculated 
                      based on the <strong>amount of cannabis in grams</strong> to determine 
                      the total THC content.
                    </p>
                  }
                />

                <InputField
                  id="amountOfCannabis"
                  label="Amount of Cannabis/g"
                  placeholder="0.00g"
                  value={inputs.amountOfCannabis}
                  error={errors.amountOfCannabis}
                  onChange={handleInputChange('amountOfCannabis')}
                  tooltipContent={
                    <p>The amount of Cannabis (dried flower) in gram, used to produce the CannaButter.</p>
                  }
                />

                <InputField
                  id="producedButter"
                  label="Produced Butter/g"
                  placeholder="0.00g"
                  value={inputs.producedButter}
                  error={errors.producedButter}
                  onChange={handleInputChange('producedButter')}
                  tooltipContent={
                    <p>
                      The <strong>final product</strong>, your output of CannaButter once completed. 
                      See the tutorial{' '}
                      <a
                        href="https://youtu.be/3XnVOfpBoAk"
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-[#0777da]"
                      >
                        How to make CannaButter
                      </a>{' '}
                      for reference.
                    </p>
                  }
                />

                <button 
                  onClick={handleSubmit} 
                  className="w-full bg-[#0777da] hover:bg-[#065ba8] text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
                >
                  Submit
                </button>
              </div>

              {/* Divider */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/60 -translate-x-1/2" />

              {/* Results Display */}
              <div className="flex flex-col justify-evenly h-full text-center">
                <div>
                  <p className="text-2xl font-bold text-[#8c5d42] mb-3 text-shadow">
                    The OPTIMAL POTENCY:
                  </p>
                  <p className="text-5xl font-bold text-[#8c5d42] text-shadow mb-2">
                    {result?.optimalPotency.toFixed(2) || '0,00'}mg of THC
                  </p>
                  <p className="text-lg text-[#8c5d42] font-semibold">per gram of butter!</p>
                </div>

                <DownArrow />

                <p className="text-2xl font-bold text-[#8c5d42] text-shadow">
                  Remove 10% for accuracy
                </p>

                <DownArrow />

                <div>
                  <p className="text-xl font-semibold text-[#8c5d42] mb-3 text-shadow">
                    Final Approximation is
                  </p>
                  <p className="text-5xl font-bold text-[#8c5d42] text-shadow mb-2">
                    {result?.finalApproximation.toFixed(2) || '0,00'}mg of THC
                  </p>
                  <p className="text-lg text-[#8c5d42] font-semibold">per gram of butter.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-xl text-[#5a9a7a]">
            <p>
              Please <strong>support</strong> and <strong>subscribe</strong> to my{' '}
              <a
                href="http://www.youtube.com/channel/UC627LnTjnTPFwITyWguF0tg?sub_confirmation=1"
                target="_blank"
                rel="noreferrer"
                className="text-[#0777da] font-bold hover:underline"
              >
                Youtube Channel
              </a>
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default Calculator
