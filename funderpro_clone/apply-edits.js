#!/usr/bin/env node
/**
 * apply-edits.js — one-shot transformation script
 * Applies all rebranding, content, and structural edits to the scraped HTML files.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, 'funderpro.com');

// ─── helpers ────────────────────────────────────────────────────────────────

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

function save(file, src) {
  writeFileSync(file, src, 'utf8');
}

// Replace text content between tags, never touching URLs / class names / ids
function replaceVisible(src, from, to) {
  // Simple global string replace — safe for heading/button text
  return src.split(from).join(to);
}

// ─── STEP 1: GLOBAL REBRAND REPLACEMENTS ────────────────────────────────────

function applyGlobalBrand(src) {

  // ── <title> tag
  src = src.replace(/<title>[^<]*<\/title>/g,
    '<title>Multixpro.ai | Multixpro Holdings &amp; Co.</title>');

  // ── alt attributes (logo images)
  src = src.replace(/alt="FunderPro"/g, 'alt="Multixpro.ai"');
  src = src.replace(/alt="Funder Pro"/g, 'alt="Multixpro.ai"');

  // ── meta / og content (not paths)
  src = src.replace(/"FunderPro: The Original Prop Firm with Daily Rewards"/g,
    '"Multixpro.ai | The Future of Decentralized Multi-Asset Investing"');
  src = src.replace(/"FunderPro: The Future of Decentralized Multi-Asset Investing"/g,
    '"Multixpro.ai | The Future of Decentralized Multi-Asset Investing"');
  src = src.replace(/"FunderPro is a prop trading firm/g,
    '"Multixpro.ai is a multi-asset investment platform');
  src = src.replace(/"FunderPro is a multi-asset investment platform/g,
    '"Multixpro.ai is a multi-asset investment platform');
  src = src.replace(/content="FunderPro"/g, 'content="Multixpro.ai"');
  src = src.replace(/name="FunderPro"/g, 'name="Multixpro.ai"');

  // ── Visible text: heading titles, button text, list items, paragraphs
  // We replace inside >…< spans so we never touch href/src/class
  // IMPORTANT: skip any occurrence that is inside a URL (contains .com/ or themes/ etc)

  // Phrase replacements (must come before single-word brand)
  src = replaceVisible(src, 'The Original Prop Firm with Daily Rewards',
    'The Future of Decentralized Multi-Asset Investing');
  src = replaceVisible(src, 'The Original Prop Firm',
    'The Future of Decentralized Multi-Asset Investing');
  src = replaceVisible(src, 'Prop firm with real daily rewards',
    'The Future of Decentralized Multi-Asset Investing');
  src = replaceVisible(src, 'prop firm with real daily rewards',
    'the future of decentralized multi-asset investing');

  // Prop trading / prop firm in visible text
  src = replaceVisible(src, '>Prop Trading<', '>Multi-Asset Investing<');
  src = replaceVisible(src, '>Prop trading<', '>Multi-Asset Investing<');
  src = replaceVisible(src, 'prop trading firm', 'multi-asset investment platform');
  src = replaceVisible(src, 'Prop Trading Firm', 'Multi-Asset Investment Platform');
  src = replaceVisible(src, 'prop firm', 'multi-asset investment platform');
  src = replaceVisible(src, 'Prop Firm', 'Multi-Asset Investment Platform');
  src = replaceVisible(src, 'funded trader program', 'investor program');
  src = replaceVisible(src, 'funded trader', 'investor');
  src = replaceVisible(src, 'Funded Trader', 'Investor');
  src = replaceVisible(src, 'funded account', 'investment account');
  src = replaceVisible(src, 'Funded Account', 'Investment Account');

  // Brand name in visible spans – careful: skip paths & class names
  // Match ">…FunderPro…<" patterns only
  src = src.replace(/(>(?:[^<"]*?))FunderPro((?:[^<"]*?)<)/g, '$1Multixpro.ai$2');
  src = src.replace(/(>(?:[^<"]*?))Funder Pro((?:[^<"]*?)<)/g, '$1Multixpro.ai$2');

  // ── Footer legal
  src = src.replace(
    /Only 7\.35%[^<]*/g,
    'All investment activity involves risk. Past performance is not indicative of future results. Multixpro Holdings &amp; Co. does not guarantee returns. Please consult a licensed financial advisor before making investment decisions.'
  );
  src = src.replace(
    /Only [0-9\.]+%[^<]*/g,
    'All investment activity involves risk. Past performance is not indicative of future results. Multixpro Holdings &amp; Co. does not guarantee returns. Please consult a licensed financial advisor before making investment decisions.'
  );

  return src;
}

// ─── STEP 3: NAV REPLACEMENTS (all files) ───────────────────────────────────

function applyNavEdits(src) {
  // Rename "Affiliates" link text
  src = src.replace(
    /(<a[^>]*href="\/become-a-funderpro-affiliate\/"[^>]*>)Affiliates(<\/a>)/g,
    '$1Partners$2'
  );
  src = src.replace(
    /(<a[^>]*href="\/become-a-funderpro-affiliate\/"[^>]*>)Partners(<\/a>)/g,
    '$1Partners$2'
  );
  // Any remaining "Affiliates" nav text
  src = src.replace(/>Affiliates<\/a>/g, '>Partners</a>');

  // FunderPro B2B → Multixpro.ai B2B
  src = src.replace(/FunderPro B2B/g, 'Multixpro.ai B2B');

  // "Buy a Challenge" in nav (NOT in buttons elsewhere)
  src = src.replace(
    /(<a[^>]*href="[^"]*buy-challenge[^"]*"[^>]*>)Buy a Challenge(<\/a>)/g,
    '$1Start Investing$2'
  );

  // Add "Leadership" link to About dropdown in nav
  // Find the About dropdown and add Leadership before closing </ul>
  src = src.replace(
    /(<li[^>]*menu-item-1953[^>]*>[\s\S]*?<\/li>\s*<\/ul>\s*<\/li>)/,
    (m) => {
      if (m.includes('Leadership')) return m; // don't add twice
      return m.replace(
        /(<\/li>\s*<\/ul>\s*<\/li>)$/,
        `</li>
<li class="menu-item js-item"><a href="/leadership/">Leadership</a></li>
</ul>
</li>`
      );
    }
  );

  // Add "Markets" dropdown after "How It Works" closing </li>
  // Only add once
  if (!src.includes('id="nav-markets"')) {
    src = src.replace(
      /(id="menu-item-532"[^>]*><a[^>]*>FAQs<\/a><\/li>)/,
      `<li id="nav-markets" class="menu-item menu-item-has-children js-item"><a href="#" class=" js-sub-menu-header">Markets</a>
<ul class="sub-menu">
  <li class="menu-item js-item"><a href="/products-and-spreads/#crypto">Crypto</a></li>
  <li class="menu-item js-item"><a href="/products-and-spreads/#stocks">Stocks</a></li>
  <li class="menu-item js-item"><a href="/products-and-spreads/#gold">Gold</a></li>
  <li class="menu-item js-item"><a href="/products-and-spreads/#real-estate">Real Estate</a></li>
</ul>
</li>
$1`
    );
  }

  // Footer nav "Affiliates" → "Partners"
  src = src.replace(/>Affiliates<\/a>/g, '>Partners</a>');

  return src;
}

// ─── STEP 4: HERO SECTION EDITS (index.html only) ───────────────────────────

function applyHeroEdits(src) {
  // Main headline (non-US variant)
  src = src.replace(
    /Challenges &amp; Instant Programs Built for top traders/g,
    'One Platform. Every Market. Fully Decentralized.'
  );
  // US-specific headline
  src = src.replace(
    /The Only Prop Firm With Real Daily Rewards/g,
    'One Platform. Every Market. Fully Decentralized.'
  );

  // Left bullet list (hover-icons-1) — exact match
  src = src.replace(
    /<ul class="elementor-icon-list-items">\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">MT5, cTrader &amp; TradeLocker<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">Up to 90% Performance Reward<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">Your EAs Allowed<\/span>\s*<\/li>\s*<\/ul>/,
    `<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Bitcoin, Ethereum &amp; 50+ Cryptocurrencies</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">NYSE, NASDAQ &amp; Global Stock Markets</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Gold, Silver &amp; Precious Metals</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Fractional Real Estate Investment</span></li>
</ul>`
  );

  // Right bullet list (hover-icons-2) — exact match
  src = src.replace(
    /<ul class="elementor-icon-list-items">\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">Up to \$200,000<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">No Trailing Drawdown<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">News Trading Allowed<\/span>\s*<\/li>\s*<\/ul>/,
    `<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Fully Decentralized Infrastructure</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">AI-Powered Market Insights</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Bank-Grade Security</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">24/7 Global Markets</span></li>
</ul>`
  );

  // US variant bullet list 1 (MT5 / 90% Profit Split)
  src = src.replace(
    /<ul class="elementor-icon-list-items">\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">MT5, cTrader &amp; TradeLocker<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">Up to 90% Profit Split<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">Your EAs Allowed<\/span>\s*<\/li>\s*<\/ul>/,
    `<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Bitcoin, Ethereum &amp; 50+ Cryptocurrencies</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">NYSE, NASDAQ &amp; Global Stock Markets</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Gold, Silver &amp; Precious Metals</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Fractional Real Estate Investment</span></li>
</ul>`
  );

  // US variant bullet list 2 (Scale Up / No Trailing Drawdown)
  src = src.replace(
    /<ul class="elementor-icon-list-items">\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">Scale Up To \$5 Million<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">No Trailing Drawdown<\/span>\s*<\/li>\s*<li class="elementor-icon-list-item">\s*<span class="elementor-icon-list-text">News Trading Allowed<\/span>\s*<\/li>\s*<\/ul>/,
    `<ul class="elementor-icon-list-items">
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Fully Decentralized Infrastructure</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">AI-Powered Market Insights</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">Bank-Grade Security</span></li>
<li class="elementor-icon-list-item"><span class="elementor-icon-list-text">24/7 Global Markets</span></li>
</ul>`
  );

  // CTA buttons — hero primary
  src = src.replace(
    /(<span class="elementor-button-text">)Buy a Challenge(<\/span>)/g,
    '$1Start Investing$2'
  );
  src = src.replace(
    /(<span class="elementor-button-text">)Go Instant(<\/span>)/g,
    '$1Explore Markets$2'
  );

  // Disclaimer text
  src = src.replace(
    /All trading activity takes place in a simulated trading environment\. Funds allocated are fictitious\./g,
    'All investment activity involves risk. Multixpro Holdings &amp; Co. is a registered trademark of the United States.'
  );
  src = src.replace(
    /<p>All trading activity takes place in a simulated environment<\/p>/g,
    '<p>All investment activity involves risk. Multixpro Holdings &amp; Co. is a registered trademark of the United States.</p>'
  );

  return src;
}

// ─── STEP 5: ASSET CLASS SECTION (insert after hero, before payout strip) ───

const ASSET_CLASS_SECTION = `
<!-- ═══ MULTIXPRO ASSET CLASSES SECTION ═══ -->
<section id="asset-classes" style="background:#070B14;padding:80px 20px;font-family:inherit;">
  <div style="max-width:1200px;margin:0 auto;text-align:center;">
    <h2 style="color:#fff;font-size:clamp(28px,4vw,48px);font-weight:700;margin-bottom:12px;">Every Asset Class. One Account.</h2>
    <p style="color:#94A3B8;font-size:18px;margin-bottom:56px;">Access global markets through a single, decentralized platform.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;">
      <!-- Crypto -->
      <a href="#crypto" style="text-decoration:none;">
        <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 28px;text-align:left;transition:border-color .2s;" onmouseover="this.style.borderColor='#00E27A'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
          <div style="width:52px;height:52px;background:rgba(0,226,122,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E27A" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 0 1 0 4H9zm0 4h5a2 2 0 0 1 0 4H9z"/><line x1="9" y1="8" x2="9" y2="16"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>
          </div>
          <h3 style="color:#fff;font-size:20px;font-weight:600;margin:0 0 10px;">Cryptocurrency</h3>
          <p style="color:#94A3B8;font-size:15px;line-height:1.6;margin:0;">Trade 50+ cryptocurrencies including BTC, ETH, SOL and more on a fully decentralized infrastructure.</p>
        </div>
      </a>
      <!-- Stocks -->
      <a href="#stocks" style="text-decoration:none;">
        <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 28px;text-align:left;transition:border-color .2s;" onmouseover="this.style.borderColor='#00E27A'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
          <div style="width:52px;height:52px;background:rgba(0,226,122,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E27A" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          </div>
          <h3 style="color:#fff;font-size:20px;font-weight:600;margin:0 0 10px;">Stocks &amp; Equities</h3>
          <p style="color:#94A3B8;font-size:15px;line-height:1.6;margin:0;">Access NYSE, NASDAQ, LSE and global stock markets with fractional share investing and real-time data.</p>
        </div>
      </a>
      <!-- Gold -->
      <a href="#gold" style="text-decoration:none;">
        <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 28px;text-align:left;transition:border-color .2s;" onmouseover="this.style.borderColor='#00E27A'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
          <div style="width:52px;height:52px;background:rgba(0,226,122,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E27A" stroke-width="2"><rect x="2" y="8" width="20" height="12" rx="2"/><path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/></svg>
          </div>
          <h3 style="color:#fff;font-size:20px;font-weight:600;margin:0 0 10px;">Gold &amp; Precious Metals</h3>
          <p style="color:#94A3B8;font-size:15px;line-height:1.6;margin:0;">Invest in gold-backed assets, silver, and platinum as a hedge against inflation and market volatility.</p>
        </div>
      </a>
      <!-- Real Estate -->
      <a href="#realestate" style="text-decoration:none;">
        <div style="background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:36px 28px;text-align:left;transition:border-color .2s;" onmouseover="this.style.borderColor='#00E27A'" onmouseout="this.style.borderColor='rgba(255,255,255,0.08)'">
          <div style="width:52px;height:52px;background:rgba(0,226,122,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00E27A" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <h3 style="color:#fff;font-size:20px;font-weight:600;margin:0 0 10px;">Real Estate</h3>
          <p style="color:#94A3B8;font-size:15px;line-height:1.6;margin:0;">Own fractional shares of residential and commercial properties and earn passive rental income.</p>
        </div>
      </a>
    </div>
  </div>
</section>
<!-- ═══ END ASSET CLASSES ═══ -->
`;

function insertAssetSection(src) {
  if (src.includes('id="asset-classes"')) return src; // already added
  // Insert after the hero container ends, before the ticker/payout strip
  // The ticker strip has class "ticker-carousel"
  const marker = 'class="elementor-element elementor-element-138e885 ticker-carousel';
  const idx = src.indexOf(marker);
  if (idx === -1) {
    // fallback: insert before payout certificates section
    const fallback = 'block-info_ticker';
    const fi = src.indexOf(fallback);
    if (fi === -1) return src;
    // Find the containing div start
    const before = src.lastIndexOf('<div', fi);
    return src.slice(0, before) + ASSET_CLASS_SECTION + src.slice(before);
  }
  const before = src.lastIndexOf('<div', idx);
  return src.slice(0, before) + ASSET_CLASS_SECTION + src.slice(before);
}

// ─── STEP 6: COMPARISON TABLE EDITS ─────────────────────────────────────────

function applyComparisonEdits(src) {
  // Column header
  src = src.replace(/FunderPro Pro Account/g, 'Multixpro.ai');
  // Row labels
  src = src.replace(/Rewards Frequency/g, 'Returns Frequency');
  src = src.replace(/First Reward Wait/g, 'First Withdrawal Wait');
  src = src.replace(/Reward Guarantee/g, 'Platform Guarantee');
  src = src.replace(/Risk of market manipulation/g, 'Platform Transparency');
  return src;
}

// ─── STEP 7: PRICING TABLE EDITS ────────────────────────────────────────────

function applyPricingEdits(src) {
  // Tab labels
  src = src.replace(/\bChallenge\b(?= tab| Tab)/g, 'Investment Plans');
  src = src.replace(/data-title="Challenge"/g, 'data-title="Investment Plans"');
  src = src.replace(/>Challenge Condition</g, '>Investment Plan Conditions<');
  src = src.replace(/>Compare all our Challenges/g, '>Compare all our Investment Plans');
  src = src.replace(/Instant Program/g, 'Instant Account');

  // Plan type names
  src = src.replace(/>One Phase</g, '>Starter Plan<');
  src = src.replace(/>Classic</g, '>Classic Plan<');
  src = src.replace(/data-title="One Phase"/g, 'data-title="Starter Plan"');
  src = src.replace(/data-title="Classic"/g, 'data-title="Classic Plan"');
  src = src.replace(/data-title="Pro"(?![\w])/g, 'data-title="Pro Plan"');
  src = src.replace(/data-product="one-phase"/g, 'data-product="starter-plan"');
  src = src.replace(/data-desc="One Phase 1-Phase"/g, 'data-desc="Starter Plan 1-Phase"');
  src = src.replace(/data-desc="Classic 2-Phase"/g, 'data-desc="Classic Plan 2-Phase"');
  src = src.replace(/data-desc="Pro 2-Phase"/g, 'data-desc="Pro Plan 2-Phase"');

  // Button text in pricing table
  src = src.replace(
    /Buy <span class="price"><\/span> <span class="product"><\/span> Challenge/g,
    'Start <span class="price"></span> <span class="product"></span> Plan'
  );
  src = src.replace(
    /<a href="[^"]*buy-challenge[^"]*" class="btn product-table-button"[^>]*>/g,
    (m) => m
  );

  // Column headers in the info table
  src = src.replace(/Phase 1 \(demo trading\)/g, 'Verification Phase');
  src = src.replace(/Phase 2 \(demo trading\)/g, 'Growth Phase');
  src = src.replace(/Funded Account(?!s)/g, 'Live Account');

  // Row labels
  src = src.replace(/>Profit Target</g, '>Return Target<');
  src = src.replace(/>Profit Split</g, '>Earnings Split<');
  src = src.replace(/Challenge Duration/g, 'Plan Duration');
  src = src.replace(/Reward Frequency/g, 'Withdrawal Frequency');
  src = src.replace(/Challenge Leverage/g, 'Account Leverage');
  src = src.replace(/Consistency Rule/g, 'Portfolio Rule');

  return src;
}

// ─── STEP 8: FOOTER EDITS (all files) ───────────────────────────────────────

function applyFooterEdits(src) {
  // Footer tagline/description
  src = src.replace(
    /class="site-footer__content--info"[^>]*>[\s\S]*?<img[^>]*footer-logo[^>]*>/,
    (m) => m
  );

  // Copyright / legal line
  src = src.replace(
    /© \d{4} FunderPro[^<]*/g,
    '© 2025 Multixpro Holdings &amp; Co. All Rights Reserved. Multixpro.ai is a registered trademark of the United States.'
  );
  src = src.replace(
    /© \d{4} Multixpro[^<]*/g,
    '© 2025 Multixpro Holdings &amp; Co. All Rights Reserved. Multixpro.ai is a registered trademark of the United States.'
  );

  // Footer nav: add Leadership link under the About/Company column
  // Find footer's About nav section and add Leadership
  src = src.replace(
    /(<a href="\/prop-trading-technology\/">[^<]*<\/a><\/li>)([\s\S]*?)(<\/ul>[\s\S]*?<\/li>[\s\S]*?<div class="site-footer__content--addresses mobile")/,
    (m, item, mid, after) => {
      if (m.includes('/leadership/')) return m;
      return `${item}
<li class="menu-item js-item"><a href="/leadership/">Leadership</a></li>${mid}${after}`;
    }
  );

  // Replace funderpro.com hrefs in footer nav with #
  src = src.replace(
    /href="https?:\/\/(?:www\.)?funderpro\.com([^"]*)"(?=[^>]*>(?![\s\S]*?<img))/g,
    'href="#"'
  );

  return src;
}

// ─── STEP 9: LEADERSHIP SECTION HTML ────────────────────────────────────────

const LEADERSHIP_SECTION = `
<!-- ═══ LEADERSHIP SECTION ═══ -->
<section id="leadership" style="background:#070B14;padding:100px 20px 80px;font-family:inherit;">
  <div style="max-width:1200px;margin:0 auto;text-align:center;">
    <h2 style="color:#fff;font-size:clamp(28px,4vw,48px);font-weight:700;margin-bottom:12px;">Leadership</h2>
    <p style="color:#94A3B8;font-size:18px;margin-bottom:64px;">The team driving the future of decentralized investing.</p>

    <!-- Managing Director Card -->
    <div style="max-width:480px;margin:0 auto;background:#111827;border:2px solid #B8960C;border-radius:20px;padding:48px 36px;text-align:center;box-shadow:0 0 40px rgba(184,150,12,0.15);">

      <!-- ⚠️ CLIENT TO SUPPLY PORTRAIT: save file as stephanie-diomin.jpg in /assets/images/ -->
      <div style="width:140px;height:140px;margin:0 auto 28px;border-radius:50%;overflow:hidden;border:3px solid #B8960C;background:#1E2940;display:flex;align-items:center;justify-content:center;">
        <img src="/assets/images/stephanie-diomin.jpg"
             alt="Stephanie Alvina Diomin"
             style="width:100%;height:100%;object-fit:cover;"
             onerror="this.style.display='none';this.parentElement.querySelector('.portrait-placeholder').style.display='flex';" />
        <div class="portrait-placeholder" style="display:none;flex-direction:column;align-items:center;justify-content:center;color:#94A3B8;font-size:13px;width:100%;height:100%;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#B8960C" stroke-width="1.5" style="margin-bottom:6px;"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          Portrait Coming Soon
        </div>
      </div>

      <h3 style="color:#fff;font-size:24px;font-weight:700;margin:0 0 6px;">Stephanie Alvina Diomin, CPWA&reg;</h3>
      <p style="color:#B8960C;font-size:15px;font-weight:600;margin:0 0 24px;letter-spacing:0.04em;">Managing Director — Multixpro Holdings &amp; Co.</p>

      <p style="color:#CBD5E1;font-size:15px;line-height:1.75;margin:0 0 36px;text-align:left;">
        Stephanie Alvina Diomin is a Certified Private Wealth Advisor (CPWA&reg;) and licensed finance professional with extensive expertise in real estate and investment strategy. As Managing Director of Multixpro Holdings &amp; Co., she oversees global investment operations and leads the firm's client growth and partnerships worldwide.
      </p>

      <!-- Social links -->
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;">
        <a href="https://instagram.com/InvestWithDiomin" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:10px 18px;color:#fff;text-decoration:none;font-size:14px;font-weight:500;transition:background .2s,border-color .2s;"
           onmouseover="this.style.background='rgba(0,226,122,0.1)';this.style.borderColor='#00E27A'" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(255,255,255,0.12)'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          @InvestWithDiomin
        </a>
        <a href="https://linkedin.com/in/InvestWithDiomin" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:10px 18px;color:#fff;text-decoration:none;font-size:14px;font-weight:500;transition:background .2s,border-color .2s;"
           onmouseover="this.style.background='rgba(0,226,122,0.1)';this.style.borderColor='#00E27A'" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(255,255,255,0.12)'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          InvestWithDiomin
        </a>
        <a href="https://bsky.app/profile/InvestWithDiomin" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:10px 18px;color:#fff;text-decoration:none;font-size:14px;font-weight:500;"
           onmouseover="this.style.background='rgba(0,226,122,0.1)';this.style.borderColor='#00E27A'" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(255,255,255,0.12)'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>
          @InvestWithDiomin
        </a>
        <a href="https://wa.me/18053956873" target="_blank" rel="noopener"
           style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:10px 18px;color:#fff;text-decoration:none;font-size:14px;font-weight:500;"
           onmouseover="this.style.background='rgba(0,226,122,0.1)';this.style.borderColor='#00E27A'" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(255,255,255,0.12)'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          +1 (805) 395-6873
        </a>
      </div>
    </div>
  </div>
</section>
<!-- ═══ END LEADERSHIP ═══ -->
`;

function insertLeadershipSection(src) {
  if (src.includes('id="leadership"')) return src;
  // Insert directly before <footer
  const footerIdx = src.indexOf('<footer ');
  if (footerIdx === -1) {
    const footerIdx2 = src.indexOf('<footer>');
    if (footerIdx2 === -1) return src + LEADERSHIP_SECTION;
    return src.slice(0, footerIdx2) + LEADERSHIP_SECTION + src.slice(footerIdx2);
  }
  return src.slice(0, footerIdx) + LEADERSHIP_SECTION + src.slice(footerIdx);
}

// ─── CREATE LEADERSHIP PAGE ──────────────────────────────────────────────────

function createLeadershipPage(indexSrc) {
  // Extract navbar and footer from index.html
  const headerStart = indexSrc.indexOf('<header ');
  const headerEnd = indexSrc.indexOf('</header>') + '</header>'.length;
  const header = headerStart >= 0 ? indexSrc.slice(headerStart, headerEnd) : '';

  const footerStart = indexSrc.indexOf('<footer ');
  const footerEnd = indexSrc.indexOf('</footer>') + '</footer>'.length;
  const footer = footerStart >= 0 ? indexSrc.slice(footerStart, footerEnd) : '';

  // Extract <head> from index
  const headStart = indexSrc.indexOf('<head>');
  const headEnd = indexSrc.indexOf('</head>') + '</head>'.length;
  const head = headStart >= 0
    ? indexSrc.slice(headStart, headEnd)
        .replace(/<title>[^<]*<\/title>/,
          '<title>Leadership | Multixpro.ai | Multixpro Holdings &amp; Co.</title>')
    : '<head><meta charset="UTF-8"><title>Leadership | Multixpro.ai</title></head>';

  return `<!doctype html>
<html lang="en-US">
${head}
<body style="background:#070B14;margin:0;font-family:system-ui,-apple-system,sans-serif;">
${header}
<main style="padding-top:80px;">
  <div style="max-width:800px;margin:0 auto;padding:40px 20px 0;text-align:left;">
    <a href="/" style="color:#00E27A;text-decoration:none;font-size:15px;font-weight:500;">&#8592; Back to Home</a>
  </div>
  ${LEADERSHIP_SECTION}
</main>
${footer}
</body>
</html>`;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

const htmlFiles = walk(ROOT);
console.log(`Found ${htmlFiles.length} HTML files`);

let indexSrc = null;

for (const file of htmlFiles) {
  let src = readFileSync(file, 'utf8');
  const rel = file.replace(ROOT, '');

  // Step 1: global rebrand
  src = applyGlobalBrand(src);

  // Step 3: nav edits
  src = applyNavEdits(src);

  // Step 6: comparison edits
  src = applyComparisonEdits(src);

  // Step 7: pricing edits
  src = applyPricingEdits(src);

  // Step 8: footer edits
  src = applyFooterEdits(src);

  // Index-only edits
  if (rel === '/index.html') {
    src = applyHeroEdits(src);
    src = insertAssetSection(src);
    src = insertLeadershipSection(src);
    indexSrc = src;
  }

  save(file, src);
  console.log('Edited:', rel);
}

// Create leadership page
if (indexSrc) {
  const leadershipDir = join(ROOT, 'leadership');
  if (!existsSync(leadershipDir)) mkdirSync(leadershipDir, { recursive: true });
  const leadershipPage = createLeadershipPage(indexSrc);
  writeFileSync(join(leadershipDir, 'index.html'), leadershipPage, 'utf8');
  console.log('Created: /leadership/index.html');
}

console.log('\n✅ All edits applied successfully.');
