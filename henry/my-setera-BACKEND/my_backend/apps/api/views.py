# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework import generics
# from users.models import SeteraUser
# from organization.models import Customer
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes, authentication_classes
# from rest_framework.authentication import SessionAuthentication
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from .serializer import *

# # Create your views here.

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = SeteraUser.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = RegisterSerializer

# class OrgsForUserView(generics.ListAPIView):
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [SessionAuthentication, JWTAuthentication]
#     serializer_class = OrgSerializer

#     def get(self, request, format=None):
#         user = request.user.email
#         userRole = request.user.role.name

#         try:
#             userOrg = request.user.customer.id
#         except:
#             return Response({"error": "User doesn't have customer id so nothing can't be found"})

#         if userRole == "supervisor":
#             orgs = Customer.objects.all()
#         elif userRole == "reseller":
#             orgs = Customer.objects.filter(reseller=userOrg)
#         elif userRole == "resellerAgent":
#             orgs = Customer.objects.filter(agent=userOrg)
#         elif userRole == "customerAdmin":
#             orgs = Customer.objects.filter(id=userOrg)
#         serializedOrgs = OrgSerializer(orgs, many=True)


#         content = {
#             'user' : user,
#             'userRole' : userRole,
#             'orgs' : serializedOrgs.data
#         }
#         return Response(content)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([SessionAuthentication, JWTAuthentication])
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/register/',
#         '/api/token/refresh/',
#         '/api/organization/'
#     ]
#     return Response(routes)
