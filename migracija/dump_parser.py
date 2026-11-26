import re,json,sys
def parse(path):
    s=open(path,encoding='utf8').read()
    out={}
    for m in re.finditer(r"INSERT INTO `(\w+)` \((.*?)\) VALUES\n(.*?);\n(?=\n|--|/\*|$)",s,re.S):
        t=m.group(1); cols=[c.strip('` ') for c in m.group(2).split(',')]; body=m.group(3)
        rows=[];i=0;n=len(body)
        while i<n:
            if body[i]=='(':
                i+=1;row=[];
                while True:
                    while body[i]==' ':i+=1
                    if body[i]=="'":
                        i+=1;v=[]
                        while True:
                            c=body[i]
                            if c=='\\': 
                                nx=body[i+1]; v.append({'n':'\n','r':'\r','t':'\t','0':'\0'}.get(nx,nx)); i+=2
                            elif c=="'":
                                if body[i+1]=="'": v.append("'"); i+=2
                                else: i+=1;break
                            else: v.append(c);i+=1
                        row.append(''.join(v))
                    else:
                        j=i
                        while body[j] not in ',)':j+=1
                        tok=body[i:j].strip(); i=j
                        row.append(None if tok=='NULL' else (int(tok) if re.fullmatch(r'-?\d+',tok) else float(tok) if re.fullmatch(r'-?\d+\.\d+',tok) else tok))
                    if body[i]==',': i+=1; continue
                    if body[i]==')': i+=1; break
                rows.append(dict(zip(cols,row)))
            else: i+=1
        out.setdefault(t,[]).extend(rows)
    return out
if __name__=='__main__':
    d=parse(sys.argv[1]); json.dump(d,open('/tmp/mig/dump.json','w'),ensure_ascii=False)
    for k,v in d.items(): print(k,len(v))
