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




function populateSelect(obj) {
    const types = Object.keys(obj)
    let options = '<option value="all">All</option>'

    types.forEach(type => {
        options += `<option value="${type}">${type[0].toUpperCase() + type.slice(1)}</option>`
    })

    select.innerHTML = options
}


function sortIntoCategories(array) {
    let newIcons = {}
    array.forEach(icon => {
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


function generateCards(category, obj) {
    let cardsToHtml = ''
    
    if (!obj[category]) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const iconsArray = obj[key]

                iconsArray.forEach(icon => {
                    const { name, prefix, type, family } = icon
                    cardsToHtml += createCardElement(name, prefix, type, family)
                })
            }
        }
    } else {
        obj[category].forEach(icon => {
            const { name, prefix, type, family } = icon
            cardsToHtml += createCardElement(name, prefix, type, family)
        })
    }
    
    container.innerHTML = cardsToHtml
}


function createCardElement(name, prefix, type, family) {
    let color = ''
    // determine the color
    if (type === 'animal') {
        color = 'blue'
    } else if (type === 'vegetable') {
        color = 'orange'
    } else {
        color = 'yellow'
    }

    const card = 
    `<div class="card">
        <i class="${family} ${prefix + name}" style="color: ${color}"></i>
        <div>${name.toUpperCase()}</div>
    </div>`

    return card
}


select.addEventListener('change', function () {
    const type = select.value
    generateCards(type, newIcons)
})