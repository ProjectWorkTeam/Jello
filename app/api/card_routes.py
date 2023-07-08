from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models.user import Card, List, CardComment
from app.forms.forms import CardForm, CardCommentForm
from app import db
from .auth_routes import validation_errors_to_error_messages
from app.utils import generate_error_response, generate_success_response, create_default_lists

cards = Blueprint('cards', __name__)

# Get cards by list
@cards.route('/list/<int:list_id>', methods=['GET'])
@login_required
def get_cards_for_list(list_id):
    list_ = List.query.get(list_id)
    if not list_:
        return generate_error_response("List not found", 404)
    cards = Card.query.filter_by(list_id=list_id).all()
    return generate_success_response([card.to_dict() for card in cards])

# Get card details
@cards.route('/<int:card_id>', methods=['GET'])
@login_required
def get_card(card_id):
    card = Card.query.get(card_id)
    if not card:
        return generate_error_response("Card not found", 404)
    return generate_success_response(card.to_dict())

# Create card
@cards.route('/', methods=['POST'])
@login_required
def create_card():
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list_id = form.data['list_id']
        max_position = db.session.query(db.func.max(Card.position_id)).filter_by(list_id=list_id).scalar()
        card = Card(
            title=form.data['title'],
            text=form.data.get('description'),
            list_id=list_id,
            position_id=(max_position + 1 if max_position else 1)
        )
        db.session.add(card)
        db.session.commit()
        return generate_success_response(card.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Update card details
@cards.route('/<int:card_id>', methods=['PUT'])
@login_required
def update_card(card_id):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        card = Card.query.get(card_id)
        if not card:
            return generate_error_response("Card not found", 404)
        card.title = form.data['title']
        card.text = form.data.get('description')
        db.session.commit()
        return generate_success_response(card.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a card
@cards.route('/<int:card_id>', methods=['DELETE'])
@login_required
def delete_card(card_id):
    card = Card.query.get(card_id)
    if not card:
        return generate_error_response("Card not found", 404)
    db.session.delete(card)
    list_id = card.list_id
    position_id = card.position_id
    cards_above = Card.query.filter(Card.list_id == list_id, Card.position_id > position_id).all()
    for card_above in cards_above:
        card_above.position_id -= 1
    db.session.commit()
    return generate_success_response({"message": "Card deleted successfully"})

@cards.route('/<int:card_id>/position', methods=["PUT"])
@login_required
def update_card_position(card_id):
    card = Card.query.get(card_id)

    if not card:
        return generate_error_response("Card not found.", 404)

    data = request.get_json()

    new_list_id = data.get('new_list_id')
    new_position_id = data.get('new_position_id')

    if new_list_id is None or new_position_id is None:
        return generate_error_response("Both list_id and position_id must be provided.", 400)

    old_list_id = card.list_id
    old_position_id = card.position_id

    # If card is moved to a new list
    if old_list_id != new_list_id:
        # Shift positions of other cards in the old list to fill the gap left by the card
        old_list_cards_to_update = Card.query.filter(Card.list_id == old_list_id, Card.position_id > old_position_id).all()
        for c in old_list_cards_to_update:
            c.position_id -= 1

        # Shift positions of other cards in the new list to make room for the new card
        new_list_cards_to_update = Card.query.filter(Card.list_id == new_list_id, Card.position_id >= new_position_id).all()
        for c in new_list_cards_to_update:
            c.position_id += 1

    # If card is moved within the same list
    else:
        # Shift positions of other cards if necessary
        if new_position_id > old_position_id:
            cards_to_update = Card.query.filter(Card.list_id == old_list_id, Card.position_id > old_position_id, Card.position_id <= new_position_id).all()
            for c in cards_to_update:
                c.position_id -= 1
        elif new_position_id < old_position_id:
            cards_to_update = Card.query.filter(Card.list_id == old_list_id, Card.position_id >= new_position_id, Card.position_id < old_position_id).all()
            for c in cards_to_update:
                c.position_id += 1

    db.session.commit()

    # Update card's list and position after all other updates are committed
    card.list_id = new_list_id
    card.position_id = new_position_id

    db.session.commit()

    return generate_success_response({'message': 'Card updated successfully.'})
