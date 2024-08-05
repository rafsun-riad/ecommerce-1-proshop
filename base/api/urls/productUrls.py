from django.urls import path
from base.api.views import productViews


urlpatterns = [
    path('', productViews.getProducts, name='products'),
    path('<str:pk>/', productViews.getProduct, name='product-detail'),
    path('delete/<str:pk>/', productViews.deleteProduct, name='delete-product'),
]
