import requests
from Crypto.Cipher import AES
# from .upload_blockchain import upload_to_blockchain

# uploading files to ipfs
def upload_to_ipfs(contex, key, file_from):
    projectId = "2FNjE1lCSxe3pPGK3H8FH1gMdT4"
    projectSecret = "9466554632345d063b3ecfeb140d1b3e"
    endpoint = "https://ipfs.infura.io:5001"

    files = {
        "files":contex
    }
    
    response1 = requests.post(endpoint + "/api/v0/add", files=files, auth=(projectId, projectSecret))
    print(response1) 
    hash1 = response1.text.split(",")[1].split(":")[1].replace('"', "")
    print(hash1)
    if(len(key)!=32):
        key = key.ljust(32," ")

    obj = AES.new(key, AES.MODE_CBC, 'This is an IV456')
    if(len(hash1)!=64):
        hash1 = hash1.ljust(64," ")
    ciphertext = obj.encrypt(hash1)
    print('\n \n \n \n blockchain \n \n \n \n',ciphertext)
    # upload_to_blockchain(ciphertext,file_from)
    return ciphertext


upload_to_ipfs("pravesh yadav","pravesh","onpager")