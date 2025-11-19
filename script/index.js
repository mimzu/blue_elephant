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