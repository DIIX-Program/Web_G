// Admin JavaScript for admin.html

// Login credentials
const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = '112233';

// Check if user is logged in
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showAdminPanel();
    } else {
        showLoginScreen();
    }
}

// Show login screen
function showLoginScreen() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('admin-panel').classList.add('hidden');
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    loadExistingAds();
    loadGamesManagement();
}

// Setup login form
function setupLogin() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorDiv = document.getElementById('login-error');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Login successful
            sessionStorage.setItem('adminLoggedIn', 'true');
            errorDiv.classList.add('hidden');
            showAdminPanel();
        } else {
            // Login failed
            errorDiv.classList.remove('hidden');
            usernameInput.value = '';
            passwordInput.value = '';
        }
    });
}

// Logout
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (confirm('Bạn có chắc muốn đăng xuất?')) {
                sessionStorage.removeItem('adminLoggedIn');
                showLoginScreen();
            }
        });
    }
}

// Load existing ads from localStorage
function loadExistingAds() {
    const adLeftImage = localStorage.getItem('adLeftImage');
    const adLeftLink = localStorage.getItem('adLeftLink');
    const adRightImage = localStorage.getItem('adRightImage');
    const adRightLink = localStorage.getItem('adRightLink');

    // Load left ad
    if (adLeftImage) {
        document.getElementById('ad-left-image-input').dataset.currentImage = adLeftImage;
        showPreview('ad-left', adLeftImage);
    }
    if (adLeftLink) {
        document.getElementById('ad-left-link').value = adLeftLink;
    }

    // Load right ad
    if (adRightImage) {
        document.getElementById('ad-right-image-input').dataset.currentImage = adRightImage;
        showPreview('ad-right', adRightImage);
    }
    if (adRightLink) {
        document.getElementById('ad-right-link').value = adRightLink;
    }
}

// Setup image upload for both ads
function setupImageUploads() {
    // Left ad
    setupSingleImageUpload('ad-left');
    // Right ad
    setupSingleImageUpload('ad-right');
}

function setupSingleImageUpload(prefix) {
    const fileInput = document.getElementById(`${prefix}-image-input`);
    const uploadTrigger = document.getElementById(`${prefix}-upload-trigger`);
    const uploadArea = uploadTrigger.closest('.upload-area');
    const previewContainer = document.getElementById(`${prefix}-preview-container`);
    const preview = document.getElementById(`${prefix}-preview`);
    const removeBtn = document.getElementById(`${prefix}-remove`);

    // Click to upload
    uploadTrigger.addEventListener('click', () => {
        fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0], prefix);
        }
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0], prefix);
        }
    });

    // Remove image
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            fileInput.value = '';
            fileInput.dataset.currentImage = '';
            previewContainer.classList.add('hidden');
            uploadTrigger.style.display = 'block';
        });
    }
}

// Handle file selection
function handleFileSelect(file, prefix) {
    // Check file type
    if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return;
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
        return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;
        document.getElementById(`${prefix}-image-input`).dataset.currentImage = imageData;
        showPreview(prefix, imageData);
    };
    reader.readAsDataURL(file);
}

// Show preview
function showPreview(prefix, imageData) {
    const previewContainer = document.getElementById(`${prefix}-preview-container`);
    const preview = document.getElementById(`${prefix}-preview`);
    const uploadTrigger = document.getElementById(`${prefix}-upload-trigger`);

    preview.src = imageData;
    previewContainer.classList.remove('hidden');
    uploadTrigger.style.display = 'none';
}

// Setup form submissions
function setupForms() {
    // Left ad form
    const leftForm = document.getElementById('ad-left-form');
    leftForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveAd('adLeft');
    });

    // Right ad form
    const rightForm = document.getElementById('ad-right-form');
    rightForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveAd('adRight');
    });
}

// Save ad to localStorage
function saveAd(prefix) {
    const imageInput = document.getElementById(`${prefix === 'adLeft' ? 'ad-left' : 'ad-right'}-image-input`);
    const linkInput = document.getElementById(`${prefix === 'adLeft' ? 'ad-left' : 'ad-right'}-link`);

    const imageData = imageInput.dataset.currentImage || '';
    const link = linkInput.value.trim();

    if (!imageData) {
        alert('Vui lòng upload ảnh quảng cáo!');
        return;
    }

    // Save to localStorage
    localStorage.setItem(`${prefix}Image`, imageData);
    localStorage.setItem(`${prefix}Link`, link);

    // Show success message
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const successMsg = document.getElementById('success-message');
    successMsg.classList.remove('hidden');

    // Auto hide after 3 seconds
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 3000);
}

// Default games data (same as main.js)
const defaultGames = [
    { id: 'oan-quan', name: 'Ô Ăn Quan', category: 'dân gian', icon: '🎯', enabled: true, hasBot: false, aspectRatio: '4:3' },
    { id: 'co-vua', name: 'Cờ Vua', category: 'dân gian', icon: '♟️', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'co-tuong', name: 'Cờ Tướng', category: 'dân gian', icon: '🏮', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'co-caro', name: 'Cờ Caro', category: 'dân gian', icon: '⭕', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'bau-cua', name: 'Bầu Cua', category: 'dân gian', icon: '🎲', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', category: 'mini', icon: '❌', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'ran-san-moi', name: 'Rắn Săn Mồi', category: 'mini', icon: '🐍', enabled: true, hasBot: true, aspectRatio: '16:9' },
    { id: 'ping-pong', name: 'Ping Pong', category: 'mini', icon: '🏓', enabled: true, hasBot: true, aspectRatio: '16:9' },
    { id: 'flappy-bird', name: 'Flappy Bird', category: 'mini', icon: '🐦', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'do-min', name: 'Dò Mìn', category: 'mini', icon: '💣', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: '2048', name: '2048', category: 'mini', icon: '🔢', enabled: true, hasBot: false, aspectRatio: '4:3' },
    { id: 'brick-breaker', name: 'Brick Breaker', category: 'mini', icon: '🧱', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'sudoku', name: 'Sudoku', category: 'mini', icon: '🔢', enabled: true, hasBot: true, aspectRatio: '4:3' },
    { id: 'memory-card', name: 'Memory Card', category: 'mini', icon: '🎴', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'space-shooter', name: 'Space Shooter', category: 'mini', icon: '🚀', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'lat-hinh', name: 'Lật Hình', category: 'mini', icon: '🃏', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'ban-bong', name: 'Bắn Bóng', category: 'mini', icon: '⚽', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'stack-tower', name: 'Stack Tower', category: 'mini', icon: '📚', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'dino-run', name: 'Dino Run', category: 'mini', icon: '🦖', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'cut-rope', name: 'Cut the Rope', category: 'mini', icon: '🍬', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'tetris', name: 'Tetris', category: 'mini', icon: '🧩', enabled: true, hasBot: false, aspectRatio: '4:3' },
    { id: 'penalty-kick', name: 'Penalty Kick', category: 'mini', icon: '⚽', enabled: true, hasBot: false, aspectRatio: '16:9' },
    { id: 'breakout-neon', name: 'Breakout Neon', category: 'mini', icon: '💎', enabled: true, hasBot: false, aspectRatio: '16:9' }
];

// Load games management
function loadGamesManagement() {
    const gamesList = document.getElementById('games-list');
    if (!gamesList) return;

    // Load games from localStorage or use default
    const savedGames = localStorage.getItem('gamesConfig');
    let games = [];

    if (savedGames) {
        const saved = JSON.parse(savedGames);
        games = defaultGames.map(defaultGame => {
            const savedGame = saved.find(g => g.id === defaultGame.id);
            return savedGame ? { ...defaultGame, ...savedGame } : defaultGame;
        });
    } else {
        games = [...defaultGames];
    }

    gamesList.innerHTML = '';
    games.forEach(game => {
        const gameItem = createGameManagementItem(game);
        gamesList.appendChild(gameItem);
    });
}

// Create game management item
function createGameManagementItem(game) {
    const div = document.createElement('div');
    div.className = 'bg-gray-50 rounded-xl p-4 border border-gray-200';
    div.style.borderRadius = '16px';
    div.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
                <span class="text-2xl">${game.icon}</span>
                <div>
                    <div class="font-semibold text-gray-800">${game.name}</div>
                    <div class="text-xs text-gray-500">${game.category === 'dân gian' ? '🎯 Dân gian' : '🎮 Mini game'}</div>
                </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" data-game-id="${game.id}" data-type="enabled" ${game.enabled !== false ? 'checked' : ''}>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-gray-700">Bật</span>
            </label>
        </div>
        ${game.hasBot ? `
            <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <span class="text-sm text-gray-600">🤖 AI/Bot:</span>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" data-game-id="${game.id}" data-type="botEnabled" ${game.botEnabled ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
            </div>
        ` : ''}
    `;
    return div;
}

// Save games configuration
function saveGamesConfig() {
    const gamesList = document.getElementById('games-list');
    if (!gamesList) return;

    const checkboxes = gamesList.querySelectorAll('input[type="checkbox"]');
    const savedGames = localStorage.getItem('gamesConfig');
    let games = savedGames ? JSON.parse(savedGames) : [...defaultGames];

    checkboxes.forEach(checkbox => {
        const gameId = checkbox.dataset.gameId;
        const type = checkbox.dataset.type;
        const game = games.find(g => g.id === gameId);

        if (game) {
            if (type === 'enabled') {
                game.enabled = checkbox.checked;
            } else if (type === 'botEnabled') {
                game.botEnabled = checkbox.checked;
            }
        }
    });

    localStorage.setItem('gamesConfig', JSON.stringify(games));
    showSuccessMessage();
}

// Setup tabs
function setupTabs() {
    const tabGames = document.getElementById('tab-games');
    const tabAds = document.getElementById('tab-ads');
    const gamesTab = document.getElementById('games-tab');
    const adsTab = document.getElementById('ads-tab');

    if (tabGames && tabAds && gamesTab && adsTab) {
        tabGames.addEventListener('click', () => {
            tabGames.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            tabGames.classList.remove('text-gray-500');
            tabAds.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            tabAds.classList.add('text-gray-500');
            gamesTab.classList.remove('hidden');
            adsTab.classList.add('hidden');
        });

        tabAds.addEventListener('click', () => {
            tabAds.classList.add('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            tabAds.classList.remove('text-gray-500');
            tabGames.classList.remove('active', 'text-blue-600', 'border-b-2', 'border-blue-600');
            tabGames.classList.add('text-gray-500');
            adsTab.classList.remove('hidden');
            gamesTab.classList.add('hidden');
        });
    }
}

// Setup games save button
function setupGamesSave() {
    const saveBtn = document.getElementById('save-games-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveGamesConfig);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    checkLogin();
    setupLogin();
    setupLogout();
    setupImageUploads();
    setupForms();
    setupTabs();
    setupGamesSave();
});
