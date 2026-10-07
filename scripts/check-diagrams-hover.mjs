import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import puppeteer from 'puppeteer'

// Exercise the real tooltip markup and CSS against the shared link rules.
const source = readFileSync(new URL('../src/pages/diagrams/index.astro', import.meta.url), 'utf8')
const markup = source.match(/tooltip\.innerHTML = `([^`]+)`/)[1]
const tooltipCss = source.match(/:global\(\.diagram-guide-tooltip\)\s*\{[\s\S]*?(?=\n\.diagram-container)/)[0]
  .replace(/:global\(([^)]+)\)/g, '$1')
const sharedCss = ['global.css', 'components.css'].map(file =>
  readFileSync(new URL(`../src/styles/${file}`, import.meta.url), 'utf8')).join('\n')
const browser = await puppeteer.launch({ headless: true })
try {
  const page = await browser.newPage()
  const link = '.diagram-guide-tooltip-link'
  if (process.argv[2]) {
    await page.goto(process.argv[2], { waitUntil: 'networkidle2' })
    await page.click('.diagram-container svg .node')
    await page.waitForSelector('.diagram-guide-tooltip.is-visible')
    assert.equal(page.url(), process.argv[2], 'SVG click must open the tooltip without navigating')
    const href = await page.$eval(link, el => el.href)
    assert.ok(href.startsWith('https://'), `Tooltip destination: ${href}`)
    console.log(`Actual page tooltip: ${href}`)
  } else {
    await page.setContent(`<style>${sharedCss}\n${tooltipCss}</style><div class="diagram-guide-tooltip is-visible">${markup}</div>`)
    await page.$eval(link, el => { el.href = 'https://example.com/guide' })
  }
  const luminance = rgb => {
    const channels = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => {
      const v = n / 255
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
    })
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  }
  for (const theme of ['light', 'dark']) {
    await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme)
    for (const interaction of ['hover', 'focus']) {
      if (process.argv[2]) {
        await page.hover('.diagram-container svg .node')
        await page.waitForSelector('.diagram-guide-tooltip.is-visible')
      }
      if (interaction === 'hover') await page.hover(link)
      else {
        await page.mouse.move(500, 500)
        await page.keyboard.press('Tab')
        await page.focus(link)
        assert.ok(await page.$eval(link, el => el.matches(':focus-visible')), `${theme}: keyboard focus must be visible`)
      }
      // Wait for the component's color transition, not for page loading.
      await page.$eval(link, async el => {
        await Promise.all(el.getAnimations().map(animation => animation.finished))
      })
      assert.ok(await page.$eval('.diagram-guide-tooltip', el => el.classList.contains('is-visible') && getComputedStyle(el).opacity === '1'), `${theme} ${interaction}: tooltip must remain visible`)
      const colors = await page.$eval(link, el => {
        const style = getComputedStyle(el)
        return { text: style.color, background: style.backgroundColor }
      })
      const values = [luminance(colors.text), luminance(colors.background)].sort((a, b) => a - b)
      const contrast = (values[1] + 0.05) / (values[0] + 0.05)
      assert.ok(contrast >= 4.5, `${theme} ${interaction}: contrast ${contrast.toFixed(2)}, ${JSON.stringify(colors)}`)
      console.log(`${theme} ${interaction}: ${contrast.toFixed(2)}:1`)
      await page.$eval(link, el => el.blur())
    }
  }
} finally {
  await browser.close()
}
