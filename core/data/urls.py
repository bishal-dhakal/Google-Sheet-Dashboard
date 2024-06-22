from django.urls import path
from .views import ( count_by_gender_view,
                    fetch_data_view,
                    salary_range_view,
                    count_by_age_gender_view,
                    min_max_age_by_gender_view)

urlpatterns = [
    path('fetch-data/', fetch_data_view.as_view(), name='fetch_data'),
    path('salary-range/<int:age_min>/<int:age_max>/', salary_range_view.as_view(), name='salary_range'),
    path('count-by-age-gender/', count_by_age_gender_view.as_view(), name='count_by_age_gender'),
    path('min-max-age-by-gender/<str:gender>/', min_max_age_by_gender_view.as_view(), name='min_max_age_by_gender'),
    path('gender-count/', count_by_gender_view.as_view(), name='count-gender'),
]
