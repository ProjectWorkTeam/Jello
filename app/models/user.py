from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

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

    # Relationships
    owner = db.relationship('User', backref='boards', lazy=True)
    lists = db.relationship('List', backref='board', lazy=True)
    members = db.relationship('BoardMember', backref='board', lazy=True)


class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)

    # Relationships
    board = db.relationship('Board', backref='lists', lazy=True)
    cards = db.relationship('Card', backref='list', lazy=True, cascade="all, delete")


class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    text = db.Column(db.String, nullable=True)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')), nullable=False)

    # Relationships
    list = db.relationship('List', backref='cards', lazy=True)
    comments = db.relationship('CardComment', backref='card', lazy=True, cascade="all, delete")
    labels = db.relationship('Label', secondary=add_prefix_for_prod('card_labels'), backref=db.backref('cards', lazy=True, cascade="all, delete"))


class CardComment(db.Model):
    __tablename__ = 'card_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    user = db.relationship('User', backref='comments', lazy=True, cascade="all, delete")


class BoardMember(db.Model):
    __tablename__ = 'board_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    user = db.relationship('User', backref='shares', lazy=True)


class Label(db.Model):
    __tablename__ = 'labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    color_code = db.Column(db.String(7), nullable=False, unique=True)

    def update_label_color(self, new_color):
        # Get all cards associated with this label
        cards = self.cards
        for card in cards:
            for label in card.labels:
                if label.color_code == self.color_code:
                    # Update the color of all labels with the same color as the current label
                    label.color_code = new_color
        self.color_code = new_color 

    def update_label_name (self, new_name):
         # Get all labels with the same color code
        labels = Label.query.filter_by(color_code=self.color_code).all()
        for label in labels:                
            label.name = new_name
        self.name = new_name

    def delete_label(self):
        # Get all cards associated with this label
        cards = self.cards
        for card in cards:
            card.labels.remove(self)


class CardLabel(db.Model):
    __tablename__ = 'card_labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cards.id')), nullable=False)
    label_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('labels.id')), nullable=False)


class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String, nullable=False)
