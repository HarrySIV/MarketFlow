import { NavBar } from './navigation/NavBar';
import { Title } from './Title';

export const Header = () => {
  return (
    <div className="header">
      <Title />
      <NavBar />
    </div>
  );
};
