from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product
from base.api.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')


@api_view(['POST'])
@permission_classes([IsAdminUser, IsAuthenticated])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='',
        price=0,
        brand='',
        countInStock=0,
        category='',
        description='',
    )
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser, IsAuthenticated])
def updateProduct(request, pk):
    product = Product.objects.get(_id=pk)
    data = request.data

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
