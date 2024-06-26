from django.urls import path
from . import views

urlpatterns = [

    path('', views.get_posts, name='get_posts'),
    path('<int:post_id>/', views.get_post_details, name='get_post_details'),
    path('create/', views.create_post, name='create_post'),
]