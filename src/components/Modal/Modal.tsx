import './styles/Modal.css';

import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerTitle?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  headerTitle = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 200);
  };
  return (
    <>
      {isOpen && (
        <div className={`modal-wrapper${isOpen ? ' modal-wrapper--open' : ''}`}>
          <div className='modal-backdrop' />
          <div className={`modal-box${isAnimating ? '' : ' modal-box--open'}`}>
            <div className='modal-header'>
              <h3 className='modal-header-title'>{headerTitle}</h3>
              <button className='modal-close' onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className='modal-body'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
