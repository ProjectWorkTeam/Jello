import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { thunkAddBoard } from '../../store/boardsReducer';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import './boardModal.css';

const BoardModal = ({ closeModal }) => {
  const [boardName, setBoardName] = useState('');
  const [selectedImage, setSelectedImage] = useState(image1); // Set image1 as the default selected image

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

    const createdBoard = await dispatch(thunkAddBoard(newBoard)); // Dispatch the thunkAddBoard action with the new board details
    if (createdBoard) {
      closeModal();
      history.push(`/boards/${createdBoard.id}`); // Navigate to the new board's page
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
              src={image1}
              alt="background1"
              className={`modal-background-img ${selectedImage === image1 ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image1)}
            />
            <img
              src={image2}
              alt="background2"
              className={`modal-background-img ${selectedImage === image2 ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image2)}
            />
            <img
              src={image3}
              alt="background3"
              className={`modal-background-img ${selectedImage === image3 ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image3)}
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
