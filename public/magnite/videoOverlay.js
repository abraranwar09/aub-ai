document.addEventListener('DOMContentLoaded', () => {
    const videoOverlay = document.getElementById('videoOverlay');
    const introVideo = document.getElementById('introVideo');
    const skipButton = document.getElementById('skipButton');
    const splashOverlay = document.getElementById('splashOverlay');
    const letsTalkButton = document.getElementById('letsTalkButton');

    let skipClicked = false;

    // Function to hide the video overlay and show the splash overlay
    function showSplashOverlay() {
        videoOverlay.style.display = 'none';
        splashOverlay.style.display = 'flex'; // Show splash screen
    }

    // Function to hide the splash overlay
    function hideSplashOverlay() {
        splashOverlay.style.display = 'none';
    }

    // Event listener for video end
    introVideo.addEventListener('ended', () => {
        if (!skipClicked) {
            showSplashOverlay();
        }
    });

    // Event listener for skip button
    skipButton.addEventListener('click', () => {
        skipClicked = true;
        showSplashOverlay();
    });

    // Event listener for Let's Talk button
    letsTalkButton.addEventListener('click', hideSplashOverlay);

    // Optional: Automatically play the video on load
    introVideo.play();
});
