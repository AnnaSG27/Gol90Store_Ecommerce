from django.urls import path

from . import views

urlpatterns = [
    path('summary/', views.sales_summary, name='analytics-summary'),
    path('sales-by-period/', views.sales_by_period, name='analytics-sales-by-period'),
    path('top-products/', views.top_products, name='analytics-top-products'),
]
