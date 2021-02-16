const fs = require('fs');
const file = './db/data.json';

const save = ( data ) => {

    fs.writeFileSync(file, JSON.stringify( data ) );
};

const load = () => {

    if ( !fs.existsSync( file )) {
        return null;
    };

    let data = fs.readFileSync( file, { encoding: 'utf-8' });
    data = JSON.parse( data );

    return data;
};

module.exports = {
    save,
    load
};