require('../mongo/mongoose.config');
const CalendarEntries = require('../mongo/calendar-entries.model');
const Categories = require('../mongo/categories.model');



const addNewCat = async () => {
    Categories.create({order: await getNewCatOrder(), name: document.getElementById("categoryName").value})
        .then(category => {
            console.log(category);
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
            
            console.log(categories);
        });
    return newCatOrder;
}

const displayCategories = async () => {
    var categoryContainer = document.getElementById("categoryDisplay");
    categoryContainer.innerHTML = "";
    await Categories.find({})
        .sort({ order: 1 })
        .then(categories => {
            categories.forEach(category=> {
                var x = document.createElement("p");
                var t = document.createTextNode(category.name);
                x.appendChild(t);
                categoryContainer.appendChild(x);
            })
        })
    
}