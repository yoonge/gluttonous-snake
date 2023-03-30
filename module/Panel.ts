class Panel {
  score = 0
  level = 1

  scoreEle: HTMLElement
  levelEle: HTMLElement

  maxLevel: number
  levelStep: number

  constructor(maxLevel: number = 10, levelStep: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!

    this.maxLevel = maxLevel
    this.levelStep = levelStep
  }

  scoreAdd() {
    this.scoreEle.innerText = ++this.score + ''

    if (this.score % this.levelStep === 0) {
      this.levelUp()
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerText = ++this.level + ''
    }
  }
}

export default Panel
