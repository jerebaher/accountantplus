from django.http import JsonResponse
import json

from src.categories.models import Category

def add_category(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get('name')
            description = data.get('description')

            if not name:
                return JsonResponse({"error": "El campo nombre debe estar presente."}, status=400)

            Category.objects.create(name=name, description=description)

            return JsonResponse({"message": "Categoría creada exitosamente."}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido."}, status=405)
