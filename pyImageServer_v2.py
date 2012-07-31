from bottle import route, post, request, run, static_file, redirect
from bottle import template, CherryPyServer
import bottle
import re

bottle.BaseRequest.MEMFILE_MAX = 4000000

import os, time, re, base64, sys
from PIL import Image


@route('/')
def gallery():
    return redirect('/gallery/0')

IMAGES_PER_PAGE = 80
@route('/gallery/<imageNum:int>')
def gallerypages(imageNum):
    print "User arrived at gallery..."
    imgurls, contribs = [],[]
    numberofImages = min(IMAGES_PER_PAGE,len(Saved_Images)-imageNum)
    for img in Saved_Images[imageNum:imageNum+numberofImages]:
        contribs.append(img[0])
        imgurls.append(img[1])
    return template('gallery',
                    imageurls=imgurls,contributors=contribs,
                    imageNum=imageNum,totalImages=len(Saved_Images),
                    imagesPerPage=IMAGES_PER_PAGE)



@route('/js/<fname:path>')
def jsfile(fname):
    return static_file(fname, root=os.curdir+"/js")

@route('/stylesheet.css')
def stylesheet():
    return static_file("stylesheet.css", root=os.curdir)

@route('/images/<fname:path>')
def image(fname):
    return static_file(fname, root=os.curdir+"/images")



@route('/code/<fname:path>')
def view_source(fname):
    print "User viewing source of "+fname
    language = 'generic'
    try:
        code = open(os.curdir+'/images/'+fname+'.js').read()
        language = 'javascript'
    except IOError:
        try:
            code = open(os.curdir+'/images/'+fname+'.py').read()
            language = 'python'
        except IOError:
            code = ("No source found for this image, it may be from an "+
                    "older\nversion of pyImageServer")
    return template('viewsource', code=code, name=fname, language=language)
        
    

@route('/help')
def show_help():
    print "User loaded help..."
    return template('help')
    
    

@route('/submit')
def submit():
    print "User went to submit page..."
    defaultCode = r"r = x * 255;\ng = y * 255;\nb = 0;"
    return template('submit', startWithCode=defaultCode)

@route('/submit/<fname:path>')
def submit_derivative(fname):
    print "User is modifying "+fname
    try:
        code = ""
	codeString = open(os.curdir+'/images/'+fname+'.js').read()
        lines = codeString.splitlines()
        for line in lines[2:-2]: code += line[2:]+'\n'
    except IOError:
        code = ("This is not a valid JavaScript source file.")
    code = code.replace("\n",r"\n")
    code = code.replace("'","\\'")
    return template('submit', startWithCode=code)


        
@post('/imageSubmitted')
def submit_image_POST():
    user = request.forms.get('user')
    code = request.forms.get('code')
    user = re.sub('[^0-9a-zA-Z_ ]', '', user) #remove invalid chars
    user = re.sub('^[^a-zA-Z_]+', '', user)  #remove invalid whitespace
    if (user == ''):
        user = 'Anonymous'
    if len(user)>50:
        user = user[:50]
    uri = request.forms.get('uri')

    if uri[-4:] != '||||':
	return "invalid"
    uri = uri[:-4] + '=' * (4 - len(uri) % 4)
    uri = re.search(r'base64,(.*)', uri).group(1)
    data = base64.urlsafe_b64decode(uri)
    imghash = hash(data)
    if imghash not in Image_Hashes:
        saveImage(data, imghash, code, user)
        return "success"
    else:
        return "duplicate"
    
    
ERROR_MSGS = {"duplicate": "The image you submitted already exists!",
              "invalid"  : "The data recieved was invalid or corrupt."
              }
    
@route('/error/<errorname>')
def errormsg(errorname):
    print "User recieved error: "+errorname
    return template('error', message=ERROR_MSGS[errorname])
  

########################################################################
##  Image and code handling  ###########################################
########################################################################

def loadImages():
    fnames = os.listdir(os.curdir+'/images')
    images = []
    hashes = set()
    used_fnames = set()
    print "Loading/hashing images..."
    for name in fnames:
        if name.split('.')[-1] == 'png' and len(name.split('-')) == 2:
            f = open(os.curdir+'/images/'+name, 'rb')
            hashes.add(hash(f.read()))
            used_fnames.add(name[:-4])
            f.close()
            username, date = name[:-4].split('-')
            name = name[:-4]
            images.append( (username, name, date) )

    print len(hashes), "images loaded."
    return (sorted(images, key=lambda image: image[2], reverse=True),
            hashes, used_fnames)
        
def saveImage(data, imghash, code, user):
    Image_Hashes.add(imghash)
    img_fname = user+"-"+str(int(time.time()*100))
    i=1
    while img_fname in Used_Filenames:
        user+str(i)+"-"+str(int(time.time()*100))
        i +=1
    f = open("images/"+img_fname+".png", 'wb')
    f.write(data)
    f.close()
    f = open("images/"+img_fname+".js", 'w')
    code = 'function setPixel(x,y) {\n  ' + code.replace('\n', '\n  ') + '\n}';
    f.write(code)
    f.close()
    Saved_Images.insert( 0,(user, img_fname, str(int(time.time()))) )
    #Now make thumbnail
    im = Image.open("images/"+img_fname+".png")
    im.thumbnail((200,200), Image.ANTIALIAS)
    im.save("images/thumbnails/"+img_fname+"-thumb.png", "PNG")


if __name__ == '__main__':
    Saved_Images, Image_Hashes, Used_Filenames = loadImages()
    if len(sys.argv) >= 2 and sys.argv[1] != "debug":
		host = sys.argv[1]
		if len(sys.argv) == 3:
			port = int(sys.argv[2])
		else:
			port = 80
    else:
        bottle.debug()
        host = 'localhost'
        port=8080
    run(server = 'cherrypy', host=host, port=port)
