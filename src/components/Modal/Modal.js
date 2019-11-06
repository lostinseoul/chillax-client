import React, { useRef, useEffect } from 'react';
import './Modal.scss';

const Modal = props => {
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = e => {
    if (modalMain.current.contains(e.target)) {
      return;
    }
    props.handleClose();
  };

  const modalMain = useRef(null);

  const showHideClassName = props.show
    ? 'modal display-block'
    : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main' ref={modalMain}>
        {props.children}
      </section>
    </div>
  );
};

export default Modal;
