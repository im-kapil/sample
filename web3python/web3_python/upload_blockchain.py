import web3
# web3 = Web3(Web3.HTTPProvider("https://rpc-mumbai.maticvigil.com/"))
# CAddress ='0x13A0e0361C80Acf74E71a732a27d29238E9a8003'
# abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NoOfScript","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"string","name":"_previewName","type":"string"},{"internalType":"string","name":"_url","type":"string"}],"name":"createPreView","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"createUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"deleteUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"string","name":"","type":"string"}],"name":"preview","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_scriptName","type":"string"},{"internalType":"string","name":"_encryptedURL","type":"string"}],"name":"registerScript","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"scriptDetails","outputs":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"scriptName","type":"string"},{"internalType":"string","name":"encryptedURL","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"viewScriptDetails","outputs":[{"components":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"scriptName","type":"string"},{"internalType":"string","name":"encryptedURL","type":"string"}],"internalType":"struct myNextFilm.script[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]'
# privatekey = "0xd3109c0a2b5fdbde484d8769d406dd95cbe626374bdfdf25f99e38b14717a5e6"
# contractInst = web3.eth.contract(address = CAddress,abi = abi)
# acc1 = '0xDA48407913B731Ae29Db9635B45B5493879e3559'
# nonce = web3.eth.getTransactionCount(acc1)
# NoScript = contractInst.functions.NoOfScript().call()
# print("No of script are",NoScript)
# upload_one_pager = contractInst.functions.createUserProfile("U2FsdGVkX1+Wdg7Ea6HpPC26KDjESbXtCw1G/kEQGTviKZl5CX4COI9zFe2zot7M", "U2FsdGVkX1+Wdg7Ea6HpPC26KDjESbXtCw1G/kEQGTviKZl5CX4COI9zFe2zot7M").buildTransaction({
#     "gasPrice":web3.eth.gas_price,
#     "chainId" : 80001,
#     "from" : acc1,
#     "nonce": nonce
# })
# signed_transaction = web3.eth.account.sign_transaction(upload_one_pager,private_key = privatekey)
# transaction_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
# transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)
# print("\n \n Blockchain Transaction",transaction_receipt)




























# from web3 import Web3

# web3 = Web3(Web3.HTTPProvider("https://rpc-mumbai.maticvigil.com/"))
# CAddress = "0x13A0e0361C80Acf74E71a732a27d29238E9a8003"
# abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"NoOfScript","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"string","name":"_previewName","type":"string"},{"internalType":"string","name":"_url","type":"string"}],"name":"createPreView","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"createUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"deleteUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"string","name":"","type":"string"}],"name":"preview","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_scriptName","type":"string"},{"internalType":"string","name":"_encryptedURL","type":"string"}],"name":"registerScript","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"scriptDetails","outputs":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"scriptName","type":"string"},{"internalType":"string","name":"encryptedURL","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"viewScriptDetails","outputs":[{"components":[{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"scriptName","type":"string"},{"internalType":"string","name":"encryptedURL","type":"string"}],"internalType":"struct myNextFilm.script[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}]'
# contractInst = web3.eth.contract(address=CAddress, abi=abi)
# privatekey = "0xd3109c0a2b5fdbde484d8769d406dd95cbe626374bdfdf25f99e38b14717a5e6"
# acc1 = "0xDA48407913B731Ae29Db9635B45B5493879e3559"
# nonce = web3.eth.getTransactionCount(acc1)

# def upload_to_blockchain(cid, file_from):
#   print("\n \n \n Blockchain \n \n \n",cid,file_from)  
#   upload_one_pager = contractInst.functions.createPreView("U2FsdGVkX1+Wdg7Ea6HpPC26KDjESbXtCw1G/kEQGTviKZl5CX4COI9zFe2zot7M","Asha-J", cid).buildTransaction({
#     "gasPrice":web3.eth.gas_price,
#     "chainId" : 80001,
#     "from" : acc1,
#     "nonce": nonce 
#   })
#   signed_transaction = web3.eth.account.sign_transaction(upload_one_pager,private_key = privatekey)
#   transaction_hash = web3.eth.send_raw_transaction(signed_transaction.rawTransaction)
#   transaction_receipt = web3.eth.wait_for_transaction_receipt(transaction_hash)
#   print("\n \nBlockchain Transaction",transaction_receipt)
  # success = True
  # return success
# NoScript = contractInst.functions.NoOfScript().call()
# print("No of script are",NoScript)