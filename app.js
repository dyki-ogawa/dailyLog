// グローバル変数
let currentDate = new Date();
let selectedDate = null;
let diaries = {};

// DOM要素
const calendarDays = document.getElementById('calendarDays');
const currentMonthElement = document.getElementById('currentMonth');
const modal = document.getElementById('diaryModal');
const modalDate = document.getElementById('modalDate');
const diaryText = document.getElementById('diaryText');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

// 初期化
function init() {
    loadDiaries();
    renderCalendar();
    setupEventListeners();

    // アプリ起動時に今日の日記モーダルを自動表示
    setTimeout(() => {
        openDiaryModal(new Date());
    }, 100);
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

// カレンダーを描画
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 月の表示を更新
    currentMonthElement.textContent = `${year}年${month + 1}月`;

    // カレンダーの日付をクリア
    calendarDays.innerHTML = '';

    // 月の最初の日と最後の日を取得
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 前月の日付を追加（月の最初の日の曜日分）
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
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

    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }

    // 今日の日付をハイライト
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
    }

    // 日記が記載されている日付をハイライト
    const dateKey = formatDateKey(date);
    if (diaries[dateKey] && diaries[dateKey].trim() !== '') {
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
    diaryText.value = diaries[dateKey] || '';

    // モーダルを表示
    modal.classList.add('show');
    diaryText.focus();
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
    const content = diaryText.value.trim();

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
    // 保存ボタン
    saveBtn.addEventListener('click', saveDiary);

    // キャンセルボタン
    cancelBtn.addEventListener('click', closeDiaryModal);

    // モーダルの外側をクリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDiaryModal();
        }
    });

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

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', init);
