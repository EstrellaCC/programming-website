import shutil
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from CourseServer.settings import BASE_DIR
from .core import  terminate_container
import json
from .models import Codes
import subprocess


@require_http_methods(["POST"])
def run_interactive(request):
    request_body = json.loads(request.body)

    lang = request_body.get("lang")
    id = request_body.get("id")
    filelist = request_body.get("filelist")
    course_id = request_body.get("course_id")
    user_id = request_body.get("user_id")

    try:
        # 存入数据库
        code_response = Codes.objects.create(
            code_id=id, compile_status=True, course_id=course_id, user_id=user_id
        )
        code_response.save()

        code_to_run = "\n".join([item["content"] for item in filelist])  

        # 执行代码并捕获输出
        result = subprocess.run(
            ["python", "-c", code_to_run],  
            capture_output=True,
            text=True,
        )

        if result.returncode == 0:
            output = result.stdout.strip()
            # 更新数据库中的结果
            code_response.output = output
            code_response.save()
            response_data = {"error_code": 200, "msg": "success", "output": output}
        else:
            error = result.stderr.strip()
            response_data = {"error_code": 400, "msg": error, "output": ""}
    except Exception as e:
        # 处理运行时的错误并将错误存入数据库
        import traceback
        print(traceback.format_exc())
        response_data = {
            "error_code": 500,
            "msg": "Server has encountered error, cannot resolve request",
            "output": str(e),  # 返回异常信息
        }

    return JsonResponse(response_data)



@require_http_methods(["POST"])
def terminate(request):
    request_body = json.loads(request.body)
    id = request_body.get("id")
    terminate_container(id)

    result = {
        "error_code": 200,
        "msg": "success",
    }
    return JsonResponse(result)


@require_http_methods(["POST"])
def pic(request):
    request_body = json.loads(request.body)
    path = request_body.get("path")
    abs_path = BASE_DIR + path
    try:
        shutil.rmtree(abs_path)
        result = {
            "error_code": 200,
            "msg": "success",
        }
        print("finish delete---", abs_path)
    except Exception as e:
        print(e)
        result = {
            "error_code": 500,
            "msg": "delete error: %s" % e,
        }
    return JsonResponse(result)
