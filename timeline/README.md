# TimelineJSを用いた年表表示カスタマイズ

　別レポジトリで公開している[「**Timeline**」](https://github.com/yamaryu0508/kintone-JS/tree/master/timeline)（kintoneアプリ）からデータ連携・公開しているkViewerの画面をkintoneアプリと同様にTimelineJSを用いて年表表示するカスタマイズ例です。

## 画面例（一覧画面）
![kviewer](image/kviewerImage.png)
　サンプルページは[こちら](https://viewer.kintoneapp.com/public/index-view/90?viewCode=e2d482b02c766a6674f166e2e0c95fa642b1106d)

## インストール
JavaScriptファイルをkViewerの設定画面からアップロードしてください。なお、本カスタマイズではDOMから値を取得しており、次の項目名が一覧画面のカスタマイズのために必要です。

| 項目名 | 概要 |
|:------------:|:------------:|
| Headline (title) | タイトル |
| Tag | タグ（トピックのカテゴライズ） |
| Start date | 開始年月日 |
| End date | 終了年月日 |
| Media URL | YouTube等タイムラインに加えるメディア |

## ライセンス
MIT license