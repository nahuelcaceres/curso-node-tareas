const { inquirerMenu, pause, inputRead, tasksListToDelete, confirm, showTasksCheckList } = require('./helpers/inquirer');
const { save, load } = require('./helpers/serializer');
const Tasks = require('./models/tasks');

console.clear();

const main = async () => {

    let option = '';
    const tasks = new Tasks(); 

    const tasksDB = load();

    if ( tasksDB ){
        tasks.loadFromArray( tasksDB );
    };

    do {

        option = await inquirerMenu();

        switch (option) {
            case '1':
                const desc = await inputRead('Descripcion:'); 
                tasks.create( desc );

                break;
            
            case '2':
                tasks.tasks();
                break;

            case '3':
                tasks.pendingTasksCompleted(true);
                break;
                
            case '4':
                tasks.pendingTasksCompleted(false);
                break;

            case '5': // completado | pendiente
                const ids = await showTasksCheckList( tasks.arrayList );
                tasks.toggleCompleted( ids );
                break;
    
            case '6': //Delete
                const id = await tasksListToDelete( tasks.arrayList );

                if ( id !== '0') {
                    const deleteTask = await confirm('Esta seguro?');
    
                    if (deleteTask) {
                        tasks.delete( id );
                    }
                }
                break;
        }

        save( tasks.arrayList );

        await pause();
    } while ( option !== '0')

}

main();