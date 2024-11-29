
let arraySubjectToMethod = [1,2,3,4,5];



// Clickable tabs top of left column

function openCollectionType(event, collectionType) {
    var i, tabcontent, tablinks;


    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    event.currentTarget.className += " active";

    populateList(["fiets","auto","koets"]);
}







function populateList() {

    totalList = document.getElementById("ListMethodsProperties"); 

    allListItems = getAllPropertyAndMethodNames([]);

    console.log(allListItems);


    for (element of allListItems) {
        let listItem = document.createElement('li');
        listItem.classList.add("clickableListItem");
        listItem.addEventListener('click', clickListItem);
        listItem.appendChild(document.createTextNode(element));
        totalList.appendChild(listItem);
        }
}

function clickListItem(event, ietsAnders ) {

    listItems = document.getElementsByClassName("clickableListItem");

    for (i = 0; i < listItems.length; i++) {
        listItems[i].className = listItems[i].className.replace(" active", "");
    }

    event.currentTarget.className += " active";

    let methodName = event.currentTarget.textContent;

    writeFormula(methodName);



}

function writeFormula(method, arrayStart=arraySubjectToMethod) {

    document.getElementById("inputOutcome").querySelector("h2").textContent = method;

    




}