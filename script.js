(function () {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cart counter: call addToCart() from your "Add to cart" buttons
  let cartItems = 0;
  const cartCount = document.getElementById('cartCount');
  window.addToCart = function (qty = 1) {
    cartItems += qty;
    cartCount.textContent = cartItems;
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
  };
  document.getElementById('cartBtn').addEventListener('click', () => {
    // Replace with your cart page, e.g. window.location.href = 'cart.html';
    alert('You have ' + cartItems + ' item(s) in your cart.');
  });
})();

/* =====================  CAROUSEL SCRIPT  ===================== */
(function () {
  const slidesEl = document.getElementById('slides');
  const slides = Array.from(slidesEl.children);
  const dotsEl = document.getElementById('dots');
  const progress = document.getElementById('progress');
  const hero = document.querySelector('.hero');
  const DELAY = 5000; // 5 seconds per slide
  let index = 0, timer = null, paused = false;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.type = 'button';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', () => { goTo(i); restart(); });
    dotsEl.appendChild(d);
  });
  const dots = Array.from(dotsEl.children);

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    slidesEl.style.transform = 'translateX(-' + index * 100 + '%)';
    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    dots.forEach((d, n) => d.classList.toggle('active', n === index));
  }

  function runProgress() {
    progress.style.transition = 'none';
    progress.style.width = '0';
    void progress.offsetWidth;
    progress.style.transition = 'width ' + DELAY + 'ms linear';
    progress.style.width = '100%';
  }
  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearTimeout(timer);
    runProgress();
    timer = setTimeout(() => { goTo(index + 1); start(); }, DELAY);
  }
  function stop() {
    clearTimeout(timer);
    progress.style.transition = 'none';
    progress.style.width = '0';
  }
  function restart() { if (!paused) start(); }

  document.getElementById('next').addEventListener('click', () => { goTo(index + 1); restart(); });
  document.getElementById('prev').addEventListener('click', () => { goTo(index - 1); restart(); });

  hero.addEventListener('mouseenter', () => { paused = true; stop(); });
  hero.addEventListener('mouseleave', () => { paused = false; start(); });
  hero.addEventListener('focusin', () => { paused = true; stop(); });
  hero.addEventListener('focusout', () => { paused = false; start(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { goTo(index + 1); restart(); }
    if (e.key === 'ArrowLeft')  { goTo(index - 1); restart(); }
  });

  let x0 = null;
  hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { goTo(index + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  });

  document.addEventListener('visibilitychange', () => { document.hidden ? stop() : (!paused && start()); });

  goTo(0);
  start();
})();

/* =====================  FOOTER SCRIPT  ===================== */
(function () {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('toTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =====================  PRODUCT CATALOG  ===================== */
(function () {
  // Edit this list to change categories and items. icon = emoji shown on the card.
  const catalog = [
    { id: 'services', title: 'Services', tint: '#e8f0ff', items: [
      { icon: '📝', name: 'Online Form Filling', price: 50, unit: 'per form', desc: 'Job, exam, scholarship and government forms filled with care.' },
      { icon: '🖨️', name: 'Colour Printout', price: 10, unit: 'per page', desc: 'Sharp A4 colour printing on good quality paper.' },
      { icon: '📄', name: 'Xerox / Photocopy', price: 2, unit: 'per page', desc: 'Fast black and white photocopies, bulk rates available.' },
      { icon: '📷', name: 'Passport Size Photos', price: 60, unit: '8 photos', desc: 'Ready in 10 minutes for passport, Aadhaar and exam forms.' }
    ]},
    { id: 'mobile', title: 'Mobile Accessories', tint: '#e9f7ec', items: [
      { icon: '🔌', name: 'Fast Charger 20W', price: 399, desc: 'Fast wall charger with overheat protection. Fits most phones.' },
      { icon: '🎧', name: 'Wired Earphones', price: 149, desc: 'Clear sound with mic and a tangle-free cable.' },
      { icon: '🔋', name: 'Power Bank 10000mAh', price: 899, desc: 'Charges a phone about two times. Dual USB output.' },
      { icon: '📱', name: 'Tempered Glass', price: 99, desc: 'Scratch-proof screen guard. Tell us your phone model.' }
    ]},
    { id: 'stationery', title: 'Stationery', tint: '#fff4e5', items: [
      { icon: '🖊️', name: 'Gel Pen Set (10 pcs)', price: 80, desc: 'Smooth writing blue gel pens, perfect for school and office.' },
      { icon: '📓', name: 'Spiral Notebook', price: 60, desc: '200 pages, ruled, with a hard cover.' },
      { icon: '📎', name: 'File Folder Pack', price: 120, desc: 'Pack of 5 plastic folders for keeping documents safe.' },
      { icon: '✏️', name: 'Geometry Box', price: 110, desc: 'Complete set with compass, divider, scale and protractor.' }
    ]},
    { id: 'watches', title: 'Watches', tint: '#f3ecff', items: [
      { icon: '⌚', name: 'Digital Sports Watch', price: 599, desc: 'Water resistant with alarm, stopwatch and backlight.' },
      { icon: '🕰️', name: 'Classic Analog Watch', price: 799, desc: 'Steel strap with a simple dial for everyday wear.' },
      { icon: '⏱️', name: 'Kids Cartoon Watch', price: 299, desc: 'Bright, soft strap that is easy for kids to read.' },
      { icon: '📟', name: 'Smart Fitness Band', price: 1499, desc: 'Counts steps and heart rate. Up to 7 days battery.' }
    ]},
    { id: 'misc', title: 'Miscellaneous', tint: '#ffeaea', items: [
      { icon: '💾', name: 'Pen Drive 32GB', price: 349, desc: 'USB 3.0 flash drive for fast file transfer.' },
      { icon: '🖱️', name: 'Wireless Mouse', price: 449, desc: 'Comfortable grip with a long-lasting battery.' },
      { icon: '🧾', name: 'Lamination (A4)', price: 15, unit: 'per sheet', desc: 'Protect certificates and ID cards from damage.' },
      { icon: '🎁', name: 'Gift Wrap Pack', price: 99, desc: 'Wrapping paper, ribbon and tags for 5 gifts.' }
    ]}
  ];

  const root = document.getElementById('catalog');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // Build the page from the data
  catalog.forEach(cat => {
    const sec = document.createElement('section');
    sec.className = 'category';
    sec.id = cat.id;
    sec.style.setProperty('--tint', cat.tint);
    sec.innerHTML =
      '<div class="category-head"><h3>' + cat.title + '</h3><small>' + cat.items.length + ' items</small></div>' +
      '<div class="grid">' +
      cat.items.map(it =>
        '<article class="card">' +
          '<div class="card-img" aria-hidden="true">' + it.icon + '</div>' +
          '<div class="card-body">' +
            '<h4>' + it.name + '</h4>' +
            '<p>' + it.desc + '</p>' +
            '<div class="card-foot">' +
              '<span class="price">₹' + it.price + (it.unit ? ' <small>' + it.unit + '</small>' : '') + '</span>' +
              '<button class="add-btn" type="button" data-name="' + it.name + '">Add to cart</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      ).join('') +
      '</div>';
    root.appendChild(sec);
  });

  // One click handler for all Add to cart buttons
  root.addEventListener('click', e => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    window.addToCart(1);                       // updates the counter in the header
    showToast(btn.dataset.name + ' added to cart');
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to cart'; btn.classList.remove('added'); }, 1200);
  });
})();