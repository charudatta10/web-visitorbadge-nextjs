import * as React from 'react';

export interface IStatisticProps {
  title: string;
  total: number;
}

export const Statistic: React.FunctionComponent<IStatisticProps> = ({title, total}: React.PropsWithChildren<IStatisticProps>) => {
  return (
    <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{total}</dd>
    </div>
  );
};