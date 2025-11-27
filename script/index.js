

/* 헤더 스크롤 시 변경  */
document.addEventListener ("scroll",function () {
    const header = document.querySelector("header");
    const mainBnr =document.querySelector(".main_bnr");
    
    const bannerHeight = mainBnr.offsetHeight;
    const scrollTop = window.scrollY;

    if (scrollTop > bannerHeight - 65) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});



/* ============================================= main ======================================== */


var mainSwiper = new Swiper('#main_swiper', { 
    loop: false,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el:'#main_swiper .swiper-pagination',
        clickable:true,
    }
});

const firstSlideVideo = document.querySelector('.swiper-slide:nth-child(1) video');

// 처음 로딩 시 재생
if (firstSlideVideo) {
    firstSlideVideo.play().catch(() => {}); // iOS/브라우저 대비
}

const firstVideo = document.querySelector('.swiper-slide:nth-child(1) video');

// 처음 로딩 시
if (firstVideo) {
    mainSwiper.autoplay.stop();       // 첫 슬라이드는 영상 끝날 때까지 자동 슬라이드 멈춤
    firstVideo.currentTime = 0;
    firstVideo.play().catch(()=>{});
    
    firstVideo.onended = () => {
        mainSwiper.slideNext();       // 영상 끝나면 다음 슬라이드
        mainSwiper.autoplay.start();  // 나머지는 4초 딜레이로 자동 진행
    };
}

// 슬라이드 변경 이벤트
mainSwiper.on('slideChange', () => {
    const idx = mainSwiper.realIndex;

    // 다시 첫 슬라이드로 돌아왔을 때
    if (idx === 0 && firstVideo.paused) {
        mainSwiper.autoplay.stop();
        firstVideo.currentTime = 0;
        firstVideo.play().catch(()=>{});
    }
});


/* ============================================= new ======================================== */

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

/* best swiper */
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

// 모든 img_background 요소 선택
const storeItems = document.querySelectorAll('.img_background');

storeItems.forEach(item => {
    const content = item.querySelector('.store_content');

  // 마우스 올리면 _hover 클래스 추가
    item.addEventListener('mouseenter', () => {
    content.classList.add('store_content_hover');
    });

  // 마우스 나가면 _hover 클래스 제거
    item.addEventListener('mouseleave', () => {
    content.classList.remove('store_content_hover');
    });
});

/* 오늘도착 클릭 시 체크박스 색칠 */
document.addEventListener("click", function (e) {
    const target = e.target.closest(".today_delivery");
    if (!target) return;

    target.classList.toggle("active");
});


/* 제한 시간 */
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

/* frame by category 섹션 */
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

/* 버튼 내용 바꾸기 */
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

/* about 섹션 */
document.addEventListener("DOMContentLoaded", () => {
    const containers = document.querySelectorAll(".about_section .container");

    // 초기 상태
    containers.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = "translateY(50px)";
    });

    function animateContainers() {
        const windowBottom = window.scrollY + window.innerHeight;

        containers.forEach((el, index) => {
            const elTop = el.getBoundingClientRect().top + window.scrollY;

            if (windowBottom > elTop + 50) {
                // 등장할 때, 시간차 추가
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: index * 0.5, // 순차적으로 등장
                    ease: "power2.out"
                });
            } else {
                gsap.to(el, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });
    }

    window.addEventListener("scroll", animateContainers);
    animateContainers(); // 로딩 시 체크
});

/* 전체 a 태그 비활성화 */
document.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function (e) {
        e.preventDefault();
    });
});



/* 셀러브리티 섹션 */
document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".celeblities_section");
    const wrapper = section.querySelector(".cel_wrapper");
    const wrapperWidth = wrapper.scrollWidth - window.innerWidth; // 화면 기준으로 이동량

    function scrollHorizontal() {
        const scrollY = window.scrollY;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight - window.innerHeight; // 100vh

        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
            const progress = (scrollY - sectionTop) / sectionHeight; // 0~1
            const x = progress * wrapperWidth;
            wrapper.style.transform = `translateX(-${x}px)`;
        } else if (scrollY < sectionTop) {
            wrapper.style.transform = "translateX(0)";
        } else if (scrollY > sectionTop + sectionHeight) {
            wrapper.style.transform = `translateX(-${wrapperWidth}px)`;
        }
    }

    window.addEventListener("scroll", scrollHorizontal);
    scrollHorizontal();
});



/* 바 광고 (오늘도착 시간) rec 섹션에서 사라지게 */
const bar = document.querySelector('.bar_bnr');
const hideSection = document.querySelector('.frame_section');

window.addEventListener('scroll', () => {
    const hidePoint = hideSection.offsetTop; // recomnd_section 시작점
    const scroll = window.scrollY;

    if(scroll + bar.offsetHeight >= hidePoint){
        bar.style.opacity = 0;
        bar.style.pointerEvents = 'none';
    } else {
        bar.style.opacity = 1;
        bar.style.pointerEvents = 'auto';
    }
});