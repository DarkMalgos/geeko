document.querySelector('label').addEventListener('click', function () {
    this.classList.remove('firstLabel')
    this.classList.add('small')
    document.querySelector('input').style.display = 'block'
})