from pathlib import Path
import base64,pathlib
d=pathlib.Path(__file__).parent
t=(d/'template.html').read_text()
fa=base64.b64encode(open(''+str(d/'fonts'/'archivo-latin-standard-normal.woff2')+'','rb').read()).decode()
for k,f in [('__CSS__','styles.css'),('__BASE__','base.js'),('__DATA__','data.js'),('__APP__','app.js'),('__WEB__','web.js'),('__NOTES__','notes.js'),('__MAIN__','main.js'),('__DECK__','deck.js'),('__DCSS__','deck.css')]:
    t=t.replace(k,(d/f).read_text())
t=t.replace('__ARCHIVO__',fa)
lg=lambda f: 'data:image/png;base64,'+base64.b64encode((d/'assets'/f).read_bytes()).decode()
t=t.replace('__LOGOW2_SRC__',lg('logo-w.png'))
import io,glob
from PIL import Image
def faces(prefix):
    out=[]
    for g in sorted(glob.glob(str(d/'assets'/'faces'/(prefix+'*')))):
        im=Image.open(g).convert('RGB'); W,H=im.size; cw,ch=W/4,H/4
        for r in range(4):
            for c in range(4):
                x0,y0=c*cw,r*ch
                t=im.crop((int(x0+cw*.09),int(y0+ch*.03),int(x0+cw*.91),int(y0+ch*.85))).resize((160,160),Image.LANCZOS)
                buf=io.BytesIO(); t.save(buf,'JPEG',quality=78); out.append('data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode())
    return out
import json
def dimgs():
    out={}
    for g in sorted(glob.glob(str(d/'assets'/'deck'/'*'))):
        im=Image.open(g).convert('RGB'); w,h=im.size; s=min(1.0,1600/w); im=im.resize((int(w*s),int(h*s)),Image.LANCZOS)
        buf=io.BytesIO(); im.save(buf,'JPEG',quality=70,optimize=True,progressive=True)
        out[Path(g).stem]='data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()
    return out
def devs():
    out={}
    for g in sorted(glob.glob(str(d/'assets'/'dev'/'*.webp'))):
        out[Path(g).stem]='data:image/webp;base64,'+base64.b64encode(open(g,'rb').read()).decode()
    return out
def thumbs():
    out={}
    for n,box in {'ball':(495,525,1795,1825),'volley':(322,384,1472,1534),'cards':(228,445,1628,1845),'trophy':(228,630,1628,2030)}.items():
        im=Image.open(str(d/'assets'/'deck'/(n+'.jpg'))).convert('RGB').crop(box).resize((240,240),Image.LANCZOS)
        buf=io.BytesIO(); im.save(buf,'JPEG',quality=82); out['th_'+n]='data:image/jpeg;base64,'+base64.b64encode(buf.getvalue()).decode()
    return out
FX='const DEV='+json.dumps(devs())+';const DIMG='+json.dumps({**dimgs(),**thumbs()})+';const FACES_F='+json.dumps(faces('f'))+';const FACES_M='+json.dumps(faces('m'))+';'
t=t.replace('__LOGOS__',FX+'__LOGOS__')
t=t.replace('__LOGOS__',f"const LOGO='{lg('logo.png')}';const LOGO_W='{lg('logo-w.png')}';")
(d.parent/'index.html').write_text(t); print(len(t))
