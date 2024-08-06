from django.urls import path
from base.api.views import productViews


urlpatterns = [
    path('', productViews.getProducts, name='products'),
    path('create/', productViews.createProduct, name='product-create'),
    path('<str:pk>/', productViews.getProduct, name='product-detail'),
    path('update/<str:pk>', productViews.updateProduct, name='update-product'),
    path('delete/<str:pk>/', productViews.deleteProduct, name='delete-product'),

]
