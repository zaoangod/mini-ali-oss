/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2023 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 */
const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="ARRAYBUFFER not supported by this environment",n="UINT8ARRAY not supported by this environment";function i(t,r,n,i){let e,s,o;const h=r||[0],u=(n=n||0)>>>3,f=-1===i?3:0;for(e=0;e<t.length;e+=1)o=e+u,s=o>>>2,h.length<=s&&h.push(0),h[s]|=t[e]<<8*(f+i*(o%4));return {value:h,binLen:8*t.length+n}}function e(e,s,o){switch(s){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(e){case"HEX":return function(t,r,n){return function(t,r,n,i){let e,s,o,h;if(0!=t.length%2)throw new Error("String of HEX type must be in byte increments");const u=r||[0],f=(n=n||0)>>>3,c=-1===i?3:0;for(e=0;e<t.length;e+=2){if(s=parseInt(t.substr(e,2),16),isNaN(s))throw new Error("String of HEX type contains invalid characters");for(h=(e>>>1)+f,o=h>>>2;u.length<=o;)u.push(0);u[o]|=s<<8*(c+i*(h%4));}return {value:u,binLen:4*t.length+n}}(t,r,n,o)};case"TEXT":return function(t,r,n){return function(t,r,n,i,e){let s,o,h,u,f,c,a,w,E=0;const l=n||[0],A=(i=i||0)>>>3;if("UTF8"===r)for(a=-1===e?3:0,h=0;h<t.length;h+=1)for(s=t.charCodeAt(h),o=[],128>s?o.push(s):2048>s?(o.push(192|s>>>6),o.push(128|63&s)):55296>s||57344<=s?o.push(224|s>>>12,128|s>>>6&63,128|63&s):(h+=1,s=65536+((1023&s)<<10|1023&t.charCodeAt(h)),o.push(240|s>>>18,128|s>>>12&63,128|s>>>6&63,128|63&s)),u=0;u<o.length;u+=1){for(c=E+A,f=c>>>2;l.length<=f;)l.push(0);l[f]|=o[u]<<8*(a+e*(c%4)),E+=1;}else for(a=-1===e?2:0,w="UTF16LE"===r&&1!==e||"UTF16LE"!==r&&1===e,h=0;h<t.length;h+=1){for(s=t.charCodeAt(h),!0===w&&(u=255&s,s=u<<8|s>>>8),c=E+A,f=c>>>2;l.length<=f;)l.push(0);l[f]|=s<<8*(a+e*(c%4)),E+=2;}return {value:l,binLen:8*E+i}}(t,s,r,n,o)};case"B64":return function(r,n,i){return function(r,n,i,e){let s,o,h,u,f,c,a,w=0;const E=n||[0],l=(i=i||0)>>>3,A=-1===e?3:0,p=r.indexOf("=");if(-1===r.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(r=r.replace(/=/g,""),-1!==p&&p<r.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<r.length;o+=4){for(f=r.substr(o,4),u=0,h=0;h<f.length;h+=1)s=t.indexOf(f.charAt(h)),u|=s<<18-6*h;for(h=0;h<f.length-1;h+=1){for(a=w+l,c=a>>>2;E.length<=c;)E.push(0);E[c]|=(u>>>16-8*h&255)<<8*(A+e*(a%4)),w+=1;}}return {value:E,binLen:8*w+i}}(r,n,i,o)};case"BYTES":return function(t,r,n){return function(t,r,n,i){let e,s,o,h;const u=r||[0],f=(n=n||0)>>>3,c=-1===i?3:0;for(s=0;s<t.length;s+=1)e=t.charCodeAt(s),h=s+f,o=h>>>2,u.length<=o&&u.push(0),u[o]|=e<<8*(c+i*(h%4));return {value:u,binLen:8*t.length+n}}(t,r,n,o)};case"ARRAYBUFFER":try{new ArrayBuffer(0);}catch(t){throw new Error(r)}return function(t,r,n){return function(t,r,n,e){return i(new Uint8Array(t),r,n,e)}(t,r,n,o)};case"UINT8ARRAY":try{new Uint8Array(0);}catch(t){throw new Error(n)}return function(t,r,n){return i(t,r,n,o)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function s(i,e,s,o){switch(i){case"HEX":return function(t){return function(t,r,n,i){const e="0123456789abcdef";let s,o,h="";const u=r/8,f=-1===n?3:0;for(s=0;s<u;s+=1)o=t[s>>>2]>>>8*(f+n*(s%4)),h+=e.charAt(o>>>4&15)+e.charAt(15&o);return i.outputUpper?h.toUpperCase():h}(t,e,s,o)};case"B64":return function(r){return function(r,n,i,e){let s,o,h,u,f,c="";const a=n/8,w=-1===i?3:0;for(s=0;s<a;s+=3)for(u=s+1<a?r[s+1>>>2]:0,f=s+2<a?r[s+2>>>2]:0,h=(r[s>>>2]>>>8*(w+i*(s%4))&255)<<16|(u>>>8*(w+i*((s+1)%4))&255)<<8|f>>>8*(w+i*((s+2)%4))&255,o=0;o<4;o+=1)c+=8*s+6*o<=n?t.charAt(h>>>6*(3-o)&63):e.b64Pad;return c}(r,e,s,o)};case"BYTES":return function(t){return function(t,r,n){let i,e,s="";const o=r/8,h=-1===n?3:0;for(i=0;i<o;i+=1)e=t[i>>>2]>>>8*(h+n*(i%4))&255,s+=String.fromCharCode(e);return s}(t,e,s)};case"ARRAYBUFFER":try{new ArrayBuffer(0);}catch(t){throw new Error(r)}return function(t){return function(t,r,n){let i;const e=r/8,s=new ArrayBuffer(e),o=new Uint8Array(s),h=-1===n?3:0;for(i=0;i<e;i+=1)o[i]=t[i>>>2]>>>8*(h+n*(i%4))&255;return s}(t,e,s)};case"UINT8ARRAY":try{new Uint8Array(0);}catch(t){throw new Error(n)}return function(t){return function(t,r,n){let i;const e=r/8,s=-1===n?3:0,o=new Uint8Array(e);for(i=0;i<e;i+=1)o[i]=t[i>>>2]>>>8*(s+n*(i%4))&255;return o}(t,e,s)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function o(t){const r={outputUpper:!1,b64Pad:"=",outputLen:-1},n=t||{},i="Output length must be a multiple of 8";if(r.outputUpper=n.outputUpper||!1,n.b64Pad&&(r.b64Pad=n.b64Pad),n.outputLen){if(n.outputLen%8!=0)throw new Error(i);r.outputLen=n.outputLen;}else if(n.shakeLen){if(n.shakeLen%8!=0)throw new Error(i);r.outputLen=n.shakeLen;}if("boolean"!=typeof r.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof r.b64Pad)throw new Error("Invalid b64Pad formatting option");return r}class h{constructor(t,r,n){const i=n||{};if(this.t=r,this.i=i.encoding||"UTF8",this.numRounds=i.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.o=t,this.h=[],this.u=0,this.l=!1,this.A=0,this.p=!1,this.U=[],this.R=[];}update(t){let r,n=0;const i=this.T>>>5,e=this.F(t,this.h,this.u),s=e.binLen,o=e.value,h=s>>>5;for(r=0;r<h;r+=i)n+this.T<=s&&(this.m=this.g(o.slice(r,r+i),this.m),n+=this.T);return this.A+=n,this.h=o.slice(n>>>5),this.u=s%this.T,this.l=!0,this}getHash(t,r){let n,i,e=this.B;const h=o(r);if(this.v){if(-1===h.outputLen)throw new Error("Output length must be specified in options");e=h.outputLen;}const u=s(t,e,this.H,h);if(this.p&&this.C)return u(this.C(h));for(i=this.Y(this.h.slice(),this.u,this.A,this.I(this.m),e),n=1;n<this.numRounds;n+=1)this.v&&e%32!=0&&(i[i.length-1]&=16777215>>>24-e%32),i=this.Y(i,e,0,this.L(this.o),e);return u(i)}setHMACKey(t,r,n){if(!this.M)throw new Error("Variant does not support HMAC");if(this.l)throw new Error("Cannot set MAC key after calling update");const i=e(r,(n||{}).encoding||"UTF8",this.H);this.N(i(t));}N(t){const r=this.T>>>3,n=r/4-1;let i;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(this.p)throw new Error("MAC key already set");for(r<t.binLen/8&&(t.value=this.Y(t.value,t.binLen,0,this.L(this.o),this.B));t.value.length<=n;)t.value.push(0);for(i=0;i<=n;i+=1)this.U[i]=909522486^t.value[i],this.R[i]=1549556828^t.value[i];this.m=this.g(this.U,this.m),this.A=this.T,this.p=!0;}getHMAC(t,r){const n=o(r);return s(t,this.B,this.H,n)(this.S())}S(){let t;if(!this.p)throw new Error("Cannot call getHMAC without first setting MAC key");const r=this.Y(this.h.slice(),this.u,this.A,this.I(this.m),this.B);return t=this.g(this.R,this.L(this.o)),t=this.Y(r,this.B,this.T,t,this.B),t}}function u(t,r){return t<<r|t>>>32-r}function f(t,r,n){return t^r^n}function c(t,r,n){return t&r^t&n^r&n}function a(t,r){const n=(65535&t)+(65535&r);return (65535&(t>>>16)+(r>>>16)+(n>>>16))<<16|65535&n}function w(t,r,n,i,e){const s=(65535&t)+(65535&r)+(65535&n)+(65535&i)+(65535&e);return (65535&(t>>>16)+(r>>>16)+(n>>>16)+(i>>>16)+(e>>>16)+(s>>>16))<<16|65535&s}function E(t){return [1732584193,4023233417,2562383102,271733878,3285377520]}function l(t,r){let n,i,e,s,o,h,E;const l=[];for(n=r[0],i=r[1],e=r[2],s=r[3],o=r[4],E=0;E<80;E+=1)l[E]=E<16?t[E]:u(l[E-3]^l[E-8]^l[E-14]^l[E-16],1),h=E<20?w(u(n,5),(A=i)&e^~A&s,o,1518500249,l[E]):E<40?w(u(n,5),f(i,e,s),o,1859775393,l[E]):E<60?w(u(n,5),c(i,e,s),o,2400959708,l[E]):w(u(n,5),f(i,e,s),o,3395469782,l[E]),o=s,s=e,e=u(i,30),i=n,n=h;var A;return r[0]=a(n,r[0]),r[1]=a(i,r[1]),r[2]=a(e,r[2]),r[3]=a(s,r[3]),r[4]=a(o,r[4]),r}function A(t,r,n,i){let e;const s=15+(r+65>>>9<<4),o=r+n;for(;t.length<=s;)t.push(0);for(t[r>>>5]|=128<<24-r%32,t[s]=4294967295&o,t[s-1]=o/4294967296|0,e=0;e<t.length;e+=16)i=l(t.slice(e,e+16),i);return i}class p extends h{constructor(t,r,n){if("SHA-1"!==t)throw new Error("Chosen SHA variant is not supported");super(t,r,n);const i=n||{};this.M=!0,this.C=this.S,this.H=-1,this.F=e(this.t,this.i,this.H),this.g=l,this.I=function(t){return t.slice()},this.L=E,this.Y=A,this.m=[1732584193,4023233417,2562383102,271733878,3285377520],this.T=512,this.B=160,this.v=!1,i.hmacKey&&this.N(function(t,r,n,i){const s=t+" must include a value and format";if(!r){if(!i)throw new Error(s);return i}if(void 0===r.value||!r.format)throw new Error(s);return e(r.format,r.encoding||"UTF8",n)(r.value)}("hmacKey",i.hmacKey,this.H));}}

const standard = {
    'application/andrew-inset': ['ez'],
    'application/appinstaller': ['appinstaller'],
    'application/applixware': ['aw'],
    'application/appx': ['appx'],
    'application/appxbundle': ['appxbundle'],
    'application/atom+xml': ['atom'],
    'application/atomcat+xml': ['atomcat'],
    'application/atomdeleted+xml': ['atomdeleted'],
    'application/atomsvc+xml': ['atomsvc'],
    'application/atsc-dwd+xml': ['dwd'],
    'application/atsc-held+xml': ['held'],
    'application/atsc-rsat+xml': ['rsat'],
    'application/automationml-aml+xml': ['aml'],
    'application/automationml-amlx+zip': ['amlx'],
    'application/bdoc': ['bdoc'],
    'application/calendar+xml': ['xcs'],
    'application/ccxml+xml': ['ccxml'],
    'application/cdfx+xml': ['cdfx'],
    'application/cdmi-capability': ['cdmia'],
    'application/cdmi-container': ['cdmic'],
    'application/cdmi-domain': ['cdmid'],
    'application/cdmi-object': ['cdmio'],
    'application/cdmi-queue': ['cdmiq'],
    'application/cpl+xml': ['cpl'],
    'application/cu-seeme': ['cu'],
    'application/cwl': ['cwl'],
    'application/dash+xml': ['mpd'],
    'application/dash-patch+xml': ['mpp'],
    'application/davmount+xml': ['davmount'],
    'application/docbook+xml': ['dbk'],
    'application/dssc+der': ['dssc'],
    'application/dssc+xml': ['xdssc'],
    'application/ecmascript': ['ecma'],
    'application/emma+xml': ['emma'],
    'application/emotionml+xml': ['emotionml'],
    'application/epub+zip': ['epub'],
    'application/exi': ['exi'],
    'application/express': ['exp'],
    'application/fdf': ['fdf'],
    'application/fdt+xml': ['fdt'],
    'application/font-tdpfr': ['pfr'],
    'application/geo+json': ['geojson'],
    'application/gml+xml': ['gml'],
    'application/gpx+xml': ['gpx'],
    'application/gxf': ['gxf'],
    'application/gzip': ['gz'],
    'application/hjson': ['hjson'],
    'application/hyperstudio': ['stk'],
    'application/inkml+xml': ['ink', 'inkml'],
    'application/ipfix': ['ipfix'],
    'application/its+xml': ['its'],
    'application/java-archive': ['jar', 'war', 'ear'],
    'application/java-serialized-object': ['ser'],
    'application/java-vm': ['class'],
    'application/javascript': ['*js'],
    'application/json': ['json', 'map'],
    'application/json5': ['json5'],
    'application/jsonml+json': ['jsonml'],
    'application/ld+json': ['jsonld'],
    'application/lgr+xml': ['lgr'],
    'application/lost+xml': ['lostxml'],
    'application/mac-binhex40': ['hqx'],
    'application/mac-compactpro': ['cpt'],
    'application/mads+xml': ['mads'],
    'application/manifest+json': ['webmanifest'],
    'application/marc': ['mrc'],
    'application/marcxml+xml': ['mrcx'],
    'application/mathematica': ['ma', 'nb', 'mb'],
    'application/mathml+xml': ['mathml'],
    'application/mbox': ['mbox'],
    'application/media-policy-dataset+xml': ['mpf'],
    'application/mediaservercontrol+xml': ['mscml'],
    'application/metalink+xml': ['metalink'],
    'application/metalink4+xml': ['meta4'],
    'application/mets+xml': ['mets'],
    'application/mmt-aei+xml': ['maei'],
    'application/mmt-usd+xml': ['musd'],
    'application/mods+xml': ['mods'],
    'application/mp21': ['m21', 'mp21'],
    'application/mp4': ['mp4', 'mpg4', 'mp4s', 'm4p'],
    'application/msix': ['msix'],
    'application/msixbundle': ['msixbundle'],
    'application/msword': ['doc', 'dot'],
    'application/mxf': ['mxf'],
    'application/n-quads': ['nq'],
    'application/n-triples': ['nt'],
    'application/node': ['cjs'],
    'application/octet-stream': ['bin', 'dms', 'lrf', 'mar', 'so', 'dist', 'distz', 'pkg', 'bpk', 'dump', 'elc', 'deploy', 'exe', 'dll', 'deb', 'dmg', 'iso', 'img', 'msi', 'msp', 'msm', 'buffer'],
    'application/oda': ['oda'],
    'application/oebps-package+xml': ['opf'],
    'application/ogg': ['ogx'],
    'application/omdoc+xml': ['omdoc'],
    'application/onenote': ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
    'application/oxps': ['oxps'],
    'application/p2p-overlay+xml': ['relo'],
    'application/patch-ops-error+xml': ['xer'],
    'application/pdf': ['pdf'],
    'application/pgp-encrypted': ['pgp'],
    'application/pgp-keys': ['asc'],
    'application/pgp-signature': ['sig', '*asc'],
    'application/pics-rules': ['prf'],
    'application/pkcs10': ['p10'],
    'application/pkcs7-mime': ['p7m', 'p7c'],
    'application/pkcs7-signature': ['p7s'],
    'application/pkcs8': ['p8'],
    'application/pkix-attr-cert': ['ac'],
    'application/pkix-cert': ['cer'],
    'application/pkix-crl': ['crl'],
    'application/pkix-pkipath': ['pkipath'],
    'application/pkixcmp': ['pki'],
    'application/pls+xml': ['pls'],
    'application/postscript': ['ai', 'eps', 'ps'],
    'application/provenance+xml': ['provx'],
    'application/pskc+xml': ['pskcxml'],
    'application/raml+yaml': ['raml'],
    'application/rdf+xml': ['rdf', 'owl'],
    'application/reginfo+xml': ['rif'],
    'application/relax-ng-compact-syntax': ['rnc'],
    'application/resource-lists+xml': ['rl'],
    'application/resource-lists-diff+xml': ['rld'],
    'application/rls-services+xml': ['rs'],
    'application/route-apd+xml': ['rapd'],
    'application/route-s-tsid+xml': ['sls'],
    'application/route-usd+xml': ['rusd'],
    'application/rpki-ghostbusters': ['gbr'],
    'application/rpki-manifest': ['mft'],
    'application/rpki-roa': ['roa'],
    'application/rsd+xml': ['rsd'],
    'application/rss+xml': ['rss'],
    'application/rtf': ['rtf'],
    'application/sbml+xml': ['sbml'],
    'application/scvp-cv-request': ['scq'],
    'application/scvp-cv-response': ['scs'],
    'application/scvp-vp-request': ['spq'],
    'application/scvp-vp-response': ['spp'],
    'application/sdp': ['sdp'],
    'application/senml+xml': ['senmlx'],
    'application/sensml+xml': ['sensmlx'],
    'application/set-payment-initiation': ['setpay'],
    'application/set-registration-initiation': ['setreg'],
    'application/shf+xml': ['shf'],
    'application/sieve': ['siv', 'sieve'],
    'application/smil+xml': ['smi', 'smil'],
    'application/sparql-query': ['rq'],
    'application/sparql-results+xml': ['srx'],
    'application/sql': ['sql'],
    'application/srgs': ['gram'],
    'application/srgs+xml': ['grxml'],
    'application/sru+xml': ['sru'],
    'application/ssdl+xml': ['ssdl'],
    'application/ssml+xml': ['ssml'],
    'application/swid+xml': ['swidtag'],
    'application/tei+xml': ['tei', 'teicorpus'],
    'application/thraud+xml': ['tfi'],
    'application/timestamped-data': ['tsd'],
    'application/toml': ['toml'],
    'application/trig': ['trig'],
    'application/ttml+xml': ['ttml'],
    'application/ubjson': ['ubj'],
    'application/urc-ressheet+xml': ['rsheet'],
    'application/urc-targetdesc+xml': ['td'],
    'application/voicexml+xml': ['vxml'],
    'application/wasm': ['wasm'],
    'application/watcherinfo+xml': ['wif'],
    'application/widget': ['wgt'],
    'application/winhlp': ['hlp'],
    'application/wsdl+xml': ['wsdl'],
    'application/wspolicy+xml': ['wspolicy'],
    'application/xaml+xml': ['xaml'],
    'application/xcap-att+xml': ['xav'],
    'application/xcap-caps+xml': ['xca'],
    'application/xcap-diff+xml': ['xdf'],
    'application/xcap-el+xml': ['xel'],
    'application/xcap-ns+xml': ['xns'],
    'application/xenc+xml': ['xenc'],
    'application/xfdf': ['xfdf'],
    'application/xhtml+xml': ['xhtml', 'xht'],
    'application/xliff+xml': ['xlf'],
    'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
    'application/xml-dtd': ['dtd'],
    'application/xop+xml': ['xop'],
    'application/xproc+xml': ['xpl'],
    'application/xslt+xml': ['*xsl', 'xslt'],
    'application/xspf+xml': ['xspf'],
    'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
    'application/yang': ['yang'],
    'application/yin+xml': ['yin'],
    'application/zip': ['zip'],
    'audio/3gpp': ['*3gpp'],
    'audio/aac': ['adts', 'aac'],
    'audio/adpcm': ['adp'],
    'audio/amr': ['amr'],
    'audio/basic': ['au', 'snd'],
    'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
    'audio/mobile-xmf': ['mxmf'],
    'audio/mp3': ['*mp3'],
    'audio/mp4': ['m4a', 'mp4a'],
    'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
    'audio/ogg': ['oga', 'ogg', 'spx', 'opus'],
    'audio/s3m': ['s3m'],
    'audio/silk': ['sil'],
    'audio/wav': ['wav'],
    'audio/wave': ['*wav'],
    'audio/webm': ['weba'],
    'audio/xm': ['xm'],
    'font/collection': ['ttc'],
    'font/otf': ['otf'],
    'font/ttf': ['ttf'],
    'font/woff': ['woff'],
    'font/woff2': ['woff2'],
    'image/aces': ['exr'],
    'image/apng': ['apng'],
    'image/avci': ['avci'],
    'image/avcs': ['avcs'],
    'image/avif': ['avif'],
    'image/bmp': ['bmp', 'dib'],
    'image/cgm': ['cgm'],
    'image/dicom-rle': ['drle'],
    'image/dpx': ['dpx'],
    'image/emf': ['emf'],
    'image/fits': ['fits'],
    'image/g3fax': ['g3'],
    'image/gif': ['gif'],
    'image/heic': ['heic'],
    'image/heic-sequence': ['heics'],
    'image/heif': ['heif'],
    'image/heif-sequence': ['heifs'],
    'image/hej2k': ['hej2'],
    'image/hsj2': ['hsj2'],
    'image/ief': ['ief'],
    'image/jls': ['jls'],
    'image/jp2': ['jp2', 'jpg2'],
    'image/jpeg': ['jpeg', 'jpg', 'jpe'],
    'image/jph': ['jph'],
    'image/jphc': ['jhc'],
    'image/jpm': ['jpm', 'jpgm'],
    'image/jpx': ['jpx', 'jpf'],
    'image/jxr': ['jxr'],
    'image/jxra': ['jxra'],
    'image/jxrs': ['jxrs'],
    'image/jxs': ['jxs'],
    'image/jxsc': ['jxsc'],
    'image/jxsi': ['jxsi'],
    'image/jxss': ['jxss'],
    'image/ktx': ['ktx'],
    'image/ktx2': ['ktx2'],
    'image/png': ['png'],
    'image/sgi': ['sgi'],
    'image/svg+xml': ['svg', 'svgz'],
    'image/t38': ['t38'],
    'image/tiff': ['tif', 'tiff'],
    'image/tiff-fx': ['tfx'],
    'image/webp': ['webp'],
    'image/wmf': ['wmf'],
    'message/disposition-notification': ['disposition-notification'],
    'message/global': ['u8msg'],
    'message/global-delivery-status': ['u8dsn'],
    'message/global-disposition-notification': ['u8mdn'],
    'message/global-headers': ['u8hdr'],
    'message/rfc822': ['eml', 'mime'],
    'model/3mf': ['3mf'],
    'model/gltf+json': ['gltf'],
    'model/gltf-binary': ['glb'],
    'model/iges': ['igs', 'iges'],
    'model/jt': ['jt'],
    'model/mesh': ['msh', 'mesh', 'silo'],
    'model/mtl': ['mtl'],
    'model/obj': ['obj'],
    'model/prc': ['prc'],
    'model/step+xml': ['stpx'],
    'model/step+zip': ['stpz'],
    'model/step-xml+zip': ['stpxz'],
    'model/stl': ['stl'],
    'model/u3d': ['u3d'],
    'model/vrml': ['wrl', 'vrml'],
    'model/x3d+binary': ['*x3db', 'x3dbz'],
    'model/x3d+fastinfoset': ['x3db'],
    'model/x3d+vrml': ['*x3dv', 'x3dvz'],
    'model/x3d+xml': ['x3d', 'x3dz'],
    'model/x3d-vrml': ['x3dv'],
    'text/cache-manifest': ['appcache', 'manifest'],
    'text/calendar': ['ics', 'ifb'],
    'text/coffeescript': ['coffee', 'litcoffee'],
    'text/css': ['css'],
    'text/csv': ['csv'],
    'text/html': ['html', 'htm', 'shtml'],
    'text/jade': ['jade'],
    'text/javascript': ['js', 'mjs'],
    'text/jsx': ['jsx'],
    'text/less': ['less'],
    'text/markdown': ['md', 'markdown'],
    'text/mathml': ['mml'],
    'text/mdx': ['mdx'],
    'text/n3': ['n3'],
    'text/plain': ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
    'text/richtext': ['rtx'],
    'text/rtf': ['*rtf'],
    'text/sgml': ['sgml', 'sgm'],
    'text/shex': ['shex'],
    'text/slim': ['slim', 'slm'],
    'text/spdx': ['spdx'],
    'text/stylus': ['stylus', 'styl'],
    'text/tab-separated-values': ['tsv'],
    'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
    'text/turtle': ['ttl'],
    'text/uri-list': ['uri', 'uris', 'urls'],
    'text/vcard': ['vcard'],
    'text/vtt': ['vtt'],
    'text/wgsl': ['wgsl'],
    'text/xml': ['*xml'],
    'text/yaml': ['yaml', 'yml'],
    'video/3gpp': ['3gp', '3gpp'],
    'video/3gpp2': ['3g2'],
    'video/h261': ['h261'],
    'video/h263': ['h263'],
    'video/h264': ['h264'],
    'video/iso.segment': ['m4s'],
    'video/jpeg': ['jpgv'],
    'video/jpm': ['*jpm', '*jpgm'],
    'video/mj2': ['mj2', 'mjp2'],
    'video/mp2t': ['ts'],
    'video/mp4': ['*mp4', 'mp4v', '*mpg4'],
    'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
    'video/ogg': ['ogv'],
    'video/quicktime': ['qt', 'mov'],
    'video/webm': ['webm'],
};
Object.freeze(standard);

async function create(url, method, data, option) {
    const header = {
        'Content-Type': 'application/json',
        ...(option?.header || {}),
    };
    method = (method || 'GET').toUpperCase();
    const init = {
        method: method,
        headers: header,
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
    };
    console.info('init.headers:', init.headers);
    if (method == 'POST' || method == 'PUT') {
        init.body = JSON.stringify(data || {});
    }
    return fetch(new Request(url, init));
}
/*export async function get<T>(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<T> {
    return create(url, 'GET', data, option).then((response: Response) => response.json())
}

export async function post<T>(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<T> {
    return create(url, 'POST', data, option).then((response: Response) => response.json())
}

export async function put(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<Response> {
    return create(url, 'PUT', data, option)
}

export async function del<T>(url: string, data: Record<string, any> = {}, option?: CustomOption): Promise<T> {
    return create(url, 'DELETE', data, option).then((response: Response) => response.text())
}*/
var Request$1 = {
    create,
};

class Bin {
    config = {
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        region: ''
    };
    constructor(config) {
        this.config.accessKeyId = config.accessKeyId || '';
        this.config.accessKeySecret = config.accessKeySecret || '';
        this.config.bucket = config.bucket || '';
        this.config.region = config.region || '';
    }
    async uploadObject(source, object) {
        source = this.clean(source);
        const config = await this.requestConfig('PUT', source);
        let option = { header: config.header };
        return await Request$1.create(`${config.baseURL}/${source}`, 'PUT', object, option);
    }
    async removeObject(source, header) {
        source = this.clean(source);
        const config = await this.requestConfig('DELETE', source, header);
        let option = { header: config.header };
        return await Request$1.create(`${config.baseURL}/${source}`, 'DELETE', undefined, option);
    }
    // request配置
    async requestConfig(method, source, header = {}) {
        let date = new Date().toUTCString();
        header['Date'] = date;
        header['x-oss-date'] = date;
        header['Content-MD5'] = '';
        header['Content-Type'] = this.contentType(source);
        header['Authorization'] = await this.signature(method, source, header);
        const baseURL = `http://${this.config.bucket}.${this.config.region}.aliyuncs.com/`;
        return { baseURL, header };
    }
    // 签名
    async signature(method, source, header) {
        const signs = [];
        const xOssList = [];
        Object.keys(header).forEach((key) => {
            let value = header[key];
            key.startsWith('x-oss') && xOssList.push(key + ':' + value);
        });
        signs.push(method?.toUpperCase() || '');
        signs.push(header['Content-Md5'] || '');
        signs.push(header['Content-Type'] || '');
        signs.push(header.Date || '');
        signs.push(...xOssList.sort());
        signs.push(`/${this.config.bucket}/${source}`);
        let signature = new p('SHA-1', 'TEXT', {
            hmacKey: { value: this.config.accessKeySecret, format: 'TEXT' }
        })
            .update(signs.join('\n'))
            .getHash('B64')
            .toString();
        return `OSS ${this.config.accessKeyId}:${signature}`;
    }
    clean(source) {
        return source
            .split('/')
            .filter((i) => i.length != 0)
            .join('/');
    }
    contentType(source) {
        let source_list = source.split('.');
        let source_suffix = source_list.splice(-1);
        if (source_suffix.length != 1) {
            return '';
        }
        let type = '';
        Object.keys(standard).forEach((key) => {
            let suffix_list = standard[key];
            if (Array.isArray(suffix_list)) {
                suffix_list.forEach((suffix) => {
                    if (suffix == source_suffix[0]?.toLowerCase()) {
                        type = key;
                    }
                });
            }
        });
        return type;
    }
}

class Service {
    bin;
    constructor(bin) {
        this.bin = bin;
    }
    // 上传文件
    async upload(source, object) {
        return this.bin.uploadObject(source, object);
    }
    // 删除文件
    async remove(source) {
        return this.bin.removeObject(source);
    }
    // 复制文件
    async copy(source, target) {
        console.log(source);
        console.log(target);
    }
}

var index = {
    Bin,
    Service
};

export { index as default };
//# sourceMappingURL=index.esm.js.map
