window.onload = function() {
    let mainPanel = document.getElementById('main-panel');

    mainPanel.addEventListener('click', function(event) {
        let x = event.pageX;
        let y = event.pageY;
        
        if (9 <= x && x <= 808 && 9 <= y && y <= 458) {
            let bubble = document.createElement('div');
            bubble.className = 'bubble';
            if (9 <= x && x < 34) {
                bubble.style.left = 9 + 'px';
            } else if (782 < x && x <= 808) {
                bubble.style.left = 757 + 'px';
            } else {
                bubble.style.left = x - 25 + 'px';
            }
            if (9 <= y && y < 34) {
                bubble.style.top = 9 + 'px';
            } else if (432 < y && y <= 458) {
                bubble.style.top = 407 + 'px';
            } else {
                bubble.style.top = y - 25 + 'px';
                y -= 25;
            }
            mainPanel.appendChild(bubble);

            let timer = setInterval(() => {
                if (407 <= y) {
                    clearInterval(timer);
                    mainPanel.removeChild(bubble); 
                } else {
                    y += 1;
                    bubble.style.top = y + 'px';
                }
            }, 10);
        }
    })
}