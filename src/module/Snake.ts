class Snake {
  snakeEle: HTMLElement
  headEle: HTMLElement
  bodyItems: HTMLCollection

  constructor() {
    this.snakeEle = document.getElementById('snake')!
    this.headEle = this.snakeEle.querySelector('div')!
    this.bodyItems = this.snakeEle.getElementsByTagName('div')
  }

  get X() {
    return this.headEle.offsetLeft
  }

  get Y() {
    return this.headEle.offsetTop
  }

  set X(val: number) {
    if (this.X === val) return

    // X-axis boundary check
    if (val < 0 || val > 350) {
      throw new Error('The snakes hit the wall & GAME OVER!')
    }

    // X-axis reverse check
    if (this.bodyItems[1] && (this.bodyItems[1] as HTMLElement).offsetLeft === val) {
      val > this.X ? (val = this.X - 10) : (val = this.X + 10)
    }

    this.bodyMove()
    this.headEle.style.left = val + 'px'
    this.headHitBodyCheck()
  }

  set Y(val: number) {
    if (this.Y === val) return

    // Y-axis boundary check
    if (val < 0 || val > 350) {
      throw new Error('The snake hits the wall & GAME OVER!')
    }

    // Y-axis reverse check
    if (this.bodyItems[1] && (this.bodyItems[1] as HTMLElement).offsetTop === val) {
      val > this.Y ? (val = this.Y - 10) : (val = this.Y + 10)
    }

    this.bodyMove()
    this.headEle.style.top = val + 'px'
    this.headHitBodyCheck()
  }

  bodyItemAdd() {
    const div = document.createElement('div')
    this.snakeEle.insertAdjacentElement('beforeend', div)
  }

  bodyMove() {
    const { length } = this.bodyItems

    for (let i = length - 1; i > 0; i--) {
      const { offsetLeft: X, offsetTop: Y } = this.bodyItems[i - 1] as HTMLElement
      const currentItem = this.bodyItems[i] as HTMLElement
      currentItem.style.left = X + 'px'
      currentItem.style.top = Y + 'px'
    }
  }

  headHitBodyCheck() {
    const { length } = this.bodyItems
    for (let i = 1; i < length; i++) {
      if (
        this.X === (this.bodyItems[i] as HTMLElement).offsetLeft &&
        this.Y === (this.bodyItems[i] as HTMLElement).offsetTop
      ) {
        throw new Error('The snake hits itself & GAME OVER!')
      }
    }
  }
}

export default Snake
