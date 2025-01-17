//버튼 클릭 이벤트 처리
const fetchButton=document.getElementById("fetchButton");
fetchButton.addEventListener("click",function(){
    //버튼 스타일 변경
    this.classList.toggle("clicked");




})



function goToSuggestion(region){

        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => button.classList.remove('clicked'));
        const selectedButton = Array.from(buttons).find(button => button.getAttribute('onclick').includes(region));
        selectedButton.classList.add('clicked');




        // 선택한 지역을 확인하고 다음 페이지로 이동
        const mbti=window.location.pathname.split('/').pop();
       // 선택한 값으로 API 경로 구성
        const url = `/api/${mbti}/${region}`;
        

        document
        .getElementById("fetchButton")
        .addEventListener("click", () => {
            const loadingElement = document.getElementById("loading");
            const ipElement = document.getElementById("ipAddress");

            // 로딩 화면 표시
            loadingElement.style.display = "block";
            ipElement.textContent = "";

            fetch(url)
            .then((response) => response.json()) // 즉시 JSON 응답 반환
            .then(data => {
                // API 호출이 성공적으로 끝난 후, 추천 페이지로 리디렉션

                /*console.log(data); // API 응답 데이터 확인*/

                window.location.href = `/suggestion/${mbti}/${region}`; // 결과 페이지로 이동
            })
            .catch(error => {
                // 에러 처리
                console.error('Error:', error);
                alert('추천을 불러오는 데 문제가 발생했습니다. 다시 시도해주세요.');
            })
            .finally(() => {
                // 데이터가 다 불러와지면 로딩 화면 숨기기
                loadingElement.style.display = "none";
            });


////
        










    })};


    






