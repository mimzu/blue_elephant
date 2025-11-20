var mainSwiper = new Swiper('#main_swiper', { 
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
    el:'#main_swiper .swiper-pagination',
    }
})
var newSwiper = new Swiper('.new_swiper', { 
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
    el:'.new_swiper .swiper-pagination',
    }
})

var bestSwiper = new Swiper ('#best_swiper', {
    loop:false,
    slidesPerView: 3,
    breakpoints: {
        640: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4.8,
        },
        freeMode: true, 
    },
    scrollbar : {
        el:'.swiper-scrollbar',
        draggable:true,
    }
})
document.querySelectorAll('.new_swiper img').forEach(img => {
    const original = img.src;
    const hover = original.replace('.png', '_hover.png'); // 파일 규칙이 있다면

    img.addEventListener('mouseenter', () => img.src = hover);
    img.addEventListener('mouseleave', () => img.src = original);
});

/* 오늘도착 클릭 시 체크박스 색칠 */
document.addEventListener("click", function (e) {
    const target = e.target.closest(".today_delivery");
    if (!target) return;

    target.classList.toggle("active");
});



function startCountdown() {
    const countdown = document.getElementById("countdown");
    const parentP = countdown.parentElement;

    // 초기 시간 설정 (시:분:초)
    let timeParts = countdown.textContent.split(':');
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);
    let seconds = parseInt(timeParts[2]);

    const timer = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer); // 0 되면 멈춤
                    parentP.textContent = "** 새벽 도착 주문 마감! **";
                    parentP.style.color = "red";
                    return;
                }
            }
        }

        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds <= 59) {
            countdown.style.color ='red';
        }

        // 숫자 두 자리로 포맷
        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');

        countdown.textContent = `${h}:${m}:${s}`;
    }, 1000);
}

// 페이지 로드 시 시작
window.addEventListener('DOMContentLoaded', startCountdown);


document.addEventListener("click", function(e) {
    const clickedLi = e.target.closest(".frame_select li");
    if (clickedLi) {
        const parentUl = clickedLi.closest("ul");

        // 같은 줄의 모든 li click 제거
        parentUl.querySelectorAll("li").forEach(li => li.classList.remove("click"));

        // 선택한 li만 click 추가
        clickedLi.classList.add("click");
    }
});

document.addEventListener("click", function(e) {
    const clickedLi = e.target.closest(".frame_select li");
    if (clickedLi) {
        const parentUl = clickedLi.closest("ul");

        // 같은 줄의 모든 li click 제거
        parentUl.querySelectorAll("li").forEach(li => li.classList.remove("click"));

        // 선택한 li만 click 추가
        clickedLi.classList.add("click");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const resultBtn = document.querySelector(".result_btn");
    const imgBox = document.querySelector(".frame_img_box");
    const resultBox = document.querySelector(".frame_img_result");

    const defaultText = "See your frames";
    const resetText = "Choose again";

    let showingResult = false;

    resultBtn.addEventListener("click", () => {

        // ✨ li 선택 여부 확인
        const anySelected = document.querySelector(".frame_select li.click");
        if (!anySelected && !showingResult) {
            alert("옵션을 선택하세요.");
            return; // 실행 중단
        }

        if (!showingResult) {
            // 결과 보여주는 모드
            imgBox.style.display = "none";
            resultBox.style.display = "block";

            resultBtn.textContent = resetText;
            showingResult = true;
        } else {
            // 리셋 모드
            imgBox.style.display = "block";
            resultBox.style.display = "none";

            // 선택 초기화
            document.querySelectorAll(".frame_select li").forEach(li => {
                li.classList.remove("click");
            });

            resultBtn.textContent = defaultText;
            showingResult = false;
        }
    });
});

document.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

/* document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".celeblities_section");
    const sectionWidth = section.scrollWidth; // 가로 전체 길이
    const windowHeight = window.innerHeight;

    // 스크롤 이벤트를 가로 이동으로 변환
    window.addEventListener("scroll", (e) => {
        // 현재 세로 스크롤 위치
        const scrollY = window.scrollY;

        // 화면 높이만큼 스크롤을 가로 이동으로 계산
        const translateX = Math.min(scrollY, sectionWidth - window.innerWidth);
        section.style.transform = `translateX(${-translateX}px)`;

        // 스크롤이 가로 끝에 다다르면 더 이상 아래로 안 내려가게
        if (scrollY > sectionWidth - window.innerWidth) {
            window.scrollTo(0, sectionWidth - window.innerWidth);
        }
    });
}); */