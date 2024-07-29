document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 바 로드
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
        });
    
    // 푸터 로드
    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // 음악 파일 배열 설정
    const musicFiles = window.musicFiles || [];
    let currentTrackIndex = 0;
    const backgroundMusic = document.getElementById('background-music');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeControl = document.querySelector('.volume-control');
    const volumeButton = document.getElementById('volume-button');
    const nextTrackButton = document.getElementById('next-track'); // 다음 트랙 버튼

    // 볼륨 버튼 클릭 시 볼륨 컨트롤 보이기/숨기기
    volumeButton.addEventListener('click', function() {
        volumeControl.classList.toggle('visible');
    });

    // 다음 트랙 재생 함수
    function playNextTrack() {
        if (musicFiles.length > 0) {
            backgroundMusic.src = musicFiles[currentTrackIndex];
            console.log(`Playing track: ${backgroundMusic.src}`); // 디버깅
            backgroundMusic.play().catch(error => console.log("Music playback failed: ", error));
        }
    }

    // 음악 트랙이 끝나면 다음 트랙 재생
    backgroundMusic.addEventListener('ended', function() {
        console.log('Track ended'); // 디버깅
        if (musicFiles.length > 0) {
            currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length; // 다음 트랙으로 이동, 마지막 트랙이면 첫 번째 트랙으로
            playNextTrack(); // 자동으로 다음 트랙 재생
        }
    });

    // 음악 로드 및 재생 오류 처리
    backgroundMusic.addEventListener('error', function(event) {
        console.log('Audio playback error:', event); // 디버깅
    });

    // 저장된 볼륨 설정 불러오기 및 적용
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume !== null) {
        volumeSlider.value = savedVolume;
        backgroundMusic.volume = savedVolume;
    } else {
        volumeSlider.value = 0.5; // 기본 볼륨
        backgroundMusic.volume = 0.5; // 기본 볼륨
    }

    // 볼륨 슬라이더 값 변경 시 볼륨 조절 및 저장
    volumeSlider.addEventListener('input', function() {
        backgroundMusic.volume = volumeSlider.value;
        localStorage.setItem('volume', volumeSlider.value); // 볼륨 설정 저장
    });

    // 음악 재생 시작
    playNextTrack();

    // 다음 트랙 버튼 클릭 시
    nextTrackButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length; // 다음 트랙으로 이동, 마지막 트랙이면 첫 번째 트랙으로
        playNextTrack();
    });

    // 갤러리 이미지 클릭 시 모달 창 열기
    const galleryImages = document.querySelectorAll('.gallery img');
    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            captionText.innerHTML = this.getAttribute('data-details');
            photoModal.show();
        });
    });
});
