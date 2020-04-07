from rest_framework import serializers
from .models import(
    TeacherRoot,
    StudentRoot,
    AttendanceHandler
)

class TeacherRootSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherRoot
        fields = '__all__'
        depth=2

class StudentRootSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentRoot
        fields = '__all__'
        depth=1

class AttendanceHandlerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceHandler
        fields = '__all__'