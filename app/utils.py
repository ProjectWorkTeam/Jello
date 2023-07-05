# app/utils.py

from flask import jsonify
from app.models.user import List


def generate_error_response(message, status_code):
    return jsonify({'error': message}), status_code

def generate_success_response(data):
    return jsonify(data), 200

def create_default_lists(board, db):
    default_lists = ['To Do', 'In Progress', 'Completed']
    position = 1
    for name in default_lists:
        new_list = List(name=name, board_id=board.id, position_id=position)
        db.session.add(new_list)
        position += 1
    db.session.commit()

