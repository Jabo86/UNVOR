// Small dependency-free WebGL scene. All geometry is original procedural art.
const VERT="attribute vec3 p; attribute vec3 n; uniform mat4 mvp; uniform mat4 model; varying vec3 normal; varying vec3 pos; void main(){gl_Position=mvp*vec4(p,1.);normal=normalize(mat3(model)*n);pos=(model*vec4(p,1.)).xyz;}";
const FRAG="precision mediump float; uniform vec3 tint; uniform float emit; varying vec3 normal; varying vec3 pos; void main(){float l=max(0.,dot(normalize(normal),normalize(vec3(-.5,.9,.7))));float r=pow(1.-abs(normal.z),2.);vec3 c=tint*(.24+.76*l)+vec3(.025,.10,.14)*r+emit*tint; float fog=clamp((length(pos.xz)-6.)/15.,0.,.7);gl_FragColor=vec4(mix(c,vec3(.012,.024,.045),fog),1.);}";
const I=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
const mul=(a,b)=>Array.from({length:16},(_,i)=>{let c=i>>2,r=i%4;return a[r]*b[c*4]+a[r+4]*b[c*4+1]+a[r+8]*b[c*4+2]+a[r+12]*b[c*4+3]});
function T(x,y,z){let m=I();m[12]=x;m[13]=y;m[14]=z;return m}
function S(x,y,z){let m=I();m[0]=x;m[5]=y;m[10]=z;return m}
function Y(a){let c=Math.cos(a),s=Math.sin(a);return [c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]}
function Z(a){let c=Math.cos(a),s=Math.sin(a);return [c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1]}
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const sub=(a,b)=>a.map((v,i)=>v-b[i]); const norm=a=>{let l=Math.hypot(...a)||1;return a.map(x=>x/l)}; const dot=(a,b)=>a.reduce((v,x,i)=>v+x*b[i],0);
function view(eye,target){let z=norm(sub(eye,target)),x=norm(cross([0,1,0],z)),y=cross(z,x);return [x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]}
function proj(aspect){let f=1/Math.tan(Math.PI/7),near=.1,far=80;return [f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]}
function prism(sides,top=1){let data=[];const tri=(a,b,c)=>{let n=norm(cross(sub(b,a),sub(c,a)));for(let p of [a,b,c])data.push(...p,...n)};
for(let i=0;i<sides;i++){let a=2*Math.PI*i/sides+Math.PI/4,b=2*Math.PI*(i+1)/sides+Math.PI/4;let v=[Math.cos(a),-1,Math.sin(a)],w=[Math.cos(b),-1,Math.sin(b)],u=[v[0]*top,1,v[2]*top],t=[w[0]*top,1,w[2]*top];tri(v,u,w);tri(w,u,t);tri([0,1,0],t,u);tri([0,-1,0],v,w)}return new Float32Array(data)}
function hex(s){return [1,3,5].map(i=>parseInt(s.slice(i,i+2),16)/255)}
export function mountScene(canvas, getProfile, colors){
 const gl=canvas.getContext("webgl",{antialias:true,alpha:false});
 if(!gl)return null;
 const compile=(type,src)=>{let sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(sh));return sh};
 let program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,VERT));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,FRAG));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error("WebGL link failed");
 gl.useProgram(program);let p=gl.getAttribLocation(program,"p"),n=gl.getAttribLocation(program,"n");let uniforms={};for(let name of ["mvp","model","tint","emit"])uniforms[name]=gl.getUniformLocation(program,name);
 const meshes={};for(let [name,verts] of [["box",prism(4)],["plate",prism(6,.66)],["cyl",prism(32)],["cone",prism(8,.15)]]){let b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,verts,gl.STATIC_DRAW);meshes[name]={b,count:verts.length/6}}
 gl.enable(gl.DEPTH_TEST);gl.clearColor(.012,.025,.045,1);
 let angle=.22, pitch=.1, distance=9.2, dragging=false,lastX=0,lastY=0,paused=matchMedia("(prefers-reduced-motion: reduce)").matches, frame=0, dirty=true;
 canvas.addEventListener("pointerdown",e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener("pointermove",e=>{if(dragging){angle+=(e.clientX-lastX)*.008;pitch=Math.max(-.15,Math.min(.65,pitch+(e.clientY-lastY)*.005));lastX=e.clientX;lastY=e.clientY;dirty=true}});
 for(const event of ["pointerup","pointercancel","lostpointercapture"])canvas.addEventListener(event,()=>dragging=false);
 function draw(time){frame=requestAnimationFrame(draw);if(document.hidden)return;const rect=canvas.getBoundingClientRect(),scale=Math.min(devicePixelRatio||1,1.5),w=Math.max(1,Math.round(rect.width*scale)),h=Math.max(1,Math.round(rect.height*scale));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;dirty=true}if(paused&&!dirty)return;dirty=false;
 gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
 const profile=getProfile(),accent=hex(colors[profile.color]),metal=profile.armor==="sovereign"?[.57,.49,.29]:profile.armor==="astral"?[.59,.66,.77]:[.29,.38,.49],dark=[.07,.11,.16],light=[.6,.76,.83];
 let eye=[Math.sin(angle)*distance,3.1+pitch*distance,Math.cos(angle)*distance],vp=mul(proj(w/h),view(eye,[0,2.15,0]));
 function part(mesh,x,y,z,sx,sy,sz,color,em=0,ry=0,rz=0){let m=mul(T(x,y,z),mul(Y(ry),mul(Z(rz),S(sx,sy,sz))));let q=meshes[mesh];gl.bindBuffer(gl.ARRAY_BUFFER,q.b);gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,3,gl.FLOAT,false,24,0);gl.enableVertexAttribArray(n);gl.vertexAttribPointer(n,3,gl.FLOAT,false,24,12);gl.uniformMatrix4fv(uniforms.mvp,false,new Float32Array(mul(vp,m)));gl.uniformMatrix4fv(uniforms.model,false,new Float32Array(m));gl.uniform3fv(uniforms.tint,color);gl.uniform1f(uniforms.emit,em);gl.drawArrays(gl.TRIANGLES,0,q.count)}
 // Concentric hangar floor and luminous edge strips.
 part("cyl",0,-.32,0,7,.16,7,[.045,.075,.11]);
 part("cyl",0,-.09,0,2.64,.085,2.64,dark);
 part("cyl",0,.003,0,2.49,.02,2.49,accent,.7);
 part("cyl",0,.037,0,2.34,.025,2.34,[.075,.13,.19]);
 for(let i=0;i<32;i++){let a=i*Math.PI/16;part("box",Math.cos(a)*3.5,-.13,Math.sin(a)*3.5,.18,.018,.08,accent,.55,-a)}
 for(let i=0;i<10;i++){let a=i*Math.PI/5,x=Math.cos(a)*5.6,z=Math.sin(a)*5.6;part("box",x,2.7,z,.35,2.9,.35,[.055,.095,.145],0,-a);part("box",x,2.7,z,.055,2.65,.36,[.04,.47,.65],.6,-a);part("box",x,5.55,z,.7,.15,.7,metal)}
 // Guardian, built as beveled armor over articulated joints.
 for(let side of [-1,1]){
 let x=side*.48;
 part("plate",x,.27,.2,.33,.2,.52,metal);part("box",x,.35,.53,.21,.045,.045,accent,.9);
 part("plate",x,.86,0,.29,.48,.3,metal,0,0,-side*.07);
 part("plate",x,1.38,.07,.29,.21,.3,dark);
 part("box",x,1.38,.31,.14,.065,.06,accent,.8);
 part("plate",x,1.81,0,.33,.42,.32,metal,0,0,side*.07);
 part("plate",side*.85,3.25,0,.46,.23,.43,metal,0,0,-side*.16);
 part("box",side*1.00,3.31,.31,.20,.047,.075,accent,1);
 part("plate",side*1.01,2.81,0,.24,.36,.26,dark,0,0,side*.16);
 part("plate",side*1.15,2.32,.04,.28,.34,.29,metal,0,0,side*.14);
 part("box",side*1.19,1.99,.03,.16,.17,.17,dark);
 }
 part("plate",0,2.15,0,.67,.3,.37,dark);
 part("plate",0,2.75,0,.84,.56,.43,metal);
 part("plate",0,2.75,.35,.50,.34,.17,dark);
 part("box",-.13,2.88,.52,.065,.22,.065,accent,1,0,.62);
 part("box",.13,2.88,.52,.065,.22,.065,accent,1,0,-.62);
 if(profile.emblem==="star")part("cone",0,2.62,.55,.13,.14,.06,accent,1);
 if(profile.emblem==="orbit")part("cyl",0,2.62,.55,.17,.055,.12,accent,1);
 part("cyl",0,3.39,0,.21,.14,.21,dark);
 part("plate",0,3.77,0,.36,.35,.34,metal);
 part("plate",0,3.76,.27,.31,.18,.15,dark);
 part("box",-.135,3.82,.42,.105,.048,.05,accent,1,0,-.14);
 part("box",.135,3.82,.42,.105,.048,.05,accent,1,0,.14);
 if(profile.helmet==="crown")for(let s of [-1,1])part("cone",s*.26,4.18,0,.14,.24,.15,metal,0,0,-s*.24);
 if(profile.helmet==="orbital")part("cyl",0,4.13,0,.41,.045,.41,accent,.85);
 if(profile.armor==="sovereign")for(let s of [-1,1])part("cone",s*.87,3.65,0,.2,.24,.2,metal);
 if(profile.armor==="astral")for(let s of [-1,1])part("plate",s*.48,2.9,-.48,.27,.68,.16,light,0,0,s*.24);
 }
 frame=requestAnimationFrame(draw);
 return {refresh(){dirty=true},rotate(delta){angle+=delta;dirty=true},zoom(delta){distance=Math.max(6.2,Math.min(13,distance+delta));dirty=true},pause(value){paused=value;dirty=true},dispose(){cancelAnimationFrame(frame)}};
}
