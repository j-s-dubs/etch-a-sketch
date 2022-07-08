// launch settings/functions
let dimension = 16
let drawColor = "#808080"

buildGrid(dimension)
allowDrawing(drawColor)

// canvas logic
function buildGrid(dimension) {
  createColumns(dimension)
  createRows(dimension)
}

function createColumns(dimension) {
  for (let i = 0; i < dimension; i++) {
    let container = document.getElementById('boxes')
    let column = document.createElement('div')
    column.className = 'column'
    container.appendChild(column.cloneNode(true))
  }
}

function createRows(dimension) {
  let columns = document.getElementsByClassName('column')
  for (let index = 0; index < columns.length; index++) {
    let box = document.createElement('div')
    box.className = 'box'
    // box.innerHTML = 'X'
    for (let i = 0; i < dimension; i++) {
      columns[i].appendChild(box.cloneNode(true))
    }
  }
}

// drawing logic
function allowDrawing(drawColor) {
  let canvas = document.querySelectorAll('div.box')
  canvas.forEach((box) => {
    box.addEventListener('mouseover', (e) => {
      if (e.buttons == 1) {
      box.style.backgroundColor = drawColor
      }
    })
    box.addEventListener('mousedown', () => {
      box.style.backgroundColor = drawColor
    })
  })
}

// navbar: resolution button
let resolution = document.getElementById('resolution')

resolution.addEventListener('click', () => {
  let resolutionInput = prompt('How many pixels wide would you like the cavanvas? (Max 200)')
  dimension = Math.min(200, resolutionInput)
  let container = document.getElementById('boxes')
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  buildGrid(dimension)
  allowDrawing()
  console.log(newResolution)
})

// navbar: color picker
let colorpicker = document.getElementById('colorpicker')

colorpicker.value = drawColor

colorpicker.onchange = function() {
  drawColor = this.value;
  allowDrawing(drawColor)
}

// navbar: eraser
let eraser = document.getElementById('eraser')
let eraserStatus = 0

eraser.addEventListener('click', () => {
  if (eraserStatus == 0) {
    // need to make this more flexible
    let eraseColor = 'WhiteSmoke'
    allowDrawing(eraseColor)
    eraser.classList.add('eraser-on')
    eraserStatus = 1
  } else {
    allowDrawing(drawColor)
    eraser.classList.remove('eraser-on')
    eraserStatus = 0
  }
})

// navbar: clear button
let clearBtn = document.getElementById('clear')

clearBtn.addEventListener('click', () => {
  let container = document.getElementById('boxes')
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  buildGrid(dimension)
  allowDrawing()
})
