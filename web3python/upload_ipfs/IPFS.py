#! C:\Users\RAJDEEP\AppData\Local\Programs\Python\Python37-32\python.exe
import cgi,os,requests
print('content-type:text/html\r\n\r\n')
#form = cgi.FieldStorage()
#fle = form['file-input']​

projectId = "2FNjE1lCSxe3pPGK3H8FH1gMdT4"
projectSecret = "9466554632345d063b3ecfeb140d1b3e"
endpoint = "https://ipfs.infura.io:5001"

### CREATE AN ARRAY OF TEST FILES ###
files = {
    'file': 'myNFT.png'
}

# print(files)

### ADD FILE TO IPFS AND SAVE THE HASH ###
response1 = requests.post(endpoint + '/api/v0/add', files=files, auth=(projectId, projectSecret))

# print(files=files)
print(response1)
print(response1.text)
hash = response1.text.split(",")[1].split(":")[1].replace('"','')
print("this is my hash",hash)

### READ FILE WITH HASH ###
# params = {
#     'arg': hash
# }
# response2 = requests.post(endpoint + '/api/v0/cat', params=params, auth=(projectId, projectSecret))
# print(response2)
# print(response2.text)

### REMOVE OBJECT WITH PIN/RM ###
# response3 = requests.post(endpoint + '/api/v0/pin/rm', params=params, auth=(projectId, projectSecret))
# print(response3.json())