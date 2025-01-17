
  const path=window.location.pathname;
  const segments=path.split('/');
  const mbti=segments[2];

  const region=window.location.pathname.split('/').pop();

  const url=`http://localhost:8080/api/${mbti}/${region}`


  fetch(url)
  .then((response) => response.json()) // JSON 형식으로 변환
  .then((data) => {
  // 서버에서 받아온 데이터를 화면에 추가

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
  console.error('Failed to parse recommendation JSON:', error,cleanedRecommendation);
  return;
  }

  const recommendations = parsedRecommendation.recommendations;
  if (!recommendations) {
  console.error('Recommendations not found in parsed data');
  return;
  }
  


  if (!recommendations || !recommendations.tourist_attraction || recommendations.tourist_attraction.length === 0) {
  console.error('Missing or empty tourist_attraction in data:', recommendations);
  return;
  }

  

  const touristAttractions = recommendations.tourist_attraction;

// 먼저 .right-pane 요소를 가져옵니다.
const rightPane = document.querySelector('.right-pane');

// .right-pane 요소가 존재하는지 확인합니다.
if (!rightPane) {
  console.error('Cannot find the element with class "right-pane"');
  return;
}

// 관광지 데이터를 반복 처리하여 .right-pane에 추가합니다.
touristAttractions.forEach((attraction) => {
  // 새 button 요소 생성
  const itemDiv = document.createElement('div');
  
  // 관광지 이름 설정
  itemDiv.textContent = attraction.place;

  // 스타일을 적용하려면 클래스 추가 (선택 사항)
  itemDiv.classList.add('attraction-item');

  const nameDiv = document.createElement('div');
  nameDiv.textContent = attraction.place;
  

  // "설명" 버튼 생성
  const descriptionButton = document.createElement('button');
  descriptionButton.textContent = '설명';
  descriptionButton.classList.add('description-button'); // CSS 스타일 적용을 위한 클래스 추가

  // "설명" 버튼 클릭 이벤트 리스너
  descriptionButton.addEventListener('click', () => {
    // 버튼 클릭 시 수행할 동작 (예: alert 창으로 설명 보여주기)
    alert(attraction.description || '설명이 없습니다.');
  });

  // 버튼을 itemDiv에 추가
  itemDiv.appendChild(descriptionButton);






  // .right-pane에 추가
  rightPane.appendChild(itemDiv);
})});



// // URL 경로에서 MBTI와 지역 정보를 추출
// const path = window.location.pathname;
// const segments = path.split('/');
// const mbti = segments[2];
// const region = segments.pop(); // URL의 마지막 부분 추출

// // API URL 생성
// const url = `http://localhost:8080/api/${mbti}/${region}`;

// // API 데이터 가져오기
// fetch(url)
//   .then((response) => response.json()) // JSON 형식으로 변환
//   .then((data) => {
//     console.log('Received data:', data);

//     if (!data.recommendation) {
//       console.error('Recommendations not found in data');
//       return;
//     }

//     // recommendation 데이터 정리
//     const rawRecommendation = data.recommendation.trim();
//     const cleanedRecommendation = rawRecommendation.replace(/^```json\n|```$/g, '');

//     let parsedRecommendation;
//     try {
//       parsedRecommendation = JSON.parse(cleanedRecommendation);
//     } catch (error) {
//       console.error('Failed to parse recommendation JSON:', error, cleanedRecommendation);
//       return;
//     }

//     const recommendations = parsedRecommendation.recommendations;
//     if (!recommendations) {
//       console.error('Recommendations not found in parsed data');
//       return;
//     }

//     // 모든 카테고리에 대해 데이터 처리
//     const categories = {
//       tourist_attraction: '추천관광지',
//       restaurant_cafe: '음식/카페',
//       accommodation: '숙박',
//       festival: '축제'
//     };

//     // 버튼 클릭 이벤트 핸들러 정의
//     const handleCategoryClick = (categoryKey) => {
//       const rightPane = document.querySelector('.right-pane');
//       if (!rightPane) {
//         console.error('Cannot find the element with class "right-pane"');
//         return;
//       }

//       // 오른쪽 패널 초기화
//       rightPane.innerHTML = `<h2>${categories[categoryKey]}</h2>`;

//       // 해당 카테고리 데이터 가져오기
//       const items = recommendations[categoryKey] || [];
//       if (items.length === 0) {
//         rightPane.innerHTML += '<p>추천 데이터가 없습니다.</p>';
//         return;
//       }

//       // 데이터 추가
//       items.forEach((item) => {
//         const itemDiv = document.createElement('div');
//         itemDiv.textContent = item.place || item.name || '데이터 없음'; // 데이터 속성에 맞게 출력
//         itemDiv.classList.add('item'); // 스타일 클래스 추가
//         rightPane.appendChild(itemDiv);
//       });
//     };

//     // 버튼과 이벤트 생성
//     const filterMenu = document.querySelector('.filter-menu');
//     if (!filterMenu) {
//       console.error('Cannot find the element with class "filter-menu"');
//       return;
//     }

//     Object.keys(categories).forEach((key) => {
//       const button = document.createElement('button');
//       button.textContent = categories[key];
//       button.className = 'filter';
//       button.addEventListener('click', () => handleCategoryClick(key));
//       filterMenu.appendChild(button);
//     });

//     // 기본적으로 관광지 데이터를 표시
//     handleCategoryClick('tourist_attraction');
//   })
//   .catch((error) => console.error('Error fetching data:', error));












//   console.log('Tourist Attractions:', recommendations.tourist_attraction);
//   console.log('restaurant_cafe',recommendations.restaurant_cafe);
//   console.log('accommodation',
//   recommendations.accommodation);
//   console.log('festival',
//   recommendations.festival);
//   })

//   .catch((error) => console.error('Error fetching data:', error));












  function displaySelectedData() {
    //영어 지역이름을 한글로 매핑하는 객체
    const regionMapping={
        jeonju:"전주시",
        iksan:"익산시",
        kunsan:"군산시",
        joengeup:"정읍시",
        namwon:"남원시",
        kimjae:"김제시",
        wanju:"완주군",
        jinan:"진안군",
        muju:"무주군",
        jangsu:"장수군",
        imsil:"임실군",
        sunchang:"순창군",
        gochang:"고창군",
        buan:"부안군",
    };

    const koreanRegion=regionMapping[region.toLowerCase()]||region;



  window.addEventListener('DOMContentLoaded', () => {
  // URL에서 MBTI와 지역 값 가져오기


  console.log(mbti);  // mbti 값 확인
  console.log(region);  // region 값 확인

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
  if (selectedColor && header){
  header.style.backgroundColor = selectedColor;
  }

  // 선택된 MBTI와 지역 표시
  const mbtiTypeElement = document.getElementById('mbti-type');
  const regionElement = document.getElementById('region-type');

  if (mbti) {
  mbtiTypeElement.textContent = mbti;  // MBTI 값 표시
  }

  if (region) {
  regionElement.textContent = koreanRegion;  // 지역 값 표시
  }

  // MBTI 설명 업데이트
  const mbtiTextElement = document.querySelector('.left-pane p');
  if (mbti && mbtiTextElement) {
  mbtiTextElement.textContent = `MBTI 유형: ${mbti}`;  // 선택한 MBTI로 업데이트
  }

  const descriptionElement = document.getElementById('descriptionArea');
  if (mbti && descriptionElement) {
  // 설명을 MBTI에 맞게 업데이트
  const description = mbtiDescriptions[mbti] || "설명이 없습니다."; // 설명이 없으면 기본값 표시
  descriptionElement.innerHTML = `
    <h3>선택한 MBTI 설명</h3>
    <p>${description}</p>
  `;
  }
  });

  }
  displaySelectedData();








