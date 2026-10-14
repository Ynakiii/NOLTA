document.querySelectorAll('[data-page-link]').forEach((link) => { if (link.getAttribute('href') === location.pathname.split('/').pop() || (link.getAttribute('href') === 'index.html' && !location.pathname.split('/').pop())) link.classList.add('active'); });
document.querySelectorAll('[data-confirm]').forEach((button) => button.addEventListener('click', (event) => { if (!window.confirm(button.dataset.confirm)) event.preventDefault(); }));
window.showMessage = (message) => { const toast = document.querySelector('#toast'); if (!toast) return; toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 3000); };
const activeDemoUser = window.NoltaAuth?.active?.();
const demoRole = activeDemoUser?.role || localStorage.getItem('noltaDemoRole') || 'admin';
const roleBadge = document.querySelector('.admin-badge');
if (roleBadge) roleBadge.textContent = demoRole === 'user' ? 'USER DEMO' : 'ADMIN DEMO';
const roleSwitch = document.createElement('button');
roleSwitch.className = 'role-switch';
roleSwitch.textContent = demoRole === 'user' ? 'Switch to Admin' : 'Switch to User';
roleSwitch.type = 'button';
roleSwitch.onclick = () => { const nextRole = demoRole === 'user' ? 'admin' : 'user'; const nextUser = window.NoltaAuth?.users?.().find((user) => user.role === nextRole); if (nextUser) window.NoltaAuth.setActive(nextUser.id); else localStorage.setItem('noltaActiveUserId', nextRole === 'user' ? 'user-demo' : 'user-admin'); localStorage.setItem('noltaDemoRole', nextRole); window.location.href = nextRole === 'user' ? 'user-home.html' : 'index.html'; };

if (window.Nolta && !window.Nolta.__prototypeFixes) {
  window.Nolta.resetReservations = () => window.Nolta.setReservations([]);
  const originalValidate = window.Nolta.validateReservation;
  window.Nolta.validateReservation = (details) => {
    const error = originalValidate(details);
    if (error || !details?.courtId || !details?.start) return error;
    const court = window.Nolta.getCourt(details.courtId);
    const interval = Number(court?.startInterval) || 30;
    const offset = window.Nolta.timeToMinutes(details.start) - window.Nolta.timeToMinutes(court.open);
    return offset % interval === 0 ? null : `Start times must use the ${interval}-minute interval.`;
  };
  const originalSetReservations = window.Nolta.setReservations;
  window.Nolta.setReservations = (items) => originalSetReservations(items.map((item) => item.userId ? item : { ...item, userId: localStorage.getItem('noltaActiveUserId') || 'user-admin' }));
  window.Nolta.__prototypeFixes = true;
}
document.querySelector('.topbar')?.appendChild(roleSwitch);
window.addEventListener('storage',(event)=>{if(['noltaCourts','noltaReservations','noltaScheduleRules'].includes(event.key)) window.location.reload();});
