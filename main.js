let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn= document.querySelector("#new");
let msg=document.querySelector("#msg");
let msgcontainer=document.querySelector(".msg-container")
let p1=document.querySelector("#p1")
let p2=document.querySelector("#p2")
let player=document.querySelector(".player")
let turnx =true;
let count=0;
const winningPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];
let player1=prompt("Name of Player1 :")
let player2=prompt("Name of Player2 :")
if(player1===player2){
    alert('Players name cannot be the same')
    player2=prompt("Name of Player2 :")
}
p1.innerText=`X is -${player1}`
p2.innerText=`O is -${player2}`

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnx){
            box.innerText="X";
            turnx=false;
        }
        else{
            box.innerText="O";
            turnx=true;
        }
        box.disabled=true;
        count++;
        console.log(count)
        checkForWinner(count);
    })
});

const checkForWinner =(count)=>{
    for (let pattern of winningPattern) {
      let val1=boxes[pattern[0]].innerText;
      let val2=boxes[pattern[1]].innerText;
      let val3=boxes[pattern[2]].innerText;

      if(val1!= "" && val2!= "" && val3!= ""){
        if(val1===val2 && val2===val3){
            showWinner(val1);
            disableBoxes();
        }
        else if(count===9)
        {  
             msg.innerText= `Game was a DRAW`;
             msgcontainer.classList.remove("hide") ;
        }
      }
    }
}

const showWinner=(winner)=>{
    if(winner==='X'){
        msg.innerText= `Congratulations , Winner is ${player1}`;
    }
    else{
        msg.innerText= `Congratulations , Winner is ${player2}`;
    }
    msgcontainer.classList.remove("hide")
    count=0;
}

const disableBoxes=()=>{
    for (let box of boxes) {
        box.disabled=true;
    }
}
const resetGame=()=>{
    turnx=true;
    count=0;
    enableBoxes();
    msgcontainer.classList.add("hide");
}
const enableBoxes=()=>{
    for (let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}
newbtn.addEventListener("click",resetGame)
reset.addEventListener("click",resetGame) 