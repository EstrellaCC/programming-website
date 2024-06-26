from django.http import JsonResponse
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication

from commons.core.security import parse_access_token


# 接口认证
def index_login_required(view_func):
    def authenticate(request, *args, **kwargs):
        headers = request.META.copy()

        # authorization = headers.get("HTTP_TOKEN", None)
        authorization = headers.get("HTTP_AUTHORIZATION", None)
        token = authorization or request.COOKIES.get("access_token", "")
        if token is None:
            msg = {
                "error_code": 401,
                "msg": "account needs to be authenticated"
            }
            return JsonResponse(msg, status=401)
        token = token.replace("Bearer ", "")
        try:
            token_data = parse_access_token(token)
        except Exception as e:
            print(e)
            data = {"error_code": 401, "message": "未提供有效的Token"}
            return JsonResponse(data=data, status=401)
        return view_func(request, *args, **kwargs)

    authenticate.__doc__ = view_func.__doc__
    authenticate.__name__ = view_func.__name__

    return authenticate


class AuthenticationRequiredMixin:
    def authenticate(self, request, *args, **kwargs):
        headers = request.META.copy()
        # authorization = headers.get("HTTP_TOKEN", None)
        authorization = headers.get("HTTP_AUTHORIZATION", None)
        token = authorization
        if token is None:
            msg = {
                "error_code": 401,
                "msg": "account needs to be authenticated"
            }
            return JsonResponse(msg, status=401)
        token = token.replace("Bearer ", "")
        try:
            token_data = parse_access_token(token)
        except Exception as e:
            msg = {
                "error_code": 401,
                "msg": "未提供有效的Token"
            }
            return JsonResponse(msg, status=401)
        return super().dispatch(request, *args, **kwargs)
