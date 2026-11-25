import test from "node:test";import assert from "node:assert/strict";import {DEFAULT,cleanProfile,MISSIONS,attempt,exportAvatar,importAvatar} from "../nexus/core.mjs";
test("empty identity cannot play",()=>assert.equal(attempt(DEFAULT,0,1).result,"locked"));
test("sequential unlock and retry",()=>{let p=cleanProfile({alias:"Astra"});assert.equal(attempt(p,2,2).result,"locked");assert.equal(attempt(p,0,0).result,"retry");for(let i=0;i<5;i++){let r=attempt(p,i,MISSIONS[i].answer);assert.equal(r.result,"complete");p=r.profile}assert.equal(p.completed,5);assert.equal(attempt(p,5,0).result,"locked")});
test("local state is bounded",()=>assert.equal(cleanProfile({completed:1000000,color:"invalid"}).completed,5));
test("export contains appearance only",()=>{let a=exportAvatar({alias:"Astra",completed:5,secret:"no"});assert.deepEqual(Object.keys(a).sort(),["alias","armor","color","emblem","helmet","schema"]);assert.equal(a.schema,"unvor.avatar.v1")});
test("invalid imports rejected",()=>assert.throws(()=>importAvatar({schema:"unvor.avatar.v1",alias:"",color:"cyan"},DEFAULT)));
test("import does not transfer mission progress",()=>{let a=exportAvatar({alias:"Astra",completed:5});a.completed=100;assert.equal(importAvatar(a,DEFAULT).completed,0)});
