// Users / Permissions / Teams — full portal screen for the kit.
// Faithful to the users-redesign (Ex1List + DetailPage), built on the kit's shared primitives.
// List: Active/Deactivated tabs · Role + Warehouse chips · Group by None/Role/Manager ·
//   Reports-to / Warehouse / Direct-reports columns · internal-scroll table + 50-default pager.
// Detail: Profile · Role & Permissions · Team. Changing the Role recolors the header pill + avatar.

/* ---------------- model ---------------- */
const U_ROLES = {
  exec:       { label: 'Executive',            tier: 4, bg: '#F5F3FF', fg: '#6B21A8' },
  deptmgr:    { label: 'Department Manager',   tier: 3, bg: '#EFF6FF', fg: '#1447E6' },
  itadmin:    { label: 'IT / Admin',           tier: 3, bg: '#ECFDF5', fg: '#047857' },
  supervisor: { label: 'Supervisor',           tier: 2, bg: '#FFF7ED', fg: '#C2410C' },
  rep:        { label: 'Sales Representative', tier: 1, bg: '#F3F4F6', fg: '#4A5565' },
};
const U_ROLE_ORDER = ['exec', 'deptmgr', 'itadmin', 'supervisor', 'rep'];
const U_WAREHOUSES = ['Elizabeth City', 'Farmville', 'Wilmington'];

const U_CAPS = [
  { key: 'insights', section: 'Insights', icon: 'insights', items: [
    { id: 'insights.view', label: 'View Insights dashboards' },
    { id: 'insights.manager', label: 'View Manager View' },
  ]},
  { key: 'sales', section: 'Sales', icon: 'paid', items: [
    { id: 'sales.view', label: 'View Planned Assignments' },
    { id: 'sales.edit', label: 'Create / edit assignments' },
    { id: 'sales.past', label: 'View Past Activity' },
  ]},
  { key: 'orch', section: 'Orchestration', icon: 'route', items: [
    { id: 'orch.edit', label: 'Create / edit Plans' },
    { id: 'orch.view', label: 'View Plans' },
    { id: 'orch.impact', label: 'View Impact' },
  ]},
  { key: 'accounts', section: 'Accounts', icon: 'storefront', items: [
    { id: 'acct.edit', label: 'Edit Account settings' },
    { id: 'acct.view', label: 'View Account settings' },
  ]},
  { key: 'users', section: 'Users', icon: 'group', items: [
    { id: 'users.edit', label: 'Create / edit Users' },
    { id: 'users.view', label: 'View Users' },
    { id: 'users.roles', label: 'Manage Roles & Permissions' },
  ]},
  { key: 'billing', section: 'Billing & Settings', icon: 'settings', items: [
    { id: 'billing.manage', label: 'Manage Billing' },
    { id: 'org.edit', label: 'Edit Org settings' },
  ]},
];
const U_ALL_CAPS = U_CAPS.flatMap((s) => s.items.map((i) => i.id));
const U_ROLE_CAPS = {
  exec: U_ALL_CAPS.slice(),
  itadmin: U_ALL_CAPS.slice(),
  deptmgr: ['insights.view','insights.manager','sales.view','sales.edit','sales.past','orch.edit','orch.view','orch.impact','acct.edit','acct.view','users.view','users.edit'],
  supervisor: ['insights.view','insights.manager','sales.view','sales.edit','sales.past','orch.view','orch.impact','acct.view','users.view'],
  rep: ['insights.view','sales.view','sales.edit','acct.view'],
};
const U_roleGrants = (role) => new Set(U_ROLE_CAPS[role] || []);

// id, first, last, role, warehouses, managerId, routeId, status, title
const U_RAW = [
  ['u-aud','Audrey','Robbins-Bledsoe','exec',['Elizabeth City','Farmville','Wilmington'],null,'','active','VP, Sales'],
  ['u-ala','Alan','Reid Jr.','deptmgr',['Farmville','Wilmington'],'u-aud','','active','Dir., Coastal Region'],
  ['u-kal','Brian','Kallam','deptmgr',['Elizabeth City'],'u-aud','','active','Dir., Northern Region'],
  ['u-adm','Admin','Coastal','itadmin',['Elizabeth City','Farmville','Wilmington'],null,'','active','Systems Admin'],
  ['u-awe','Alice','Weiser','itadmin',['Elizabeth City','Farmville','Wilmington'],null,'','active','IT Operations'],
  ['u-ant','Antonio','White','supervisor',['Farmville'],'u-ala','','active','Farmville team lead'],
  ['u-ban','Brandon','Anderson','supervisor',['Wilmington'],'u-ala','','active','Wilmington team lead'],
  ['u-rec','Brian','Rector','supervisor',['Elizabeth City'],'u-kal','','active','Elizabeth City team lead'],
  ['u-adr','Adrian','Harrison','rep',['Farmville'],'u-ant','83','active',''],
  ['u-ape','Anthony','Perez','rep',['Farmville'],'u-ant','84','active',''],
  ['u-aha','Andrew','Hardison','rep',['Farmville'],'u-ant','85','active',''],
  ['u-bre','Brad','Reavis','rep',['Farmville'],'u-ant','88','active',''],
  ['u-bfl','Baltazar','Flores','rep',['Farmville'],'u-ant','91','active',''],
  ['u-bmc','Brian','McCarty','rep',['Farmville'],'u-ant','92','active',''],
  ['u-aar','Aaron','Rattew','rep',['Wilmington'],'u-ban','12','active',''],
  ['u-ade','Andrew','Demarest','rep',['Wilmington'],'u-ban','14','active',''],
  ['u-ang','Anthony','DeAngelis','rep',['Wilmington'],'u-ban','17','active',''],
  ['u-abu','Austin','Buns-Wright','rep',['Wilmington'],'u-ban','21','active',''],
  ['u-bbu','Brandon','Burris','rep',['Wilmington'],'u-ban','24','active',''],
  ['u-ams','Amandeep','Singh','rep',['Elizabeth City'],'u-rec','41','active',''],
  ['u-bal','Bryan','Alphin','rep',['Elizabeth City'],'u-rec','43','active',''],
  ['u-bgo','Brian','Gomer','rep',['Elizabeth City'],'u-rec','46','active',''],
  ['u-nov','Jordan','Vega','rep',['Wilmington'],null,'','active',''],
  ['u-old','Samuel','Okafor','rep',['Wilmington'],'u-ban','','deactivated',''],
  ['u-old2','Denise','Park','supervisor',['Farmville'],'u-ala','','deactivated','Former team lead'],
];
const U_USERS = U_RAW.map(([id, first, last, role, warehouses, managerId, routeId, status, title]) => ({
  id, first, last, role, warehouses, managerId, routeId, status, title,
  name: `${first} ${last}`,
  initials: (first[0] + (last[0] || '')).toUpperCase(),
  email: `${first[0].toLowerCase()}${last.replace(/[^a-z]/gi, '').toLowerCase()}@coastal-bev.com`,
  username: `${first[0].toLowerCase()}${last.replace(/[^a-z]/gi, '').toLowerCase()}`,
}));
const U_byId = (id) => U_USERS.find((u) => u.id === id);
const U_reports = (id) => U_USERS.filter((u) => u.managerId === id && u.status === 'active');

/* ---------------- presentational ---------------- */
function UAvatar({ user, role, size = 32, ring }) {
  const r = U_ROLES[role || user.role];
  return <span className="g-avatar" style={{ width: size, height: size, fontSize: Math.round(size * 0.38), background: r.bg, color: r.fg, boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 3.5px ${r.fg}` : 'none' }}>{user.initials || '?'}</span>;
}
function URolePill({ role, sm }) {
  const r = U_ROLES[role];
  return <span className={'g-role-pill' + (sm ? ' sm' : '')} style={{ background: r.bg, color: r.fg }}>{r.label}</span>;
}
const U_STATUS = { active: { label: 'Active', bg: '#ECFDF5', fg: '#047857', dot: '#00BC57' }, deactivated: { label: 'Deactivated', bg: '#F3F4F6', fg: '#4A5565', dot: '#99A1AF' } };
function UStatus({ status }) {
  const s = U_STATUS[status];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 10px', borderRadius: 999, background: s.bg, color: s.fg, font: '500 12px/1.5 Inter', whiteSpace: 'nowrap' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />{s.label}</span>;
}
function USectionTitle({ children, style }) {
  return <div style={{ font: '500 13px/1 Inter', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--p-muted)', ...style }}>{children}</div>;
}
// floating menu used by Batch Actions, rows-per-page, role select
function Popover({ open, onClose, children, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  return <span ref={ref} style={{ position: 'relative', display: 'inline-flex', ...style }}>{children}</span>;
}

function UsersScreen() {
  const [openId, setOpenId] = useState(null);
  const [isNew, setIsNew] = useState(false);
  if (isNew) return <UserDetail isNew onBack={() => setIsNew(false)} />;
  if (openId) return <UserDetail user={U_byId(openId)} onBack={() => setOpenId(null)} />;
  return <UsersList onOpen={setOpenId} onNew={() => setIsNew(true)} />;
}

/* ============================ LIST ============================ */
function UsersList({ onOpen, onNew }) {
  const [statusTab, setStatusTab] = useState('active');
  const [groupBy, setGroupBy] = useState('none');
  const [sel, setSel] = useState(new Set());
  const [batch, setBatch] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sizeMenu, setSizeMenu] = useState(false);
  const [open, setOpenGroups] = useState({});

  const inTab = U_USERS.filter((u) => u.status === statusTab);
  const sortedAll = inTab.slice().sort((a, b) => a.name.localeCompare(b.name));
  const deactivatedCount = U_USERS.filter((u) => u.status === 'deactivated').length;
  const activeCount = U_USERS.filter((u) => u.status === 'active').length;

  const toggleSel = (id) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const selManagers = [...sel].map(U_byId).filter((u) => u && U_reports(u.id).length > 0);

  // grouping
  let groups;
  if (groupBy === 'role') {
    groups = U_ROLE_ORDER.map((r) => ({ id: r, kind: 'role', members: sortedAll.filter((u) => u.role === r) })).filter((g) => g.members.length);
  } else if (groupBy === 'manager') {
    const mgrIds = [...new Set(inTab.map((u) => u.managerId).filter(Boolean))].sort((a, b) => (U_ROLES[U_byId(b).role].tier - U_ROLES[U_byId(a).role].tier) || U_byId(a).name.localeCompare(U_byId(b).name));
    groups = mgrIds.map((m) => ({ id: m, kind: 'manager', members: sortedAll.filter((u) => u.managerId === m) }));
    const un = sortedAll.filter((u) => !u.managerId);
    if (un.length) groups.push({ id: '__none', kind: 'unassigned', members: un });
  } else {
    // flat → paginated
    const start = (page - 1) * pageSize;
    groups = [{ id: '__all', kind: 'flat', members: sortedAll.slice(start, start + pageSize) }];
  }
  const isOpen = (g) => (open[g.id] !== undefined ? open[g.id] : !(groupBy === 'role' && g.id === 'rep'));
  const toggleGroup = (id) => setOpenGroups((s) => ({ ...s, [id]: !isOpen({ id }) }));
  const pageCount = Math.max(1, Math.ceil(sortedAll.length / pageSize));
  useEffect(() => { setPage(1); }, [statusTab, pageSize]);

  const COLS = '44px 1fr 188px 196px 180px 120px 36px';

  const Row = ({ u }) => {
    const dr = U_reports(u.id).length;
    const mn = u.managerId ? U_byId(u.managerId) : null;
    const sub = u.role === 'rep' ? (u.routeId ? `Route ${u.routeId}` : '') : u.title;
    const checked = sel.has(u.id);
    return (
      <div className="u-row" onClick={() => onOpen(u.id)} style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', minHeight: 54, padding: '0 16px', borderBottom: '1px solid #F0F1F3', cursor: 'pointer', background: checked ? '#F5F9FF' : 'transparent' }}>
        <span onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center' }}><Checkbox on={checked} onChange={() => toggleSel(u.id)} /></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <UAvatar user={u} size={34} />
          <div style={{ minWidth: 0 }}>
            <div style={{ font: '600 15px/1.2 Inter', color: 'var(--p-ink)', whiteSpace: 'nowrap' }}>{u.name}</div>
            {sub && <div style={{ font: `400 12px/1.3 ${u.role === 'rep' ? 'Geist Mono' : 'Inter'}, sans-serif`, color: 'var(--p-placeholder)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</div>}
          </div>
        </div>
        <div><URolePill role={u.role} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {mn ? <><UAvatar user={mn} size={22} /><span style={{ font: '400 14px Inter', color: 'var(--p-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mn.name}</span></> : <span style={{ color: 'var(--p-border-strong)' }}>—</span>}
        </div>
        <div style={{ font: '400 14px Inter', color: 'var(--p-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.warehouses.join(', ')}</div>
        <div>{dr > 0 ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: "500 13px 'Geist Mono', monospace", color: 'var(--p-text)' }}><Icon name="group" size={16} color="var(--p-placeholder)" />{dr}</span> : <span style={{ color: 'var(--p-border-strong)' }}>—</span>}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Icon name="chevron_right" size={20} color="var(--p-placeholder)" /></div>
      </div>
    );
  };

  const GroupHead = ({ g }) => {
    const o = isOpen(g);
    let title;
    if (g.kind === 'role') title = <URolePill role={g.id} />;
    else if (g.kind === 'manager') title = <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><UAvatar user={U_byId(g.id)} size={22} /><span style={{ font: '600 14px/1 Inter', color: 'var(--p-ink)' }}>{U_byId(g.id).name}</span></span>;
    else title = <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, font: '600 14px/1 Inter', color: '#C2410C' }}><Icon name="person_off" size={18} color="#C2410C" />No manager assigned</span>;
    return (
      <div onClick={() => toggleGroup(g.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 42, padding: '0 16px 0 34px', background: '#FBFCFD', borderBottom: '1px solid #F0F1F3', cursor: 'pointer' }}>
        <span style={{ display: 'flex', transform: o ? 'none' : 'rotate(-90deg)', transition: 'transform .15s' }}><Icon name="expand_more" size={20} color="var(--p-muted)" /></span>
        {title}
        <span style={{ font: "500 11px 'Geist Mono', monospace", color: 'var(--p-muted)', background: '#F0F1F3', padding: '1px 7px', borderRadius: 999 }}>{g.members.length}</span>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0, gap: 18 }}>
      {/* top actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Input icon="search" placeholder="Search by name or email…" style={{ width: 460 }} />
        {sel.size > 0 && <span style={{ font: '500 13px/1 Inter', color: 'var(--p-primary-ink)', background: 'var(--p-primary-tint)', borderRadius: 999, padding: '7px 12px', whiteSpace: 'nowrap' }}>{sel.size} selected</span>}
        <div style={{ flex: 1 }} />
        <Popover open={batch} onClose={() => setBatch(false)}>
          <Button variant="neutral" iconRight="expand_more" disabled={sel.size === 0} onClick={() => setBatch((m) => !m)}>Batch Actions</Button>
          {batch && sel.size > 0 && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, zIndex: 30 }}>
              <Menu items={[
                { label: 'Change Role', icon: 'badge' },
                { label: 'Change Reporting Manager', icon: 'account_tree' },
                { label: 'Edit Warehouse Access', icon: 'warehouse' },
                { divider: true },
                { label: 'Deactivate', icon: 'block', danger: true, onClick: () => setConfirm(true) },
              ]} onSelect={() => setBatch(false)} />
            </div>
          )}
        </Popover>
        <Button variant="primary" icon="add" onClick={onNew}>New User</Button>
      </div>

      {/* tabs + filters + group by */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid var(--p-border)' }}>
        <SegmentedTabs value={statusTab} onChange={setStatusTab} items={[
          { id: 'active', label: 'Active', count: activeCount },
          { id: 'deactivated', label: 'Deactivated', count: deactivatedCount },
        ]} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 8 }}>
          <Chip icon="badge" label="Role" />
          <Chip icon="warehouse" label="Warehouse" />
          <span style={{ font: '400 13px/1 Inter', color: 'var(--p-muted)', marginLeft: 4 }}>Group by</span>
          <div style={{ display: 'inline-flex', gap: 2, padding: 3, background: 'var(--p-surface-tint)', borderRadius: 6 }}>
            {[['none', 'None'], ['role', 'Role'], ['manager', 'Manager']].map(([k, lb]) => (
              <button key={k} onClick={() => setGroupBy(k)} style={{ padding: '5px 12px', border: 'none', borderRadius: 4, cursor: 'pointer', font: '500 13px/1 Inter', background: groupBy === k ? '#fff' : 'transparent', color: groupBy === k ? 'var(--p-ink)' : 'var(--p-text-2)', boxShadow: groupBy === k ? 'var(--shadow-card)' : 'none' }}>{lb}</button>
            ))}
          </div>
        </div>
      </div>

      {/* table — internal scroll, paginated footer (flat only) */}
      <div style={{ border: '1px solid var(--p-border)', borderRadius: 10, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', marginBottom: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', height: 40, padding: '0 16px', background: 'var(--p-surface-alt)', borderBottom: '1px solid var(--p-border)', font: '500 11px/1 Inter', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--p-muted)', flexShrink: 0 }}>
          <span style={{ display: 'flex' }}><Checkbox on={sortedAll.length > 0 && sortedAll.every((u) => sel.has(u.id))} onChange={() => { const all = sortedAll.every((u) => sel.has(u.id)); setSel(all ? new Set() : new Set(sortedAll.map((u) => u.id))); }} /></span>
          <span>Name</span><span>Role</span><span>Reports To</span><span>Warehouse</span><span>Direct Reports</span><span></span>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          {sortedAll.length === 0
            ? <EmptyState inTable icon="group" title={`No ${statusTab} users`} body={statusTab === 'deactivated' ? 'Deactivated users will appear here.' : 'Invite someone to get started.'} />
            : groups.map((g) => (
                <div key={g.id}>
                  {g.kind !== 'flat' && <GroupHead g={g} />}
                  {isOpen(g) && g.members.map((u) => <Row key={u.id} u={u} />)}
                </div>
              ))}
        </div>
        {/* footer: only meaningful for flat (paginated) view */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '10px 16px', background: 'var(--p-surface-alt)', borderTop: '1px solid var(--p-border)', flexShrink: 0 }}>
          <span style={{ font: '400 13px Inter', color: 'var(--p-muted)' }}>
            {groupBy === 'none'
              ? <>Showing <b style={{ color: 'var(--p-text)', fontWeight: 600 }}>{sortedAll.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, sortedAll.length)}</b> of <b style={{ color: 'var(--p-text)', fontWeight: 600 }}>{sortedAll.length}</b> users</>
              : <><b style={{ color: 'var(--p-text)', fontWeight: 600 }}>{sortedAll.length}</b> users · grouped by {groupBy}</>}
          </span>
          {groupBy === 'none' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, font: '400 13px Inter', color: 'var(--p-muted)' }}>Rows
                <Popover open={sizeMenu} onClose={() => setSizeMenu(false)}>
                  <span onClick={() => setSizeMenu((m) => !m)} style={{ display: 'inline-flex', alignItems: 'center', height: 30, border: '1px solid var(--p-border-strong)', borderRadius: 6, background: '#fff', padding: '0 6px 0 10px', font: '500 13px Inter', color: 'var(--p-ink)', cursor: 'pointer' }}>{pageSize}<Icon name="expand_more" size={16} color="var(--p-muted)" /></span>
                  {sizeMenu && <div style={{ position: 'absolute', bottom: '100%', right: 0, marginBottom: 6, zIndex: 30 }}><Menu items={[25, 50, 100].map((n) => ({ label: String(n), onClick: () => setPageSize(n) }))} onSelect={() => setSizeMenu(false)} /></div>}
                </Popover>
              </span>
              <Pagination page={page} pageCount={pageCount} onPage={setPage} />
            </div>
          )}
        </div>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} variant="confirm" tone="danger" icon="block"
        title={`Deactivate ${sel.size} ${sel.size === 1 ? 'user' : 'users'}?`}
        warning={selManagers.length ? `${selManagers.length} of these manage teams. You'll be asked to reassign their direct reports before deactivating.` : undefined}
        footer={<><Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button><Button variant="warning" onClick={() => { setConfirm(false); window.toast && window.toast(`${sel.size} users deactivated`, 'error'); setSel(new Set()); }}>{selManagers.length ? 'Continue' : 'Deactivate'}</Button></>}>
        They'll lose access to all Greater properties. This can be undone from the Deactivated tab.
      </Modal>
      <style>{`.u-row:hover{background:var(--p-primary-tint) !important}`}</style>
      <ToastHost />
    </div>
  );
}

function Chip({ icon, label }) {
  return <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', background: '#fff', borderRadius: 6, cursor: 'pointer', border: '1px solid var(--p-border-strong)', color: 'var(--p-ink)', font: '500 14px/1 Inter' }}><Icon name={icon} size={16} color="var(--p-muted)" />{label}<Icon name="expand_more" size={16} color="var(--p-muted)" /></button>;
}

/* ============================ DETAIL ============================ */
function UserDetail({ user, isNew, onBack }) {
  const u = isNew ? { id: 'new', first: '', last: '', name: 'New User', initials: '', email: '', username: '', role: null, warehouses: [], managerId: null, routeId: '', title: '' } : user;
  const [tab, setTab] = useState('profile');
  const [role, setRole] = useState(u.role);           // lifted: header pill + avatar recolor on change
  const [confirm, setConfirm] = useState(false);
  const reports = isNew ? [] : U_reports(u.id);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {/* header */}
      <div style={{ flexShrink: 0 }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', font: '500 13px/1 Inter', color: 'var(--p-primary)', marginBottom: 12 }}>
          <Icon name="chevron_left" size={18} color="var(--p-primary)" /> Users
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {isNew
            ? <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--p-surface-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="person_add" size={26} color="var(--p-placeholder)" /></span>
            : <UAvatar user={u} role={role} size={52} />}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 style={{ margin: 0, font: '700 28px/1.1 Inter', letterSpacing: '-.02em', color: 'var(--p-ink)', whiteSpace: 'nowrap' }}>{isNew ? 'New User' : u.name}</h1>
              {role && !isNew && <URolePill role={role} />}
              {!isNew && <UStatus status={u.status} />}
            </div>
            <p style={{ margin: '8px 0 0', font: '400 14px/1 Inter', color: 'var(--p-muted)' }}>{isNew ? 'Add a new user to Coastal Beverage Company' : `${u.title ? u.title + ' · ' : ''}${u.email}`}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {isNew
              ? <><Button variant="secondary" disabled>Save &amp; Add Another</Button><Button variant="primary" disabled>Save</Button></>
              : <><Button variant="warning" icon="block" onClick={() => setConfirm(true)}>Deactivate</Button><Button variant="primary" onClick={() => window.toast && window.toast('Changes saved')}>Save</Button></>}
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <SegmentedTabs value={tab} onChange={setTab} items={[
            { id: 'profile', label: 'Profile' },
            { id: 'access', label: 'Role & Permissions' },
            { id: 'team', label: 'Team', count: reports.length || undefined },
          ]} />
        </div>
      </div>

      {/* body — internal scroll */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', margin: '0 -24px', padding: '24px 24px 0' }}>
        {tab === 'profile' && <ProfileTab u={u} isNew={isNew} />}
        {tab === 'access' && <AccessTab u={u} isNew={isNew} role={role} setRole={setRole} />}
        {tab === 'team' && <TeamTab u={u} isNew={isNew} reports={reports} />}
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} variant="confirm" tone="danger" icon="block"
        title={`Deactivate ${u.name}?`}
        warning={reports.length ? `${u.name} manages ${reports.length} ${reports.length === 1 ? 'person' : 'people'}. You'll be asked to reassign their reports before deactivating.` : undefined}
        footer={<><Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button><Button variant="warning" onClick={() => { setConfirm(false); window.toast && window.toast(`${u.name} deactivated`, 'error'); }}>{reports.length ? 'Continue' : 'Deactivate'}</Button></>}>
        They'll lose access to all Greater properties. This can be undone from the Deactivated tab.
      </Modal>
      <ToastHost />
    </div>
  );
}

function UField({ label, value, placeholder, mono, required }) {
  const [f, setF] = useState(false);
  const [v, setV] = useState(value || '');
  return (
    <label style={{ display: 'block', position: 'relative' }}>
      {label && <span style={{ position: 'absolute', top: -7, left: 10, padding: '0 4px', background: '#fff', font: '400 12px/1 Inter', color: f ? 'var(--p-primary)' : 'var(--p-muted)', zIndex: 1 }}>{label}{required ? ' *' : ''}</span>}
      <input value={v} placeholder={placeholder} onChange={(e) => setV(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ width: '100%', height: 44, padding: '0 14px', boxSizing: 'border-box', border: `1px solid ${f ? 'var(--p-primary)' : 'var(--p-border-strong)'}`, borderRadius: 6, font: `400 15px ${mono ? 'Geist Mono' : 'Inter'}, sans-serif`, color: 'var(--p-ink)', background: '#fff', outline: 'none', boxShadow: f ? '0 0 0 3px rgba(0,124,255,.15)' : 'none' }} />
    </label>
  );
}

function ProfileTab({ u, isNew }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingBottom: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <USectionTitle>Personal Information</USectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <UField label="First Name" required value={u.first} placeholder="First Name" />
          <UField label="Last Name" required value={u.last} placeholder="Last Name" />
        </div>
        <UField label="Email" required value={u.email} placeholder="Email" />
        <UField label="Phone" value="" placeholder="Phone" />
        <UField label="Username" value={u.username} placeholder="Username" mono />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <USectionTitle>Login Settings</USectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="lock" size={20} color="var(--p-muted)" />
          <span style={{ flex: 1, font: '500 15px/1 Inter', color: 'var(--p-ink)' }}>Allow PIN Login for Mobile App</span>
          <Toggle on={!isNew} onChange={() => {}} />
        </div>
        {!isNew && <UField label="PIN" required value="12345" mono />}
        <div style={{ background: 'var(--p-primary-tint)', color: 'var(--p-ink)', borderRadius: 8, padding: '10px 12px', font: '400 14px/1.4 Inter' }}>{isNew ? 'Set a password for this user, or leave blank for them to set.' : 'To update password on behalf of this user, enter below.'}</div>
        <UField label="Password" value="" placeholder="Password" />
        <UField label="Confirm Password" value="" placeholder="Confirm Password" />
      </div>
    </div>
  );
}

function RoleSelect({ role, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onClose={() => setOpen(false)} style={{ display: 'block' }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: 'flex', alignItems: 'center', height: 44, padding: '0 12px 0 14px', boxSizing: 'border-box', border: `1px solid ${open ? 'var(--p-primary)' : 'var(--p-border-strong)'}`, borderRadius: 6, background: '#fff', font: '500 15px Inter', color: role ? 'var(--p-ink)' : 'var(--p-placeholder)', cursor: 'pointer', boxShadow: open ? '0 0 0 3px rgba(0,124,255,.15)' : 'none' }}>
        <span style={{ flex: 1 }}>{role ? U_ROLES[role].label : 'Select a role'}</span><Icon name="expand_more" size={20} color="var(--p-muted)" />
      </div>
      {open && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 30 }}><Menu style={{ minWidth: 0 }} items={U_ROLE_ORDER.map((r) => ({ label: U_ROLES[r].label, onClick: () => onChange(r) }))} onSelect={() => setOpen(false)} /></div>}
    </Popover>
  );
}

function AccessTab({ u, isNew, role, setRole }) {
  const base = role ? U_roleGrants(role) : new Set();
  const [granted, setGranted] = useState(() => new Set(base));
  const [wh, setWh] = useState(() => new Set(u.warehouses));
  const setRoleReset = (r) => { setRole(r); setGranted(new Set(U_roleGrants(r))); };
  const flip = (id) => setGranted((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const overrides = role ? U_ALL_CAPS.filter((id) => granted.has(id) !== base.has(id)) : [];
  const isRep = role === 'rep';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, paddingBottom: 28 }}>
      {/* left — role & scope */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <USectionTitle style={{ marginBottom: 12 }}>Role *</USectionTitle>
          <RoleSelect role={role} onChange={setRoleReset} />
          <p style={{ margin: '8px 2px 0', font: '400 13px/1.5 Inter', color: 'var(--p-muted)' }}>Sets the baseline capabilities. Override any item per user.</p>
        </div>
        <div>
          <USectionTitle style={{ marginBottom: 12 }}>Job Title <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400, color: 'var(--p-placeholder)' }}>(optional)</span></USectionTitle>
          <UField value={u.title} placeholder="e.g. Dir., Coastal Region" />
        </div>
        {isRep && (
          <div>
            <USectionTitle style={{ marginBottom: 12 }}>Sales Route ID</USectionTitle>
            <UField value={u.routeId} mono placeholder="External sales user ID" />
            <p style={{ margin: '8px 2px 0', font: '400 13px/1.5 Inter', color: 'var(--p-muted)' }}>Maps to this rep's record in your sales system.</p>
          </div>
        )}
        <div>
          <USectionTitle style={{ marginBottom: 12 }}>Warehouse Access *</USectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {U_WAREHOUSES.map((w) => {
              const on = wh.has(w);
              return <label key={w} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}><Checkbox on={on} onChange={() => setWh((s) => { const n = new Set(s); n.has(w) ? n.delete(w) : n.add(w); return n; })} /><span style={{ font: `${on ? 500 : 400} 15px/1 Inter`, color: on ? 'var(--p-ink)' : 'var(--p-muted)' }}>{w}</span></label>;
            })}
          </div>
        </div>
      </div>

      {/* right — permissions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <USectionTitle>Permissions</USectionTitle>
          {role && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 11px', borderRadius: 8, background: overrides.length ? '#FFF7ED' : 'var(--p-surface-tint)', color: overrides.length ? '#C2410C' : 'var(--p-muted)', font: '500 12px/1 Inter' }}><Icon name={overrides.length ? 'tune' : 'check'} size={15} color={overrides.length ? '#C2410C' : 'var(--p-muted)'} />{overrides.length ? `${overrides.length} override${overrides.length > 1 ? 's' : ''}` : 'Matches role'}</span>}
        </div>
        {role ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {U_CAPS.map((sec) => {
              const gc = sec.items.filter((it) => granted.has(it.id)).length;
              return (
                <div key={sec.key} style={{ border: '1px solid var(--p-border)', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: '1px solid #F0F1F3', background: '#FBFCFD' }}>
                    <span style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--p-surface-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={sec.icon} size={17} color="var(--p-text-2)" /></span>
                    <span style={{ flex: 1, font: '600 13px/1 Inter', color: 'var(--p-ink)' }}>{sec.section}</span>
                    <span style={{ font: "500 11px 'Geist Mono', monospace", color: 'var(--p-muted)' }}>{gc}/{sec.items.length}</span>
                  </div>
                  {sec.items.map((it, i) => {
                    const on = granted.has(it.id); const ov = on !== base.has(it.id);
                    return (
                      <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderTop: i ? '1px solid #F4F5F7' : 'none', background: ov ? 'rgba(219,158,3,.05)' : '#fff' }}>
                        <span style={{ flex: 1, font: `${on ? 500 : 400} 13px/1.3 Inter`, color: on ? 'var(--p-ink)' : 'var(--p-muted)' }}>{it.label}</span>
                        {ov && <span style={{ font: '500 9px/1 Inter', letterSpacing: '.04em', textTransform: 'uppercase', color: on ? '#C2410C' : '#1447E6', background: on ? '#FFF7ED' : '#EFF6FF', border: `1px solid ${on ? '#FCD9B6' : '#BFDBFE'}`, borderRadius: 999, padding: '2px 6px' }}>{on ? 'Added' : 'Removed'}</span>}
                        <Toggle on={on} onChange={() => flip(it.id)} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ border: '1px dashed var(--p-border-strong)', borderRadius: 10, padding: '48px 24px', textAlign: 'center', background: '#FBFCFD' }}>
            <span style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--p-primary-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Icon name="lock_open" size={24} color="var(--p-primary)" /></span>
            <div style={{ font: '600 15px/1.3 Inter', color: 'var(--p-ink)' }}>Choose a role to set permissions</div>
            <div style={{ font: '400 13px/1.5 Inter', color: 'var(--p-placeholder)', marginTop: 4, maxWidth: 340, marginLeft: 'auto', marginRight: 'auto' }}>Pick a role above to load its default capabilities, then fine-tune any of them for this user.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamTab({ u, isNew, reports }) {
  const mgr = u.managerId ? U_byId(u.managerId) : null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,360px) 1fr', gap: 40, paddingBottom: 28 }}>
      <div>
        <USectionTitle style={{ marginBottom: 12 }}>Reports To</USectionTitle>
        {mgr ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid var(--p-border)', borderRadius: 8 }}>
            <UAvatar user={mgr} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 15px/1.2 Inter', color: 'var(--p-ink)' }}>{mgr.name}</div>
              <div style={{ font: '400 13px/1.3 Inter', color: 'var(--p-muted)' }}>{mgr.title}</div>
            </div>
            <Button variant="ghost" onClick={() => window.toast && window.toast('Pick a new manager…')}>Change</Button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', border: '1px dashed var(--p-border-strong)', borderRadius: 8, background: '#FBFCFD' }}>
            <span style={{ flex: 1, font: '400 14px/1.3 Inter', color: 'var(--p-muted)' }}>No manager assigned</span>
            <Button variant="secondary" icon="add">Assign</Button>
          </div>
        )}
        <p style={{ margin: '10px 2px 0', font: '400 13px/1.5 Inter', color: 'var(--p-placeholder)' }}>Optional. A user doesn't need to report to anyone.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <USectionTitle>Direct Reports {reports.length > 0 && `(${reports.length})`}</USectionTitle>
          <Button variant="ghost" icon="add">Add Report</Button>
        </div>
        {reports.length ? (
          <div style={{ border: '1px solid var(--p-border)', borderRadius: 10, overflow: 'hidden' }}>
            {reports.map((r, i) => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < reports.length - 1 ? '1px solid #F0F1F3' : 'none' }}>
                <UAvatar user={r} size={32} />
                <span style={{ flex: 1, font: '500 14px/1 Inter', color: 'var(--p-ink)' }}>{r.name}</span>
                <URolePill role={r.role} sm />
                {r.routeId && <span style={{ width: 80, textAlign: 'right', font: "400 12px 'Geist Mono', monospace", color: 'var(--p-muted)' }}>Route {r.routeId}</span>}
                <span style={{ width: 96, textAlign: 'right', font: '400 13px/1 Inter', color: 'var(--p-placeholder)' }}>{r.warehouses[0]}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ border: '1px dashed var(--p-border-strong)', borderRadius: 10, padding: '40px 20px', textAlign: 'center', color: 'var(--p-placeholder)' }}>
            <div style={{ font: '500 14px/1.4 Inter', color: 'var(--p-muted)' }}>No direct reports</div>
            <div style={{ font: '400 13px/1.5 Inter', marginTop: 4 }}>No direct reports assigned yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { UsersScreen });
