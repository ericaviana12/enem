document.getElementById('btnBack').addEventListener('click', () => {
    window.location.href = '../../../estudo.html'
})

document.getElementById('btnHome').addEventListener('click', () => {
    window.location.href = '../../../index.html'
})

const scrollBtn = document.querySelector('.scroll-top-btn')

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollBtn.classList.remove('hidden')
    } else {
        scrollBtn.classList.add('hidden')
    }
})
