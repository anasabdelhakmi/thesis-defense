import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# ── Parameters (same as original) ─────────────────────────────────────────────
y_target = 1.0
T        = 1.0
T_tilde  = 1.2
N        = 3000
n_paths  = 30
sigma    = 0.28          # reduced noise so paths stay clean and converge visibly
np.random.seed(7)

dt    = T_tilde / N
t_all = np.linspace(0, T_tilde, N + 1)
idx_T = round(T / T_tilde * N)

# Bell curve parameters (exactly as original)
mu_dist  = (T / T_tilde) * y_target        # = 0.833
var_dist = T * (1 - T / T_tilde)
std_dist = np.sqrt(var_dist)

OUT = "/Users/anasabdelhakmi/Desktop/Anas Thesis/defense/public/figures/"

# ── Simulate many bridge paths (SDE: dX = (y-X)/(T_tilde-t) dt + dW) ─────────
def sim_paths(n, T_end, target, seed_start=0):
    paths = []
    for s in range(seed_start, seed_start + n):
        np.random.seed(s)
        path = np.zeros(N + 1)
        for i in range(N):
            remaining = T_end - t_all[i]
            drift = (target - path[i]) / remaining if remaining > 1e-6 else 0
            path[i + 1] = path[i] + drift * dt + sigma * np.sqrt(dt) * np.random.randn()
        paths.append(path)
    return paths

# Paths bridging to T only (for noiseless figure)
dt_T  = T / N
t_T   = np.linspace(0, T, N + 1)
def sim_paths_to_T(n, seed_start=0):
    paths = []
    for s in range(seed_start, seed_start + n):
        np.random.seed(s)
        path = np.zeros(N + 1)
        for i in range(N):
            remaining = T - t_T[i]
            drift = (y_target - path[i]) / remaining if remaining > 1e-6 else 0
            path[i + 1] = path[i] + drift * dt_T + sigma * np.sqrt(dt_T) * np.random.randn()
        paths.append(path)
    return paths

# ── Shared axis styling (exactly as original) ──────────────────────────────────
def style_ax(ax, ymin=-0.65, ymax=1.55, xmax=T_tilde + 0.50):
    ax.set_xlim(-0.08, xmax)
    ax.set_ylim(ymin, ymax)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_position(('data', 0))
    ax.spines['bottom'].set_position(('data', 0))
    ax.spines['left'].set_linewidth(2)
    ax.spines['bottom'].set_linewidth(2)
    ax.spines['left'].set_color('black')
    ax.spines['bottom'].set_color('black')
    ax.set_xticks([])
    ax.set_yticks([])
    ax.annotate('', xy=(xmax - 0.04, 0), xytext=(xmax - 0.10, 0),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))
    ax.annotate('', xy=(0, ymax - 0.02), xytext=(0, ymax - 0.08),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))
    ax.text(xmax - 0.02, 0, r'Time $t$', fontsize=16, color='#1B2F5E', ha='left', va='center')
    ax.text(0.02, ymax - 0.01, r'Log-return $X^y(t)$', fontsize=16, color='#1B2F5E', ha='left', va='bottom')
    ax.axhline(0, color='black', lw=1.0, ls='--', alpha=0.5, zorder=0)
    ax.axhline(y_target, color='firebrick', lw=1.5, ls='--', alpha=0.7, zorder=0)
    ax.text(-0.055, y_target, r'$y$', fontsize=32, color='firebrick',
            ha='right', va='center', fontweight='bold')
    ax.text(-0.055, 0, r'$0$', fontsize=22, color='black', ha='right', va='center')
    ax.plot(0, 0, 'o', color='black', markersize=7, zorder=5)

def add_T_label(ax, label_y=-0.52):
    ax.axvline(T, color='royalblue', lw=1.5, ls='--', alpha=0.7, zorder=0)
    ax.text(T, label_y, r'$T$', fontsize=32, color='royalblue',
            ha='center', va='top', fontweight='bold')

# ── Bell curve (exactly as original) ──────────────────────────────────────────
def draw_bell(ax):
    # Use a display std that gives a nice compact symmetric bell (illustrative)
    dstd = 0.15
    y_gauss  = np.linspace(mu_dist - 2.5*dstd, mu_dist + 2.5*dstd, 300)
    pdf_vals = norm.pdf(y_gauss, mu_dist, dstd)
    pdf_scale = 0.10
    x_gauss  = T + pdf_vals * pdf_scale
    ax.fill_betweenx(y_gauss, T, x_gauss, color='lightgray', alpha=0.85, zorder=1)
    ax.plot(x_gauss, y_gauss, color='gray', lw=1.5, zorder=2)


# ─────────────────────────────────────────────────────────────────────────────
# Figure 1: bridge_dot.png — just the y dot at T, no path (unchanged)
# ─────────────────────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(12, 7))
style_ax(ax)
add_T_label(ax)
ax.plot(T, y_target, 'o', color='firebrick', markersize=10, zorder=6)
plt.tight_layout()
fig.savefig(OUT + 'bridge_dot.png', dpi=180, bbox_inches='tight', facecolor='white')
plt.close(fig)
print("Saved bridge_dot.png")


# ─────────────────────────────────────────────────────────────────────────────
# Figure 2: bridge_noiseless.png — many paths hitting y exactly at T
# ─────────────────────────────────────────────────────────────────────────────
paths_T = sim_paths_to_T(n_paths)

fig, ax = plt.subplots(figsize=(12, 7))
style_ax(ax)
add_T_label(ax)
for p in paths_T:
    ax.plot(t_T, p, color='royalblue', lw=1.2, alpha=0.30, zorder=2)
ax.plot(T, y_target, 'o', color='firebrick', markersize=10, zorder=6)
plt.tight_layout()
fig.savefig(OUT + 'bridge_noiseless.png', dpi=180, bbox_inches='tight', facecolor='white')
plt.close(fig)
print("Saved bridge_noiseless.png")


# ─────────────────────────────────────────────────────────────────────────────
# Figure 3: bridge_bell_nopath.png — bell at T, no paths (same as original)
# ─────────────────────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(12, 7))
style_ax(ax)
add_T_label(ax)
draw_bell(ax)
plt.tight_layout()
fig.savefig(OUT + 'bridge_bell_nopath.png', dpi=180, bbox_inches='tight', facecolor='white')
plt.close(fig)
print("Saved bridge_bell_nopath.png")


# ─────────────────────────────────────────────────────────────────────────────
# Figure 4: bridge_bell.png — many paths + bell at T (noisy, Y = X(T)+ε)
# ─────────────────────────────────────────────────────────────────────────────
paths_full = sim_paths(n_paths, T_tilde, y_target)

fig, ax = plt.subplots(figsize=(12, 7))
style_ax(ax)
add_T_label(ax)
blue_mask = t_all <= T
for p in paths_full:
    ax.plot(t_all[blue_mask], p[blue_mask], color='royalblue', lw=1.2, alpha=0.30, zorder=2)
draw_bell(ax)
plt.tight_layout()
fig.savefig(OUT + 'bridge_bell.png', dpi=180, bbox_inches='tight', facecolor='white')
plt.close(fig)
print("Saved bridge_bell.png")


# ─────────────────────────────────────────────────────────────────────────────
# Figure 5: bridge_tilde.png — many paths to T̃, bell at T (same as original)
# ─────────────────────────────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(12, 7))
style_ax(ax)

# T and T_tilde labels (exactly as original)
label_y = -0.52
ax.text(T,       label_y, r'$T$',             fontsize=32, color='royalblue', ha='center', va='top', fontweight='bold')
ax.text(T_tilde, label_y, r'$\widetilde{T}$', fontsize=32, color='firebrick', ha='center', va='top', fontweight='bold')
ax.axvline(T,       color='royalblue', lw=1.5, ls='--', alpha=0.7, zorder=0)
ax.axvline(T_tilde, color='firebrick', lw=1.5, ls='--', alpha=0.7, zorder=0)

# Many paths — blue [0,T], red [T,T̃]
red_mask  = t_all >= T
for p in paths_full:
    ax.plot(t_all[blue_mask], p[blue_mask], color='royalblue', lw=1.2, alpha=0.25, zorder=2)
    ax.plot(t_all[red_mask],  p[red_mask],  color='firebrick', lw=1.2, alpha=0.25, zorder=2)

# Bell (exactly as original)
draw_bell(ax)

# Origin dot
ax.plot(0, 0, 'o', color='black', markersize=7, zorder=5)

# Distribution label — use same pdf_scale as draw_bell
pdf_scale = 0.10
ax.text(T + pdf_scale * 0.55 + 0.06,
        mu_dist - 0.5*std_dist,
        r'$\mathcal{N}\!\left(\frac{T}{\widetilde{T}}y,\; T\!\left(1-\frac{T}{\widetilde{T}}\right)\right)$',
        fontsize=17, color='gray', ha='left', va='top')

# V[ε] arrow (exactly as original)
arrow_y = -0.22
ax.annotate('', xy=(T_tilde - 0.02, arrow_y), xytext=(T + 0.02, arrow_y),
            arrowprops=dict(arrowstyle='<->', color='firebrick', lw=2))
ax.text((T + T_tilde)/2, arrow_y - 0.04,
        r'$\mathbb{V}[\varepsilon]$', fontsize=20,
        color='firebrick', ha='center', va='top', fontweight='bold')

plt.tight_layout()
fig.savefig(OUT + 'bridge_tilde.png', dpi=180, bbox_inches='tight', facecolor='white')
plt.close(fig)
print("Saved bridge_tilde.png")

print("Done.")
