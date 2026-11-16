/* Баннер cookie для статических страниц (лендинг, оферта, политика).
   Выбор хранится в localStorage, повторно баннер не показывается. */
(function () {
  var KEY = 'cl-cookie-consent';
  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) {
    /* приватный режим: покажем один раз за сессию */
  }

  function render() {
    var box = document.createElement('div');
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Использование файлов cookie');
    box.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:90',
      'background:#fff', 'border-top:1px solid #e7e5ea',
      'box-shadow:0 -12px 32px -24px rgba(16,8,30,.6)',
      'font-family:Inter,system-ui,-apple-system,sans-serif',
    ].join(';');

    var inner = document.createElement('div');
    inner.style.cssText = [
      'max-width:1120px', 'margin:0 auto', 'padding:12px 20px',
      'display:flex', 'gap:14px', 'align-items:center', 'flex-wrap:wrap',
    ].join(';');

    var text = document.createElement('p');
    text.style.cssText = 'margin:0;font-size:12.5px;line-height:1.55;color:#6d6b76;flex:1 1 320px;';
    text.innerHTML =
      'Мы используем файлы cookie для корректной работы сервиса записи. Продолжая пользоваться сайтом, ' +
      'вы соглашаетесь с <a href="/privacy/" style="color:#e6007e;text-decoration:underline">Политикой обработки персональных данных</a>.';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Понятно';
    btn.style.cssText = [
      'border:0', 'border-radius:10px', 'background:#e6007e', 'color:#fff',
      'font:inherit', 'font-size:13.5px', 'font-weight:600', 'padding:10px 20px',
      'cursor:pointer', 'white-space:nowrap',
    ].join(';');
    btn.addEventListener('click', function () {
      try {
        localStorage.setItem(KEY, new Date().toISOString());
      } catch (e) {
        /* ignore */
      }
      box.remove();
    });

    inner.appendChild(text);
    inner.appendChild(btn);
    box.appendChild(inner);
    document.body.appendChild(box);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
