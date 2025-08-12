// ESC 关闭搜索下拉
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const box = document.getElementById('search-results');
    if (box) box.classList.remove('active');
  }
});