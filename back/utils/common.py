import math

from rest_framework.pagination import PageNumberPagination as _PageNumberPagination
from rest_framework.response import Response


class PageNumberPagination(_PageNumberPagination):
    page_size_query_param = "page_size"
    max_page_size = 500

    def get_paginated_response(self, data):
        if self.request.query_params.get("size"):
            self.page_size = int(self.request.query_params.get("size"))

        total_pages = math.ceil(self.page.paginator.count / self.page_size)

        return Response(
            {
                "count": self.page.paginator.count,
                "total_pages": total_pages,
                "current": self.page.number,
                "previous": self.get_previous_link(),
                "next": self.get_next_link(),
                "results": data,
            }
        )

    def get_paginated_response_schema(self, schema):
        return {
            "type": "object",
            "properties": {
                "count": {
                    "type": "integer",
                    "example": 123,
                },
                "next": {
                    "type": "string",
                    "nullable": True,
                    "format": "uri",
                    "example": f"http://api.example.org/accounts/?{self.page_query_param}=4",
                },
                "previous": {
                    "type": "string",
                    "nullable": True,
                    "format": "uri",
                    "example": f"http://api.example.org/accounts/?{self.page_query_param}=2",
                },
                "total_pages": {
                    "type": "integer",
                    "example": 123,
                },
                "current": {
                    "type": "integer",
                    "example": 123,
                },
                "results": schema,
            },
        }
