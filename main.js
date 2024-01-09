let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn= document.querySelector("#new");
let msg=document.querySelector("#msg");
let msgcontainer=document.querySelector(".msg-container")

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
        checkForWinner(count);
        
    })
});

const checkForWinner =(count)=>{
    for (let pattern of winningPattern) {
      let val1=boxes[pattern[0]].innerText;
      let val2=boxes[pattern[1]].innerText;
      let val3=boxes[pattern[2]].innerText;

      if(val1!= "" &&val2!= "" && val3!= ""){
        if(val1===val2 && val2===val3){
            showWinner(val1);
            disableBoxes();
        }
        else if(count===9)
        {
            msg.innerText= `Game was a DRAW`;
             msgcontainer.classList.remove("hide") 
        }
      }
    }
}

const showWinner=(winner)=>{
    msg.innerText= `Congratulations , Winner is ${winner}`;
    msgcontainer.classList.remove("hide")
}

const disableBoxes=()=>{
    for (let box of boxes) {
        box.disabled=true;
    }
}
const resetGame=()=>{
    turnx=true;
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