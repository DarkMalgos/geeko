document.querySelector('#file').addEventListener('change', function () {

    let span = document.createElement('span'),
        p = document.createElement('p'),
        bloc = document.querySelector('#info-file')
    bloc.innerHTML = ''
    span.innerHTML = this.value.split('\\')[2]
    p.innerHTML = 'choisi ta photo de definition'
    bloc.appendChild(p)
    bloc.appendChild(span)
})