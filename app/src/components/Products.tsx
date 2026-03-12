import { Product } from './Product';

DUMMYDATA = [];

export const Products = () => {
  return (
    <>
      {DUMMYDATA.map((data) => {
        <Product />;
      })}
    </>
  );
};
