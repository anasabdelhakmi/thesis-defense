import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import norm

# Parameters
y_target = 1.0; T = 1.0; T_tilde = 1.2; N = 3000
dt = T_tilde / N; t_all = np.linspace(0, T_tilde, N+1)
idx_T = round(T / T_tilde * N)
mu_dist = (T / T_tilde) * y_target  # = 0.833

# Variance at T: V = T*(1 - T/T_tilde)
var_dist = T * (1 - T / T_tilde)
std_dist = np.sqrt(var_dist)  # ~0.408

# Seed selection: minimize path going below 0, going too high, AND ending far from mu_dist at T
best_seed = None; best_score = float('inf')
for seed in range(1, 120):
    np.random.seed(seed)
    path = np.zeros(N+1)
    for i in range(N):
        drift = (y_target - path[i]) / (T_tilde - t_all[i]) if T_tilde - t_all[i] > 1e-6 else 0
        path[i+1] = path[i] + drift*dt + np.sqrt(dt)*np.random.randn()
    score = (abs(path.min()) + max(0, path.max() - y_target - 0.25)
             + 2.0 * abs(path[idx_T] - 0.833))
    if score < best_score:
        best_score = score; best_seed = seed

print(f"Best seed: {best_seed}, score: {best_score:.3f}")

# Simulate with best seed
np.random.seed(best_seed)
path = np.zeros(N+1)
for i in range(N):
    drift = (y_target - path[i]) / (T_tilde - t_all[i]) if T_tilde - t_all[i] > 1e-6 else 0
    path[i+1] = path[i] + drift*dt + np.sqrt(dt)*np.random.randn()

print(f"path[0] = {path[0]:.4f}, path[idx_T] = {path[idx_T]:.4f}, mu_dist = {mu_dist:.4f}")
print(f"path min = {path.min():.4f}, path max = {path.max():.4f}, path[-1] = {path[-1]:.4f}")

# ---- Figure layout ----
fig, ax = plt.subplots(figsize=(12, 7))

# Blue segment [0, T]
blue_mask = t_all <= T
ax.plot(t_all[blue_mask], path[blue_mask], color='royalblue', lw=1.8, zorder=3)

# Red segment [T, T_tilde]
red_mask = t_all >= T
ax.plot(t_all[red_mask], path[red_mask], color='firebrick', lw=1.8, zorder=3)

# ---- Sideways Gaussian at T ----
# Distribution at time T: N(mu_dist, var_dist)
# Clip range to [0, y_target], ±1.5*std_dist
y_gauss = np.linspace(max(mu_dist - 1.5*std_dist, 0.0), min(mu_dist + 1.5*std_dist, y_target), 300)
pdf_vals = norm.pdf(y_gauss, mu_dist, std_dist)

# Scale pdf to look nice — bell extends rightward from T
pdf_scale = 0.50  # width in time units at the peak
x_gauss = T + pdf_vals * pdf_scale

# Fill between T (left edge) and the pdf curve
ax.fill_betweenx(y_gauss, T, x_gauss, color='lightgray', alpha=0.85, zorder=1)
ax.plot(x_gauss, y_gauss, color='gray', lw=1.5, zorder=2)

# ---- Reference lines ----
# y=0 dashed line
ax.axhline(0, color='black', lw=1.0, ls='--', alpha=0.5, zorder=0)
# y=y_target dashed red line
ax.axhline(y_target, color='firebrick', lw=1.5, ls='--', alpha=0.7, zorder=0)
# Vertical dashed at T (blue)
ax.axvline(T, color='royalblue', lw=1.5, ls='--', alpha=0.7, zorder=0)
# Vertical dashed at T_tilde (red)
ax.axvline(T_tilde, color='firebrick', lw=1.5, ls='--', alpha=0.7, zorder=0)

# ---- Origin dot ----
ax.plot(0, 0, 'o', color='black', markersize=7, zorder=5)

# ---- Axis range ----
ymin = -0.65
ymax = y_target + 0.55
ax.set_xlim(-0.08, T_tilde + 0.50)
ax.set_ylim(ymin, ymax)

# ---- Labels ----
# y label (red, left of y-line)
ax.text(-0.055, y_target, r'$y$', fontsize=32, color='firebrick',
        ha='right', va='center', fontweight='bold')

# 0 label
ax.text(-0.055, 0, r'$0$', fontsize=22, color='black',
        ha='right', va='center')

# T label (blue, below x-axis)
label_y = -0.52
ax.text(T, label_y, r'$T$', fontsize=32,
        color='royalblue', ha='center', va='top', fontweight='bold')

# T_tilde label (red, below x-axis)
ax.text(T_tilde, label_y, r'$\widetilde{T}$', fontsize=32,
        color='firebrick', ha='center', va='top', fontweight='bold')

# Distribution label
ax.text(T + pdf_scale * 0.55 + 0.06,
        mu_dist - 0.5*std_dist,
        r'$\mathcal{N}\!\left(\frac{T}{\widetilde{T}}y,\; T\!\left(1-\frac{T}{\widetilde{T}}\right)\right)$',
        fontsize=17, color='gray', ha='left', va='top')

# V[epsilon] arrow (just below x-axis, above the T/T_tilde labels)
arrow_y = -0.22
ax.annotate('', xy=(T_tilde - 0.02, arrow_y), xytext=(T + 0.02, arrow_y),
            arrowprops=dict(arrowstyle='<->', color='firebrick', lw=2))
ax.text((T + T_tilde)/2, arrow_y - 0.04,
        r'$\mathbb{V}[\varepsilon]$', fontsize=20,
        color='firebrick', ha='center', va='top', fontweight='bold')

# ---- Axes styling ----
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

# Draw axis arrowheads
ax.annotate('', xy=(T_tilde + 0.26, 0), xytext=(T_tilde + 0.20, 0),
            arrowprops=dict(arrowstyle='->', color='black', lw=2))
ax.annotate('', xy=(0, ymax - 0.02), xytext=(0, ymax - 0.08),
            arrowprops=dict(arrowstyle='->', color='black', lw=2))

# Axis titles near arrowheads
ax.text(T_tilde + 0.28, 0, r'Time $t$',
        fontsize=16, color='#1B2F5E', ha='left', va='center')
ax.text(0.02, ymax - 0.01, r'Log-return $X^y(t)$',
        fontsize=16, color='#1B2F5E', ha='left', va='bottom', rotation=0)

plt.tight_layout()
output_path = "/Users/anasabdelhakmi/Desktop/Anas Thesis/defense/public/figures/bridge_tilde.png"
plt.savefig(output_path, dpi=180, bbox_inches='tight', facecolor='white')
print(f"Saved to {output_path}")
plt.close()
