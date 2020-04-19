export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

export function positionComparer(p1, p2) {
    const isSamePosition = p1.x === p2.x && p1.y === p2.y;
    // console.log(isSamePosition);
    return isSamePosition;
}