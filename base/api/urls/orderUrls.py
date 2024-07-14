from django.urls import path
from base.api.views import orderViews


urlpatterns = [
    path('add/', orderViews.addOrderItems, name='order-add'),
    path('myorders/', orderViews.getMyOrders, name='myorders'),
    path('<str:pk>/', orderViews.getOrderBytId, name='order-by-id')
]
