import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkAddBoard } from '../../store/boardsReducer';
import image_1_icon from '../../assets/image_1_icon.jpg';
import image_2_icon from '../../assets/image_2_icon.jpg';
import image_3_icon from '../../assets/image_3_icon.jpg';
import './boardModal.css';

const BoardModal = ({ closeModal }) => {
  const [boardName, setBoardName] = useState('');
  const [selectedImage, setSelectedImage] = useState(image_1_icon);
  const [validationMessage, setValidationMessage] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleBoardNameChange = (e) => {
    const name = e.target.value;
    setBoardName(name);

    if (name.trim().length > 0 && name.trim().length < 15) {
      setValidationMessage('');
    }
  };

  const handleCreateBoard = async () => {
    if (boardName.trim().length === 0) {
      setValidationMessage('Name cannot be empty');
      return;
    } else if (boardName.trim().length >= 15) {
      setValidationMessage('Name should be less than 15 characters');
      return;
    }

    const newBoard = {
      name: boardName,
      image: selectedImage,
    };

    try {
      const createdBoard = await dispatch(thunkAddBoard(newBoard));

      if (createdBoard) {
        closeModal();
        history.push(`/board/${createdBoard.board.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="board-modal">
      <div className="board-modal-background" onClick={closeModal} />
      <div className="board-modal-content">
        <h2>Create a Board</h2>
        <div>
          {validationMessage && <p className="validation-message">{validationMessage}</p>}
          <input
            className="board-modal-input"
            type="text"
            placeholder="Enter board name"
            value={boardName}
            onChange={handleBoardNameChange}
          />
        </div>
        {/* <div>
          <h3>Choose a Background Image</h3>
          <div>
            <img
              src={image_1_icon}
              alt="background1"
              className={`modal-background-img ${selectedImage === image_1_icon ? 'selected' : ''
                }`}
              onClick={() => handleImageSelect(image_1_icon)}
            />
            <img
              src={image_2_icon}
              alt="background2"
              className={`modal-background-img ${selectedImage === image_2_icon ? 'selected' : ''
                }`}
              onClick={() => handleImageSelect(image_2_icon)}
            />
            <img
              src={image_3_icon}
              alt="background3"
              className={`modal-background-img ${selectedImage === image_3_icon ? 'selected' : ''
                }`}
              onClick={() => handleImageSelect(image_3_icon)}
            />
          </div>
        </div>
        <div>
          <h3>Selected Image Preview</h3>
          {selectedImage && (
            <img
              src={selectedImage}
              className="modal-background-img"
              alt="Selected background"
            />
          )}
        </div> */}
        <div className='board-modal-button-container'>
          <button onClick={handleCreateBoard} className='board-modal-button-create'>
            Create
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }} className='board-modal-button-cancel'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
