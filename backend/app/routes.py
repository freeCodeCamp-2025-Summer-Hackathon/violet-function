from flask import Blueprint, request, jsonify
from .models import User, Group, GroupMembership, GroupInvitation, Message
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_socketio import emit, join_room
from flask import current_app as app
from flask_socketio import SocketIO
import secrets

import os
import requests
from dotenv import load_dotenv

load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

main = Blueprint('main', __name__)
# REMOVE: socketio = SocketIO(app, cors_allowed_origins="*")
# Instead, import socketio from run.py if needed, or use current_app

@main.route('/')
def home():
    return "SceneSwap backend is alive"

@main.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not all(k in data for k in ('name', 'username', 'email', 'password')):
        return jsonify({'error': 'Missing fields'}), 400
    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'User already exists'}), 400
    password_hash = generate_password_hash(data['password'])
    new_user = User(name=data['name'], username=data['username'], email=data['email'], password_hash=password_hash)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'user created', 'name': new_user.name, 'username': new_user.username, 'email': new_user.email})

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if user and check_password_hash(user.password_hash, data.get('password')):
        return jsonify({'message': 'login successful', 'name': user.name, 'username': user.username, 'email': user.email})
    return jsonify({'error': 'Invalid username or password'}), 401

@main.route('/groups', methods=['POST'])
def create_group():
    data = request.get_json()
    owner = User.query.filter_by(username=data.get('username')).first()
    if not owner:
        return jsonify({'error': 'User not found'}), 404
    group = Group(name=data['name'], owner=owner)
    db.session.add(group)
    db.session.commit()
    membership = GroupMembership(user_id=owner.id, group_id=group.id)
    db.session.add(membership)
    db.session.commit()
    return jsonify({'message': 'Group created', 'group_id': group.id, 'name': group.name})

@main.route('/groups', methods=['GET'])
def list_groups():
    username = request.args.get('username')
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    memberships = GroupMembership.query.filter_by(user_id=user.id).all()
    groups = [{'id': m.group.id, 'name': m.group.name, 'owner': m.group.owner.username} for m in memberships]
    return jsonify({'groups': groups})

@main.route('/groups/<int:group_id>/invite', methods=['POST'])
def invite_to_group(group_id):
    data = request.get_json()
    inviter = User.query.filter_by(username=data.get('inviter')).first()
    invited = User.query.filter_by(username=data.get('invitee')).first()
    group = Group.query.get(group_id)
    if not inviter or not invited or not group:
        return jsonify({'error': 'User or group not found'}), 404
    if group.owner_id != inviter.id:
        return jsonify({'error': 'Only group owner can invite'}), 403
    join_token = secrets.token_urlsafe(32)
    invitation = GroupInvitation(group_id=group.id, invited_user_id=invited.id, inviter_id=inviter.id, join_token=join_token)
    db.session.add(invitation)
    db.session.commit()
    join_link = f"http://localhost:3000/groups/join/{join_token}"
    print(f"Send this join link to {invited.email}: {join_link}")
    return jsonify({'message': 'Invitation sent', 'join_link': join_link})

@main.route('/groups/join/<token>', methods=['POST'])
def join_group_by_token(token):
    invitation = GroupInvitation.query.filter_by(join_token=token, status='pending').first()
    if not invitation:
        return jsonify({'error': 'Invalid or expired join link'}), 404
    user = User.query.get(invitation.invited_user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # Accept invitation and add to group
    invitation.status = 'accepted'
    membership = GroupMembership(user_id=user.id, group_id=invitation.group_id)
    db.session.add(membership)
    db.session.commit()
    return jsonify({'message': 'Joined group successfully'})

@main.route('/invitations', methods=['GET'])
def list_invitations():
    username = request.args.get('username')
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    invitations = GroupInvitation.query.filter_by(invited_user_id=user.id, status='pending').all()
    result = [{'id': inv.id, 'group': inv.group.name, 'inviter': inv.inviter.username} for inv in invitations]
    return jsonify({'invitations': result})

@main.route('/invitations/<int:invitation_id>/respond', methods=['POST'])
def respond_invitation(invitation_id):
    data = request.get_json()
    action = data.get('action')  # 'accept' or 'decline'
    invitation = GroupInvitation.query.get(invitation_id)
    if not invitation:
        return jsonify({'error': 'Invitation not found'}), 404
    if action == 'accept':
        invitation.status = 'accepted'
        membership = GroupMembership(user_id=invitation.invited_user_id, group_id=invitation.group_id)
        db.session.add(membership)
    elif action == 'decline':
        invitation.status = 'declined'
    else:
        return jsonify({'error': 'Invalid action'}), 400
    db.session.commit()
    return jsonify({'message': f'Invitation {action}ed'})

@main.route('/groups/<int:group_id>/members', methods=['GET'])
def list_group_members(group_id):
    group = Group.query.get(group_id)
    if not group:
        return jsonify({'error': 'Group not found'}), 404
    members = [{'username': m.user.username, 'name': m.user.name} for m in group.memberships]
    return jsonify({'members': members})

@main.route('/groups/<int:group_id>/messages', methods=['GET', 'POST'])
def group_messages(group_id):
    group = Group.query.get(group_id)
    if not group:
        return jsonify({'error': 'Group not found'}), 404
    if request.method == 'POST':
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        membership = GroupMembership.query.filter_by(user_id=user.id, group_id=group.id).first()
        if not membership:
            return jsonify({'error': 'Not a group member'}), 403
        msg = Message(group_id=group.id, user_id=user.id, content=data['content'])
        db.session.add(msg)
        db.session.commit()
        return jsonify({'message': 'Message sent'})
    else:
        messages = Message.query.filter_by(group_id=group.id).order_by(Message.timestamp.asc()).all()
        result = [{'user': m.user.username, 'content': m.content, 'timestamp': m.timestamp.isoformat()} for m in messages]
        return jsonify({'messages': result})

@main.route('/groups/<int:group_id>', methods=['DELETE'])
def delete_group(group_id):
    data = request.get_json()
    username = data.get('username')
    user = User.query.filter_by(username=username).first()
    group = Group.query.get(group_id)
    if not user or not group:
        return jsonify({'error': 'User or group not found'}), 404
    if group.owner_id != user.id:
        return jsonify({'error': 'Only the group owner can delete the group'}), 403
    # Delete all memberships, invitations, messages, then the group
    GroupMembership.query.filter_by(group_id=group_id).delete()
    GroupInvitation.query.filter_by(group_id=group_id).delete()
    Message.query.filter_by(group_id=group_id).delete()
    db.session.delete(group)
    db.session.commit()
    return jsonify({'message': 'Group deleted'})

@main.route('/groups/<int:group_id>/leave', methods=['POST'])
def leave_group(group_id):
    data = request.get_json()
    username = data.get('username')
    user = User.query.filter_by(username=username).first()
    group = Group.query.get(group_id)
    if not user or not group:
        return jsonify({'error': 'User or group not found'}), 404
    if group.owner_id == user.id:
        return jsonify({'error': 'Owner cannot leave their own group. Delete the group instead.'}), 400
    membership = GroupMembership.query.filter_by(user_id=user.id, group_id=group_id).first()
    if not membership:
        return jsonify({'error': 'Not a group member'}), 403
    db.session.delete(membership)
    db.session.commit()
    return jsonify({'message': 'Left group'})


####### MOVIE route

@main.route('/movies/trending', methods=['GET'])
def fetch_trending_movies():
    if not TMDB_API_KEY:
        return jsonify({'error': 'TMDB api key not set'}), 500

    url = "https://api.themoviedb.org/3/trending/movie/day"
    params = {
        "api_key": TMDB_API_KEY,
        "language": "en-US"
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        movies = [{
            "title": m.get("title"),
            "overview": m.get("overview"),
            "poster": f"https://image.tmdb.org/t/p/w500{m['poster_path']}" if m.get("poster_path") else None
        } for m in data.get("results", [])]

        return jsonify({"movies": movies})

    except requests.RequestException as e:
        return jsonify({'error': 'failed to fetch movies', 'details': str(e)}), 500

###############