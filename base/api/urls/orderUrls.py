from django.urls import path
from base.api.views import orderViews


urlpatterns = [
    path('', orderViews.getAllOrders, name='all-orders'),
    path('add/', orderViews.addOrderItems, name='order-add'),
    path('myorders/', orderViews.getMyOrders, name='myorders'),
    path('<str:pk>/deliver/', orderViews.updateOrderDelivered, name='update-deliver'),
    path('<str:pk>/', orderViews.getOrderBytId, name='order-by-id'),
]
