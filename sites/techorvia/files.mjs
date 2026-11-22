// File processing stays on the visitor's device. Optional pinned libraries load on demand.
// No file uploads, storage, tracking, or hidden server conversion.
const LIBS={
 pdf:"https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js",
 pdfjs:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs",
 pdfworker:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs",
 mammoth:"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.9.1/mammoth.browser.min.js",
 ocr:"https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js",
 qr:"https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js"
};
const cached=new Map();
async function script(key,globalName){
 if(globalThis[globalName])return globalThis[globalName];
 if(!cached.has(key))cached.set(key,new Promise((resolve,reject)=>{
  const tag=document.createElement("script");tag.src=LIBS[key];tag.async=true;tag.crossOrigin="anonymous";
  tag.onload=()=>globalThis[globalName]?resolve(globalThis[globalName]):reject(Error(globalName+" library unavailable."));
  tag.onerror=()=>reject(Error("Failed to load "+key+". Check connectivity or privacy blockers."));document.head.append(tag);
 }));
 return cached.get(key);
}
const pdfLib=()=>script("pdf","PDFLib");
async function pdfJs(){
 if(!cached.has("pdfjs"))cached.set("pdfjs",import(LIBS.pdfjs).then(x=>{x.GlobalWorkerOptions.workerSrc=LIBS.pdfworker;return x;}));
 return cached.get("pdfjs");
}
function firstFile(files){if(!files?.length)throw Error("Choose a file to process.");return files[0];}
const limited=(files,maxBytes=30*1024*1024)=>{
 if(!files.length)throw Error("Please choose at least one file.");
 if(files.length>30)throw Error("Select no more than 30 files at once.");
 let size=0;for(const f of files){if(f.size===0||f.size>maxBytes)throw Error("One file is empty or too large. Limit 30 MB per file.");size+=f.size;}
 if(size>90*1024*1024)throw Error("Combined input exceeds 90 MB. Split into smaller batches.");
};
const data=async f=>new Uint8Array(await f.arrayBuffer());
async function verifyPdf(f){
 const bytes=await data(f);
 if(String.fromCharCode(...bytes.slice(0,5))!=="%PDF-")throw Error("File is not a recognized PDF.");
 return bytes;
}
const blobFile=(bytes,name,mime="application/octet-stream")=>({blob:new Blob([bytes],{type:mime}),name});
const textResult=(text,name)=>({text:String(text),name});
const escape=s=>String(s).replace(/[<>&"']/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[c]));
const utf8=s=>new TextEncoder().encode(String(s));
function u16(n){return new Uint8Array([n&255,(n>>>8)&255]);}
function u32(n){return new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);}
const concat=parts=>{const total=parts.reduce((s,x)=>s+x.length,0),out=new Uint8Array(total);let i=0;for(const p of parts){out.set(p,i);i+=p.length;}return out;};
const table=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;}return t;})();
const crc32=bytes=>{let c=0xffffffff;for(const n of bytes)c=(c>>>8)^table[(c^n)&255];return(c^0xffffffff)>>>0;};
export function zipStore(entries) {
 const local=[],central=[];let pos=0;
 if(!entries.length||entries.length>500)throw Error("ZIP contains an unsupported file count.");
 for(const e of entries){
  if(!/^(?:\[Content_Types\]\.xml|[a-zA-Z0-9_][a-zA-Z0-9._/-]{0,150})$/.test(e.name)||e.name.includes(".."))throw Error("Invalid ZIP entry name.");
  const name=utf8(e.name),content=e.bytes instanceof Uint8Array?e.bytes:new Uint8Array(e.bytes);
  const crc=crc32(content);const flag=u16(0x0800);
  const lh=concat([u32(0x04034b50),u16(20),flag,u16(0),u16(0),u16(0),u32(crc),u32(content.length),u32(content.length),u16(name.length),u16(0),name,content]);
  const cd=concat([u32(0x02014b50),u16(20),u16(20),flag,u16(0),u16(0),u16(0),u32(crc),u32(content.length),u32(content.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(pos),name]);
  local.push(lh);central.push(cd);pos+=lh.length;
 }
 const directory=concat(central),end=concat([u32(0x06054b50),u16(0),u16(0),u16(entries.length),u16(entries.length),u32(directory.length),u32(pos),u16(0)]);
 return concat([...local,directory,end]);
}
export function createDocx(text) {
 const paragraphs=String(text).replace(/\r/g,"").split("\n").slice(0,20000).map(line=>'<w:p><w:r><w:t xml:space="preserve">'+escape(line)+'</w:t></w:r></w:p>').join("");
 const document='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paragraphs+'<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>';
 const types='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>';
 const rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
 return zipStore([{name:"[Content_Types].xml",bytes:utf8(types)},{name:"_rels/.rels",bytes:utf8(rels)},{name:"word/document.xml",bytes:utf8(document)}]);
}
const wordResult=text=>blobFile(createDocx(text),"converted.docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
const getPages=(input,total)=>{
 const text=String(input||"all").trim().toLowerCase();if(text==="all"||text==="")return Array.from({length:total},(_,i)=>i);
 const indexes=[];for(const part of text.split(",")){const match=/^(\d+)(?:-(\d+))?$/.exec(part.trim());if(!match)throw Error("Pages must use e.g. 1-3,5.");const a=+match[1],b=match[2]?+match[2]:a;if(a<1||b<a||b>total)throw Error("Page selection is outside document.");for(let i=a;i<=b;i++)indexes.push(i-1);}
 if(indexes.length>300||!indexes.length)throw Error("Too many or no pages selected.");return indexes;
};
const takePdf=async f=>{const lib=await pdfLib();return lib.PDFDocument.load(await verifyPdf(f));};
const readPdf=async f=>{const js=await pdfJs();const bytes=await verifyPdf(f);return js.getDocument({data:bytes}).promise;};
async function extractText(f){
 const pdf=await readPdf(f);try{const chunks=[];for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i),content=await page.getTextContent();chunks.push(content.items.map(x=>x.str).join(" "));}return chunks.join("\n\n");}finally{await pdf.destroy();}
}
async function makeTextPdf(content){
 const {PDFDocument,StandardFonts,rgb}=await pdfLib();const pdf=await PDFDocument.create(),font=await pdf.embedFont(StandardFonts.Helvetica);
 const text=String(content).replace(/[^\x09\x0A\x0D\x20-\x7E]/g,"?").slice(0,250000);
 const lines=[];for(const p of text.split("\n")){let s=p||" ";while(s.length>92){lines.push(s.slice(0,92));s=s.slice(92);}lines.push(s);}
 let page=pdf.addPage([595,842]),y=800;for(const line of lines){if(y<55){page=pdf.addPage([595,842]);y=800;}page.drawText(line,{x:38,y,size:10,font,color:rgb(.12,.18,.23)});y-=14;}
 return blobFile(await pdf.save(),"converted.pdf","application/pdf");
}
async function picture(file){
 const url=URL.createObjectURL(file);
 try{const img=new Image();img.decoding="async";img.src=url;await img.decode();if(!img.naturalWidth||!img.naturalHeight)throw Error("Invalid image.");if(img.naturalWidth*img.naturalHeight>55e6)throw Error("Image dimensions exceed supported size.");return img;}finally{ /* object url remains while image decodes; use image src ref until drawing */ }
}
const canvasBlob=(canvas,type="image/png",quality=.85)=>new Promise((resolve,reject)=>canvas.toBlob(x=>x?resolve(x):reject(Error("Browser could not encode image.")),type,quality));
const imageExt=mime=>mime==="image/jpeg"?"jpg":mime==="image/webp"?"webp":"png";
const fileImage=async(file,format="image/png",options={})=>{
 const img=await picture(file);
 try{
 const width=Math.max(1,Math.min(8000,Math.round(+options.width||img.naturalWidth))),height=Math.max(1,Math.min(8000,Math.round(+options.height||img.naturalHeight)));
 if(width*height>55e6)throw Error("Result image is too large.");
 const rotate=Number(options.rotate||0),turn=rotate===90||rotate===270;
 const canvas=document.createElement("canvas");canvas.width=turn?height:width;canvas.height=turn?width:height;
 const ctx=canvas.getContext("2d");if(!ctx)throw Error("Canvas unavailable.");
 if(format==="image/jpeg"){ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);}
 ctx.translate(canvas.width/2,canvas.height/2);if(rotate)ctx.rotate(rotate*Math.PI/180);if(options.flip)ctx.scale(-1,1);
 ctx.filter=options.grayscale?"grayscale(100%)":"none";
 if(options.crop){
  const [x,y,cw,ch]=options.crop;ctx.drawImage(img,x,y,cw,ch,-width/2,-height/2,width,height);
 }else ctx.drawImage(img,-width/2,-height/2,width,height);
 const data=await canvasBlob(canvas,format,Number(options.quality??.86));return data;
 }finally{URL.revokeObjectURL(img.src);}
};
async function photoToPdf(files){
 const lib=await pdfLib(),pdf=await lib.PDFDocument.create();
 for(const file of files){
  const blob=await fileImage(file,"image/jpeg",{quality:.92});const img=await pdf.embedJpg(await blob.arrayBuffer());
  const page=pdf.addPage([595,842]);const scale=Math.min((595-50)/img.width,(842-50)/img.height);
  page.drawImage(img,{x:(595-img.width*scale)/2,y:(842-img.height*scale)/2,width:img.width*scale,height:img.height*scale});
 }
 return blobFile(await pdf.save(),"images.pdf","application/pdf");
}
const sanitize=name=>String(name).replace(/[^a-zA-Z0-9._-]+/g,"_").replace(/^\.+/,"").slice(0,80)||"converted";
const ab=async blob=>new Uint8Array(await blob.arrayBuffer());
export async function processFile(tool,files,fields={},text=""){
 const list=[...files];const op=tool.op;
 const needsFile=tool.mode==="pdf"||tool.mode==="image"||tool.mode==="media"||(tool.mode==="office"&&!["text-docx","text-pdf"].includes(op))||op==="file-hash"||op==="qr-read";
 if(needsFile)limited(list);
 if(tool.mode==="pdf"){
  if(op==="images-pdf")return photoToPdf(list);
  if(op==="render-jpg"||op==="render-png"||op==="extract-text"||op==="extract-docx"||op==="metadata"){
   const file=firstFile(list);if(op==="extract-text")return textResult(await extractText(file),"extracted.txt");
   if(op==="extract-docx"){const body=await extractText(file);if(!body.trim())throw Error("No searchable text found. Scanned PDFs require OCR.");return wordResult(body);}
   const pdf=await readPdf(file);try{
    if(op==="metadata"){const d=await pdf.getMetadata().catch(()=>({info:{}}));return textResult(JSON.stringify({pages:pdf.numPages,metadata:d.info||{}},null,2));}
    const pages=getPages(fields.pages||"all",pdf.numPages);if(pages.length>20)throw Error("Limit rendering to 20 pages at a time.");
    const entries=[],isJpg=op==="render-jpg";
    for(const i of pages){const page=await pdf.getPage(i+1),view=page.getViewport({scale:1.5});if(view.width*view.height>35e6)throw Error("Page resolution too high.");
     const cv=document.createElement("canvas");cv.width=Math.ceil(view.width);cv.height=Math.ceil(view.height);const ctx=cv.getContext("2d");await page.render({canvasContext:ctx,viewport:view}).promise;
     const mime=isJpg?"image/jpeg":"image/png";entries.push({name:"page-"+(i+1)+"."+(isJpg?"jpg":"png"),bytes:await ab(await canvasBlob(cv,mime,.88))});
    }
    if(entries.length===1)return blobFile(entries[0].bytes,entries[0].name,isJpg?"image/jpeg":"image/png");
    return blobFile(zipStore(entries),"pdf-pages.zip","application/zip");
   }finally{await pdf.destroy();}
  }
  const pdf=await takePdf(firstFile(list));const lib=await pdfLib();const count=pdf.getPageCount();
  if(op==="merge"){for(let i=1;i<list.length;i++){const other=await takePdf(list[i]),copied=await pdf.copyPages(other,other.getPageIndices());for(const page of copied)pdf.addPage(page);}}
  else if(op==="split"||op==="reorder"){const selected=getPages(fields.pages,count);const newPdf=await lib.PDFDocument.create(),pages=await newPdf.copyPages(pdf,selected);for(const page of pages)newPdf.addPage(page);return blobFile(await newPdf.save(),op==="split"?"split.pdf":"reordered.pdf","application/pdf");}
  else if(op==="remove-pages"){const remove=new Set(getPages(fields.pages,count));if(remove.size>=count)throw Error("Cannot remove all pages.");for(let i=count-1;i>=0;i--)if(remove.has(i))pdf.removePage(i);}
  else if(op==="rotate"){const deg=Number(fields.angle||90);if(![90,180,270].includes(deg))throw Error("Rotation must be 90, 180 or 270.");for(const page of pdf.getPages())page.setRotation(lib.degrees((page.getRotation().angle+deg)%360));}
  else if(op==="watermark"){const word=String(fields.watermark||"DRAFT").slice(0,50);if(!/^[\x20-\x7E]+$/.test(word))throw Error("Watermark supports basic Latin text only.");const font=await pdf.embedFont(lib.StandardFonts.HelveticaBold);for(const page of pdf.getPages())page.drawText(word,{x:30,y:page.getHeight()/2,size:42,font,opacity:.24,rotate:lib.degrees(32),color:lib.rgb(.3,.3,.3)});}
  else throw Error("PDF operation unsupported.");
  return blobFile(await pdf.save(),"modified.pdf","application/pdf");
 }
 if(tool.mode==="image"){
  const f=firstFile(list);
  if(op==="info"){const img=await picture(f);try{return textResult(JSON.stringify({name:f.name,type:f.type,sizeBytes:f.size,width:img.naturalWidth,height:img.naturalHeight},null,2));}finally{URL.revokeObjectURL(img.src);}}
  const format=op==="jpg"?"image/jpeg":op==="webp"?"image/webp":"image/png";
  if(op==="batch"){const mime=String(fields.format||"image/webp");if(!["image/png","image/jpeg","image/webp"].includes(mime))throw Error("Invalid format.");const entries=[];for(let i=0;i<list.length;i++){const b=await fileImage(list[i],mime,{quality:.78});entries.push({name:"image-"+(i+1)+"."+imageExt(mime),bytes:await ab(b)});}return blobFile(zipStore(entries),"converted-images.zip","application/zip");}
  const choice=op==="compress"?String(fields.format||"image/webp"):["resize","crop","rotate","flip","grayscale","sanitize"].includes(op)?"image/png":format;
  const option={quality:Number(fields.quality||.78)};
  if(op==="compress")option.quality=Number(fields.quality||.7);
  if(op==="resize"){option.width=Number(fields.width);option.height=Number(fields.height);}
  if(op==="rotate")option.rotate=Number(fields.angle||90);
  if(op==="flip")option.flip=true;
  if(op==="grayscale")option.grayscale=true;
  if(op==="crop"){const x=Number(fields.x||0),y=Number(fields.y||0),w=Number(fields.width),h=Number(fields.height);if(![x,y,w,h].every(Number.isFinite)||w<=0||h<=0||x<0||y<0)throw Error("Crop dimensions must be valid.");option.crop=[x,y,w,h];option.width=w;option.height=h;}
  if(!["image/jpeg","image/png","image/webp"].includes(choice))throw Error("Unsupported output format.");
  const converted=await fileImage(f,choice,option);return {blob:converted,name:"converted."+imageExt(choice)};
 }
 if(tool.mode==="office"){
  if(op==="text-docx")return wordResult(text);
  if(op==="text-pdf")return makeTextPdf(text);
  if(op==="ocr-text"||op==="ocr-docx"){
   const t=await script("ocr","Tesseract"),worker=await t.createWorker("eng");
   try{const found=await worker.recognize(firstFile(list));const output=found.data.text;if(!output.trim())throw Error("No text recognized.");return op==="ocr-docx"?wordResult(output):textResult(output,"recognized.txt");}
   finally{await worker.terminate();}
  }
  const mam=await script("mammoth","mammoth");const r=await mam.extractRawText({arrayBuffer:await firstFile(list).arrayBuffer()});const txt=r.value||"";
  if(!txt.trim())throw Error("No text found in DOCX.");return op==="docx-pdf"?makeTextPdf(txt):textResult(txt,"document.txt");
 }
 if(tool.mode==="media"){
  const f=firstFile(list);
  if(op==="frame-png"||op==="frame-jpg"){
   const u=URL.createObjectURL(f),video=document.createElement("video");video.muted=true;video.preload="auto";video.src=u;
   try{
    await new Promise((resolve,reject)=>{video.onloadedmetadata=resolve;video.onerror=()=>reject(Error("Browser cannot read this video."));});
    const time=Math.max(0,Math.min(Number(fields.time)||0,Math.max(0,video.duration-.05)));
    await new Promise((resolve,reject)=>{video.onseeked=resolve;video.onerror=()=>reject(Error("Unable to seek video."));if(time===0&&video.readyState>=2)resolve();else video.currentTime=time;});
    const cv=document.createElement("canvas");cv.width=video.videoWidth;cv.height=video.videoHeight;if(cv.width*cv.height>35e6)throw Error("Frame too large.");
    cv.getContext("2d").drawImage(video,0,0);const mime=op==="frame-jpg"?"image/jpeg":"image/png";return {blob:await canvasBlob(cv,mime,.9),name:"frame."+imageExt(mime)};
   }finally{video.removeAttribute("src");video.load();URL.revokeObjectURL(u);}
  }
  const ctx=new (window.AudioContext||window.webkitAudioContext)();
  try{const decoded=await ctx.decodeAudioData(await f.arrayBuffer());let start=0,end=decoded.length;
   if(op==="audio-trim"){start=Math.round(Number(fields.start||0)*decoded.sampleRate);end=Math.round(Number(fields.end||decoded.duration)*decoded.sampleRate);if(start<0||end<=start||end>decoded.length)throw Error("Invalid trim range.");}
   const channels=Math.min(2,decoded.numberOfChannels),len=end-start,bytes=new ArrayBuffer(44+len*channels*2),dv=new DataView(bytes);
   const write=(pos,s)=>{for(let i=0;i<s.length;i++)dv.setUint8(pos+i,s.charCodeAt(i));};
   write(0,"RIFF");dv.setUint32(4,36+len*channels*2,true);write(8,"WAVE");write(12,"fmt ");dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,channels,true);dv.setUint32(24,decoded.sampleRate,true);dv.setUint32(28,decoded.sampleRate*channels*2,true);dv.setUint16(32,channels*2,true);dv.setUint16(34,16,true);write(36,"data");dv.setUint32(40,len*channels*2,true);
   const arrays=Array.from({length:channels},(_,i)=>decoded.getChannelData(i));let p=44;for(let i=start;i<end;i++)for(const arr of arrays){const sample=Math.max(-1,Math.min(1,arr[i]));dv.setInt16(p,sample<0?sample*32768:sample*32767,true);p+=2;}
   return blobFile(bytes,"audio.wav","audio/wav");
  }finally{await ctx.close();}
 }
 if(tool.mode==="security"&&op==="file-hash"){const buffer=await crypto.subtle.digest("SHA-256",await firstFile(list).arrayBuffer());return textResult([...new Uint8Array(buffer)].map(x=>x.toString(16).padStart(2,"0")).join(""),"sha256.txt");}
 if(tool.mode==="qr"){
  if(op==="qr-read"){if(!("BarcodeDetector" in window))throw Error("QR reading needs BarcodeDetector, unavailable here. Try Chrome or Edge on a supported device.");const detector=new BarcodeDetector({formats:["qr_code"]}),img=await createImageBitmap(firstFile(list));const found=await detector.detect(img);img.close();if(!found.length)throw Error("No QR code found.");return textResult(found.map(x=>x.rawValue).join("\n"));}
  const q=await script("qr","QRCode"),content=op==="wifi-qr"?"WIFI:T:WPA;S:"+String(fields.ssid||"").replace(/([\\;,":])/g,"\\$1")+";P:"+String(fields.password||"").replace(/([\\;,":])/g,"\\$1")+";;":text;
  if(!content.trim())throw Error("Enter QR content.");const cv=document.createElement("canvas");
  await q.toCanvas(cv,content,{width:512,margin:3,errorCorrectionLevel:"M"});return {blob:await canvasBlob(cv),name:"qr-code.png"};
 }
 if(tool.mode==="network"){
  if(op==="browser")return textResult(JSON.stringify({userAgent:navigator.userAgent,language:navigator.language,cookiesEnabled:navigator.cookieEnabled,crypto:!!crypto.subtle,webAssembly:typeof WebAssembly!=="undefined",barcodeDetector:"BarcodeDetector" in window,mediaRecorder:"MediaRecorder" in window},null,2));
  if(op==="ip"){const x=await fetch("https://api.ipify.org?format=json");if(!x.ok)throw Error("IP provider failed.");return textResult((await x.json()).ip);}
  if(op==="dns"){
   const domain=String(fields.domain||"example.com").trim().toLowerCase();if(!/^(?=.{1,253}$)[a-z0-9]+(?:[a-z0-9.-]*[a-z0-9])?$/.test(domain)||domain.includes(".."))throw Error("Enter a valid domain.");
   const type=String(fields.type||"A");if(!["A","AAAA","MX","TXT","NS","CNAME"].includes(type))throw Error("Invalid record type.");
   const x=await fetch("https://dns.google/resolve?name="+encodeURIComponent(domain)+"&type="+type,{headers:{Accept:"application/dns-json"}});if(!x.ok)throw Error("Public DNS lookup unavailable.");
   const data=await x.json();return textResult(JSON.stringify({status:data.Status,answers:data.Answer||[],notice:"Public Google DNS lookup; data can be cached."},null,2));
  }
 }
 throw Error("No file handler available for "+tool.slug);
}
