const loadProducts = (produtos, idDivParent) => {
    const parentDiv = document.querySelector(idDivParent)

    produtos.forEach(produto => {

        const html = `
            <article>
                <img src="${produto.image}" alt="${produto.title}">
                <p>${produto.category}</p>
                <h3>${produto.title}</h3>
                <p><strong>RS: ${produto.value}</strong></p>
                <button type="button" onclick="modalTrigger(${produto.id})">QUERO</button>
            </article>
        `

        parentDiv.insertAdjacentHTML('beforeend', html)
    });
}


const modalTrigger = (productId) => {
    const modal = document.querySelector('.modal')
    
    if (productId != null){
        const produto = produtos.filter( produto => produto.id == productId )[0]
        
        if (produto != null) {
            modal.querySelector('#category').value = produto.category
            modal.querySelector('#title').value = produto.title
        }
    }

    modal.classList.contains('hide') == true ? modal.classList.remove('hide') : modal.classList.add('hide')
}


const whatsappLinkGenerator = (phoneNumber, productCategory, productTitle, productQuantity, productSize, productCustomer) => `http://api.whatsapp.com/send?l=pt_BR&phone=${phoneNumber}&text=Olá, MM Modas! Eu me chamo ${productCustomer}. Tenho interesse em ${productQuantity} ${productCategory}, modelo: ${productTitle}, tamanho: ${productSize}.`


const checkout = (phoneNumber) => {
    const form = document.querySelector('#product-form')

    form.addEventListener('submit', e => {
        e.preventDefault()

        const productCategory = form.querySelector('input#category').value
        const productTitle = form.querySelector('input#title').value
        const productQuantity = form.querySelector('input#quantity').value
        const productSize = form.querySelector('input#size').value
        const productCustomer = form.querySelector('input#customer').value

        const whatsappUrl = whatsappLinkGenerator(phoneNumber, productCategory, productTitle, productQuantity, productSize, productCustomer)
        window.location.href = whatsappUrl
    })
}

const searchProduct = (products, searchTerm) => products.filter(product => product.title.includes(`${searchTerm}`))

const loadSearch = (form, productsDivId) => {
    const productsDiv = document.querySelector(productsDivId)
    const inputSearch = form.querySelector('#inputSearch')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        if (inputSearch.value != ''){
            productsDiv.querySelectorAll('article').forEach(produto => {
                produto.remove()
            })
        }

        const results = searchProduct(produtos, inputSearch.value)

        results.forEach(produto => {

            const html = `
                <article>
                    <img src="${produto.image}" alt="${produto.title}">
                    <p>${produto.category}</p>
                    <h3>${produto.title}</h3>
                    <p><strong>RS: ${produto.value}</strong></p>
                    <button type="button" onclick="modalTrigger(${produto.id})">QUERO</button>
                </article>
            `
    
            productsDiv.insertAdjacentHTML('beforeend', html)
        });
    })
}


const searchCategory = (products, searchTerm) => products.filter(product => product.category == searchTerm)

const loadCategory = (categoryTerm) => {
    const productsDiv = document.querySelector('#product-div')

    if(categoryTerm.value != 'Oferta'){
        productsDiv.querySelectorAll('article').forEach(produto => {
            produto.remove()
        })

        results = searchCategory(produtos, categoryTerm.value)
    } else {
        results = produtos
    }

    
    results.forEach(produto => {

        const html = `
            <article>
                <img src="${produto.image}" alt="${produto.title}">
                <p>${produto.category}</p>
                <h3>${produto.title}</h3>
                <p><strong>RS: ${produto.value}</strong></p>
                <button type="button" onclick="modalTrigger(${produto.id})">QUERO</button>
            </article>
        `

        productsDiv.insertAdjacentHTML('beforeend', html)
    });
    
}

loadProducts(produtos, '#product-div')
checkout('5575998578488')
loadSearch(document.querySelector('#formSearch'), '#product-div')