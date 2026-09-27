import { createPortal } from 'react-dom';
import './Modal.css';

// Day 20: React Portal - Modal

function Modal({ children, onClose }) {
  return createPortal(
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-container' onClick={(event) => event.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default Modal;
