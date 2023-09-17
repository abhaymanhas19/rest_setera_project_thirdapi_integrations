from django.http import JsonResponse


class orginizationModelMixin:
    def test_func(self, request, *args, **kwargs):
        org = request.headers.get("organization")

        if org:
            return True
        else:
            return False

    def dispatch(self, request, *args, **kwargs):
        print("called", request)
        test_result = self.test_func(request)
        if not test_result:
            return JsonResponse({"error": {"status": 401, "message": " Unauthorized"}})

        return super().dispatch(request, *args, **kwargs)
