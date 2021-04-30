displayNotes();
var addBtn = document.getElementById('addBtn');

// below event listener will add user input into the local storage
addBtn.addEventListener('click',function(){
	
	let notesObj;
	let addNote = document.getElementById('addNote');
	let addTitle = document.getElementById('addTitle');
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	//Add date
	let now = new Date();
	let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;
	
	
	//pushing into local storage
	if(addNote.value !== '' && addTitle.value !== ''){
		let tempObj = { text: addNote.value, title: addTitle.value };
		
		notesObj.push(tempObj);
		localStorage.setItem('notes',JSON.stringify(notesObj));
		
		addTitle.value = '';
		addNote.value = '';
	}
	
	displayNotes();
});


// funtion to display data stored in the local storage
function displayNotes(){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	let html = '';
	
	notesObj.forEach(function(element,index){
		html += `
				<div class="card mx-4 my-2 text-black thatsMyNote" style="width: 18rem;">
					<div class="card-body">
						<h6>${element.title}</h6>
						<p class="card-text">${element.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
						<button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">Delete</button>
					</div>
				</div>
			`;
	});
	
	let noteEle = document.getElementById('notes');
	
	if(notesObj.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Nothing to display</h3>';
	}
	
}


//function to delete a note
function deleteNote(index){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	displayNotes();
}



