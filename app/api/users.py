from app.api import bp
from app.models import User, Post
from app import db
import sqlalchemy as sa
from flask import request, url_for, abort
from app.api.errors import bad_request, error_response
from app.api.auth import token_auth
from app.ai import AdRating

@bp.route('/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    return db.get_or_404(User, id).to_dict()


@bp.route('/users', methods=['GET'])
@token_auth.login_required
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    return User.to_collection_dict(sa.select(User), page, per_page,
                                   'api.get_users')



@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('must include username, email and password fields')
    if db.session.scalar(sa.select(User).where(
            User.username == data['username'])):
        return bad_request('please use a different username')
    if db.session.scalar(sa.select(User).where(
            User.email == data['email'])):
        return bad_request('please use a different email address')
    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()
    return user.to_dict(), 201, {'Location': url_for('api.get_user', id=user.id)}


@bp.route('/users/<int:id>', methods=['PUT'])
@token_auth.login_required
def update_user(id):
    if token_auth.current_user().id != id:
        abort(403)
    user = db.get_or_404(User, id)
    data = request.get_json()
    if 'username' in data and data['username'] != user.username and \
        db.session.scalar(sa.select(User).where(
            User.username == data['username'])):
        return bad_request('please use a different username')
    if 'email' in data and data['email'] != user.email and \
        db.session.scalar(sa.select(User).where(
            User.email == data['email'])):
        return bad_request('please use a different email address')
    user.from_dict(data, new_user=False)
    db.session.commit()
    return user.to_dict()

"""@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = db.session.scalar(sa.select(User).where(User.username == data['username']))
    if 'username' not in data or 'password' not in data:
        return bad_request('must include username and password fields')
    if user is None or not user.check_password(data['password']):
        return bad_request('Invalid username or password')
    login_user(user)
    return user.to_dict(), 201, {'Location': url_for('api.get_user', id=user.id)}
"""
@bp.route('/make_post', methods=['POST'])
@token_auth.login_required
def make_post():
    data = request.get_json()
    if 'request' not in data :
        return bad_request('must include request to AI')
    request_to=data['request']
    rating, response = AdRating.Ad_rate(request=request_to)
    post = Post(request=request_to, response=response, report_rating=rating, author=token_auth.current_user())
    db.session.add(post)
    db.session.commit()
    return post.to_dict(), 201, {'Location': url_for('api.get_post', id=post.id)}


@bp.route('/posts/<int:id>', methods=['GET'])
@token_auth.login_required
def get_post(id):
    return db.get_or_404(Post, id).to_dict()

@bp.route('/posts', methods=['GET'])
@token_auth.login_required
def get_posts():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    return Post.to_collection_dict(sa.select(Post), page, per_page,
                                   'api.get_posts')

@bp.route('/user/<string:username>', methods=['GET'])#dont mix up with /users/ не путать с /users/
@token_auth.login_required
def get_user_with_username(username):
    user = db.session.scalar(sa.select(User).where(User.username == username))
    #user = db.session.query(User).filter_by(username=username).one().to_dict()
    if user is None:
        abort(404,description=username)
    return user.to_dict()
    #return db.get_or_404(User, username).to_dict()