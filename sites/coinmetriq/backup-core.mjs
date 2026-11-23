/* CoinMetriq journal backup. All encryption/decryption occurs locally using Web Crypto.
 * The browser never uploads keys, passphrases or trade rows. */
import {normalizeTrades,calculateCostBasis} from "./ledger-core.mjs";
const b64=bytes=>{let s="";for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.slice(i,i+8192));return btoa(s)};
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const provider=()=>{
 const webcrypto=globalThis.crypto;
 if(!webcrypto?.subtle||!webcrypto?.getRandomValues)throw Error("Secure HTTPS Web Crypto context required.");
 return webcrypto;
};
async function derived(pass,salt){
 const c=provider(),material=await c.subtle.importKey("raw",new TextEncoder().encode(pass),"PBKDF2",false,["deriveKey"]);
 return c.subtle.deriveKey({name:"PBKDF2",salt,iterations:210000,hash:"SHA-256"},material,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);
}
const validPass=s=>{if(typeof s!=="string"||s.length<12||s.length>512)throw Error("Use a 12–512 character backup passphrase.");return s};
export async function encryptJournal(trades,passphrase){
 const c=provider(),pass=validPass(passphrase);
 const normalized=normalizeTrades(trades);calculateCostBasis(normalized,"FIFO");
 const salt=c.getRandomValues(new Uint8Array(16)),iv=c.getRandomValues(new Uint8Array(12));
 const key=await derived(pass,salt);
 const plaintext=new TextEncoder().encode(JSON.stringify({version:1,trades:normalized}));
 if(plaintext.length>1500000)throw Error("Journal exceeds local backup size limit.");
 const payload=new Uint8Array(await c.subtle.encrypt({name:"AES-GCM",iv},key,plaintext));
 return {format:"coinmetriq-encrypted-journal",version:1,kdf:"PBKDF2-SHA256",iterations:210000,cipher:"AES-256-GCM",salt:b64(salt),iv:b64(iv),payload:b64(payload)};
}
export async function decryptJournal(data,passphrase){
 validPass(passphrase);
 if(!data||data.format!=="coinmetriq-encrypted-journal"||data.version!==1||data.kdf!=="PBKDF2-SHA256"||data.iterations!==210000||data.cipher!=="AES-256-GCM")throw Error("Unsupported encrypted backup format.");
 let salt,iv,payload;
 try{salt=unb64(data.salt);iv=unb64(data.iv);payload=unb64(data.payload);}
 catch{throw Error("Malformed encrypted backup data.");}
 if(salt.length!==16||iv.length!==12||payload.length<17||payload.length>2000000)throw Error("Invalid encrypted backup metadata.");
 const c=provider(),key=await derived(passphrase,salt);
 let plaintext;
 try{plaintext=await c.subtle.decrypt({name:"AES-GCM",iv},key,payload);}
 catch{throw Error("Wrong passphrase or corrupted authenticated backup. No data was restored.");}
 const text=new TextDecoder("utf-8",{fatal:true}).decode(plaintext);
 const json=JSON.parse(text);
 if(json?.version!==1||!Array.isArray(json.trades))throw Error("Decrypted journal format invalid.");
 const rows=normalizeTrades(json.trades);calculateCostBasis(rows,"FIFO");return rows;
}
