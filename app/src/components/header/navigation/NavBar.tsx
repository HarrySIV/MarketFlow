import { LinkItem } from './LinkItem';

export const NavBar = () => {
  return (
    <div>
      <ul>
        <LinkItem path="/home" name="Home" />
        <LinkItem path="/profile" name="Profile" />
      </ul>
    </div>
  );
};
