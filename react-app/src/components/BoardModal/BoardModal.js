import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import { thunkAddBoard } from '../../store/boardsReducer';
import './boardModal.css';

const BoardModal = ({ closeModal }) => {
    const [boardName, setBoardName] = useState('');
    const [selectedImage, setSelectedImage] = useState(image1);

    const dispatch = useDispatch();

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleBoardNameChange = (e) => {
        setBoardName(e.target.value);
    };

    const handleCreateBoard = () => {
        if (boardName.trim() === '' || selectedImage === '') {
            // Handle error case
            return;
        }

        const newBoard = {
            name: boardName,
            image: selectedImage,
        };

        dispatch(thunkAddBoard(newBoard)); // Dispatch the thunkAddBoard action with the new board details

        closeModal();
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
                            alt="Image 1"
                            className="background-img"
                            onClick={() => handleImageSelect(image1)}
                        />
                        <img
                            src={image2}
                            alt="Image 2"
                            className="background-img"
                            onClick={() => handleImageSelect(image2)}
                        />
                        <img
                            src={image3}
                            alt="Image 3"
                            className="background-img"
                            onClick={() => handleImageSelect(image3)}
                        />
                    </div>
                </div>
                <div>
                    <h3>Selected Image Preview</h3>
                    {selectedImage && (
                        <img src={selectedImage} className="background-img" alt="Selected Image" />
                    )}
                </div>
                <div>
                    <button onClick={handleCreateBoard}>Create</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default BoardModal;
