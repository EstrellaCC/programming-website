import os
import django
from datetime import datetime
import sys

# 添加项目根目录到 Python 路径中
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
# 设置环境变量，指定 Django 设置文件
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "CourseServer.settings")

# 初始化 Django 环境
django.setup()

# 导入模型
from posts.models import Posts

def fill_posts():
    # 您的数据填充逻辑
    posts_data = [
        {
            'title': 'React Basics',
            'content': 'Learn the fundamentals of React.js framework.',
            'image_path': '/media/image/1.jpg',
            'author_name': 'John Doe',
            'avatar_path': '/media/avatar/image1.png'
        },
        {
            'title': 'JavaScript ES6 Features',
            'content': 'Explore the new features introduced in ECMAScript 6 (ES6).',
            'image_path': '/media/image/2.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': '/media/avatar/image2.png'
        },
        {
            'title': 'Node.js Express Framework',
            'content': 'Build web applications using Node.js and Express framework',
            'image_path': '/media/image/3.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': '/media/avatar/image3.png'
        },
        {
            'title': 'Python Data Science',
            'content': 'Discover the essentials of data science using Python programming language.',
            'image_path': '/media/image/4.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': '/media/avatar/image4.png'
        },
        {
            'title': 'Java Spring Boot',
            'content': 'Develop web applications with the Spring Boot framework using Java programming language.',
            'image_path': 'CourseServer/media/image/5.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': 'CourseServer/media/avatar/image1.png'
        },
        {
           
            'title': 'Vue.js Fundamentals',
            'content': 'Learn the basics of Vue.js framework for building interactive web interfaces.',
            'image_path': 'CourseServer/media/image/1.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': 'CourseServer/media/avatar/image2.png'
        },
        {
            
            'title': 'TypeScript Basics',
            'content': 'Get started with TypeScript, a superset of JavaScript that adds static typing to the language.',
            'image_path': 'CourseServer/media/image/2.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': 'CourseServer/media/avatar/image3.png'
        },
        {
            'title': 'GraphQL Introduction',
            'content': 'Explore the basics of GraphQL, a query language for your API, and runtime for executing those queries.',
            'image_path': 'CourseServer/media/image/4.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': 'CourseServer/media/avatar/image4.png'
        },
        {
            'title': 'Django Web Development',
            'content': 'Build web applications using Django, a high-level Python web framework.',
            'image_path': 'CourseServer/media/image/3.jpg',
            'author_name': 'Jane Smith',
            'avatar_path': 'CourseServer/media/avatar/image1.png'
        },
    ]

    for data in posts_data:
        post = Posts(
            title=data['title'],
            content=data['content'],
            author_name=data['author_name'],
            imageUrl=data['image_path'],
            avatarUrl=data['avatar_path'],
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )

        # 保存帖子到数据库
        post.save()

if __name__ == "__main__":
    fill_posts()
