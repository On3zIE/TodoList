require('../mongo/mongoose.config');
const CalendarEntries = require('../mongo/calendar-entries.model');
const Categories = require('../mongo/categories.model');
const Tasks = require('../mongo/tasks.model');

const addNewCat = async () => {
    
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