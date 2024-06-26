from datetime import timedelta, datetime
from http.client import HTTPException
from typing import Union

from django.contrib.auth.hashers import check_password
from jose import JWTError, jwt

from rest_framework import serializers

from identity.models import User

SECRET_KEY = '%c%p^bf*_p8*kxm#c5atysx%_p5$5@9=19)8@3e9&4&n7q*wup'


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    """
    创建jwt token
    :param data:
    :param expires_delta:
    :return:
    """
    # to_encode = data.copy()
    # if expires_delta:
    #     expire = datetime.now(UTC) + expires_delta
    # else:
    #     expire = datetime.now(UTC) + timedelta(days=7)
    # to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm="HS256")
    return encoded_jwt


def parse_access_token(token: str):
    credentials_exception = Exception("无效的token")
    try:
        print(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except JWTError as e:
        import traceback
        print(traceback.format_exc())
        raise credentials_exception
    return payload



def get_user_by_token(request):
    """
    获取登录用户，通过token
    :param request:
    :return:
    """
    headers = request.META.copy()
    # authorization = headers.get("HTTP_TOKEN", None)
    authorization = headers.get("HTTP_AUTHORIZATION", None)
    try:
        token = authorization.replace("Bearer ", "")
        token_data = parse_access_token(token)
    except Exception:
        return None
    return token_data
