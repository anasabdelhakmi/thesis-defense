import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# ── Parameters ───────────────────────────────────────────────────────────────
X0     = 0.55   # start at long-run mean so free paths spread nicely around μ
mu_lr  = 0.55   # long-run mean
y      = 0.85   # view — one std-dev above μ so free paths naturally reach it
T      = 1.0
theta  = 0.5
omega  = 0.20
sigma  = 0.30
N_paths = 25
N       = 2000

# ── Effective horizon ────────────────────────────────────────────────────────
delta   = (1 / (2*theta)) * np.log(1 + 2*theta*omega**2 / sigma**2)
T_tilde = T + delta
y_tilde = np.exp(-theta*delta)*y + (1 - np.exp(-theta*delta))*mu_lr
print(f"delta={delta:.3f}, T_tilde={T_tilde:.3f}, y_tilde={y_tilde:.3f}")

dt    = T_tilde / N
t_all = np.linspace(0, T_tilde, N+1)
idx_T = round(T / T_tilde * N)

# ── Free (unconditional) OU paths — start at μ, spread around it ─────────────
np.random.seed(42)
free_paths = []
for _ in range(N_paths):
    X = np.zeros(N+1)
    X[0] = X0
    for i in range(N):
        X[i+1] = X[i] + theta*(mu_lr - X[i])*dt + sigma*np.sqrt(dt)*np.random.randn()
    free_paths.append(X)

# ── Conditioned bridge paths ──────────────────────────────────────────────────
np.random.seed(7)
paths = []
for _ in range(N_paths):
    X = np.zeros(N+1)
    X[0] = X0
    for i in range(N):
        t   = t_all[i]
        rem = T_tilde - t
        if rem > 1e-6:
            drift = (y_tilde - X[i]) / rem + theta * (mu_lr - X[i])
        else:
            drift = 0.0
        X[i+1] = X[i] + drift*dt + sigma*np.sqrt(dt)*np.random.randn()
    paths.append(X)

# ── Bell curves ───────────────────────────────────────────────────────────────
pdf_scale = 0.14
# Bell centred at unconditional E[X(T)] = X0·e^{-θT} + μ·(1-e^{-θT})
E_XT = X0 * np.exp(-theta*T) + mu_lr * (1 - np.exp(-theta*T))
print(f"E[X(T)] (unconditional) = {E_XT:.3f}")

# Nice bell: wider vertically, shorter horizontal protrusion
display_std = 0.18
bell_center = E_XT + 0.07   # slightly lower
y_gauss = np.linspace(bell_center - 3.0*display_std, bell_center + 3.0*display_std, 400)
x_gauss = T + norm.pdf(y_gauss, bell_center, display_std) * 0.22

# ── Shared constants ──────────────────────────────────────────────────────────
x_margin = -0.07
label_y  = -0.18
ymin = -0.28;  ymax = y + 0.55
xlim = (-0.10, T_tilde + 0.45)


def style_axes(ax, show_T=False, show_Ttilde=False):
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_position(('data', 0))
    ax.spines['bottom'].set_position(('data', 0))
    for sp in ['left', 'bottom']:
        ax.spines[sp].set_linewidth(2)
        ax.spines[sp].set_color('black')
    ax.set_xticks([]);  ax.set_yticks([])
    ax.set_xlim(*xlim)
    ax.set_ylim(ymin, ymax)
    ax.annotate('', xy=(T_tilde + 0.22, 0), xytext=(T_tilde + 0.16, 0),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))
    ax.annotate('', xy=(0, ymax - 0.02), xytext=(0, ymax - 0.08),
                arrowprops=dict(arrowstyle='->', color='black', lw=2))
    ax.text(T_tilde + 0.24, 0, r'$t$',
            fontsize=16, color='#1B2F5E', ha='left', va='center')
    ax.text(0.02, ymax - 0.01, r'$X(t)$',
            fontsize=16, color='#1B2F5E', ha='left', va='bottom')
    # μ reference line + label + starting dot
    ax.axhline(mu_lr, color='#aaa', lw=1.3, ls='--', alpha=0.65, zorder=1)
    ax.text(x_margin, mu_lr, r'$\mu$', fontsize=24, color='#999',
            ha='right', va='center', fontstyle='italic')
    ax.plot(0, X0, 'o', color='black', markersize=7, zorder=6)
    if show_T:
        ax.axvline(T, color='royalblue', lw=1.4, ls='--', alpha=0.65, zorder=1)
        ax.text(T, label_y, r'$T$', fontsize=28, color='royalblue',
                ha='center', va='top', fontweight='bold')
    if show_Ttilde:
        ax.axvline(T_tilde, color='firebrick', lw=1.4, ls='--', alpha=0.65, zorder=1)
        ax.text(T_tilde, label_y, r'$\widetilde{T}$', fontsize=28, color='firebrick',
                ha='center', va='top', fontweight='bold')


# ── FIGURE 1: empty axes ─────────────────────────────────────────────────────
fig, ax = plt.subplots(figsize=(11, 5.5))
style_axes(ax)
plt.tight_layout()
plt.savefig("/Users/anasabdelhakmi/Desktop/Anas Thesis/defense/public/figures/MrB_empty.png",
            dpi=180, bbox_inches='tight', facecolor='white')
print("Saved MrB_empty.png")
plt.close()


# ── FIGURE 2: free OU paths (no view) ───────────────────────────────────────
fig, ax = plt.subplots(figsize=(11, 5.5))
style_axes(ax)
for X in free_paths:
    ax.plot(t_all, X, color='royalblue', lw=1.0, alpha=0.28, zorder=3)
plt.tight_layout()
plt.savefig("/Users/anasabdelhakmi/Desktop/Anas Thesis/defense/public/figures/MrB_free.png",
            dpi=180, bbox_inches='tight', facecolor='white')
print("Saved MrB_free.png")
plt.close()


# ── FIGURE 3: add view y — red dashed line, red dot at (T,y), bell at E[X(T)|Y=y]
fig, ax = plt.subplots(figsize=(11, 5.5))
style_axes(ax, show_T=True)
for X in free_paths:
    ax.plot(t_all, X, color='royalblue', lw=1.0, alpha=0.28, zorder=3)
# View line + dot
ax.axhline(y, color='firebrick', lw=1.4, ls='--', alpha=0.65, zorder=1)
ax.text(x_margin, y, r'$y$', fontsize=28, color='firebrick',
        ha='right', va='center', fontweight='bold')
ax.plot(T, y, 'o', color='firebrick', markersize=9, zorder=6)
# Bell centred at E[X(T)|Y=y]
ax.fill_betweenx(y_gauss, T, x_gauss, color='firebrick', alpha=0.22, zorder=4)
ax.plot(x_gauss, y_gauss, color='firebrick', lw=1.8, zorder=5)
plt.tight_layout()
plt.savefig("/Users/anasabdelhakmi/Desktop/Anas Thesis/defense/public/figures/MrB_view.png",
            dpi=180, bbox_inches='tight', facecolor='white')
print("Saved MrB_view.png")
plt.close()


# ── FIGURE 4: bridge — blue 0→T, red T→T̃ ────────────────────────────────────
fig, ax = plt.subplots(figsize=(11, 5.5))
style_axes(ax, show_T=True, show_Ttilde=True)
for X in paths:
    ax.plot(t_all[:idx_T+1], X[:idx_T+1], color='royalblue', lw=1.1, alpha=0.30, zorder=3)
    ax.plot(t_all[idx_T:],   X[idx_T:],   color='firebrick', lw=1.0, alpha=0.22, zorder=2)
ax.axhline(y,       color='firebrick', lw=1.4, ls='--', alpha=0.65, zorder=1)
ax.axhline(y_tilde, color='#777',      lw=1.2, ls=':',  alpha=0.70, zorder=1)
ax.fill_betweenx(y_gauss, T, x_gauss, color='firebrick', alpha=0.22, zorder=4)
ax.plot(x_gauss, y_gauss, color='firebrick', lw=1.8, zorder=5)
ax.plot(T,       y,       'o', color='firebrick', markersize=9,           zorder=6)
ax.plot(T_tilde, y_tilde, 'o', color='firebrick', markersize=7, alpha=0.55, zorder=6)
ax.text(x_margin, y,       r'$y$',         fontsize=28, color='firebrick',
        ha='right', va='center', fontweight='bold')
ax.text(x_margin, y_tilde, r'$\tilde{y}$', fontsize=28, color='#555',
        ha='right', va='center', fontweight='bold')
plt.tight_layout()
plt.savefig("/Users/anasabdelhakmi/Desktop/Anas Thesis/defense/public/figures/MrB_bridges.png",
            dpi=180, bbox_inches='tight', facecolor='white')
print("Saved MrB_bridges.png")
plt.close()
