import axios from 'axios';
import page from 'page';

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
        page('', () => {
            console.log('do');
        })
        const {coords} = await getLocation();
        const searchForm = document.getElementById('search');
        const container = document.getElementById('map');
        const loadingContainer = document.getElementById('loading');
        const queryContainer = document.querySelector('input[name="keyword"]');
        const infowindow = new kakao.maps.InfoWindow({zIndex: 1, removable: true});


        container.style.display = 'block';
        loadingContainer.style.display = 'none';
        document.getElementById('autocomplete').style.display = 'none';

        const options = {
            center: new kakao.maps.LatLng(coords.latitude, coords.longitude),
            level: 5
        };

        const markers = [];
        const map = new kakao.maps.Map(container, options);

        map.setMaxLevel(5);

        const ps = new kakao.maps.services.Places();

        const displayMarker = (place) => {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(
                    `<div style="padding:10px;font-size:12px;">
                        현재 상태: ${place.status} (${place.quotesPercent}%)
                    </div>
                    <div style="padding:10px;font-size:12px;">
                        현재 방문 인원: ${place.total}
                    </div>
                    `
                );
                infowindow.open(map, marker);
            });

            markers.push(marker);
        };

        const clearMarker = () => {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }

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
                clearMarker();
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

        const dragend = async () => {
            clearMarker();
            const center = map.getCenter();
            const {data} = await axios.get('https://for-ibm.hax0r.info/managements/explore', {
                params: {
                    latitude: center.getLat(),
                    longitude: center.getLng(),
                }
            });
            const points = data;

            for (let i = 0; i < points.length; i++) {
                displayMarker({
                    x: points[i].longitude,
                    y: points[i].latitude,
                    status: points[i].status,
                    quotesPercent: points[i].quotesPercent,
                    total: points[i].total
                })
            }
        }

        dragend();
        kakao.maps.event.addListener(map, 'dragend', async () => {
            dragend();
        });

    } catch (error) {
        alert(error.message);
        return;
    }
}, false);
