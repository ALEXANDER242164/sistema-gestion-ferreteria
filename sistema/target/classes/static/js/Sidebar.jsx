// Sidebar + shared UI components
const { useState } = React;

const NAV_ITEMS = [
  { id: "inventario", label: "Inventario", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  )},
  { id: "ventas", label: "Ventas / POS", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  )},
  { id: "reportes", label: "Reportes", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )},
  { id: "proveedores", label: "Proveedores", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  )},
  { id: "clientes", label: "Clientes", icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
];

function Sidebar({ active, onNav, stockBajoCount, user, onLogout }) {
  const visibleItems = NAV_ITEMS.filter(item => {
    if (item.id === "reportes" && user?.role === "vendedor") return false;
    return true;
  });

  return (
    <aside style={sidebarStyles.aside}>
      <div style={sidebarStyles.logo}>
        <div style={sidebarStyles.logoIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </svg>
        </div>
        <div>
          <div style={sidebarStyles.logoTitle}>Ferretería</div>
          <div style={sidebarStyles.logoSub}>Sistema de Gestión</div>
        </div>
      </div>

      <nav style={sidebarStyles.nav}>
        {visibleItems.map(item => (
          <button key={item.id} onClick={() => onNav(item.id)}
            style={{ ...sidebarStyles.navItem, ...(active === item.id ? sidebarStyles.navItemActive : {}) }}>
            <span style={{ ...sidebarStyles.navIcon, ...(active === item.id ? sidebarStyles.navIconActive : {}) }}>
              {item.icon}
            </span>
            <span style={sidebarStyles.navLabel}>{item.label}</span>
            {item.id === "inventario" && stockBajoCount > 0 && (
              <span style={sidebarStyles.badge}>{stockBajoCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div style={sidebarStyles.footer}>
        <div style={sidebarStyles.user}>
          <div style={sidebarStyles.avatar}>{user?.initials || "??"}</div>
          <div style={{ flex: 1 }}>
            <div style={sidebarStyles.userName}>{user?.nombre || "Usuario"}</div>
            <div style={sidebarStyles.userRole}>{user?.role === "admin" ? "Administrador" : "Vendedor"}</div>
          </div>
          <button onClick={onLogout} title="Cerrar sesión" style={sidebarStyles.logoutBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

const sidebarStyles = {
  aside: { width: 220, minWidth: 220, background: "#171c2d", display: "flex", flexDirection: "column", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 100 },
  logo: { display: "flex", alignItems: "center", gap: 10, padding: "22px 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" },
  logoIcon: { background: "oklch(0.72 0.15 55)", borderRadius: 8, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  logoTitle: { color: "white", fontWeight: 700, fontSize: 15, lineHeight: 1.2 },
  logoSub: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 1 },
  nav: { flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", background: "transparent", color: "rgba(255,255,255,0.55)", cursor: "pointer", width: "100%", textAlign: "left", fontSize: 13.5, fontWeight: 500, transition: "all 0.15s" },
  navItemActive: { background: "rgba(255,255,255,0.08)", color: "white" },
  navIcon: { flexShrink: 0, opacity: 0.6 },
  navIconActive: { opacity: 1, color: "oklch(0.82 0.15 55)" },
  navLabel: { flex: 1 },
  badge: { background: "#ef4444", color: "white", borderRadius: 10, fontSize: 11, fontWeight: 700, padding: "1px 6px", minWidth: 18, textAlign: "center" },
  footer: { padding: "14px 14px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" },
  user: { display: "flex", alignItems: "center", gap: 10 },
  avatar: { width: 34, height: 34, borderRadius: "50%", background: "oklch(0.72 0.15 55)", color: "white", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  userName: { color: "white", fontSize: 13, fontWeight: 600 },
  userRole: { color: "rgba(255,255,255,0.4)", fontSize: 11 },
  logoutBtn: { background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 4, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" },
};

// Shared UI components
function Modal({ title, onClose, children, width = 520 }) {
  return (
    <div style={modalStyles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ ...modalStyles.modal, width }}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>{title}</h3>
          <button onClick={onClose} style={modalStyles.closeBtn}>✕</button>
        </div>
        <div style={modalStyles.body}>{children}</div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={formStyles.label}>{label}</label>}
      <input style={formStyles.input} {...props} />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={formStyles.label}>{label}</label>}
      <select style={formStyles.input} {...props}>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={formStyles.label}>{label}</label>}
      <textarea style={{ ...formStyles.input, resize: "vertical", minHeight: 70 }} {...props} />
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, style: s = {}, disabled }) {
  const base = { padding: "8px 16px", borderRadius: 7, border: "none", cursor: disabled ? "not-allowed" : "pointer", fontSize: 13.5, fontWeight: 600, transition: "opacity 0.15s", opacity: disabled ? 0.5 : 1, ...s };
  const variants = {
    primary: { background: "oklch(0.72 0.15 55)", color: "white" },
    secondary: { background: "#f3f4f6", color: "#374151" },
    danger: { background: "#fee2e2", color: "#dc2626" },
    ghost: { background: "transparent", color: "#6b7280", border: "1px solid #e5e7eb" },
  };
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant] }}>{children}</button>;
}

function Tag({ children, color = "gray" }) {
  const colors = {
    gray: { bg: "#f3f4f6", text: "#374151" },
    orange: { bg: "#fff7ed", text: "#ea580c" },
    red: { bg: "#fee2e2", text: "#dc2626" },
    green: { bg: "#f0fdf4", text: "#16a34a" },
    blue: { bg: "#eff6ff", text: "#2563eb" },
    amber: { bg: "#fffbeb", text: "#d97706" },
  };
  const c = colors[color] || colors.gray;
  return <span style={{ background: c.bg, color: c.text, borderRadius: 5, fontSize: 11.5, fontWeight: 600, padding: "2px 7px", whiteSpace: "nowrap" }}>{children}</span>;
}

const modalStyles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" },
  modal: { background: "white", borderRadius: 14, boxShadow: "0 24px 60px rgba(0,0,0,0.18)", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px 14px", borderBottom: "1px solid #f0f0f0" },
  title: { margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9ca3af", lineHeight: 1, padding: 4 },
  body: { padding: "18px 22px 22px", overflowY: "auto" },
};

const formStyles = {
  label: { display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 5 },
  input: { width: "100%", padding: "8px 10px", border: "1.5px solid #e5e7eb", borderRadius: 7, fontSize: 13.5, color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "white" },
};

Object.assign(window, { Sidebar, Modal, Input, Select, Textarea, Btn, Tag });
