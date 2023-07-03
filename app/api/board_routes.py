from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Board, List
from app.forms import BoardForm

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


