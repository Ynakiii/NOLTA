window.NoltaAuth = (() => {
  const KEY = 'noltaDemoUsers'; const ACTIVE = 'noltaActiveUserId';
  const defaults = [{ id: 'user-admin', name: 'Admin Demo', email: 'admin@nolta.test', role: 'admin' }, { id: 'user-demo', name: 'Demo User', email: 'user@nolta.test', role: 'user' }];
  let users; try { users = JSON.parse(localStorage.getItem(KEY)) || defaults; } catch { users = defaults; }
  if (!Array.isArray(users) || !users.length) users = defaults; localStorage.setItem(KEY, JSON.stringify(users));
  const active = () => users.find((user) => user.id === localStorage.getItem(ACTIVE)) || users.find((user) => user.role === 'user') || users[0];
  const setActive = (id) => { if (users.some((user) => user.id === id)) localStorage.setItem(ACTIVE, id); };
  const createUser = (name, email) => { const normalized = email.trim().toLowerCase(); if (users.some((user) => user.email === normalized)) return null; const user = { id: `user-${Date.now()}`, name: name.trim(), email: normalized, role: 'user' }; users.push(user); localStorage.setItem(KEY, JSON.stringify(users)); setActive(user.id); return user; };
  return { users: () => users, active, setActive, createUser, logout: () => localStorage.removeItem(ACTIVE) };
})();
