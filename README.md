# Nespresso

:coffee: Nespresso膠囊口味手機版

## v2.0

用Vue.js重新寫了一版！並新增了直接掃描膠囊的功能！
（雖然顏色的辨識不太準（爆

原本用 [tracking.js](https://trackingjs.com/) 下去寫，

但後來發現效能不太好，再加上發現手機根本就無法用HTML5的webcam（QQ），
又換成 [node-vibrant](https://github.com/akfish/node-vibrant) 下去算顏色...

總之開發過程囧囧的，然後上線後實際用也囧囧的，一整個就是個囧囧的小玩具。（寫完還不想整理程式碼（。

後續還想要把它變成pwa，到時候再說吧（。

## v1.0

官方沒有手機版的膠囊口味，想說順便練習寫爬蟲來寫個手機版好了，不然要查很不方便。

因為我家通常的情境都是放一堆在架上然後隨便選一顆來煮，  
所以希望是能用顏色快速尋找這顆對應的口味。  
（但後來有點懶著寫所以就直接用input欄位ＸＤ）

尋找膠囊口味的主色是靠node的 `jimp` 和 `get-rgba-palette`來實現，  
但困難點是不知道基本色區（？）到底該怎麼定義好，  
所以最後算出來的顏色都有會和理想中有點差異ＸＤ  
最後乾脆直接人工定義（爆）  
（程式算出來的顏色是 `crawler/data.json`的版本，人工版本則是`dist/data.json`）

雖然這樣以後要更新就比較麻煩，不過爬蟲也是要我人工手動執行啦⋯⋯

## 爬蟲

爬蟲除了解析 HTML tag，這次主要是嘗試使用es7裡面的`async / await`來處理Promise物件，  
雖然用起來還怪生疏的，不過的確是能感受到他的好處。
(不用一直`then`覺得很開心)

### 執行爬蟲
```console
node --harmony-async-await crawler/crawler.js
```
