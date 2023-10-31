const label = document.createElement('pre');
const trackingArea = document.querySelector('.tracking-area')

let mousePos = {
    x: 0,
    y: 0
};

let followerPos = {
    x: 620,
    y: 285
};

const follower = document.createElement('div');
follower.setAttribute('style', `
    height: 40px;
    width: 40px;
    background-color: red;
    position: absolute;
    top:${followerPos.y}px;
    left:${followerPos.x}px;`)

trackingArea.appendChild(follower);

const setPosition = (mouse) => {
    mousePos.x = mouse.clientX;
    mousePos.y = mouse.clientY;
    label.textContent = `
    x: ${mousePos.x}
    y: ${mousePos.y}`;

    trackingArea.appendChild(label);
};

const updateFollower = () => {
    const dx = mousePos.x - followerPos.x;
    const dy = mousePos.y - followerPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
        const speed = 2;
        const angle = Math.atan2(dy, dx);
        const newX = followerPos.x + speed * Math.cos(angle);
        const newY = followerPos.y + speed * Math.sin(angle);
        followerPos.x = newX;
        followerPos.y = newY;
    } else {
        followerPos.x = mousePos.x;
        followerPos.y = mousePos.y;
    }

    follower.style.left = followerPos.x + 'px';
    follower.style.top = followerPos.y + 'px';

    requestAnimationFrame(updateFollower);
};

document.addEventListener('mousemove', setPosition);
requestAnimationFrame(updateFollower);
