from django.urls import path,include
from . import views
urlpatterns = [
    path('api/student/',views.StudentsHandling.as_view()),
    path('api/attendance/',views.AttendanceHandlerView.as_view()),
    path('api/student/view/',views.StudentView.as_view()),
    path('api/link/teacher/',views.TeacherLinker.as_view()),
    path('api/user/',views.UserType.as_view()),
]
