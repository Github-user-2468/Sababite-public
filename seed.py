from database.connection import db
from app import app

def main():
    with app.app_context():
        db.drop_all()
        db.create_all()
if __name__ == "__main__":        
    main()
    