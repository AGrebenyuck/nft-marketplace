$(function(){

  $('.collection__author-link').click(function() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('.collection__author-link').text()).select();
    document.execCommand("copy");
    $temp.remove();

    alert('Скопировано');
	});

  $('.footer__item-title').on('click', function(){
    $(this).next('.footer__list').slideToggle();
  })

  $('.menu__btn').on('click', function(){
    $('.menu__list').toggleClass('menu__list--active');
  })

  $('.about__tab').on('click', function(e){
    e.preventDefault();
    let id = $(this).attr('href');
    
    $('.about__tab').removeClass('about__tab--active');
    $(this).addClass('about__tab--active');

    $('.about__item').removeClass('about__item--active');
    $(id).addClass('about__item--active');
  })

  $('.about__spoilers-top').on('click', function(){
    $(this).toggleClass('about__spoilers-top--active').next().slideToggle();
  })

  $('.popular__filters-filter--ordering').on('click', function(e){
    e.preventDefault();
    if($(this).text() == 'Newest'){
      $(this).text('Oldest');
    }else{
      $(this).text('Newest');
    }
  });

  var guide = new Swiper('.guide__swiper', {
    // direction: 'vertical',
    // autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });

  var explore = new Swiper('.explore__swiper', {
    
    breakpoints: {
      320:{
        navigation: {
          nextEl: '.explore__next',
          prevEl: '.explore__prev',
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
      650:{
        navigation: {
          nextEl: '.explore__next',
          prevEl: '.explore__prev',
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      950:{
        navigation: {
          nextEl: '.explore__next',
          prevEl: '.explore__prev',
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 40,
      },
      1100:{
        navigation: {
          nextEl: '.explore__next',
          prevEl: '.explore__prev',
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 60,
      },
      1200:{
        navigation: {
          nextEl: '.explore__next',
          prevEl: '.explore__prev',
        },
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
      },
    }
  });

  var bestSeller = new Swiper('.best-seller__swiper', {
    breakpoints: {
      320:{
        navigation: {
          nextEl: '.best-seller__slider-next',
          prevEl: '.best-seller__slider-prev',
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
      },
      550:{
        navigation: {
          nextEl: '.best-seller__slider-next',
          prevEl: '.best-seller__slider-prev',
        },
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
      },
      768:{
        navigation: {
          nextEl: '.best-seller__slider-next',
          prevEl: '.best-seller__slider-prev',
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30,
      },
      950:{
        navigation: {
          nextEl: '.best-seller__slider-next',
          prevEl: '.best-seller__slider-prev',
        },
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
      },
    }
  });
  
  $('.dropdown').click(function () {
      $(this).attr('tabindex', 1).focus();
      $(this).toggleClass('dropdown--active');
      $(this).find('.dropdown-menu').slideToggle(300);
  });
  $('.dropdown').focusout(function () {
      $(this).removeClass('dropdown--active');
      $(this).find('.dropdown-menu').slideUp(300);
  });
  $('.dropdown .dropdown-menu li').click(function () {
      $(this).parents('.dropdown').find('span').text($(this).text());
      $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
  });

  if($('.popular__items').length > 0){
    var mixer = mixitup('.popular__items', {
      load: {
        filter: 'all'
      }
    })
  }
  if($('.discover__items').length > 0){
    var mixerDiscover = mixitup('.discover__items', {
      load: {
        filter: 'all'
      }
    })
  }

  "use strict";

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  // Функция перемещения
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();
})