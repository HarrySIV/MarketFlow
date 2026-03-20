import ReactDOM from 'react-dom';

import './Backdrop.css';

type TBackdrop = {
  onClick: () => void;
};

const Backdrop = (props: TBackdrop) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')!,
  );
};

export default Backdrop;
