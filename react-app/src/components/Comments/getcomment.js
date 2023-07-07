// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CommentForm from './comment';
// import { thunkAllComments } from '../../store/commentsReducer';

// const CommentContainer = ({ cardId }) => {
//     const dispatch = useDispatch();
//     const comments = useSelector((state) => state.comments.cardComments);

//     useEffect(() => {
//         dispatch(thunkAllComments(cardId));
//     }, [cardId, dispatch]);

//     return <CommentForm cardId={cardId} comments={Object.values(comments)} />;
// };

// export default CommentContainer;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentForm from './comment';
import { thunkAllComments } from '../../store/commentsReducer';

const CommentContainer = ({ cardId }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments.cardComments);

    useEffect(() => {
        dispatch(thunkAllComments(cardId));
    }, [cardId, comments, dispatch]);

    return <CommentForm cardId={cardId} comments={Object.values(comments)} />;
};

export default CommentContainer;
