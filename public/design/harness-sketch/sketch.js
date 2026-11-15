/* First study: raster pencil art revealed by local graphite strokes,
   original vector annotations, and a deterministic camera timeline. */
const $ = s => document.querySelector(s);
const svg = $('#scene');
const ns = 'http://www.w3.org/2000/svg';
const duration = 49;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const chapters = [
  {
    "t": 0,
    "label": "The brief",
    "title": "Define the outcome.",
    "copy": "You set the goal, the expected result and the criteria used to check it."
  },
  {
    "t": 9,
    "label": "Context",
    "title": "Load the context this step needs.",
    "copy": "The harness selects the instructions, documents and current work state needed for the next decision."
  },
  {
    "t": 16,
    "label": "The model",
    "title": "The model proposes the next action.",
    "copy": "It can respond or request a tool. The harness governs execution through the configured permissions and limits."
  },
  {
    "t": 22,
    "label": "Act & observe",
    "title": "Execute, then inspect the result.",
    "copy": "The harness checks the tool request. The result goes back to the model, even when the action succeeds, to inform the next step."
  },
  {
    "t": 30,
    "label": "Fix or hand off",
    "title": "Inspect the failure. Fix it or hand off.",
    "copy": "Continue when the fix is justified and budget remains. If progress stops, a decision is missing or a limit is reached, hand off with the relevant evidence."
  },
  {
    "t": 39,
    "label": "Review",
    "title": "Check the revised version, then review it.",
    "copy": "Results for V1 do not validate V2. The affected checks run again and pass in this example. The result still needs review before deciding what comes next."
  },
  {
    "t": 44,
    "label": "Human oversight",
    "title": "You stay in control.",
    "copy": "You set the goal, the limits and the decisions to be made. The harness prepares a result you can verify; delivery and the intended user outcome still need confirmation."
  }
].map(chapter => ({...chapter, label:sketchText(chapter.label),title:sketchText(chapter.title),copy:sketchText(chapter.copy)}));
const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
const ease = v => {v=clamp(v);return v*v*(3-2*v)};
const create = (tag,attrs,parent) => {const e=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e};
let seed=61;
const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
const zones = [
  {x:0,w:350,start:0,end:5, contours:['M 12 526 L 190 470 L 350 520 L 180 577 Z L 12 526 L 15 609 L 180 652 L 342 599 L 350 520','M 136 403 Q 132 357 174 353 Q 219 354 211 397 L 194 428 L 166 433 L 136 403','M 145 410 L 102 397 L 58 443 L 44 498 L 67 513 L 95 469 L 128 499 L 176 519 L 221 508 L 206 491 L 175 491 L 163 455']},
  {x:325,w:375,start:9,end:14.5,contours:['M 363 242 L 602 235 L 600 582 L 367 590 Z M 365 316 L 600 308 M 366 393 L 598 387 M 370 474 L 597 469','M 406 403 L 482 398 L 529 487 L 451 492 Z M 448 508 L 634 525 L 670 511 M 448 508 L 448 594 L 634 621 L 670 602 L 670 511']},
  {x:650,w:525,start:15.5,end:21.5,contours:['M 691 246 L 1115 239 L 1169 284 L 1144 685 L 654 639 L 654 610 L 685 604 Z M 706 260 L 706 603 M 1120 260 L 1110 647','M 930 344 C 875 343 875 366 930 377 L 1017 378 C 1070 371 1074 350 1025 341 Z M 903 372 L 906 543 Q 968 577 1046 545 L 1048 373 M 907 544 Q 970 561 1045 544','M 802 216 C 747 216 747 314 806 314 C 864 313 870 217 802 216 M 982 225 C 930 218 924 312 979 318 C 1037 323 1046 230 982 225','M 865 466 L 947 474 L 935 528 L 840 516 Z L 865 466']},
  {x:1100,w:400,start:22,end:27,contours:['M 1136 583 L 1287 543 L 1450 582 L 1374 670 L 1137 630 Z L 1136 583 M 1140 632 L 1141 688 M 1370 670 L 1370 720 M 1450 583 L 1443 666','M 1252 459 L 1257 395 Q 1264 375 1283 376 L 1363 357 Q 1380 352 1390 375 L 1430 452 M 1264 454 L 1268 403 L 1368 382 L 1407 444']},
  {x:1440,w:360,start:30,end:34,contours:['M 1492 550 L 1614 514 L 1781 560 L 1763 627 L 1510 681 L 1492 550 M 1510 681 L 1520 735 M 1757 628 L 1754 689','M 1574 416 Q 1594 386 1633 398 Q 1667 407 1668 446 L 1650 484 L 1584 485 Q 1559 455 1574 416','M 1560 592 L 1686 585 L 1717 626 L 1584 662 Z']}
];
const strokes=[], outlines=[];
for(let z=0;z<zones.length;z++){
  const zone=zones[z];
  zone.start=z*.35; zone.end=6+z*.5;
  const clip=create('clipPath',{id:`zone-${z}`},svg.querySelector('defs'));
  create('rect',{x:zone.x,y:0,width:zone.w,height:900},clip);
  const group=create('g',{'clip-path':`url(#zone-${z})`},$('#reveal-strokes'));
  // Separate clusters of short diagonal pencil strokes, not a rectangular wipe.
  for(let row=0;row<8;row++)for(let col=0;col<5;col++){
    const left=zone.x+col*zone.w/5, top=90+row*100;
    const width=zone.w/5+35;
    let d='';
    for(let k=-2;k<9;k++){
      const y=top+k*16;
      const j=random()*5;
      d+=`M ${left-20} ${y+j} Q ${left+width*.5} ${y+30-j} ${left+width} ${y+54} `;
    }
    const path=create('path',{d,'stroke-width':25,pathLength:1,'stroke-dasharray':1,'stroke-dashoffset':1},group);
    // Roughly spatial order with local variation: contours precede graphite shading.
    const rowOrder=[3,4,2,5,1,6,0,7];
    const order=(col*8+rowOrder.indexOf(row)+random()*1.4)/42;
    strokes.push({path,zone,start:zone.start+.4+order*(zone.end-zone.start-1.4),length:.95});
  }
  // Original structural pencil lines introduce each station before its shading.
  zone.contours.forEach((d,i)=>{
    const path=create('path',{d,pathLength:1,'stroke-dasharray':1,'stroke-dashoffset':1},$('#construction'));
    outlines.push({path,start:zone.start+i*.22,zone});
  });
  const fill=create('rect',{x:zone.x,y:0,width:zone.w,height:900,fill:'white',opacity:0},group);
  zone.fill=fill;
}
// The physical return conduit is drawn after the first failed check.
const conduit=create('path',{d:'M 711 651 Q 708 695 766 710 L 1223 793 Q 1450 844 1515 773 L 1523 713',stroke:'white','stroke-width':65,fill:'none',pathLength:1,'stroke-dasharray':1,'stroke-dashoffset':1},$('#reveal-strokes'));
const notes=[...document.querySelectorAll('#notes>g')];
const noteOrigins=new Map(notes.map(n=>{const m=n.transform.baseVal.consolidate().matrix;return [n,[m.e,m.f]]}));
function positionNoteCards(){
  const b=svg.viewBox.baseVal;
  for(const n of notes){
    const [x,y]=noteOrigins.get(n),r=n.querySelector('.note-card').getBBox();
    n.setAttribute('transform',`translate(${clamp(x,b.x+18-r.x,b.x+b.width-18-r.x-r.width)} ${clamp(y,b.y+20-r.y,b.y+b.height-24-r.y-r.height)})`);
  }
}
function layoutNoteCards(){
  for(const n of notes){
    n.querySelectorAll('rect').forEach(r=>r.remove());
    const boxes=[...n.querySelectorAll('text')].map(text=>text.getBBox());
    const x=Math.min(...boxes.map(b=>b.x)),y=Math.min(...boxes.map(b=>b.y));
    const right=Math.max(...boxes.map(b=>b.x+b.width)),bottom=Math.max(...boxes.map(b=>b.y+b.height));
    const rect=create('rect',{class:'note-card',x:x-15,y:y-12,width:right-x+30,height:bottom-y+24,rx:3,fill:'#fffdf7',stroke:'#c9bead','stroke-width':1},n);
    n.insertBefore(rect,n.firstChild);
  }
}
layoutNoteCards();
document.fonts.ready.then(layoutNoteCards);
// Local opaque surfaces preserve the drawing without feathered duplicate edges.
const motionLayer=create('g',{id:'workshop-motion','mask':'url(#pencil-mask)','pointer-events':'none'},svg);
svg.insertBefore(motionLayer,$('#construction'));
const motionParts=[];
// Opaque local patches replace the pixels beneath them. The mesh stays fixed at
// its boundary, so a moving contour never blends with its original position.
function addPart(id,region,pivot,kind,windows,amount,options={}){
  const bounds=region.type==='ellipse'?{x:region.cx-region.rx,y:region.cy-region.ry,w:region.rx*2,h:region.ry*2}:{...region};
  const holder=create('g',{id:`motion-${id}`},motionLayer);
  let drawing,canvas,context;
  if(kind==='wheel'){
    const clip=create('clipPath',{id:`clip-${id}`,clipPathUnits:'userSpaceOnUse'},svg.querySelector('defs'));
    create('ellipse',{cx:region.cx,cy:region.cy,rx:region.rx,ry:region.ry},clip);
    holder.setAttribute('clip-path',`url(#clip-${id})`);
    drawing=create('image',{class:'motion-pose',href:'assets/workshop.webp',width:1800,height:900},holder);
  }else{
    const surface=create('foreignObject',{x:bounds.x,y:bounds.y,width:bounds.w,height:bounds.h},holder);
    canvas=document.createElementNS('http://www.w3.org/1999/xhtml','canvas');
    canvas.width=Math.ceil(bounds.w*2);canvas.height=Math.ceil(bounds.h*2);
    canvas.style.cssText='display:block;width:100%;height:100%';surface.append(canvas);
    context=canvas.getContext('2d',{alpha:false});
    // This invisible pose also anchors the held dossier and foreground fingers.
    drawing=create('g',{class:'motion-pose'},holder);
  }
  motionParts.push({id,holder,drawing,canvas,context,bounds,region,pivot,kind,windows,amount,appear:8,phase:0,frequency:2.8,...options});
}
function paintPart(part){
  if(!part.canvas||!asset.complete||!asset.naturalWidth)return;
  const pose=part.drawing.getAttribute('transform');
  if(part.lastPaint===pose)return;
  part.lastPaint=pose;
  const {bounds:b,context:ctx,canvas}=part;
  if(!part.source){
    part.source=document.createElement('canvas');part.source.width=canvas.width;part.source.height=canvas.height;
    part.source.getContext('2d',{alpha:false}).drawImage(asset,b.x*asset.naturalWidth/1800,b.y*asset.naturalHeight/900,b.w*asset.naturalWidth/1800,b.h*asset.naturalHeight/900,0,0,canvas.width,canvas.height);
  }
  const matrix=part.drawing.transform.baseVal.consolidate().matrix;
  const scaleX=canvas.width/b.w,scaleY=canvas.height/b.h;
  ctx.setTransform(scaleX,0,0,scaleY,0,0);
  ctx.drawImage(part.source,0,0,b.w,b.h);
  const nodes=[];
  for(let row=0;row<=4;row++)for(let col=0;col<=4;col++){
    const x=b.w*col/4,y=b.h*row/4;
    const weight=row===0||row===4||col===0||col===4?0:1;
    const world=new DOMPoint(b.x+x,b.y+y).matrixTransform(matrix);
    nodes.push({s:[x,y],d:[x+(world.x-b.x-x)*weight,y+(world.y-b.y-y)*weight]});
  }
  function triangle(a,b,c){
    const [x0,y0]=a.s,[x1,y1]=b.s,[x2,y2]=c.s;
    const [u0,v0]=a.d,[u1,v1]=b.d,[u2,v2]=c.d;
    const det=(x1-x0)*(y2-y0)-(x2-x0)*(y1-y0);
    const aa=((u1-u0)*(y2-y0)-(u2-u0)*(y1-y0))/det;
    const cc=((u2-u0)*(x1-x0)-(u1-u0)*(x2-x0))/det;
    const bb=((v1-v0)*(y2-y0)-(v2-v0)*(y1-y0))/det;
    const dd=((v2-v0)*(x1-x0)-(v1-v0)*(x2-x0))/det;
    ctx.save();ctx.beginPath();
    // Subpixel overlap closes rasterized triangle seams without softening edges.
    const cx=(u0+u1+u2)/3,cy=(v0+v1+v2)/3;
    for(const [i,[u,v]] of [a.d,b.d,c.d].entries()){
      const dx=u-cx,dy=v-cy,l=Math.hypot(dx,dy)||1;
      if(i===0)ctx.moveTo(u+dx/l*.25,v+dy/l*.25);else ctx.lineTo(u+dx/l*.25,v+dy/l*.25);
    }
    ctx.closePath();ctx.clip();ctx.transform(aa,bb,cc,dd,u0-aa*x0-cc*y0,v0-bb*x0-dd*y0);
    ctx.drawImage(part.source,0,0,part.bounds.w,part.bounds.h);ctx.restore();
  }
  for(let row=0;row<4;row++)for(let col=0;col<4;col++){
    const i=row*5+col;triangle(nodes[i],nodes[i+1],nodes[i+6]);triangle(nodes[i],nodes[i+6],nodes[i+5]);
  }
}
addPart('reel-left',{type:'ellipse',cx:822,cy:263,rx:35,ry:46},[822,263],'wheel',[[16,23],[33,41]],26);
addPart('reel-right',{type:'ellipse',cx:995,cy:271,rx:34,ry:43},[995,271],'wheel',[[16,23],[33,41]],-20);
addPart('gear',{type:'ellipse',cx:823,cy:350,rx:26,ry:31},[823,350],'wheel',[[16,23],[33,41]],-40);
// Each inhabitant gets a distinct work gesture; the final wide shot lets them
// coexist. Local movements stay small enough to preserve the original pencil art.
addPart('florian-head',{x:134,y:340,w:100,h:109},[181,431],'nod',[[4,9],[44,49]],1.2,{appear:3.5,frequency:1.7});
addPart('florian-writing',{x:89,y:470,w:119,h:70},[120,495],'write',[[4,9],[44,49]],2.0,{appear:3.5,frequency:3.2});
addPart('context-head',{x:554,y:337,w:135,h:111},[617,440],'nod',[[9,16],[44,49]],1.2,{phase:.4});
addPart('context-hand',{x:555,y:451,w:78,h:49},[619,469],'hand',[[10,16],[44.6,49]],2,{phase:1.1,frequency:2});
addPart('operator-head',{x:705,y:392,w:133,h:98},[779,483],'nod',[[16,22],[34,40],[45,49]],1.7,{phase:.8});
addPart('operator-hand',{x:784,y:497,w:74,h:59},[800,526],'type',[[16,23],[34,40],[44.3,49]],1.2,{phase:.2,frequency:3.6});
// Shoulder motion and wrist articulation have separate pivots and timing.
addPart('robot-arm',{x:1230,y:343,w:236,h:153},[1270,466],'nod',[[22,29],[38,41],[44,49]],1.8,{phase:.2,frequency:1.8});
addPart('robot-wrist',{x:1372,y:385,w:91,h:122},[1380,393],'nod',[[22.5,29],[38,41],[44.5,49]],2.5,{phase:1.2,frequency:2.1});
addPart('mini-builder-head',{x:1142,y:443,w:116,h:89},[1200,525],'nod',[[22,29],[38,41],[44.2,49]],1.2,{phase:.7,frequency:2.2});
addPart('mini-hand',{x:1180,y:520,w:56,h:46},[1200,534],'hand',[[22,29],[38,41],[44.4,49]],1.6,{phase:.3,frequency:2.4});
addPart('mini-engineer-head',{x:1261,y:455,w:119,h:105},[1321,552],'nod',[[23,29],[38,41],[44.8,49]],1.1,{phase:1.7,frequency:1.9});
addPart('mini-engineer-hand',{x:1325,y:533,w:76,h:51},[1380,548],'type',[[23,29],[38,41],[45,49]],1.2,{phase:.5,frequency:3.1});
addPart('review-head',{x:1531,y:389,w:133,h:126},[1598,509],'nod',[[30,43],[44.6,49]],1.8,{phase:.6,frequency:2});
addPart('review-hand',{x:1570,y:503,w:78,h:58},[1593,533],'hand',[[30,43],[45,49]],1.7,{phase:1.5,frequency:2.6});
// Extra activity stays tied to the same pauseable story clock.
addPart('florian-resting-hand',{x:217,y:464,w:62,h:49},[235,488],'hand',[[4,9],[44,49]],1.3,{appear:3.5,frequency:1.4});
addPart('inspection-lamp',{x:1638,y:459,w:99,h:65},[1724,466],'nod',[[30,43]],1.3,{frequency:1.1,phase:.8});
addPart('cooling-fan',{type:'ellipse',cx:1043,cy:598,rx:12,ry:16},[1043,598],'wheel',[[16,29],[34,44]],65);
const writingTrace=create('path',{id:'writing-trace',d:'M 165 515 l 5 -2 l 4 3 l 5 -1 m -13 6 l 6 -2 l 7 2 m -11 5 l 8 1',fill:'none',stroke:'#4a433a','stroke-width':1.3,'stroke-linecap':'round',pathLength:1,'stroke-dasharray':1,'stroke-dashoffset':1},motionLayer);
function renderParts(t){
  motionLayer.style.opacity=reduced.matches?'0':'1';
  writingTrace.setAttribute('stroke-dashoffset',1-clamp((t-4)/4.6));
  writingTrace.style.opacity=t<4?'0':'.75';
  for(const part of motionParts){
    part.holder.style.opacity=t>=part.appear?'1':'0';
    let elapsed=0,gesture=0,localTime=0,envelope=0;
    for(const [start,end] of part.windows){
      elapsed+=clamp(t-start,0,end-start);
      if(t>=start&&t<end){localTime=t-start;envelope=ease(localTime/.7)*ease((end-t)/.7);gesture=Math.sin(localTime*part.frequency+part.phase)*envelope;}
    }
    if(part.kind==='nod' && part.id.includes('head') && !envelope && t>=8 && t<48){
      const cycle=(t+part.phase*2)%6.8;
      gesture=.3*(ease((cycle-1)/.8)-ease((cycle-2.6)/.9));
    }
    const [x,y]=part.pivot;
    if(part.kind==='wheel'){
      const ratio=part.region.rx/part.region.ry;
      part.drawing.setAttribute('transform',`translate(${x} ${y}) scale(${ratio} 1) rotate(${elapsed*part.amount}) scale(${1/ratio} 1) translate(${-x} ${-y})`);
    }else if(part.kind==='write'){
      const cross=Math.sin(localTime*part.frequency*1.65)*envelope;
      part.drawing.setAttribute('transform',`translate(${gesture*part.amount} ${cross*.9}) rotate(${gesture*1.4} ${x} ${y})`);
    }else if(part.kind==='type'){
      part.drawing.setAttribute('transform',`translate(${gesture*.4} ${Math.abs(gesture)*part.amount}) rotate(${gesture*.7} ${x} ${y})`);
    }else if(part.kind==='hand')part.drawing.setAttribute('transform',`translate(0 ${gesture*part.amount}) rotate(${gesture} ${x} ${y})`);
    else part.drawing.setAttribute('transform',`rotate(${gesture*part.amount} ${x} ${y})`);
    if(!reduced.matches&&t>=part.appear)paintPart(part);
  }
}

// One work item moves through the drawing. Guides live in <defs> and never paint
// a track. The blue tab identifies the same dossier, workpiece and return capsule.
const itemLayer=create('g',{id:'work-item','pointer-events':'none'},svg);
svg.insertBefore(itemLayer,$('#construction'));
const itemCarrier=create('g',{id:'item-carrier'},itemLayer);
const itemPose=create('g',{id:'item-pose'},itemCarrier);
const itemShadow=create('ellipse',{cx:2,cy:27,rx:27,ry:5,fill:'#38342d',opacity:.16},itemPose);
const paper=create('g',{id:'item-paper'},itemPose);
create('path',{d:'M -25 -31 L 16 -32 L 25 -22 L 24 31 L -24 32 Z',fill:'#fffdf5',stroke:'#514b42','stroke-width':1.6,'stroke-linejoin':'round'},paper);
create('path',{d:'M -23 -29 L -17 -29 L -17 30 L -23 30 Z',fill:'#1769b5'},paper);
create('path',{d:'M 16 -31 L 16 -22 L 24 -22 M -10 -16 L 10 -16 M -10 -9 L 15 -9 M -10 1 L 9 1 M -10 8 L 14 8',fill:'none',stroke:'#70685d','stroke-width':1.5,'stroke-linecap':'round'},paper);
create('path',{d:'M -22 -28 L -21 27 M -9 -15 L 9 -15 M -10 9 L 11 9',fill:'none',stroke:'#aaa08f','stroke-width':.6,opacity:.6},paper);
const paperState=create('path',{id:'item-paper-state',d:'M -6 20 L -2 24 L 9 15',fill:'none',stroke:'#1769b5','stroke-width':2.2,'stroke-linecap':'round'},paper);
const moduleItem=create('g',{id:'item-module'},itemPose);
create('path',{d:'M -22 -13 L 13 -20 L 24 -11 L 24 14 L -11 22 L -22 13 Z',fill:'#f9f5e9',stroke:'#514b42','stroke-width':1.5,'stroke-linejoin':'round'},moduleItem);
create('path',{d:'M -22 -13 L -11 -4 L 24 -11 M -11 -4 L -11 22',fill:'none',stroke:'#70685d','stroke-width':1.2},moduleItem);
create('path',{d:'M -11 -16 L -3 -18 L 8 -9 L 8 17 L 0 19 L 0 -7 Z',fill:'#1769b5'},moduleItem);
create('path',{d:'M 12 -3 L 20 -5 M 12 2 L 20 0 M 12 7 L 20 5',fill:'none',stroke:'#7f776b','stroke-width':1.2},moduleItem);
create('path',{d:'M -20 -9 l7 5 M -20 -4 l7 5 M -20 2 l7 5 M -20 8 l7 5 M -18 13 l5 4 M -10 -14 l8 -2 M -5 -10 l10 -3 M 14 12 l7 -2',fill:'none',stroke:'#847c70','stroke-width':.6,opacity:.65},moduleItem);
create('path',{d:'M -22 -12 L 12 -20 M -11 -3 L -10 21 M 1 -6 L 2 17',fill:'none',stroke:'#5b554b','stroke-width':.6,opacity:.45},moduleItem);
const moduleState=create('path',{id:'item-module-state',d:'M -19 2 L -16 6 L -12 -1',fill:'none',stroke:'#514b42','stroke-width':1.4,'stroke-linecap':'round'},moduleItem);
const revisionTag=create('g',{id:'item-revision'},itemPose);
create('path',{d:'M 0 22 L 0 28',stroke:'#70685d','stroke-width':1},revisionTag);
create('rect',{x:-11,y:28,width:22,height:14,rx:1,fill:'#fffdf5',stroke:'#70685d','stroke-width':.8},revisionTag);
const revisionText=create('text',{x:0,y:38,'text-anchor':'middle','font-family':'Mono,monospace','font-size':9,fill:'#393630'},revisionTag);
const defs=svg.querySelector('defs');
const pipeRoute='M 1518 713 Q 1523 766 1452 791 Q 1345 815 1230 790 L 1030 755 L 862 718 Q 717 702 713 654';
const pipeMask=create('mask',{id:'item-pipe-mask',maskUnits:'userSpaceOnUse',x:690,y:640,width:855,height:190},defs);
create('path',{d:pipeRoute,fill:'none',stroke:'white','stroke-width':12,'stroke-linecap':'round'},pipeMask);
// Couplings stay in front of the cutaway: the capsule disappears under each band.
for(const [x,y,angle] of [[1449,790,-10],[1238,792,9],[1040,757,11],[835,715,12]])create('rect',{x:x-5,y:y-17,width:10,height:34,fill:'black',transform:`rotate(${angle} ${x} ${y})`},pipeMask);
const pipeLayer=create('g',{id:'pipe-transit',mask:'url(#item-pipe-mask)'},itemLayer);
const capsule=create('g',{id:'item-capsule'},pipeLayer);
create('rect',{x:-22,y:-6,width:44,height:12,rx:6,fill:'#d8e6ee',opacity:.8},capsule);
create('rect',{x:-14,y:-4,width:28,height:8,rx:3,fill:'#1769b5',stroke:'#f5f8f5','stroke-width':1},capsule);
create('path',{d:'M -8 -3 L -8 3 M 8 -3 L 8 3',stroke:'#e6f0f4','stroke-width':1.2},capsule);
// Small original-art cutouts place fingers / gripper in front of the work item.
const foreground=create('g',{id:'item-foreground'},itemLayer);
const occluders=new Map();
for(const [id,d] of [
 ['chamber','M 971 384 L 977 383 L 976 500 L 971 502 Z M 1028 380 L 1033 381 L 1032 501 L 1028 501 Z'],
 ['context-hand','M 572 466 Q 577 462 584 463 L 593 466 L 597 476 Q 591 486 581 484 L 576 481 L 574 477 L 571 474 Q 566 471 572 466 Z'],
 ['mini-hand','M 1192 527 Q 1200 523 1206 529 L 1218 537 L 1213 547 L 1203 546 L 1192 540 Z'],
 ['mini-engineer-hand','M 1337 540 Q 1343 534 1350 538 L 1362 548 L 1355 558 L 1347 555 L 1337 550 Z'],
 ['robot-wrist','M 1402 449 L 1411 446 L 1409 467 L 1405 479 L 1400 475 Z M 1415 447 L 1424 447 L 1424 466 L 1418 477 L 1413 475 L 1418 464 Z'],
 ['review-hand','M 1583 519 Q 1595 513 1603 520 L 1616 532 L 1610 542 L 1598 540 L 1586 533 Z']
]){
 const clip=create('clipPath',{id:`item-front-${id}`,clipPathUnits:'userSpaceOnUse'},defs);create('path',{d},clip);
 const group=create('g',{'clip-path':`url(#item-front-${id})`,opacity:0},foreground);
 create('image',{href:'assets/workshop.webp',width:1800,height:900},group);
 occluders.set(id,group);
}
// Transparent intervals are travel inside opaque cabinets, not an overlay across
// empty space. All visible transfers follow the desk, belt, gripper or pipe.
const transfers=[
 {start:4.8,end:6.8,d:'M 185 520 L 245 528',kind:'paper',scale:.7,flat:.48,angle:14,label:'BRIEF ON THE DESK'},
 {start:6.8,end:8.5,d:'M 245 528 L 289 523',kind:'paper',scale:.7,flat:.48,angle:14,exit:true,label:'ENTERING THE WORKSHOP'},
 {start:9,end:11,d:'M 472 490 Q 507 494 552 474',kind:'paper',scale:1,flat:.85,angle:-24,enter:true,label:'PREPARING THE WORK PACKAGE'},
 {start:11,end:13,d:'M 552 474 L 552 474',kind:'paper',scale:1,flat:.85,angle:-24,hand:'context-hand',label:'WORK PACKAGE IN HAND'},
 {start:13,end:15.6,d:'M 552 474 Q 581 508 604 514 L 666 501',kind:'paper',scale:1,toScale:.7,flat:.85,toFlat:.42,angle:-24,toAngle:10,exit:true,label:'CONTEXT CONVEYOR'},
 {start:16.5,end:20.5,d:'M 987 482 L 987 419',kind:'module',scale:.8,front:'chamber',enter:true,exit:true,label:'THE MODEL PROPOSES AN ACTION'},
 {start:22,end:23.5,d:'M 1150 555 L 1205 540',kind:'module',scale:.8,enter:true,label:'ACTION AUTHORIZED'},
 {start:23.5,end:24.8,d:'M 1205 540 L 1205 540',kind:'module',scale:.8,hand:'mini-hand',label:'FIRST WORKSTATION'},
 {start:24.8,end:26,d:'M 1205 540 Q 1254 571 1295 561 L 1352 554',kind:'module',scale:.8,label:'TRANSFER TO THE NEXT AGENT'},
 {start:26,end:27,d:'M 1352 554 L 1352 554',kind:'module',scale:.8,hand:'mini-engineer-hand',label:'MINI-CREW ASSEMBLY'},
 {start:27,end:28,d:'M 1352 554 Q 1389 551 1413 477',kind:'module',scale:.8,label:'ROBOTIC ARM PICKUP'},
 {start:28,end:29,d:'M 1413 477 L 1413 477',kind:'module',scale:.8,hand:'robot-wrist',label:'GRIPPER HOLDING THE WORKPIECE'},
 {start:29,end:30,d:'M 1413 477 Q 1445 508 1430 569',kind:'module',scale:.8,exit:true,label:'ENTERING INSPECTION'},
 {start:30.3,end:32,d:'M 1625 548 L 1625 548',kind:'module',scale:.9,hand:'review-hand',enter:true,label:'WORKPIECE CHECK'},
 {start:32,end:33,d:'M 1625 548 L 1660 558',kind:'module',scale:.9,exit:true,failed:true,label:'FAILURE · OBSERVATION RETURNED'},
 {start:33,end:37,d:pipeRoute,kind:'tube',label:'RETURN THROUGH THE PIPE'},
 {start:37,end:38.2,d:'M 987 482 L 987 425',kind:'module',scale:.8,front:'chamber',enter:true,exit:true,label:'REVISED PROPOSAL'},
 {start:38.3,end:39.6,d:'M 1205 540 Q 1254 571 1295 561 L 1352 554',kind:'module',scale:.8,enter:true,exit:true,label:'TOOL-ASSISTED CORRECTION'},
 {start:40,end:41.5,d:'M 1625 548 L 1625 548',kind:'module',scale:.9,hand:'review-hand',enter:true,label:'CHECKING V2 AGAIN'},
 {start:41.5,end:43.5,d:'M 1625 548 Q 1691 574 1660 620',kind:'module',scale:.9,checked:true,label:'RESULT SUBMITTED FOR REVIEW'},
 {start:43.5,end:50,d:'M 1660 620 L 1660 620',kind:'module',scale:.9,checked:true,label:'RESULT READY FOR REVIEW'}
].map((step,i)=>({...step,guide:create('path',{id:`item-guide-${i}`,d:step.d},defs)}));
function renderItem(t){
 const step=transfers.find(s=>t>=s.start&&t<s.end);
 itemLayer.setAttribute('opacity',step&&!reduced.matches?1:0);
 for(const front of occluders.values())front.setAttribute('opacity',0);
 if(!step)return;
 const progress=clamp((t-step.start)/(step.end-step.start)),u=ease(progress);
 const length=step.guide.getTotalLength(),position=step.guide.getPointAtLength(length*u);
 itemLayer.dataset.station=step.label;itemLayer.dataset.kind=step.kind;
 itemLayer.dataset.revision=t>=37?'V2':'V1';
 revisionText.textContent=itemLayer.dataset.revision;
 revisionTag.setAttribute('display',step.kind==='module'?'inline':'none');
 itemLayer.dataset.x=position.x.toFixed(2);itemLayer.dataset.y=position.y.toFixed(2);
 const visibility=(step.enter?ease(progress/.2):1)*(step.exit?ease((1-progress)/.2):1);
 itemLayer.setAttribute('opacity',reduced.matches?0:visibility);
 pipeLayer.setAttribute('opacity',step.kind==='tube'?1:0);
 itemCarrier.setAttribute('opacity',step.kind==='tube'?0:1);
 if(step.kind==='tube'){
   const before=step.guide.getPointAtLength(Math.max(0,length*u-2)),after=step.guide.getPointAtLength(Math.min(length,length*u+2));
   capsule.setAttribute('transform',`translate(${position.x} ${position.y}) rotate(${Math.atan2(after.y-before.y,after.x-before.x)*180/Math.PI})`);
 }else{
   const part=step.hand&&motionParts.find(p=>p.id===step.hand);
   const attached=part?part.drawing.getAttribute('transform'):'';
   itemCarrier.setAttribute('transform',attached||'');
   const size=(step.scale||1)+((step.toScale??step.scale??1)-(step.scale||1))*u;
   const flat=(step.flat||1)+((step.toFlat??step.flat??1)-(step.flat||1))*u;
   const angle=(step.angle||0)+((step.toAngle??step.angle??0)-(step.angle||0))*u;
   itemPose.setAttribute('transform',`translate(${position.x} ${position.y}) rotate(${angle}) scale(${size} ${size*flat})`);
   paper.setAttribute('display',step.kind==='paper'?'inline':'none');
   moduleItem.setAttribute('display',step.kind==='module'?'inline':'none');
   itemShadow.setAttribute('opacity',step.hand||t>=16.5&&t<22?0:.16);
   paperState.setAttribute('opacity',t>=11?.8:0);
   moduleState.setAttribute('opacity',step.checked||step.failed?1:0);
   moduleState.setAttribute('d',step.failed?'M -19 -1 L -12 7 M -12 -1 L -19 7':'M -19 2 L -16 6 L -12 -1');
   moduleState.setAttribute('stroke',step.failed?'#b94b0e':'#514b42');
   if(step.hand||step.front){const front=occluders.get(step.hand||step.front);front.setAttribute('transform',attached||'');front.setAttribute('opacity',1);}
 }
}

const observationLayer=create('g',{id:'tool-observation',mask:'url(#item-pipe-mask)','pointer-events':'none',opacity:0},svg);
svg.insertBefore(observationLayer,$('#construction'));
const observationCapsule=capsule.cloneNode(true);
observationCapsule.id='tool-observation-capsule';observationLayer.append(observationCapsule);
const observationPath=create('path',{d:'M 1280 799 Q 1250 796 1230 790 L 1030 755 L 862 718 Q 717 702 713 654'},defs);
function renderObservation(t){
  const p=clamp((t-27.6)/2.4),visible=t>=27.6&&t<30&&!reduced.matches;
  observationLayer.setAttribute('opacity',visible?1:0);
  if(!visible)return;
  const length=observationPath.getTotalLength(),distance=length*ease(p);
  const position=observationPath.getPointAtLength(distance);
  const before=observationPath.getPointAtLength(Math.max(0,distance-2)),after=observationPath.getPointAtLength(Math.min(length,distance+2));
  observationCapsule.setAttribute('transform',`translate(${position.x} ${position.y}) rotate(${Math.atan2(after.y-before.y,after.x-before.x)*180/Math.PI})`);
}


const activity=create('g',{id:'workshop-activity',mask:'url(#pencil-mask)','pointer-events':'none'},svg);
svg.insertBefore(activity,$('#construction'));
const steam=[0,1,2].map(i=>create('path',{id:'coffee-steam-'+i,d:'M 0 0 C -5 -7 6 -12 1 -20 C -2 -24 -2 -27 0 -30',fill:'none',stroke:'#81776a','stroke-width':.85,'stroke-linecap':'round'},activity));
const reactor=create('g',{id:'reactor-readout',fill:'none',stroke:'#ff8a2d','stroke-width':1.5},activity);
const reactorDots=[0,1,2].map(i=>create('circle',{cx:960+i*19,cy:451,r:2.2,fill:'#ff8a2d',stroke:'none'},reactor));
const reactorArc=create('path',{d:'M -34 0 A 34 7 0 0 1 22 -5',stroke:'#ffba75','stroke-width':1.6},reactor);
const inspection=create('path',{id:'inspection-sweep',d:'M 1631 525 L 1662 531',fill:'none',stroke:'#cf641c','stroke-width':1.2,'stroke-linecap':'round'},activity);
function renderActivity(t){
  const still=reduced.matches;
  activity.setAttribute('opacity',still?0:1);
  steam.forEach((p,i)=>{
    const phase=(t*.32+i/3)%1;
    p.setAttribute('transform','translate('+(65+i*3+Math.sin(phase*6+i)*1.5)+' '+(495-phase*16)+') scale('+(.6+phase*.4)+')');
    p.setAttribute('opacity',Math.sin(phase*Math.PI)*.48*ease(t-4));
  });
  const running=(t>=16&&t<29)||(t>=34&&t<43);
  reactor.setAttribute('opacity',running?.8:0);
  reactorArc.setAttribute('transform','translate(992 501) rotate('+(Math.sin(t*1.1)*8)+')');
  reactorDots.forEach((dot,i)=>dot.setAttribute('opacity',.2+.8*ease((Math.sin(t*2-i*1.5)+1)/2)));
  const scanning=t>=30&&t<43;
  inspection.setAttribute('opacity',scanning?.55:0);
  inspection.setAttribute('transform','translate('+(Math.sin(t*1.5)*3)+' '+(Math.sin(t*1.5)*3)+')');
}

chapters.forEach((c,i)=>{
  const button=document.createElement('button');button.type='button';button.innerHTML=`<span>0${i+1}</span>${c.label}`;
  button.addEventListener('click',()=>{pause();seek(reduced.matches?Math.min(c.t+5,duration):c.t+2)});
  $('#chapters').append(button);
  const li=document.createElement('li');li.textContent=`${c.title} ${c.copy}`;$('#transcript').append(li);
});
const camera=[
  {t:0,b:[0,0,1800,900]}, {t:4.5,b:[0,0,1800,900]}, {t:7,b:[0,230,900,450]},
  {t:10,b:[180,95,1000,500]}, {t:14,b:[180,95,1000,500]},
  {t:17,b:[440,85,1050,525]}, {t:20,b:[440,85,1050,525]},
  {t:23,b:[1020,285,780,390]}, {t:26,b:[1020,285,780,390]}, {t:28,b:[650,240,1150,575]},
  {t:29,b:[650,240,1150,575]}, {t:32,b:[1020,300,780,390]},
  {t:33,b:[1020,415,780,390]}, {t:35,b:[875,430,750,375]}, {t:37,b:[570,415,800,400]},
  {t:40,b:[1120,300,680,340]}, {t:43,b:[1120,300,680,340]},
  {t:45.5,b:[0,0,1800,900]}, {t:48,b:[0,230,900,450]}, {t:49,b:[0,230,900,450]}
];
let time=0,playing=false,ready=false,lastFrame=0,raf=0,visible=true,manualOverview=false;
let lastChapter=-1;
function setCamera(t){
  if(manualOverview||reduced.matches){svg.setAttribute('viewBox','0 0 1800 900');return}
  let i=0;while(i<camera.length-2 && camera[i+1].t<t)i++;
  const a=camera[i],b=camera[i+1],u=ease((t-a.t)/(b.t-a.t));
  const box=a.b.map((x,j)=>x+(b.b[j]-x)*u);
  if(innerWidth<=700 && t>6 && t<44){const factor=ease((t-6)/2)*ease((44-t)/2); const width=box[2]*(1-.4*factor);box[0]+=(box[2]-width)/2;box[2]=width;}
  svg.setAttribute('viewBox',box.map(x=>x.toFixed(2)).join(' '));
}
function render(){
  const t=time;
  const drawingTime=reduced.matches?duration:t;
  for(const s of strokes){const p=clamp((drawingTime-s.start)/s.length);s.path.setAttribute('stroke-dashoffset',(1-p).toFixed(3));}
  for(const {path,start,zone} of outlines){path.setAttribute('stroke-dashoffset',1-ease((drawingTime-start)/1.5));path.style.opacity=String(1-clamp((drawingTime-zone.end+.8)/.8));}
  for(const z of zones)z.fill.setAttribute('opacity',clamp((drawingTime-z.end+.25)/.3));
  conduit.setAttribute('stroke-dashoffset',1-ease((drawingTime-33)/3));
  renderParts(t);
  renderItem(t);
  renderObservation(t);
  renderActivity(t);
  for(const n of notes)n.style.opacity=String(clamp((t-Number(n.dataset.in))/.5)*clamp((Number(n.dataset.out)-t)/.5));
  // A small moving pencil follows the actual structural contour being drawn.
  const active=outlines.find(o=>t>=o.start && t<o.start+1.3);
  if(active&&!reduced.matches){const l=active.path.getTotalLength();const p=active.path.getPointAtLength(l*ease((t-active.start)/1.5));$('#pencil').setAttribute('transform',`translate(${p.x} ${p.y}) rotate(24)`);$('#pencil').setAttribute('opacity','.85')}else $('#pencil').setAttribute('opacity','0');
  setCamera(t);
  positionNoteCards();
  const idx=Math.max(0,chapters.findLastIndex(c=>t>=c.t));
  if(idx!==lastChapter){const c=chapters[idx];$('#chapter-number').textContent=`0${idx+1}`;$('#chapter-title').textContent=c.title;$('#chapter-copy').textContent=c.copy;[...$('#chapters').children].forEach((b,i)=>b.setAttribute('aria-current',String(i===idx)));lastChapter=idx}
  $('#time').textContent=`00:${String(Math.floor(t)).padStart(2,'0')} / 00:49`;
  $('#timeline').value=String(t);$('#timeline').setAttribute('aria-valuetext',`${Math.floor(t)} ${sketchFrench?'secondes':'seconds'}. ${chapters[idx].label}`);
  $('#drawing-status').textContent=sketchText(manualOverview?'FULL CUTAWAY':t<8.5?'DRAWING THE WORKSHOP':t>=27.6&&t<30?'OBSERVATION RETURNS TO THE MODEL':t<44?(transfers.find(s=>t>=s.start&&t<s.end)?.label||'TRANSFER THROUGH THE WORKSHOP'):'THE GOAL · THE LIMITS · THE DECISIONS');
  svg.dataset.time=t.toFixed(3);svg.dataset.playing=String(playing);
  $('#play').textContent=sketchText(playing?'Pause':time>=duration?'Replay animation':'Play animation');
}
function tick(now){raf=0;if(!playing||!visible||document.hidden)return;if(lastFrame)time=Math.min(duration,time+(now-lastFrame)/1000);lastFrame=now;if(time>=duration)playing=false;render();if(playing)raf=requestAnimationFrame(tick)}
function schedule(){lastFrame=0;if(playing&&visible&&!document.hidden&&!raf)raf=requestAnimationFrame(tick)}
function pause(){playing=false;cancelAnimationFrame(raf);raf=0;lastFrame=0;render()}
function play(){if(!ready||reduced.matches)return;if(time>=duration)time=0;manualOverview=false;playing=true;render();schedule()}
function seek(t){time=clamp(Number(t)||0,0,duration);manualOverview=false;render();lastFrame=0}
$('#play').addEventListener('click',()=>playing?pause():play());
$('#replay').addEventListener('click',()=>{pause();seek(0);play()});
$('#timeline').addEventListener('input',e=>{const value=e.target.value;pause();seek(value)});
$('#overview').addEventListener('click',()=>{pause();time=duration;manualOverview=true;render()});
function applyMotion(){pause();$('#motion-note').hidden=!reduced.matches;$('#play').disabled=reduced.matches;$('#replay').disabled=reduced.matches;if(reduced.matches){time=duration;render()}}
reduced.addEventListener('change',applyMotion);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastFrame=0}else schedule()});
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){cancelAnimationFrame(raf);raf=0;lastFrame=0}else schedule()},{threshold:.12}).observe($('.stage'));
window.harnessSketch={seek:t=>{pause();seek(t)},play,pause,get state(){return {time,playing,ready,reduced:reduced.matches}}};
const asset=new Image();asset.onload=()=>{ready=true;$('#loading').hidden=true;applyMotion();render();if(!reduced.matches&&!new URLSearchParams(location.search).has('capture'))play()};asset.onerror=()=>{$('#loading').textContent=sketchText('The illustration could not be loaded. Reload the page.')};asset.src='assets/workshop.webp';
render();

window.addEventListener('resize',()=>render());
