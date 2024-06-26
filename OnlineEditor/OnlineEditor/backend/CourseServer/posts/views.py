from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Posts


# Create a post
@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        # id=request.post.get("post_id")
        title = request.POST.get('title')
        content = request.POST.get('content')
        imageUrl = request.FILES.get('imageUrl', '')
        print("Received title:", title)
        print("Received content:", content)
        print("Received imageUrl:", imageUrl)

        post = Posts(title=title, content=content, imageUrl=imageUrl)
        post.save()

        return JsonResponse({"error_code": 200,
                             "msg": "success", })

    return JsonResponse({'error_code': 400, 'msg': '不允许的method'})


# Get all posts with pagination
def get_posts(request):
    posts = Posts.objects.all()
    paginator = Paginator(posts, 10)  # Show 10 posts per page
    page_number = request.GET.get('page', 1)
    page_posts = paginator.get_page(page_number)

    serialized_posts = [
        {"id":post.id,'title': post.title, 'content': post.content, 'imageUrl': post.imageUrl.url if post.imageUrl else '',
        }for post in page_posts]
    
    return JsonResponse({'posts': serialized_posts, 'error_code': 200})


# Get details of a specific post
def get_post_details(request, post_id):
    
    try:
        post = Posts.objects.get(pk=post_id)
        print(post.imageUrl.url)
        serialized_post = { 'title': post.title, 'content': post.content, 'imageUrl': post.imageUrl.url if post.imageUrl else '',
                           'createdAt': post.createdAt, 'updatedAt': post.updatedAt,
                           'author_name': post.author_name, 'avatarUrl': post.avatarUrl.url if post.avatarUrl else ''}
        return JsonResponse({'error_code': 200, 'data': serialized_post})
    except Posts.DoesNotExist:
        return JsonResponse({'error_code': 400, 'msg': 'not fond'})


