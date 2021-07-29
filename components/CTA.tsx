import * as React from 'react';
import { API } from '../constants/API';

export interface ICTAProps {}

export const CTA: React.FunctionComponent<ICTAProps> = (props: React.PropsWithChildren<ICTAProps>) => {
  const [ total, setTotal ] = React.useState(0);

  React.useEffect(() => {
    const getTotal = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VISITOR_API}${API.total}`);
        const json = await response.json();
        setTotal(json);
      } catch (e) {
        setTotal(0);
      }
    }

    getTotal();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['']);

  return (
    <div className="bg-blue-400">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white">
          A simple visitor badge for your website
        </h1>
        {
          total > 0 && (
            <h2 className="text-2xl mt-4 font-extrabold text-white">
              Come and join <span className="text-yellow-500">{total}</span> others that are using this service
            </h2>
          )
        }
        <p className="mt-4 text-xl leading-6 text-gray-200">
          Want to show how many visitors your site/GitHub profiles gets? Quickly fill in the form on the page, and copy the Markdown or HTML code to the location you want to use it.
        </p>
      </div>
    </div>
  );
};