from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class BoardForm(FlaskForm):
    """
    Form for creating a new board
    """
    name = StringField('name', validators=[DataRequired(), Length(max=255)])

class ListForm(FlaskForm):
    """
    Form for creating a new list
    """
    name = StringField('name', validators=[DataRequired(), Length(max=255)])
    board_id = IntegerField('board_id', validators=[DataRequired()])


class CardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    list_id = IntegerField('list_id', validators=[DataRequired()])

class CardCommentForm(FlaskForm):
    """
    Form for creating a new card comment
    """
    content = StringField('content', validators=[DataRequired()])
    card_id = IntegerField('card_id', validators=[DataRequired()])

class LabelForm(FlaskForm):
    """
    Form for creating a new label
    """
    name = StringField('name', validators=[DataRequired(), Length(max=255)])
    color_code = StringField('color_code', validators=[DataRequired(), Length(max=7)])
