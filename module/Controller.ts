import Snake from './Snake'
import Food from './Food'
import Panel from './Panel'

class Controller {

  snake: Snake
  food: Food
  panel: Panel

  direction: 'up' | 'right' | 'down' | 'left'
  isAlive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.panel = new Panel()

    this.direction = 'right'

    this.init()
  }

  init() {
    document.addEventListener('keydown', e => this.keydownHandler(e))

    this.move()
  }

  keydownHandler(event: KeyboardEvent) {
    const { key } = event

    switch(key) {
      case 'w':
      case 'ArrowUp':
        this.direction = 'up'
        break
      case 'd':
      case 'ArrowRight':
        this.direction = 'right'
        break
      case 's':
      case 'ArrowDown':
        this.direction = 'down'
        break
      case 'a':
      case 'ArrowLeft':
        this.direction = 'left'
        break
    }
  }

  move() {
    const { X, Y } = this.snake

    switch(this.direction) {
      case 'up':
        Y > 0 ?
          this.snake.Y -= 10 :
          this.isAlive = false
        break
      case 'right':
        X < 350 ?
          this.snake.X += 10 :
          this.isAlive = false
        break
      case 'down':
        Y < 350 ?
          this.snake.Y += 10 :
          this.isAlive = false
        break
      case 'left':
        X > 0 ?
          this.snake.X -= 10 :
          this.isAlive = false
        break
    }

    this.isAlive && setTimeout(() => this.move(), 300)
  }

}

export default Controller
