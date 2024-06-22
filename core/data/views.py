from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import DataEntry
from django.db.models import Count 
from rest_framework.views import APIView
from .utils import fetch_data_from_google_sheets, get_salary_range, count_by_age_and_gender, min_max_age_by_gender

class fetch_data_view(APIView):
    def get(self,request):
        fetch_data_from_google_sheets()
        return Response({'message': 'Data fetched and updated successfully!'})


##completed age raange min max salary
class salary_range_view(APIView):
    def get(self,request,age_min, age_max):
        salary_min, salary_max = get_salary_range(age_min, age_max)
        data = {
            'min_salary': salary_min,
            'max_salary': salary_max
        }
        return JsonResponse(data)

##completed count of each age and gender
class count_by_age_gender_view(APIView):
    def get(self, request):
        count_data = count_by_age_and_gender()
        return JsonResponse(count_data, safe=False)


##completed  min max age for gender
class min_max_age_by_gender_view(APIView):
    def get(self,request,gender):
        min_age, max_age = min_max_age_by_gender(gender)
        data = {
            'min_age': min_age,
            'max_age': max_age
        }
        return JsonResponse(data)

#extra Pichart completed
class count_by_gender_view(APIView):
    def get(self,request):
        gender_counts = DataEntry.objects.values('gender').annotate(count=Count('id'))
        gender_counts_list = list(gender_counts)
        return JsonResponse(gender_counts_list, safe=False)