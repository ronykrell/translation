import requests


payload = {'token':'7cdbce252f234e5a8276746c854fd377','include':'image','lang': 'en', 'top_entities': '2','min_confidence':'0'}
payload['text']='I am in pain'
r = requests.get('https://api.dandelion.eu/datatxt/nex/v1/',params=payload)
res = r.json()
print res
# print res['annotations']
if len(res['annotations']) > 0 and res['annotations'][0]['image']:
	img_title = res['annotations'][0]['title']
	keyword = res['annotations'][0]['spot']
	print img_title
	print keyword
	print res['annotations'][0]['image']['full']

	if img_title != keyword:
		print "Looking in Google 1"
		payload_google = {'q':keyword,'num':'1','start':'1','imgSize':'medium','key':'AIzaSyC_qda0zY8If4-12mG9kAXK1DxyEWt7fUE','cx':'016857702408260272619:uog-qqwz-hi'}
		r_google = requests.get("https://www.googleapis.com/customsearch/v1", params=payload_google) 
		res = r_google.json()
		print res


if len(res['annotations']) > 1 and res['annotations'][1]['image']:
	img_title = res['annotations'][1]['title']
	keyword = res['annotations'][1]['spot']
	print img_title
	print keyword
	# print res['annotations'][1]['image']['full']

	if img_title != keyword:
		print "Looking in Google 2 "
		payload_google = {'q':keyword,'num':'1','start':'1','imgSize':'medium','key':'AIzaSyC_qda0zY8If4-12mG9kAXK1DxyEWt7fUE','cx':'016857702408260272619:uog-qqwz-hi'}
		r_google = requests.get("https://www.googleapis.com/customsearch/v1",params=payload_google) 
		res = r_google.json()["items"][0]["pagemap"]["cse_image"][0]["src"]
		# print r_google.url
		print res

