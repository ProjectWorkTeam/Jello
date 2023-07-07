import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAllBoards } from '../../store/boardsReducer';
import { thunkBoardLists, thunkMakeList } from '../../store/listsReducer';
import { thunkCardList } from '../../store/cardsReducer';
import List from '../List/List';
import BoardModal from '../BoardModal/BoardModal';
import './Board.css';

function Board() {
  const dispatch = useDispatch();

  const boards = useSelector((state) => Object.values(state.boards.boards) || []);
  const { boardid } = useParams();

  const [board, setBoard] = useState();

  useEffect(() => {
    dispatch(thunkAllBoards());
  }, [dispatch]);

  useEffect(() => {
    const foundBoard = boards.find(b => b.id === parseInt(boardid, 10));
    setBoard(foundBoard);

    if (foundBoard && foundBoard.id) {
      console.log('\n', 'FoundBoard === True', foundBoard.id)
    }
  }, [boards, boardid]);

  useEffect(() => {
    if (board && board.id) {
      dispatch(thunkBoardLists(board.id));
    }
  }, [dispatch, board]);

  const lists = useSelector(state => state.lists.lists[parseInt(boardid, 10)] || []);

  console.log('\n', 'Singe_Board_board.js', board); // returning successfully
  console.log('\n', 'lists_board.js', lists); // returning empty

  return (
    <div>
      <h1>Testing Board</h1>
    </div>
  )
}
export default Board;
