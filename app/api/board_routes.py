from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models.user import db, Board, List
from app.forms.forms import BoardForm


board_routes = Blueprint('boards', __name__)

@board_routes.route('', methods=["GET"])
@login_required
def get_boards():
    current_id = current_user.id

    boards = Board.query.filter(Board.owner_id == current_id).all()

    board_list = []
    for board in boards:
        board_data = {
            'id': board.id,
            'name': board.name,
            'owner_id': board.owner_id
        }
        board_list.append(board_data)

    return jsonify({'boards': board_list})

@board_routes.route('', methods=["POST"])
@login_required
def create_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_board = Board(
            name=data["name"],
            owner_id=current_user.id
        )
        db.session.add(new_board)
        db.session.commit()

        if not new_board.lists:
            list_names = ["List 1", "List 2", "List 3"]
            for name in list_names:
                new_list = List(
                    name=name,
                    board_id=new_board.id
                )
                new_board.lists.append(new_list)
            db.session.commit()

        return jsonify({'message': 'Board created successfully.'}), 200

    return "error bad"

@board_routes.route('/<int:board_id>', methods=["PUT"])
@login_required
def update_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return jsonify({'message': 'Board not found.'}), 404

    data = request.get_json()
    board.name = data.get('name', board.name)
    db.session.commit()

    return jsonify({'message': 'Board updated successfully.'}), 200

@board_routes.route('/<int:board_id>', methods=["DELETE"])
@login_required
def delete_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return jsonify({'message': 'Board not found.'}), 404

    db.session.delete(board)
    db.session.commit()
    return jsonify({'message': 'Board deleted successfully.'}), 200
