import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postComments, thunkEditComments, thunkDeleteCard } from "../../store/commentsReducer";

const CommentForm = ({ cardId, comments }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editCommentId) {
            await dispatch(thunkEditComments(editCommentId, { content: comment }));
            setEditCommentId(null);
        } else {
            await dispatch(postComments({ cardId, content: comment }));
        }

        setComment('');
    };

    const handleEdit = (commentId, commentContent) => {
        setComment(commentContent);
        setEditCommentId(commentId);
    };

    const handleDelete = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            await dispatch(thunkDeleteCard(commentId));
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    required
                />
                <button type="submit">{editCommentId ? 'Update Comment' : 'Post Comment'}</button>
            </form>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.content}
                            <button onClick={() => handleEdit(comment.id, comment.content)}>Edit</button>
                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default CommentForm;
