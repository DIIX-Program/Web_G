// Main JavaScript for index.html

// Danh sách các game (>=20 game) với cấu trúc mới
const defaultGames = [
    // Game dân gian (5 games)
    { id: 'oan-quan', name: 'Ô Ăn Quan', file: 'games/oan-quan.html', category: 'dân gian', icon: '🎯', enabled: true, hasBot: false, aspectRatio: '4:3' },
    { id: 'co-vua', name: 'Cờ Vua', file: 'games/co-vua.html', category: 'dân gian', icon: '♟️', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'co-tuong', name: 'Cờ Tướng', file: 'games/co-tuong.html', category: 'dân gian', icon: '🏮', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'co-caro', name: 'Cờ Caro', file: 'games/co-caro.html', category: 'dân gian', icon: '⭕', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'bau-cua', name: 'Bầu Cua', file: 'games/bau-cua.html', category: 'dân gian', icon: '🎲', enabled: true, hasBot: false, aspectRatio: '16:9' },

    // Mini Game (15 games)
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', file: 'games/tic-tac-toe.html', category: 'mini', icon: '❌', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'ran-san-moi', name: 'Rắn Săn Mồi', file: 'games/ran-san-moi.html', category: 'mini', icon: '🐍', enabled: true, hasBot: true, aspectRatio: '16:9' },
    { id: 'ping-pong', name: 'Ping Pong', file: 'games/ping-pong.html', category: 'mini', icon: '🏓', enabled: true, hasBot: true, aspectRatio: '16:9' },
    { id: 'flappy-bird', name: 'Flappy Bird', file: 'games/flappy-bird.html', category: 'mini', icon: '🐦', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'do-min', name: 'Dò Mìn', file: 'games/do-min.html', category: 'mini', icon: '💣', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: '2048', name: '2048', file: 'games/2048.html', category: 'mini', icon: '🔢', enabled: true, hasBot: false, aspectRatio: '4:3' },
    { id: 'brick-breaker', name: 'Brick Breaker', file: 'games/brick-breaker.html', category: 'mini', icon: '🧱', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'sudoku', name: 'Sudoku', file: 'games/sudoku.html', category: 'mini', icon: '🔢', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'memory-card', name: 'Memory Card', file: 'games/memory-card.html', category: 'mini', icon: '🎴', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'space-shooter', name: 'Space Shooter', file: 'games/space-shooter.html', category: 'mini', icon: '🚀', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'lat-hinh', name: 'Lật Hình', file: 'games/lat-hinh.html', category: 'mini', icon: '🃏', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'ban-bong', name: 'Bắn Bóng', file: 'games/ban-bong.html', category: 'mini', icon: '⚽', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'stack-tower', name: 'Stack Tower', file: 'games/stack-tower.html', category: 'mini', icon: '📚', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'dino-run', name: 'Dino Run', file: 'games/dino-run.html', category: 'mini', icon: '🦖', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'cut-rope', name: 'Cut the Rope', file: 'games/cut-rope.html', category: 'mini', icon: '🍬', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'tetris', name: 'Tetris', file: 'games/tetris.html', category: 'mini', icon: '🧩', enabled: true, hasBot: false, aspectRatio: '4:3' },
    { id: 'penalty-kick', name: 'Penalty Kick', file: 'games/penalty-kick.html', category: 'mini', icon: '⚽', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'breakout-neon', name: 'Breakout Neon', file: 'games/breakout-neon.html', category: 'mini', icon: '💎', enabled: true, hasBot: false, aspectRatio: '16:9' }
];

let games = [];
let isGameLoaded = false;
let isFullscreen = false;
let isMenuOpen = true;
let currentGame = null;
let gameMode = 'single'; // 'single', 'bot-easy', 'bot-medium', 'bot-hard'

// Load games từ localStorage hoặc dùng default
function loadGamesData() {
    const savedGames = localStorage.getItem('gamesConfig');
    if (savedGames) {
        const saved = JSON.parse(savedGames);
        // Merge với default games
        games = defaultGames.map(defaultGame => {
            const savedGame = saved.find(g => g.id === defaultGame.id);
            return savedGame ? { ...defaultGame, ...savedGame } : defaultGame;
        });
    } else {
        games = [...defaultGames];
        // Lưu lần đầu
        localStorage.setItem('gamesConfig', JSON.stringify(games));
    }
    // Chỉ lấy games enabled
    games = games.filter(g => g.enabled !== false);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function () {
    loadGamesData();
    loadGames();
    loadAds();
    setupEventListeners();

    // Desktop: menu starts open
    if (window.innerWidth >= 1024) {
        isMenuOpen = true;
        const sidebar = document.getElementById('game-list-sidebar');
        if (sidebar) {
            sidebar.classList.remove('hidden');
        }
    } else {
        isMenuOpen = false;
    }
});

// Setup event listeners
function setupEventListeners() {
    // Menu toggle button
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleMenu);
    }

    // Fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Game mode selector
    const gameModeSelect = document.getElementById('game-mode-select');
    if (gameModeSelect) {
        gameModeSelect.addEventListener('change', function () {
            gameMode = this.value;
            // Reload game với chế độ mới nếu đang có game được load
            if (currentGame && isGameLoaded) {
                loadGame(currentGame.file, document.querySelector('.game-item.active'));
            }
        });
    }

    // Close mobile menu
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    if (closeMobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            document.getElementById('game-list-mobile').classList.add('hidden');
        });
    }

    // Close mobile menu when clicking outside
    const mobileMenu = document.getElementById('game-list-mobile');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Fullscreen change listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
}

// Toggle menu sidebar
function toggleMenu() {
    const menuBtnText = document.getElementById('menu-btn-text');

    if (window.innerWidth >= 1024) {
        // Desktop: toggle sidebar and shrink game temporarily
        const sidebar = document.getElementById('game-list-sidebar');
        const gameContainer = document.getElementById('game-container');
        const gameFrame = document.getElementById('game-frame');
        const gameWrapper = gameContainer.querySelector('.game-frame-wrapper');

        if (sidebar && gameContainer && gameFrame) {
            if (isMenuOpen) {
                // Close menu: shrink game to 500x300px temporarily
                sidebar.classList.add('hidden');
                gameContainer.classList.remove('lg:flex-1');
                gameContainer.classList.add('lg:w-full');
                if (gameWrapper) {
                    gameWrapper.style.width = '500px';
                    gameWrapper.style.height = '300px';
                    gameWrapper.style.margin = '0 auto';
                    gameFrame.style.width = '100%';
                    gameFrame.style.height = '100%';
                    gameFrame.style.minHeight = '300px';
                }
                if (menuBtnText) menuBtnText.textContent = '📋 Mở Menu';
            } else {
                // Open menu: restore game to full size
                sidebar.classList.remove('hidden');
                gameContainer.classList.add('lg:flex-1');
                gameContainer.classList.remove('lg:w-full');
                if (gameWrapper) {
                    gameWrapper.style.width = '100%';
                    gameWrapper.style.height = 'auto';
                    gameWrapper.style.margin = '0';
                    gameFrame.style.width = '100%';
                    gameFrame.style.height = '750px';
                    gameFrame.style.minHeight = '650px';
                }
                if (menuBtnText) menuBtnText.textContent = '📋 Menu Game';
            }
            isMenuOpen = !isMenuOpen;
        }
    } else {
        // Mobile: show overlay menu
        const mobileMenu = document.getElementById('game-list-mobile');
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
        }
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    const gameFrame = document.getElementById('game-frame');
    if (!gameFrame) return;

    if (!isFullscreen) {
        // Enter fullscreen
        if (gameFrame.requestFullscreen) {
            gameFrame.requestFullscreen();
        } else if (gameFrame.webkitRequestFullscreen) {
            gameFrame.webkitRequestFullscreen();
        } else if (gameFrame.mozRequestFullScreen) {
            gameFrame.mozRequestFullScreen();
        } else if (gameFrame.msRequestFullscreen) {
            gameFrame.msRequestFullscreen();
        }
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Handle fullscreen change
function handleFullscreenChange() {
    const isCurrentlyFullscreen = !!(document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement);

    isFullscreen = isCurrentlyFullscreen;

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        const btnText = document.getElementById('fullscreen-btn-text');
        if (btnText) {
            if (isFullscreen) {
                btnText.textContent = '🗗 Thoát Fullscreen';
            } else {
                btnText.textContent = '⛶ Fullscreen';
            }
        }
    }
}

// Load danh sách game
function loadGames() {
    const gameList = document.getElementById('game-list');
    const gameListMobile = document.getElementById('game-list-mobile-content');

    if (gameList) gameList.innerHTML = '';
    if (gameListMobile) gameListMobile.innerHTML = '';

    games.forEach((game, index) => {
        const gameItem = createGameItem(game, index);
        const gameItemMobile = createGameItem(game, index);

        if (gameList) gameList.appendChild(gameItem);
        if (gameListMobile) gameListMobile.appendChild(gameItemMobile);
    });
}

// Tạo game item
function createGameItem(game, index) {
    const gameItem = document.createElement('div');
    gameItem.className = 'game-item p-3 border border-gray-300 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-blue-400 bg-white';
    gameItem.style.borderRadius = '16px';
    gameItem.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-2xl">${game.icon}</span>
            <div class="flex-1">
                <div class="font-semibold text-gray-800 text-sm">${game.name}</div>
                <div class="text-xs text-gray-500">${game.category === 'dân gian' ? '🎯 Dân gian' : '🎮 Mini game'}</div>
            </div>
        </div>
    `;
    gameItem.addEventListener('click', () => {
        // Lưu game object vào data attribute để dễ truy cập
        gameItem.dataset.gameId = game.id;
        loadGame(game.file, gameItem);
        // Close mobile menu after selection
        const mobileList = document.getElementById('game-list-mobile');
        if (mobileList && !mobileList.classList.contains('hidden')) {
            mobileList.classList.add('hidden');
        }
    });
    return gameItem;
}

// Show/hide game mode selector
function toggleGameModeSelector(game) {
    const selector = document.getElementById('game-mode-selector');
    const modeSelect = document.getElementById('game-mode-select');

    if (!selector || !modeSelect) return;

    // Kiểm tra game có hỗ trợ bot không
    if (game && game.hasBot) {
        selector.classList.remove('hidden');

        // Load game mode từ localStorage hoặc dùng mặc định
        const savedConfig = localStorage.getItem('gamesConfig');
        if (savedConfig) {
            const games = JSON.parse(savedConfig);
            const savedGame = games.find(g => g.id === game.id);
            if (savedGame && savedGame.gameMode) {
                gameMode = savedGame.gameMode;
                modeSelect.value = gameMode;
            } else {
                gameMode = 'single';
                modeSelect.value = 'single';
            }
        } else {
            gameMode = 'single';
            modeSelect.value = 'single';
        }
    } else {
        selector.classList.add('hidden');
        gameMode = 'single';
    }
}

// Load game vào iframe
function loadGame(gameFile, clickedItem) {
    const gameFrame = document.getElementById('game-frame');
    const placeholder = document.getElementById('game-placeholder');

    if (!gameFrame) return;

    // Tìm game object từ gameFile
    const game = games.find(g => g.file === gameFile);
    currentGame = game;

    // Remove active class from all items
    document.querySelectorAll('.game-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to clicked item (both desktop and mobile)
    document.querySelectorAll('.game-item').forEach(item => {
        if (item.innerHTML === clickedItem.innerHTML) {
            item.classList.add('active');
        }
    });

    // Hide placeholder
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    // Show/hide game mode selector
    toggleGameModeSelector(game);

    // Load game với parameter bot mode và difficulty
    let gameUrl = gameFile;
    if (game && game.hasBot && gameMode !== 'single') {
        // Thêm parameter để game biết bật bot và độ khó
        const separator = gameFile.includes('?') ? '&' : '?';
        let difficulty = 'easy';
        if (gameMode === 'bot-medium') difficulty = 'medium';
        else if (gameMode === 'bot-hard') difficulty = 'hard';

        gameUrl = `${gameFile}${separator}bot=true&difficulty=${difficulty}`;

        // Lưu game mode vào localStorage
        const savedConfig = localStorage.getItem('gamesConfig');
        let games = savedConfig ? JSON.parse(savedConfig) : [];
        const gameIndex = games.findIndex(g => g.id === game.id);
        if (gameIndex >= 0) {
            games[gameIndex].gameMode = gameMode;
        } else {
            const gameCopy = { ...game, gameMode: gameMode };
            games.push(gameCopy);
        }
        localStorage.setItem('gamesConfig', JSON.stringify(games));
    }

    gameFrame.src = gameUrl;
    isGameLoaded = true;

    // Show loading state
    gameFrame.style.opacity = '0.5';
    setTimeout(() => {
        gameFrame.style.opacity = '1';
    }, 300);

    // Auto close mobile menu
    if (window.innerWidth < 1024) {
        const mobileMenu = document.getElementById('game-list-mobile');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
}

// Load quảng cáo từ localStorage
function loadAds() {
    const adLeftImage = localStorage.getItem('adLeftImage');
    const adLeftLink = localStorage.getItem('adLeftLink');
    const adRightImage = localStorage.getItem('adRightImage');
    const adRightLink = localStorage.getItem('adRightLink');

    const adLeftContainer = document.getElementById('ad-left');
    const adRightContainer = document.getElementById('ad-right');

    if (adLeftContainer) {
        if (adLeftImage) {
            adLeftContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = adLeftImage;
            img.alt = 'Quảng cáo';
            img.className = 'w-full h-auto rounded-xl cursor-pointer transition-transform hover:scale-105';
            img.style.borderRadius = '16px';
            img.style.maxHeight = '400px';
            img.style.objectFit = 'cover';

            if (adLeftLink) {
                const link = document.createElement('a');
                link.href = adLeftLink;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.appendChild(img);
                adLeftContainer.appendChild(link);
            } else {
                adLeftContainer.appendChild(img);
            }
        } else {
            adLeftContainer.innerHTML = '<p class="text-center text-xs text-gray-400">Quảng cáo bên trái<br><span class="text-xs">Chưa có nội dung</span></p>';
        }
    }

    if (adRightContainer) {
        if (adRightImage) {
            adRightContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = adRightImage;
            img.alt = 'Quảng cáo';
            img.className = 'w-full h-auto rounded-xl cursor-pointer transition-transform hover:scale-105';
            img.style.borderRadius = '16px';
            img.style.maxHeight = '400px';
            img.style.objectFit = 'cover';

            if (adRightLink) {
                const link = document.createElement('a');
                link.href = adRightLink;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.appendChild(img);
                adRightContainer.appendChild(link);
            } else {
                adRightContainer.appendChild(img);
            }
        } else {
            adRightContainer.innerHTML = '<p class="text-center text-xs text-gray-400">Quảng cáo bên phải<br><span class="text-xs">Chưa có nội dung</span></p>';
        }
    }
}
