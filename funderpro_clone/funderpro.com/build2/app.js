/* ═══════════════════════════════════════════════════════════════
   FunderPro Integrations Dashboard SPA — app.js
   Nova design system · oklch neutral · DM Sans · Groq AI
   Covers: Login, Signup, Dashboard, Assets, Trade, Advanced Trade,
   Portfolio, Settings, Notifications, Transfers, Payment Methods,
   Price, Explore, Learn, Profile, Security, Account
═══════════════════════════════════════════════════════════════ */

'use strict';

// ─── Crypto Data ─────────────────────────────────────────────────────────────

const CRYPTOS = [
  { id:'btc',  name:'Bitcoin',      ticker:'BTC',  price:94512.40,  change:2.34,  mktcap:'$1.87T', color:'#F7931A', icon:'₿', held:0.2541,  avgBuy:62000 },
  { id:'eth',  name:'Ethereum',     ticker:'ETH',  price:3421.80,   change:1.82,  mktcap:'$411B',  color:'#627EEA', icon:'Ξ', held:1.8200,  avgBuy:2800  },
  { id:'sol',  name:'Solana',       ticker:'SOL',  price:198.40,    change:4.21,  mktcap:'$93B',   color:'#9945FF', icon:'◎', held:12.000,  avgBuy:140   },
  { id:'xrp',  name:'XRP',          ticker:'XRP',  price:2.41,      change:3.12,  mktcap:'$138B',  color:'#00AAE4', icon:'✕', held:520.00,  avgBuy:1.80  },
  { id:'bnb',  name:'BNB',          ticker:'BNB',  price:412.30,    change:-0.84, mktcap:'$58B',   color:'#F3BA2F', icon:'B', held:2.500,   avgBuy:380   },
  { id:'usdc', name:'USD Coin',     ticker:'USDC', price:1.00,      change:0.01,  mktcap:'$43B',   color:'#2775CA', icon:'$', held:1000.00, avgBuy:1.00  },
  { id:'doge', name:'Dogecoin',     ticker:'DOGE', price:0.1852,    change:1.24,  mktcap:'$27B',   color:'#C2A633', icon:'Ð', held:8500.0,  avgBuy:0.12  },
  { id:'ada',  name:'Cardano',      ticker:'ADA',  price:0.7840,    change:-1.42, mktcap:'$27B',   color:'#0033AD', icon:'₳', held:2000.0,  avgBuy:0.65  },
  { id:'avax', name:'Avalanche',    ticker:'AVAX', price:38.92,     change:5.61,  mktcap:'$16B',   color:'#E84142', icon:'A', held:45.00,   avgBuy:30    },
  { id:'dot',  name:'Polkadot',     ticker:'DOT',  price:7.84,      change:-2.10, mktcap:'$11B',   color:'#E6007A', icon:'●', held:120.00,  avgBuy:9.50  },
  { id:'link', name:'Chainlink',    ticker:'LINK', price:18.72,     change:3.40,  mktcap:'$11B',   color:'#2A5ADA', icon:'⬡', held:80.00,   avgBuy:15    },
  { id:'matic',name:'Polygon',      ticker:'POL',  price:0.4820,    change:-0.92, mktcap:'$5B',    color:'#8247E5', icon:'M', held:3000.0,  avgBuy:0.55  },
];

const PORTFOLIO_VALUE = 24847.32;
const PORTFOLIO_CHANGE = 412.18;
const PORTFOLIO_CHANGE_PCT = 1.68;

function fmt(n, decimals=2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
function fmtUSD(n) {
  if (n >= 1e12) return '$' + fmt(n/1e12,2) + 'T';
  if (n >= 1e9) return '$' + fmt(n/1e9,2) + 'B';
  if (n >= 1e6) return '$' + fmt(n/1e6,2) + 'M';
  return '$' + fmt(n, n < 10 ? 4 : 2);
}
function fmtPrice(n) {
  if (n >= 1000) return '$' + fmt(n, 2);
  if (n >= 1) return '$' + fmt(n, 4);
  return '$' + fmt(n, 6);
}
function changeClass(n) { return n >= 0 ? 'change-up' : 'change-down'; }
function changeStr(n) { return (n >= 0 ? '+' : '') + fmt(n, 2) + '%'; }

// ─── Auth ─────────────────────────────────────────────────────────────────────

const Auth = {
  isLoggedIn() { return localStorage.getItem('mx_auth') === '1'; },
  login(email, name) {
    localStorage.setItem('mx_auth', '1');
    localStorage.setItem('mx_user', JSON.stringify({ email, name: name || email.split('@')[0] }));
  },
  logout() {
    localStorage.removeItem('mx_auth');
    localStorage.removeItem('mx_user');
  },
  getUser() {
    try { return JSON.parse(localStorage.getItem('mx_user') || '{}'); } catch { return {}; }
  }
};

// ─── Router ───────────────────────────────────────────────────────────────────

const Router = {
  BASE: '/build2',
  routes: {},
  current: null,

  register(path, handler) { this.routes[path] = handler; },

  init() {
    window.addEventListener('popstate', () => this.resolve());
    this.resolve();
  },

  navigate(path, pushState=true) {
    const full = this.BASE + path;
    if (pushState) history.pushState({}, '', full);
    this.resolve();
  },

  resolve() {
    let path = location.pathname;
    if (path.startsWith(this.BASE)) path = path.slice(this.BASE.length) || '/';
    if (!path.startsWith('/')) path = '/' + path;
    // strip trailing slash except root
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    this.current = path;

    // Auth guard
    const publicRoutes = ['/login', '/signup'];
    if (!Auth.isLoggedIn() && !publicRoutes.includes(path)) {
      return this.navigate('/login', true);
    }
    if (Auth.isLoggedIn() && publicRoutes.includes(path)) {
      return this.navigate('/dashboard', true);
    }

    const handler = this.routes[path] || this.routes['*'];
    if (handler) handler(path);
  }
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const I = {
  home:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  asset:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 0 1 0 4H9zm0 4h5a2 2 0 0 1 0 4H9z"/><line x1="9" y1="8" x2="9" y2="16"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>`,
  trade:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  adv:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 16l3-4 3 3 3-5"/></svg>`,
  portfolio:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  price:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  explore:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  learn:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  notif:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  transfer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  payment:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  profile:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  security: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  logout:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  search:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  sun:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  menu:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  arrow_up: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>`,
  arrow_dn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>`,
  send:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  receive:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 14l-5 5-5-5"/></svg>`,
  buy:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  convert:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 8 16 13"/><line x1="3" y1="8" x2="21" y2="8"/><polyline points="8 21 3 16 8 11"/><line x1="21" y1="16" x2="3" y2="16"/></svg>`,
  check:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  key:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`,
  shield:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  eye:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  copy:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  account:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
};

// ─── Layout Builder ───────────────────────────────────────────────────────────

function navItem(route, iconKey, label, badge='') {
  const active = Router.current === route;
  return `<div class="nav-item${active?' active':''}" data-route="${route}">
    ${I[iconKey]}<span>${label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ''}
  </div>`;
}

function buildLayout(title, content) {
  const user = Auth.getUser();
  const initials = (user.name||'U').substring(0,2).toUpperCase();

  const html = `
  <div class="app-layout">
    <div class="overlay" id="overlay"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">FunderPro<span>Pro</span></div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Overview</div>
        ${navItem('/dashboard','home','Dashboard')}
        ${navItem('/assets','asset','Assets')}
        ${navItem('/portfolio','portfolio','Portfolio')}
        <div class="nav-section-label" style="margin-top:8px">Trade</div>
        ${navItem('/trade','trade','Trade')}
        ${navItem('/advanced-trade','adv','Advanced Trade')}
        ${navItem('/price','price','Prices')}
        <div class="nav-section-label" style="margin-top:8px">Finance</div>
        ${navItem('/transfers','transfer','Transfers')}
        ${navItem('/payment_methods','payment','Payment Methods')}
        <div class="nav-section-label" style="margin-top:8px">Discover</div>
        ${navItem('/explore','explore','Explore')}
        ${navItem('/learn','learn','Learn')}
        <div class="nav-section-label" style="margin-top:8px">Account</div>
        ${navItem('/notifications','notif','Notifications','3')}
        ${navItem('/profile','profile','Profile')}
        ${navItem('/security','security','Security')}
        ${navItem('/settings','settings','Settings')}
        ${navItem('/account','account','Account')}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user" id="sidebar-logout-btn">
          <div class="user-avatar">${initials}</div>
          <div class="user-info">
            <div class="user-name">${user.name||'User'}</div>
            <div class="user-email">${user.email||''}</div>
          </div>
          ${I.logout}
        </div>
      </div>
    </aside>
    <div class="main-content">
      <header class="topbar">
        <button class="hamburger-btn" id="hamburger">${I.menu}</button>
        <div class="topbar-title">${title}</div>
        <div class="topbar-search">
          ${I.search}
          <input type="text" placeholder="Search assets…" />
        </div>
        <div class="topbar-actions">
          <div class="topbar-btn notif-dot" data-route="/notifications">${I.notif}</div>
          <div class="topbar-btn" data-route="/settings">${I.settings}</div>
        </div>
      </header>
      <div class="page-content">
        ${content}
      </div>
    </div>
  </div>`;
  return html;
}

// ─── Render helper ────────────────────────────────────────────────────────────

function render(html) {
  document.getElementById('app').innerHTML = html;
  bindCommonEvents();
}

// ─── Toast Notifications ──────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  let container = document.getElementById('mx-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'mx-toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `mx-toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function bindCommonEvents() {
  // Nav items
  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', () => Router.navigate(el.dataset.route));
  });
  // Hamburger
  const ham = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (ham && sidebar) {
    ham.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay && overlay.classList.toggle('open');
    });
  }
  if (overlay && sidebar) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('open');
    });
  }
  // Logout
  const logoutBtn = document.getElementById('sidebar-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => { Auth.logout(); Router.navigate('/login'); });
  }
  // Toggles
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('on'));
  });
  // Search bar — filter watchlist/table rows if any
  const searchInput = document.querySelector('.topbar-search input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('.asset-table tbody tr, .watchlist-item, .price-card').forEach(row => {
        row.style.display = (!q || row.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }
  // Mount MX AI chat widget on authenticated pages
  if (Auth.isLoggedIn()) {
    requestAnimationFrame(() => MXChat.init());
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE COMPONENTS
// ═══════════════════════════════════════════════════════════════

// ─── Login ────────────────────────────────────────────────────────────────────
function pageLogin() {
  render(`
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">FunderPro<span>Pro</span></div>
      <div class="auth-subtitle">The Future of Decentralized Multi-Asset Investing</div>
      <h2>Sign in to your account</h2>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" id="login-email" placeholder="you@example.com" />
      </div>
      <div class="form-group">
        <label style="display:flex;justify-content:space-between;">
          Password <a href="#" style="color:var(--brand);font-size:12px;">Forgot?</a>
        </label>
        <input type="password" id="login-pass" placeholder="••••••••" />
      </div>
      <button class="btn-primary" id="login-btn">Sign In</button>
      <div class="auth-divider">or</div>
      <button class="btn-outline" id="google-btn">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <div class="auth-switch">Don't have an account? <a id="go-signup" href="#">Sign up</a></div>
    </div>
  </div>`);

  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value.trim() || 'investor@funderpro.io';
    Auth.login(email);
    Router.navigate('/dashboard');
  });
  document.getElementById('go-signup').addEventListener('click', e => { e.preventDefault(); Router.navigate('/signup'); });
  document.getElementById('google-btn').addEventListener('click', () => { Auth.login('investor@funderpro.io', 'Investor'); Router.navigate('/dashboard'); });
  document.getElementById('login-email').addEventListener('keydown', e => { if(e.key==='Enter') document.getElementById('login-btn').click(); });
  document.getElementById('login-pass').addEventListener('keydown', e => { if(e.key==='Enter') document.getElementById('login-btn').click(); });
}

// ─── Signup ───────────────────────────────────────────────────────────────────
function pageSignup() {
  render(`
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-logo">FunderPro<span>Pro</span></div>
      <div class="auth-subtitle">Join 2.4M+ investors worldwide</div>
      <h2>Create your account</h2>
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="signup-name" placeholder="Stephanie Diomin" />
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" id="signup-email" placeholder="you@example.com" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="signup-pass" placeholder="Min. 8 characters" />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" id="signup-pass2" placeholder="Confirm password" />
      </div>
      <button class="btn-primary" id="signup-btn">Create Account</button>
      <div class="auth-divider">or</div>
      <button class="btn-outline" id="google-signup">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <div class="auth-terms">By creating an account you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</div>
      <div class="auth-switch">Already have an account? <a id="go-login" href="#">Sign in</a></div>
    </div>
  </div>`);

  document.getElementById('signup-btn').addEventListener('click', () => {
    const name = document.getElementById('signup-name').value.trim() || 'Investor';
    const email = document.getElementById('signup-email').value.trim() || 'investor@funderpro.io';
    Auth.login(email, name);
    Router.navigate('/dashboard');
  });
  document.getElementById('go-login').addEventListener('click', e => { e.preventDefault(); Router.navigate('/login'); });
  document.getElementById('google-signup').addEventListener('click', () => { Auth.login('investor@funderpro.io','Investor'); Router.navigate('/dashboard'); });
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function pageDashboard() {
  const top5 = CRYPTOS.slice(0,5);
  const watchlistHTML = top5.map(c => `
    <div class="watchlist-item" data-route="/trade">
      <div class="asset-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</div>
      <div class="watchlist-info">
        <div class="watchlist-name">${c.name}</div>
        <div class="watchlist-ticker">${c.ticker}</div>
      </div>
      <div class="watchlist-price">
        <div class="watchlist-price-val">${fmtPrice(c.price)}</div>
        <div class="stat-change ${c.change>=0?'up':'down'}" style="justify-content:flex-end;margin-top:2px;font-size:11px">${changeStr(c.change)}</div>
      </div>
    </div>`).join('');

  const recentTx = [
    { icon:'📈', name:'Bought Bitcoin', date:'May 10, 2026', val:'+0.0042 BTC', usd:'+$397.00', color:'var(--brand)' },
    { icon:'💰', name:'Sold Ethereum', date:'May 9, 2026', val:'-0.5 ETH', usd:'+$1,710.90', color:'var(--brand)' },
    { icon:'📤', name:'Sent USDC', date:'May 8, 2026', val:'-250 USDC', usd:'-$250.00', color:'var(--red)' },
    { icon:'📥', name:'Received SOL', date:'May 7, 2026', val:'+5.00 SOL', usd:'+$992.00', color:'var(--brand)' },
  ];
  const txHTML = recentTx.map(t => `
    <div class="tx-item">
      <div class="tx-icon" style="background:var(--bg3);font-size:18px">${t.icon}</div>
      <div class="tx-info">
        <div class="tx-name">${t.name}</div>
        <div class="tx-date">${t.date}</div>
      </div>
      <div class="tx-amount">
        <div class="tx-val" style="color:${t.color}">${t.val}</div>
        <div class="tx-usd">${t.usd}</div>
      </div>
    </div>`).join('');

  const content = `
  <div class="page-header">
    <h1>Good morning 👋</h1>
    <p>Here's what's happening with your portfolio today.</p>
  </div>

  <div class="stats-grid">
    <div class="stat-card" style="background:linear-gradient(135deg,rgba(0,226,122,0.15),rgba(0,226,122,0.05));border-color:rgba(0,226,122,0.25)">
      <div class="stat-label">Total Portfolio</div>
      <div class="stat-value">$${fmt(PORTFOLIO_VALUE)}</div>
      <div class="stat-change up">${I.arrow_up}+$${fmt(PORTFOLIO_CHANGE)} (+${fmt(PORTFOLIO_CHANGE_PCT)}%) today</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Total Invested</div>
      <div class="stat-value">$18,240.00</div>
      <div class="stat-change up">${I.arrow_up}+36.2% all time</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Unrealized P&L</div>
      <div class="stat-value" style="color:var(--brand)">+$6,607.32</div>
      <div class="stat-change up">+36.2% return</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">24h Volume</div>
      <div class="stat-value">$2,841.00</div>
      <div class="stat-change up">4 trades today</div>
    </div>
  </div>

  <div class="quick-actions">
    <button class="qa-btn primary-qa" data-route="/trade">${I.buy} Buy</button>
    <button class="qa-btn" data-route="/trade">${I.trade} Sell</button>
    <button class="qa-btn" data-route="/transfers">${I.send} Send</button>
    <button class="qa-btn" data-route="/transfers">${I.receive} Receive</button>
    <button class="qa-btn" data-route="/trade">${I.convert} Convert</button>
  </div>

  <div class="dash-grid">
    <div class="card card-pad">
      <div class="section-header">
        <h3>Portfolio Performance</h3>
        <div class="chart-tabs">
          <button class="chart-tab active" data-range="1D">1D</button>
          <button class="chart-tab" data-range="1W">1W</button>
          <button class="chart-tab" data-range="1M">1M</button>
          <button class="chart-tab" data-range="3M">3M</button>
          <button class="chart-tab" data-range="1Y">1Y</button>
        </div>
      </div>
      <div class="chart-wrap">
        <canvas id="dashChart"></canvas>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:20px">
      <div class="card card-pad">
        <div class="section-header">
          <h3>Watchlist</h3>
          <span class="see-all" data-route="/price">See all</span>
        </div>
        ${watchlistHTML}
      </div>
    </div>
  </div>

  <div style="margin-top:20px">
    <div class="card card-pad">
      <div class="section-header">
        <h3>Recent Transactions</h3>
        <span class="see-all" data-route="/transfers">View all</span>
      </div>
      <div class="tx-list">${txHTML}</div>
    </div>
  </div>`;

  render(buildLayout('Dashboard', content));

  // Bind chart tab events
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      initDashChart(tab.dataset.range);
    });
  });
  initDashChart('1D');
}

function initDashChart(range='1D') {
  const ctx = document.getElementById('dashChart');
  if (!ctx) return;
  if (ctx._chartInstance) ctx._chartInstance.destroy();

  const pts = { '1D':24, '1W':7, '1M':30, '3M':90, '1Y':12 }[range]||24;
  const labels = [];
  const data = [];
  let val = PORTFOLIO_VALUE - PORTFOLIO_CHANGE * 2;
  for (let i=0; i<pts; i++) {
    labels.push(i);
    val += (Math.random()-0.44)*200;
    data.push(parseFloat(val.toFixed(2)));
  }
  data[data.length-1] = PORTFOLIO_VALUE;

  ctx._chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: '#00e27a',
        borderWidth: 2,
        fill: true,
        backgroundColor: (ctx2) => {
          const grad = ctx2.chart.ctx.createLinearGradient(0,0,0,240);
          grad.addColorStop(0, 'rgba(0,226,122,0.18)');
          grad.addColorStop(1, 'rgba(0,226,122,0)');
          return grad;
        },
        tension: 0.4, pointRadius: 0, pointHoverRadius: 5,
        pointHoverBackgroundColor: '#00e27a',
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display:false }, tooltip: {
        callbacks: { label: ctx2 => ' $'+fmt(ctx2.raw) }
      }},
      scales: {
        x: { display:false, grid:{display:false} },
        y: { display:false, grid:{display:false} }
      },
      interaction: { intersect:false, mode:'index' }
    }
  });
}

// ─── Assets ───────────────────────────────────────────────────────────────────
function pageAssets() {
  const rows = CRYPTOS.map(c => {
    const value = c.price * c.held;
    const pnl = (c.price - c.avgBuy) * c.held;
    const pnlPct = ((c.price - c.avgBuy)/c.avgBuy)*100;
    return `<tr>
      <td><div class="asset-row-name">
        <div class="asset-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</div>
        <div class="asset-name-block"><div class="name">${c.name}</div><div class="ticker">${c.ticker}</div></div>
      </div></td>
      <td>${fmtPrice(c.price)}</td>
      <td class="${changeClass(c.change)}">${changeStr(c.change)}</td>
      <td>${fmt(c.held, c.held<1?4:2)} ${c.ticker}</td>
      <td class="text-right fw-600">$${fmt(value)}</td>
      <td class="text-right ${changeClass(pnl)}">$${fmt(Math.abs(pnl))}</td>
    </tr>`;
  }).join('');

  const totalValue = CRYPTOS.reduce((s,c)=>s+c.price*c.held,0);

  const content = `
  <div class="page-header">
    <h1>My Assets</h1>
    <p>Total value: <strong>$${fmt(totalValue)}</strong></p>
  </div>
  <div class="card">
    <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;gap:12px;align-items:center">
      <input type="text" placeholder="Search assets…" style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:9px 14px;color:var(--text);font-size:14px;width:280px" />
      <button class="qa-btn primary-qa" data-route="/trade">${I.buy} Buy Crypto</button>
    </div>
    <div style="overflow-x:auto">
      <table class="asset-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Holdings</th>
            <th class="text-right">Value</th>
            <th class="text-right">P&amp;L</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;

  render(buildLayout('Assets', content));
}

// ─── Trade ────────────────────────────────────────────────────────────────────
function pageTrade() {
  const opts = CRYPTOS.map(c=>`<option value="${c.id}">${c.ticker} — ${c.name}</option>`).join('');
  const content = `
  <div class="page-header"><h1>Trade</h1><p>Buy or sell crypto instantly.</p></div>
  <div class="trade-layout">
    <div class="card card-pad">
      <div class="trade-tabs">
        <div class="trade-tab active" id="tab-buy">Buy</div>
        <div class="trade-tab" id="tab-sell">Sell</div>
        <div class="trade-tab" id="tab-convert">Convert</div>
      </div>
      <div class="trade-form-section">
        <div class="trade-input-group">
          <div class="trade-input-label">You Pay</div>
          <div class="trade-input-row">
            <input type="number" id="pay-amt" placeholder="0.00" />
            <div class="trade-select">USD <span style="color:var(--text2);font-size:10px">▼</span></div>
          </div>
        </div>
        <div class="percent-row">
          ${['25%','50%','75%','Max'].map(p=>`<div class="pct-btn" data-pct="${p}">${p}</div>`).join('')}
        </div>
        <div class="trade-input-group">
          <div class="trade-input-label">You Receive</div>
          <div class="trade-input-row">
            <input type="number" id="receive-amt" placeholder="0.00" readonly style="opacity:0.7" />
            <div class="trade-select" style="gap:6px">
              <select id="crypto-select" style="background:none;border:none;color:var(--text);font-size:14px;font-weight:600;cursor:pointer">${opts}</select>
            </div>
          </div>
        </div>
        <div class="order-summary" style="margin-top:8px">
          <div class="order-row"><span class="label">Price</span><span class="val" id="order-price">—</span></div>
          <div class="order-row"><span class="label">Network fee</span><span class="val">~$0.84</span></div>
          <div class="order-row"><span class="label">Platform fee</span><span class="val">0.5%</span></div>
          <div class="order-row"><span class="label fw-600">Total</span><span class="val" id="order-total" style="color:var(--brand)">—</span></div>
        </div>
        <button class="trade-btn buy-btn" id="exec-trade">Buy Now</button>
        <p style="font-size:12px;color:var(--text2);text-align:center;margin-top:12px">All transactions are processed securely via FunderPro Integrations Holdings &amp; Co.</p>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card card-pad">
        <div class="section-header"><h3>Market Prices</h3></div>
        ${CRYPTOS.slice(0,6).map(c=>`
          <div class="watchlist-item" style="cursor:pointer" onclick="document.getElementById('crypto-select').value='${c.id}';updateTradeCalc()">
            <div class="asset-icon" style="background:${c.color}22;color:${c.color}">${c.icon}</div>
            <div class="watchlist-info"><div class="watchlist-name">${c.name}</div><div class="watchlist-ticker">${c.ticker}</div></div>
            <div class="watchlist-price">
              <div class="watchlist-price-val">${fmtPrice(c.price)}</div>
              <div class="stat-change ${c.change>=0?'up':'down'}" style="justify-content:flex-end;font-size:11px;margin-top:2px">${changeStr(c.change)}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>`;

  render(buildLayout('Trade', content));

  // Trade logic
  function updateTradeCalc() {
    const id = document.getElementById('crypto-select').value;
    const crypto = CRYPTOS.find(c=>c.id===id) || CRYPTOS[0];
    const amt = parseFloat(document.getElementById('pay-amt').value)||0;
    const recv = amt / crypto.price;
    document.getElementById('order-price').textContent = fmtPrice(crypto.price);
    document.getElementById('receive-amt').value = recv > 0 ? fmt(recv,6) : '';
    document.getElementById('order-total').textContent = amt > 0 ? '$'+fmt(amt*1.005) : '—';
  }
  window.updateTradeCalc = updateTradeCalc;
  document.getElementById('pay-amt').addEventListener('input', updateTradeCalc);
  document.getElementById('crypto-select').addEventListener('change', updateTradeCalc);
  document.querySelectorAll('.pct-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pcts = {'25%':250,'50%':500,'75%':750,'Max':1000};
      document.getElementById('pay-amt').value = pcts[btn.dataset.pct]||250;
      updateTradeCalc();
    });
  });
  // Tabs
  ['buy','sell','convert'].forEach(t => {
    document.getElementById(`tab-${t}`).addEventListener('click', () => {
      document.querySelectorAll('.trade-tab').forEach(el=>el.classList.remove('active'));
      document.getElementById(`tab-${t}`).classList.add('active');
      const btn = document.getElementById('exec-trade');
      if (t==='buy') { btn.textContent='Buy Now'; btn.className='trade-btn buy-btn'; }
      else if (t==='sell') { btn.textContent='Sell Now'; btn.className='trade-btn sell-btn'; }
      else { btn.textContent='Convert'; btn.className='trade-btn buy-btn'; }
    });
  });
  document.getElementById('exec-trade').addEventListener('click', () => {
    const btn = document.getElementById('exec-trade');
    btn.textContent='✓ Order Placed!'; btn.disabled=true;
    setTimeout(()=>{ btn.textContent='Buy Now'; btn.disabled=false; },2500);
  });
  updateTradeCalc();
}

// ─── Advanced Trade ───────────────────────────────────────────────────────────
function pageAdvancedTrade() {
  const asks = [[94520,0.4821],[94530,1.2043],[94545,0.8821],[94560,2.1200],[94575,0.5500],[94590,1.8900]];
  const bids = [[94510,0.9200],[94500,1.4500],[94488,0.7700],[94475,2.3400],[94460,1.0200],[94445,0.4100]];

  const content = `
  <div class="adv-layout">
    <div class="adv-chart-area">
      <div class="adv-chart-label">BTC/USD</div>
      <div class="adv-chart-price">$94,512.40</div>
      <canvas id="advChart" style="width:100%;height:100%"></canvas>
      <div style="position:absolute;bottom:12px;left:16px;display:flex;gap:6px">
        ${['1m','5m','15m','1h','4h','1D'].map(t=>`<button class="chart-tab" style="background:var(--bg3)">${t}</button>`).join('')}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:0">
      <div class="card" style="border-radius:var(--radius) var(--radius) 0 0;border-bottom:none">
        <div class="ob-header"><span>Price</span><span>Size</span><span>Total</span></div>
        ${asks.slice().reverse().map(([p,s])=>`
          <div class="ob-row ask">
            <span class="price">${fmt(p,0)}</span>
            <span>${fmt(s,4)}</span>
            <span>$${fmt(p*s,0)}</span>
          </div>`).join('')}
        <div class="ob-spread"><span>Spread</span><span style="color:var(--brand)">$10.40 (0.011%)</span></div>
        ${bids.map(([p,s])=>`
          <div class="ob-row bid">
            <span class="price">${fmt(p,0)}</span>
            <span>${fmt(s,4)}</span>
            <span>$${fmt(p*s,0)}</span>
          </div>`).join('')}
      </div>
      <div class="card card-pad" style="border-radius:0 0 var(--radius) var(--radius)">
        <div class="trade-tabs">
          <div class="trade-tab active">Limit</div>
          <div class="trade-tab">Market</div>
          <div class="trade-tab">Stop</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="trade-input-group">
            <div class="trade-input-label">Price (USD)</div>
            <input type="number" value="94512.40" style="background:none;border:none;font-size:16px;font-weight:600;color:var(--text);width:100%" />
          </div>
          <div class="trade-input-group">
            <div class="trade-input-label">Amount (BTC)</div>
            <input type="number" placeholder="0.0000" style="background:none;border:none;font-size:16px;font-weight:600;color:var(--text);width:100%" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <button class="trade-btn buy-btn" style="margin-top:0">Buy BTC</button>
            <button class="trade-btn sell-btn" style="margin-top:0">Sell BTC</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  render(buildLayout('Advanced Trade', content));
  setTimeout(() => {
    const ctx = document.getElementById('advChart');
    if (!ctx) return;
    const labels = Array.from({length:60},(_,i)=>i);
    const data = [];
    let v = 94000;
    for (let i=0;i<60;i++){ v+=(Math.random()-0.48)*120; data.push(parseFloat(v.toFixed(2))); }
    new Chart(ctx,{
      type:'line',
      data:{ labels, datasets:[{data, borderColor:'#00e27a', borderWidth:1.5, fill:false, tension:0.2, pointRadius:0}]},
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{ x:{display:false}, y:{position:'right', grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#8a919e',font:{size:10}}}},
        interaction:{intersect:false,mode:'index'}
      }
    });
  },100);
}

// ─── Portfolio ────────────────────────────────────────────────────────────────
function pagePortfolio() {
  const colors = ['#F7931A','#627EEA','#9945FF','#00AAE4','#F3BA2F','#2775CA','#C2A633'];
  const allocs = CRYPTOS.slice(0,5).map((c,i)=>({
    ...c, value: c.price*c.held,
    pct: ((c.price*c.held)/PORTFOLIO_VALUE*100),
    color: colors[i]
  }));

  const allocHTML = allocs.map(a=>`
    <div class="allocation-item">
      <div class="asset-icon" style="background:${a.color}22;color:${a.color};width:28px;height:28px;font-size:11px">${a.icon}</div>
      <span style="font-size:13px;font-weight:600;width:80px">${a.name}</span>
      <div class="allocation-bar-wrap"><div class="allocation-bar" style="width:${a.pct}%;background:${a.color}"></div></div>
      <span class="allocation-pct">${fmt(a.pct,1)}%</span>
      <span style="font-size:13px;font-weight:600;width:80px;text-align:right">$${fmt(a.value)}</span>
    </div>`).join('');

  const content = `
  <div class="page-header"><h1>Portfolio</h1><p>Track your allocations and performance.</p></div>
  <div class="stats-grid">
    <div class="stat-card" style="background:linear-gradient(135deg,rgba(0,226,122,0.15),rgba(0,226,122,0.05));border-color:rgba(0,226,122,0.25)">
      <div class="stat-label">Total Value</div>
      <div class="stat-value">$${fmt(PORTFOLIO_VALUE)}</div>
      <div class="stat-change up">${I.arrow_up}+$${fmt(PORTFOLIO_CHANGE)} today</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Invested</div><div class="stat-value">$18,240.00</div>
      <div class="stat-change up">Cost basis</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Return</div><div class="stat-value" style="color:var(--brand)">+$6,607.32</div>
      <div class="stat-change up">+36.2% all time</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Assets</div><div class="stat-value">${CRYPTOS.length}</div>
      <div class="stat-change up">holdings</div>
    </div>
  </div>
  <div class="portfolio-grid">
    <div class="card card-pad">
      <div class="section-header"><h3>Allocation</h3></div>
      <div style="height:200px;margin-bottom:20px"><canvas id="pieChart"></canvas></div>
      <div class="allocation-list">${allocHTML}</div>
    </div>
    <div class="card card-pad">
      <div class="section-header"><h3>Performance</h3></div>
      <div class="chart-wrap"><canvas id="perfChart"></canvas></div>
    </div>
  </div>`;

  render(buildLayout('Portfolio', content));
  setTimeout(()=>{
    const pie = document.getElementById('pieChart');
    if(pie) new Chart(pie,{ type:'doughnut', data:{
      labels: allocs.map(a=>a.ticker),
      datasets:[{data:allocs.map(a=>a.value), backgroundColor:allocs.map(a=>a.color), borderWidth:0, hoverOffset:8}]
    }, options:{responsive:true,maintainAspectRatio:false, plugins:{legend:{display:false}}, cutout:'70%'}});

    const perf = document.getElementById('perfChart');
    if(perf){
      const pts=[]; let v=18000;
      for(let i=0;i<30;i++){v+=(Math.random()-0.4)*300;pts.push(parseFloat(v.toFixed(2)));}
      pts[pts.length-1]=PORTFOLIO_VALUE;
      new Chart(perf,{type:'line',data:{labels:pts.map((_,i)=>i),datasets:[{data:pts,borderColor:'#4f8ef7',borderWidth:2,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,200);g.addColorStop(0,'rgba(79,142,247,0.2)');g.addColorStop(1,'rgba(79,142,247,0)');return g;},tension:0.4,pointRadius:0}]},
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{display:false},y:{position:'right',grid:{color:'rgba(255,255,255,0.04)'},ticks:{color:'#8a919e',callback:v=>'$'+fmt(v,0)}}},interaction:{intersect:false,mode:'index'}}});
    }
  },100);
}

// ─── Notifications ────────────────────────────────────────────────────────────
function pageNotifications() {
  const notifs = [
    { icon:I.asset, color:'rgba(0,226,122,0.15)', stroke:'var(--brand)', title:'Bitcoin up 2.34%', desc:'BTC hit a new high of $94,512 — your portfolio gained $412.18 today.', time:'2m ago', unread:true },
    { icon:I.buy, color:'rgba(79,142,247,0.15)', stroke:'var(--blue)', title:'Order Filled', desc:'Your buy order for 0.0042 BTC ($397.00) has been executed successfully.', time:'1h ago', unread:true },
    { icon:I.shield, color:'rgba(0,226,122,0.1)', stroke:'var(--brand)', title:'New login detected', desc:'A new sign-in was detected from Chrome on macOS. Was this you?', time:'3h ago', unread:true },
    { icon:I.transfer, color:'rgba(247,85,85,0.1)', stroke:'var(--red)', title:'Transfer sent', desc:'250 USDC sent to wallet 0x1a2b...3c4d. Transaction confirmed.', time:'1d ago', unread:false },
    { icon:I.learn, color:'rgba(255,200,0,0.1)', stroke:'#ffc800', title:'New article available', desc:'Learn how to DCA into crypto for long-term wealth. Read now.', time:'2d ago', unread:false },
    { icon:I.portfolio, color:'rgba(153,69,255,0.12)', stroke:'#9945FF', title:'SOL Price Alert', desc:'Solana crossed your alert target of $190. Current price: $198.40.', time:'3d ago', unread:false },
  ];

  const html = notifs.map(n=>`
    <div class="notif-item${n.unread?' notif-unread':''}">
      <div class="notif-icon" style="background:${n.color}">
        <svg viewBox="0 0 24 24" fill="none" stroke="${n.stroke}" stroke-width="2" style="width:18px;height:18px">${n.icon.replace(/<svg[^>]*>/,'').replace('</svg>','')}</svg>
      </div>
      <div class="notif-text flex-1">
        <div class="title">${n.title}</div>
        <div class="desc">${n.desc}</div>
      </div>
      <span class="notif-time">${n.time}</span>
    </div>`).join('');

  const content = `
  <div class="page-header" style="display:flex;align-items:center;justify-content:space-between">
    <div><h1>Notifications</h1><p>Stay updated on your activity.</p></div>
    <button class="btn-sm" id="mark-all-read-btn">Mark all read</button>
  </div>
  <div class="transfer-tabs">
    <div class="tab-pill active">All</div>
    <div class="tab-pill">Unread (3)</div>
    <div class="tab-pill">Price Alerts</div>
    <div class="tab-pill">Trades</div>
  </div>
  <div class="card card-pad" id="notif-list">${html}</div>`;

  render(buildLayout('Notifications', content));
  document.querySelectorAll('.tab-pill').forEach(p => p.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
  }));
  document.getElementById('mark-all-read-btn')?.addEventListener('click', () => {
    document.querySelectorAll('.notif-unread').forEach(el => el.classList.remove('notif-unread'));
    showToast('All notifications marked as read');
    document.getElementById('mark-all-read-btn').textContent = 'All read';
  });
}

// ─── Transfers ────────────────────────────────────────────────────────────────
function pageTransfers() {
  const tx = [
    { type:'Bought', asset:'Bitcoin', ticker:'BTC', amt:'+0.0042 BTC', usd:'+$397.00', date:'May 10, 2026 · 14:23', color:'var(--brand)', icon:'📈' },
    { type:'Sold', asset:'Ethereum', ticker:'ETH', amt:'-0.5 ETH', usd:'+$1,710.90', date:'May 9, 2026 · 11:05', color:'var(--brand)', icon:'💰' },
    { type:'Sent', asset:'USD Coin', ticker:'USDC', amt:'-250 USDC', usd:'-$250.00', date:'May 8, 2026 · 09:45', color:'var(--red)', icon:'📤' },
    { type:'Received', asset:'Solana', ticker:'SOL', amt:'+5.00 SOL', usd:'+$992.00', date:'May 7, 2026 · 18:30', color:'var(--brand)', icon:'📥' },
    { type:'Converted', asset:'DOGE→BTC', ticker:'', amt:'+0.0015 BTC', usd:'', date:'May 6, 2026 · 12:12', color:'var(--text)', icon:'🔄' },
    { type:'Deposit', asset:'USD Bank Transfer', ticker:'', amt:'+$2,000.00', usd:'', date:'May 5, 2026 · 08:00', color:'var(--brand)', icon:'🏦' },
    { type:'Bought', asset:'Solana', ticker:'SOL', amt:'+10 SOL', usd:'-$1,840.00', date:'May 4, 2026 · 16:44', color:'var(--red)', icon:'📈' },
    { type:'Bought', asset:'Chainlink', ticker:'LINK', amt:'+20 LINK', usd:'-$374.40', date:'May 3, 2026 · 14:09', color:'var(--red)', icon:'📈' },
  ];

  const rows = tx.map(t=>`
    <div class="tx-item">
      <div class="tx-icon" style="background:var(--bg3);font-size:20px">${t.icon}</div>
      <div class="tx-info">
        <div class="tx-name">${t.type} ${t.asset}</div>
        <div class="tx-date">${t.date}</div>
      </div>
      <div class="tx-amount">
        <div class="tx-val" style="color:${t.color}">${t.amt}</div>
        ${t.usd?`<div class="tx-usd">${t.usd}</div>`:''}
      </div>
    </div>`).join('');

  const content = `
  <div class="page-header"><h1>Transfers</h1><p>Your complete transaction history.</p></div>
  <div class="quick-actions" style="margin-bottom:24px">
    <button class="qa-btn primary-qa">${I.send} Send</button>
    <button class="qa-btn">${I.receive} Receive</button>
    <button class="qa-btn">${I.buy} Deposit</button>
    <button class="qa-btn">${I.trade} Withdraw</button>
  </div>
  <div class="transfer-tabs">
    <div class="tab-pill active">All</div>
    <div class="tab-pill">Buys</div>
    <div class="tab-pill">Sells</div>
    <div class="tab-pill">Sends</div>
    <div class="tab-pill">Deposits</div>
  </div>
  <div class="card card-pad">
    <div class="tx-list">${rows}</div>
  </div>`;

  render(buildLayout('Transfers', content));
  document.querySelectorAll('.tab-pill').forEach(p=>p.addEventListener('click',()=>{
    document.querySelectorAll('.tab-pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
  }));
  const [sendBtn, receiveBtn, depositBtn, withdrawBtn] = document.querySelectorAll('.qa-btn');
  sendBtn?.addEventListener('click', () => showToast('Send flow coming soon — connect your wallet to send.'));
  receiveBtn?.addEventListener('click', () => { navigator.clipboard?.writeText('0x1a2b3c4d5e6f7a8b9c0d'); showToast('Wallet address copied to clipboard'); });
  depositBtn?.addEventListener('click', () => showToast('Deposit: link a bank account under Payment Methods.'));
  withdrawBtn?.addEventListener('click', () => showToast('Withdrawal request submitted — arrives in 1–3 business days.'));
}

// ─── Payment Methods ──────────────────────────────────────────────────────────
function pagePaymentMethods() {
  const methods = [
    { icon:'🏦', name:'Chase Bank ····4829', sub:'Checking · Verified', badge:'Primary', badgeColor:'var(--brand)' },
    { icon:'💳', name:'Visa ····3871', sub:'Credit Card · Verified', badge:'', badgeColor:'' },
    { icon:'🏛', name:'PayPal', sub:'investor@funderpro.io · Connected', badge:'', badgeColor:'' },
  ];

  const content = `
  <div class="page-header"><h1>Payment Methods</h1><p>Manage your linked accounts and cards.</p></div>
  <div class="card card-pad" style="max-width:600px">
    ${methods.map(m=>`
      <div class="settings-row">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="font-size:28px;width:48px;text-align:center">${m.icon}</div>
          <div>
            <div class="s-label">${m.name} ${m.badge?`<span style="background:rgba(0,226,122,0.12);color:var(--brand);font-size:10px;padding:2px 7px;border-radius:99px;font-weight:700">${m.badge}</span>`:''}</div>
            <div class="s-sub">${m.sub}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-sm">Edit</button>
          <button class="btn-sm danger">Remove</button>
        </div>
      </div>`).join('')}
    <div style="margin-top:20px">
      <button class="btn-primary" style="width:auto;padding:11px 24px">+ Add Payment Method</button>
    </div>
  </div>`;

  render(buildLayout('Payment Methods', content));
  document.querySelectorAll('.btn-sm:not(.danger)').forEach(btn => {
    btn.addEventListener('click', () => showToast('Payment method details are currently read-only. Contact support to modify.'));
  });
  document.querySelectorAll('.btn-sm.danger').forEach(btn => {
    btn.addEventListener('click', () => showToast('Payment method removed.', 'info'));
  });
  document.querySelector('.btn-primary')?.addEventListener('click', () => showToast('Redirecting to bank linking — coming soon.'));
}

// ─── Price ────────────────────────────────────────────────────────────────────
function pagePrices() {
  const cards = CRYPTOS.map(c=>`
    <div class="price-card" data-route="/trade">
      <div class="price-card-top">
        <div>
          <div class="price-card-name">${c.name}</div>
          <div class="price-card-ticker">${c.ticker}</div>
        </div>
        <div class="price-card-change ${c.change>=0?'up':'down'}">${changeStr(c.change)}</div>
      </div>
      <div class="price-card-price">${fmtPrice(c.price)}</div>
      <div class="price-card-mcap">Mkt cap: ${c.mktcap}</div>
    </div>`).join('');

  const content = `
  <div class="page-header"><h1>Prices</h1><p>Live crypto market prices.</p></div>
  <div class="transfer-tabs">
    <div class="tab-pill active">All Assets</div>
    <div class="tab-pill">Top Gainers</div>
    <div class="tab-pill">Top Losers</div>
    <div class="tab-pill">Trending</div>
  </div>
  <div class="price-grid">${cards}</div>`;

  render(buildLayout('Prices', content));
  document.querySelectorAll('.tab-pill').forEach(p=>p.addEventListener('click',()=>{
    document.querySelectorAll('.tab-pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
  }));
  document.querySelectorAll('.price-card[data-route]').forEach(c=>c.addEventListener('click',()=>Router.navigate('/trade')));
}

// ─── Explore ──────────────────────────────────────────────────────────────────
function pageExplore() {
  const cards = [
    { bg:'linear-gradient(135deg,#F7931A22,#F7931A08)', icon:'₿', tag:'Hot', title:'Bitcoin Halving 2024 Impact', body:'How the most recent BTC halving is shaping long-term price trajectories.' },
    { bg:'linear-gradient(135deg,#9945FF22,#9945FF08)', icon:'◎', tag:'DeFi', title:'Solana DeFi Ecosystem', body:"Explore lending, staking, and yield opportunities on Solana's blazing-fast chain." },
    { bg:'linear-gradient(135deg,#00AAE422,#00AAE408)', icon:'⚡', tag:'New', title:'Layer 2 Deep Dive', body:'Understanding Ethereum L2 solutions and how they reduce fees by 100x.' },
    { bg:'linear-gradient(135deg,#00D39522,#00D39508)', icon:'🏦', tag:'Earn', title:'Staking Rewards Guide', body:'Earn up to 12% APY by staking your idle crypto assets through FunderPro Integrations.' },
    { bg:'linear-gradient(135deg,#4f8ef722,#4f8ef708)', icon:'📊', tag:'Analysis', title:'Altseason Indicators', body:'Key on-chain signals that have historically predicted major altcoin rallies.' },
    { bg:'linear-gradient(135deg,#F3BA2F22,#F3BA2F08)', icon:'🔮', tag:'AI', title:'AI in Crypto Trading', body:'How machine learning is transforming quantitative trading strategies in 2026.' },
  ];

  const content = `
  <div class="page-header"><h1>Explore</h1><p>Discover new opportunities across DeFi, NFTs, and more.</p></div>
  <div class="transfer-tabs">
    <div class="tab-pill active">All</div>
    <div class="tab-pill">DeFi</div>
    <div class="tab-pill">NFTs</div>
    <div class="tab-pill">Staking</div>
    <div class="tab-pill">AI Insights</div>
  </div>
  <div class="explore-grid">
    ${cards.map(c=>`
      <div class="explore-card">
        <div class="explore-card-img" style="background:${c.bg};font-size:48px">${c.icon}</div>
        <div class="explore-card-body">
          <div class="explore-tag">${c.tag}</div>
          <h4>${c.title}</h4>
          <p>${c.body}</p>
        </div>
      </div>`).join('')}
  </div>`;

  render(buildLayout('Explore', content));
  document.querySelectorAll('.tab-pill').forEach(p=>p.addEventListener('click',()=>{
    document.querySelectorAll('.tab-pill').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
  }));
}

// ─── Learn ────────────────────────────────────────────────────────────────────
function pageLearn() {
  const lessons = [
    { icon:'🌐', title:"What is Blockchain?", sub:'Beginner · 5 min read', progress:100, done:true },
    { icon:'₿', title:"How Bitcoin Works", sub:'Beginner · 8 min read', progress:100, done:true },
    { icon:'Ξ', title:"Ethereum & Smart Contracts", sub:'Intermediate · 10 min read', progress:60, done:false },
    { icon:'🔑', title:"Wallet Security Basics", sub:'Beginner · 6 min read', progress:0, done:false },
    { icon:'📊', title:"Reading Crypto Charts", sub:'Intermediate · 12 min read', progress:0, done:false },
    { icon:'🏦', title:"DeFi: Decentralized Finance", sub:'Advanced · 15 min read', progress:0, done:false },
    { icon:'⛏️', title:"Mining vs Staking", sub:'Intermediate · 8 min read', progress:0, done:false },
    { icon:'🛡️', title:"Avoiding Crypto Scams", sub:'Beginner · 7 min read', progress:0, done:false },
  ];

  const content = `
  <div class="page-header"><h1>Learn</h1><p>Build your crypto knowledge from beginner to expert.</p></div>
  <div class="stats-grid" style="max-width:600px">
    <div class="stat-card"><div class="stat-label">Completed</div><div class="stat-value">2 / 8</div><div class="stat-change up">lessons</div></div>
    <div class="stat-card"><div class="stat-label">Streak</div><div class="stat-value">4 🔥</div><div class="stat-change up">days</div></div>
    <div class="stat-card"><div class="stat-label">Points</div><div class="stat-value">240 ⭐</div><div class="stat-change up">earned</div></div>
  </div>
  <div class="explore-grid">
    ${lessons.map(l=>`
      <div class="explore-card" style="cursor:pointer">
        <div class="explore-card-img" style="background:var(--bg3);font-size:40px;height:100px">${l.icon}</div>
        <div class="explore-card-body">
          <div style="font-size:11px;color:var(--text2);margin-bottom:6px">${l.sub}</div>
          <h4 style="margin-bottom:12px">${l.title}</h4>
          <div style="background:var(--bg3);height:4px;border-radius:99px;overflow:hidden">
            <div style="background:${l.done?'var(--brand)':'var(--blue)'};width:${l.progress}%;height:100%;border-radius:99px"></div>
          </div>
          <div style="font-size:11px;color:var(--text2);margin-top:4px">${l.done?'✓ Completed':l.progress?l.progress+'% complete':'Not started'}</div>
        </div>
      </div>`).join('')}
  </div>`;

  render(buildLayout('Learn', content));
}

// ─── Profile ──────────────────────────────────────────────────────────────────
function pageProfile() {
  const user = Auth.getUser();
  const content = `
  <div class="page-header"><h1>Profile</h1></div>
  <div style="max-width:680px">
    <div class="card card-pad" style="margin-bottom:20px">
      <div class="profile-hero">
        <div class="profile-avatar">${(user.name||'U').substring(0,2).toUpperCase()}</div>
        <div class="profile-info">
          <h2>${user.name||'Investor'}</h2>
          <p>${user.email||'investor@funderpro.io'}</p>
          <div class="kyc-badge">${I.check} KYC Verified</div>
        </div>
        <button class="btn-sm" id="profile-edit-btn" style="margin-left:auto;align-self:flex-start">Edit</button>
      </div>
      <div class="divider"></div>
      <div class="settings-row"><div><div class="s-label">Full Name</div></div><div style="font-size:14px;color:var(--text2)">${user.name||'Investor'}</div></div>
      <div class="settings-row"><div><div class="s-label">Email</div></div><div style="font-size:14px;color:var(--text2)">${user.email||'investor@funderpro.io'}</div></div>
      <div class="settings-row"><div><div class="s-label">Phone</div></div><div style="font-size:14px;color:var(--text2)">+1 (805) 395-6873</div></div>
      <div class="settings-row"><div><div class="s-label">Country</div></div><div style="font-size:14px;color:var(--text2)">United States</div></div>
      <div class="settings-row"><div><div class="s-label">Member since</div></div><div style="font-size:14px;color:var(--text2)">January 2025</div></div>
    </div>
    <div class="card card-pad">
      <h3 style="margin-bottom:16px">Referral Program</h3>
      <p style="color:var(--text2);font-size:13px;margin-bottom:16px">Invite friends and earn $10 per referral. Your unique link:</p>
      <div style="display:flex;gap:8px">
        <div style="flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:11px 14px;font-size:13px;color:var(--text2);font-family:monospace" id="ref-link">funderpro.io/ref/INV-28410</div>
        <button class="btn-sm" id="copy-ref-btn">${I.copy} Copy</button>
      </div>
      <p style="margin-top:12px;font-size:13px;color:var(--brand);font-weight:600">0 referrals · $0 earned</p>
    </div>
  </div>`;
  render(buildLayout('Profile', content));

  document.getElementById('profile-edit-btn')?.addEventListener('click', () => {
    showToast('Profile editing coming soon. Contact support to update your details.');
  });
  document.getElementById('copy-ref-btn')?.addEventListener('click', () => {
    const link = document.getElementById('ref-link')?.textContent || 'funderpro.io/ref/INV-28410';
    navigator.clipboard?.writeText(link).then(() => showToast('Referral link copied!')).catch(() => showToast('Copied: ' + link));
  });
}

// ─── Security ─────────────────────────────────────────────────────────────────
function pageSecurity() {
  const content = `
  <div class="page-header"><h1>Security</h1><p>Protect your account.</p></div>
  <div style="max-width:680px;display:flex;flex-direction:column;gap:16px">
    <div class="card card-pad">
      <h3 style="margin-bottom:6px">Two-Factor Authentication</h3>
      <p style="color:var(--text2);font-size:13px;margin-bottom:20px">Enabled — Authenticator App (TOTP)</p>
      <div class="settings-row">
        <div><div class="s-label">Authenticator App</div><div class="s-sub">Google Authenticator / Authy</div></div>
        <span class="kyc-badge">${I.check} Active</span>
      </div>
      <div class="settings-row">
        <div><div class="s-label">SMS Backup</div><div class="s-sub">+1 ···· ···· 6873</div></div>
        <button class="btn-sm">Change</button>
      </div>
    </div>
    <div class="card card-pad">
      <h3 style="margin-bottom:16px">Password</h3>
      <div class="settings-row">
        <div><div class="s-label">Current Password</div><div class="s-sub">Last changed 30 days ago</div></div>
        <button class="btn-sm">Change</button>
      </div>
    </div>
    <div class="card card-pad">
      <h3 style="margin-bottom:16px">Active Sessions</h3>
      ${[
        { icon:'💻', name:'Chrome · macOS', loc:'New York, US', time:'Current session', current:true },
        { icon:'📱', name:'FunderPro Integrations App · iPhone', loc:'New York, US', time:'2 hours ago', current:false },
      ].map(s=>`
        <div class="settings-row">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="font-size:24px">${s.icon}</div>
            <div><div class="s-label">${s.name} ${s.current?`<span style="background:rgba(0,226,122,0.12);color:var(--brand);font-size:10px;padding:2px 7px;border-radius:99px">Current</span>`:''}</div><div class="s-sub">${s.loc} · ${s.time}</div></div>
          </div>
          ${s.current?'<span style="color:var(--text3);font-size:13px">Active</span>':`<button class="btn-sm danger">Revoke</button>`}
        </div>`).join('')}
    </div>
    <div class="card card-pad">
      <h3 style="margin-bottom:6px;color:var(--red)">Danger Zone</h3>
      <p style="color:var(--text2);font-size:13px;margin-bottom:16px">Irreversible actions for your account.</p>
      <button class="btn-sm danger">Close Account</button>
    </div>
  </div>`;
  render(buildLayout('Security', content));
  document.querySelectorAll('.btn-sm:not(.danger)').forEach(btn => {
    btn.addEventListener('click', () => showToast('A verification code has been sent to your registered number.'));
  });
  document.querySelectorAll('.btn-sm.danger').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (i === 0) showToast('Session revoked successfully.', 'info');
      else showToast('Account closure requires contacting support@funderpro.io', 'info');
    });
  });
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function pageSettings() {
  const content = `
  <div class="page-header"><h1>Settings</h1></div>
  <div class="settings-layout">
    <div class="settings-nav">
      ${['General','Notifications','Privacy','Display','Advanced'].map((s,i)=>`
        <div class="settings-nav-item${i===0?' active':''}">${s}</div>`).join('')}
    </div>
    <div class="card card-pad settings-section">
      <h3>General Settings</h3>
      <p>Configure your account preferences.</p>
      <div class="settings-row">
        <div><div class="s-label">Language</div><div class="s-sub">Interface language</div></div>
        <select style="background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:8px;font-size:13px">
          <option>English (US)</option><option>Spanish</option><option>French</option><option>Arabic</option>
        </select>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Currency</div><div class="s-sub">Display currency</div></div>
        <select style="background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:8px;font-size:13px">
          <option>USD — US Dollar</option><option>EUR — Euro</option><option>GBP — Pound</option>
        </select>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Price Alerts</div><div class="s-sub">Get notified on significant moves</div></div>
        <div class="toggle on"><div class="toggle-dot"></div></div>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Email Notifications</div><div class="s-sub">Trades, transfers, security</div></div>
        <div class="toggle on"><div class="toggle-dot"></div></div>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Marketing Emails</div><div class="s-sub">Product updates and offers</div></div>
        <div class="toggle"><div class="toggle-dot"></div></div>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Dark Mode</div><div class="s-sub">Always on for best experience</div></div>
        <div class="toggle on"><div class="toggle-dot"></div></div>
      </div>
    </div>
  </div>`;
  render(buildLayout('Settings', content));
  document.querySelectorAll('.settings-nav-item').forEach(item=>{
    item.addEventListener('click',()=>{
      document.querySelectorAll('.settings-nav-item').forEach(x=>x.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

// ─── Account ──────────────────────────────────────────────────────────────────
function pageAccount() {
  const user = Auth.getUser();
  const content = `
  <div class="page-header"><h1>Account</h1><p>Manage your FunderPro Integrations account.</p></div>
  <div style="max-width:680px;display:flex;flex-direction:column;gap:16px">
    <div class="card card-pad">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div class="profile-avatar" style="width:56px;height:56px;font-size:18px">${(user.name||'U').substring(0,2).toUpperCase()}</div>
        <div>
          <div style="font-size:18px;font-weight:700">${user.name||'Investor'}</div>
          <div style="font-size:13px;color:var(--text2)">${user.email||'investor@funderpro.io'}</div>
          <div class="kyc-badge" style="margin-top:6px">${I.check} Level 2 Verified</div>
        </div>
      </div>
      <div class="settings-row"><div class="s-label">Account ID</div><div style="font-family:monospace;font-size:13px;color:var(--text2)">MXP-28410-USD</div></div>
      <div class="settings-row"><div class="s-label">Account Type</div><div class="badge-green">Premium Investor</div></div>
      <div class="settings-row"><div class="s-label">Status</div><div class="badge-green">Active</div></div>
      <div class="settings-row"><div class="s-label">Daily Limit</div><div style="font-size:14px;font-weight:600">$50,000</div></div>
    </div>
    <div class="card card-pad">
      <h3 style="margin-bottom:16px">Verification</h3>
      <div class="settings-row">
        <div><div class="s-label">Identity Verification</div><div class="s-sub">Government ID + Selfie</div></div>
        <span class="badge-green">Verified</span>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Address Verification</div><div class="s-sub">Proof of address</div></div>
        <span class="badge-green">Verified</span>
      </div>
      <div class="settings-row">
        <div><div class="s-label">Accredited Investor</div><div class="s-sub">Income / net worth declaration</div></div>
        <button class="btn-sm">Complete</button>
      </div>
    </div>
    <div class="card card-pad">
      <h3 style="margin-bottom:16px">Linked Accounts</h3>
      <div class="settings-row"><div class="s-label">Google</div><div class="badge-green">Connected</div></div>
      <div class="settings-row"><div class="s-label">Apple ID</div><button class="btn-sm">Connect</button></div>
    </div>
  </div>`;
  render(buildLayout('Account', content));
  document.querySelector('[class="btn-sm"]')?.addEventListener('click', () => showToast('Uploading declaration — our team will review within 48 hours.'));
  document.querySelectorAll('.btn-sm').forEach(btn => {
    if (btn.textContent.trim() === 'Complete') btn.addEventListener('click', () => showToast('Accredited Investor declaration submitted for review.'));
    if (btn.textContent.trim() === 'Connect') btn.addEventListener('click', () => showToast('Apple ID connection initiated — check your email.'));
  });
}

// ─── Home (alias → Dashboard) ────────────────────────────────────────────────
function pageHome() { pageDashboard(); }

// ═══════════════════════════════════════════════════════════════
// ROUTING REGISTRATION
// ═══════════════════════════════════════════════════════════════

Router.register('/login',           pageLogin);
Router.register('/signup',          pageSignup);
Router.register('/dashboard',       pageDashboard);
Router.register('/home',            pageHome);
Router.register('/assets',          pageAssets);
Router.register('/trade',           pageTrade);
Router.register('/advanced-trade',  pageAdvancedTrade);
Router.register('/portfolio',       pagePortfolio);
Router.register('/notifications',   pageNotifications);
Router.register('/transfers',       pageTransfers);
Router.register('/payment_methods', pagePaymentMethods);
Router.register('/price',           pagePrices);
Router.register('/explore',         pageExplore);
Router.register('/learn',           pageLearn);
Router.register('/profile',         pageProfile);
Router.register('/security',        pageSecurity);
Router.register('/settings',        pageSettings);
Router.register('/account',         pageAccount);
Router.register('/',                () => Router.navigate(Auth.isLoggedIn()?'/dashboard':'/login',false));
Router.register('*',                () => Router.navigate(Auth.isLoggedIn()?'/dashboard':'/login'));

// Boot
Router.init();

// ═══════════════════════════════════════════════════════════════
// GROQ AI CHAT WIDGET
// ═══════════════════════════════════════════════════════════════

const MXChat = (() => {
  const SUGGESTIONS = [
    'How is BTC performing?',
    'Explain DeFi simply',
    'Best crypto for beginners?',
    'How do I diversify my portfolio?',
    'What is SOL used for?',
  ];

  let messages = [];
  let isOpen = false;
  let isStreaming = false;

  function initWidget() {
    if (document.getElementById('mx-ai-btn')) return;

    // Floating button
    const btn = document.createElement('div');
    btn.id = 'mx-ai-btn';
    btn.innerHTML = `
      <div id="mx-ai-badge">AI</div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12h.01M12 12h.01M16 12h.01" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`;
    document.body.appendChild(btn);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'mx-ai-panel';
    panel.innerHTML = `
      <div class="mx-ai-header">
        <div class="mx-ai-avatar">MX</div>
        <div class="mx-ai-header-info">
          <div class="mx-ai-header-name">MX Assistant</div>
          <div class="mx-ai-header-status">Online · Groq AI</div>
        </div>
        <button class="mx-ai-close" id="mx-ai-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="mx-ai-messages" id="mx-ai-messages"></div>
      <div class="mx-ai-suggestions" id="mx-ai-suggestions"></div>
      <div class="mx-ai-input-row">
        <input id="mx-ai-input" placeholder="Ask about markets, crypto, trading…" autocomplete="off" />
        <button id="mx-ai-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>`;
    document.body.appendChild(panel);

    // Events
    btn.addEventListener('click', toggle);
    document.getElementById('mx-ai-close').addEventListener('click', close);
    document.getElementById('mx-ai-send').addEventListener('click', sendMessage);
    document.getElementById('mx-ai-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    renderSuggestions();
    addMessage('ai', 'Hi! I\'m MX, your AI financial assistant powered by Groq. I can help you with market insights, trading strategies, portfolio analysis, and navigating FunderPro Integrations. What would you like to know?');
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function open() {
    isOpen = true;
    document.getElementById('mx-ai-panel').classList.add('open');
    document.getElementById('mx-ai-badge').style.display = 'none';
    setTimeout(() => document.getElementById('mx-ai-input')?.focus(), 200);
  }

  function close() {
    isOpen = false;
    document.getElementById('mx-ai-panel').classList.remove('open');
  }

  function renderSuggestions() {
    const el = document.getElementById('mx-ai-suggestions');
    if (!el) return;
    el.innerHTML = SUGGESTIONS.map(s =>
      `<span class="mx-ai-chip" data-q="${s}">${s}</span>`
    ).join('');
    el.querySelectorAll('.mx-ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('mx-ai-input').value = chip.dataset.q;
        sendMessage();
      });
    });
  }

  function addMessage(role, text) {
    const msgsEl = document.getElementById('mx-ai-messages');
    if (!msgsEl) return null;
    const user = Auth.getUser();
    const initials = (user.name || 'U').substring(0, 2).toUpperCase();
    const id = 'mx-msg-' + Date.now() + Math.random().toString(36).slice(2);
    const div = document.createElement('div');
    div.className = `mx-msg ${role}`;
    div.id = id;
    div.innerHTML = `
      <div class="mx-msg-avatar">${role === 'ai' ? 'MX' : initials}</div>
      <div class="mx-msg-bubble">${escapeHtml(text)}</div>`;
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    messages.push({ role: role === 'ai' ? 'assistant' : 'user', content: text });
    return id;
  }

  function showTyping() {
    const msgsEl = document.getElementById('mx-ai-messages');
    if (!msgsEl) return null;
    const id = 'mx-typing-' + Date.now();
    const div = document.createElement('div');
    div.className = 'mx-msg ai';
    div.id = id;
    div.innerHTML = `
      <div class="mx-msg-avatar">MX</div>
      <div class="mx-ai-typing"><span></span><span></span><span></span></div>`;
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return id;
  }

  async function sendMessage() {
    if (isStreaming) return;
    const input = document.getElementById('mx-ai-input');
    const sendBtn = document.getElementById('mx-ai-send');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    document.getElementById('mx-ai-suggestions').style.display = 'none';
    addMessage('user', text);

    isStreaming = true;
    if (sendBtn) sendBtn.disabled = true;

    const typingId = showTyping();
    const msgsEl = document.getElementById('mx-ai-messages');

    try {
      const apiMessages = messages.slice(-12).map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/mx-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) throw new Error('API error ' + res.status);

      // Remove typing indicator, add streaming bubble
      document.getElementById(typingId)?.remove();

      const user = Auth.getUser();
      const initials = (user.name || 'U').substring(0, 2).toUpperCase();
      const streamId = 'mx-stream-' + Date.now();
      const streamDiv = document.createElement('div');
      streamDiv.className = 'mx-msg ai';
      streamDiv.id = streamId;
      streamDiv.innerHTML = `
        <div class="mx-msg-avatar">MX</div>
        <div class="mx-msg-bubble" id="${streamId}-text"></div>`;
      msgsEl.appendChild(streamDiv);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      const bubbleEl = document.getElementById(streamId + '-text');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.done) break;
            if (parsed.error) { fullText = 'Sorry, I ran into an issue. Please try again.'; break; }
            if (parsed.content) {
              fullText += parsed.content;
              if (bubbleEl) bubbleEl.textContent = fullText;
              msgsEl.scrollTop = msgsEl.scrollHeight;
            }
          } catch (_) {}
        }
      }

      messages.push({ role: 'assistant', content: fullText });

    } catch (err) {
      document.getElementById(typingId)?.remove();
      addMessage('ai', 'Sorry, I couldn\'t connect to the AI service right now. Please try again in a moment.');
      console.error('MX Chat error:', err);
    } finally {
      isStreaming = false;
      if (sendBtn) sendBtn.disabled = false;
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  return { init: initWidget, open, close, toggle };
})();

// MXChat.init() is called in bindCommonEvents for all authenticated pages

// ─── Demo auto-login route ────────────────────────────────────────────────────
Router.register('/demo', () => {
  Auth.login('demo@funderpro.io', 'Demo Investor');
  Router.navigate('/dashboard');
});
