import json
from datetime import datetime

from api.models import City, Company, Establishment, Project, ProjectManagement, Representative
from django.core.management.base import BaseCommand


def printProgressBar(
	iteration, total, prefix="", suffix="", decimals=1, length=100, fill="█", printEnd="\r"
):
	"""
	Call in a loop to create terminal progress bar
	@params:
	    iteration   - Required  : current iteration (Int)
	    total       - Required  : total iterations (Int)
	    prefix      - Optional  : prefix string (Str)
	    suffix      - Optional  : suffix string (Str)
	    decimals    - Optional  : positive number of decimals in percent complete (Int)
	    length      - Optional  : character length of bar (Int)
	    fill        - Optional  : bar fill character (Str)
	    printEnd    - Optional  : end character (e.g. "\r", "\r\n") (Str)
	"""
	percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
	filledLength = int(length * iteration // total)
	bar = fill * filledLength + "-" * (length - filledLength)
	print(f"\r{prefix} |{bar}| {percent}% {suffix}", end=printEnd, flush=True)
	# Print New Line on Complete
	if iteration == total:
		print()


class Command(BaseCommand):
	help = "Initialization of data through json file"

	def handle(self, *args, **options):
		if Project.objects.exists():
			return

		start = datetime.now()

		cities = {}
		establishments = {}
		companies = {}
		representatives = {}
		project_managements = {}

		f = open("dataset.json")
		objects = json.load(f)
		nb_objects = len(objects)

		for i, obj in enumerate(objects):
			printProgressBar(
				i + 1, nb_objects, prefix="\t\t↳ Progress:", suffix="Complete", length=50
			)
			city_label = obj.pop("ville")
			if city_label in cities:
				city = cities[city_label]
			else:
				city = City.objects.create(label=city_label)
				cities[city_label] = city

			establishment_code = obj.pop("codeuai")
			establishment_label = obj.pop("lycee")
			establishment_longitude = obj.pop("longitude", None)
			establishment_latitude = obj.pop("latitude", None)
			if establishment_code in establishments:
				establishment = establishments[establishment_code]
			else:
				establishment = Establishment.objects.create(
					code=establishment_code,
					label=establishment_label,
					longitude=establishment_longitude,
					latitude=establishment_latitude,
					city=city,
				)
				establishments[establishment_code] = establishment

			project_management = None
			if "maitrise_d_oeuvre" in obj:
				project_management_label = obj.pop("maitrise_d_oeuvre")
				if project_management_label in project_managements:
					project_management = project_managements[project_management_label]
				else:
					project_management = ProjectManagement.objects.create(
						label=project_management_label
					)
					project_managements[project_management_label] = project_management

			company = None
			if "entreprise" in obj:
				company_label = obj.pop("entreprise")
				if company_label in companies:
					company = companies[company_label]
				else:
					company = Company.objects.create(label=company_label)
					companies[company_label] = company

			representative = None
			if "mandataire" in obj:
				representative_label = obj.pop("mandataire")
				if representative_label in representatives:
					representative = representatives[representative_label]
				else:
					representative = Representative.objects.create(label=representative_label)
					representatives[representative_label] = representative

			Project.objects.create(
				**obj,
				establishment=establishment,
				project_management=project_management,
				representative=representative,
				company=company,
			)

		print(f"Finished => {datetime.now() - start}")

		return
