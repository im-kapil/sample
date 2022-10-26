from cryptography.fernet import Fernet

# we will be encrypting the below string.
message = "pravesh yadav"

# generate a key for encryption and decryption
# You can use fernet to generate
# the key or use random key generator
# here I'm using fernet to generate key

# key = Fernet.generate_key()
key = "SiJzkBarUWzhcY-b34fDAheoUGgct_Y804UDswawqIM=" 


print("this is first key",key)

# Instance the Fernet class with the key

fernet = Fernet(key)

# then use the Fernet class instance
# to encrypt the string string must
# be encoded to byte string before encryption
encMessage = fernet.encrypt(message.encode())

print("original string: ", message)
print("encrypted string: ", encMessage)

# decrypt the encrypted string with the
# Fernet instance of the key,
# that was used for encrypting the string
# encoded byte string is returned by decrypt method,
# so decode it to string with decode methods
decMessage = fernet.decrypt(encMessage).decode()

print("decrypted string: ", decMessage)


# data_encrypter = DataEncrypter(
#     Pbkdf2Sha512(1024 * 1024)
# )
# data_encrypter.Encrypt(data, ["test_pwd"], ["test_salt"])
# enc_data = data_encrypter.GetEncryptedData()

