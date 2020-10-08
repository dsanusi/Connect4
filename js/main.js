//Constants
const sounds = {
    placePiece:'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3',
    winningSound: 'http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3',
    bgPlayer: 'http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/ateapill.ogg'

}
const player = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3')

//2 player game
let currentPlayer = 1;




//DOM variables &jquery
let tRow = document.querySelectorAll('tr')
let tData = document.querySelectorAll('td')
let pTurn = document.querySelector('.players-turn')
let ResetBtn = document.querySelector('button')
let $tData = $(tData)

// Event listeners
for (i = 0; i < tData.length; i ++){
    tData[i].addEventListener('click', (evt) =>{
        console.log(`${evt.target.parentElement.rowIndex},${evt.target.cellIndex}`)
        console.log(sounds.placePiece)
        playSound(sounds.placePiece)
    });
};

[].forEach.call(tData, (cell)=>{
    cell.addEventListener('click', changeColor)
    cell.style.backgroundColor = 'white'
})

ResetBtn.addEventListener('click', ResetGame)

//Functions

function playSound(takeSound){
player.src =takeSound
player.play()
}


function ResetGame(evt){
    $tData.css('backgroundColor',"white")
}

function changeColor(evt){
    let p1Color = document.getElementById('cp1').value
    let p2Color = document.getElementById('cp2').value
    let column = evt.target.cellIndex;
    let row = [];

    for (i = 5; i > -1; i--){
        if (tRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tRow[i].children[column])
            if (currentPlayer === 1){
                row[0].style.backgroundColor = p1Color
                currentPlayer=2
                pTurn.textContent="Player 2's Turn"
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    pTurn.textContent = `Player 1 WINS!!`
                    pTurn.style.color = p1Color
                    playSound(sounds.winningSound)
                    return alert(`PLAYER 1 WINS!!`)
                }else if (drawCheck()){
                    pTurn.textContent = 'DRAW!'
                    playSound(sounds.bgPlayer)
                    return alert('DRAW!')
                }
            }else{
                row[0].style.backgroundColor = p2Color
                currentPlayer=1
                pTurn.textContent="Player 1's Turn"
                if (horizontalCheck() || verticalCheck() || diagonalCheck() || diagonalCheck2()){
                    pTurn.textContent = `PLAYER 2 WINS!!`
                    pTurn.style.color = p2Color
                    playSound(sounds.winningSound)
                    return alert(`PLAYER 2 WINS!!`)
                }else if (drawCheck()){
                    pTurn.textContent = 'DRAW!'
                    playSound(sounds.bgPlayer)
                    return alert('DRAW!')
                }
            }
        }
    }
}



function horizontalCheck(){
    for (let row = 0; row<tRow.length; row++){
        for(let col=0; col<4; col++){
            if (connectFourCheck(tRow[row].children[col].style.backgroundColor,tRow[row].children[col+1].style.backgroundColor,tRow[row].children[col+2].style.backgroundColor,tRow[row].children[col+3].style.backgroundColor)){
                return true
            }
        }
    }
}

function verticalCheck(){
    for (let col = 0; col<7; col++){
        for(let row=0; row<3; row++){
            if (connectFourCheck(tRow[row].children[col].style.backgroundColor,tRow[row+1].children[col].style.backgroundColor,tRow[row+2].children[col].style.backgroundColor,tRow[row+3].children[col].style.backgroundColor)){
                return true
            }
        }
    }
}

function diagonalCheck(){
    for(let col=0; col<4; col++){
        for (let row=0; row<3; row++){
            if (connectFourCheck(tRow[row].children[col].style.backgroundColor, tRow[row+1].children[col+1].style.backgroundColor,tRow[row+2].children[col+2].style.backgroundColor,tRow[row+3].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function diagonalCheck2(){
    for(let col=0; col<4; col++){
        for (let row=5; row>2; row--){
            if (connectFourCheck(tRow[row].children[col].style.backgroundColor, tRow[row-1].children[col+1].style.backgroundColor,tRow[row-2].children[col+2].style.backgroundColor,tRow[row-3].children[col+3].style.backgroundColor)){
                    return true;
                }
        }
    }
}

function drawCheck(){
    let fullSlot = []
    for (i=0; i < tData.length; i++){
        if (tData[i].style.backgroundColor !== 'white'){
            fullSlot.push(tData[i]);
        }
    }
    if (fullSlot.length === tData.length){
        return true;
    } 
}

function connectFourCheck(one,two,three,four){
    return (one ===two && one===three && one===four && one !=="white" && one !==undefined)
}