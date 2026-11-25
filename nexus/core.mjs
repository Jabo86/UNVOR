// UNVOR NEXUS: local prototype rules, no accounts or server.
export const COLORS = {cyan:"#42e8ff", gold:"#ffd17a", violet:"#ba91ff", green:"#78f0bf"};
export const ARMORS = ["sentinel","astral","sovereign"];
export const HELMETS = ["visor","crown","orbital"];
export const EMBLEMS = ["nexus","star","orbit"];
export const DEFAULT = Object.freeze({schema:1,alias:"",color:"cyan",armor:"sentinel",helmet:"visor",emblem:"nexus",completed:0});
export function cleanProfile(p) {
  const v = p && typeof p==="object" ? p : {};
  return {schema:1,alias:typeof v.alias==="string"?v.alias.trim().slice(0,24):"",
    color:Object.hasOwn(COLORS,v.color)?v.color:DEFAULT.color,
    armor:ARMORS.includes(v.armor)?v.armor:DEFAULT.armor,
    helmet:HELMETS.includes(v.helmet)?v.helmet:DEFAULT.helmet,
    emblem:EMBLEMS.includes(v.emblem)?v.emblem:DEFAULT.emblem,
    completed:Number.isInteger(v.completed)?Math.min(5,Math.max(0,v.completed)):0};
}
export const MISSIONS = Object.freeze([
 {title:"Il risveglio",story:"La stazione è silenziosa. Riattiva il nucleo scegliendo il simbolo dell'Alleanza.",prompt:"Quale simbolo completa la sequenza? ◆ ○ ◆ ○ ◆ …",options:["◆","○","△","□"],answer:1,detail:"La sequenza alterna due simboli."},
 {title:"Segnale dalle stelle",story:"Un osservatorio smarrito chiede di ristabilire la sua connessione.",prompt:"Il collegamento A–B costa 3 unità, B–C costa 2, A–C costa 8. Quale percorso consuma meno energia?",options:["A → C","A → B → C","A → B → A → C"],answer:1,detail:"3 + 2 = 5, meno di 8."},
 {title:"Il nucleo di cristallo",story:"Distribuisci energia ai tre moduli della sala senza superare la riserva.",prompt:"Hai 18 unità. Scudi ambientali: 4; comunicazioni: 5; archivio: 6. Quanta energia resta?",options:["2","4","3","6"],answer:2,detail:"18 − (4 + 5 + 6) = 3."},
 {title:"La mappa perduta",story:"Tre segnali identificano il settore in cui è custodito il prossimo frammento.",prompt:"Il settore è pari, maggiore di 10 e divisibile per 3. Quale soddisfa tutti gli indizi?",options:["15","14","18","21"],answer:2,detail:"18 è pari, maggiore di 10 e multiplo di 3."},
 {title:"Il portale dell'Alleanza",story:"Ricomponi l'ordine dei moduli per aprire il portale. È una prova di logica, non di velocità.",prompt:"A deve precedere C; B deve seguire C; D deve precedere A. Quale ordine rispetta tutti i vincoli?",options:["A – D – C – B","D – A – C – B","D – C – A – B","B – D – A – C"],answer:1,detail:"D precede A, A precede C, C precede B."}
]);
export function attempt(profile,index,choice){
  const p=cleanProfile(profile);
  if(!p.alias||!Number.isInteger(index)||index!==p.completed||!MISSIONS[index]) return {profile:p,result:"locked"};
  if(choice!==MISSIONS[index].answer) return {profile:p,result:"retry"};
  return {profile:{...p,completed:p.completed+1},result:"complete"};
}
export function exportAvatar(profile) {
  const {alias,color,armor,helmet,emblem}=cleanProfile(profile);
  // Appearance only. Not a credential, authorization or proof of achievements.
  return {schema:"unvor.avatar.v1",alias,color,armor,helmet,emblem};
}
export function importAvatar(data,profile){
  if(!data||data.schema!=="unvor.avatar.v1")throw new Error("Formato avatar non supportato");
  if(typeof data.alias!=="string"||!data.alias.trim()||data.alias.trim().length>24||!Object.hasOwn(COLORS,data.color)||!ARMORS.includes(data.armor)||!HELMETS.includes(data.helmet)||!EMBLEMS.includes(data.emblem))throw new Error("Profilo avatar non valido");
  return cleanProfile({...data,completed:cleanProfile(profile).completed});
}
