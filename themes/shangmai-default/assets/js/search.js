(function(){
  const q = document.getElementById('q');
  const box = document.getElementById('search-results');
  if(!q || !box) return;

  const lang = document.documentElement.lang || 'zh';
  const idxUrl = `/${lang}/search/index.json`;

  let idx, docs = [];
  async function init(){
    try{
      const res = await fetch(idxUrl, { headers: { 'accept': 'application/json' }});
      docs = await res.json();
      idx = lunr(function(){
        this.ref('id');
        this.field('title'); this.field('desc'); this.field('tags');
        docs.forEach(d => this.add(d), this);
      });
    }catch(e){ console.warn('Search init failed', e); }
  }
  function render(list){
    if(!list || !list.length){ box.classList.remove('active'); box.innerHTML=''; return; }
    box.innerHTML = list.slice(0,8).map(r=>{
      const d = docs.find(x=>x.id===r.ref);
      return `<a href="${d.url}" role="option">${d.title}</a>`;
    }).join('');
    box.classList.add('active');
  }
  q.addEventListener('input', e=>{
    const val = e.target.value.trim();
    if(!idx || val.length<1){ render([]); return; }
    const res = idx.search(val);
    render(res);
  });
  document.addEventListener('click', e=>{
    if(!box.contains(e.target) && e.target!==q) box.classList.remove('active');
  });
  init();
})();