# Generira originalne SVG naslovnice za Novosti (prototype/assets/novosti/*.svg): oštar predmet u prvom planu,
# zamućena ekipa košarkašica u daljini (plitka dubina polja).
import random, os
OUT = os.path.join(os.path.dirname(__file__), '..', 'prototype', 'assets', 'novosti')
NAVY, RED, GOLD, SILV = '#182454', '#C04848', '#F0B64E', '#B4C0CC'

def osoba(x, y, s, boja, ruka=False, ball=False):
    # jednostavna silueta igračice (glava, trup, noge), s = mjerilo
    g = f'<g transform="translate({x} {y}) scale({s})">'
    g += f'<circle cx="0" cy="-62" r="9" fill="#e8c9a8"/>'
    g += f'<path d="M-13 -50 Q0 -56 13 -50 L11 -10 L-11 -10 Z" fill="{boja}"/>'
    g += f'<rect x="-11" y="-10" width="9" height="40" rx="3" fill="#2b3566"/><rect x="2" y="-10" width="9" height="40" rx="3" fill="#2b3566"/>'
    if ruka: g += f'<path d="M12 -46 L26 -78" stroke="#e8c9a8" stroke-width="6" stroke-linecap="round"/>'
    if ball: g += f'<circle cx="30" cy="-86" r="9" fill="#e07b2c"/>'
    return g + '</g>'

def ekipa(n=8, y0=210, seed=1, boje=(GOLD, '#fff', RED, SILV)):
    r = random.Random(seed); s = ''
    for i in range(n):
        x = 70 + i * (500 / n) + r.randint(-14, 14); y = y0 + r.randint(-14, 14); sc = 0.75 + r.random() * 0.25
        s += osoba(x, y, sc, boje[i % len(boje)], ruka=r.random() < .25, ball=False)
    return s

def pozadina(sporedno=''):
    return f'''<defs><linearGradient id="z" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1838"/><stop offset=".55" stop-color="#26376f"/><stop offset=".56" stop-color="#c98d4e"/><stop offset="1" stop-color="#8a5a2c"/></linearGradient>
<filter id="b6" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter><filter id="b12"><feGaussianBlur stdDeviation="11"/></filter>
<radialGradient id="sj" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect width="640" height="360" fill="url(#z)"/>
<g filter="url(#b12)" opacity=".85">{''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="url(#sj)"/>' for x,y,r in [(90,40,26),(210,26,20),(340,48,30),(470,30,22),(570,58,26),(30,90,16),(620,100,18)])}</g>
<g filter="url(#b12)" opacity=".5"><path d="M0 250 L640 250" stroke="#fff" stroke-width="6"/><circle cx="320" cy="300" r="70" fill="none" stroke="#fff" stroke-width="5"/></g>{sporedno}'''

def kamera():
    return f'''<g transform="translate(150 150)">
<ellipse cx="170" cy="190" rx="190" ry="14" fill="#000" opacity=".35"/>
<rect x="0" y="40" width="340" height="140" rx="22" fill="#1a1f2e"/><rect x="0" y="40" width="340" height="38" rx="22" fill="#0e1220"/>
<rect x="30" y="14" width="86" height="34" rx="8" fill="#0e1220"/><rect x="260" y="22" width="44" height="26" rx="6" fill="#2a3150"/><circle cx="282" cy="35" r="7" fill="{RED}"/>
<rect x="14" y="96" width="46" height="70" rx="12" fill="#2a3150"/>
<circle cx="190" cy="118" r="82" fill="#0b0f1c"/><circle cx="190" cy="118" r="72" fill="#222a47"/><circle cx="190" cy="118" r="60" fill="none" stroke="{GOLD}" stroke-width="6"/>
<circle cx="190" cy="118" r="50" fill="#0d1226"/><circle cx="190" cy="118" r="34" fill="#18204a"/><circle cx="190" cy="118" r="20" fill="#0a0e20"/>
<ellipse cx="172" cy="100" rx="13" ry="8" fill="#fff" opacity=".55" transform="rotate(-30 172 100)"/><circle cx="208" cy="134" r="5" fill="#9bb4ff" opacity=".6"/>
<text x="190" y="30" font-size="10" fill="{SILV}" text-anchor="middle" font-family="Montserrat,Arial" font-weight="800" letter-spacing="3"></text></g>'''

def loptica(x, y, r):
    return f'''<g transform="translate({x} {y})"><circle r="{r}" fill="#e07b2c"/><path d="M{-r} 0 H{r} M0 {-r} V{r} M{-r*.7} {-r*.7} Q0 0 {-r*.7} {r*.7} M{r*.7} {-r*.7} Q0 0 {r*.7} {r*.7}" stroke="#7a3a10" stroke-width="2.5" fill="none"/><ellipse cx="{-r*.35}" cy="{-r*.4}" rx="{r*.25}" ry="{r*.14}" fill="#fff" opacity=".35" transform="rotate(-35 {-r*.35} {-r*.4})"/></g>'''

def wrap(inner):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice">{inner}</svg>'

scene = {}
# 1 promjena termina: sat u prvom planu, ekipa zamućena
scene['termin'] = pozadina(f'<g filter="url(#b6)">{ekipa(8,215,3)}</g>') + f'''<g transform="translate(320 215)"><ellipse cy="118" rx="100" ry="10" fill="#000" opacity=".3"/><circle r="104" fill="{RED}"/><circle r="92" fill="#fff"/>
{''.join(f'<line x1="0" y1="-84" x2="0" y2="-72" stroke="{NAVY}" stroke-width="4" transform="rotate({a})"/>' for a in range(0,360,30))}
<line x1="0" y1="0" x2="0" y2="-62" stroke="{NAVY}" stroke-width="7" stroke-linecap="round" transform="rotate(30)"/><line x1="0" y1="0" x2="0" y2="-44" stroke="{NAVY}" stroke-width="7" stroke-linecap="round" transform="rotate(-80)"/><circle r="7" fill="{RED}"/>
<path d="M60 -96 l24 -24" stroke="{GOLD}" stroke-width="8" stroke-linecap="round"/><path d="M-60 -96 l-24 -24" stroke="{GOLD}" stroke-width="8" stroke-linecap="round"/></g>'''
# 2 fotografiranje ekipa: fotoaparat u prvom planu, ekipa zamućena u daljini
scene['fotografiranje'] = pozadina(f'<g filter="url(#b6)">{ekipa(9,200,5)}</g>') + kamera()
# 3 trening: lopta i čunjevi u prvom planu
scene['trening'] = pozadina(f'<g filter="url(#b6)">{ekipa(7,205,9)}{osoba(300,205,.95,RED,True,True)}</g>') + ''.join(
    f'<g transform="translate({x} 322)"><ellipse cy="6" rx="26" ry="6" fill="#000" opacity=".3"/><path d="M-22 4 L-8 -52 H8 L22 4 Z" fill="{GOLD}"/><rect x="-26" y="2" width="52" height="8" rx="3" fill="{GOLD}"/><rect x="-14" y="-30" width="28" height="9" fill="#fff"/></g>' for x in (90, 550)) + loptica(330, 280, 62)
# 4 članarina: kovanice i novčanik u prvom planu, dvorana zamućena
scene['clanarina'] = pozadina(f'<g filter="url(#b6)">{ekipa(8,215,11)}</g>') + f'''<g transform="translate(320 250)"><ellipse cy="86" rx="150" ry="12" fill="#000" opacity=".3"/>
<rect x="-130" y="-30" width="260" height="110" rx="20" fill="{NAVY}"/><rect x="-130" y="-30" width="260" height="30" rx="14" fill="#232f66"/><rect x="60" y="10" width="86" height="44" rx="12" fill="{GOLD}"/><circle cx="86" cy="32" r="8" fill="{NAVY}"/>
<g transform="translate(-60 -52)"><circle r="46" fill="{GOLD}"/><circle r="36" fill="none" stroke="#c98d1e" stroke-width="4"/><text y="14" font-size="40" text-anchor="middle" font-family="Montserrat,Arial" font-weight="900" fill="#c98d1e">F</text></g>
<g transform="translate(30 -42)"><circle r="34" fill="{GOLD}"/><circle r="26" fill="none" stroke="#c98d1e" stroke-width="3"/><text y="11" font-size="30" text-anchor="middle" font-family="Montserrat,Arial" font-weight="900" fill="#c98d1e">€</text></g></g>'''
# 5 škola košarke: mala lopta, zamućena grupa djece (manje siluete)
def djeca(seed):
    r = random.Random(seed); s = ''
    for i in range(10):
        x = 50 + i * 54 + r.randint(-10, 10); y = 222 + r.randint(-12, 12); sc = 0.55 + r.random() * 0.15
        s += osoba(x, y, sc, (GOLD, '#fff', RED, SILV)[i % 4], ruka=r.random() < .3)
    return s
scene['skola'] = pozadina(f'<g filter="url(#b6)">{djeca(4)}</g>') + loptica(320, 290, 56) + f'<path d="M250 340 Q320 312 390 340" stroke="#000" stroke-opacity=".25" stroke-width="10" fill="none" stroke-linecap="round"/>'
for k, v in scene.items():
    open(os.path.join(OUT, k + '.svg'), 'w').write(wrap(v))
print('ok', list(scene))
