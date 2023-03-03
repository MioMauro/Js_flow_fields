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
  }
  draw(context){
    context.fillRect(this.x, this.y, 50, 50)
  }
}

class Effect {
  constructor(width, height){
    this.width = width
    this.height = height
    this.particles = []
    this.numberOfParticles = 50
  }
  init(){
    //create particles
    for (let i = 0; i < this.numberOfParticles; i++){
      this.particles.push(new Particles(this))
    }    
  }
  render(context){
    this.particles.forEach(particle => {
      particle.draw(context)
    })
  }
}

const effect = new Effect(canvas.width, canvas.height)
effect.init()
effect.render(ctx)
console.log(effect)

