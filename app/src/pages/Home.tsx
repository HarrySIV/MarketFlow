import { Product } from '../components/Product';

export function Home() {
  return (
    <>
      <div className="bg">
        <h1>Home!!</h1>
        <div>
          <Product />
        </div>
      </div>
    </>
  );
}
