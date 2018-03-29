# install & start

``````
  npm install
  npm start
``````
# 説明


だいたい題名通り
他は、package.json

# Redux的なとこ

* 非同期actionは、とりあえずthunk
    * sagaやredux-observableのほうが良いのはわかるが非常にリッチでとまどう。

* samle3がmodelレイヤーを採用
    * reducerとselectorのシンプルさをsamle2と比べる
    * Typescriptの場合、immutable.jsを実質実現できる。

* ダムのために、Containerを採用
    * それ以外はStateless Function Components(SFC)にしてみた。
    * bindCreatersは、公式否定なので不採用
        * せっかくのSFCなので、actionに依存しない。