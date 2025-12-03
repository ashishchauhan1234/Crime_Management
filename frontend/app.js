// CIMS - frontend demo app.js
// Single-file logic for storage, auth, CRUD, rendering

const KEY_USERS = 'cims_users_v2';
const KEY_FIRS  = 'cims_firs_v2';
const KEY_CRIM  = 'cims_crim_v2';

// Helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const uid = (p='id') => p + '_' + Math.random().toString(36).slice(2,9);

// Storage helpers
function read(key){ return JSON.parse(localStorage.getItem(key) || '[]'); }
function write(key, arr){ localStorage.setItem(key, JSON.stringify(arr)); }

// Users
function readUsers(){ return read(KEY_USERS); }
function writeUsers(u){ write(KEY_USERS, u); }
function getUserByUsername(username){ return readUsers().find(x=>x.username===username); }

// FIRs
function readFIRs(){ return read(KEY_FIRS); }
function writeFIRs(list){ write(KEY_FIRS, list); }
// Criminals
function readCriminals(){ return read(KEY_CRIM); }
function writeCriminals(list){ write(KEY_CRIM, list); }

// Session
function currentUser(){ return JSON.parse(sessionStorage.getItem('cims_user') || 'null'); }
function loginSession(user){ sessionStorage.setItem('cims_user', JSON.stringify(user)); }
function logoutSession(){ sessionStorage.removeItem('cims_user'); }

// Seed sample admin if no users
(function seed(){
  if (!localStorage.getItem(KEY_USERS)){
    const admin = { id: uid('U'), name:'Administrator', username:'admin', password:'admin123', role:'admin' };
    writeUsers([admin]);
  }
  if (!localStorage.getItem(KEY_FIRS)){
    writeFIRs([]);
  }
  if (!localStorage.getItem(KEY_CRIM)){
    writeCriminals([]);
  }
})();

// UI helpers to show/hide role-specific elements
function requireLogin(redirectTo='login.html'){
  if (!currentUser()){
    window.location.href = redirectTo;
    return false;
  }
  return true;
}

// --- Registration (used by register.html) ---
function registerHandler(form){
  const name = form.querySelector('#reg-name').value.trim();
  const username = form.querySelector('#reg-username').value.trim();
  const password = form.querySelector('#reg-password').value;
  const role = form.querySelector('#reg-role').value || 'officer';
  if (!name || !username || !password) { alert('Please fill required'); return; }
  if (getUserByUsername(username)){ alert('Username already exists'); return; }
  const u = { id: uid('U'), name, username, password, role };
  const users = readUsers(); users.push(u); writeUsers(users);
  alert('Registered. Please login.');
  window.location.href = 'login.html';
}

// --- Login (login.html) ---
function loginHandler(form){
  const username = form.querySelector('#login-username').value.trim();
  const password = form.querySelector('#login-password').value;
  const u = getUserByUsername(username);
  if (!u || u.password !== password){ alert('Invalid credentials'); return; }
  loginSession(u);
  window.location.href = 'dashboard.html';
}

// --- Dashboard rendering ---
function dashboardInit(){
  if (!requireLogin()) return;
  const user = currentUser();
  $('#welcome-name').textContent = `${user.name} (${user.role})`;
  $('#total-fir').textContent = readFIRs().length;
  $('#total-crim').textContent = readCriminals().length;
  // recent FIRs
  const recent = readFIRs().slice().reverse().slice(0,5);
  const ul = $('#recent-firs'); if (ul){ ul.innerHTML = ''; recent.forEach(f => {
    const li = document.createElement('li');
    li.textContent = `${f.id} — ${f.complainant} — ${f.type} — ${f.date}`;
    ul.appendChild(li);
  }); }
  // show admin link conditionally
  if (user.role === 'admin') $$('.admin-only').forEach(e=>e.style.display='inline-block');
}

// --- Admin users page ---
function adminInit(){
  if (!requireLogin()) return;
  const user = currentUser();
  if (user.role !== 'admin') { alert('Access denied'); window.location.href='dashboard.html'; return; }
  renderUserTable();
}
function renderUserTable(){
  const tbody = $('#userTable tbody');
  const users = readUsers();
  tbody.innerHTML = '';
  users.forEach((u,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.username}</td><td>${u.name}</td><td>${u.role}</td>
      <td>
        <button class="btn" data-idx="${i}" onclick="adminEdit(${i})">Edit</button>
        <button class="btn outline" data-idx="${i}" onclick="adminDelete(${i})">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}
function adminDelete(i){
  if (!confirm('Delete user?')) return;
  const users = readUsers(); users.splice(i,1); writeUsers(users);
  renderUserTable();
}
function adminEdit(i){
  const users = readUsers(); const u = users[i];
  const newName = prompt('Name', u.name);
  if (newName!==null){ u.name = newName; writeUsers(users); renderUserTable(); }
}

// --- FIR page ---
function firInit(){
  if (!requireLogin()) return;
  renderFIRTable();
  if ($('#fir-date')) $('#fir-date').value = new Date().toISOString().slice(0,16);
}
function submitFIR(form){
  const f = {
    id: 'FIR'+Date.now(),
    date: form.querySelector('#fir-date').value || new Date().toLocaleString(),
    complainant: form.querySelector('#fir-complainant').value.trim(),
    type: form.querySelector('#fir-type').value.trim(),
    location: form.querySelector('#fir-location').value.trim(),
    desc: form.querySelector('#fir-desc').value.trim(),
    status: 'Open'
  };
  console.log("Form data : " + f);
  const list = readFIRs(); list.push(f); writeFIRs(list);
  alert('FIR saved'); form.reset(); renderFIRTable();
}
function renderFIRTable(){
  const tbody = $('#firTable tbody');
  const list = readFIRs().slice().reverse();
  tbody.innerHTML = '';
  list.forEach((f,idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${f.id}</td><td>${f.date}</td><td>${f.complainant}</td>
      <td>${f.type}</td><td>${f.location}</td><td>${f.status}</td>
      <td>
        <button class="btn small" onclick="viewFIR('${f.id}')">View</button>
        <button class="btn outline small" onclick="deleteFIR('${f.id}')">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}
function viewFIR(id){
  const f = readFIRs().find(x=>x.id===id);
  alert(`FIR ${f.id}\nComplainant: ${f.complainant}\nType: ${f.type}\nLocation: ${f.location}\nDate: ${f.date}\nNotes: ${f.desc}`);
}
function deleteFIR(id){
  if (!confirm('Delete FIR?')) return;
  const list = readFIRs().filter(x=>x.id!==id); writeFIRs(list); renderFIRTable();
}

// --- Criminals page ---
function criminalsInit(){ if (!requireLogin()) return; renderCrimTable(); }
function submitCrim(form){
  const c = {
    id: 'CR' + Date.now(),
    name: form.querySelector('#cr-name').value.trim(),
    alias: form.querySelector('#cr-alias').value.trim(),
    crime: form.querySelector('#cr-crime').value.trim(),
    age: form.querySelector('#cr-age').value,
    address: form.querySelector('#cr-address').value.trim(),
    notes: form.querySelector('#cr-notes').value.trim()
  };
  const list = readCriminals(); list.push(c); writeCriminals(list);
  alert('Criminal saved'); form.reset(); renderCrimTable();
}
function renderCrimTable(){
  const tbody = $('#crimTable tbody'); const list = readCriminals().slice().reverse();
  tbody.innerHTML = '';
  list.forEach(c=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${c.name}</td><td>${c.alias||''}</td><td>${c.crime}</td><td>${c.age||''}</td>
      <td><button class="btn small" onclick="viewCrim('${c.id}')">View</button>
      <button class="btn outline small" onclick="deleteCrim('${c.id}')">Delete</button></td>`;
    tbody.appendChild(tr);
  });
}
function viewCrim(id){ const c = readCriminals().find(x=>x.id===id); alert(`${c.name} — ${c.crime}\nAlias:${c.alias}\nAddr:${c.address}\nNotes:${c.notes}`); }
function deleteCrim(id){ if (!confirm('Delete record?')) return; writeCriminals(readCriminals().filter(x=>x.id!==id)); renderCrimTable(); }

// --- Search & reports ---
function searchInit(){
  if (!requireLogin()) return;
  $('#q').addEventListener('input', doSearch);
}
function doSearch(){
  const q = $('#q').value.trim().toLowerCase();
  const firs = readFIRs().filter(f=> (f.complainant||'').toLowerCase().includes(q) || (f.id||'').toLowerCase().includes(q));
  const crim = readCriminals().filter(c=> (c.name||'').toLowerCase().includes(q));
  const out = $('#results'); out.innerHTML = '';
  if (firs.length){
    const h = document.createElement('h4'); h.textContent = 'FIRs'; out.appendChild(h);
    firs.forEach(f => { const d = document.createElement('div'); d.className='card'; d.innerHTML=`<b>${f.id}</b> — ${f.complainant} — ${f.type}`; out.appendChild(d); });
  }
  if (crim.length){
    const h = document.createElement('h4'); h.textContent = 'Criminals'; out.appendChild(h);
    crim.forEach(c => { const d = document.createElement('div'); d.className='card'; d.innerHTML=`<b>${c.name}</b> — ${c.crime}`; out.appendChild(d); });
  }
  if (!firs.length && !crim.length) out.innerHTML = '<p class="small-muted">No results</p>';
  // report: count by FIR type
  const counts = {}; readFIRs().forEach(f=> counts[f.type] = (counts[f.type]||0)+1);
  let rpt = '<h4>Report: FIRs by Type</h4><ul>'; Object.entries(counts).forEach(([k,v])=> rpt += `<li>${k}: ${v}</li>`); rpt += '</ul>';
  $('#report').innerHTML = rpt;
}

// small utility to expose for inline onclick handlers
window.registerHandler = registerHandler;
window.loginHandler = loginHandler;
window.dashboardInit = dashboardInit;
window.adminInit = adminInit;
window.adminDelete = adminDelete;
window.adminEdit = adminEdit;
window.firInit = firInit;
window.submitFIR = form => { submitFIR(form); return false; };
window.deleteFIR = deleteFIR;
window.viewFIR = viewFIR;
window.criminalsInit = criminalsInit;
window.submitCrim = form => { submitCrim(form); return false; };
window.viewCrim = viewCrim;
window.deleteCrim = deleteCrim;
window.searchInit = searchInit;
window.doSearch = doSearch;
window.logout = ()=>{ logoutSession(); window.location.href='index.html'; };
