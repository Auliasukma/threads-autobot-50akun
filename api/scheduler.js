export default async function handler(req, res) {
  try {
    const accounts = JSON.parse(process.env.THREADS_ACCOUNTS || '[]');
    const results = [];
    
    for (const account of accounts) {
      const success = await safePost(account);
      results.push({ username: account.username, success });
      await new Promise(r => setTimeout(r, 120000 + Math.random() * 180000)); // 2-5 min delay
    }
    
    res.json({ success: true, results, total: results.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
    
    const page = await browser.newPage();
    await page.setViewport({
        width: 1366 + Math.floor(Math.random() * 200),
        height: 768 + Math.floor(Math.random() * 200)
    });
    
    // SESSION LOGIN
    await page.setCookie({ name: 'sessionid', value: account.session });
    
    // HUMAN BEHAVIOR (5 menit)
    await page.goto('https://threads.net');
    await humanScroll(page);
    await randomDelay(3000, 8000);
    
    // POST
    await page.goto('https://threads.net/compose/post');
    await humanType(page, '[data-testid="composer-text-input"]', account.posts[0].content);
    
    if (account.posts[0].image) {
        await page.setInputFiles('input[type="file"]', account.posts[0].image);
    }
    
    await humanClick(page, 'button[type="submit"]');
    await page.waitForTimeout(5000);
    
    await browser.close();
}

// ANTI-DETECTION HELPERS
async function randomDelay(min, max) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise(r => setTimeout(r, delay));
}

async function humanScroll(page) {
    await page.evaluate(async () => {
        for (let i = 0; i < 5; i++) {
            window.scrollBy(0, 200 + Math.random() * 300);
            await new Promise(r => setTimeout(r, 1000 + Math.random() * 2000));
        }
    });
}

async function humanType(page, selector, text) {
    await page.focus(selector);
    for (let char of text) {
        await page.keyboard.type(char);
        await page.waitForTimeout(50 + Math.random() * 100);
    }
}

async function humanClick(page, selector) {
    await page.mouse.move(
        Math.random() * 800, Math.random() * 600
    );
    await page.click(selector);
}

function randomUA() {
    const UAs = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // 50+ UA berbeda
    ];
    return UAs[Math.floor(Math.random() * UAs.length)];
}

async function fetchProxies() {
    // Auto-fetch 50 proxy gratis
    return ['103.147.23.45:8080', '196.41.101.46:8080']; // Demo
}

// RUN
postAllAccounts().catch(console.error);
      
