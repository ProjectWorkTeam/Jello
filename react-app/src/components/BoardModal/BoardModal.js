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
  const [selectedImage, setSelectedImage] = useState(image_1_icon); // Set image1 as the default selected image

  const dispatch = useDispatch();
  const history = useHistory(); // Hook to manage navigation

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleBoardNameChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleCreateBoard = async () => {
    if (boardName.trim() === '' || selectedImage === '') {
      // Handle error case
      return;
    }

    const newBoard = {
      name: boardName,
      image: selectedImage,
    };

    try {
      const createdBoard = await dispatch(thunkAddBoard(newBoard));
      console.log('\n','Created Board BoardModal.js',createdBoard);

      if (createdBoard) {
        closeModal();
        history.push(`/boards/${createdBoard.board.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">
        <h2>Create a Board</h2>
        <div>
          <input
            type="text"
            placeholder="Enter board name"
            value={boardName}
            onChange={handleBoardNameChange}
          />
        </div>
        <div>
          <h3>Choose a Background Image</h3>
          <div>
            <img
              src={image_1_icon}
              alt="background1"
              className={`modal-background-img ${selectedImage === image_1_icon ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image_1_icon)}
            />
            <img
              src={image_2_icon}
              alt="background2"
              className={`modal-background-img ${selectedImage === image_2_icon ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image_2_icon)}
            />
            <img
              src={image_3_icon}
              alt="background3"
              className={`modal-background-img ${selectedImage === image_3_icon ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image_3_icon)}
            />
          </div>
        </div>
        <div>
          <h3>Selected Image Preview</h3>
          {selectedImage && (
            <img src={selectedImage} className="modal-background-img" alt="Selected background" />
          )}
        </div>
        <div>
          <button onClick={handleCreateBoard}>Create</button>
          <button onClick={(e) => {
            e.stopPropagation(); // Stop event propagation immediately
            closeModal();
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
