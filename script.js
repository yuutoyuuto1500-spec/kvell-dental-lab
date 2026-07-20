/*
  Kvell dental lab スクリプト ver.1
  ================================================
  【このファイルの役割】
  JavaScript は「動き」を付けるファイルです。ここでは2つだけ実装しています。
  1. スクロールすると各セクションがふわっと浮かび上がる演出
  2. スマホでメニューボタン（三本線）を押すとナビが開閉する
*/

/* ---- 1. スクロールで浮かび上がる演出 ----
   IntersectionObserver は「要素が画面内に入ったか」を監視する仕組み。
   画面に入ったら .visible クラスを付け、style.css 側でふわっと表示させる */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 一度表示したら監視をやめる
      }
    });
  },
  { threshold: 0.15 } // 要素の15%が見えたタイミングで発動
);

// class="fade-in" が付いた要素すべてを監視対象にする
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

/* ---- 2. スマホ用メニューの開閉 ---- */
const toggleButton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".header-nav");

toggleButton.addEventListener("click", () => {
  nav.classList.toggle("open"); // .open を付けたり外したりして開閉
});

// メニュー内のリンクを押したら自動で閉じる（スマホで押した後に邪魔にならないように）
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});
