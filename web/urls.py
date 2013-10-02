from django.conf.urls import patterns, include, url
import web.views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns("",
    # Examples:
	url(r"^about", web.views.about),	
	url(r"^munter_calc", web.views.munter_calc),	
    url(r"^munter_about", web.views.munter_about),
	url(r"^chauvin_calc", web.views.chauvin_calc),
	url(r"^chauvin_about", web.views.chauvin_about),
	url(r"^technical_calc", web.views.technical_calc),
	url(r"^technical_about", web.views.technical_about),
	url(r"^", web.views.index),
    # url(r'^web/', include('web.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
