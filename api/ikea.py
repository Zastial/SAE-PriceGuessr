from dotenv import load_dotenv
import ikea_api
import json
import random

constants = ikea_api.Constants(country="fr", language="fr")
ikeaProducts = ikea_api.run(ikea_api.Search(constants).search("",limit=50000))['searchResultPage']['products']['main']['items']
load_dotenv()
random.seed()
ret = []

for i in range(10):
    product = ikeaProducts[random.randrange(0, len(ikeaProducts))]['product']
    productDict = {}
    productDict['id'] = product['id']
    productDict['title'] = product['name']
    productDict['price'] = product['salesPrice']['numeral']
    productDict['imgSrc'] = product['mainImageUrl']
    ret.append(productDict)

print(json.dumps(ret, indent=4))