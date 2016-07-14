import {browserHistory} from 'react-router';
const solidcart = 'solidcart';
import $ from 'jquery';

export function handleLink(e, path) {
    const ev = e;

    if (ev) {
        ev.preventDefault();
    }

    browserHistory.push(path);
}

export function addToCart(key, values) {
    if (typeof(Storage) !== 'undefined') {
        const cartIsFilled = cartExists();
        const cart = cartIsFilled ? JSON.parse(cartIsFilled) : {};

        if (cart[key]) {
            cart[key].cant += values.cant;
        }

        if (!cart[key]) {
            cart[key] = values;
        }

        const JSONText = JSON.stringify(cart);
        localStorage.setItem(solidcart, JSONText);
        return true;
    }
}

export function getCart(key) {
    if (typeof(Storage) !== 'undefined') {
        const cart = localStorage.getItem(solidcart);

        if (cart) {
            const cartJSON = JSON.parse(cart);
            return cartJSON[key] || false;
        }

        return false;
    }
}

export function cartExists() {
    if (typeof(Storage) !== 'undefined') {
        const cart = localStorage.getItem(solidcart);

        return cart || false;
    }

    return false;
}

export function clearCart() {
    if (typeof(Storage) !== 'undefined') {
        localStorage.removeItem(solidcart);
        return true;
    }

    return false;
}

export function removeItemFromCart(key) {
    if (typeof(Storage) !== 'undefined') {
        const isCartFilled = cartExists();
        const cart = isCartFilled ? JSON.parse(isCartFilled) : false;

        if (cart) {
            if (cart[key]) {
                const isDeleted = Reflect.deleteProperty(cart, key);
                if (isDeleted) {
                    const cartJSON = JSON.stringify(cart);
                    localStorage.setItem(solidcart, cartJSON);
                    return cartJSON;
                }
            }
        }
    }
}

export function getSizeOfCart() {
    const isCartEmpty = cartExists();
    const jsonCart = isCartEmpty ? JSON.parse(isCartEmpty) : {};
    const items = Object.keys(jsonCart);

    return items.length;
}

export function scrollAnimated(hash) {
    const section = $(hash + '-section');

    if (section.length > 0) {
        $('html, body').stop().animate({
            'scrollTop': section.offset().top
        }, 900, 'swing');
    }
}