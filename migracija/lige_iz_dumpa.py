#!/usr/bin/env python3
"""Iz SQL dumpa starog portala (Falcons Tracker) izvlači NEOSOBNE podatke za prototip:
lige po kolima, protivnike (+ njihove dvorane) i klupske dvorane. Piše prototype/js/lige-podaci.js.
Osobni podaci (igračice, hashevi lozinki, tokeni, dolasci) se NE diraju.
Upotreba: python3 migracija/lige_iz_dumpa.py /putanja/do/dump.sql"""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from dump_parser import parse

def kanon(n):
    n = n.strip().rstrip('.')
    n = re.sub(r'^(ŽKK|KK)\s+', '', n)
    return n

def main(path):
    d = parse(path)
    liga_ime = {l['id']: l for l in d['leagues']}
    grupa_ime = {g['id']: g['name'] for g in d['groups_table']}
    loc = {l['id']: l['name'] for l in d['locations']}
    lige, prot_dv, klub_dv = [], {}, set(loc.values())
    for l in d['leagues']:
        kola = []
        for m in sorted([m for m in d['matches_table'] if m['league_id'] == l['id']], key=lambda m: (m['round'], m['match_date'])):
            p = kanon(m['opponent'])
            mjesto = m['venue_text'] or loc.get(m['location_id'])
            # domaćin, ali se igra izvan klupskih dvorana = zamjena domaćinstva (dvorana ide protivniku)
            zam = bool(m['is_home'] and mjesto and mjesto not in loc.values())
            prot_dv.setdefault(p, [])
            if mjesto and (not m['is_home'] or zam) and mjesto not in prot_dv[p]: prot_dv[p].append(mjesto)
            kola.append({'k': m['round'], 'd': str(m['match_date']), 'prot': p, 'gost': not m['is_home'],
                         'vr': (m['start_time'] or '')[:5] or None, 'mjesto': mjesto, 'zamjena': zam, 'datumPotvrden': bool(m['date_confirmed'])})
        lige.append({'id': 'l%d' % l['id'], 'naziv': l['name'], 'grupa': grupa_ime.get(l['group_id'], ''), 'kola': kola})
    protivnici = [{'id': i + 1, 'naziv': n, 'grad': '', 'logo': None, 'dvorane': (dv + ['', '', ''])[:3]} for i, (n, dv) in enumerate(sorted(prot_dv.items()))]
    out = '// GENERIRANO iz dumpa (migracija/lige_iz_dumpa.py): lige, protivnici i dvorane. Bez osobnih podataka.\n'
    out += 'const LIGE_PODACI = %s;\nconst PROTIVNICI_PODACI = %s;\nconst DVORANE_KLUB = %s;\n' % (
        json.dumps(lige, ensure_ascii=False, indent=1), json.dumps(protivnici, ensure_ascii=False), json.dumps(sorted(klub_dv), ensure_ascii=False))
    dest = os.path.join(os.path.dirname(__file__), '..', 'prototype', 'js', 'lige-podaci.js')
    open(dest, 'w', encoding='utf8').write(out)
    print('lige', len(lige), 'kola', sum(len(l['kola']) for l in lige), 'protivnika', len(protivnici), 'dvorana kluba', len(klub_dv))

main(sys.argv[1])
