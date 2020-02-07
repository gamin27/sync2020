
/** 画面の位置(y座標) */
let positionY = 0;
let el_mess_btn = document.getElementById('mess_btn');
let el_mess_screen = document.getElementById('mess_screen');
let el_curtain = document.getElementById('curtain');
let el_cancel_btn = document.getElementById('cancel_btn');
let el_sceen_footer = document.getElementById('screen_footer');
let el_trash_btn = document.getElementById('trash_btn');
let el_card__image = document.getElementsByClassName('card__image');
let el_img = document.querySelectorAll('.card__image img');
let list_card__image = Array.from(el_card__image);
let el_image_curtain = document.getElementById('image_curtain');
let el_add_img_btn = document.getElementById('add_img_btn');
let el_preview = document.getElementById('preview');
let el_img_clear = document.getElementById('img_clear');
let el_attached_img = document.getElementById('attached_img')
const active = 'active';
const notActive = 'notActive';
//読み込み時の処理
document.addEventListener('DOMContentLoaded', function() {


}, false);

//ダウンスクロール時の処理
window.addEventListener('scroll', function() {
  /**y座標位置 */
  let y = document.scrollingElement.scrollTop;  
  /** ヘッダー要素 */
  let cl_h = document.getElementsByClassName('sy-header');
  const fixed = 'fixed';
  const js_down = 'js_down';
  /** 固定を有効にしている高さ */
  const fixedHeight = 300;

  if (y <= positionY || y < fixedHeight) {
    cl_h[0].classList.add(fixed);
    mess_btn.classList.remove(js_down);
  } else {
    cl_h[0].classList.remove(fixed);
    mess_btn.classList.add(js_down);
  }
  //座標更新
  positionY = y;

}, false);


//メッセージボタン押下時
el_mess_btn.addEventListener('click', function() {
  el_mess_screen.classList.add(active);
  el_curtain.classList.add(active);
  el_curtain.classList.remove(notActive);
  el_sceen_footer.classList.add(active);

}, false);


//メッセージ画面のキャンセルボタン押下時
el_cancel_btn.addEventListener('click', function() {
  el_mess_screen.classList.remove(active);
  el_curtain.classList.remove(active);
  el_curtain.classList.add(notActive);
  el_sceen_footer.classList.remove(active);
}, false);

//投稿画像押下時
el_img.forEach(function(value, i){
  value.addEventListener('click', function() {
    value.classList.toggle(active);
    el_image_curtain.classList.toggle(active);
  });
});

//画像添付時
el_add_img_btn.addEventListener('change', function(event) {
  //input[type='file']で与えたファイルを代入
  let file = event.target.files[0];
  //画像が添付されていない場合、終了
  if (file == null) return;
  let reader = new FileReader();
  let el_preview_image = document.getElementById('preview_image');

  //既に画像が添付されている場合、その画像を削除
  if (el_preview_image != null) {
    el_preview.removeChild(el_preview_image);
  }

  //イベントの読み込みが成功した時
  reader.onload = function(event) {
    let img = document.createElement('img');
    img.src = reader.result;
    img.id = 'preview_image';
    el_preview.appendChild(img);
  };

  el_img_clear.classList.add(active);

  //ファイルを読み込む
  reader.readAsDataURL(file);
});


//画像クリアボタン押下時
el_img_clear.addEventListener('click', function() {
  el_img_clear.classList.remove(active);
  el_attached_img.value = '';
  el_preview.removeChild(document.getElementById('preview_image'));
});