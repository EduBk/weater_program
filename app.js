import colors from 'colors';
import { inquireMenu, leerInput, listarLugares, pausa } from './helpers/inquirer.js';
import Busquedas from './models/busquedas.js';


const main = async() => {
    let opt = '';
    const busquedas = new Busquedas();
    

    do {
        opt = await inquireMenu();
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
                const selecId = await listarLugares(lugares);
                const lugarSelect = lugares.find(l => l.id === selecId);

                const clima = await busquedas.climaLugar(lugarSelect.lat, lugarSelect.lng);

                //! informacion final
                console.clear();
                console.log('\nInformacion de la ciudad\n'.rainbow);
                console.log('Ciudad:'.yellow, lugarSelect.nombre);
                console.log('Latitud:'.yellow, lugarSelect.lat);
                console.log('Longitud:'.yellow, lugarSelect.lng);
                console.log('Temperatura:'.yellow, clima.temp);
                console.log('Minima:'.yellow, clima.min);
                console.log('Maxima:'.yellow, clima.max);
                console.log('Como esta el clima:'.yellow, clima.desc);

                
                break;
            case 2:
                console.log('seleccion 2');
                break;
            default:
                break;
        }

        if( opt !== 0) await pausa();
    } while (opt != 0);
}

main();