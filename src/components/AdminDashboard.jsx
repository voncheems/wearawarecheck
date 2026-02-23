import React, { useState, useEffect } from 'react';

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ad-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: #f4f6fb;
    min-height: 100vh;
    display: flex;
  }

  /* ── Sidebar ── */
  .ad-sidebar {
    width: 260px;
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    position: fixed;
    top: 0; left: 0;
    z-index: 100;
  }

  .ad-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: white;
    font-size: 1.3rem;
    font-weight: 800;
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    cursor: pointer;
  }

  .ad-logo-icon { font-size: 1.8rem; }

  .ad-nav { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }

  .ad-nav-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    margin: 1.2rem 0 0.5rem 0.5rem;
  }

  .ad-nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    color: rgba(255,255,255,0.8);
    font-size: 0.92rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    transition: all 0.2s ease;
  }

  .ad-nav-item:hover { background: rgba(255,255,255,0.15); color: white; }

  .ad-nav-item.active {
    background: rgba(255,255,255,0.2);
    color: white;
    font-weight: 700;
  }

  .ad-nav-icon { font-size: 1.1rem; width: 20px; text-align: center; }

  .ad-sidebar-footer {
    border-top: 1px solid rgba(255,255,255,0.2);
    padding-top: 1.5rem;
  }

  .ad-user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .ad-avatar {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    color: white;
    font-weight: 700;
    flex-shrink: 0;
  }

  .ad-user-name { font-size: 0.88rem; font-weight: 600; color: white; }
  .ad-user-role { font-size: 0.75rem; color: rgba(255,255,255,0.6); }

  .ad-logout {
    width: 100%;
    padding: 0.65rem 1rem;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.3);
    background: none;
    color: rgba(255,255,255,0.8);
    font-family: inherit;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ad-logout:hover { background: rgba(255,255,255,0.15); color: white; }

  /* ── Main ── */
  .ad-main {
    margin-left: 260px;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .ad-topbar {
    background: white;
    padding: 1.2rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8f0;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .ad-topbar-title { font-size: 1.3rem; font-weight: 800; color: #1a1a1a; }
  .ad-topbar-sub   { font-size: 0.85rem; color: #888; margin-top: 1px; }

  .ad-topbar-right { display: flex; align-items: center; gap: 1rem; }

  .ad-badge {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    letter-spacing: 0.5px;
  }

  .ad-content { padding: 2.5rem; }

  /* ── Stat Cards ── */
  .ad-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .ad-stat-card {
    background: white;
    border-radius: 16px;
    padding: 1.8rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .ad-stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }

  .ad-stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(102,126,234,0.15); border-color: #667eea33; }

  .ad-stat-icon { font-size: 2rem; margin-bottom: 1rem; }
  .ad-stat-number { font-size: 2.2rem; font-weight: 900; color: #1a1a1a; letter-spacing: -1px; }
  .ad-stat-label  { font-size: 0.85rem; color: #888; margin-top: 0.3rem; font-weight: 500; }

  .ad-stat-change {
    font-size: 0.78rem;
    font-weight: 600;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .ad-stat-change.up   { color: #38a169; }
  .ad-stat-change.down { color: #e53e3e; }

  /* ── Grid Layout ── */
  .ad-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
  .ad-grid-full { margin-bottom: 1.5rem; }

  /* ── Panel ── */
  .ad-panel {
    background: white;
    border-radius: 16px;
    padding: 1.8rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .ad-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .ad-panel-title { font-size: 1rem; font-weight: 800; color: #1a1a1a; }
  .ad-panel-sub   { font-size: 0.8rem; color: #aaa; margin-top: 2px; }

  .ad-panel-action {
    font-size: 0.82rem;
    font-weight: 600;
    color: #667eea;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .ad-panel-action:hover { background: #f0f2ff; }

  /* ── Users Table ── */
  .ad-table { width: 100%; border-collapse: collapse; }

  .ad-table th {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #aaa;
    text-transform: uppercase;
    padding: 0.6rem 1rem;
    text-align: left;
    border-bottom: 2px solid #f0f0f5;
  }

  .ad-table td {
    padding: 1rem;
    font-size: 0.9rem;
    color: #333;
    border-bottom: 1px solid #f5f5f8;
    vertical-align: middle;
  }

  .ad-table tr:last-child td { border-bottom: none; }
  .ad-table tr:hover td { background: #fafafe; }

  .ad-role-badge {
    display: inline-block;
    padding: 0.25rem 0.7rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ad-role-admin    { background: #e9eeff; color: #667eea; }
  .ad-role-inspector{ background: #e6fffa; color: #2c7a7b; }
  .ad-role-scanner  { background: #fff3e0; color: #c05621; }

  .ad-status {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    font-weight: 600;
  }

  .ad-status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ad-status.active .ad-status-dot   { background: #38a169; }
  .ad-status.inactive .ad-status-dot { background: #aaa; }
  .ad-status.active   { color: #38a169; }
  .ad-status.inactive { color: #aaa; }

  /* ── Activity Feed ── */
  .ad-activity { display: flex; flex-direction: column; gap: 1rem; }

  .ad-activity-item {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .ad-activity-dot-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding-top: 4px;
  }

  .ad-activity-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    flex-shrink: 0;
  }

  .ad-activity-line {
    width: 2px;
    height: 24px;
    background: #e8e8f0;
    margin-top: 4px;
  }

  .ad-activity-text { font-size: 0.88rem; color: #444; line-height: 1.5; }
  .ad-activity-time { font-size: 0.78rem; color: #bbb; margin-top: 2px; }

  /* ── Add User Modal ── */
  .ad-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: adFadeIn 0.2s ease;
  }

  @keyframes adFadeIn { from { opacity: 0; } to { opacity: 1; } }

  .ad-modal {
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    animation: adSlideUp 0.25s ease;
  }

  @keyframes adSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: none; }
  }

  .ad-modal-title { font-size: 1.4rem; font-weight: 800; margin-bottom: 0.4rem; color: #1a1a1a; }
  .ad-modal-sub   { font-size: 0.88rem; color: #888; margin-bottom: 2rem; }

  .ad-modal-form { display: flex; flex-direction: column; gap: 1.2rem; }

  .ad-modal-field { display: flex; flex-direction: column; gap: 0.45rem; }

  .ad-modal-label { font-size: 0.85rem; font-weight: 600; color: #333; }

  .ad-modal-input,
  .ad-modal-select {
    padding: 0.8rem 1.1rem;
    border: 2px solid #e8e8f0;
    border-radius: 12px;
    font-size: 0.93rem;
    font-family: inherit;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #fafafa;
  }

  .ad-modal-input:focus,
  .ad-modal-select:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102,126,234,0.1);
    background: white;
  }

  .ad-modal-footer { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 0.5rem; }

  .ad-btn {
    padding: 0.8rem 1.8rem;
    border-radius: 50px;
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
  }

  .ad-btn-primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
  }

  .ad-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,0.35); }

  .ad-btn-ghost {
    background: none;
    color: #666;
    border-color: #e0e0e0;
  }

  .ad-btn-ghost:hover { background: #f5f5f5; }

  .ad-success-msg {
    background: #f0fff4;
    border: 2px solid #9ae6b4;
    border-radius: 12px;
    color: #276749;
    padding: 0.8rem 1.2rem;
    font-size: 0.88rem;
    font-weight: 500;
  }

  .ad-error-msg {
    background: #fff5f5;
    border: 2px solid #fed7d7;
    border-radius: 12px;
    color: #c53030;
    padding: 0.8rem 1.2rem;
    font-size: 0.88rem;
    font-weight: 500;
  }

  /* ── Empty state ── */
  .ad-empty { text-align: center; padding: 3rem 1rem; color: #bbb; font-size: 0.95rem; }

  @media (max-width: 1100px) {
    .ad-stats { grid-template-columns: repeat(2, 1fr); }
    .ad-grid  { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .ad-sidebar { display: none; }
    .ad-main    { margin-left: 0; }
    .ad-stats   { grid-template-columns: repeat(2, 1fr); }
  }
`;

const API = 'http://localhost:5000/api';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export default function AdminDashboard({ setCurrentPage }) {
  const [activeTab, setActiveTab]   = useState('overview');
  const [users, setUsers]           = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showModal, setShowModal]   = useState(false);
  const [formMsg, setFormMsg]       = useState({ type: '', text: '' });
  const [newUser, setNewUser]       = useState({ full_name: '', email: '', password: '', role: 'inspector' });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res  = await fetch(`${API}/users`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormMsg({ type: '', text: '' });
    try {
      const res  = await fetch(`${API}/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFormMsg({ type: 'success', text: `User "${newUser.full_name}" created successfully!` });
      setNewUser({ full_name: '', email: '', password: '', role: 'inspector' });
      fetchUsers();
    } catch (err) {
      setFormMsg({ type: 'error', text: err.message });
    }
  };

  const handleDeactivate = async (id, name) => {
    if (!window.confirm(`Deactivate ${name}?`)) return;
    try {
      await fetch(`${API}/users/${id}/deactivate`, { method: 'PATCH', headers: getAuthHeaders() });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('landing');
  };

  const initials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'A';

  const stats = [
    { icon: '👥', number: users.length,                          label: 'Total Users',       change: '+2 this month', dir: 'up' },
    { icon: '✅', number: users.filter(u => u.is_active).length, label: 'Active Accounts',   change: 'All systems go', dir: 'up' },
    { icon: '🛡️', number: users.filter(u => u.role === 'inspector').length, label: 'Inspectors', change: 'Field ready', dir: 'up' },
    { icon: '📷', number: users.filter(u => u.role === 'scanner').length,   label: 'Scanners',    change: 'Devices online', dir: 'up' },
  ];

  const activity = [
    { text: 'Admin account created and configured',           time: 'Just now' },
    { text: 'Inspector account activated',                    time: '2 min ago' },
    { text: 'PostgreSQL database connected successfully',     time: '5 min ago' },
    { text: 'WearAware backend server started on port 5000',  time: '10 min ago' },
    { text: 'Schema and roles seeded into database',          time: '15 min ago' },
  ];

  const navItems = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'users',    icon: '👥', label: 'User Management' },
    { id: 'activity', icon: '🕐', label: 'Activity Log' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="ad-page">

        {/* Sidebar */}
        <aside className="ad-sidebar">
          <div className="ad-logo" onClick={() => setCurrentPage('landing')}>
            <span className="ad-logo-icon">🦺</span>
            WearAware
          </div>

          <nav className="ad-nav">
            <div className="ad-nav-label">Main Menu</div>
            {navItems.map(item => (
              <button
                key={item.id}
                className={`ad-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="ad-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ad-sidebar-footer">
            <div className="ad-user-info">
              <div className="ad-avatar">{initials(user.full_name)}</div>
              <div>
                <div className="ad-user-name">{user.full_name || 'Admin'}</div>
                <div className="ad-user-role">Administrator</div>
              </div>
            </div>
            <button className="ad-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        </aside>

        {/* Main */}
        <main className="ad-main">
          <div className="ad-topbar">
            <div>
              <div className="ad-topbar-title">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'users'    && 'User Management'}
                {activeTab === 'activity' && 'Activity Log'}
              </div>
              <div className="ad-topbar-sub">Welcome back, {user.full_name || 'Admin'} 👋</div>
            </div>
            <div className="ad-topbar-right">
              <span className="ad-badge">ADMIN</span>
            </div>
          </div>

          <div className="ad-content">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <>
                <div className="ad-stats">
                  {stats.map((s, i) => (
                    <div className="ad-stat-card" key={i}>
                      <div className="ad-stat-icon">{s.icon}</div>
                      <div className="ad-stat-number">{s.number}</div>
                      <div className="ad-stat-label">{s.label}</div>
                      <div className={`ad-stat-change ${s.dir}`}>
                        {s.dir === 'up' ? '↑' : '↓'} {s.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ad-grid">
                  {/* Users preview */}
                  <div className="ad-panel">
                    <div className="ad-panel-header">
                      <div>
                        <div className="ad-panel-title">Recent Users</div>
                        <div className="ad-panel-sub">Latest registered accounts</div>
                      </div>
                      <button className="ad-panel-action" onClick={() => setActiveTab('users')}>
                        View All →
                      </button>
                    </div>
                    <table className="ad-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map(u => (
                          <tr key={u.id}>
                            <td>
                              <div style={{ fontWeight: 600 }}>{u.full_name}</div>
                              <div style={{ fontSize: '0.78rem', color: '#aaa' }}>{u.email}</div>
                            </td>
                            <td><span className={`ad-role-badge ad-role-${u.role}`}>{u.role}</span></td>
                            <td>
                              <span className={`ad-status ${u.is_active ? 'active' : 'inactive'}`}>
                                <span className="ad-status-dot" />
                                {u.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {users.length === 0 && (
                          <tr><td colSpan={3} className="ad-empty">No users found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Activity */}
                  <div className="ad-panel">
                    <div className="ad-panel-header">
                      <div>
                        <div className="ad-panel-title">Recent Activity</div>
                        <div className="ad-panel-sub">System events</div>
                      </div>
                    </div>
                    <div className="ad-activity">
                      {activity.map((a, i) => (
                        <div className="ad-activity-item" key={i}>
                          <div className="ad-activity-dot-wrap">
                            <div className="ad-activity-dot" />
                            {i < activity.length - 1 && <div className="ad-activity-line" />}
                          </div>
                          <div>
                            <div className="ad-activity-text">{a.text}</div>
                            <div className="ad-activity-time">{a.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === 'users' && (
              <div className="ad-grid-full">
                <div className="ad-panel">
                  <div className="ad-panel-header">
                    <div>
                      <div className="ad-panel-title">All Users</div>
                      <div className="ad-panel-sub">{users.length} accounts registered</div>
                    </div>
                    <button className="ad-btn ad-btn-primary" onClick={() => { setShowModal(true); setFormMsg({ type: '', text: '' }); }}>
                      + Add User
                    </button>
                  </div>

                  {loadingUsers ? (
                    <div className="ad-empty">Loading users...</div>
                  ) : (
                    <table className="ad-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id}>
                            <td style={{ fontWeight: 600 }}>{u.full_name}</td>
                            <td style={{ color: '#666' }}>{u.email}</td>
                            <td><span className={`ad-role-badge ad-role-${u.role}`}>{u.role}</span></td>
                            <td>
                              <span className={`ad-status ${u.is_active ? 'active' : 'inactive'}`}>
                                <span className="ad-status-dot" />
                                {u.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td style={{ color: '#aaa', fontSize: '0.82rem' }}>
                              {new Date(u.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              {u.is_active && u.role !== 'admin' && (
                                <button
                                  onClick={() => handleDeactivate(u.id, u.full_name)}
                                  style={{ background: 'none', border: '1px solid #fed7d7', color: '#e53e3e', padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                                >
                                  Deactivate
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {users.length === 0 && (
                          <tr><td colSpan={6} className="ad-empty">No users found</td></tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ── ACTIVITY TAB ── */}
            {activeTab === 'activity' && (
              <div className="ad-panel">
                <div className="ad-panel-header">
                  <div>
                    <div className="ad-panel-title">Activity Log</div>
                    <div className="ad-panel-sub">Recent system events</div>
                  </div>
                </div>
                <div className="ad-activity">
                  {activity.map((a, i) => (
                    <div className="ad-activity-item" key={i}>
                      <div className="ad-activity-dot-wrap">
                        <div className="ad-activity-dot" />
                        {i < activity.length - 1 && <div className="ad-activity-line" />}
                      </div>
                      <div>
                        <div className="ad-activity-text">{a.text}</div>
                        <div className="ad-activity-time">{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="ad-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="ad-modal">
            <div className="ad-modal-title">Add New User</div>
            <div className="ad-modal-sub">Create an account and assign a role</div>

            <form className="ad-modal-form" onSubmit={handleAddUser}>
              {formMsg.text && (
                <div className={formMsg.type === 'success' ? 'ad-success-msg' : 'ad-error-msg'}>
                  {formMsg.text}
                </div>
              )}

              <div className="ad-modal-field">
                <label className="ad-modal-label">Full Name</label>
                <input className="ad-modal-input" placeholder="Juan dela Cruz" required
                  value={newUser.full_name} onChange={e => setNewUser({ ...newUser, full_name: e.target.value })} />
              </div>

              <div className="ad-modal-field">
                <label className="ad-modal-label">Email Address</label>
                <input className="ad-modal-input" type="email" placeholder="juan@wearaware.ph" required
                  value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              </div>

              <div className="ad-modal-field">
                <label className="ad-modal-label">Password</label>
                <input className="ad-modal-input" type="password" placeholder="Min. 8 characters" required
                  value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
              </div>

              <div className="ad-modal-field">
                <label className="ad-modal-label">Role</label>
                <select className="ad-modal-select" value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="inspector">Inspector</option>
                  <option value="scanner">Scanner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="ad-modal-footer">
                <button type="button" className="ad-btn ad-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="ad-btn ad-btn-primary">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 76645d34092e9c76d60a1ab8306014a78b66862d
