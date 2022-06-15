const startBtnEl = document.querySelector('button[data-start]')
const stopBtnEl =document.querySelector('button[data-stop]')
stopBtnEl.setAttribute("disabled", "")
const bodyEl = document.querySelector('body')

const getRandomHexColor = function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
let timerId = 0
startBtnEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor()
      }, 1000)
    startBtnEl.setAttribute("disabled", "")
    stopBtnEl.removeAttribute('disabled')
})

stopBtnEl.addEventListener('click', () => {
    clearInterval(timerId)
    startBtnEl.removeAttribute('disabled')
    stopBtnEl.setAttribute("disabled", "")
})