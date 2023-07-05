from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models.user import db, Board, List
from app.forms.forms import BoardForm
from app.utils import generate_error_response, generate_success_response, create_default_lists
from sqlalchemy import asc

board_routes = Blueprint('boards', __name__)

# GET all boards owned by user
@board_routes.route('', methods=["GET"])
@login_required
def get_boards():
    boards = Board.query.filter_by(owner_id=current_user.id).order_by(asc(Board.position_id)).all()
    boards_data = [{'id': board.id, 'name': board.name, 'owner_id': board.owner_id, 'position_id': board.position_id} for board in boards]
    return generate_success_response({'boards': boards_data})

# Create new board
@board_routes.route('', methods=["POST"])
@login_required
def create_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        highest_position_id_board = Board.query.filter_by(owner_id=current_user.id).order_by(Board.position_id.desc()).first()
        next_position_id = highest_position_id_board.position_id + 1 if highest_position_id_board else 1

        new_board = Board(name=form.data["name"], owner_id=current_user.id, position_id=next_position_id)
        db.session.add(new_board)
        db.session.commit()

        if not new_board.lists:
            create_default_lists(new_board, db)

        updated_board = Board.query.get(new_board.id)
        return generate_success_response({
            'message': 'Board created successfully.',
            'board': updated_board.to_dict()
        })

    return generate_error_response("Invalid form submission.", 400)


# Update a board's name
@board_routes.route('/<int:board_id>', methods=["PUT"])
@login_required
def update_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return generate_error_response("Board not found.", 404)

    if board.owner_id != current_user.id:
        return generate_error_response("Unauthorized to update this board.", 403)

    data = request.get_json()
    board.name = data.get('name', board.name)
    db.session.commit()

    return generate_success_response({'message': 'Board updated successfully.'})

# Delete a board
@board_routes.route('/<int:board_id>', methods=["DELETE"])
@login_required
def delete_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return generate_error_response("Board not found.", 404)

    if board.owner_id != current_user.id:
        return generate_error_response("Unauthorized to delete this board.", 403)

    boards_to_update = Board.query.filter(Board.position_id > board.position_id).all()
    for b in boards_to_update:
        b.position_id -= 1
    db.session.commit()

    db.session.delete(board)
    db.session.commit()

    return generate_success_response({'message': 'Board deleted successfully.'})

# Update board position
@board_routes.route('/<int:board_id>/position', methods=['PUT'])
@login_required
def update_board_position(board_id):
    body = request.json
    new_position = body.get('position_id')
    board = Board.query.get(board_id)

    if not board:
        return generate_error_response('Board not found', 404)

    # Get the current position of the board
    current_position = board.position_id

    if new_position != current_position:
        # Find the board which is currently at the new position
        swapped_board = Board.query.filter_by(owner_id=current_user.id, position_id=new_position).first()

        if swapped_board:
            # Swap positions of the two boards
            swapped_board.position_id = current_position
            board.position_id = new_position
            db.session.commit()

    return generate_success_response(board.to_dict())
