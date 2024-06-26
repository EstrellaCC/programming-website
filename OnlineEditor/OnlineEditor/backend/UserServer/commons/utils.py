import re
import string
import random
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Sequence
import psutil
import platform

from ServerApi.settings import SYSTEM_NAME


def get_client_ip(request):
    """
    获取客户端ip
    :param request:
    :return:
    """

    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def generate_order() -> str:
    """生成订单"""
    order_length = 13
    characters = string.ascii_uppercase + string.digits
    order = "".join(random.choice(characters) for _ in range(order_length))
    return order


def gender_random_model_id(model, num: int = 5):
    """
    随机推荐
    :param model:
    :param db:
    :return:
    """
    return [i.id for i in model.objects.order_by("?")[:num]]


def check_re_match_url(request_url: str, RE_EXCLUDE_API_URL: Sequence[str]) -> bool:
    for i in RE_EXCLUDE_API_URL:
        if re.match(i, request_url):
            return True
    return False


def get_system_info() -> dict:
    vm = psutil.virtual_memory()
    gb = 1024 * 1024 * 1024
    info = {
        "platform_name": SYSTEM_NAME,
        "system": platform.system(),
        "node": platform.node(),
        "release": platform.release(),
        "version": platform.version(),
        "machine": platform.machine(),
        "processor": platform.processor(),
        "cpu_count": psutil.cpu_count(),
        "cpu_freq": psutil.cpu_freq().current,
        "virtual_memory": vm.total / gb,
        "timezone": datetime.now().astimezone().tzname(),
        "db_name": "DB",
        "python_version": sys.version,
    }

    return info


def save_img(file, save_dir: Path) -> str:
    if file:
        image_name = f"{str(int(time.time()))}-{file.name}"
        save_path = save_dir / image_name
        if not save_path.exists():
            with open(save_path, "wb+") as f:
                for chunk in file.chunks():
                    f.write(chunk)
        pre_path = str(save_dir).split("media")[-1].replace("/", "")
        image_url = str(Path("media") / pre_path / image_name)
    else:
        image_url = ""
    return image_url
