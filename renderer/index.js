require('../mongo/mongoose.config');

const Categories = require('../mongo/categories.model');



const addNewCat = async () => {
    Categories.create({order: await getNewCatOrder(), name: document.getElementById("categoryName").value})
        .then(category => {
            console.log(category);
            displayCategories();
        })
}

const getNewCatOrder = async () => {
    var newCatOrder = 0;
    await Categories.find({})
        .sort({ order: -1 })
        .then(categories => {
            if(categories.length == 0) {
                newCatOrder = 0;
            } else {
                newCatOrder = categories[0].order + 1;
            }
        });
    return newCatOrder;
}

window.onload = () => displayCategories();

const displayCategories = async () => {
    var categoryContainer = document.getElementById("main-container");
    const categoryElements = document.getElementsByClassName("category");
    while (categoryElements.length > 0) {
        categoryElements[0].parentNode.removeChild(categoryElements[0]);
    }
    await Categories.find({})
        .sort({ order: 1 })
        .then(categories => {
            categories.forEach(category => {
                var div = document.createElement("div");
                var buttons = document.createElement("div");
                var normal = document.createElement("div");
                var span = document.createElement("h3");
                var arrowDiv = document.createElement("div");
                var delDiv = document.createElement("div");
                var upButton = document.createElement("button");
                var downButton = document.createElement("button");
                var delButton = document.createElement("button");
                var upbuttonText = document.createTextNode("+2");
                var downbuttonText = document.createTextNode("-2");
                var delButtonText = document.createTextNode("delete");
                var text = document.createTextNode(category.name);
                var content = document.createTextNode(category.content);
                var textArea = document.createElement("textArea");
                textArea.classList.add("textArea");
                normal.classList.add("normal");
                buttons.classList.add("buttons");
                textArea.appendChild(content);
                div.id = "category-" + category.order;
                div.classList.add("category");
                normal.appendChild(span);
                buttons.appendChild(arrowDiv);
                buttons.appendChild(delDiv);
                arrowDiv.appendChild(upButton);
                arrowDiv.appendChild(downButton);
                arrowDiv.classList.add("arrow-div");
                delDiv.appendChild(delButton);
                delDiv.classList.add("delete-div");
                upButton.appendChild(upbuttonText);
                downButton.appendChild(downbuttonText);
                delButton.appendChild(delButtonText);
                span.appendChild(text);
                div.appendChild(normal);
                div.appendChild(buttons);
                categoryContainer.appendChild(div);
                normal.appendChild(textArea);
                upButton.onclick = () => changeOrderUp(category.order);
                downButton.onclick = () => changeOrderDown(category.order);
                delButton.onclick = () => deleteCat(category.order);
                textArea.addEventListener("input", event => updateContent(event.target.value, category.order));
            })
        })
    
}

const updateContent = async (text, order) => {
    const editingCat = await Categories.findOne({order: order});
    editingCat.content = text;
    editingCat.save();
}



const changeOrderUp = async order => {
    if(order == 0) return;
    var newOrder = order - 1;
    const switchCat = await Categories.findOne({order: newOrder});
    const currentCat = await Categories.findOne({order: order});
    switchCat.order = order;
    currentCat.order = newOrder;
    await switchCat.save();
    await currentCat.save();
    displayCategories();
}

const changeOrderDown = async order => {
    var newOrder = order + 1;
    const switchCat = await Categories.findOne({order: newOrder});
    if(switchCat == null) return;
    const currentCat = await Categories.findOne({order: order});
    switchCat.order = order;
    currentCat.order = newOrder;
    await switchCat.save();
    await currentCat.save();
    displayCategories();
}

const deleteCat = async order => {
    await Categories.deleteOne({order: order});
    await Categories.find({})
        .then(categories => {
            var below = categories.filter(cat => cat.order > order);
            below.forEach(async category => {
                var cat = await Categories.findOne({order: category.order})
                cat.order -= 1;
                cat.save();
            })
        })
    displayCategories();
}
