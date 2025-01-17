const path = window.location.pathname;
const segments = path.split('/');
const mbti = segments[2];
const region = window.location.pathname.split('/').pop();
const url = `http://localhost:8080/api/${mbti}/${region}`;

fetch(url)
.then((response) => response.json())
.then((data) => {
console.log('Received data:', data);

if (!data.recommendation) {
  console.error('Recommendations not found in data');
  return;
}

const rawRecommendation = data.recommendation.trim();
const cleanedRecommendation = rawRecommendation.replace(/^```json\n|```$/g, '');

let parsedRecommendation;
try {
  parsedRecommendation = JSON.parse(cleanedRecommendation);
} catch (error) {
  console.error('Failed to parse recommendation JSON:', error, cleanedRecommendation);
  return;
}

const recommendations = parsedRecommendation.recommendations;
if (!recommendations) {
  console.error('Recommendations not found in parsed data');
  return;
}

// 카테고리별 데이터 처리
const categories = {
  tourist_attraction: '추천 관광지',
  restaurant_cafe: '음식/카페',
  accommodation: '숙박',
  festival: '축제'
};

// 버튼 클릭 이벤트 핸들러 정의
const handleCategoryClick = (categoryKey) => {
  const rightPane = document.querySelector('.right-pane');
  if (!rightPane) {
    console.error('Cannot find the element with class "right-pane"');
    return;
  }

  // 오른쪽 패널 초기화
  rightPane.innerHTML = '';

  // 카테고리 제목 추가
  const categoryTitle = document.createElement('h2');
  categoryTitle.textContent = categories[categoryKey];
  rightPane.appendChild(categoryTitle);

  // 버튼 활성화/비활성화 처리
  const filterButtons = filterMenu.querySelectorAll('.filter');
  filterButtons.forEach(button => {
    if (button.textContent === categories[categoryKey]) {
      button.classList.add('active'); // 클릭된 버튼에 active 클래스 추가
    } else {
      button.classList.remove('active'); // 나머지 버튼에서 active 클래스 제거
    }
  });

  // 해당 카테고리 데이터 가져오기
  const items = recommendations[categoryKey] || []; // items 변수 사용
  if (items.length === 0) {
    const noDataMessage = document.createElement('p');
    noDataMessage.textContent = '추천 데이터가 없습니다.';
    rightPane.appendChild(noDataMessage);
    return;
  }

  // 각 아이템에 대한 div 생성 및 추가
  items.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('attraction-item');

    // 아이템 이름
    const nameDiv = document.createElement('div');
    nameDiv.textContent = item.place || item.name || '데이터 없음';
    itemDiv.appendChild(nameDiv);

    // "설명" 버튼 생성
    const descriptionButton = document.createElement('button');
    descriptionButton.textContent = '설명';
    descriptionButton.classList.add('description-button');

    // "설명" 버튼 클릭 이벤트 리스너
    descriptionButton.addEventListener('click', () => {
      const descriptionContent = document.getElementById('description-content');
      if (descriptionContent) {
        descriptionContent.textContent = item.description || '설명이 없습니다.';
      }
    });

    // 버튼을 itemDiv에 추가
    itemDiv.appendChild(descriptionButton);

    // 주소 정보가 있다면 추가
    if (item.address) {
      const addressDiv = document.createElement('div');
      addressDiv.classList.add('attraction-address');

      // Font Awesome 아이콘 추가
      const addressIcon = document.createElement('i');
      addressIcon.className = 'fa-solid fa-location-dot'; // 클래스 이름
      addressDiv.appendChild(addressIcon);
  
      // 주소 텍스트 추가
      const addressText = document.createElement('span');
      addressText.textContent = "주소: "+item.address;
      addressDiv.appendChild(addressText);
  
      itemDiv.appendChild(addressDiv);
    }

    // right-pane에 추가
    rightPane.appendChild(itemDiv);
  });
};

// 버튼과 이벤트 생성
const filterMenu = document.querySelector('.filter-menu');
if (!filterMenu) {
  console.error('Cannot find the element with class "filter-menu"');
  return;
}

Object.keys(categories).forEach((key) => {
  const button = document.createElement('button');
  button.textContent = categories[key];
  button.className = 'filter';
  button.addEventListener('click', () => handleCategoryClick(key));
  filterMenu.appendChild(button);
});

// 기본적으로 관광지 데이터를 표시
handleCategoryClick('tourist_attraction');

// displaySelectedData 함수 호출 (이 위치로 이동)
displaySelectedData();


function showMap(){
  // 추천 정보 숨기기
  const rightPane = document.querySelector('.right-pane');
  if (rightPane) {
    rightPane.style.display = 'none';
  }

  // 필터 메뉴 숨기기
  const filterMenu = document.querySelector('.filter-menu');
  if (filterMenu) {
    filterMenu.style.display = 'none';
  }

  // 지도 보이기
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.style.display = 'block';
  }
  const content = document.querySelector('.content');
  if(content){
    content.style.display='none';
  }

  // 모든 탭 버튼에서 active 클래스 제거
  const tabButtons = document.querySelectorAll('.tab-menu .tab');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  // "지도" 탭에 active 클래스 추가
  const mapButton = document.querySelector('.tab-menu .tab:nth-child(2)');
  if (mapButton) {
    mapButton.classList.add('active');
  }

  // map.js의 initializeMap 함수 호출
  initializeMap();
}



// 지도에 추천 장소 표시
const locations = [];
Object.values(recommendations).forEach(categoryKey => {
  const items = recommendations[categoryKey] || [];
  items.forEach(item => {
      if (item.latitude && item.longitude) {
        locations.push({
          place: item.place,
          address: item.address,
          latitude: item.latitude,
          longitude: item.longitude
        });
      }
  });
});
if (typeof showLocations === 'function' && locations.length>0) {
  console.log("Calling showLocations with",locations);
    showLocations(locations);
  } else {
    console.error('showLocations 함수를 찾을 수 없습니다.');
  }






  displaySelectedData();

})

.catch((error) => console.error('Error fetching data:', error));

function displaySelectedData() {
// 영어 지역이름을 한글로 매핑하는 객체
const regionMapping = {
jeonju: "전주시",
iksan: "익산시",
kunsan: "군산시",
joengeup: "정읍시",
namwon: "남원시",
kimjae: "김제시",
wanju: "완주군",
jinan: "진안군",
muju: "무주군",
jangsu: "장수군",
imsil: "임실군",
sunchang: "순창군",
gochang: "고창군",
buan: "부안군",
};

// URL에서 MBTI와 지역 값 가져오기
const mbti = window.location.pathname.split('/')[2];
const region = window.location.pathname.split('/').pop();

// localStorage에서 색상 값 가져오기
const selectedColor = localStorage.getItem('selectedColor');

const mbtiDescriptions = {
"INTJ": "독립적이고 전략적임",
"INTP": "분석적이고 논리적임",
"ENTJ": "결단력있고 목표지향적임",
"ENTP": "독창적이고 재치있음",
"INFJ": "통찰력있고 이상주의적",
"INFP": "공감능력이 뛰어남",
"ENFJ": "따뜻하고 카리스마있음",
"ENFP": "창의적이고 열정적임",
"ISTJ": "신중하고 철저함",
"ISFJ": "차분하며 친근함",
"ESTJ": "효율적이고 현실적임",
"ESFJ": "타인과의 관계 중시함",
"ISTP": "호기심과 자신감이 넘침",
"ISFP": "예술적이며 개성있음",
"ESTP": "문제해결에 강함",
"ESFP": "즐거움을 중요시함"
};

// 상단 바 색상 변경
const header = document.querySelector('.header');
if (selectedColor && header) {
header.style.backgroundColor = selectedColor;
}

// 선택된 MBTI와 지역 표시
const mbtiTypeElement = document.getElementById('mbti-type');
const regionElement = document.getElementById('region-type');
const mbtiTextElement = document.querySelector('.left-pane p');
const descriptionElement = document.getElementById('descriptionArea');

mbtiTypeElement.textContent = mbti;
regionElement.textContent = regionMapping[region.toLowerCase()] || region;
mbtiTextElement.textContent = `MBTI 유형: ${mbti}`;
const description = mbtiDescriptions[mbti] || "설명이 없습니다.";
descriptionElement.innerHTML = `<h3>선택한 MBTI 설명</h3> <p>${description}</p>`;
}

function setActiveTab(activeTabName) {
const tabButtons = document.querySelectorAll('.tab-menu .tab');
tabButtons.forEach(button => {
if (button.textContent.trim() === activeTabName) {
button.classList.add('active');
} else {
button.classList.remove('active');
}
});
}

function showMap(){

// 추천 정보 숨기기
const rightPane = document.querySelector('.right-pane');
if (rightPane) {
rightPane.style.display = 'none';
}

// 필터 메뉴 숨기기
const filterMenu = document.querySelector('.filter-menu');
if (filterMenu) {
filterMenu.style.display = 'none';
}

// 지도 보이기
const mapContainer = document.getElementById('map-container');
if (mapContainer) {
mapContainer.style.display = 'block';
}
const content = document.querySelector('.content');
if(content){
content.style.display='none';
}
// 모든 탭 버튼에서 active 클래스 제거
const tabButtons = document.querySelectorAll('.tab-menu .tab');
tabButtons.forEach(button => {
button.classList.remove('active');
});

// "지도" 탭에 active 클래스 추가
const mapButton = document.querySelector('.tab-menu .tab:nth-child(2)'); // 두 번째 탭 버튼 선택
if (mapButton) {
mapButton.classList.add('active');
}

// map.js의 initializeMap 함수 호출
initializeMap();
}

function showCategory(categoryKey) {
// 지도 숨기기
const mapContainer = document.getElementById('map-container');
if (mapContainer) {
mapContainer.style.display = 'none';
}

// 추천 정보 보이기
const rightPane = document.querySelector('.right-pane');
if (rightPane) {
rightPane.style.display = 'flex';
}

// 필터 메뉴 보이기
const filterMenu = document.querySelector('.filter-menu');
if (filterMenu) {
filterMenu.style.display = 'flex';
}

const content = document.querySelector('.content');
if(content){
content.style.display='flex';
}

// 모든 탭 버튼에서 active 클래스 제거
const tabButtons = document.querySelectorAll('.tab-menu .tab');
tabButtons.forEach(button => {
button.classList.remove('active');
});

// "관광지" 탭에 active 클래스 추가
const touristAttractionButton = document.querySelector('.tab-menu .tab:first-child');
touristAttractionButton.classList.add('active');

// 지도 마커 제거 (map.js에 clearMarkers 함수가 있다고 가정)
if (typeof clearMarkers === 'function') {
clearMarkers();
}

// 해당 카테고리 정보 표시
handleCategoryClick(categoryKey);
}