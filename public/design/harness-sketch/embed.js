// Portfolio adapter. The V9 animation and its clock remain unchanged.
if (new URLSearchParams(location.search).has('embed')) {
  document.documentElement.classList.add('portfolio-embed');
  const style = document.createElement('style');
  style.textContent = '.portfolio-embed header a,.portfolio-embed .edition,.portfolio-embed .intro,.portfolio-embed footer,.portfolio-embed details{display:none}.portfolio-embed header{justify-content:flex-end;height:48px}.portfolio-embed main{padding-bottom:12px}.portfolio-embed .stage{max-height:none}';
  document.head.append(style);
  const reportSize = () => parent.postMessage({ type: 'harness-sketch-size', height: document.body.getBoundingClientRect().height }, location.origin);
  new ResizeObserver(reportSize).observe(document.body);
  document.fonts.ready.then(reportSize);
  window.addEventListener('load', reportSize);
}
