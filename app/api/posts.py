from app.api import bp
from app.models import User
from app import db
import sqlalchemy as sa
from flask import request, url_for, abort
from app.api.errors import bad_request
from app.api.auth import token_auth

@bp.route('/posts/<int:id>', methods=['GET'])
@token_auth.login_required
def get_post(id):
    pass

@bp.route('/posts', methods=['GET'])
@token_auth.login_required
def get_posts():
    pass

@bp.route('/make_post', methods=['POST'])
@token_auth.login_required
def make_post():
    pass