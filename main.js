const getLocation = () => {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
           navigator.geolocation.getCurrentPosition(position => resolve(position), (error) => reject(error))
        })
    }
    return new Promise.reject(false);
};

const autocomplete = (suggestions) => {
    let html = '';

    for (let i = 0; i < Object.keys(suggestions).length; i++) {
        html += `<li>${suggestions[i]['address_name']} (${suggestions[i]['place_name']})</li>`
    }

    return html;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const {coords} = await getLocation();
        const searchForm = document.getElementById('serach');
        const container = document.getElementById('map');
        const loadingContainer = document.getElementById('loading');

        container.style.display = 'block';
        loadingContainer.style.display = 'none';
        document.getElementById('autocomplete').style.display = 'none';

        const options = {
            center: new kakao.maps.LatLng(coords.latitude, coords.longitude),
            level: 5
        };

        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();

        const bounds = map.getBounds();
        const swLatLng = bounds.getSouthWest();

        searchForm.addEventListener('input', e => {
            e.preventDefault();
            const query = document.querySelector('input[name="keyword"]').value;
            if (query.length === 0) {
                setTimeout(() => {
                    document.getElementById('autocomplete').innerHTML = '';
                    document.getElementById('autocomplete').style.display = 'none';
                }, 250);
                return;
            }
            ps.keywordSearch(query, (data) => {
                document.getElementById('autocomplete').innerHTML = autocomplete(data);
                document.getElementById('autocomplete').style.display = 'block';
                console.log('data', data);
            });
        });

    } catch (error) {
        alert(error.message);
        return;
    }
}, false);
