// create canvas
let dimension = 100

buildGrid(dimension)

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
let canvas = document.querySelectorAll('div.box')

canvas.forEach((box) => {
  box.addEventListener('mouseover', (e) => {
    if (e.buttons == 1) {
    box.style.backgroundColor = 'Gray'
    }
  })
})
