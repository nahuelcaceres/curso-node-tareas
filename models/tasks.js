const Task = require("./task");

class Tasks {
    _list = {};

    get arrayList(){
        const result = [];

        //Sacando todas las keys del objeto _list como un array de strings
        //luego recorremos el array para armar otro como result.
        Object.keys(this._list).forEach( (key) => {
            const task = this._list[key];
            result.push( task );
        });

        return result;
    };
    
    constructor() {
        this._list = {};
        
    };


    create( description = '' ) {
       const task = new Task( description ); 

       //Se esta definiendo la propiedad = guid y a eso se le setea el objeto task
       this._list[task.id] = task;
    }

    delete( id = '') {
        if ( this._list[id]) {
            delete this._list[id];
        }
    }

    loadFromArray( tasks = [] ) {

        tasks.forEach(( taskSerialized ) => {
            this._list[taskSerialized.id] = taskSerialized;
        });

    };

    tasks(){

        this.arrayList.forEach( (task, index ) => {
            const taskNumber = `${index + 1}`.green;
            const { description, doneAt } = task;
            const status =  (doneAt) ? 'Completado'.green
                                     : 'Pendiente'.red;

            console.log(`${ taskNumber } ${ description } :: ${ status }`);
            
        })

    };

    pendingTasksCompleted( completed = true ) {

        console.log();

        let counter = 0;

        this.arrayList.forEach((task) => {
            const { description, doneAt } = task;
            const status =  (doneAt) ? 'Completado'.green
                                     : 'Pendiente'.red;

            if (completed){
                if (doneAt) {
                    counter ++;
                    console.log(`${ (counter + '.').green } ${ description } :: ${ doneAt }`);
                };
            } else {
                if (!doneAt){
                    counter++;
                    console.log(`${ (counter + '.').green } ${ description } :: ${ status }`);
                };
            };
        })
    };

    toggleCompleted( ids = []) {

        ids.forEach( (id ) => {
            const task = this._list[id];

            if ( !task.doneAt){
                task.doneAt = new Date().toISOString();
            }
        });

        this.arrayList.forEach( (task) => {
            if ( !ids.includes( task.id )){
                this._list[task.id].doneAt = null;
            }
        });

    };
}

module.exports = Tasks;