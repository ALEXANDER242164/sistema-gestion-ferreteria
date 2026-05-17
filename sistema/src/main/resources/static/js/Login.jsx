// Login screen
function Login({ onLogin }) {
  const [form, setForm] = React.useState({ usuario: "", password: "" });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const USUARIOS = [
    { usuario: "admin", password: "admin123", nombre: "Administrador", role: "admin", initials: "AD" },
    { usuario: "pedro", password: "1234", nombre: "Pedro Alvarado", role: "vendedor", initials: "PA" },
    { usuario: "laura", password: "1234", nombre: "Laura Sánchez", role: "vendedor", initials: "LS" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = USUARIOS.find(u => u.usuario === form.usuario && u.password === form.password);
      if (user) { setError(""); onLogin(user); }
      else { setError("Usuario o contraseña incorrectos."); setLoading(false); }
    }, 500);
  }

  return (
    <div style={loginStyles.bg}>
      <div style={loginStyles.card}>
        {/* Logo */}
        <div style={loginStyles.logoWrap}>
          <div style={loginStyles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>
          <div>
            <div style={loginStyles.logoTitle}>Ferretería San José</div>
            <div style={loginStyles.logoSub}>Sistema de Gestión</div>
          </div>
        </div>

        <h2 style={loginStyles.heading}>Iniciar sesión</h2>
        <p style={loginStyles.sub}>Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={loginStyles.label}>Usuario</label>
            <input
              style={{ ...loginStyles.input, ...(error ? { borderColor: "#ef4444" } : {}) }}
              placeholder="Ej. admin / pedro / laura"
              value={form.usuario}
              onChange={e => { setForm(f => ({ ...f, usuario: e.target.value })); setError(""); }}
              autoFocus
            />
          </div>
          <div>
            <label style={loginStyles.label}>Contraseña</label>
            <input
              type="password"
              style={{ ...loginStyles.input, ...(error ? { borderColor: "#ef4444" } : {}) }}
              placeholder="••••••••"
              value={form.password}
              onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setError(""); }}
            />
          </div>
          {error && <div style={loginStyles.error}>{error}</div>}
          <button type="submit" disabled={loading} style={loginStyles.btn}>
            {loading ? "Verificando…" : "Entrar"}
          </button>
        </form>

        {/* Hints */}
        <div style={loginStyles.hints}>
          <div style={loginStyles.hintsTitle}>Usuarios de prueba</div>
          <div style={loginStyles.hintRow}>
            <span style={{ ...loginStyles.roleBadge, background: "#171c2d", color: "white" }}>Admin</span>
            <span style={loginStyles.hintCred}>admin / admin123</span>
          </div>
          <div style={loginStyles.hintRow}>
            <span style={{ ...loginStyles.roleBadge, background: "#f3f4f6", color: "#374151" }}>Vendedor</span>
            <span style={loginStyles.hintCred}>pedro / 1234</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const loginStyles = {
  bg: { minHeight: "100vh", background: "linear-gradient(135deg, #171c2d 0%, #1e2540 60%, #0f1420 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { background: "white", borderRadius: 18, padding: "40px 36px", width: "100%", maxWidth: 400, boxShadow: "0 32px 80px rgba(0,0,0,0.35)" },
  logoWrap: { display: "flex", alignItems: "center", gap: 12, marginBottom: 32 },
  logoIcon: { width: 50, height: 50, background: "oklch(0.72 0.15 55)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  logoTitle: { fontWeight: 800, fontSize: 16, color: "#111827" },
  logoSub: { fontSize: 12, color: "#9ca3af", marginTop: 1 },
  heading: { fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 4px" },
  sub: { fontSize: 13.5, color: "#9ca3af", margin: "0 0 24px" },
  label: { display: "block", fontSize: 12.5, fontWeight: 600, color: "#374151", marginBottom: 6 },
  input: { width: "100%", padding: "11px 13px", border: "1.5px solid #e5e7eb", borderRadius: 9, fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.15s" },
  btn: { background: "oklch(0.72 0.15 55)", color: "white", border: "none", borderRadius: 9, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 4 },
  error: { background: "#fee2e2", color: "#dc2626", borderRadius: 7, padding: "9px 12px", fontSize: 13, fontWeight: 500 },
  hints: { marginTop: 28, paddingTop: 18, borderTop: "1.5px solid #f0f0f0" },
  hintsTitle: { fontSize: 11.5, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 },
  hintRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 7 },
  roleBadge: { borderRadius: 5, fontSize: 11.5, fontWeight: 700, padding: "2px 8px" },
  hintCred: { fontFamily: "monospace", fontSize: 13, color: "#374151" },
};

Object.assign(window, { Login });
