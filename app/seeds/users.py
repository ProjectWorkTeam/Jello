from app.models.user import db, User, Board, List, Card, Label, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Lition',
        username='Demo1', email='demo@aa.io', hashed_password='password')
    
    marnie = User(
        first_name='Marnie', last_name='Smith',
        username='Marnie1', email='marnie@aa.io', hashed_password='password')

    bobbie = User(
        first_name='Bobbie', last_name='Johnson',
        username='Bobbie1', email='bobbie@aa.io', hashed_password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()


def seed_boards():
    board_1 = Board(
        name = "A Board", owner_id = 1
    )

    board_2 = Board(
        name = "Poop Board", owner_id = 2
    )

    board_3 = Board(
        name = "Jello Board", owner_id = 3
    )

    db.session.add(board_1)
    db.session.add(board_2)
    db.session.add(board_3)
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCARD;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()



def seed_lists():
    list_1 = List(
        name = "A List", board_id = 1
    )

    list_2 = List(
        name = "Poop List", board_id = 2
    )

    list_3 = List(
        name = "Jello List", board_id = 3
    )

    db.session.add(list_1)
    db.session.add(list_2)
    db.session.add(list_3)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDETNTIY CASCARD;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()


def seed_cards():
    card_1 = Card(
        title = "Please eat", text = "You better eat", list_id = 1
    )

    card_2 = Card(
        title = "Poopie", text = "poopie poopie", list_id = 2
    )

    card_3 = Card(
        title = "Jello", text = "more like hello", list_id = 3
    )


    db.session.add(card_1)
    db.session.add(card_2)
    db.session.add(card_3)
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDETNTIY CASCARD;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()

def seed_labels():
    label_1 = Label(
        name = "Un Labele", color_code = "231456"
    )
    label_2 = Label(
        name = "Poopie", color_code = "23232"
    )
    label_3 = Label(
        name = "Jello Label", color_code = "22333"
    )

    db.session.add(label_1)
    db.session.add(label_2)
    db.session.add(label_3)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.labels RESTART IDETNTIY CASCARD;")
    else:
        db.session.execute(text("DELETE FROM labels"))

    db.session.commit()
