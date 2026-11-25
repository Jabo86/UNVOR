import {COLORS,DEFAULT,cleanProfile,MISSIONS,attempt,exportAvatar,importAvatar} from "./core.mjs";
import {mountScene} from "./scene.mjs";
const $=id=>document.getElementById(id);
const KEY="unvor.nexus.local.v1";
let saved=null;try{saved=localStorage.getItem(KEY)}catch{}
let profile=cleanProfile(null);try{if(saved)profile=cleanProfile(JSON.parse(saved))}catch{}
let committed=!!profile.alias, selected=Math.min(profile.completed,MISSIONS.length-1), scene=null;
$("remember").checked=!!saved;
const fields=["alias","armor","helmet","color","emblem"];
function setFields(){for(const k of fields)$(k).value=profile[k];document.documentElement.style.setProperty("--accent",COLORS[profile.color]);scene?.refresh()}
function draft(){return cleanProfile({...profile,...Object.fromEntries(fields.map(k=>[k,$(k).value]))})}
function persist(){try{if($("remember").checked)localStorage.setItem(KEY,JSON.stringify(profile));else localStorage.removeItem(KEY)}catch{$("identity-message").textContent="Salvataggio locale non disponibile; il profilo resta in memoria."}}
function status(s){$("identity-message").textContent=s}
function render(){
 $("progress").textContent=profile.completed+" / 100";$("progressbar").value=profile.completed;
 const list=$("mission-list");list.replaceChildren();
 MISSIONS.forEach((m,i)=>{const b=document.createElement("button");b.className="mission-row";b.textContent=String(i+1).padStart(3,"0")+" · "+m.title+(i<profile.completed?" ✓":i>profile.completed?" · Bloccata":"");b.disabled=!committed||i>profile.completed;b.setAttribute("aria-current",i===selected?"step":"false");b.onclick=()=>{selected=i;render()};list.append(b)});
 const m=MISSIONS[selected];$("mission-code").textContent="MISSIONE "+String(selected+1).padStart(3,"0");$("mission-title").textContent=m.title;$("story").textContent=m.story;$("question").textContent=m.prompt;$("feedback").textContent=!committed?"Attiva il tuo avatar per iniziare.":selected<profile.completed?"Missione completata. "+m.detail:"Scegli la risposta.";
 $("next").hidden=!(selected<profile.completed&&selected<MISSIONS.length-1);
 $("answers").replaceChildren();m.options.forEach((option,index)=>{const b=document.createElement("button");b.textContent=option;b.disabled=!committed||selected!==profile.completed;b.onclick=()=>{let r=attempt(profile,selected,index);if(r.result==="retry"){$("feedback").textContent="Non ancora. Rileggi gli indizi e riprova, senza limiti di tempo.";return}if(r.result==="complete"){profile=r.profile;persist();render();$("feedback").textContent="Frammento recuperato! "+m.detail+(profile.completed===5?" Hai completato tutte le missioni giocabili di questa versione.":"");$("next").hidden=selected===4}};$("answers").append(b)});
}
setFields();try{scene=mountScene($("scene"),draft,COLORS)}catch(e){console.warn("WebGL fallback",e)}
if(!scene){$("scene").hidden=true;$("fallback").hidden=false;document.querySelector(".scene-tools").hidden=true}
for(const k of fields)$(k).addEventListener("input",()=>{document.documentElement.style.setProperty("--accent",COLORS[draft().color]);scene?.refresh()});
$("profile-form").addEventListener("submit",e=>{e.preventDefault();const p=draft();if(!p.alias){status("Scegli un nome inventato.");return}profile=p;committed=true;persist();status("Avatar attivo: "+profile.alias+". Solo su questo dispositivo.");render();});
$("remember").addEventListener("change",()=>{if(committed)persist()});
$("left").onclick=()=>scene?.rotate(-.35);$("right").onclick=()=>scene?.rotate(.35);$("near").onclick=()=>scene?.zoom(-.7);$("far").onclick=()=>scene?.zoom(.7);
let paused=matchMedia("(prefers-reduced-motion: reduce)").matches;function motion(){scene?.pause(paused);$("motion").textContent=paused?"Riprendi":"Pausa";$("motion").setAttribute("aria-pressed",String(paused))}motion();$("motion").onclick=()=>{paused=!paused;motion()};
$("next").onclick=()=>{selected=Math.min(selected+1,MISSIONS.length-1);render()};
$("export").onclick=()=>{if(!committed){status("Attiva prima l'avatar.");return}const data=JSON.stringify(exportAvatar(profile),null,2);const url=URL.createObjectURL(new Blob([data],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="unvor-avatar.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status("File estetico esportato. Non contiene chiavi o credenziali.")};
$("import").onchange=async()=>{const f=$("import").files[0];if(!f)return;try{if(f.size>8192)throw new Error("File troppo grande");profile=importAvatar(JSON.parse(await f.text()),profile);committed=true;setFields();persist();render();status("Avatar importato solo in locale.")}catch(e){status("Importazione rifiutata: "+e.message)}finally{$("import").value=""}};
$("reset").onclick=()=>{if(!confirm("Eliminare avatar e progressi locali?"))return;profile=cleanProfile(DEFAULT);committed=false;selected=0;$("remember").checked=false;persist();setFields();render();status("Profilo locale eliminato.")};
if(committed)status("Avatar locale: "+profile.alias);render();
