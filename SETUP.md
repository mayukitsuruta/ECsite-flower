# 想い束 Omoi Bloom — セットアップ手順（MAMP）

フラワーECサイトのローカル環境構築手順です。

## 前提

- **MAMP** がインストール済み
- **Composer**（`composer` コマンド）
- **Node.js** 18 以上（`node` / `npm`）

## 1. MAMP を起動

1. MAMP アプリを開く
2. **Start** で Apache と MySQL を起動
3. ポート確認（デフォルト例）
   - Apache: `8888`
   - MySQL: `8889`

## 2. データベースの準備（MySQL を使う場合）

phpMyAdmin: `http://localhost:8888/phpMyAdmin/`

```sql
CREATE DATABASE flower_ec CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

`.env` を編集:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=8889
DB_DATABASE=flower_ec
DB_USERNAME=root
DB_PASSWORD=root
```

> MAMP の MySQL パスワードが空の場合は `DB_PASSWORD=` のままにしてください。

### SQLite のまま使う場合（簡易）

初期状態のまま `DB_CONNECTION=sqlite` でも動作します。  
`database/database.sqlite` が無ければ:

```bash
touch database/database.sqlite
```

## 3. ターミナルでプロジェクトセットアップ

```bash
cd /Applications/MAMP/htdocs/flower-ec
```

### PHP 依存関係（初回または composer.json 変更時）

```bash
composer install
```

MAMP の PHP を使う場合:

```bash
/Applications/MAMP/bin/php/php8.4.1/bin/php /usr/local/bin/composer install
```

### 環境ファイル

```bash
cp .env.example .env   # .env が無い場合のみ
php artisan key:generate
```

### マイグレーション＆サンプルデータ

```bash
php artisan migrate
php artisan db:seed
```

**デモログイン**

| 項目 | 値 |
|------|-----|
| メール | `demo@omoibloom.jp` |
| パスワード | `password` |

### フロントエンド

```bash
npm install
npm run build
```

開発中は別ターミナルで:

```bash
npm run dev
```

## 4. ブラウザでアクセス

### パターン A: MAMP の Document Root が `htdocs`

```
http://localhost:8888/flower-ec/public
```

### パターン B: 仮想ホスト（推奨）

MAMP → **Hosts** または `httpd-vhosts.conf` に例:

```apache
<VirtualHost *:8888>
    DocumentRoot "/Applications/MAMP/htdocs/flower-ec/public"
    ServerName flower-ec.local
</VirtualHost>
```

`/etc/hosts` に:

```
127.0.0.1 flower-ec.local
```

アクセス: `http://flower-ec.local:8888`

`.env` の `APP_URL` を実際の URL に合わせてください。

```env
APP_URL=http://localhost:8888/flower-ec/public
```

## 5. 開発用コマンド一覧

| コマンド | 説明 |
|----------|------|
| `php artisan migrate` | テーブル作成 |
| `php artisan migrate:fresh --seed` | DBリセット＋再シード |
| `php artisan db:seed` | 花データ・デモユーザーの投入 |
| `npm run dev` | Vite 開発サーバー（ホットリロード） |
| `npm run build` | 本番用アセットビルド |
| `php artisan serve` | PHP 内蔵サーバー（MAMP 不要の簡易確認用） |

内蔵サーバーの例:

```bash
php artisan serve
# → http://127.0.0.1:8000 （別途 npm run dev も推奨）
```

## 6. 実装済み機能

| 機能 | URL / 操作 |
|------|------------|
| トップ | `/` |
| 花一覧 | `/flowers` |
| 花詳細・花言葉 | `/flowers/{slug}` |
| 花束ビルダー | `/bouquet/builder` |
| カート | `/cart` |
| ログイン / 会員登録 | `/login` `/register` |
| 注文 | カート → ログイン → `/checkout` |
| 注文履歴 | `/orders` |

## 7. 今後追加予定（未実装）

- お気に入り
- AI おすすめ
- 花束シミュレーション（3D プレビュー等）
- レビュー
- 管理画面
- 季節おすすめの自動切替（現状はシードの `is_seasonal` フラグで表示）

## 8. トラブルシューティング

### 画面が真っ白 / CSS が効かない

```bash
npm run build
php artisan config:clear
php artisan view:clear
```

### Vite 開発時

`npm run dev` を起動した状態でアクセスしてください。

### マイグレーションエラー

MySQL 接続情報（ポート・パスワード）を再確認。

```bash
php artisan migrate:status
```

### 権限エラー（storage）

```bash
chmod -R 775 storage bootstrap/cache
```

## 9. プロジェクト構成（概要）

```
app/
  Http/Controllers/   # 花・カート・注文・花束ビルダー
  Models/             # Flower, CartItem, Order, OrderItem
  Services/           # CartService
database/
  migrations/         # flowers, cart_items, orders, order_items
  seeders/            # FlowerSeeder（サンプル花12種）
resources/js/Pages/   # React（Inertia）画面
routes/web.php        # ルート定義
```

---

ご不明点があれば、エラーメッセージ全文と `.env` の DB 設定（パスワード除く）を共有してください。
