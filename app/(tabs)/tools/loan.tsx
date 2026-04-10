import { AppHeader } from '@/components/ui/AppHeader';
import { AppScreen } from '@/components/ui/AppScreen';
import { EmptyState } from '@/components/ui/EmptyState';

export default function LoanCalculatorPlaceholder() {
  return (
    <AppScreen contentClassName="pb-32">
      <AppHeader showBack title="Loan Calculator" subtitle="Monthly payment logic lands after the lighter calculators." />
      <EmptyState
        icon="calculator"
        title="Loan calculator is reserved"
        description="Loan amount, interest rate, term, total interest, and total payment will be implemented here."
      />
    </AppScreen>
  );
}
