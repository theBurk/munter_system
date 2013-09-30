from django.views.generic import TemplateView

def index(request):
    return TemplateView.as_view(template_name="index.html")(request)
	
def about(request):
    return TemplateView.as_view(template_name="about.html")(request)
	
def typical_rates(request):
    return TemplateView.as_view(template_name="typical_rates.html")(request)

def rate_calculation(request):
    return TemplateView.as_view(template_name="rate_calculation.html")(request)
