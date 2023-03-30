class Food {
  foodEle: HTMLElement

  constructor() {
    this.foodEle = document.getElementById('food')!

    this.random()
  }

  get X() {
    return this.foodEle.offsetLeft
  }

  get Y() {
    return this.foodEle.offsetTop
  }

  random() {
    this.foodEle.style.top = Math.round(Math.random() * 35) * 10 + 'px'
    this.foodEle.style.left = Math.round(Math.random() * 35) * 10 + 'px'
  }
}

export default Food
