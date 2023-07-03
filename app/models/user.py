from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    # Relationships
    owned_boards = db.relationship('Board', back_populates='owner', cascade='all, delete-orphan')
    comments = db.relationship('CardComment', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    position_id = db.Column(db.Integer)

    # Relationships
    owner = db.relationship('User', back_populates='owned_boards', lazy=True)
    lists = db.relationship('List', back_populates='board', lazy=True)
    members = db.relationship('BoardMember', back_populates='board', lazy=True)

class BoardMember(db.Model):
    __tablename__ = 'board_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)


    # Relationships
    board = db.relationship('Board', back_populates='members', lazy=True)
    user = db.relationship('User', lazy=True)  # Removed back_populates


class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    position_id = db.Column(db.Integer)

    # Relationships
    board = db.relationship('Board', back_populates='lists', lazy=True)
    cards = db.relationship('Card', backref='list', lazy=True, cascade="all, delete")

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    text = db.Column(db.String, nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)
    position_id = db.Column(db.Integer)

    # Relationships
    list_ = db.relationship('List', back_populates='cards', lazy=True)
    comments = db.relationship('CardComment', back_populates='card', lazy=True, cascade="all, delete")
    labels = db.relationship('Label', secondary=add_prefix_for_prod('card_labels'), back_populates='cards', cascade="all, delete")

class CardComment(db.Model):
    __tablename__ = 'card_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    position_id = db.Column(db.Integer)

    # Relationships
    user = db.relationship('User', back_populates='comments', lazy=True, cascade="all, delete")
    card = db.relationship('Card', back_populates='comments', lazy=True, cascade="all, delete")

class Label(db.Model):
    __tablename__ = 'labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    color_code = db.Column(db.String(7), nullable=False, unique=True)
    position_id = db.Column(db.Integer)

    # Relationships
    cards = db.relationship('Card', secondary=add_prefix_for_prod('card_labels'), back_populates='labels', lazy=True, cascade="all, delete")

    # Rest of Label model...

class CardLabel(db.Model):
    __tablename__ = 'card_labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), nullable=False)
    label_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('labels.id')), nullable=False)
    position_id = db.Column(db.Integer)

    # No relationships defined here, as this is a linking table
