import './assets/stylesheet/style.less'
import Controller from './module/Controller'

const body = document.querySelector('body')!
const list = document.querySelectorAll('#theme > ul > li > span')
const theme = localStorage.getItem('theme') || 'lightyellow'

body.className = theme

list.forEach(item => {
  item.className = ''
  if (item.id === theme) item.className = 'current'

  item.addEventListener('click', () => {
    list.forEach(ele => (ele.className = ''))

    localStorage.setItem('theme', item.id)
    body.className = item.id
    item.className = 'current'
  })
})

new Controller()
