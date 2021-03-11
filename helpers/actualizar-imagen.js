const Usuario = require('../models/usuario');
const fs = require('fs');

const Articulo = require('../models/articulo');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'articulos':
            const articulo = await Articulo.findById(id);
            if ( !articulo ) {
                console.log('No es un articulo por id');
                return false;
            }

            pathViejo = `./upload/artiulo/${ articulo.img }`;
            //borrarImagen( pathViejo );

            articulo.img = nombreArchivo;
            await articulo.save();
            return true;

        break;
        
        case 'usuario':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./upload/usuario/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
