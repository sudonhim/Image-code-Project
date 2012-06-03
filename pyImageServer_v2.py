from bottle import route, post, request, run, static_file, redirect, template, CherryPyServer
import bottle
import re

import os, time, re, multiprocessing, base64
from PIL import Image
from numpy import zeros
from math import *
from random import *
from SyntaxChecker import SyntaxChecker


@route('/')
def index():
    imgurls, contribs = [],[]
    for img in Saved_Images:
        contribs.append(img[0])
        imgurls.append(img[1])
    return template('index',imageurls=imgurls,contributors=contribs)


@route('/js/<fname:path>')
def image(fname):
    return static_file(fname, root=os.curdir+"/js")


@route('/images/<fname:path>')
def image(fname):
    return static_file(fname, root=os.curdir+"/images")


@route('/code/<fname:path>')
def view_source(fname):
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
    return template('help')
    
    

@route('/submit')
def submit():
    return template('submit')

@route('/submit/<fname:path>')
def submit_derivative(fname):
    try:
        code = ""
        lines = re.split('\n|\r', open(os.curdir+'/images/'+fname).read())
        for line in lines[1:-1]: code += line[3:]+'\n'
    except IOError:
        code = ("Are you -trying- to break me?\n"+
                "That source file doesn't exist.")
    return template('submit', ucode=code)


@post('/submit/<fname:path>')
def submit_derivative_POST(fname):
    return submit_POST()

@post('/submit')
def submit_POST():
    user = request.forms.get('user')
    code = request.forms.get('code')
    preview = request.forms.get('Preview')
    if preview != "":
        user = re.sub('[^0-9a-zA-Z_ ]', '', user) #remove invalid chars
        user = re.sub('^[^a-zA-Z_]+', '', user)  #remove invalid whitespace
    try:
        if preview == "":
            handleSyntax(code, user, preview=True)
            return template('submit', ucode=code, imageurl='/images/temp/tmpimg.png')
        elif submit:
            handleSyntax(code, user)
            return redirect('/')
    except Exception as e:
        return template('submit', ucode=code, err=str(e))
        
@post('/imageSubmitted')
def submit_image_POST():
    user = request.forms.get('user')
    code = request.forms.get('code')
    user = re.sub('[^0-9a-zA-Z_ ]', '', user) #remove invalid chars
    user = re.sub('^[^a-zA-Z_]+', '', user)  #remove invalid whitespace
    if (user == ''):
        user = 'Anonymous'
    uri = request.forms.get('uri')
    uri = uri + '=' * (4 - len(uri) % 4)
    uri = re.search(r'base64,(.*)', uri).group(1)
    data = base64.urlsafe_b64decode(uri)
    saveImage(data, code, user)
  

########################################################################
##  Image and code handling  ###########################################

def loadImages():
    fnames = os.listdir(os.curdir+'/images')
    images = []
    for name in fnames:
        if name.split('.')[-1] == 'png' and len(name.split('-')) == 2:
            username, date = name[:-4].split('-')
            name = name[:-4]
            images.append( (username, name, date) )
    return sorted(images, key=lambda image: image[2], reverse=True)


def generateImage(imgfunc, sizex, sizey, out):
    print "\n################## Processing code..."
    try:
        exec(imgfunc) #defines getPixel
        imgarray = zeros((sizey,sizex,3),'uint8')
        for x in xrange(sizex):
            xrel = float(x)/sizex
            for y in xrange(sizey):
                yrel = float(y)/sizey
                imgarray[y,x] = getPixel(xrel,yrel)
        out.put(imgarray)
    except Exception as e:
        out.put(str(e))
    print "################## Completed...\n"


    
def generateImage_Timebox(imgfunc, sizex, sizey, timeout):
    q = multiprocessing.Queue()
    p = multiprocessing.Process(target=generateImage, args=(imgfunc, sizex, sizey, q))
    p.start()
    out = None
    for i in xrange(10*timeout):
        time.sleep(0.1)
        try:
            out = q.get_nowait()
            break
        except:
            pass
        
    if out == None:
        p.terminate()
        raise SyntaxError("Execution timed out!")
    elif type(out)==str:
        raise SyntaxError(out)
    else:
        return Image.fromarray(out)

def handleSyntax(syntax, user, preview=False):
    Syntax_Checker.check(syntax)
    syntax_complete = "def getPixel( x,y ):\n"
    for line in syntax.split('\n'):
        syntax_complete += "   "+line
    syntax_complete += "\n   return r%256,g%256,b%256"
    if preview:
        img = generateImage_Timebox(syntax_complete,200,200,timeout=5)
        img_fname = "images/temp/"+"tmpimg"+".png"
        img.save(img_fname)
        return template('submit', imageurl=img_fname)
    else:
        img = generateImage_Timebox(syntax_complete,450,450,timeout=30)
        img_fname = user+"-"+str(int(time.time()))
        img.save("images/"+img_fname+".png")
        f = open("images/"+img_fname+".py", 'w')
        f.write(syntax_complete)
        f.close()
        Saved_Images.insert( 0,(user, img_fname, str(int(time.time()))) )
        #Redirect to index
        redirect('/')
        
def saveImage(data, code, user):
    img_fname = user+"-"+str(int(time.time()))
    f = open("images/"+img_fname+".png", 'wb')
    f.write(data)
    f.close()
    f = open("images/"+img_fname+".js", 'w')
    code = 'function setPixel(x,y) {\n  ' + code.replace('\n', '\n  ') + '\n}';
    f.write(code)
    f.close()
    Saved_Images.insert( 0,(user, img_fname, str(int(time.time()))) )
    #Redirect to index
    redirect('/')

    

########################################################################
if __name__ == '__main__':
    Saved_Images = loadImages()
    Syntax_Checker = SyntaxChecker()
    debug = True
    if debug:
        bottle.debug()
        host = 'localhost'
    else:
        host = 'metahub-remote.no-ip.info'
    run(server='cherrypy', host=host, port=80)
