#!/usr/bin/env python3
"""Iz SQL dumpa starog Ormara (bluerder_ormar) pravi prototype/js/ormar-podaci.js:
artikli (cijene, zaliha po veličini, slike, oznake) i paketi. NE čita `settings` (hash lozinke, telefon).
Upotreba: python3 migracija/ormar_iz_dumpa.py /putanja/do/ormar.sql"""
import json, os, sys, re
sys.path.insert(0, os.path.dirname(__file__))
from dump_parser import parse

BAZA = 'https://ormar.zkkfalcons.hr/'
def vel(n):
    n = n.strip().replace(' - ', '–')
    n = re.sub(r'^dječji ', 'Kids ', n)
    return 'Jedna veličina' if n == 'Komad' else n
def ime_lijepo(n):
    n = n.strip().replace(' - ', ' – ') if n.lower().startswith('paket') else re.sub(r'\s+-\s+', ' ', n.strip())
    n = re.sub(r'\b(BIJELE|PLAVE|CRVENE|PLAVA|CRVENA|BIJELA)\b', lambda m: m.group(1).lower(), n)
    return 'Paket čarapa – 3 para' if n.lower().startswith('paket čarapa') else n
def kat(tag): return {'Kratke majice': 'Majice', 'Majice': 'Majice', 'Čarape': 'Čarape', 'Torbe': 'Torbe'}.get(tag or '', 'Majice')

def main(path):
    d = parse(path); izlaz = []
    po_id = {}
    for p in sorted(d['products'], key=lambda p: p['sort_order']):
        vs = json.loads(p['sizes_stock'])
        velicine = [{'v': vel(v['name']), 'n': v['stock'] if v['stock'] > 0 else None} for v in vs]
        velicine.sort(key=lambda v: v['n'] is None)  # na stanju prvo
        slike = [BAZA + x for x in json.loads(p['images'] or '[]')] or ([BAZA + p['image_path']] if p['image_path'] else [])
        a = {'id': p['id'], 'ime': ime_lijepo(p['name']), 'cijena': float(p['price']), 'kat': kat(p['tag']), 'slika': slike[0] if slike else None, 'slike': slike,
             'novo': bool(p['is_new']), 'predbilj': bool(p['preorder_open']), 'oznaka': p['badge_text'], 'velicine': velicine}
        izlaz.append(a); po_id[p['id']] = a
    for b in sorted(d['bundles'], key=lambda b: b['sort_order']):
        ids = json.loads(b['product_ids']); dijelovi = [po_id[i] for i in ids if i in po_id]
        zajednicke = set.intersection(*[{v['v'] for v in x['velicine']} for x in dijelovi])
        velicine = []
        for v in dijelovi[0]['velicine']:
            if v['v'] in zajednicke:
                ns = [next(y['n'] for y in x['velicine'] if y['v'] == v['v']) for x in dijelovi]
                velicine.append({'v': v['v'], 'n': None if None in ns else min(ns)})
        velicine.sort(key=lambda v: v['n'] is None)
        izlaz.append({'id': 100 + b['id'], 'ime': ime_lijepo(b['name']), 'cijena': float(b['price']), 'staraCijena': float(sum(x['cijena'] for x in dijelovi)), 'kat': 'Paketi',
                      'slika': dijelovi[0]['slika'], 'slike': dijelovi[0]['slike'], 'opis': ' + '.join(x['ime'] for x in dijelovi), 'velicine': velicine, 'paket': ids})
    izlaz.sort(key=lambda a: (a['kat'] != 'Paketi', 0))  # paketi prvi, ostalo po sort_order
    flc = next((s['setting_value'] for s in d.get('settings', []) if s['setting_key'] == 'flc_info'), '')
    out = '// GENERIRANO iz dumpa Ormara (migracija/ormar_iz_dumpa.py). Slike se hotlinkaju s ormar.zkkfalcons.hr.\n'
    out += 'const ORMAR_PODACI = %s;\nconst FLC_INFO_STARI = %s;\n' % (json.dumps(izlaz, ensure_ascii=False, indent=1), json.dumps(flc, ensure_ascii=False))
    open(os.path.join(os.path.dirname(__file__), '..', 'prototype', 'js', 'ormar-podaci.js'), 'w', encoding='utf8').write(out)
    print(len(izlaz), 'artikala,', sum(len(a['slike']) for a in izlaz), 'slika')
main(sys.argv[1])
