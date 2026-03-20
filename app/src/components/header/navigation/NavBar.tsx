import { LinkItem } from './LinkItem';

export const NavBar = () => {
  return (
    <div>
      <ul>
        <LinkItem path="/" name="Home" />
        <LinkItem path="/profile" name="Profile" />
      </ul>
    </div>
  );
};
