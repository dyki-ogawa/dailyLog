// グローバル変数
let currentDate = new Date();
let selectedDate = null;
let diaries = {};
let currentUser = null;

// DOM要素
const calendarDays = document.getElementById('calendarDays');
const dayNumber = document.getElementById('dayNumber');
const monthName = document.getElementById('monthName');
const dayOfWeek = document.getElementById('dayOfWeek');
const yearNumber = document.getElementById('yearNumber');
const modal = document.getElementById('diaryModal');
const modalDate = document.getElementById('modalDate');
const diaryText = document.getElementById('diaryText');
const saveBtn = document.getElementById('saveBtn');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

// 認証関連DOM要素
const signInBtn = document.getElementById('signInBtn');
const userMenu = document.getElementById('userMenu');
const userIconBtn = document.getElementById('userIconBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');

// 初期化
function init() {
    checkAuthStatus();
    loadDiaries();
    updateDateHeader();
    renderCalendar();
    setupEventListeners();
    setupAuthListeners();

    // ログイン済みの場合のみ、アプリ起動時に今日の日記モーダルを自動表示
    if (currentUser) {
        setTimeout(() => {
            openDiaryModal(new Date());
        }, 100);
    }
}

// LocalStorageから日記データを読み込み
function loadDiaries() {
    const savedDiaries = localStorage.getItem('diaries');
    if (savedDiaries) {
        diaries = JSON.parse(savedDiaries);
    }
}

// LocalStorageに日記データを保存
function saveDiaries() {
    localStorage.setItem('diaries', JSON.stringify(diaries));
}

// 日付をキーとして使用するためのフォーマット (YYYY-MM-DD)
function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 日付を表示用にフォーマット
function formatDateDisplay(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    return `${year}年${month}月${day}日 (${weekday})`;
}

// ヘッダーの日付情報を更新
function updateDateHeader() {
    const today = new Date();
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                       'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 今日の日付情報を表示
    dayNumber.textContent = String(today.getDate()).padStart(2, '0');
    dayOfWeek.textContent = dayNames[today.getDay()];

    // 表示中の月と年を表示
    monthName.textContent = monthNames[currentDate.getMonth()];
    yearNumber.textContent = currentDate.getFullYear();
}

// カレンダーを描画
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // ヘッダー情報を更新
    updateDateHeader();

    // カレンダーの日付をクリア
    calendarDays.innerHTML = '';

    // 月の最初の日と最後の日を取得
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 前月の日付を追加（月曜始まりなので調整）
    // 月曜日 = 1, 火曜日 = 2, ..., 日曜日 = 0
    let firstDayOfWeek = firstDay.getDay();
    // 日曜日の場合は7に変換（月曜始まりのため）
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    // 月曜日からスタートするように前月の日付を追加
    for (let i = firstDayOfWeek - 2; i >= 0; i--) {
        const date = new Date(year, month, -i);
        createDayElement(date, true);
    }

    // 当月の日付を追加
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        createDayElement(date, false);
    }

    // 次月の日付を追加（カレンダーを6週間分で埋める）
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6週 × 7日 = 42
    for (let i = 1; i <= remainingCells; i++) {
        const date = new Date(year, month + 1, i);
        createDayElement(date, true);
    }
}

// 日付要素を作成
function createDayElement(date, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.textContent = date.getDate();

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const dateKey = formatDateKey(date);
    const hasDiary = diaries[dateKey] && diaries[dateKey].trim() !== '';

    if (isOtherMonth) {
        // 当月でない日付（前月・次月）
        dayElement.classList.add('other-month');
    } else {
        // 当月の日付
        dayElement.classList.add('current-month');
    }

    // 今日の日付
    if (isToday) {
        dayElement.classList.add('today');
    }

    // 日記が記載されている日付
    if (hasDiary) {
        dayElement.classList.add('has-diary');
    }

    // クリックイベント
    dayElement.addEventListener('click', () => {
        openDiaryModal(date);
    });

    calendarDays.appendChild(dayElement);
}

// 日記モーダルを開く
function openDiaryModal(date) {
    selectedDate = date;
    const dateKey = formatDateKey(date);

    // モーダルの日付表示を更新
    modalDate.textContent = formatDateDisplay(date);

    // 既存の日記があれば読み込み
    diaryText.innerText = diaries[dateKey] || '';

    // モーダルを表示
    modal.classList.add('show');

    // カーソルをコンテンツの最後に移動
    setTimeout(() => {
        diaryText.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(diaryText);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }, 100);
}

// 日記モーダルを閉じる
function closeDiaryModal() {
    modal.classList.remove('show');
    selectedDate = null;
}

// 日記を保存
function saveDiary() {
    if (!selectedDate) return;

    const dateKey = formatDateKey(selectedDate);
    const content = diaryText.innerText.trim();

    if (content === '') {
        // 空の場合は日記を削除
        delete diaries[dateKey];
    } else {
        // 日記を保存
        diaries[dateKey] = content;
    }

    saveDiaries();
    closeDiaryModal();
    renderCalendar();
}

// イベントリスナーを設定
function setupEventListeners() {
    // 完了ボタン
    saveBtn.addEventListener('click', saveDiary);

    // Escキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeDiaryModal();
        }
    });

    // 前月ボタン
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // 次月ボタン
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Ctrl+S または Cmd+S で保存
    diaryText.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveDiary();
        }
    });
}

// 認証状態をチェック
function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserMenu();
    } else {
        showSignInButton();
    }
}

// サインインボタンを表示
function showSignInButton() {
    signInBtn.style.display = 'flex';
    userMenu.style.display = 'none';
}

// ユーザーメニューを表示
function showUserMenu() {
    signInBtn.style.display = 'none';
    userMenu.style.display = 'block';
    if (currentUser) {
        userInfo.textContent = currentUser.email || currentUser.name || 'ユーザー';
    }
}

// Googleサインイン（モック実装）
async function signInWithGoogle() {
    // TODO: 実際のGoogle Sign In SDKを統合する
    // 現在はモック実装

    // モックユーザーデータ
    const mockUser = {
        id: 'user_' + Date.now(),
        email: 'user@example.com',
        name: 'Google User',
        provider: 'google'
    };

    currentUser = mockUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showUserMenu();

    // カレンダーを再描画
    renderCalendar();

    // 今日の日記を自動で開く
    setTimeout(() => {
        openDiaryModal(new Date());
    }, 100);
}

// ログアウト
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    dropdownMenu.style.display = 'none';
    showSignInButton();

    // カレンダーを再描画
    renderCalendar();
}

// ドロップダウンメニューをトグル
function toggleDropdown() {
    if (dropdownMenu.style.display === 'none') {
        dropdownMenu.style.display = 'block';
    } else {
        dropdownMenu.style.display = 'none';
    }
}

// 認証関連イベントリスナーを設定
function setupAuthListeners() {
    // サインインボタン
    signInBtn.addEventListener('click', signInWithGoogle);

    // ユーザーアイコンボタン
    userIconBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    // ログアウトボタン
    logoutBtn.addEventListener('click', logout);

    // ドロップダウン外をクリックしたら閉じる
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);
