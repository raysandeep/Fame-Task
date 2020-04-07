from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.
class TeacherRoot(models.Model):
    id=models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE)

class StudentRoot(models.Model):
    id=models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    teacher = models.ForeignKey(TeacherRoot,on_delete=models.CASCADE)
    grade = models.CharField(max_length=100)


class AttendanceHandler(models.Model):
    id=models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True)
    user = models.ForeignKey(StudentRoot,on_delete=models.CASCADE)
    date = models.DateField(auto_now=True)
    status = models.BooleanField(default=False)
