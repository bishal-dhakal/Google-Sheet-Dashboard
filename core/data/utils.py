
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from django.conf import settings
from .models import DataEntry
from django.db.models import Min, Max, Count
from .models import DataEntry 


def fetch_data_from_google_sheets():
    key_path = r""
    GOOGLE_SHEETS_ID=' '
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    credentials = ServiceAccountCredentials.from_json_keyfile_name(key_path, scope)
    gc = gspread.authorize(credentials)

    sheet = gc.open_by_key(GOOGLE_SHEETS_ID).sheet1
    data = sheet.get_all_records()

    DataEntry.objects.all().delete()

    for row in data:
        DataEntry.objects.create(
            name=row['Name'],
            age=int(row['Age']),
            gender=row['Gender'],
            salary=float(row['Salary Expectation'])
        )

def get_salary_range(age_min, age_max):
    salary_min = DataEntry.objects.filter(age__gte=age_min, age__lte=age_max).aggregate(Min('salary'))['salary__min']
    salary_max = DataEntry.objects.filter(age__gte=age_min, age__lte=age_max).aggregate(Max('salary'))['salary__max']
    return salary_min, salary_max

def count_by_age_and_gender():
    count_data = DataEntry.objects.values('age', 'gender').annotate(count=Count('id'))
    return list(count_data)

def min_max_age_by_gender(gender):
    min_age = DataEntry.objects.filter(gender=gender).aggregate(Min('age'))['age__min']
    max_age = DataEntry.objects.filter(gender=gender).aggregate(Max('age'))['age__max']
    return min_age, max_age
