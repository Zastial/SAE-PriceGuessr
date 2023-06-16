import ikea_api
import json

path = "./ikea_cache.json"

with open(path, "w") as f:
    ret = []
    constants = ikea_api.Constants(country="fr", language="fr")
    ikeaProducts = ikea_api.run(ikea_api.Search(constants).search("",limit=40_000))['searchResultPage']['products']['main']['items']
    for p in ikeaProducts:
        if "id" not in p['product'] or "name" not in p['product'] or "salesPrice" not in p['product'] or "mainImageUrl" not in p['product'] or "mainImageAlt" not in p['product']:
            continue
        product = {}
        product['id'] = p['product']['id']
        product['title'] = p['product']['name']
        product['price'] = round(p['product']['salesPrice']['numeral'])
        product['imgSrc'] = p['product']['mainImageUrl']
        product['desc'] = p['product']['mainImageAlt']
        ret.append(product)
    f.write(json.dumps(ret, indent=4))
    f.close()
