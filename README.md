# 日記アプリ

「すぐ書ける、振り返りやすい」をコアとしたシンプルな日記アプリケーション

## 特徴

- 📅 カレンダー形式で日記を管理
- 💾 LocalStorageで自動保存
- 📱 レスポンシブデザイン対応
- ⚡ 起動時に今日の日記が自動で開く
- 🎨 日記記載済みの日付を視覚的に区別

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
   - **Branch**: `claude/diary-calendar-app-QKK4O` を選択
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

## ライセンス

MIT
