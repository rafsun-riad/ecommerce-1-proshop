from django.urls import path
from base.api.views import orderViews


urlpatterns = [
    path('add/', orderViews.addOrderItems, name='order-add')
]
