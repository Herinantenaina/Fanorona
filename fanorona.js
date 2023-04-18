var pieces = document.querySelectorAll(".piece");
var piece;
var isDown = false;
var redhasMoved= true;
var whitehasMoved = false;
var emplacement = document.querySelectorAll(".for_piece");
let positionLeft = [];
let positionTop = [];
var victory = false ;
let x,y,t;
let something_here = [
  false,false,false,
  false,false,false,
  false,false,false,
] ;
//----Emplacement de chaque couleur----
let color = [
  null, null, null,
  null, null, null,
  null, null, null
];

//----Tableau pour occupied-------

let Occupied = [
    false, false, false, 
    false, false, false,
    false, false, false
];
  

//--------boucle qui crée les tableaux pour les positions----
for (let i = 0; i < emplacement.length; i++) {
    const emp = emplacement[i];
    const Class = emp.getAttribute("class");
    const Classunique = Class.replace("for_piece ", "");
    const element = document.querySelector("."+Classunique);
    const offsetLeft = element.getBoundingClientRect().left;
    const offsetTop = element.getBoundingClientRect().top;
      positionLeft.push(offsetLeft);
      positionTop.push(offsetTop);
}

//----Test les emplacement vides si il y a bug------
function si_vide(pieceS){
  for (let i = 0; i < pieceS.length; i++) {
    const piece = pieces[i];
    let pieceX = piece.getBoundingClientRect().left ;
    let pieceY = piece.getBoundingClientRect().top ;
    for (let j = 0; j < positionLeft.length; j++) {
      let left = positionLeft[i];
      let top = positionTop[i] ;
      if((pieceX > (left-40) && pieceX < (left+40) && pieceY > (top-40) && pieceY < (top+40)))
      {
        something_here[j] = true ;
      }else{
        something_here[j] = false ;
      }
    }
  }
  for (let i = 0; i < something_here.length; i++) {
    const element = something_here[i];
    const occupe = Occupied[i];
    if(element != occupe){
      Occupied[i] = false ;
    }
  }
}

//----function manetsika pieces----
function move(piece){
  piece.addEventListener("mousedown",mousedown);
   function mousedown(e){
      t= 0;
      this.style.zIndex = 1000;
      isDown = true;
      let offset= [0,0];
          offset=[
              this.getBoundingClientRect().left - e.clientX  ,
              this.getBoundingClientRect().top  - e.clientY 
      ];
   
    piece.addEventListener("mouseup",mouseup);
        function mouseup(){
            piece.style.zIndex = 10 ;
            isDown = false;
            const elt = piece.getBoundingClientRect(); 
            //---Boucle pour attirer la piece sur l'emplacement le plus près---
            for (let i = 0; i < 9; i++) {      
              let left = positionLeft[i];     
              let top = positionTop[i];       
              if (elt.left > (left-40) && elt.left < (left+40) &&  elt.top > (top-40) && elt.top  < (top+40))
              {  
                piece.style.left = left + 1.6 +"px";
                piece.style.top = top + 1.6 + "px"; 
                if(Occupied[i]){
                  piece.style.left = 100 + "px";
                }
                Occupied[i] = true ;
              }
               
            }
          
            
            //---Enlève les itérations---  
            piece.removeEventListener("mouseup",mouseup);
            check();
            //----VICTOIRE !!!----- 
            Victoire();
          }
          t +=1 ; 
            console.log("  ")
            console.log(t)
      piece.addEventListener("mousemove",mousemove);
      function mousemove(event){
        let x1 = event.clientX ;
        let y1 = event.clientY ;
        x = x1;
        y = y1;
        let styleX = piece.style.left;
        if(isDown){
          piece.style.left = (x + offset[0]) + "px";
          piece.style.top = (y  + offset[1] )+ "px";
          piece.style.margin = 0 ;
        } 
      }
  }
  si_vide(pieces) ;  
}
//--------Rhf manala elt eo @ fanasina piece--------
function si_sur_emplacement(piece){
  piece.addEventListener("mousedown", ito);
  function ito(){
        const eltX = piece.getBoundingClientRect().left;
        const eltY = piece.getBoundingClientRect().top;
        let origineX = eltX - 1.6;
        let origineY = eltY - 1.6;
        for (let i = 0; i < positionLeft.length; i++) {
          const leftX = positionLeft[i];
          const topY = positionTop[i];
          if(origineX > (leftX-10) && origineX < (leftX+10) && origineY > (topY-10) && origineY < (topY+10)){
            Occupied[i] = false ;
            color[i]= null;
          }
        }
  }
}


//----alert VICTORY-----
function Alert(){
  if(victory)
  {
    
    alert("Victory !!!")
   location.reload();
  }
}
function Victoire(){
  setTimeout(Alert, 2000);
}
//---Tableau pour les emplacements occupés par les pièces colorées---
function check(){
  let z = 0;
  for (let j = 0; j < pieces.length; j++){
    for (let i = 0; i < 9; i++) {
      const piece= pieces[j];
      const x = positionLeft[i];
      const y = positionTop[i];
      let left = piece.getBoundingClientRect().left;
      let top = piece.getBoundingClientRect().top;
      if((left > (positionLeft[i]-5) && left < (positionLeft[i]+5) && top > (positionTop[i]-5) && top < (positionTop[i]+5)))
      {
        const cLass = piece.getAttribute("class");
        const color1 = cLass.replace("piece ","");
        const col0r = color1.slice(0,-2);
        color[i]= col0r ; 
      }
    }
  }
  //---Victoire---
   if(color[0] == color[1] && color[0] != null)
    {
      if(color[0] == color[2]){
        victory = true ;
      }
    }

     if(color[0] == color[3]&& color[3] != null)
    {
      if(color[0] == color[6]){
        victory = true ;
      }
    }
  if(color[3] == color[4] && color[4] != null)
    {
      if(color[3] == color[5]){
        victory = true ;
      }
    }
  if(color[1] == color[4] &&  color[4] != null)
    {
      if(color[1] == color[7]){
        victory = true ;
      }
    }
  if(color[6] == color[7] && color[7] != null )
    {
      if(color[6] == color[8]){
        victory = true ;
      }
    }
  if(color[2] == color[5] && color[5] != null)
    {
      if(color[5] == color[8]){
        victory = true ;
      }
    }
    if(color[0] == color[4] && color[4] != null)
    {
      if(color[0] == color[8]){
        victory = true ;
      }
    }
  if(color[2] == color[4] && color[4] != null)
    {
      if(color[6] == color[2]){
        victory = true ;
      }
    }
} 




//-------Miantso an ilay fonction hahafahana manetsika piece--------
for (let i = 0; i < pieces.length; i++) {
  const element = pieces[i];
  move(element);
  si_sur_emplacement(element); 
}
