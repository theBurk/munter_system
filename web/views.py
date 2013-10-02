from django.views.generic import TemplateView

def index(request):
    return TemplateView.as_view(template_name="index.html")(request)

def about(request):
    return TemplateView.as_view(template_name="about.html")(request)

def munter_calc(request):
    return TemplateView.as_view(template_name="munter_calc.html")(request)
	
def munter_about(request):
    return TemplateView.as_view(template_name="munter_about.html")(request)

def chauvin_calc(request):
    return TemplateView.as_view(template_name="chauvin_calc.html")(request)

def chauvin_about(request):
    return TemplateView.as_view(template_name="chauvin_about.html")(request)

def technical_calc(request):
    return TemplateView.as_view(template_name="technical_calc.html")(request)
	
def technical_about(request):
    return TemplateView.as_view(template_name="technical_about.html")(request)