let selectedMbti = '';

const mbtiColors = {
'INTJ': '#D0A8E1', 'INTP': '#A6D8F7', 'ENTJ': '#F1C4A3', 'ENTP': '#C4E1C1',
'INFJ': '#D0D8DB', 'INFP': '#F9B6B6', 'ENFJ': '#F9E0A0', 'ENFP': '#A8D9D9',
'ISTJ': '#B8B9C3', 'ISFJ': '#A2D9D0', 'ESTJ': '#FFB59D', 'ESFJ': '#FFB0B3',
'ISTP': '#B8C7E4', 'ISFP': '#D9E5C4', 'ESTP': '#A8C8F2', 'ESFP': '#D8F4E2'
};

// MBTI 선택
function selectMbti(mbti, element) {
selectedMbti = mbti;
document.getElementById('selectedMbti').innerHTML = `MBTI: <span style="color: ${mbtiColors[mbti]}">${mbti}</span>`;

document.body.style.backgroundColor = '#ffffff';


 // 선택된 MBTI 색상 저장
    localStorage.setItem('selectedColor', mbtiColors[mbti]);




// 버튼 강조
document.querySelectorAll('.container button').forEach(btn => btn.style.border = 'none');
element.style.border = `3px solid ${mbtiColors[mbti]}`;

// 선택된 MBTI 버튼 색으로 selected-mbti 테두리 색상 변경
document.getElementById('selectedMbti').style.borderColor = mbtiColors[mbti];

// 다음 버튼 활성화 및 색상 변경
const nextButton = document.getElementById     ('nextButton');
    nextButton.disabled = false;
    nextButton.style.backgroundColor = mbtiColors[mbti];


}





// "다음" 버튼을 클릭하면 호출되는 함수
function goToNextScreen() {
    if (!selectedMbti) {
        alert('MBTI를 먼저 선택해주세요!');  // MBTI를 선택하지 않았다면 경고
        return;
    }

    // 선택된 MBTI 정보를 가지고 서버로 이동
    location.href = `/selectLocal/${selectedMbti}`;
}

// "다음" 버튼에 이벤트 리스너 추가
document.getElementById('nextButton').addEventListener('click', goToNextScreen);

