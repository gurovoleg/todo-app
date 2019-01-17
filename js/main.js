// vars 
const listElement = document.getElementById('list')
const actionPanel1 = document.getElementById('actionPanel1')
const actionPanel2 = document.getElementById('actionPanel2')
const inputElement = document.getElementById('input')
const isDevelopmentMode = true
let idCounter = 0
let	isChecked = false
let	todos = []

// generate test Data
function generateTestData(total = 5) {
	for(let i = 1; i <= total; i++) {
		let name = `item ${i}`
		todos.push(createItem(name))
	}
}

// create data item
function createItem(name) {
	const id = ++idCounter
	return {
		id: id,
		label: name,
		done: false,
		checked: false
	}
}

// Update object data
function updateTodoList({action, isDone, name, id}) {
			
	if (action == 'add') {
		todos.push(createItem(name))
	} 

	if (action == 'doneAll') {
		for(let item of todos) {
			if (item.checked) {
				item.done = isDone
			}
			item.checked = false
		}
	} 
	
	if (action == 'select') {
		todos.forEach((item) => item.checked = true)
	} 
	
	if (action == 'remove') {
		todos = todos.filter((item) => !item.checked)
	}

	displayTodoList();
}

// Update DOM tree
function displayTodoList() {
	isChecked = todos.some((item) => item.checked)
	
	if (isChecked) {
		actionPanel2.classList.remove('d-none')
		actionPanel1.classList.add('d-none')
	} else {
		actionPanel2.classList.add('d-none')
		actionPanel1.classList.remove('d-none')
	}
	
	listElement.innerHTML = ''
	
	if (todos) {
		todos.forEach( (item) => listElement.append(createLiElement(item)) )
	}
}

// prepare DOM data
function createLiElement(item) {
	
	const li = document.createElement('li')
	li.className = 'list-group-item';
		
	const div = document.createElement('div')
	div.className = 'form-group form-check'
	
	const input = document.createElement('input');	input.className = 'form-check-input'
	input.setAttribute('id', item.id)
	input.setAttribute('type', 'checkbox')
	input.checked = item.checked;

	input.addEventListener('click', () => {
		item.checked = !item.checked
		displayTodoList()
	})
	
	const label = document.createElement('label')
	label.className = item.done ? 'form-check-label todoDone' : 'form-check-label'
	label.setAttribute('for', item.id)
	// label.innerHTML = item.label
	label.textContent = item.label
		
	div.append(input, label)
	
	if (!isChecked) {
		const button = document.createElement('button')
		button.setAttribute('style', 'float:right')

		button.addEventListener('click', function(){
			item.done = !item.done
			displayTodoList()
		}) 
			
		if (item.done) {
			button.className = 'btn btn-outline-danger'
			button.innerHTML = 'restore'
		} else {
			button.className = 'btn btn-outline-success'
			button.innerHTML = 'Done'
		}
						
		div.append(button)
	}
		
	li.append(div)
	return li
}

// eventListeners
inputElement.addEventListener('keyup', (e) => {
	const keyCode = e.keyCode || e.charCode
	const val = e.target.value.trim()
	
	if (keyCode !== 13 || val === '' ) {
		return
	}
	
	updateTodoList({
		action: 'add', 
		name: val
	})
	
	inputElement.value = ''	
})

document.getElementById('selectAllAction').addEventListener('click',() => {
	updateTodoList({
		action:'select'
	})
})

document.getElementById('restoreAction').addEventListener('click',() => {
	updateTodoList({
		action:'doneAll', 
		isDone: false
	})
})

document.getElementById('doneAction').addEventListener('click',() => {
	updateTodoList({
		action:'doneAll', 
		isDone: true
	})
})

document.getElementById('removeAction').addEventListener('click',() => {
	updateTodoList({
		action:'remove'
	})
})

if (isDevelopmentMode) {
	generateTestData(1000);
}

displayTodoList()