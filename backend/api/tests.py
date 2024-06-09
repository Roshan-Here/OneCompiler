from django.test import TestCase

# Create your tests here.
# https://github.com/nikhil-ravi/LeetScrape - used this package
# due to some issue used https://github.com/eugenebaraka/LeetScrape.git for some updation
from leetscrape import GetQuestionsList
from leetscrape import GetQuestion
import os,re,time
import csv
import json
def scrape_leetcode_to_csv():
    ls = GetQuestionsList()
    ls.scrape()  # Scrape the list of questions
    os.makedirs("./tests/data/")
    ls.to_csv(directory="./tests/data/")
    print("to csv done.")    
    
# scrape_leetcode_to_csv()

# sample json format to be converted to :
json_format = {
    "QID":"",
    "title":"",
    "titleSlug":"",
    "difficulty":"",
    "acceptanceRate":"",
    "paidOnly"  :"",
    "topicTags" :"",
    "categorySlug" :"",
}

def csv_to_json(filename,json_file_name):
    """ 
    Convert csv to json
    """
    json_data = []
    
    with open(csv_filename, mode='r', encoding='utf-8') as csvfile:
        csv_reader = csv.reader(csvfile)
        for row in csv_reader:
            # this is how sample data looks.
            # ['1', 'Two Sum', 'two-sum', 'Easy', '52.761508793067065', 'False', 'array,hash-table', 'algorithms']
            # print(row)
            json_cpy = json_format.copy()
            json_cpy['QID'] = row[0] 
            json_cpy['title'] = row[1] 
            json_cpy['titleSlug'] = row[2] 
            json_cpy['difficulty'] = row[3] 
            json_cpy['acceptanceRate'] = row[4] 
            json_cpy['paidOnly'] = row[5] 
            json_cpy['topicTags'] = row[6] 
            json_cpy['categorySlug'] = row[7] 
            json_data.append(json_cpy)
            # break
    # print(json_data)

    # copying data to json file
    with open(json_file_name, 'w',encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=4)
    print("Done copying data into json file")

csv_filename = './tests/data/questions.csv'
json_file_name = './tests/data/questions.json'
required_json_file_name = './tests/data/required_format.json'


# csv_to_json(csv_filename,json_file_name)

# question = GetQuestion(titleSlug="add-two-numbers").scrape()
# print(question)
# print(question.title) # Question title
# print(question.titleSlug) # Question title slug
# print(question.difficulty) # Question difficulty
# print(question.Hints) # Question hints
# print(question.Companies) # Question companies
# print(question.topics) # Question topic tags
# print(question.SimilarQuestions) # Similar questions ids
# print(question.Code) # Code stubs
# print(question.Body) # Question body / problem statement
# print(question.isPaidOnly) 

# print(problem_description)

def sorting_the_questions(json_filename,required_json_file_name):
    """
        sorting the required data for the OneCompiler
        read json file with non paid question names
        then scrap the detailed questions into required json file  
    """
    with open(json_filename, 'r', encoding='utf-8') as jsonfile:
        json_data = json.load(jsonfile)
    
    # Filtered  "paidOnly" is "False"
    filtered_items = [item for item in json_data if item["paidOnly"] == "False"]
    
    complete_data = []
    
    for items in filtered_items:
        titelslug = items["titleSlug"]
        try:
            print(titelslug)
            question = GetQuestion(titleSlug=titelslug).scrape()
            # time.sleep(1)
            Title = question.title
            difficulty = question.difficulty
            # q = str(question)
            ques = f"""{question}"""
            # print(ques)
            # regex generated using
            # https://regex-generator.olafneumann.org/?sampleText=**Example%201%3A**%20%20%20%20%60%60%60%20%20**Input%3A**%20nums%20%3D%20%5B2%2C7%2C11%2C15%5D%2C%20target%20%3D%209%20**Output%3A**%20%5B0%2C1%5D%20**Explanation%3A**%20Because%20nums%5B0%5D%20%2B%20nums%5B1%5D%20%3D%3D%209%2C%20we%20return%20%5B0%2C%201%5D.%20%20%60%60%60%20%20**Example%202%3A**%20%20%20%20%60%60%60%20%20**Input%3A**%20nums%20%3D%20%5B3%2C2%2C4%5D%2C%20target%20%3D%206%20**Output%3A**%20%5B1%2C2%5D%20%20%60%60%60%20%20**Example%203%3A**%20%20%20%20%60%60%60%20%20**Input%3A**%20nums%20%3D%20%5B3%2C3%5D%2C%20target%20%3D%206%20**Output%3A**%20%5B0%2C1%5D%20%20%60%60%60&flags=i
            
            example_pattern = re.compile(
                r"\*\*Example \d+:\*\*\s*```(?:\s*\*\*Input:\*\*\s*nums\s*=\s*\[(.*?)\],\s*target\s*=\s*(\d+)\s*\*\*Output:\*\*\s*(\[.*?\])(?:\s*\*\*Explanation:\*\*\s*(.*?))?\s*)```",
                re.DOTALL
            )
            # Find all matches
            matches = example_pattern.findall(ques)
            # print(matches)
            examples = []
            try:
                for match in matches:
                    input_list = match[0]
                    target = match[1]
                    output_list = match[2]
                    explanation = match[3].strip() if match[3] else None
                    example = {
                        'Input': input_list,
                        'Output': output_list,
                        'Target': target,
                        'Explanation': explanation
                    }
                    examples.append(example)
            except Exception as e:
                print(f"Error {e}")
                
            # print(examples)
            """
                description part
            """
            lines = ques.strip().split('\n')

            # Find the index of the line starting with '**Example'
            example_start_index = lines.index(next(line for line in lines if line.startswith('**Example')))

            # Extract the problem description lines and remove asterisks
            problem_description = '\n'.join(line.strip('*') for line in lines[1:example_start_index])

            # print(problem_description)
            
            required_json_data = {
                "Title": Title,
                "slug": titelslug,
                "description": problem_description,
                "difficulty": difficulty,
                "examples": examples
            }
            complete_data.append(required_json_data)
            # print(required_json_data)
            # break
        except Exception as e:
            print(f"Error while fetching data {titelslug} && {e}")
    
    with open(required_json_file_name, 'w',encoding='utf-8') as jsonfile:
        json.dump(complete_data, jsonfile, indent=4)    
    
        
# sorting_the_questions(json_file_name,required_json_file_name)

def do_some_crazy_shit():
    question = GetQuestion(titleSlug="word-frequency").scrape()
    # time.sleep(1)
    Title = question.title
    difficulty = question.difficulty
    # q = str(question)
    ques = f"""{question}"""
    print(ques)
    example_pattern = re.compile(
    r"\*\*Example\s*\d*:\*\*\s*"  # Match Example header
    r"(?:\n```(?:\s*`{3}\s*)?)"   # Match opening ``` with optional whitespace
    r"(.*?)\n"                    # Match and capture input section
    r"(?:```)"                    # Match closing ```
    r"(.*?)"                      # Match and capture output section inside ```
    r"(?:\n```)?", 
        re.IGNORECASE
    )# Find all matches
    matches = example_pattern.findall(ques)
    # print(matches)

    examples = []

    for match in matches:
        input_text = re.sub(r'\*\*Input\**:?', '', match[0], flags=re.IGNORECASE).strip()
        output_text = re.sub(r'\*\*Output\**:?', '', match[1], flags=re.IGNORECASE).strip()
        explanation_text = re.sub(r'\*\*Explanation\**:?', '', match[2], flags=re.IGNORECASE).strip() if match[2] else None
        
        example = {
            'Input': input_text,
            'Output': output_text,
            'Explanation': explanation_text
        }
        examples.append(example)

    print(examples)

do_some_crazy_shit()
    
def clean_data(text, label):
    return re.sub(fr'^\*\*{label}\**:?\s*', '', text, flags=re.IGNORECASE).strip()
     
def doing_crazy_shit(text, title_slug):
    patterns = [
        re.compile(
            r"\*\*Example \d+:\*\*\s*"
            r"!?\[.*?\]\(.*?\)?\s*"
            r"```\s*"
            r"\*\*Input\**:?\s*(.*?)\s*"
            r"\*\*Output\**:?\s*(.*?)\s*"
            r"(?:\*\*Explanation\**:?\s*(.*?))?\s*"
            r"```",
            re.DOTALL
        ),
        re.compile(
            r"\*\*Example \d+:\*\*\s*"
            r"```"
            r"\s*\*\*Input\**:?\s*(.*?)"
            r"\s*\*\*Output\**:?\s*(.*?)"
            r"(?:\s*\*\*Explanation\**:?\s*(.*?))?"
            r"\s*```",
            re.DOTALL
        ),
        re.compile(
            r"\*\*Example \d+:\*\*\s*"
            r"(\*\*Input\**:?[\s\S]*?)"
            r"(\*\*Output\**:?[\s\S]*?)"
            r"(\*\*Explanation\**:?[\s\S]*?)?"
            r"(?=\*\*Example|\Z)",
            re.DOTALL
        )
    ]
    # patterns = [
    #     re.compile(
    #         r"\*\*Example \d+:\*\*\s*```"
    #         r"\s*\*\*Input:\*\* (.*?)"
    #         r"\s*\*\*Output:\*\* (.*?)"
    #         r"(?:\s*\*\*Explanation:\*\* (.*?))?"
    #         r"\s*```",
    #         re.DOTALL
    #     ),
    #     re.compile(
    #         r"\*\*Example \d+:\*\*\s*```"
    #         r"\s*\*\*Input\**:?\s*(.*?)"
    #         r"\s*\*\*Output\**:?\s*(.*?)"
    #         r"(?:\s*\*\*Explanation\**:?\s*(.*?))?"
    #         r"\s*```",
    #         re.DOTALL
    #     ),
    #     re.compile(
    #         r"\*\*Example \d+:\*\*\s*"
    #         r"(\*\*Input\**:?[\s\S]*?)"
    #         r"(\*\*Output\**:?[\s\S]*?)"
    #         r"(\*\*Explanation\**:?[\s\S]*?)?"
    #         r"(?=\*\*Example|\Z)",
    #         re.DOTALL
    #     ),
    #     re.compile(
    #         r"\*\*Example \d+:\*\*\s*"
    #         r"!?\[.*?\]\(.*?\)?\s*"
    #         r"```\s*"
    #         r"\*\*Input:\*\*\s*(.*?)\s*"
    #         r"\*\*Output:\*\*\s*(.*?)\s*"
    #         r"(?:\*\*Explanation:\*\*\s*(.*?))?\s*"
    #         r"```",
    #         re.IGNORECASE
    #     )
    # ]
        
    for pattern in patterns:
        matches = pattern.findall(text)
        if matches:
            examples = []
            for match in matches:
                input_text = clean_data(match[0], 'Input')
                output_text = clean_data(match[1], 'Output')
                explanation_text = clean_data(match[2], 'Explanation') if len(match) > 2 and match[2] else None
                
                example = {
                    'Input': input_text,
                    'Output': output_text,
                    'Explanation': explanation_text
                }
                examples.append(example)
            return examples
    print(f"No examples found for Titleslug: {title_slug}")
    exit()
    return []



def fall_guy():
    json_file_name = './tests/data/questions.json'

    with open(json_file_name, 'r', encoding='utf-8') as jsonfile:
        json_data = json.load(jsonfile)

    filtered_items = [item for item in json_data if item["paidOnly"] == "False"]
    for items in filtered_items:
        titelslug = items["titleSlug"]
        try:
            print(titelslug)
            question = GetQuestion(titleSlug=titelslug).scrape()
            time.sleep(1)
            Title = question.title
            # q = str(question)
            ques = f"""{question}"""
            example_data = doing_crazy_shit(ques, titelslug)
            print(example_data)
        except Exception as e:
            print(f"Err : {e}")
            
# fall_guy()