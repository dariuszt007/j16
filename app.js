if(sessionStorage.getItem("logged")!=="yes"){
location.href="index.html";
}

let teachers=[];

async function loadData(){

try{

const response=
await fetch("teachers.json");

teachers=
await response.json();

renderTable();

}catch(e){

teachers=[];
renderTable();

}

}

function renderTable(){

const tbody=
document.querySelector("#teacherTable tbody");

tbody.innerHTML="";

const search=
document.getElementById("search").value.toLowerCase();

const filter=
document.getElementById("filterType").value;

teachers.forEach((teacher,index)=>{

if(
search &&
!teacher.name.toLowerCase().includes(search) &&
!teacher.lgate.toLowerCase().includes(search)
){
return;
}

if(
filter &&
teacher.type!=filter
){
return;
}

const row=document.createElement("tr");

row.className="type"+teacher.type;

row.innerHTML=`
<td>${teacher.lgate}</td>
<td>${teacher.name}</td>
<td>${teacher.type}</td>
<td>${teacher.year}</td>
<td>${teacher.class}</td>
<td>
<button onclick="editTeacher(${index})">
Edytuj
</button>

<button onclick="deleteTeacher(${index})">
Usuń
</button>
</td>
`;

tbody.appendChild(row);

});

document.getElementById("jsonOutput").value=
JSON.stringify(teachers,null,2);

}

function saveTeacher(){

const teacher={

lgate:
document.getElementById("lgate").value,

name:
document.getElementById("name").value,

type:
document.getElementById("type").value,

year:
document.getElementById("year").value,

class:
document.getElementById("className").value

};

const id=document.getElementById("id").value;

if(id===""){

teachers.push(teacher);

}else{

teachers[id]=teacher;

}

clearForm();

renderTable();

}

function editTeacher(index){

const t=teachers[index];

document.getElementById("id").value=index;
document.getElementById("lgate").value=t.lgate;
document.getElementById("name").value=t.name;
document.getElementById("type").value=t.type;
document.getElementById("year").value=t.year;
document.getElementById("className").value=t.class;

window.scrollTo(0,0);

}

function deleteTeacher(index){

if(confirm("Usunąć nauczyciela?")){

teachers.splice(index,1);

renderTable();

}

}

function clearForm(){

document.getElementById("id").value="";
document.getElementById("lgate").value="";
document.getElementById("name").value="";
document.getElementById("type").value="1";
document.getElementById("year").value="";
document.getElementById("className").value="";

}

function exportJSON(){

const blob=new Blob(
[JSON.stringify(teachers,null,2)],
{type:"application/json"}
);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="teachers.json";

a.click();

}

function copyJSON(){

navigator.clipboard.writeText(
JSON.stringify(teachers,null,2)
);

alert("JSON skopiowany");

}

loadData();
