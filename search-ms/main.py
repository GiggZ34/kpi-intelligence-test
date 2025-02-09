import logging
from concurrent import futures
import grpc
from shapely.geometry import Polygon
from quads import QuadTree, BoundingBox
import nearby_search_pb2
import nearby_search_pb2_grpc

logging.basicConfig(level=logging.INFO)

class GeoServiceServicer(nearby_search_pb2_grpc.nearbySearchServiceServicer):
    def __init__(self):
        self.quadtree = QuadTree((0, 0), 360, 180, 10000)

        points = [
            {"latitude": 48.8566, "longitude": 2.3522},  # Paris
            {"latitude": 51.5074, "longitude": -0.1278},  # London
            {"latitude": 40.7128, "longitude": -74.0060},  # New York
            {"latitude": 34.0522, "longitude": -118.2437},  # Los Angeles
        ]
        logging.info("Inserting points into the quadtree...")
        for point in points:
            self.quadtree.insert((point["longitude"], point["latitude"]), point)

    def GetPointsInPolygon(self, request, context):
        logging.info("Received request to find points in polygon.")
        polygon_vertices = [(vertex.latitude, vertex.longitude) for vertex in request.vertices]
        polygon = Polygon(polygon_vertices)

        minx, miny, maxx, maxy = polygon.bounds
        box = BoundingBox(minx, miny, maxx, maxy)

        candidate_points: list = self.quadtree.within_bb(box)

        result = []
        for candidate in candidate_points:
            longitude, latitude, data = candidate
            if polygon.contains((latitude, longitude)):  # Vérification géométrique avec Shapely
                result.append(nearby_search_pb2.Point(latitude=data["latitude"], longitude=data["longitude"]))

        logging.info(f"Found {len(result)} points in polygon.")
        return nearby_search_pb2.ZoneResponse(points=result)


def serve():
    """Démarrer le serveur gRPC."""
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    nearby_search_pb2_grpc.add_nearbySearchServiceServicer_to_server(GeoServiceServicer(), server)

    port = 50051
    server.add_insecure_port(f"[::]:{port}")
    logging.info(f"gRPC server is running on port {port}...")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
