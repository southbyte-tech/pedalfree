import { chromium, devices } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdir, writeFile } from 'node:fs/promises'

await mkdir('/tmp/pedalfree-review', { recursive: true })
const browser = await chromium.launch()
for (const size of ['desktop', 'mobile']) {
  const context = await browser.newContext(size === 'desktop' ? { viewport: { width: 1440, height: 1000 } } : { ...devices['iPhone 13'] })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:5173')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1800)
  await page.screenshot({ path: `/tmp/pedalfree-review/${size}-hero.png` })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('slider').fill('85')
  await page.waitForTimeout(250)
  await page.locator('#impacto').screenshot({ path: `/tmp/pedalfree-review/${size}-impact.png`, style: '.site-header, .skip-link { visibility: hidden !important; }' })
  await page.screenshot({ path: `/tmp/pedalfree-review/${size}-full.png`, fullPage: true })
  await page.locator('.campaign-section').screenshot({ path: `/tmp/pedalfree-review/${size}-campaign.png` })
  const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  const summary = scan.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, issue: n.failureSummary })) }))
  await writeFile(`/tmp/pedalfree-review/${size}-axe.json`, JSON.stringify(summary, null, 2))
  console.log(size, JSON.stringify(summary))
  await context.close()
}
for (const width of [320, 768, 1024]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
  await page.goto('http://127.0.0.1:5173')
  await page.evaluate(() => document.fonts.ready)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  if (overflow) throw new Error(`Horizontal overflow at ${width}px`)
  await page.screenshot({ path: `/tmp/pedalfree-review/width-${width}.png` })
  console.log(`${width}px: no horizontal overflow`)
  await page.close()
}
await browser.close()
