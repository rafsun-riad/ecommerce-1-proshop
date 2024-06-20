from django.urls import path
from base.api.views import usersViews


urlpatterns = [
    path('login/', usersViews.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', usersViews.getUserProfile, name='user-profile'),
    path('profile/update/', usersViews.updateUserProfile,
         name='update-user-profile'),
    path('', usersViews.getUsers, name='users'),
    path('register/', usersViews.registerUser, name='user-register'),
]
