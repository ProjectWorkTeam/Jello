from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .models import db, Card, List, CardComment

cards = Blueprint('cards', __name__)

# Card Endpoints

@cards.route('/', methods=['POST'])
@login_required
def create_card():
    data = request.get_json()
    list_id = data.get('ListID')
    card_title = data.get('CardTitle')
    card_text = data.get('CardText')
    
    if not list_id or not card_title or not card_text:
        return {'message': 'ListID, CardTitle, and CardText are required'}, 400
    
    list_ = List.query.get(list_id)
    if not list_:
        return {'message': 'List not found'}, 404
    
    card = Card(title=card_title, text=card_text, list_id=list_id)
    db.session.add(card)
    db.session.commit()
    return {'card': card.to_dict()}, 201

@cards.route('/<int:card_id>', methods=['GET'])
@login_required
def get_card(card_id):
    card = Card.query.get(card_id)
    if not card:
        return {'message': 'Card not found'}, 404
    return {'card': card.to_dict()}, 200

@cards.route('/<int:card_id>', methods=['PUT'])
@login_required
def update_card(card_id):
    data = request.get_json()
    card = Card.query.get(card_id)
    if not card:
        return {'message': 'Card not found'}, 404
    card.title = data.get('CardTitle', card.title)
    card.text = data.get('CardText', card.text)
    db.session.commit()
    return {'card': card.to_dict()}, 200

@cards.route('/<int:card_id>', methods=['DELETE'])
@login_required
def delete_card(card_id):
    card = Card.query.get(card_id)
    if not card:
        return {'message': 'Card not found'}, 404
    db.session.delete(card)
    db.session.commit()
    return {'message': 'Card deleted successfully'}, 200

@cards.route('/list/<int:list_id>', methods=['GET'])
@login_required
def get_cards_for_list(list_id):
    cards = Card.query.filter_by(list_id=list_id).all()
    if len(cards) == 0:
        return {'message': 'No cards found'}, 404
    return {'cards': [card.to_dict() for card in cards]}, 200

# Card Comments Endpoints

@cards.route('/cardComments', methods=['POST'])
@login_required
def create_comment():
    data = request.get_json()
    card_id = data.get('CardID')
    content = data.get('Content')
    if not card_id or not content:
        return {'message': 'CardID and Content are required'}, 400
    card = Card.query.get(card_id)
    if not card:
        return {'message': 'Card not found'}, 404
    comment = CardComment(content=content, card_id=card_id, user_id=current_user.id)
    db.session.add(comment)
    db.session.commit()
    return {'comment': comment.to_dict()}, 201

@cards.route('/cardComments/<int:card_id>', methods=['GET'])
@login_required
def get_comments_for_card(card_id):
    comments = CardComment.query.filter_by(card_id=card_id).all()
    if len(comments) == 0:
        return {'message': 'No comments found'}, 404
    return {'comments': [comment.to_dict() for comment in comments]}, 200

@cards.route('/cardComments/<int:comment_id>', methods=['GET'])
@login_required
def get_comment(comment_id):
    comment = CardComment.query.get(comment_id)
    if not comment:
        return {'message': 'Comment not found'}, 404
    return {'comment': comment.to_dict()}, 200

@cards.route('/cardComments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    data = request.get_json()
    comment = CardComment.query.get(comment_id)
    if not comment or comment.user_id != current_user.id:
        return {'message': 'Comment not found or Unauthorized'}, 404
    comment.content = data.get('Content', comment.content)
    db.session.commit()
    return {'comment': comment.to_dict()}, 200

@cards.route('/cardComments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = CardComment.query.get(comment_id)
    if not comment or comment.user_id != current_user.id:
        return {'message': 'Comment not found or Unauthorized'}, 404
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment deleted successfully'}, 200
