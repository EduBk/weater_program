import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que deseas hacer?'.rainbow,
        choices: [
            {
                value: 1,
                name: `${'1-'.yellow} Buscar Ciudad`,
            },
            {
                value: 2,
                name: `${'2-'.yellow} Historial`,
            },
            {
                value: 0,
                name: `${'0-'.yellow} Salir`
            }
        ]
    }
];

const inquireMenu = async () => {
        console.clear();
        console.log('===================================='.yellow);
        console.log('        Seleccione Opcion'.rainbow);
        console.log('====================================\n'.yellow);

        const {opcion} = await inquirer.prompt(preguntas);

        return opcion;
}

const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: 'Presione ENTER para continuar',
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async ( message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0 ){
                    return 'Por favor ingresa un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async (lugares = []) => {
    const choices = lugares.map( (lugar, i) => {
        const idx = i+1;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciona el Lugar: ',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async (message) => {
    const question = [
            {
                type: 'confirm',
                name: 'ok',
                message,
            }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showListCheckDone = async (tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = i+1;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciona',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);

    return ids;
}

export { inquireMenu, pausa, leerInput, listarLugares, confirmar, showListCheckDone }