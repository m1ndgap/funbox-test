"use strict";

//ie11 polyfills
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;

        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

let viewport = document.body.clientWidth;

window.addEventListener('resize', function(){
    viewport = document.body.clientWidth;
})

let cards = document.querySelectorAll('.card__content-wrapper');
let links = document.querySelectorAll('.card__footer-link');

cards.forEach(function(cardwrap){
    cardwrap.addEventListener('click', function(){
        let card = this.closest('.card');
        let type = card.dataset.cardtype;
        if (type == 'selected') {
            if (viewport > 1024) {
                card.dataset.cardtype = 'not-selected'
            } else {
                card.dataset.cardtype = 'not-selected'
                card.classList.remove('card--selected')
            }
        } else if (type == 'not-selected') {
            if (viewport > 1024) {
                card.dataset.cardtype = 'selected'
            } else {
                card.dataset.cardtype = 'selected'
                card.classList.add('card--selected')
            }
        }
    })
    cardwrap.addEventListener('mouseleave', function () {
        let card = this.closest('.card');
        let type = card.dataset.cardtype;
        if (type == 'selected') {
            card.classList.add('card--selected')
        } else if (type == 'not-selected') {
            card.classList.remove('card--selected')
        }
    })
})

links.forEach(function(link){
    link.addEventListener('click', function (evt) {
        evt.preventDefault();
        let card = this.closest('.card');
        let type = card.dataset.cardtype;
        if (type == 'selected') {
            card.dataset.cardtype = 'not-selected'
            card.classList.remove('card--selected')
        } else if (type == 'not-selected') {
            card.dataset.cardtype = 'selected'
            card.classList.add('card--selected')
        }
    })
})