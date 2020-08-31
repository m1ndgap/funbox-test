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

const cards = document.querySelectorAll('.card__content-wrapper');
const links = document.querySelectorAll('.card__footer-link');

cards.forEach(function(cardwrap){
    cardwrap.addEventListener('click', function(){
        let card = this.closest('.card');
        let type = card.dataset.cardtype;
        if (type == 'selected') {
            card.dataset.cardtype = 'not-selected'
            card.classList.remove('card--selected')
            card.classList.remove('card--selected-no-hover')
        } else if (type == 'not-selected') {
            card.dataset.cardtype = 'selected'
            card.classList.add('card--selected')
            card.classList.add('card--selected-no-hover')
        }
    })
    cardwrap.addEventListener('mouseleave', function () {
        let card = this.closest('.card');
        let type = card.dataset.cardtype;
        if (type == 'selected') {
            card.classList.remove('card--selected-no-hover')
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
