const pay = () => {
  const payjp = Payjp('pk_test_***********************')// PAY.JPテスト公開鍵
  const form = document.getElementById('charge-form')
  form.addEventListener("submit", (e) => {
    console.log("フォーム送信時にイベント発火")
    e.preventDefault();
    // e.preventDefault();で通常のRuby on Railsにおけるフォーム送信処理はキャンセルされています。
  });
};

window.addEventListener("turbo:load", pay);