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

    demo1 = User(first_name='dFirst', last_name='dLast', username='dUsername', email='demo@lit.com', password='demopass')

    db.session.add_all([demo, marnie, bobbie, demo1])
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
        name = "P Board", owner_id = 2
    )

    board_3 = Board(
        name = "Jello Board", owner_id = 3
    )

    demo1_board = Board(name="DemoBoard", owner_id=3)

    db.session.add_all([board_1, board_2, board_3, demo1_board])
    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()



def seed_lists():
    list_1 = List(
        name = "A List", board_id = 1
    )

    list_2 = List(
        name = "P List", board_id = 2
    )

    list_3 = List(
        name = "Jello List", board_id = 3
    )
    # Added new lists "To Do", "In Progress", and "Completed" for "DemoBoard"
    demo1_board_list1 = List(name="To Do", board_id=4)
    demo1_board_list2 = List(name="In Progress", board_id=4)
    demo1_board_list3 = List(name="Completed", board_id=4)

    db.session.add_all([list_1, list_2, list_3, demo1_board_list1, demo1_board_list2, demo1_board_list3])
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDETNTIY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()


def seed_cards():
    card_1 = Card(
        title = "Please eat", text = "You better eat", list_id = 1
    )

    card_2 = Card(
        title = "Poe", text = "poe poe", list_id = 2
    )

    card_3 = Card(
        title = "Jello", text = "more like hello", list_id = 3
    )

    # Added new cards for lists of "DemoBoard"
    demo1_board_card1 = Card(title="Task 1", text="Sample task 1", list_id=4)
    demo1_board_card2 = Card(title="Task 2", text="Sample task 2", list_id=5)
    demo1_board_card3 = Card(title="Task 3", text="Sample task 3", list_id=6)

    db.session.add_all([card_1, card_2, card_3, demo1_board_card1, demo1_board_card2, demo1_board_card3])
    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDETNTIY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()

def seed_labels():
    label_1 = Label(
        name = "Un Labele", color_code = "00FF00"
    )
    label_2 = Label(
        name = "Poe", color_code = "00FF00"
    )
    label_3 = Label(
        name = "Jello Label", color_code = "00FF00"
    )

    db.session.add(label_1)
    db.session.add(label_2)
    db.session.add(label_3)
    db.session.commit()

def undo_labels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.labels RESTART IDETNTIY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM labels"))

    db.session.commit()
