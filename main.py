from csv import reader
from http.server import HTTPStatus, SimpleHTTPRequestHandler, test
from itertools import groupby
from json import dumps
from operator import itemgetter
from os import chdir, path
from urllib.parse import parse_qs, urlparse


__dir__ = path.dirname(__file__)


class BadRequestError(Exception):
    pass


def load_data():
    with open("data.csv", encoding='utf-8') as f:

        next(f)  # skip header
        employees = {
            line[0]: dict(title=line[1], location=tuple(filter(None, line[2:6])),
                          age=line[6], firstName=line[7], lastName=line[8], company=line[9])
            for line in reader(f)
        }

        locations = {
            i: dict(id=i, pathnames=pathnames, name=pathnames[-1])
            for i, pathnames in enumerate(sorted(set(
                pathnames[:n + 1]
                for pathnames in (x["location"] for x in employees.values())
                for n in range(len(pathnames))
            )), 1)
        }
        location_pathnames_to_location = {
            location['pathnames']: location
            for location in locations.values()
        }
        location_name_to_id = {
            location['name']: id
            for id, location in locations.items()
        }
        for location in locations.values():
            location['path'] = [location_name_to_id[x] for x in location['pathnames']]

        for employee in employees.values():
            employee["location"] = location_pathnames_to_location[employee["location"]]

    return employees, locations


class HttpRequestHandler(SimpleHTTPRequestHandler):

    employees, locations = load_data()

    def get_locations(self):
        return list(self.locations.values())

    def parse_query_param(self, name, type, default=None):
        try:
            return type(self.query.get(name, [default])[0])
        except:
            raise BadRequestError(name + " was badly formed")

    def get_companies_percentage_per_location(self):

        key = itemgetter("company")
        location_id = self.parse_query_param("locationId", int)
        percentage_limit = self.parse_query_param("percentageLimit", float, 80)

        if percentage_limit < 0 or percentage_limit > 100:
            raise BadRequestError("percentageLimit was badly formed")

        return [
            {"companyName": company, "percentage": percentage}
            for company, group in groupby(
                sorted(self.employees.values(), key=key), key=key
            )
            for group_list in [list(group)]
            for numerator in [
                sum(1.0 for x in group_list if location_id in x["location"]["path"])
            ]
            for denominator in [len(group_list)]
            for percentage in [(numerator / denominator) * 100]
            if percentage >= percentage_limit
        ]

    def do_API(self):
        handler = getattr(
            self, "get_" + self.url.path[len("/api/"):].replace("/", "_")
        )
        self.response(HTTPStatus.OK, dumps(handler()))

    def do_ERROR(self, e):
        status = (
            HTTPStatus.BAD_REQUEST
            if isinstance(e, BadRequestError)
            else HTTPStatus.INTERNAL_SERVER_ERROR
        )
        return self.response(status, e)

    def response(self, status, content):
        content = str(content).encode()
        self.send_response(status)
        self.send_header("Content-type", "text/plain")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", len(content))
        self.end_headers()
        self.wfile.write(content)

    def do_GET(self):
        try:
            try:
                self.url = urlparse(self.path)
                self.query = parse_qs(self.url.query)
            except:
                raise BadRequestError("Query string was badly formed")
            if self.url.path.startswith("/api/"):
                self.do_API()
            else:
                return super().do_GET()
        except Exception as e:
            return self.do_ERROR(e)


def main():
    chdir(path.join(__dir__, "static"))
    test(HttpRequestHandler, port=5555)


if __name__ == "__main__":
    main()
