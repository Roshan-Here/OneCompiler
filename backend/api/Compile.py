from pyston import PystonClient, File
import time
import psutil

# implemented here
# https://github.com/Roshan-Here/Django-React-NotesApp/blob/react/backend/api/tests.py
async def run_my_code(lang,code):
    client = PystonClient()
    output = await client.execute(lang,[File(code)])
    print(output)
    return output
    
def get_memory_usage():
    process = psutil.Process()
    return process.memory_info().rss
    
# async def get_run_time():
#     """
#     code to get run time, and memory of executing code!
#     """
#     process = psutil.Process()
#     start_memory = process.memory_info().rss
    
#     start_time = time.time()
#     await run_my_code(lang,code)