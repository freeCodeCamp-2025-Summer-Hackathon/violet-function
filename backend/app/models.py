from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(120), nullable=False)

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner = db.relationship('User', backref='owned_groups')

class GroupMembership(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    user = db.relationship('User', backref='group_memberships')
    group = db.relationship('Group', backref='memberships')

class GroupInvitation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    invited_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    inviter_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, accepted, declined
    join_token = db.Column(db.String(64), unique=True, nullable=True)
    group = db.relationship('Group', backref='invitations')
    invited_user = db.relationship('User', foreign_keys=[invited_user_id], backref='received_invitations')
    inviter = db.relationship('User', foreign_keys=[inviter_id], backref='sent_invitations')

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    group = db.relationship('Group', backref='messages')
    user = db.relationship('User', backref='messages')

class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # nullable for group watchlist
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=True)  # nullable for personal watchlist
    movie_id = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # 'personal' or 'group'

    user = db.relationship('User', backref='watchlist', foreign_keys=[user_id])
    group = db.relationship('Group', backref='watchlist', foreign_keys=[group_id])