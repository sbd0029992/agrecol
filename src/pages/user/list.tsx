import CardCashier from 'components/CardCashier';
import React from 'react';

//data cashier
const cashiers = [
  { id: 1, name: 'João' },
  { id: 2, name: 'Pepe' },
];

function List() {
  return (
    <div className='flex h-full min-h-[90vh] w-full items-center justify-center'>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {cashiers.map((cashier) => (
          <CardCashier key={cashier.id} name={cashier.name} />
        ))}
      </div>
    </div>
  );
}

export default List;
