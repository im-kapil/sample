import requests

url = 'https://w3schools.com/python/demopage.php'
myobj = {10: 123456}

#use the 'auth' parameter to send requests with HTTP Basic Auth:
x = requests.post(url, data = myobj, auth = ('user', 'pass'))

print(x.status_code)