document.querySelector('#menu .burger').addEventListener('click', function () {
    console.log('toto')
    if (this.querySelector('.bar').getAttribute('class') == 'bar') {
        this.querySelector('.bar').classList.add('active')
        document.querySelector('#menu nav').style.display = 'flex'
        document.querySelector('main section').style.display = 'none'
    } else {
        this.querySelector('.bar').classList.remove('active')
        document.querySelector('#menu nav').style.display = 'none'
        document.querySelector('main section').style.display = 'flex'
    }
})