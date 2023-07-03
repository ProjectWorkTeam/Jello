from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models.user import List, Board, db



lists = Blueprint('lists', __name__)

#New List
@lists.route('/', methods=['POST'])
@login_required
def create_list():
    body = request.json
    list_name = body.get('ListName')
    board_id = body.get('BoardID')

    #Check if board exists
    board = Board.query.get(board_id)
    if not board:
        return jsonify({'message': 'Board not found'}), 404

    #New List
    new_list = List(ListName=list_name, BoardID=board_id)
    db.session.add(new_list)
    db.session.commit()

    return jsonify({'list': new_list.to_dict()}), 201

#Get All Lists by Board Id
@lists.route('/<int:board_id>', methods=['GET'])
@login_required
def get_list(board_id):
    lists = List.query.filter_by(board_id=board_id).all()
    if not lists:
        return jsonify({'message': "No lists found"}), 404
    return jsonify({'lists': [list.to_dict() for list in lists]}), 200

#Edit a list
@lists.route('/<int:list_id>', methods=['PUT'])
@login_required
def update_list(list_id):
    body = request.json
    list = List.query.get(list_id)
    if not list:
        return jsonify({"message": "List not found"}), 404
    list.ListName = body.get('ListName', list.ListName)
    db.session.commit()
    return jsonify(list.to_dict()), 200

#Delete a list
@lists.route('/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(list_id):
    list = List.query.get(list_id)
    if not list:
        return jsonify({"message": "List not found"}), 404
    db.session.delete(list)
    db.session.commit()
    return jsonify({"message": "List deleted successfully"}), 200
