import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

class Busquedas {
    historial = ['Madrid', 'San Jose'];

    constructor() {
        //! leer DB si existe
    }

    get paramsMapBox() {
        return {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 5,
                    'language': 'es'
        }
    }

    get paramsWeather() {
        return {
                    appid: process.env.OPENWEATHER_KEY
                    
        }
    }
    async ciudad( lugar = '' ){
        //!peticion HTTP
        // console.log('ciudad: ', lugar);
        try {
            // console.log(this.paramsMapBox);
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (e) {
            return [];
        }
    } 

    async climaLugar(lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon}
            });
            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    addhistorial( lugar = ''){
        
    }
}

export default Busquedas;