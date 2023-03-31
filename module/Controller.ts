import Snake from './Snake'
import Food from './Food'
import Panel from './Panel'

class Controller {

  snake: Snake
  food: Food
  panel: Panel
  pauseBtn: HTMLElement

  timer: number = 0

  direction: 'up' | 'right' | 'down' | 'left'
  isAlive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.panel = new Panel()
    this.pauseBtn = document.querySelector('#btn > button')!

    this.direction = 'right'
    this.init()
  }

  init() {
    document.addEventListener('keydown', e => this.keydownHandler(e))
    this.pauseBtn.addEventListener('click', () => {
      this.pauseOrPlay()
    })

    this.move()
  }

  keydownHandler(event: KeyboardEvent) {
    const { code } = event

    switch(code) {
      case 'KeyW':
      case 'ArrowUp':
        if (this.isAlive) {
          clearTimeout(this.timer)
          this.direction = 'up'
          this.move()
        }
        break
      case 'KeyD':
      case 'ArrowRight':
        if (this.isAlive) {
          clearTimeout(this.timer)
          this.direction = 'right'
          this.move()
        }
        break
      case 'KeyS':
      case 'ArrowDown':
        if (this.isAlive) {
          clearTimeout(this.timer)
          this.direction = 'down'
          this.move()
        }
        break
      case 'KeyA':
      case 'ArrowLeft':
        if (this.isAlive) {
          clearTimeout(this.timer)
          this.direction = 'left'
          this.move()
        }
        break
      case 'Space':
        this.pauseOrPlay()
        break
    }
  }

  move() {
    let { X, Y } = this.snake

    switch(this.direction) {
      case 'up':
        Y -= 10
        break
      case 'right':
        X += 10
        break
      case 'down':
        Y += 10
        break
      case 'left':
        X -= 10
        break
    }

    this.footEat(X, Y)

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (err) {
      this.isAlive = false
      alert((err as Error).message)
    }

    this.isAlive && (this.timer = setTimeout(() => this.move(), 300 - (this.panel.level - 1) * 30))
  }

  footEat(X: number, Y: number) {
    if ( X === this.food.X && Y === this.food.Y) {
      this.food.random()
      this.panel.scoreAdd()
      this.snake.bodyItemAdd()
    }
  }

  pauseOrPlay() {
    if (this.isAlive) {
      this.isAlive = false
      this.pauseBtn.innerText = 'Go on'
      clearTimeout(this.timer)
    } else {
      this.isAlive = true
      this.pauseBtn.innerText = 'Pause'
      this.move()
    }
  }

}

export default Controller
