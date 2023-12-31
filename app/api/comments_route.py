from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models.user import Card, List, CardComment
from app.forms.forms import CardForm, CardCommentForm
from app import db
from .auth_routes import validation_errors_to_error_messages

cards = Blueprint('cards', __name__)

# Card Comments
@cards.route('/cardComments', methods=['POST'])
@login_required
def create_comment():
    """
    Creates a new comment
    """
    form = CardCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = CardComment(
            content=form.data['content'],
            card_id=form.data['card_id'],
            user_id=current_user.id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@cards.route('/cardComments/<int:card_id>', methods=['GET'])
@login_required
def get_comments_by_card(card_id):
    """
    Gets all comments for a card
    """
    comments = CardComment.query.filter_by(card_id=card_id).all()
    if comments:
        return jsonify([comment.to_dict() for comment in comments]), 200
    else:
        return jsonify({"message": "No comments found"}), 404


@cards.route('/cardComments/<int:comment_id>', methods=['GET'])
@login_required
def get_comment(comment_id):
    """
    Get a specific comment
    """
    comment = CardComment.query.get(comment_id)
    if comment:
        return comment.to_dict(), 200
    else:
        return jsonify({"message": "Comment not found"}), 404


@cards.route('/cardComments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    """
    Update a specific comment
    """
    form = CardCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = CardComment.query.get(comment_id)
        if comment and comment.user_id == current_user.id:
            comment.content = form.data['content']
            db.session.commit()
            return comment.to_dict(), 200
        else:
            return jsonify({"message": "Comment not found or unauthorized"}), 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@cards.route('/cardComments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    Delete a specific comment
    """
    comment = CardComment.query.get(comment_id)
    if comment and comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": "Comment deleted"}), 200
    else:
        return jsonify({"message": "Comment not found or unauthorized"}), 404
