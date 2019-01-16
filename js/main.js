// vars 
const todoList = document.getElementById('list'),
	  actionPanel1 = document.getElementById('actionPanel1'),
	  actionPanel2 = document.getElementById('actionPanel2'),
	  inputElement = document.getElementById('input')
let idCounter = 0,
	isChecked = false,
	todos = [];

// test Data
todos.push(createItem('item 1'));
todos.push(createItem('item 2'));
todos.push(createItem('item 3'));

// Update object data
function updateTodoList(props) {
	
	const {action, name, id, isAll = false, isTrue} = props;
	
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
	} else if (action == 'selectAll') {
		todos.map( (item) => item.checked = true );
	} else if (action == 'restore') {
		todos.map( (item) => item.checked = false );
	} else if (action == 'remove') {
		todos = todos.filter( (item) => !item.checked );
	}

	displayTodoList();
}

// create data item
function createItem(name) {
	const idx = `todoItem${++idCounter}`;
	const newItem = {
		id: idx,
		label: name,
		done: false,
		checked: false
	}
	return newItem;
}

// Update DOM tree
function displayTodoList() {
	isChecked = todos.some((item) => item.checked);
	console.log(isChecked);

	isChecked ? actionPanel2.classList.remove('d-none') : actionPanel2.classList.add('d-none');
	isChecked ? actionPanel1.classList.add('d-none') : actionPanel1.classList.remove('d-none');

	todoList.innerHTML = '';
	
	if (todos) {
		todos.forEach( (item) => {
			todoList.append(createTodoItem(item));
		})
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
	label.className = 'form-check-label';
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
			
		if (item.done) {
			label.className += ' todoDone';
			button.className = 'btn btn-outline-danger';
			button.innerHTML = 'restore';
		} else {
			button.className = 'btn btn-outline-success';
			button.innerHTML = 'Done';
		}		
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
		const idx = e.target.id;
		updateTodoList({action:'checked', id:idx});
	}
})

document.getElementById('selectAllAction').addEventListener('click',(e) => {
	updateTodoList({action:'selectAll'});
})

document.getElementById('doneAction').addEventListener('click',(e) => {
	updateTodoList({action:'doneAll', isAll: true});
})

document.getElementById('restoreAction').addEventListener('click',(e) => {
	updateTodoList({action:'restore'});
})

document.getElementById('removeAction').addEventListener('click',(e) => {
	updateTodoList({action:'remove'});
})

displayTodoList();