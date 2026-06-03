const range = document.querySelector('#range')
const rangeValue = document.querySelector('#rangeValue')

range.addEventListener('input', () => {
    rangeValue.textContent = range.value
})