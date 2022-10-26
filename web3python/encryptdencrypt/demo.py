from Crypto.Cipher import AES

key = "rg rgrg rg"
key1 = len(key)

if(len(key)!=32):
    key = key.ljust(32,"p")
print(key1)
print(key)


obj = AES.new(key, AES.MODE_CBC, 'This is an IV456')

message = "QmPLhZXbzKGYTLRZZPJHPoJ7a9HoN1wZijDBvdyxPoYTKn"

key2 = len(message)

print("..............>",key2)

if(len(message)!=64):
    message = message.ljust(64," ")
print(message)
ciphertext = obj.encrypt(message)
print(".............>>>>>>>>>>>>>>>>>>>",ciphertext)


# ciphertext = b'\xb1\xc0\xf0\x8c\x00\xdc\xe5i\x10m0\x13\x80s_\x04\xe9\xc6\xa7\xber\xbd-\xaeb\xe3s\x10\xceq\xdb\xf2Q\xc9K^\xde:*\x01\xcb\xcc\xbf\xd4\xe6\xae\x9b\xbe\xdc\xd0M\t\xd2\x88\xb9?Ga\xfc\xb6\xbalxG'
obj2 = AES.new(key, AES.MODE_CBC, 'This is an IV456')
x= obj2.decrypt(ciphertext)
y = str(x).replace(" ","")
a= len(y)
p= y[2:a-1]
print("final cid.>>>>>>>>>>>>>>>>",p)
