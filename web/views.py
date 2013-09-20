from django.views.generic import TemplateView

def index(request):
    return TemplateView.as_view(template_name="index.html")(request)
