import json, os

def make_questions_json(blob):
    index = 1
    d = {}
    lines = blob.split("\n")
    for line in lines:
        print(line.split("  "))
        sent, correct = line.split("  ")
        d[str(index) + ". " + sent] = correct
        print(sent, correct)
        index += 1
    json_blob = json.dumps(d, sort_keys=True)
    return json_blob
    
# ~ print(make_questions_json("""The school is big.  yes
# ~ The school is small.  no
# ~ The school is green.  no"""))

def make_cvc_lesson(imgs_location):
    imgs = [x for x in os.listdir(imgs_location) if x.endswith("jpg") or x.endswith(".jpeg") or x.endswith(".gif") or x.endswith(".png")]
    d = {}
    for p in imgs:
        letters = [x + ".mp3" for x in list(p.rsplit(".", 1)[0])]
        d[p] = letters
    json_blob = json.dumps(d, sort_keys=False)
    return json_blob
    
print(make_cvc_lesson("./Sound-Spelling/images/"))