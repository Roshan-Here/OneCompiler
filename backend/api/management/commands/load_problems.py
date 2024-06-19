# """
# -run these commands to load all the data to db.
# python makemigrations
# python migrate
# python manage.py load_problems api\json\required_format.json
# """

# import json
# from django.core.management.base import BaseCommand
# from api.serializer import ProblemSerializer
# from api.models import Problem, Tag, Example


import json
from django.core.management.base import BaseCommand
from api.models import Problem
from api.serializer import ProblemSerializer

class Command(BaseCommand):
    help = "Load problems from a JSON file"

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']

        with open(file_path, 'r') as file:
            data = json.load(file)
            for item in data:
                problem_serializer = ProblemSerializer(data=item)
                if problem_serializer.is_valid():
                    problem_serializer.save()
                    print("done")
                    # self.stdout.write(self.style.SUCCESS(f'Successfully loaded problem: {problem_serializer.data["Title"]}'))
                else:
                    print(problem_serializer.errors)










# # class Command(BaseCommand):
# #     help = 'Load problems from a JSON file'

# #     def add_arguments(self, parser):
# #         parser.add_argument('json_file', type=str, help='The JSON file containing the problems')

# #     def handle(self, *args, **kwargs):
# #         json_file = kwargs['json_file']
# #         with open(json_file, 'r') as file:
# #             problems = json.load(file)
# #             for problem_data in problems:
# #                 serializer = ProblemSerializer(data=problem_data)
# #                 if serializer.is_valid():
# #                     serializer.save()
# #                     self.stdout.write(self.style.SUCCESS(f'Successfully loaded problem: {serializer.data["Title"]}'))
# #                 else:
# #                     self.stderr.write(self.style.ERROR(f'Failed to load problem: {serializer.errors}'))


# class Command(BaseCommand):
#     help = "Load problems from a JSON file"

#     def add_arguments(self, parser):
#         parser.add_argument('file_path', type=str, help='Path to the JSON file')

#     def handle(self, *args, **kwargs):
#         file_path = kwargs['file_path']

#         with open(file_path, 'r') as file:
#             data = json.load(file)
#             for item in data:
#                 # Extract tags and examples
#                 tags = item.pop('Tags', [])
#                 examples = item.pop('examples', [])

#                 # Validate and save the problem
#                 problem_serializer = ProblemSerializer(data=item)
#                 if problem_serializer.is_valid():
#                     problem = problem_serializer.save()
#                     # Assign tags to the problem
#                     for tag_name in tags:
#                         tag, created = Tag.objects.get_or_create(name=tag_name)
#                         problem.Tags.add(tag)
#                     # Assign examples to the problem
#                     for example_data in examples:
#                         Example.objects.create(problem=problem, **example_data)
#                 else:
#                     print(problem_serializer.errors)