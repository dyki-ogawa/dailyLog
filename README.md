# 日記アプリ

「すぐ書ける、振り返りやすい」をコアとしたシンプルな日記アプリケーション

## 特徴

- 📅 カレンダー形式で日記を管理
- 💾 LocalStorageで自動保存
- 📱 レスポンシブデザイン対応
- ⚡ 起動時に今日の日記が自動で開く
- 🎨 日記記載済みの日付を視覚的に区別

## Google認証の設定

このアプリはGoogleアカウントでのログインが必要です。以下の手順でGoogle Cloud Consoleを設定してください。

### 1. Google Cloud Consoleでプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）

### 2. OAuth 2.0クライアントIDを作成

1. **APIとサービス** > **認証情報** に移動
2. **認証情報を作成** > **OAuth 2.0クライアントID** を選択
3. アプリケーションの種類: **ウェブアプリケーション** を選択
4. 名前: 任意の名前（例: 日記アプリ）
5. **承認済みのJavaScript生成元** に以下を追加:
   - `http://localhost:8000` (ローカル開発用)
   - `https://dyki-ogawa.github.io` (GitHub Pages用)
6. **承認済みのリダイレクトURI** は空欄でOK
7. **作成** をクリック
8. 表示されたクライアントIDをコピー

### 3. アプリにクライアントIDを設定

`app.js` の9行目を編集:

```javascript
const GOOGLE_CLIENT_ID = 'あなたのクライアントID.apps.googleusercontent.com';
```

コピーしたクライアントIDを貼り付けてください。

### 4. 動作確認

- ローカルサーバーを起動してブラウザで開く
- 右上のアイコンをクリック
- Googleログインプロンプトが表示される
- Googleアカウントを選択してログイン

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
- LocalStorage API
- Google Identity Services (認証)

## ライセンス

MIT
