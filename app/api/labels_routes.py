from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models.user import Label, Card, CardLabel, db
from app.forms.forms import LabelForm

labels = Blueprint('labels', __name__)


@labels.route('/', methods=['POST'])
@login_required
def create_label():
    """
    Create a new label with color and name
    """
    form = LabelForm()
    if form.validate_on_submit():
        label = Label(
            name=form.data['name'],
            color_code=form.data['color_code']
        )
        db.session.add(label)
        db.session.commit()
        return jsonify({'message': 'Label created successfully.'}), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@labels.route('/<int:label_id>', methods=['GET'])
@login_required
def get_label(label_id):
    """
    Get a specific label by ID
    """
    label = Label.query.get(label_id)
    if not label:
        return jsonify({'message': 'Label not found.'}), 404
    return label.to_dict(), 200


@labels.route('/<int:label_id>', methods=['PUT'])
@login_required
def update_label(label_id):
    """
    Update a label (change its name and color, should be reflected on all cards that have the label)
    """
    label = Label.query.get(label_id)
    if not label:
        return jsonify({'message': 'Label not found.'}), 404

    form = LabelForm()
    if form.validate_on_submit():
        new_name = form.data['name']
        new_color_code = form.data['color_code']

        # Check if color code is changed
        if label.color_code != new_color_code:
            # Update the current label's color code
            label.color_code = new_color_code

            # Find all labels with the same color code
            matching_labels = Label.query.filter_by(color_code=new_color_code).all()

            # Update the color code for all matching labels
            for matching_label in matching_labels:
                matching_label.color_code = new_color_code

        # Update the name of the label
        label.name = new_name
        db.session.commit()

        return jsonify({'message': 'Label updated successfully.'}), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@labels.route('/<int:label_id>', methods=['DELETE'])
@login_required
def delete_label(label_id):
    """
    Delete a label by ID (removes the label from all cards)
    """
    label = Label.query.get(label_id)
    if not label:
        return jsonify({'message': 'Label not found.'}), 404

    # Remove label from all cards
    CardLabel.query.filter_by(label_id=label_id).delete()
    db.session.delete(label)
    db.session.commit()

    return jsonify({'message': 'Label deleted successfully.'}), 200


# CardLabels

@labels.route('/cards/<int:card_id>/labels', methods=['POST'])
@login_required
def attach_label_to_card(card_id):
    """
    Attach a label to a card
    """
    form = LabelForm()
    if form.validate_on_submit():
        card = Card.query.get(card_id)
        if not card:
            return jsonify({'message': 'Card not found.'}), 404

        label = Label(
            name=form.data['name'],
            color_code=form.data['color_code']
        )
        card_label = CardLabel(card=card, label=label)

        db.session.add_all([label, card_label])
        db.session.commit()

        return jsonify({'message': 'Label attached to the card successfully.'}), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@labels.route('/cards/<int:card_id>/labels', methods=['GET'])
@login_required
def get_labels_by_card(card_id):
    """
    Get all labels attached to a specific card
    """
    card = Card.query.get(card_id)
    if not card:
        return jsonify({'message': 'Card not found.'}), 404

    labels = [label.to_dict() for label in card.labels]
    return jsonify({'labels': labels}), 200


@labels.route('/cards/<int:card_id>/labels/<int:label_id>', methods=['DELETE'])
@login_required
def remove_label_from_card(card_id, label_id):
    """
    Remove a specific label from a card
    """
    card = Card.query.get(card_id)
    if not card:
        return jsonify({'message': 'Card not found.'}), 404

    label = Label.query.get(label_id)
    if not label:
        return jsonify({'message': 'Label not found.'}), 404

    card_label = CardLabel.query.filter_by(card_id=card.id, label_id=label.id).first()
    if not card_label:
        return jsonify({'message': 'Label is not attached to this card.'}), 404

    db.session.delete(card_label)
    db.session.commit()

    return jsonify({'message': 'Label removed from the card successfully.'}), 200
