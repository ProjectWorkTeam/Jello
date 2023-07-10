# List routes
from flask import Blueprint, request
from flask_login import login_required
from app.models.user import List, Board, db
from app.utils import generate_error_response, generate_success_response

lists = Blueprint('lists', __name__)


# Get All Lists by Board Id
@lists.route('/board/<int:board_id>', methods=['GET'])
@login_required
def get_lists_by_board(board_id):
    lists = List.query.filter_by(board_id=board_id).all()
    if not lists:
        return generate_error_response('No lists found', 404)
    return generate_success_response({'lists': [list.to_dict() for list in lists]})

# Create New List
@lists.route('/', methods=['POST'])
@login_required
def create_list():
    body = request.json
    name = body.get('list_name')
    board_id = body.get('board_id')

    if not board_id:
        return generate_error_response('Board not found', 404)

    # Count the current lists and assign new position
    current_lists = List.query.filter_by(board_id=board_id).count()
    position_id = current_lists + 1

    new_list = List(name=name, board_id=board_id, position_id=position_id)
    db.session.add(new_list)
    db.session.commit()

    return generate_success_response({'list': new_list.to_dict()})

# Update list name
@lists.route('/<int:list_id>', methods=['PUT'])
@login_required
def update_list(list_id):
    body = request.json
    list = List.query.get(list_id)
    if not list:
        return generate_error_response('List not found', 404)
    list.name = body.get('list_name', list.name)
    db.session.commit()
    return generate_success_response(list.to_dict())

# Delete a list
@lists.route('/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(list_id):
    list = List.query.get(list_id)
    if not list:
        return generate_error_response('List not found', 404)

    # Get the board_id and position_id of the deleted list
    board_id = list.board_id
    deleted_position = list.position_id

    db.session.delete(list)
    db.session.commit()

    # Find lists that have a higher position_id than the deleted list
    higher_position_lists = List.query.filter(List.board_id == board_id, List.position_id > deleted_position).all()

    # Decrement their position_id by 1
    for higher_position_list in higher_position_lists:
        higher_position_list.position_id -= 1

    db.session.commit()

    return generate_success_response({"message": "List deleted successfully"})


# Update a list position
@lists.route('/<int:list_id>/position', methods=['PUT'])
@login_required
def update_list_position(list_id):
    body = request.json
    new_position = body.get('position_id')
    list = List.query.get(list_id)

    if not list:
        return generate_error_response('List not found', 404)

    # Get the current position of the list
    current_position = list.position_id
    board_id = list.board_id

    # Only proceed if the new_position is different from current_position
    if new_position != current_position:
        # If the new_position is lower than the current_position, increment the position_id of the lists between the new_position and current_position
        if new_position < current_position:
            lists_to_shift = List.query.filter(List.board_id == board_id, List.position_id >= new_position, List.position_id < current_position).all()
            for l in lists_to_shift:
                l.position_id += 1
        # If the new_position is higher than the current_position, decrement the position_id of the lists between the current_position and new_position
        else:
            lists_to_shift = List.query.filter(List.board_id == board_id, List.position_id > current_position, List.position_id <= new_position).all()
            for l in lists_to_shift:
                l.position_id -= 1

        # Finally set the new_position of the moved list
        list.position_id = new_position
        db.session.commit()

    return generate_success_response(list.to_dict())
