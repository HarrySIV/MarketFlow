import { NavLink } from 'react-router-dom';

type TNavBarProps = {
  path: string;
  name: string;
};

export const LinkItem = (props: TNavBarProps) => {
  return (
    <li>
      <NavLink to={props.path}>{props.name}</NavLink>
    </li>
  );
};
