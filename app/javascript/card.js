const pay = () => {
  const payjp = Payjp('pk_test_***********************')// PAY.JPテスト公開鍵
  const elements = payjp.elements();  //入力の部品を作る準備
  const numberElement = elements.create('cardNumber'); //「カード番号」を入力する場所の部品を作る
  const expiryElement = elements.create('cardExpiry'); //「カードの有効期限」を入力する場所の部品を作る
  const cvcElement = elements.create('cardCvc');  //「CVC」という番号を入力する場所を作る

  numberElement.mount('#number-form');//#number-form」という部分にくっつける
  expiryElement.mount('#expiry-form');//「#expiry-form」という部分にくっつけているよ。
  cvcElement.mount('#cvc-form');//「#cvc-form」というところにくっつけているんだ。
  const form = document.getElementById('charge-form')
  form.addEventListener("submit", (e) => {
    console.log("フォーム送信時にイベント発火")
    e.preventDefault();
    // e.preventDefault();で通常のRuby on Railsにおけるフォーム送信処理はキャンセルされています。
  });
};

window.addEventListener("turbo:load", pay);