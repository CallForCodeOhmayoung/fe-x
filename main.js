import axios from 'axios';

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
        html += `<li data-parse="${suggestions[i]}">${suggestions[i]['address_name']} (${suggestions[i]['place_name']})</li>`
    }

    return html;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const {coords} = await getLocation();
        console.log('coords', coords)
        const searchForm = document.getElementById('serach');
        const container = document.getElementById('map');
        const loadingContainer = document.getElementById('loading');
        const queryContainer = document.querySelector('input[name="keyword"]');

        container.style.display = 'block';
        loadingContainer.style.display = 'none';
        document.getElementById('autocomplete').style.display = 'none';

        const options = {
            center: new kakao.maps.LatLng(coords.latitude, coords.longitude),
            level: 5
        };

        const map = new kakao.maps.Map(container, options);
        const ps = new kakao.maps.services.Places();

        const displayMarker = (place) => {
            var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        };

        const placesSearchCB = (data, status, pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                map.setBounds(bounds);
            }
        }

        searchForm.addEventListener('input', e => {
            e.preventDefault();
            const query = queryContainer.value;
            if (query.length === 0) {
                setTimeout(() => {
                    document.getElementById('autocomplete').innerHTML = '';
                    document.getElementById('autocomplete').style.display = 'none';
                }, 250);
                return;
            }
            ps.keywordSearch(query, (data, status, pagination) => {
                placesSearchCB(data, status, pagination);
                document.getElementById('autocomplete').innerHTML = autocomplete(data);
                document.getElementById('autocomplete').style.display = 'block';
                console.log('data', data);
            });
        });

        kakao.maps.event.addListener(map, 'dragend', async () => {
            const center = map.getCenter();


            await axios.get('http://localhost:3000/managements/explore', {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAxMDMwNjMzMDcyIiwiaWF0IjoxNTkxNjk4ODA1LCJleHAiOjE1OTE5NTgwMDV9.lZ98ATwa-g8H5zftxHVjY7dbtBiQpVnJHvjfwwA8dGg'
                },
                params: {
                    latitude: center.getLat(),
                    longitude: center.getLng(),
                }
            })
        });

    } catch (error) {
        alert(error.message);
        return;
    }
}, false);
