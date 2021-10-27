// provided input
const iconsArray = [
	{
		name: 'cat',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'crow',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dog',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dove',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'dragon',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'horse',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'hippo',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'fish',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas'
	},
	{
		name: 'carrot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'apple-alt',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'lemon',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'pepper-hot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas'
	},
	{
		name: 'user-astronaut',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-graduate',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-ninja',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	},
	{
		name: 'user-secret',
		prefix: 'fa-',
		type: 'user',
		family: 'fas'
	}
];


// DOM elements
const container = document.querySelector('.container')
const select = document.getElementById('categories-select')

// STRUTTURA: {animal: Array(8), vegetable: Array(4), user: Array(4)}
const newIcons = sortIntoCategories(iconsArray)

// genero tutte le card al caricamento della pagina
generateCards('all', newIcons)

// inserisco i valori nella select in base alle categorie
populateSelect(newIcons)



/**
 * Funzione che popola la select con le categorie delle icone
 * @param {{}} obj oggetto dal quale estrarre le categorie
 */
function populateSelect(obj) {
    const types = Object.keys(obj)
    let options = '<option value="all">All</option>'

    types.forEach(type => {
        options += `<option value="${type}">${type[0].toUpperCase() + type.slice(1)}</option>`
    })

    select.innerHTML = options
}


/**
 * Crea un oggetto dividendo le icone in oggetti che hanno come chiave le categorie
 * @param {[]} arrayIcons array di partenza fornito dalla consegna
 * @returns oggetto contenente le icone smistate
 */
function sortIntoCategories(arrayIcons) {
    let newIcons = {}

    arrayIcons.forEach(icon => {
        const { name, prefix, type, family } = icon

        if (!newIcons[type]) {
            newIcons[type] = []
        }
		
        newIcons[type].push({
            name,
            prefix,
            type,
            family
        })
    })

    return newIcons
}


/**
 * Funzione che aggiunge al DOM le icone in base alla categoria passata
 * @param {string} category categoria per filtrare le icone
 * @param {{}} obj oggetto che contiene le icone filtrate per categorie
 */
function generateCards(category, obj) {
    let cardsToHtml = ''
    
    if (!obj[category]) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const iconsArray = obj[key]
                iconsArray.forEach(icon => {
                    cardsToHtml += createCardElement(icon)
                })
            }
        }
    } else {
        obj[category].forEach(icon => {
            cardsToHtml += createCardElement(icon)
        })
    }
    
    container.innerHTML = cardsToHtml
}


/**
 * Funzione che crea il codice html per un'icona che viene passata come argomento
 * @param {{}} icon oggetto contenente un'icona
 * @returns codice html della card
 */
function createCardElement(icon) {
	const { name, prefix, type, family } = icon

    let color = ''
    // determine the color
	switch (type) {
		case 'animal':
			color = 'blue'
			break
		case 'vegetable':
			color = 'orange'
			break
		case 'user':
			color = 'green'
			break
	}

    const card = 
    `<div class="card">
        <i class="${family} ${prefix + name}" style="color: ${color}"></i>
        <div>${name.toUpperCase()}</div>
    </div>`

    return card
}


// event listener sulla select per filtrare le icone
select.addEventListener('change', function () {
    const type = select.value
    generateCards(type, newIcons)
})