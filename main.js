import axios from 'axios';
import * as page from 'page';

const getLocation = () => {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
           navigator.geolocation.getCurrentPosition(position => resolve(position), (error) => reject(error))
        })
    }
    return new Promise.reject(false);
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const {coords} = await getLocation();
        const container = document.getElementById('map');

        const options = {
            center: new kakao.maps.LatLng(coords.latitude, coords.longitude),
            level: 5
        };

        const map = new kakao.maps.Map(container, options);
    } catch (error) {
        alert(error.message);
        return;
    }
}, false);
