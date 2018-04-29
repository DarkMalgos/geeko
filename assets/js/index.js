document.querySelector('label').addEventListener('click', function () {
    this.classList.remove('firstLabel')
    this.classList.add('small')
    document.querySelector('input').style.display = 'block'
})

var httpRequest = new XMLHttpRequest()
document.querySelector('#search').addEventListener('change', function () {
    if (this.value.length < 3 || this.value === '')
        return
    console.log(this.value)
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === 4) {
            console.log(JSON.parse(this.response))
        }
    }
    httpRequest.open('GET', '/autocomplete?q=' + this.value, true)
    httpRequest.send()
})