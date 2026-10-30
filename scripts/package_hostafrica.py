"""Package only the verified production files, including .htaccess."""
from pathlib import Path
from hashlib import sha256
from zipfile import ZipFile, ZIP_DEFLATED
import json

root = Path(__file__).resolve().parent.parent
dist = root / 'dist'
required = ['index.html', 'guides/index.html', 'privacy/index.html', '404.html', '.htaccess', 'robots.txt', 'sitemap.xml']
for name in required:
    if not (dist / name).is_file():
        raise SystemExit(f'Missing production file: {name}')
if 'noindex' in (dist / 'index.html').read_text(encoding='utf-8'):
    raise SystemExit('Production homepage must be indexable')
files = sorted(path for path in dist.rglob('*') if path.is_file())
manifest = [{'path':path.relative_to(dist).as_posix(), 'bytes':path.stat().st_size, 'sha256':sha256(path.read_bytes()).hexdigest()} for path in files]
fingerprint = sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest()[:12]
release = root / 'releases' / f'fanisi-hostafrica-{fingerprint}'
release.mkdir(parents=True,exist_ok=True)
archive = release / 'fanisi-public-html.zip'
with ZipFile(archive,'w',ZIP_DEFLATED,compresslevel=9) as bundle:
    for path in files:
        bundle.write(path,path.relative_to(dist).as_posix())
with ZipFile(archive) as bundle:
    assert all(name in bundle.namelist() for name in required)
    assert bundle.testzip() is None
(release / 'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
(release / 'SHA256.txt').write_text(f'{sha256(archive.read_bytes()).hexdigest()}  {archive.name}\n',encoding='utf-8')
print(json.dumps({'archive':str(archive),'files':len(files),'bytes':archive.stat().st_size,'sha256':sha256(archive.read_bytes()).hexdigest()}))
