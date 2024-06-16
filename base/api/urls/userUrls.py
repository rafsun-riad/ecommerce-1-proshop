from django.urls import path
from base.api.views import usersViews


urlpatterns = [
    path('login/', usersViews.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', usersViews.getUserProfile, name='users-profile'),
    path('', usersViews.getUsers, name='users'),
    path('register/', usersViews.registerUser, name='users-register'),
]
