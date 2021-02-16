const { v4: uuidv4 } = require('uuid');

class Task {

    id = '';
    description = '';
    doneAt = null;

    constructor( description ) {

        this.id = uuidv4();
        this.description = description;
        this.doneAt = null;

    }

}

module.exports = Task;