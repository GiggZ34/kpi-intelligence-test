import numpy as np
from api.models import Project


class ProjectKpi:
    project: Project

    def __init__(self, obj: Project):
        self.project = obj

    def _voted_budget_calculator(self, *args, **kwargs):
        for arg in args:
            if not arg:
                return None

        budget_voted_median = Project.objects.median_voted_budget(**kwargs)
        budget_voted_average = Project.objects.average_voted_budget(**kwargs)
        budget_voted_ranked = None

        budget_voted_ranked_list = Project.objects.ranked_voted_budget(**kwargs)
        for project in budget_voted_ranked_list:
            if project.id == self.project.id:
                budget_voted_ranked = project.row_number

        return {
            "count": Project.objects.filter(**kwargs).count(),
            "ranked": budget_voted_ranked,
            "median_value": np.around(budget_voted_median, 3),
            "diff_median": np.around(self.project.montant_des_ap_votes_en_meu - budget_voted_median, 3),
            "average_value": np.around(budget_voted_average, 3),
            "diff_average": np.around(self.project.montant_des_ap_votes_en_meu - budget_voted_average, 3)
        }

    @property
    def voted_budget(self):
        if not self.project.montant_des_ap_votes_en_meu:
            return None

        establishment = getattr(self.project, "establishment")
        if not establishment:
            establishment = self.project.establishment

        all = self._voted_budget_calculator()
        city = self._voted_budget_calculator(establishment__city=establishment.city)\
            if self.project.establishment is not None else None
        year = self._voted_budget_calculator(cao_attribution__year=self.project.cao_attribution.year)\
            if self.project.cao_attribution is not None else None

        return {
            "voted_budget": {
                "all": all,
                "city": city,
                "year": year
            }
        }

    def _planned_budget_calculator(self, *args, **kwargs):
        for arg in args:
            print(arg, flush=True)
            if not arg:
                return None

        budget_planned_median = Project.objects.median_planned_budget(**kwargs)
        budget_planned_average = Project.objects.average_planned_budget(**kwargs)
        budget_planned_ranked = None

        budget_voted_ranked_list = Project.objects.ranked_planned_budget(**kwargs)
        for project in budget_voted_ranked_list:
            if project.id == self.project.id:
                budget_planned_ranked = project.row_number

        return {
            "count": Project.objects.filter(**kwargs).count(),
            "ranked": budget_planned_ranked,
            "median_value": np.around(budget_planned_median, 3),
            "diff_median": np.around(self.project.enveloppe_prev_en_meu - budget_planned_median, 3),
            "average_value": np.around(budget_planned_average, 3),
            "diff_average": np.around(self.project.enveloppe_prev_en_meu - budget_planned_average, 3)
        }

    @property
    def planned_budget(self):
        if not self.project.enveloppe_prev_en_meu:
            return None

        establishment = getattr(self.project, "establishment")
        if not establishment:
            establishment = self.project.establishment

        all = self._planned_budget_calculator()
        city = self._planned_budget_calculator(establishment__city=establishment.city) \
            if self.project.establishment is not None else None
        year = self._planned_budget_calculator(cao_attribution__year=self.project.cao_attribution.year) \
            if self.project.cao_attribution is not None else None

        return {
            "planned_budget": {
                "all": all,
                "city": city,
                "year": year
            }
        }
