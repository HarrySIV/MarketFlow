import './Button.css';

type TButtonProps = {
  name: string;
  className?: string;
  onClick: (() => void) | (() => Promise<void>);
};

export const Button = (props: TButtonProps) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.name}
    </button>
  );
};
