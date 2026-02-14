from database.connection import db
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import String, Integer, Text, ForeignKey, DateTime, LargeBinary
from sqlalchemy.orm import relationship
from flask_login import UserMixin
from datetime import timedelta
import secrets


class ManualUser(db.Model, UserMixin):
    __tablename__ = "manual_users"
    
    manual_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(128), nullable=True)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    reset_token: Mapped[str] = mapped_column(String(36), nullable=True, unique=True)
    reset_token_expires: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    
    saved_recipes = relationship("SavedRecipe", back_populates="manual_user", cascade="all, delete-orphan")

    api_token: Mapped[str] = mapped_column(String(64), nullable=True, unique=True)
    api_token_expires: Mapped[datetime] = mapped_column(DateTime, nullable=True)

    
    def __repr__(self):
        return f'<User {self.manual_id} {self.email}>'
    
    def get_id(self):
        return f"manual_{self.manual_id}"

class Oauth_User(db.Model, UserMixin):
    __tablename__ = "oauth_users"
    
    user_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    oauth_id: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(255))
    picture_url: Mapped[str] = mapped_column(String(512), nullable=True)
    
    saved_recipes = relationship("SavedRecipe", back_populates="oauth_user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f'<User {self.user_id} {self.email}>'
    
    def get_id(self):
        return f"oauth_{self.user_id}"
    
class SavedRecipe(db.Model):
    __tablename__ = "saved_recipes"
    
    saved_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    recipe_id: Mapped[str] = mapped_column(String(255), nullable=False)
    
    title: Mapped[str] = mapped_column(String(400), nullable=False)
    image: Mapped[str] = mapped_column(Text, nullable=True)
    link: Mapped[str] = mapped_column(Text, nullable=True)
    calories: Mapped[int] = mapped_column(Integer, nullable=True)
    servings: Mapped[int] = mapped_column(Integer, nullable=True)
    cook_time: Mapped[str] = mapped_column(String(50), nullable=True)
    summary: Mapped[str] = mapped_column(Text, nullable=True)
    date_saved: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
    
    
    image_blob: Mapped[bytes] = mapped_column(LargeBinary, nullable=True)
    image_mime: Mapped[str] = mapped_column(String(64), nullable=True)

    manual_user = relationship("ManualUser", back_populates="saved_recipes")
    oauth_user = relationship("Oauth_User", back_populates="saved_recipes")
    
    manual_id: Mapped[int] = mapped_column(ForeignKey("manual_users.manual_id"), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("oauth_users.user_id"), nullable=True)
    
    def __repr__(self):
        return f"<Saved recipe {self.title}>"

class ApiToken(db.Model):
    __tablename__ = "api_tokens"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    token: Mapped[str] = mapped_column(String(128), nullable=False, unique=True, index=True)

    # Either manual OR oauth will be set
    manual_id: Mapped[int] = mapped_column(ForeignKey("manual_users.manual_id"), nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("oauth_users.user_id"), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc)
    )
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    @staticmethod
    def mint_for_manual(manual_id: int, days: int = 30) -> "ApiToken":
        return ApiToken(
            token=secrets.token_hex(32),
            manual_id=manual_id,
            expires_at=datetime.now(timezone.utc) + timedelta(days=days),
        )

    @staticmethod
    def mint_for_oauth(user_id: int, days: int = 30) -> "ApiToken":
        return ApiToken(
            token=secrets.token_hex(32),
            user_id=user_id,
            expires_at=datetime.now(timezone.utc) + timedelta(days=days),
        )

