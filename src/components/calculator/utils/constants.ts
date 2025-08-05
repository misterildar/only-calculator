export const CALCULATOR_CONSTANTS = {
  DEFAULT_VALUES: {
    currentAge: '' as const,
    gender: '' as const,
    initialInvestment: 0,
    contributionYears: 0,
  },

  VALIDATION: {
    MIN_AGE: 30,
    MAX_AGE: 120,
    MIN_INVESTMENT: 10000,
    MIN_CONTRIBUTION_YEARS: 10,
    MAX_CONTRIBUTION_YEARS: 50,
  },

  SLIDER: {
    MIN: 0,
    MAX: 30,
    STEP: 1,
    LABELS: ['0', '10', '20', '30'],
  },

  GENDER_OPTIONS: [
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
  ],
} as const;

export const CALCULATOR_TEXTS = {
  ICON: {
    iconText:
      'Click "Calculate my profit" to calculate your retirement potential and display information with calculations',
  },

  LABELS: {
    currentAge: 'My current age',
    gender: 'My gender',
    initialInvestment: 'Initial investment amount ($)',
    contributionYears: 'Contribution Years',
  },

  PLACEHOLDERS: {
    age: '50',
    investment: '$10.000',
  },

  ERRORS: {
    ageRequired: 'Age is required',
    ageMin: 'The entered age must be between 30 and 120',
    ageMax: 'The entered age must be between 30 and 120',
    ageFormat: 'Enter your age in number format',
    genderRequired: 'Please select your gender',
    investmentRequired: 'Investment amount is required',
    investmentMin: 'Minimum investment is $10,000',
    investmentFormat: 'Enter your investment in number format',
    contributionYearsRequired: 'Minimum contribution period is 10 years',
  },

  HINTS: {
    minYears: '(min 10 years)',
    yearsLabel: 'Years',
  },

  BUTTON: {
    submit: 'Calculate my profit',
  },

  DISCLAIMER: `These results are simulated for illustrative purposes only. Actual returns may vary based on market conditions, fees, and other factors. This calculator doesn’t guarantee future performance.`,

  RESULTS: {
    title: 'Your Investment Results',
    totalAmount: 'Total Amount:',
    profit: 'Profit:',
  },
} as const;
