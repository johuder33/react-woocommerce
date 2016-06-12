import {browserHistory} from 'react-router';

export function handleLink(e, path) {
    const ev = e;

    if (ev) {
        ev.preventDefault();
    }

    browserHistory.push(path);
}