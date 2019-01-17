// vars 
const todoList = document.getElementById('list'),
	  actionPanel1 = document.getElementById('actionPanel1'),
	  actionPanel2 = document.getElementById('actionPanel2'),
	  inputElement = document.getElementById('input')
let idCounter = 0,
	isChecked = false,
	todos = [];

// create data item
function createItem(name) {
	return {
		id: `todoItem${++idCounter}`,
		label: name,
		done: false,
		checked: false
	}
}

// Update object data
function updateTodoList(props) {
	
	const {action, isSelected, name, id} = props;
	
	if (action == 'add') {
		todos.push(createItem(name));
	} else if (action == 'done' || action == 'checked') {
		todos.map( (item) => {
			if (item.id == id) {
				item[action] = !item[action];
			}
		})
	} else if (action == 'doneAll') {
		todos.map( (item) => {
			if (item.checked) {
				item.done = true;
			}
			item.checked = false;
		});
	} else if (action == 'select') {
		todos.map( (item) => item.checked = isSelected );
	} else if (action == 'remove') {
		todos = todos.filter( (item) => !item.checked );
	}

	displayTodoList();
}

// Update DOM tree
function displayTodoList() {
	isChecked = todos.some((item) => item.checked);
	
	isChecked ? actionPanel2.classList.remove('d-none') : actionPanel2.classList.add('d-none');
	isChecked ? actionPanel1.classList.add('d-none') : actionPanel1.classList.remove('d-none');

	todoList.innerHTML = '';
	
	if (todos) {
		todos.forEach( (item) => todoList.append(createTodoItem(item)) );
	}
}

// prepare DOM data
function createTodoItem(item) {
	
	const li = document.createElement('li');
	li.className = 'list-group-item';
		
	const div = document.createElement('div');
	div.className = 'form-group form-check';
	
	const input = document.createElement('input');
	input.className = 'form-check-input';
	input.setAttribute('id', item.id);
	input.setAttribute('type', 'checkbox');
	input.checked = item.checked;
	
	const label = document.createElement('label');
	!item.done ? label.className = 'form-check-label' : label.className = 'form-check-label todoDone';
	label.setAttribute('for', item.id);
	label.innerHTML = item.label;
		
	div.append(input, label);
	
	if (!isChecked) {
		const button = document.createElement('button');
		button.setAttribute('style', 'float:right');

		// button.addEventListener('click', function(e){
		// 	item.done = !item.done;
		// 	displayItems(todos);
		// }) 
			
		item.done ? button.className = 'btn btn-outline-danger' : button.className = 'btn btn-outline-success';;
		item.done ? button.innerHTML = 'restore' : button.innerHTML = 'Done';
				
		div.append(button);
	}
		
	li.append(div);
	return li;
}

// eventListeners
inputElement.addEventListener('keyup', (e) => {
	const val = e.keyCode || e.charCode;
	
	if (val === 13) {
		updateTodoList({action: 'add', name: e.target.value.trim()});
		inputElement.value = '';	
	}
})

todoList.addEventListener('click',(e) => {
	if (e.target.tagName.toLowerCase() == 'button') {
		const idx = e.target.previousSibling.getAttribute('for');
		updateTodoList({action:'done', id:idx});
	}

	if (e.target.tagName.toLowerCase() == 'input') {
		updateTodoList({action:'checked', id: e.target.id});
	}
})

document.getElementById('selectAllAction').addEventListener('click',(e) => {
	updateTodoList({action:'select', isSelected:true});
})

document.getElementById('restoreAction').addEventListener('click',(e) => {
	updateTodoList({action:'select', isSelected: false});
})

document.getElementById('doneAction').addEventListener('click',(e) => {
	updateTodoList({action:'doneAll'});
})

document.getElementById('removeAction').addEventListener('click',(e) => {
	updateTodoList({action:'remove'});
})

// test Data
todos.push(createItem('item 1'));
todos.push(createItem('item 2'));
todos.push(createItem('item 3'));

displayTodoList();