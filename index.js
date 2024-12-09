populateList(); //initiating the left column with array function

function openCollectionType(event) {
    var i, tabcontent, tablinks;


    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    event.currentTarget.className += " active";

    populateList();

}

function populateList() {  // this function is called by 'openCollectionType' when tab buttons (Array, Map, Object) are clicked

    //totalList = document.getElementById("ListMethodsProperties"); 
    totalList = document.getElementById("divInColumnLeft-row3"); 

    allListItems = getAllPropertyAndMethodNames([]);

    while( totalList.firstChild ){
        totalList.removeChild( totalList.firstChild );
      }



    for (element of allListItems) {
        let listItem = document.createElement('div');
        listItem.classList.add("clickableListItem");
        listItem.addEventListener('click', clickListItem);
        listItem.appendChild(document.createTextNode(element));
        totalList.appendChild(listItem);
        }
}

// this function is called from the html elementswhen list items (at, concat, pop etc) are clicked
// A class instance 'Formula' is created, this class has several methods that do the job of publishing formula+results 

function clickListItem(event) {

    listItems = document.getElementsByClassName("clickableListItem");

    for (i = 0; i < listItems.length; i++) {
        listItems[i].className = listItems[i].className.replace(" active", "");
      }

    event.currentTarget.className += " active";

    let dataType = document.getElementsByClassName("tablinks active")[0].textContent;

    let method = event.currentTarget.textContent;


    if (dataType === 'Array') {

      let formulaObject = new FormulaArray(method);
      formulaObject.runAll();
      }

}



    



