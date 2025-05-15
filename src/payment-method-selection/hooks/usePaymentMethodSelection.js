import { useAtom } from 'jotai';
import { selectedPaymentMethodAtom, paymentDetailsAtom } from '../store/paymentMethodSelection.atoms';

export function usePaymentMethodSelection() {
  const [selected, setSelected] = useAtom(selectedPaymentMethodAtom);
  const [details, setDetails] = useAtom(paymentDetailsAtom);

  return {
    selected,
    setSelected,
    details,
    setDetails
  };
}
