import { useMemo } from 'react';

export const useCalculations = (items = []) => {
  return useMemo(() => {
    let totalExcl = 0;
    let totalTax = 0;
    let totalIncl = 0;

    const calculatedItems = items.map(item => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      const taxRate = parseFloat(item.taxRate) || 0; // expected as fraction, e.g. 0.1 for 10%

      const exclAmount = quantity * price;
      const taxAmount = exclAmount * taxRate;
      const inclAmount = exclAmount + taxAmount;

      totalExcl += exclAmount;
      totalTax += taxAmount;
      totalIncl += inclAmount;

      return {
        ...item,
        exclAmount: parseFloat(exclAmount.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        inclAmount: parseFloat(inclAmount.toFixed(2))
      };
    });

    return {
      items: calculatedItems,
      totalExcl: parseFloat(totalExcl.toFixed(2)),
      totalTax: parseFloat(totalTax.toFixed(2)),
      totalIncl: parseFloat(totalIncl.toFixed(2))
    };
  }, [items]);
};
