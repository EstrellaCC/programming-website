from django.db import models

class Posts(models.Model):
    # PostId=models.CharField(max_length=128)
    title = models.CharField(max_length=128,null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    imageUrl = models.ImageField(upload_to='image', null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    author_name = models.CharField(max_length=128, null=True, blank=True)
    avatarUrl = models.ImageField(upload_to='avatar', null=True, blank=True)
    def __str__(self):
        return self.title

    class Meta:
        db_table = 'my_posts'

