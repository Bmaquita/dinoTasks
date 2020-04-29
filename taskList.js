//SELECTORS

const input_task = document.querySelector(".taskInput"); //TARGETING THR INPUT FORM

const add_button = document.querySelector(".addTask");//TARGETING THE ADD TASK BUTTON

const task_list = document.querySelector(".task-list");//TARGETING THE UL

const filterOption = document.querySelector('.filter-tasks') //TARGETING THE SELECT INPUT

const searchTask = document.querySelector('.searchTask')

// THIS IS THE ARRAY OF MESSAGES THAT WILL BE DISPLAYED ON THE PAGE 
const text = ["Welcome to DinoTaskList", "Subtly click on the task when completed", "You can edit and delete task","Use the buttons on the nav to filter and search task", "Be focus and do one task at the time","I hope you enjoy it "];


let count = 0;

let index = 0;

let currentText = ""

let letter =''
/*THIS IS THE TYPED FUNCTION  FOR THE MESSAGES*/

function typed(){
    if (count === text.length){

        count = 0;
    }
    currentText = text[count];
    letter = currentText.slice(0, ++index);
    document.querySelector(".typing").textContent = letter

    if(letter.length === currentText.length){
        count++
        index = 0
    }

    // THIS METHOD IS TO CALL THE TYPED FUNCTION EVERY 500 ms
    setTimeout(typed, 300)

}

//ALL THE FUNCTIONS WILL BE LOADED IN HERE
function functionsLoader(){
    add_button.addEventListener('click', adding_tasks);
    
    task_list.addEventListener('click', deleting_completed_editing_tasks);

    filterOption.addEventListener('click', filterTask);

    document.addEventListener("DOMContentLoaded",getTasks);
    
    searchTask.addEventListener('keyup', searchTasks);
    
    displayTime();
}


//FUNCTION TO SEARCH FOR TASKS
function searchTasks(event){
    
    const search = event.target.value.toLowerCase(); // GETTING THE INPUT VALUES FROM THE SEARCH

    const listOfTasks = task_list.childNodes; // GETTTING THE CHILD NODES OR ALL THE LIST ITEMS

    listOfTasks.forEach(function(tasks){// LOOPING OVER THE ITEMS

        const textItem = tasks.firstChild.textContent; // GETTING THE TEXT CONTENT OF THE ITEMS

        if(textItem.toLocaleLowerCase().indexOf(search)!=-1){ // CHECKING IF THE SEARCH KEYWORD MATCH WITH THE TEXT CONTET OF THE ITEM
            tasks.style.display = "flex"; // IF TRUE THEN DISPLAY THE ITEM
        }
        else {
            tasks.style.display = "none"; //ELSE DO NOT DISPLAY ANYTHING
        }
    }); // END OF THE FOREACH


    event.preventDefault()
}
//STARTING WITH NAVIGATION BAR

//THIS FUCNTION IS USED TO DISPLAY THE TIME ON THE NAVIGATION BAR
function displayTime(){ 
    //IN HERE WE CREATED AN ARRAY OF THE WEEK DAYS THAT WILL BE SHOWN ON THE PAGE
    days_of_week = ["SUN", "MON", "TUE", "WED","THU", "FRI","SAT"]  
    
    //HERE WE ARE CALLING THE CURRENT DATE OBJECT
    const currentDate = new Date();

    var hours = currentDate.getHours(); //GET THE CURRENT HOUR, MINUTES, SECONDS AND WEEK DAY(DISPLAYED IN NUM THUS THE NECESSITY OF THE ARRAY)
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    var week_day = days_of_week[currentDate.getDay()];
    
    var session = "AM" // BY DEFAULT THE DAY SESSION I SET AS AM 

    if (hours === 0 ){ // INSTEAD OF DISPAYING 00 WHEN HOUR IS EQUAL TO 00 IT WILL BE DISPLAYED 12
        hours = 12
    }

    if (hours > 12){ // TO DISPLAY HOUR 0 - 12 EVERITIME THAT HOUR IS GREATER THAT 12 IT WILL DEDUCTED TO SHOW HOURS LESS THAT 12 IN PM
        hours -= 12;
        session = "PM"
    }

    // HERE WE ARE USING TERNARY OPERATOR TO SAY THAT IF HOUR, MINUTES OR SECONDS IS LESS THAN 10 OR WE SHOULD ADD 0 SO WE HAVE DOUBLE NUMBERS
    hours =   (hours < 10) ? "0" +hours:hours;
    seconds = (seconds < 10) ? "0"+seconds:seconds;
    minutes = (minutes < 10) ? "0"+minutes:minutes;

    // HERE WE ARE SIMPLY DISPLAYING THE TIME ON THE WEB PAGE
    var time = `${hours}:${minutes}:${seconds}<sup class = "se" style="font-size:13px">${session}</sup> <span class="week" style="font-size:15px">${week_day}</span>`; 
    const pageClock = document.querySelector('.clock').innerHTML = time;

    setTimeout(displayTime,500); // THE FUNCTION SHOULD BE CALLED EVERY 500 ms
}

//THIS IS THE FUNCTION TO FILTER TASKS
function filterTask(event){

    const all_tasks = task_list.childNodes; // GETTING A LIST OF NODES OR ALL THE ITEM IN THE D.TASKLIST

    // NOW WE ARE GOING TO LOOP THROUGH OVER THEM
    all_tasks.forEach(function(tasks){
        
        // HERE WE LISTEN FOR THE KING OF VALUE THAT IS SELECTED IN THE SWICH. WHETHER SELECTED "COMPLETED, UNCOMPLETE AND SEARCH"
        switch(event.target.value){
            case "all":// IF SELECTED ALL SHOULD DISPLAY ALL THE TASKS
                tasks.style.display ="flex"
                break;
            
            case "completed"://TO DISPLAY THE COMPLETED TASKS WE HAVE TO CHECH IF THE COLLECTION HAVE THE COMPLED CLASS
                if (tasks.classList.contains("completed-task")){
                     
                    tasks.style.display ="flex" // IF IT DOES HAVE THE COMPLED TASKS MUST BE DISPLAYED
                }
                else{
                    //IF THEY DO NOT HAVE THE COMPLETED CLASS THEN A MESSAGE MUST BE DISPLAYED AND SHOW NO COMPLETED TASK
                    
                    tasks.style.display ="none"
                }
                break;
            
            case "uncompleted": // THE SAME LOGIC APPLIES TO UNCOMPLETED TASKS
                if (!tasks.classList.contains("completed-task")){
                     tasks.style.display ="flex"
                }
                else{
                    
                    tasks.style.display ="none"
                }
                break;
            
        }
    })
        event.preventDefault()
    }


//FUNCTION TO ADD TASKS 

function adding_tasks(event){

    //CHECKING THE INPUT IS EMPTY OR IS FILLED WITH SPACES
    if (input_task .value === '' || !input_task .value.replace(/\s/g, '').length){
        swal({
            title: "Please write something on your input",
            text: "Your task cannot be empty!",
            icon: "info",
          });
    }
    else{
        //CREATING THE DIV CONTAINER FOR THE LIST 

    const task_list_div = document.createElement('div');
    task_list_div.classList.add('tk-div');


    // CREATING THE ACTUAL LIST OF TASKS
    const li_tasks = document.createElement('li');
    li_tasks.classList.add('li-tasks');

    
    // ADDING VALUE TO THE LIST WHICH IS THE INPUT OF THE USER
    li_tasks.innerHTML = input_task.value;

    //APPENDING THE LIST TO THE DIV
    task_list_div.appendChild(li_tasks);

    SaveLocalStorage(input_task.value);

    //EDIT BUTTON OR THE ICON
    const edit_task = document.createElement('button');

    edit_task.classList.add('edit-btn');

    edit_task.innerHTML = " <i class = 'fa fa-edit'></i>";

        //APPENDING THE BUTTONS TO THE LI COLLECTION
        task_list_div.appendChild(edit_task);

    //DELETE BUTTON OR THE ICON
    const delete_task = document.createElement("button");
    
    delete_task.classList.add('delete-btn');

    delete_task.innerHTML = "<i class = 'fa fa-trash'></i>";

    //APPENDING THE BUTTONS TO THE LI COLLECTION
    task_list_div.appendChild(delete_task);    
    
    //APPENDING THE LI COLLECTION INTO THE DIV    
  
    //ADDIND TO UL COLLECTION
    task_list.appendChild(task_list_div);

    input_task.value = "";

    }

    event.preventDefault();
}


// IN THIS FUCNTION ADD THE OPTION TO DELETE, EDIT AND DISPLAY COMPLETED TASKS

function deleting_completed_editing_tasks(event){

//DELETING ALL THE TASKS

// HERE I DECLARED THE VARIABLE TO LISTEN FOR THE TARGET  WHERE THE EDIT, DELETED OR COMPLETED OPTION IS BEING CLICKED
    const ItemTarget = event.target;

    if(ItemTarget.classList[0] === 'delete-btn'){// IF THE DELETE OPTION IS CLICKED OR THE BUTTON CLICKED CONTAINS THE DELETE-BTN CLASS THEN
        
    const deleteTarget = ItemTarget.parentElement;
        //PROMPTING THE USER WHETHER HE IS SURE ABOUT HIS DECISION
    swal({
        title: "Sure about that?",
        text: "Your task will be deleted!",
        icon: "warning",
        buttons: ["Cancel", "Sure"],
        dangerMode: true,
      })

      .then((deleteTask) => {   // IF HE IS SURE THEN DELETE
        if (deleteTask) {
          swal( {
            title:"Your task has been deleted!",
            icon: "success",
          });
          removeLocalStorage(deleteTarget);
          deleteTarget.remove();

        }   
      });
   
}

//EDITING THE TASKS
if (ItemTarget.classList[0] === 'edit-btn'){ // THE SAME LOGIN APPLIES TO THE EDIT OPTION

    const editTarget = ItemTarget.previousElementSibling
    swal("New task name:", {
        content: "input",
        button:true,
        dangerMode:true
    })
    .then((edit_text) => {
            // HERE WHEN THE USER WANTS TO EDIT A TASK IT HAS TO ASSURE THAT THE INPUT IS NOT EMPTY
        if(edit_text ==='' || !edit_text.replace(/\s/g, '').length){
             swal({
                title: "Please write something on your input",
                text: "Your task cannot be empty!",
                icon: "info",
              });
            
        }
        else{// IF IT IS NOT EMPTY THEN IS ALLOWED TO EDIT
           
              editTarget.innerHTML = edit_text;
        } 
    });

}

//COMPLETED TASKS
//THE IF LINE IS TO CHECK IF WE ARE CLICK ON THE DINOLIST ITSELF INSTEAD OF THE BUTTONS
if (ItemTarget.classList[0]==="li-tasks"){
    const completedTaskClass = ItemTarget.parentElement; // HERE WE ARE GETTING ITS DIV SO WE CAN ADD THE LINE THROUGH
    
    const compled_task = completedTaskClass; // THIS VARIABLE IS IS CONTAINS THE COMPLETED TASK CLASS LIST
    
    const removeEdit = compled_task.childNodes[1]; //HERE WE ARE GETTING THE 2 CHILD NODE ELEMENT OF THE LIST WHICH IS THE EDIT BUTTON
    removeEdit.disabled = false; // HERE WE ARE SAYING THAT THE EDIT BUTTON IS ENABLED

    completedTaskClass.classList.toggle('completed-task'); // WE ARE ADDING THE COMLETED TASK WHEN WE TOGGLED
    
    
    // IN HERE WE ARE CHECKING IF WHEN THE DINOLIST IS TOGGLED CONTAINS THE COMPLETE TASK FUNCTION. IF DOES WE
    //WE POP-UP THE SWEET ALERT AND DISABLE THE EDIT BUTTON 
    if (compled_task.classList.contains('completed-task')){

        //SWEET ALERT SUCCESS
        swal({
            text: "Well done!",
            title: "DinoTask completed",
            icon: "success"
          });
          
          //ENABLING THE BUTTON
        removeEdit.disabled = true;
    }
    
}
    event.preventDefault();
}

function SaveLocalStorage(taskList){
    let Tlists;
    
    if (localStorage.getItem("Tlists") === null){
        Tlists = [];
    }
    else{
        Tlists = JSON.parse(localStorage.getItem("Tlists"));
    }

    Tlists.push(taskList);
    localStorage.setItem("Tlists", JSON.stringify(Tlists))
}

function getTasks(){
    let Tlists;
    if (localStorage.getItem("Tlists") === null){
        Tlists = [];
    }
    else{
        Tlists = JSON.parse(localStorage.getItem("Tlists"));
    }
    Tlists.forEach(function(taskList){
        const task_list_div = document.createElement('div');
    task_list_div.classList.add('tk-div');


    // CREATING THE ACTUAL LIST OF TASKS
    const li_tasks = document.createElement('li');
    li_tasks.classList.add('li-tasks');

    
    // ADDING VALUE TO THE LIST WHICH IS THE INPUT OF THE USER
    li_tasks.innerHTML = taskList;

    //APPENDING THE LIST TO THE DIV
    task_list_div.appendChild(li_tasks);

    //EDIT BUTTON OR THE ICON
    const edit_task = document.createElement('button');

    edit_task.classList.add('edit-btn');

    edit_task.innerHTML = " <i class = 'fa fa-edit'></i>";

        //APPENDING THE BUTTONS TO THE LI COLLECTION
        task_list_div.appendChild(edit_task);

    //DELETE BUTTON OR THE ICON
    const delete_task = document.createElement("button");
    
    delete_task.classList.add('delete-btn');

    delete_task.innerHTML = "<i class = 'fa fa-trash'></i>";

    //APPENDING THE BUTTONS TO THE LI COLLECTION
    task_list_div.appendChild(delete_task);    
    
    //APPENDING THE LI COLLECTION INTO THE DIV    
  
    //ADDIND TO UL COLLECTION
    task_list.appendChild(task_list_div);

    })
}

function removeLocalStorage(task){
    let Tlists;
    if (localStorage.getItem("Tlists") === null){
        Tlists = [];
    }
    else{
        Tlists = JSON.parse(localStorage.getItem("Tlists"));
    }

    const taskIndex = task.children[0].innerText;

    Tlists.splice(Tlists.indexOf(taskIndex),1);

    localStorage.setItem("Tlists", JSON.stringify(Tlists));
}

typed()
functionsLoader();
