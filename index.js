function whiteFlash() {
    const whiteFlash = document.getElementById('whiteFlash');
    if (whiteFlash) {
        whiteFlash.style.display = 'inline-block';
        whiteFlash.style.opacity = '1';
        audio.play();
    }
    setTimeout(() => {
        if (whiteFlash) {
            whiteFlash.style.opacity = '0';
        }

        setTimeout(() => {
            if (whiteFlash) {
                whiteFlash.style.display = 'none';
            }

            let cur_url = window.location.href
            let cur_url_sub = cur_url.substring(0, cur_url.search('index.html'));

            window.location.href = cur_url_sub + 'game.html';
        }, 100); 
    }, 100);
}

const startButton = document.getElementById('startButton');
const cameraOverlay = document.getElementById('cameraOverlay');

var audio = new Audio('./static/audio/shutter.mp3');

if (startButton && cameraOverlay) {
    startButton.addEventListener('mouseover', () => {
        cameraOverlay.style.display = 'inline-block';
        cameraOverlay.style.opacity = '1';
    });

    startButton.addEventListener('mouseout', () => {
        cameraOverlay.style.opacity = '0';
        setTimeout(() => {
            cameraOverlay.style.display = 'none';
        }, 100); // Delay to allow opacity transition
    });
}