import json
import urllib.request

url = 'https://square-eight.net/api/batch/reservations/remind_date_notifications'
data = {
    'text': text,
}
headers = {
    'Content-Type': 'application/json',
}

def get_request(event, context):
    print("exec http post")
    req = urllib.request.Request(url, json.dumps(data).encode(), headers)
    with urllib.request.urlopen(req) as res:
        body = res.read()
        return(body)
def lambda_handler(event, context):
    return get_request(event, context)
