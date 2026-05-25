# Force Chrome to Microsoft Edge

[![Version](https://img.shields.io/badge/version-1.0.0-2ea44f.svg)](./manifest.json)
[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4.svg)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Google ChromeのアクセスをMicrosoft Edgeとして送信するManifest V3拡張

## できること

- ページ内JavaScriptから見える`navigator`をMicrosoft Edgeとして上書き
- 実行中のChromeバージョンを元にEdgeを生成し、ヘッダーとページ内のバージョン差異を抑えます

## インストール手順

1. Chromeで`chrome://extensions/`を開きます
2. 右上の「デベロッパー モード」をオンにします
3. 「パッケージ化されていない拡張機能を読み込む」を押します
4. このフォルダーを選択します
5. 対象ページを開き直します


ネットワーク送信ヘッダーはDevToolsのNetworkタブでリロード後に確認できます

## 注意点

- `chrome://`、Chrome ウェブストア、拡張機能ページなど一部の保護ページではコンテンツスクリプトが動作しません
- ページ内の上書きは拡張URLの`script`タグを挿入せず、Manifest V3のMAIN worldコンテンツスクリプトとして実行します
- 検証処理との衝突を避けるため、`chatgpt.com`、`openai.com`、`cloudflare.com`、`hcaptcha.com`配下では上書きを自動停止します
- BOT検証の回避を目的としたものではありません。場合によっては、上書きによって検証が失敗することがあります
- サイト側がTLS指紋、WebGL、拡張機能検知など、完全にMicrosoft Edgeとして扱われないことがあります

## License

MIT License