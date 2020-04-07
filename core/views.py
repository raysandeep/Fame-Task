from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import(
    TeacherRoot,
    StudentRoot,
    AttendanceHandler
)
from .serializers import (
    TeacherRootSerializer,
    StudentRootSerializer,
    AttendanceHandlerSerializer
)
from rest_framework import permissions
from django.contrib.auth.models import User




class StudentsHandling(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        snippets = StudentRoot.objects.filter(teacher__user=request.user)
        serializer = StudentRootSerializer(snippets, many=True)
        return Response(serializer.data)


    #student creations
    def post(self, request, format=None):
        try:
            user_dict={
                'username' : request.data["username"],
                'first_name' : request.data["first_name"],
                'last_name' : request.data["last_name"],
                
            }
            user=User(**user_dict)
            user.set_password(request.data["password"])
            user.save()
            teacher = TeacherRoot.objects.filter(user=request.user)[0]
            teach = StudentRoot(user=user,teacher=teacher,grade=request.data['grade'])
            teach.save()
            return Response({
                'status':'done'
            },status=201)

        except:
            return Response({
                'status':'error'
            },status=400)



'''
SAMPLE REQUEST

{
    'students':[
        'id1',
        'id2'
    ]
}

'''

class AttendanceHandlerView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self,request):
        for i in request.data['students']:
            student = StudentRoot.objects.filter(id=i)[0]
            atten = AttendanceHandler(user=student,status=True)
            atten.save()
        return Response({
            'status':'done'
        },status=201)
        
class StudentView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self,request):
        snippets = AttendanceHandler.objects.filter(user__user=request.user)
        serializer = AttendanceHandlerSerializer(snippets, many=True)
        return Response(serializer.data,status=200)


class TeacherLinker(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self,request):
        serializer = TeacherRootSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserType(APIView):
    def get(self,request):
        if TeacherRoot.objects.filter(user=request.user).exists():
            return Response({
                'userType':'Teacher'
            },status=200)
        else:
            return Response({
                'userType':'Student'
            },status=200)