const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Confirm Deletion</h3>
        <p>{message}</p>
        <div className='modal-buttons'>
          <button className='cancel-btn osrs-button' onClick={onCancel}>Cancel</button>
          <button className='confirm-btn delete-button' onClick={onConfirm}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;