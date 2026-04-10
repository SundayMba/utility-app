export function formatMoney(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function calculateBmi(heightCm: number, weightKg: number) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category = 'Underweight';

  if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
  } else if (bmi >= 30) {
    category = 'Obesity';
  }

  const minHealthy = 18.5 * heightM * heightM;
  const maxHealthy = 24.9 * heightM * heightM;

  return {
    bmi,
    category,
    healthyRange: [minHealthy, maxHealthy] as const,
  };
}

export function calculateTipBreakdown(billAmount: number, tipPercent: number, peopleCount: number) {
  const tipAmount = (billAmount * tipPercent) / 100;
  const total = billAmount + tipAmount;
  const perPerson = total / Math.max(peopleCount, 1);

  return {
    tipAmount,
    total,
    perPerson,
  };
}

export function calculateDiscount(originalPrice: number, discountPercent: number) {
  const savings = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - savings;

  return {
    finalPrice,
    savings,
  };
}

export function calculateLoan(loanAmount: number, annualInterestRate: number, loanTermYears: number) {
  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  if (monthlyRate === 0) {
    const monthlyPayment = loanAmount / numberOfPayments;

    return {
      monthlyPayment,
      totalInterest: 0,
      totalPayment: loanAmount,
    };
  }

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment,
    totalInterest,
    totalPayment,
  };
}

export function calculateAge(dateOfBirth: string, currentDate = new Date()) {
  const [year, month, day] = dateOfBirth.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    days += previousMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (nextBirthday < currentDate) {
    nextBirthday.setFullYear(currentDate.getFullYear() + 1);
  }

  const msUntilBirthday = nextBirthday.getTime() - currentDate.getTime();
  const daysUntilBirthday = Math.ceil(msUntilBirthday / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    nextBirthday,
    daysUntilBirthday,
  };
}
