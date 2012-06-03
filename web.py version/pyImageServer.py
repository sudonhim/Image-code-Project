import web, os, time, ast
from web import form
from PIL import Image
from numpy import zeros
from math import *
from SyntaxChecker import SyntaxChecker

MAIN_URL = "http://127.0.0.1/"

URLS = (
    '/',            'index',
    '/submit',      'submit',
    '/images/(.*)', 'images',
    '/temp/(.*)',   'tempimage',
    '/mappy',       'mappy'
    )

render = web.template.render('templates/')

def loadImages():
    fnames = os.listdir(os.curdir+'/images')
    images = []
    for name in fnames:
        print name
        if name.split('.')[-1] == 'png' and len(name.split('-')) == 2:
            username, date = name.split('.')[0].split('-')
            images.append( (username, name, date) )
    return sorted(images, key=lambda image: image[2], reverse=True)

savedimages = loadImages()

def generateImage(imgfunc, sizex, sizey):
        imgarray = zeros((sizey,sizex,3),'uint8')
        for x in xrange(sizex):
            xrel = float(x)/sizex
            for y in xrange(sizey):
                yrel = float(y)/sizey
                imgarray[y,x] = imgfunc(xrel,yrel)
        img = Image.fromarray(imgarray)
        return img
        
       
class index:
    def GET(self):
        imgurls, contribs = [],[]
        for img in savedimages:
            contribs.append(img[0])
            imgurls.append("images/"+img[1])
        return render.index(imgurls,contribs)

submit_form = form.Form( form.Textarea("code",description="   ", rows=15, cols=52 ,
                                       value="r = 255*x\ng = 255*y\nb = 0"),
                         form.Textbox("user",description= "Your name: "),
                         form.Button("Preview"),
                         form.Button("Submit"))
syntax_checker = SyntaxChecker()
class submit:
    def GET(self):
        form1 = submit_form()
        return render.submit(form1, imageurl=None, err=None)
    
    def POST(self):
        form1 = submit_form()
        if not form1.validates():
            return render.submit(form1, imageurl=None, err=None)
        else:
            return self.handleSyntax(form1)
        
    def handleSyntax(self, form1):
        print form1.d
        syntax = form1["code"].value
        user = form1["user"].value
        try:
            syntax_checker.check(syntax)
        except SyntaxError as e:
            return render.submit(form1, imageurl=None, err=str(e))
        syntax_complete = "def getPixel( x,y ):\n"
        for line in syntax.split('\n'):
            syntax_complete += "   "+line
        syntax_complete += "\n   return r%256,g%256,b%256"
        try:
            exec(syntax_complete)
            if form1["Preview"].value!=None:
                img = generateImage(getPixel,200,200)
                img_fname = "temp/"+"tmpimg"+".png"
                img.save(img_fname)
                return render.submit(form1, imageurl=img_fname, err=None)
            elif form1["Submit"].value!=None and form1["Preview"].value==None:
                img = generateImage(getPixel,450,450)
                img_fname = user+"-"+str(int(time.time()))
                img.save("images/"+img_fname+".png")
                f = open("images/"+img_fname+".py", 'w')
                f.write(syntax_complete)
                f.close()
                savedimages.insert( 0,(user, img_fname+'.png', str(int(time.time()))) )
                return index().GET()
            else:
                return render.submit(form1, imageurl=None, err=str(form1["Preview"])+", "+str(form1["Submit"]))
        except Exception as e:
            return render.submit(form1, imageurl=None, err=str(e))
        
    
class images:
    def GET(self,name):
        if name in os.listdir('images'):  # Security
            web.header("Content-Type", "images/png") # Set the Header
            return open('images/%s'%name,"rb").read() # Notice 'rb' for reading images
        else:
            raise web.notfound()
        
class tempimage:
    def GET(self,name):
        if name in os.listdir('temp'):  # Security
            web.header("Content-Type", "temp/png") # Set the Header
            return open('temp/%s'%name,"rb").read() # Notice 'rb' for reading images
        else:
            raise web.notfound()
        
class mappy:
    def GET(self):
        return render.mappy()
    
    
if __name__ == '__main__':
    app = web.application(URLS, globals())
    app.run()