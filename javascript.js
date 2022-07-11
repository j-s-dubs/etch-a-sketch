// TODO
// remove lines from download
// install html2canvas in repo

// launch settings/functions
let dimension = 16
let drawColor = "#808080"
let canvasColor = 'whiteSmoke'

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
    box.style.backgroundColor = canvasColor
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
  let resolutionInput = prompt(
    'How many pixels wide would you like the cavanvas? (Max 200)'
  )
  dimension = Math.min(200, resolutionInput)
  let container = document.getElementById('boxes')
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  buildGrid(dimension)
  allowDrawing(drawColor)
})

// navbar: color picker
let colorpicker = document.getElementById('colorpicker')

colorpicker.value = drawColor

colorpicker.onchange = function() {
  drawColor = this.value
  if (eraserStatus == 0) {
    allowDrawing(drawColor)
  }
}

// navbar: eraser
let eraser = document.getElementById('eraser')
let eraserStatus = 0

eraser.addEventListener('click', () => {
  if (eraserStatus == 0) {
    // need to make this more flexible
    let eraseColor = canvasColor
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
  allowDrawing(drawColor)
})

// bottom download button
let downloadBtn = document.getElementById('download')

downloadBtn.addEventListener('click', () => {
  let download = document.getElementById('boxes')
  downloadDrawing()
})

function downloadDrawing() {
  let drawing = document.getElementById('boxes')
  html2canvas(drawing, {allowTaint: true}).then(function (drawing) {
    let link = document.createElement('a')
    document.body.appendChild(link)
    link.download = 'sketch.png'
    link.href = drawing.toDataURL()
    // link.target = '_blank'
    link.click()
  })
}
