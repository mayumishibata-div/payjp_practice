const pay = () => {
  const publicKey = gon.public_key
  const payjp = Payjp(publicKey) // PAY.JPテスト公開鍵
  const elements = payjp.elements();  //入力の部品を作る準備
  const numberElement = elements.create('cardNumber'); //「カード番号」を入力する場所の部品を作る
  const expiryElement = elements.create('cardExpiry'); //「カードの有効期限」を入力する場所の部品を作る
  const cvcElement = elements.create('cardCvc');  //「CVC」という番号を入力する場所を作る

  numberElement.mount('#number-form');//#number-form」という部分にくっつける
  expiryElement.mount('#expiry-form');//「#expiry-form」という部分にくっつけているよ。
  cvcElement.mount('#cvc-form');//「#cvc-form」というところにくっつけているんだ。
  const form = document.getElementById('charge-form')
  form.addEventListener("submit", (e) => {
    //ユーザーが入力したカード情報から、安全に使える「トークン」という特別な数字を作るためのコード
    payjp.createToken(numberElement).then(function (response) {
       //createToken の処理が終わった後、結果（response）が返ってきたときに実行される部分
      if (response.error) {
        //エラーがあったら
      } else {
        // エラーがなかったら
        const token = response.id;
        const renderDom = document.getElementById("charge-form"); //charge-form」という名前のHTML要素を見つけて、それを renderDom という変数に保存
        const tokenObj = `<input value=${token} name='token' type="hidden">`; //トークンを含む新しいHTMLの入力フィールドを作成
        renderDom.insertAdjacentHTML("beforeend", tokenObj);  //フォームの一番下に新しいトークンの入力フィールドを追加（tokenObj（新しい入力フィールド）を、renderDom（つまり「charge-form」要素）の中に追加。「beforeend」は、要素の最後の部分に追加することを指す）
        // debugger; //デバッグ用の特別な命令
      }
      // カード情報を入力するためのフィールドをすべて空にするための記述
      numberElement.clear();
      expiryElement.clear();
      cvcElement.clear();
      document.getElementById("charge-form").submit();
    });

    console.log("フォーム送信時にイベント発火")
    e.preventDefault();
    // e.preventDefault();で通常のRuby on Railsにおけるフォーム送信処理はキャンセルされています。
  });
};

window.addEventListener("turbo:load", pay);
window.addEventListener("turbo:render", pay);//renderがされてもJsのコードが実行される