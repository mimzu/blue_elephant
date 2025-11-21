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

    /* =========================================================스크롤 트리거 ============================================== */



document.addEventListner ("DOMContentLoaded",(event)=>{
    gsap.registerPlugin(SplitText, ScrollTrigger);

    console.clear();

    gsap.set(".split", { opacity: 1 });



    document.fonts.ready.then(() => {
        let containers = gsap.utils.toArray(".container");

        containers.forEach((container) => {
            let text = container.querySelector(".split");
            let animation;

            SplitText.create(text, {
                type: "words,lines",
                mask: "lines",
                linesClass: "line",
                autoSplit: true,
                onSplit: (instance) => {
                    console.log("split")
                    return gsap.from(instance.lines, {
                        yPercent: 120,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: container,
                            markers: true,
                            scrub: true,
                            start: "clamp(top center)",
                            end: "clamp(bottom center)"
                        }
                    });
                }
            });
        });
    });
})


    /* =========================================================스크롤 트리거 ============================================== */
