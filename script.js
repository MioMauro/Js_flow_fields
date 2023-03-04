const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight //setup the entire canvas

console.log(ctx)

// canvas settings
ctx.fillStyle = 'white'
ctx.strokeStyle = 'white'
ctx.lineWidth = 1
//ctx.lineWidth = 100
//ctx.lineCap ='round' //line end rounded

//circle
//ctx.arc(100, 100, 50, 0, Math.PI * 2)
//ctx.fill() // render the circle

// draw a line
//ctx.beginPath()
//ctx.moveTo(100, 200)
//ctx.lineTo(400, 500)
//ctx.stroke()

class Particles {
  constructor(effect){
    this.effect = effect
    this.x = Math.floor(Math.random() * this.effect.width)
    this.y = Math.floor(Math.random() * this.effect.height)
    this.speedX = Math.random() * 5 - 2.5
    this.speedY = Math.random() * 5 - 2.5
    this.history = [{ x: this.x, y: this.y}]
    this.maxLength = Math.floor(Math.random() * 100 + 10)
    this.angle = 0
  }
  draw(context){
    context.fillRect(this.x, this.y, 10, 10)
    context.beginPath()
    context.moveTo(this.history[0].x, this.history[0].y)
    for (let i = 0; i < this.history.length; i++){
      context.lineTo(this.history[i].x, this.history[i].y)
    }
    context.stroke()
  }
  update(){
    let x = Math.floor(this.x / this.effect.cellSize)
    let y = Math.floor(this.y / this.effect.cellSize)
    let index = y * this.effect.cols + x
    this.angle = this.effect.flowField[index]

    this.speedX = Math.cos(this.angle)
    this.speedY = Math.sin(this.angle)
    this.x += this.speedX
    this.y += this.speedY
    
    this.history.push({x: this.x, y: this.y})
    if (this.history.length > this.maxLength){
      this.history.shift()
    }
  }
}

class Effect {
  constructor(width, height){
    this.width = width
    this.height = height
    this.particles = []
    this.numberOfParticles = 50
    this.cellSize = 20
    this.rows
    this.cols
    this.flowField = []
    this.init()
  }
  init(){
    //create flow field effect
    this.rows = Math.floor(this.height / this.cellSize)
    this.cols = Math.floor(this.width / this.cellSize)
    this.flowField = []
    for (let y = 0; y < this.rows; y++){
      for (let x = 0; x < this.cols; x++){
        let angle = (Math.cos(x) + Math.sin(y)) * 2
        this.flowField.push(angle)
      }
      console.log(this.flowField)
    }

    //create particles
    for (let i = 0; i < this.numberOfParticles; i++){
      this.particles.push(new Particles(this))
    }    
  }
  render(context){
    this.particles.forEach(particle => {
      particle.draw(context)
      particle.update()
    })
  }
}

const effect = new Effect(canvas.width, canvas.height)
console.log(effect)

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  effect.render(ctx)
  requestAnimationFrame(animate)
}
animate()

