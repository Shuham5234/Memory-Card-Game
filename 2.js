const grid_container=document.querySelector(".grid_container");
const cards = [ ];
let firstcard,secondcard,Score;
let loackboard=false;
let card;


document.querySelector(".score").textContent = Score;


fetch("./data/cards.json")
.then((res)=>res.json())
.then((datas)=>{
        cards: [...datas,...datas];
        sufflecards();
        generatecards();
});

function sufflecards(){
    let currentindex=cards.length,
    randomindex,
    temporaryvalue
    while(currentindex!==0){
        randomindex=Math.floor(Math.random()*currentindex)
        currentindex -=1;
        temporaryvalue=cards[currentindex];
        cards[currentindex]=cards[randomindex];
        cards[randomindex]=temporaryvalue;
    }
}

function generatecards(){
    for (let card of cards){
        const cardElement=document.createElement("div")
        cardElement.classList.add('card');
        cardElement.setAttribute("data-name",cards.name)
        cardElement.innerHTML=`
        <div class="front>
        <img class="font_image" src=${card.image}/>
        </div>
        <div class="back"></div>
        `;
        grid_container.appendChild(cardElement)
        cardElement.addEventListener("click",Flipcard);
    }
}

function Flipcard(){
    if(loackboard) return;
    if (this ===firstcard) return;

    this.classList.add("flipped")

    if(!Flipcard){
        Flipcard=this;
        return;
    }
    secondcard= this;
    Score++;
    document.querySelector(".score").textContent= Score;
    loackboard=true

    checkforMatch()
        }
        function checkforMatch(){
            let isMatch=firstcard.dataset.name===secondcard.dataset.name;
            isMatch?disableCards(): unflipCards();
        }
        function disableCards(){
            firstcard.removeEventListener("click",Flipcard);
            secondcard.removeEventListener("click",Flipcard);
            resetboard();
        }
        function unflipCards(){
            setTimeout(()=>{
                firstcard.classList.remove("flipped");
                secondcard.classList.remove("flipped");
                resetboard();
            },1000);
        }

        function resetboard(){
            firstcard=null;
            secondcard=null;
            loackboard=false;
        }
        function restart(){
            resetboard();
            sufflecards();
            Score=0;
            document.querySelector(".score").textContent="score";
            grid_container.innerHTML='';
            generatecards()
        }
       