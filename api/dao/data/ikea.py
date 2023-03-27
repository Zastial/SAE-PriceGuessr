import ikea_api
import json
import sys
import random
import time

constants = ikea_api.Constants(country="fr", language="fr")
ikeaProducts = ikea_api.run(ikea_api.Search(constants).search("",limit=100))['searchResultPage']['products']['main']['items']

product = ikeaProducts[0]['product']
print(product.keys())
print(product['mainImageAlt'])

## print(json.dumps(ikeaProducts, indent=4), flush=True)