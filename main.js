/* the DOM */
const main = document.querySelector('main')
let h1 = document.querySelector('h1')
let boxes = Array.from(document.querySelectorAll('.box'))
const startGame = document.querySelector('#start')
const startGameBtn = document.querySelector('#start button')
const restartGame = document.querySelector('#restart')
const restartGameBtn = document.querySelector('#restart button')
const norRestart = main.querySelector('.normalrestart')

const indicator = getComputedStyle(document.body).getPropertyValue('--comboColor')

/* the utility */
const x = 'X'
const o = 'O'
let currentPlayer = x
let space = Array(9).fill(null)

function newGame() {
  startGame.style.display = 'flex'
  main.style.filter = "blur(2px)"

  startGameBtn.addEventListener('click', () => {

    startGameBtn.innerHTML = 'Let play...'

    setTimeout(() => {
      startGame.style.display = 'none'
    main.style.filter = "blur(0px)"
    }, 1300)
    
  })
}

newGame()

function start() {
  boxes.forEach(box => {
  box.addEventListener('click', render)
  })
}

let functionCounter = 0;

function render(e) {
 functionCounter++
 let id = e.target.id
 norRestart.style.display = 'initial'

 if (!space[id]) {
  space[id] = currentPlayer
  e.target.innerHTML = currentPlayer

  if (hasWon() !== false) {
    h1.innerText = `${currentPlayer} has won` 
    let win = hasWon()

    win.map(box => {
      boxes[box].style.backgroundColor = indicator
    })

    setTimeout(restart, 1000)

    boxes.forEach(box => {
      box.removeEventListener('click', render)
      box.addEventListener('click', restart)
    })

  }

  currentPlayer = currentPlayer == x ? o : x
 }

 if (functionCounter === 9) {
  setTimeout(() => {
    restart()
  }, 800);
  
 }

}

start()

function restart() {
  restartGame.style.display = 'flex'
  main.style.filter = "blur(2px)"
}

norRestart.addEventListener('click', () => {
  space.fill(null)

  boxes.forEach(box => {
    box.innerHTML = null
    box.style.backgroundColor = null

    box.addEventListener('click', render)
    box.removeEventListener('click', restart)
  });

  currentPlayer = x
  h1.innerHTML = 'Tik Tok Toe'
  functionCounter = 0;
  norRestart.style.display = 'none'

})

restartGameBtn.addEventListener('click', () => {

  setTimeout(() => {
    main.style.filter = "blur(20px)"
  })

  space.fill(null)
  restartGameBtn.innerHTML = 'loading...'

  
  boxes.forEach(box => {
    box.innerHTML = null
    box.style.backgroundColor = null

    box.addEventListener('click', render)
    box.removeEventListener('click', restart)
  });


  currentPlayer = x
  h1.innerHTML = 'Tik Tok Toe'
  functionCounter = 0;
  norRestart.style.display = 'none'
  
  setTimeout(() => {
    restartGame.style.display = 'none'
    main.style.filter = "blur(0px)"
    restartGameBtn.innerHTML = 'RESTART'
  }, 2000)
  
})

const winningCombo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function hasWon() {
  for (const condition of winningCombo) {
    let [a,b,c] = condition

    if (space[a] && (space[a] == space[b] && space[a] == space[c])) {
      return [a,b,c]
    }
  }

  return false
}