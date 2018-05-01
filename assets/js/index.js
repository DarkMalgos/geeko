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
            words = JSON.parse(this.response).words
            console.log(words)
            if (words.length <= 0) return
            let bloc = document.querySelector('.result-bloc')
            bloc.innerHTML = ''
            for (word of words) {
                let a = document.createElement('a'),
                    img = document.createElement('img'),
                    div = document.createElement('div'),
                    p1 = document.createElement('p'),
                    p2 = document.createElement('p')
                a.setAttribute('href', '/definition?q='+word.id)
                a.setAttribute('class', 'result-item')
                img.setAttribute('src', '/img/'+word.picture)
                div.setAttribute('class', 'item-info')
                p1.setAttribute('class', 'univer')
                p2.setAttribute('class', 'name')
                p1.innerHTML = word.title
                p2.innerHTML = word.name
                div.appendChild(p1)
                div.appendChild(p2)
                a.appendChild(img)
                a.appendChild(div)
                bloc.appendChild(a)
            }
            bloc.style.display = 'block'
            if (words.length < 4) bloc.style.height = 'auto'
        }
    }
    httpRequest.open('GET', '/autocomplete?q=' + this.value, true)
    httpRequest.send()
})