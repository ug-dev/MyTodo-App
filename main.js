var ul = document.getElementById('list');
var tempArray = [];
var tempChar;

//Get saved Todos from localstorage..
function getTaskFromLocalstorage() {
    if(localStorage.getItem('mytodos') === null){
        return false;
    }
    else{
        tempArray = JSON.parse(localStorage.getItem('mytodos'));
    }
    tempArray.forEach(function(task) {
        var textnode = document.createTextNode(task);
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('id', 'check');
                
        var label = document.createElement('input');
        label.setAttribute('id', 'label');
        label.setAttribute('type', 'text');
        label.setAttribute('value', `${task}`);
        label.setAttribute('readonly', 'true');
                
        ul.appendChild(label);
        li.appendChild(checkbox);
        li.appendChild(label);
                        
        ul.appendChild(li);
                
        setTimeout(() => {
            li.className = 'visual';
        }, 2);
    })
}

//Adding todos function..
function addItem(){
    var input = document.querySelector('#getTask');
    item = input.value;

    if (item === ''){
        alert("Hey, Empty Feild is not allowed here..");
        return false;
    }
    else{
        if(localStorage.getItem('mytodos') === null){
            tempArray = [];
        }
        else{
            tempArray = JSON.parse(localStorage.getItem('mytodos'));
        }
        tempArray.push(item);
        localStorage.setItem('mytodos',JSON.stringify(tempArray));

        var textnode = document.createTextNode(item);
        var li = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute('id', 'check');
    
        var label = document.createElement('input');
        label.setAttribute('id', 'label');
        label.setAttribute('type', 'text');
        label.setAttribute('value', `${item}`);
        label.setAttribute('readonly', 'true');
    
        ul.appendChild(label);
        li.appendChild(checkbox);
        li.appendChild(label);
            
        ul.appendChild(li);
    
        setTimeout(() => {
            li.className = 'visual';
        }, 20);
        input.value = '';
    }          
}

var enterButton = document.querySelector('#getTask');
enterButton.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        addItem();
    }
});

//Deleting todos function..
function deleteItem(){
    var li = ul.children
    for (let i = 0; i < li.length; i++){
        while ( li[i] && li[i].children[0].checked){
            if(localStorage.getItem('mytodos') === null){
                tempArray = [];
            }
            else{
                tempArray = JSON.parse(localStorage.getItem('mytodos'));
            }
            tempArray.splice(i, 1);
            localStorage.setItem('mytodos', JSON.stringify(tempArray));
            ul.removeChild(li[i]);
        }
    }
}

//Clear all tasks from localstorage..
var deleteAllButton = document.getElementById('btn3');
deleteAllButton.addEventListener('click', deleteAllItem);

function deleteAllItem(){
    var li = ul.children
    for (let i = 0; i <= li.length; i++){
        localStorage.clear();
        while ( li[i] ){
            ul.removeChild(li[i]);
        }   
    }
}

var filterButton = document.getElementById('filter');
filterButton.addEventListener('keyup', filterTask);
function filterTask(tempChar){
    const text = tempChar.target.value.toLowerCase();
    console.log(text)   
    if(text !== ''){
        document.querySelector('.add-todo').style.display = 'none';
        document.querySelector('.search-feild').style.marginBottom = '30px';
    }  
    else {
        document.querySelector('.add-todo').style.display = 'block';
    }
    document.querySelectorAll('.visual').forEach(function(task){
        var itemNew = task.children[1].attributes[2].value;
        if(itemNew.toLowerCase().indexOf(text) == -1)
        {
            task.style.display = 'none';
        }
        else{
            task.style.display = 'block';
        }
    });
}