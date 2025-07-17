from app import create_app, db
from app.models import User, Message
from flask_socketio import SocketIO, emit, join_room

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*")

with app.app_context():
    db.create_all()

# SocketIO event handlers
@socketio.on('join_group')
def handle_join_group(data):
    group_id = data.get('group_id')
    join_room(f'group_{group_id}')

@socketio.on('send_group_message')
def handle_send_group_message(data):
    group_id = data.get('group_id')
    username = data.get('username')
    content = data.get('content')
    user = User.query.filter_by(username=username).first()
    if not user:
        return
    msg = Message(group_id=group_id, user_id=user.id, content=content)
    db.session.add(msg)
    db.session.commit()
    emit('group_message', {
        'group_id': group_id,
        'user': username,
        'content': content,
        'timestamp': msg.timestamp.isoformat()
    }, room=f'group_{group_id}')

if __name__ == '__main__':
    socketio.run(app, debug=True)