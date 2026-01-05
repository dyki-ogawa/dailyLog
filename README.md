# 日記アプリ

「すぐ書ける、振り返りやすい」をコアとしたシンプルな日記アプリケーション

## 特徴

- 📅 カレンダー形式で日記を管理
- ☁️ Firebaseでクラウド保存（複数端末から同期可能）
- 🔐 Googleアカウントでログイン
- 📱 レスポンシブデザイン対応
- ⚡ 起動時に今日の日記が自動で開く
- 🎨 日記記載済みの日付を視覚的に区別

## Firebase設定（必須）

このアプリはFirebaseを使用してデータを保存し、Googleアカウントで認証します。以下の手順でFirebaseプロジェクトを設定してください。

### 1. Firebaseプロジェクトを作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. **プロジェクトを追加** をクリック
3. プロジェクト名を入力（例: 日記アプリ）
4. Google Analyticsは任意（不要な場合はオフにできます）
5. **プロジェクトを作成** をクリック

### 2. Webアプリを追加

1. Firebaseプロジェクトのダッシュボードで、**ウェブアイコン（</>）** をクリック
2. アプリのニックネームを入力（例: 日記Webアプリ）
3. **Firebase Hostingを設定する** はチェック不要
4. **アプリを登録** をクリック
5. 表示される `firebaseConfig` をコピー

### 3. Firebase Authenticationを有効化

1. 左メニューから **Authentication** をクリック
2. **始める** をクリック
3. **Sign-in method** タブをクリック
4. **Google** を選択して有効化
5. サポートメールを選択して **保存**

### 4. Cloud Firestoreを有効化

1. 左メニューから **Firestore Database** をクリック
2. **データベースの作成** をクリック
3. **本番環境モードで開始** を選択（後でルールを設定します）
4. ロケーションを選択（例: `asia-northeast1` (東京)）
5. **有効にする** をクリック

### 5. Firestoreセキュリティルールを設定

1. Firestore Databaseページの **ルール** タブをクリック
2. 以下のルールを設定（ユーザーは自分のデータのみ読み書き可能）:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/diaries/{diaryId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. **公開** をクリック

### 6. アプリにFirebase設定を追加

`app.js` の11〜18行目を編集:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

手順2でコピーした `firebaseConfig` の値を貼り付けてください。

### 7. 承認済みドメインを追加（GitHub Pages用）

1. Firebase Console > **Authentication** > **Settings** タブ
2. **承認済みドメイン** セクションで **ドメインを追加**
3. `dyki-ogawa.github.io` を追加

### 8. 動作確認

- ローカルサーバーを起動してブラウザで開く
- 右上のアイコンをクリック
- Googleログインポップアップが表示される
- Googleアカウントを選択してログイン
- 日記を書いて保存し、別のブラウザやデバイスでログインして同期を確認

## 機能

### カレンダービュー
- 月次カレンダー表示（横7列）
- 日記が記載済みの日付は青色でハイライト
- 今日の日付は青枠で表示
- 前月/次月への移動

### 日記編集
- 任意の日付をクリックして日記を編集
- テキストエリアで自由記述
- 保存/キャンセルボタン
- 1日につき1日記のみ

### キーボードショートカット
- **Esc** - モーダルを閉じる
- **Ctrl+S (Cmd+S)** - 日記を保存

## GitHub Pagesで公開する方法

### 手順

1. **GitHubリポジトリにアクセス**
   ```
   https://github.com/dyki-ogawa/dailyLog
   ```

2. **Settingsタブをクリック**

3. **左サイドバーの「Pages」をクリック**

4. **Source設定**
   - **Branch**: `claude/main-QKK4O` を選択
   - **Folder**: `/ (root)` を選択
   - **Save** ボタンをクリック

5. **数分待つ**
   - GitHub Pagesのビルドとデプロイには数分かかります
   - ページ上部に公開URLが表示されます

6. **アクセス**
   ```
   https://dyki-ogawa.github.io/dailyLog/
   ```

### 注意事項

- プライベートリポジトリの場合、GitHub Pagesを有効にするにはGitHub ProまたはGitHub Teamプランが必要です
- パブリックリポジトリの場合、無料で利用できます

## ローカルで実行

ブラウザで `index.html` を直接開くか、ローカルサーバーを起動：

```bash
# Python 3の場合
python3 -m http.server 8000

# Node.jsのhttpサーバーの場合
npx http-server
```

その後、ブラウザで `http://localhost:8000` にアクセス

## 技術スタック

- HTML5
- CSS3
- Vanilla JavaScript
- Firebase Authentication (Googleログイン)
- Cloud Firestore (データ保存・同期)

## ライセンス

MIT
