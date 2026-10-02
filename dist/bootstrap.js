const videoRoute = () => location.hash.split('?')[0] === '#demo-video';
const startedInVideo = videoRoute();
window.addEventListener('hashchange', event => {
  if (videoRoute() !== startedInVideo) {
    event.stopImmediatePropagation();
    location.reload();
  }
});
if (startedInVideo) {
  const {mountDemoVideo} = await import('./demo-video.js');
  mountDemoVideo();
} else {
  if (new URLSearchParams(location.search).get('videoSession') === '1') {
    document.body.classList.add('video-session');
    const style = document.createElement('link');
    style.rel = 'stylesheet'; style.href = 'demo-video.css'; document.head.append(style);
  }
  await import('./app.js');
}
