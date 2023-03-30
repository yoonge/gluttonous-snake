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

  set X(val: number) {
    this.headEle.style.left = val + 'px'
  }

  get Y() {
    return this.headEle.offsetTop
  }

  set Y(val: number) {
    this.headEle.style.top = val + 'px'
  }

  addBodyItem() {
    const div = document.createElement('div')
    this.snakeEle.insertAdjacentElement('beforeend', div)
  }
}

export default Snake
