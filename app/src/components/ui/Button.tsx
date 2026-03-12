type TButtonProps = {
  name: string;
  className?: string;
  onClick: (() => void) | (() => Promise<void>);
};

export const Button = (props: TButtonProps) => {
  return (
    <button className={props.className + 'button'} onClick={props.onClick}>
      {props.name}
    </button>
  );
};
