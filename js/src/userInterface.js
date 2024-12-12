
function getAllPropertyAndMethodNames(dataType) { // returns array containing all methods/properties belonging to dataType, one level deep.

    let PropertyAndMethodNames = [];
    let counter = 0;

    while (counter<2) {
        Object.getOwnPropertyNames(dataType).forEach(function (prop) {
            if (PropertyAndMethodNames.indexOf(prop) === -1) {
                PropertyAndMethodNames.push(prop);
            }
        })
        counter++;
        dataType = Object.getPrototypeOf(dataType);
    };
    
    return (PropertyAndMethodNames.sort());
}


function populateTabs() {   // Called once. Creates tabs based on Formula class files included in index.html. Calls populateList function.

    let tabTexts = []; 
    let item;
    let tab;

    let scriptTags = document.getElementsByTagName('script');

    for (item of scriptTags) {
        let className = item.src.match(/Formula(\w)+/);      
        if (className != null) tabTexts.push(className[0].replace("Formula",""));
    }

    let buttonContainer = document.getElementById("divInColumnLeft-row1"); 

    let count = 0;
    for (tab of tabTexts) {

        let tabButton = document.createElement('button');
        tabButton.classList.add("tabLinks");
        count==0 ? tabButton.classList += (" active") : 1;
        count++;
        tabButton.addEventListener('click', clickTab);
        tabButton.appendChild(document.createTextNode(tab));
        buttonContainer.appendChild(tabButton);
    }

    populateList(tabTexts[0]);
}

function populateList(dataType = []) {  // called at start and when tab buttons (Array, Map, String etc) are clicked

    let totalList = document.getElementById("divInColumnLeft-row3"); 

    let allListItems = getAllPropertyAndMethodNames(dataType);

    while(totalList.firstChild){
        totalList.removeChild( totalList.firstChild );
    }

    let element;
    for (element of allListItems) {
        let listItem = document.createElement('div');
        listItem.classList.add("clickableListItem");
        listItem.addEventListener('click', clickListItem);
        listItem.appendChild(document.createTextNode(element));
        totalList.appendChild(listItem);
        }
}

function clickTab(event) { // when clicking one of the tabs. Calls 'populateList()' with the tab textContent as argument

    let tabItems = document.getElementsByClassName("tabLinks");

    let tab;
    for (tab of tabItems) {
        tab.className = tab.className.replace(" active", "");
    }

    event.currentTarget.className += " active";

    let dataType = document.getElementsByClassName("tabLinks active")[0].textContent;

    switch(dataType) {
        case 'Array':
            populateList([]);
            break;
        case 'Map':
            populateList(new Map());
            break;
        case 'String':
            populateList("");
            break;
        case 'Object':
            populateList({});
            break;
    }
}

function clickListItem(event) { // called when clicking one of the methods/properties. Creates Formula.. instance where stuff is handled.

    let listItems = document.getElementsByClassName("clickableListItem");

    for (item of listItems) (item.className = item.className.replace(" active", ""));

    event.currentTarget.className += " active";

    let dataType = document.getElementsByClassName("tabLinks active")[0].textContent;

    let method = event.currentTarget.textContent;

    if (dataType === 'Array') {
        let formulaObject = new FormulaArray(method);
        formulaObject.runAll();
    } else {

        document.getElementById("formulaField").innerHTML = "method not yet included";

    }

}

