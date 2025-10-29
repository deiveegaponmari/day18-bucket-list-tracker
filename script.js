let bucketList = JSON.parse(localStorage.getItem("bucketList")) || [];
let filterCategory="All";
//after click additem button this function execute
function addItem() {
  const description = document.getElementById("achieve").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("target-date").value;
  /* console.log("description",description);
     console.log("category",category);
      console.log("targetDate",date); */
  bucketList.push({ description, category, date, completed: false });
  localStorage.setItem("bucketList", JSON.stringify(bucketList));
  clearInputFields();
  updateUI();
}
function updateUI() {
  const displayList = document.getElementById("displayList");
  displayList.classList = "p-2 mt-8 border border-gray-600 bg-gray-200";
  displayList.innerHTML = "";
  let completedCount = 0;

  //const storedList = JSON.parse(localStorage.getItem("bucketList"));
  if (bucketList.length === 0) {
    displayList.innerHTML = `
        <p>No items in your Bucket List</p>`;
    return;
  }

  let filteredList=filterCategory === "All" ? bucketList:bucketList.filter((item)=>{
    return item.category===filterCategory
  })
  //display each item
  filteredList.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList = "p-3 mt-3 border border-gray-600";
    if(item.completed){
      completedCount++;
    }
    listItem.innerHTML = `
        <div>
        <p>Description:${item.description}</p>
        <p>Category:${item.category}</p>
        <p>Target-Date:${item.date}</p>
         <button onclick="editItem(${index})" class="bg-green-400 rounded text-white p-1">Edit</button>
         <button onclick="toggleItem(${index})" class="rounded p-1 ${
      item.completed ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
    }">${item.completed ? "Achieve" : "Pending"}</button>
        <button onclick="deleteItem(${index})" class="bg-red-400 rounded text-white p-1">Delete</button>
        </div>`;
    displayList.append(listItem);
  });
  const progressPercentage = (completedCount / bucketList.length) * 100;
  document.getElementById("progress").style.width = progressPercentage + "%";
  document.getElementById("complete-count").innerText = completedCount;
  document.getElementById("total-count").innerText = bucketList.length;
}

function toggleItem(indexval) {
  bucketList[indexval].completed = !bucketList[indexval].completed;
  localStorage.setItem("bucketList", JSON.stringify(bucketList));
  updateUI();
}
function deleteItem(indexvalue) {
  console.log("deleteitem", indexvalue);
  bucketList.splice(indexvalue, 1);
  localStorage.setItem("bucketList", JSON.stringify(bucketList));
  //refresh ui
  updateUI();
}
function clearInputFields() {
  document.getElementById("achieve").value = "";
  document.getElementById("category").value = "";
  document.getElementById("target-date").value = "";
}
function filterItems(category){
  filterCategory=category;
  updateUI();
}
updateUI();
