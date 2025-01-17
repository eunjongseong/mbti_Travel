// 지도 객체
let map;

// 단일 Infowindow 객체
let infowindow = new kakao.maps.InfoWindow();

// 마커들을 저장할 배열
let markers = [];

function initializeMap() {
  console.log("initializeMap called"); // 함수 호출 로그
  var container = document.getElementById('map-container');
  console.log("Map container:", container);

  // container가 null인 경우 함수 실행 중단
  if (!container) {
    console.error('Map container not found');
    return; // 함수 실행 중단
  }
  container.style.width = '100%';
  container.style.height = '500px';

  var options = {
    center: new kakao.maps.LatLng(35.7175, 127.153),
    level: 3
  };

    map = new kakao.maps.Map(container, options);
  if (!map || !map.setCenter) {
    console.error('Map object is not properly initialized:', map);
    return;
  }

  console.log("Map initialized:", map); // 지도 객체 로깅
}

// 기존 마커 제거 함수
function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function showLocation(latitude, longitude, placeName, address) {
  console.log("Showing location:", latitude, longitude, placeName);

  // 위도와 경도 유효성 검사
  if (!latitude || !longitude || typeof latitude !== 'number' || typeof longitude !== 'number') {
    console.error('유효하지 않은 위도 또는 경도:', latitude, longitude);
    return;
  }
    console.log(latitude, longitude)
  var position = new kakao.maps.LatLng(latitude, longitude);

  // 지도 중심 이동 및 마커 설정
  map.setCenter(position);

  if (marker) {
    marker.setMap(null);
  }
  marker = new kakao.maps.Marker({
    position: position,
    map: map
  });
  markers.push(marker); // 마커를 배열에 추가

  // 정보 창 내용 설정
  var infowindowContent = `<div><b>${placeName}</b><br>위도: ${latitude}<br>경도: ${longitude}`;
  if (address) {
    infowindowContent += `<br>주소: ${address}`;
  }
  infowindowContent += `</div>`;

  // 기존 인포윈도우 닫기 및 새 인포윈도우 설정
  infowindow.close();
  infowindow.setContent(infowindowContent);

  // 마커에 클릭 리스너 추가
  kakao.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

function showLocations(locations) {
  console.log("Showing locations on map:", locations);
  if (!map) {
    console.error('지도가 초기화되지 않았습니다.');
    return;
  }
  if (locations.length === 0) {
    console.log('추천 장소가 없습니다');
    return;
  }

  // 기존 마커 제거
  clearMarkers();

  // locations 배열에 있는 모든 위치에 대해 마커를 추가합니다.
  locations.forEach(location => {
    console.log("Calling showLocation with:", location);
    showLocation(location.latitude, location.longitude, location.place, location.address);
  });
}

// 함수 내보내기
window.initializeMap = initializeMap;
window.showLocations = showLocations;






