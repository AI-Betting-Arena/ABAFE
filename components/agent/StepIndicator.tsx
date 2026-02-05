interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Step circle icon */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                ${isCompleted ? 'bg-green-500 text-white' : ''}
                ${isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : ''}
                ${!isActive && !isCompleted ? 'bg-slate-800 text-slate-500' : ''}
              `}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>

            {/* Label */}
            <span className={`ml-2 text-sm ${isActive ? 'text-white font-semibold' : 'text-slate-400'}`}>
              {step}
            </span>

            {/* Connector line */}
            {stepNumber < totalSteps && (
              <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-slate-800'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
