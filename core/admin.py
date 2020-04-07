from django.contrib import admin

# Register your models here.
from .models import(
    TeacherRoot,
    StudentRoot,
    AttendanceHandler
)


admin.site.register(TeacherRoot)
admin.site.register(StudentRoot)
admin.site.register(AttendanceHandler)