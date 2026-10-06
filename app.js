if(sessionStorage.getItem("logged")!=="true"){
location.href="index.html";
}

let teachers=[];

async function loadTeachers(){

try{

const response=
await fetch("teachers.json");

teachers=
await response.json();

renderTable();

}catch(error){

console.error(error);

alert("Nie można odczytać teachers.json");

}

}

function renderTable(){

const tbody=
document.getElementById("tableBody");

tbody.innerHTML="";

let data=[...teachers];

const filter=
document.getElementById("filterType").value;

const search=
document.getElementById("search").value.toLowerCase();

const sort=
document.getElementById("sortBy").value;

if(filter){

data=data.filter(
t=>t.type===filter
);

}

if(search){

data=data.filter(t=>

t.name.toLowerCase().includes(search)
||
t.lgate.toLowerCase().includes(search)

);

}

switch(sort){

case "nameAsc":
data.sort((a,b)=>
a.name.localeCompare(b.name,"ja")
);
break;

case "nameDesc":
data.sort((a,b)=>
b.name.localeCompare(a.name,"ja")
);
break;

case "typeAsc":
data.sort((a,b)=>
Number(a.type)-Number(b.type)
);
break;

case "typeDesc":
data.sort((a,b)=>
Number(b.type)-Number(a.type)
);
break;

}

data.forEach((t,index)=>{

const tr=document.createElement("tr");

tr.className="type"+t.type;

tr.innerHTML=`

<td>${escapeHtml(t.lgate)}</td>
<td>${escapeHtml(t.name)}</td>
<td>${escapeHtml(t.type)}</td>
<td>${escapeHtml(t.year)}</td>
<td>${escapeHtml(t.class)}</td>

<td>

<button onclick="editTeacher(${teachers.indexOf(t)})">
Edytuj
</button>

<button onclick="deleteTeacher(${teachers.indexOf(t)})">
Usuń
</button>

</td>

`;

tbody.appendChild(tr);

});

updateStats();

document.getElementById("jsonOutput").value=
JSON.stringify(teachers,null,2);

}

function saveTeacher(){

const teacher={

lgate:
document.getElementById("lgate").value.trim(),

name:
document.getElementById("name").value.trim(),

type:
document.getElementById("type").value,

year:
document.getElementById("year").value.trim(),

class:
document.getElementById("className").value.trim()

};

const id=
document.getElementById("editId").value;

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

document.getElementById("editId").value=index;
document.getElementById("lgate").value=t.lgate;
document.getElementById("name").value=t.name;
document.getElementById("type").value=t.type;
document.getElementById("year").value=t.year;
document.getElementById("className").value=t.class;

}

function deleteTeacher(index){

if(confirm("Usunąć nauczyciela?")){

teachers.splice(index,1);

renderTable();

}

}

function clearForm(){

document.getElementById("editId").value="";
document.getElementById("lgate").value="";
document.getElementById("name").value="";
document.getElementById("type").value="1";
document.getElementById("year").value="";
document.getElementById("className").value="";

}

function updateStats(){

document.getElementById("countAll").textContent=
teachers.length;

document.getElementById("count1").textContent=
teachers.filter(t=>t.type==="1").length;

document.getElementById("count2").textContent=
teachers.filter(t=>t.type==="2").length;

document.getElementById("count3").textContent=
teachers.filter(t=>t.type==="3").length;

}

function exportJSON(){

const blob=new Blob(

[JSON.stringify(teachers,null,2)],

{
type:"application/json"
}

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

function escapeHtml(text){

const div=document.createElement("div");

div.textContent=text;

return div.innerHTML;

}

function logout(){

sessionStorage.removeItem("logged");

location.href="index.html";

}

loadTeachers();
