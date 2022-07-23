document.addEventListener('DOMContentLoaded', (event) => {
    console.log('document loaded')
});

const form = document.querySelector('#github-form')
console.log(form)
form.addEventListener('submit', event => {
    event.preventDefault()
    let name = event.target[0].value
    fetch(`https://api.github.com/search/users?q=${name}`)
        .then(resp => resp.json())
        .then(data => { console.log(data)
            const userList = document.querySelector('#user-list')
            const reposList = document.querySelector('#repos-list')
            userList.innerHTML = ''
            reposList.innerHTML = ''
            data.items.map(item => {
                const li = document.createElement('li')
                const h2 = document.createElement('h2')
                h2.textContent = item.login
                h2.addEventListener('click', e => {
                    const reposList = document.querySelector('#repos-list')
                    reposList.innerHTML = ''
                    e.preventDefault()
                    fetch(`https://api.github.com/users/${item.login}/repos`)
                    .then(resp => resp.json())
                    .then(data => data.map(repo => {
                        const li = document.createElement('li')
                        const h3 = document.createElement('h3')
                        h3.textContent = repo.name
                        
                        li.append(h3)
                        reposList.append(li)

                    })
                    )
                })
            

                const img = document.createElement('img')
                img.src = item.avatar_url
                const a = document.createElement('a')
                a.href = item.html_url
                a.innerText = 'Profile link'
                li.append(h2, img, a)
                userList.append(li)
            })
        })
        form.reset()
})