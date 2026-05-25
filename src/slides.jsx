import {
  DarkSlide, ContentSlide, Card, Thm, D, M, Frag,
  Intuition, Insight, Paradox, Key, PaperRow,
  BMSimulation, BridgeSimulation, PortfolioGraph, EfficientFrontierSVG, CandidateFlow
} from './components.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 1 — Title
// ─────────────────────────────────────────────────────────────────────────────
function S01() {
  return (
    <div className="slide title-slide">
      <div className="title-body" style={{ justifyContent: 'space-between', paddingTop: 36, paddingBottom: 36 }}>
        {/* NUS header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ background: 'white', borderRadius: 6, padding: '6px 10px', display: 'flex', alignItems: 'center' }}>
            <img src="figures/nus-shield.png" alt="NUS" style={{ height: 52, width: 'auto', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontSize: '1.05em', fontWeight: 700, color: 'white', letterSpacing: '.01em' }}>
              National University of Singapore
            </div>
            <div style={{ fontSize: '.80em', color: 'rgba(150,185,230,.80)', marginTop: 3 }}>
              Institute of Operations Research and Analytics
            </div>
          </div>
        </div>

        {/* Title block — centre of slide */}
        <div>
          <div className="title-main" style={{ marginBottom: 0, fontSize: '2.1em', textAlign: 'left' }}>
            Data-Driven Sequential Decision-Making:<br />
            Forward-Looking Information and Robustness<br />
            in Dynamic Uncertain Environments
          </div>
        </div>

        {/* Author / info block */}
        <div>
          <div className="title-rule" style={{ marginBottom: 20 }} />
          <div className="title-author" style={{ fontSize: '1.2em', marginBottom: 8 }}>Anas Abdelhakmi</div>
          <div className="title-info">
            Supervised by Prof. Andrew E.B. Lim &amp; Prof. Jussi Keppo<br />
            Ph.D. Thesis Defense &nbsp;·&nbsp; 26 May 2026
          </div>
        </div>
      </div>
    </div>
  )
}
S01.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 2 — Thesis Overview
// ─────────────────────────────────────────────────────────────────────────────
function S02({ frag }) {
  return (
    <ContentSlide title="Thesis at a Glance: Forward-Looking Information and Robustness in Sequential Decision-Making" stripe="var(--navy)">
      <div className="three-col" style={{ gap: 14, flex: 1 }}>
        <Frag at={1} frag={frag}>
          <Card color="blue" title="Part I: Dynamic Black–Litterman" style={{ height: '100%' }}>
            <strong>Views on future asset returns in continuous time.</strong>
            <br /><br />
            Conditioning on a view turns GBM dynamics into a generalized <em>Brownian bridge</em>, giving a fully tractable, closed-form optimal portfolio.
            <br /><br />
            <span className="c-blue bold">New:</span> forward-looking information induces hedging decisions and creates bridging behavior in asset dynamics.
          </Card>
        </Frag>
        <Frag at={2} frag={frag}>
          <Card color="gold" title="Part II: Dynamic Factor Models" style={{ height: '100%' }}>
            <strong>Views on future factor states, not just asset returns.</strong>
            <br /><br />
            A <em>dual transformation</em>: views alter both how factors evolve (<em>mean-reverting bridge</em>) and how current factor states forecast returns.
            <br /><br />
            <span className="c-gold bold">New:</span> views reshape how contextual information is used, changing both the <em>myopic risk-return tradeoff</em> and the <em>hedging demand</em> via factor-view correlation <M m="\Sigma^{S,X}" />.
          </Card>
        </Frag>
        <Frag at={3} frag={frag}>
          <Card color="red" title="Part III: Robust Secretary Problems" style={{ height: '100%' }}>
            <strong>When worst-case optimization isn't enough.</strong>
            <br /><br />
            DRO leaves the nominal policy (e.g., the 1/e stopping rule) unchanged across all variants; yet it remains highly sensitive to misspecification.
            <br /><br />
            <span className="c-red bold">New:</span> convex mean-sensitivity frontier; robustness via process redesign.
          </Card>
        </Frag>
      </div>
      <Frag at={4} frag={frag}>
        <Key style={{ marginTop: 8 }}>
          How to <strong>optimally incorporate information</strong> into sequential decisions; and how to remain <strong>robust when the past no longer predicts the future</strong>?
        </Key>
      </Frag>
    </ContentSlide>
  )
}
S02.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 3 — Part I Divider
// ─────────────────────────────────────────────────────────────────────────────
function S03() {
  return (
    <DarkSlide
      accent="var(--blue)"
      eyebrow="PART I"
      eyebrowSize="1.1em"
      title="Dynamic Black–Litterman Model"
      sub="Practitioners have views about future outcomes, but dynamic models are typically built on historical data. How do we embed forward-looking information into a backward-looking model, and update the optimal decision as new data arrives?"
      footer="Abdelhakmi & Lim · Dynamic Black–Litterman · Operations Research (2026)"
    />
  )
}
S03.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 4 — The Problem: Views in Finance
// ─────────────────────────────────────────────────────────────────────────────
function S04({ frag }) {
  return (
    <ContentSlide title="The Problem: Incorporating Forward-Looking Views" stripe="var(--blue)">
      <div className="col-5545">
        <div>
          <div className="thm" style={{ marginBottom: 8 }}>
            <div className="thm-lbl">Black–Litterman Model (1991–1992)</div>
            <div className="thm-body">
              <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.7 }}>
                <li>Developed at <strong>Goldman Sachs</strong> by Fischer Black &amp; Robert Litterman</li>
                <li>The <strong>industry standard</strong> for embedding expert views into portfolio allocation</li>
                <li>Still used today by <strong>BlackRock, Goldman Sachs, JPMorgan, Amundi</strong> and major sovereign wealth funds</li>
                <li>Blends a <strong>prior</strong> (market equilibrium via CAPM) with <strong>forward-looking views</strong> using Bayes' rule</li>
              </ul>
            </div>
          </div>
          <Frag at={1} frag={frag}>
            <div className="thm red" style={{ marginTop: 0 }}>
              <div className="thm-lbl red">But it is Fundamentally Static</div>
              <div className="thm-body">
                <ul style={{ paddingLeft: 16, margin: 0, lineHeight: 1.7 }}>
                  <li><strong>Views and decisions must share the same horizon</strong>: no way to use a 3-month view in a 5-year portfolio</li>
                  <li><strong>Single-period only</strong>: no prescription for how to update the model or rebalance as new data arrives</li>
                </ul>
              </div>
            </div>
          </Frag>
          <Frag at={2} frag={frag}>
            <Key style={{ marginTop: 8 }}>
              We remove both restrictions: continuous-time trading with views over any horizon.
            </Key>
          </Frag>
        </div>
        <div>
          <Frag at={3} frag={frag}>
            <div className="thm" style={{ marginBottom: 7 }}>
              <div className="thm-lbl">Static BL &amp; Extensions</div>
              <div className="thm-body">
                <div className="paper-row" style={{ marginBottom: 3 }}>
                  <div className="pnum" style={{ background: 'var(--blue)' }}>B&L</div>
                  <div className="ptxt"><strong>Black &amp; Litterman (1991, 1992)</strong>: original; single-period; horizons must match</div>
                </div>
                <div className="paper-row" style={{ marginBottom: 3 }}>
                  <div className="pnum" style={{ background: 'var(--muted)' }}>H&W</div>
                  <div className="ptxt"><strong>He &amp; Litterman (2002), Walters (2011)</strong>: surveys &amp; practical extensions; still static</div>
                </div>
                <div className="paper-row" style={{ marginBottom: 3 }}>
                  <div className="pnum" style={{ background: 'var(--muted)' }}>BGP</div>
                  <div className="ptxt"><strong>Bertsimas, Gupta &amp; Paschalidis (2012)</strong>: inverse optimization perspective on BL; single-period</div>
                </div>
                <div className="paper-row">
                  <div className="pnum" style={{ background: 'var(--muted)' }}>L&X</div>
                  <div className="ptxt"><strong>Lim &amp; Xiao (2020)</strong>: graphical model for complex view structures; single-period</div>
                </div>
              </div>
            </div>
          </Frag>
          <Frag at={4} frag={frag}>
            <div className="thm navy" style={{ marginBottom: 7 }}>
              <div className="thm-lbl">Dynamic Extensions: Not Forward-Looking</div>
              <div className="thm-body">
                <div className="paper-row" style={{ marginBottom: 3 }}>
                  <div className="pnum" style={{ background: 'var(--navy)' }}>F&amp;S</div>
                  <div className="ptxt"><strong>Frey &amp; Runggaldier (2012), Sass (2017)</strong>: views are noisy signals on the <em>current, unobserved drift</em>, a filtering problem, not a forecast</div>
                </div>
                <div className="paper-row">
                  <div className="pnum" style={{ background: 'var(--navy)' }}>D&amp;L</div>
                  <div className="ptxt"><strong>Davis &amp; Lleo (2013–2016)</strong>: views on factor <em>trajectories</em>, not terminal outcomes; horizons must still match</div>
                </div>
              </div>
            </div>
          </Frag>
          <Frag at={4} frag={frag}>
            <div className="thm green">
              <div className="thm-lbl green">This Paper</div>
              <div className="thm-body">
                <div className="paper-row">
                  <div className="pnum" style={{ background: 'var(--green)' }}>A&L</div>
                  <div className="ptxt"><strong>Abdelhakmi &amp; Lim (2026)</strong>: views on <em>realized future returns</em>; continuous-time; mismatched horizons; closed-form portfolio</div>
                </div>
              </div>
            </div>
          </Frag>
        </div>
      </div>
    </ContentSlide>
  )
}
S04.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 5 — Model Setup
// ─────────────────────────────────────────────────────────────────────────────
function S05({ frag }) {
  return (
    <ContentSlide title="Model Setup: Log-Returns and the View" stripe="var(--blue)">
      <div className="col-5545">
        <div>
          <div className="thm" style={{ marginBottom: 8 }}>
            <div className="thm-lbl">Prior Asset Dynamics: calibrated from historical data</div>
            <div className="thm-body">
              <M m="N" /> risky assets. Price process (GBM):
              <D m="\frac{dS_i(t)}{S_i(t)} = \mu_i\,dt + dW_i(t)" />
              Log-return <M m="X_i(t) = \log(S_i(t)/S_i(0))" />:
              <D m="X(t) = t\mu^x + W(t), \quad \mu^x_i = \mu_i - \tfrac{\sigma_i^2}{2}" />
              <span className="xs c-muted"><M m="W(t) \sim \mathcal{N}(0, t\Sigma)" />, Cholesky <M m="\Sigma = LL^\top" /></span>
            </div>
          </div>
          <Frag at={2} frag={frag}>
            <div className="thm navy" style={{ marginTop: 8 }}>
              <div className="thm-lbl">The View: <M m="Y(0,T)" /></div>
              <div className="thm-body">
                At <M m="t=0" />, analyst observes <M m="y" />, a noisy signal on terminal log-returns:
                <D m="Y(0,T) = PX(T) + \sqrt{T}\,\varepsilon, \quad \varepsilon \sim \mathcal{N}(0,\Omega)" />
              </div>
            </div>
          </Frag>
          <Frag at={4} frag={frag}>
            <Intuition style={{ marginTop: 8 }}>
              <strong>Key question:</strong> How does <M m="X^y(t) := X(t)\mid Y=y" /> evolve? <strong>Conditioning on a future target</strong> anchors the path; as prices arrive, the model <strong>continuously updates</strong>, pulling trajectories closer to that view. The answer is surprisingly clean.
            </Intuition>
          </Frag>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Frag at={1} frag={frag}>
            <div>
              <div className="sm bold c-navy" style={{ marginBottom: 3 }}>Historical data + prior predicted paths</div>
              <img src="figures/prior_paths.png" alt="Historical path and prior fan" style={{ width: '100%', borderRadius: 4, border: '1px solid var(--border)' }} />
              <div className="fig-cap">Without a view, the model fans out: high uncertainty about the future</div>
            </div>
          </Frag>
          <Frag at={3} frag={frag}>
            <div>
              <div className="sm bold c-navy" style={{ marginBottom: 3 }}>After conditioning on a view at <M m="T" /></div>
              <img src="figures/posterior_bridge.png" alt="Posterior bridge paths with view" style={{ width: '100%', borderRadius: 4, border: '1px solid var(--border)' }} />
              <div className="fig-cap">A view at <M m="T" /> reshapes the entire path distribution; the model updates continuously as it approaches the target</div>
            </div>
          </Frag>
        </div>
      </div>
    </ContentSlide>
  )
}
S05.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 6 — Proposition 1: Conditional Dynamics
// ─────────────────────────────────────────────────────────────────────────────
function S06({ frag }) {
  return (
    <ContentSlide title="Proposition 1: Conditional Log-Return Dynamics" stripe="var(--blue)">
      <Intuition>
        Conditioning on the view <M m="Y=y" /> <strong>reweights the probability measure</strong>; under <M m="\mathbb{Q}" />, the asset dynamics acquire a systematic drift that encodes the view at every instant.
      </Intuition>
      <div className="col-4060">
        <div>
          <div className="thm" style={{ marginBottom: 8 }}>
            <div className="thm-lbl">Proposition 1: Posterior SDE</div>
            <div className="thm-body">
              <D m="dX^y(t) = \Bigl(\mu^x + \underbrace{\beta_1(y - TP\mu^x)}_{\text{(i)}} + \underbrace{\beta_2(t)\bigl(\mathbb{E}[X^y(t)] - X^y(t)\bigr)}_{\text{(ii)}}\Bigr)dt + dW^y(t)" />
              with coefficients:
              <D m="\beta_1 = \tfrac{1}{T}\Sigma P^\top(P\Sigma P^\top + \Omega)^{-1}" />
              <D m="\beta_2(t) = \Sigma P^\top\!\bigl((T{-}t)P\Sigma P^\top + T\Omega\bigr)^{-1}\!P" />
            </div>
          </div>
          <Frag at={1} frag={frag}>
            <div className="thm gold" style={{ marginBottom: 6 }}>
              <div className="thm-lbl gold">(i): View Innovation</div>
              <div className="thm-body">
                <M m="\beta_1(y - TP\mu^x)" />: permanent drift adjustment proportional to how <strong>surprising the view is</strong>: the gap between the observed view <M m="y" /> and the model's prior expectation <M m="TP\mu^x" />
              </div>
            </div>
          </Frag>
          <Frag at={2} frag={frag}>
            <div className="thm red">
              <div className="thm-lbl red">(ii): A New State Variable Emerges</div>
              <div className="thm-body">
                <M m="X^y(t)" /> is a <strong>new state variable</strong>; the process dynamically encodes the view and is pulled toward it; <M m="\beta_2(t)" /> <strong>increases</strong> over time and the pull dominates near <M m="T" />
              </div>
            </div>
          </Frag>
        </div>
        <Frag at={3} frag={frag}>
          <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <img src="figures/bridge_mean.png" alt="Conditional mean and pull toward view"
              style={{ width: '100%', borderRadius: 4, border: '1px solid var(--border)', display: 'block' }} />
            <Frag at={4} frag={frag}>
              <div className="thm dark" style={{ padding: '6px 14px' }}>
                <div className="thm-lbl white">Bridge Behavior</div>
                <div className="thm-body">
                  The path behaves <strong>almost like a bridge</strong>; with no view noise (<M m="\Omega=0" />), it would be an exact bridge hitting <M m="y" /> at <M m="T" />. With noise, the bridge behavior <strong>persists</strong> but the hitting time is pushed to <M m="\tilde{T} > T" />. We show this precisely on the next slide.
                </div>
              </div>
            </Frag>
          </div>
        </Frag>
      </div>
    </ContentSlide>
  )
}
S06.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 7 — Theorem 1: Generalized Brownian Bridge & T̃
// ─────────────────────────────────────────────────────────────────────────────
function S07({ frag }) {
  return (
    <ContentSlide title="Theorem 1: The Generalized Brownian Bridge" stripe="var(--blue)">
      {/* frag 0: intuition only */}
      <Intuition>
        Take <strong>one asset</strong>. What does conditioning on the view <M m="Y=y" /> do to the path?
      </Intuition>

      {/* frag 1+: two-col appears */}
      {frag >= 1 && (
        <div className="two-col">
          {/* ── LEFT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden', minHeight: 0 }}>
            {/* Bordered scalar case group — visible from frag 1 */}
            <div style={{ border: '2px solid var(--navy)', borderRadius: 5, padding: 4, display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0 }}>
              {/* Header — always visible once group appears */}
              <div className="thm dark" style={{ margin: 0, padding: '3px 10px' }}>
                <div className="thm-lbl white">Scalar Case: <span style={{ textTransform: 'none' }}><M m="dX(t) = \mu\,dt + \sigma\,dW(t)" /></span></div>
              </div>
              {/* No View Noise green box — frag 2 */}
              {frag >= 2 && (
                <div className="thm green" style={{ margin: 0, padding: '4px 10px' }}>
                  <div className="thm-lbl green">No view noise: <span style={{ textTransform: 'none' }}><M m="Y = X(T)" /></span></div>
                  <div className="thm-body">
                    <M m="X^y(t)" /> is an <strong>exact Brownian bridge</strong> hitting <M m="y" /> at <M m="T" />:
                    <D m="dX^y = \frac{y - X^y(t)}{T - t}\,dt + \sigma\,dW" />
                  </div>
                </div>
              )}
              {/* With View Noise gold box — header at frag 5, body at frag 6 */}
              {frag >= 5 && (
                <div className="thm gold" style={{ margin: 0, padding: '4px 10px' }}>
                  <div className="thm-lbl gold">With view noise: <span style={{ textTransform: 'none' }}><M m="Y = X(T) + \varepsilon" />, <M m="\varepsilon \sim \mathcal{N}(0,\omega^2)" /></span></div>
                  {frag >= 7 && (
                    <div className="thm-body">
                      Path is <strong>uncertain</strong> at <M m="T" />; it keeps going, hitting <M m="y" /> at extended time:
                      <D m="\tilde{T} = T + \frac{\omega^2}{\sigma^2}" />
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* General Multi-Asset — frag 9 */}
            {frag >= 9 && (
              <div className="thm" style={{ margin: 0, padding: '4px 10px' }}>
                <div className="thm-lbl">General Multi-Asset Case</div>
                <div className="thm-body">
                  <D m="X^y(t) = \mathbb{E}[X^y(t)] + L\,\bar{B}(t)" />
                  Each <M m="\bar{B}_i(t)" /> is a <strong>Brownian bridge</strong> with hitting time:
                  <D m="\tilde{T}_i = \frac{1}{H_{ii}},\quad H = \tfrac{1}{T}(PL)^\top(P\Sigma P^\top+\Omega)^{-1}PL" />
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minHeight: 0, overflow: 'hidden' }}>
            {/* Graph container — visible as empty box at frag 1–2, shows images from frag 3 */}
            <div style={{ flexShrink: 0, height: 310, position: 'relative',
              border: '1px solid var(--border)', borderRadius: 4, background: '#F8FAFF' }}>
              {/* frag 3: y dot only */}
              <img src="figures/bridge_dot.png" alt="View target y at T"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', objectPosition: 'top',
                  opacity: frag === 3 ? 1 : 0, transition: 'opacity 0.3s ease' }} />
              {/* frag 4: noiseless bridge */}
              <img src="figures/bridge_noiseless.png" alt="Noiseless bridge"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', objectPosition: 'top',
                  opacity: frag === 4 ? 1 : 0, transition: 'opacity 0.3s ease' }} />
              {/* frag 5: bell + red dot, no path */}
              <img src="figures/bridge_bell_nopath.png" alt="Bell at T, no path"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', objectPosition: 'top',
                  opacity: frag === 5 ? 1 : 0, transition: 'opacity 0.3s ease' }} />
              {/* frag 6–7: blue path + bell (stays while T̃ formula reveals at frag 7) */}
              <img src="figures/bridge_bell.png" alt="Bridge with bell at T"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', objectPosition: 'top',
                  opacity: (frag === 6 || frag === 7) ? 1 : 0, transition: 'opacity 0.3s ease' }} />
              {/* frag 8+: full extension to T̃ */}
              <img src="figures/bridge_tilde.png" alt="Bridge extended to T-tilde"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'contain', objectPosition: 'top',
                  opacity: frag >= 8 ? 1 : 0, transition: 'opacity 0.3s ease' }} />
            </div>
            {/* Small T̃ figures — frag 10 */}
            {frag >= 10 && (
              <>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <img src="figures/tilde_T_omega-1.png" alt="T-tilde vs omega"
                    style={{ flex: 1, minWidth: 0, maxHeight: 185, objectFit: 'contain', borderRadius: 3, border: '1px solid var(--border)' }} />
                  <img src="figures/tilde_T_rho-1.png" alt="T-tilde vs rho"
                    style={{ flex: 1, minWidth: 0, maxHeight: 185, objectFit: 'contain', borderRadius: 3, border: '1px solid var(--border)' }} />
                </div>
                <div className="fig-cap"><M m="\tilde{T}_i" /> increases with view noise <M m="\omega" /> (left), decreases with correlation <M m="\rho" /> (right)</div>
              </>
            )}
          </div>
        </div>
      )}
    </ContentSlide>
  )
}
S07.frags = 10

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 8 — The Control Problem
// ─────────────────────────────────────────────────────────────────────────────
function S08({ frag }) {
  return (
    <ContentSlide title="The Control Problem" stripe="var(--blue)">
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', overflow: 'hidden', flex: 1, minHeight: 0 }}>
        {/* ── LEFT (wider) ── */}
        <div style={{ flex: '0 0 53%', display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0, overflow: 'hidden' }}>
          {/* Wealth SDE — always */}
          <div className="thm navy" style={{ margin: 0 }}>
            <div className="thm-lbl">Wealth Process (self-financing)</div>
            <div className="thm-body" style={{ fontSize: '0.88em' }}>
              Portfolio <M m="\pi(t)" /> = fraction of wealth in risky assets:
              <D m="\begin{aligned}dZ(t) = Z(t)\Bigl(&r_f\,dt + \pi(t)^\top\!\bigl(\tilde{\mu}(t,X^y(t),y)-r_f\mathbf{1}\bigr)dt\\&+\pi(t)^\top dW^y(t)\Bigr)\end{aligned}" />
              <span className="xs c-muted"><M m="\tilde{\mu}(t,x,y)" /> = drift after incorporating view <M m="y" />.</span>
            </div>
          </div>
          {/* Objective — frag 1 */}
          {frag >= 1 && (
            <div className="thm gold" style={{ margin: 0 }}>
              <div className="thm-lbl gold">Objective: CRRA utility, <span style={{ textTransform: 'none' }}><M m="\gamma > 1" /></span></div>
              <div className="thm-body" style={{ fontSize: '0.88em' }}>
                <D m="\max_\pi\;\mathbb{E}\!\left[\frac{Z(T)^{1-\gamma}}{1-\gamma}\;\Bigg|\;Z(t)=z,\;X^y(t)=x,\;y\right]" />
              </div>
            </div>
          )}
          {/* HJB — frag 2 */}
          {frag >= 2 && (
            <div className="thm" style={{ margin: 0 }}>
              <div className="thm-lbl">HJB Equation</div>
              <div className="thm-body" style={{ fontSize: '0.80em' }}>
                <D m="\begin{aligned}0 = {}&V_t + r_f z V_z + \tilde\mu^\top\!\nabla_x V + \tfrac{1}{2}\mathrm{Tr}(\Sigma\nabla^2_{xx}V)\\&+\max_\pi\!\left\{z\pi^\top(\tilde\mu - r_f\mathbf{1})V_z + \tfrac{z^2}{2}\pi^\top\!\Sigma\pi\,V_{zz} + z\pi^\top\!\Sigma\nabla_{xz}V\right\}\end{aligned}" />
              </div>
            </div>
          )}
        </div>
        {/* ── RIGHT ── */}
        <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0, overflow: 'hidden' }}>
          {/* π* — frag 3 */}
          {frag >= 3 && (
            <div className="thm green" style={{ margin: 0 }}>
              <div className="thm-lbl green">Optimal Portfolio (Theorem 2)</div>
              <div className="thm-body" style={{ fontSize: '0.78em' }}>
                <D m="\pi^*(t,x) = \underbrace{\frac{1}{\gamma}\Sigma^{-1}\!\bigl(\tilde\mu(t,x,y) - r_f\mathbf{1}\bigr)}_{\text{MV}} + \underbrace{\frac{1}{\gamma}\bigl(A(t)x+b(t)\bigr)}_{\text{hedging}}" />
              </div>
            </div>
          )}
          {/* Intuition — frag 4 */}
          {frag >= 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ background: '#EFF6FF', border: '1px solid var(--blue)', borderRadius: 4, padding: '5px 10px', fontSize: '0.81em' }}>
                <span className="bold c-blue">MV term: </span>balances the myopic risk-return tradeoff using the <em>view-adjusted</em> drift <M m="\tilde\mu(t,x,y)" />.
              </div>
              <div style={{ background: '#F0FDF4', border: '1px solid var(--green)', borderRadius: 4, padding: '5px 10px', fontSize: '0.81em' }}>
                <span className="bold c-green">Hedging term: </span>intertemporal hedge against changes in the views covariate <M m="X^y(t)" />; as <M m="X^y" /> moves, it shifts <M m="\tilde\mu" /> and the value function; this position offsets that sensitivity. Larger when views are informative; vanishes at <M m="T" />.
              </div>
            </div>
          )}
          {/* ODE system — frag 5 */}
          {frag >= 5 && (
            <div className="thm green" style={{ margin: 0 }}>
              <div className="thm-lbl green">ODE System for Hedging Coefficients</div>
              <div className="thm-body" style={{ fontSize: '0.78em' }}>
                <M m="A(t)" />: matrix Riccati, <M m="A(T)=0" />:
                <D m="\begin{aligned}A'(t) &+ \tfrac{1-\gamma}{\gamma}\eta_t\Sigma\eta_t + \tfrac{1}{\gamma}\bigl(A(t)\Sigma\eta_t+\eta_t\Sigma A(t)\bigr)\\&+ \tfrac{1}{\gamma}A(t)\Sigma A(t) = 0\end{aligned}" />
                <M m="b(t)" />: linear ODE, <M m="b(T)=0" />:
                <D m="\begin{aligned}b'(t) &+ \tfrac{1}{\gamma}(\eta_t+A(t))\Sigma\,b(t)\\&+ \tfrac{1-\gamma}{\gamma}(\eta_t+A(t))(\alpha_t - r_f\mathbf{1})\\&+ A(t)\!\left(\alpha_t - \tfrac{1}{2}\operatorname{diag}(\Sigma)\right) = 0\end{aligned}" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* ── Bottom: η_t and α_t definitions ── */}
      {frag >= 5 && (
        <div style={{ marginTop: 8, color: '#888', fontSize: '0.72em', lineHeight: 1.5, display: 'flex', gap: 24 }}>
          <span><M m="\eta_t = -P^\top\!\bigl((T-t)P\Sigma P^\top + T\Omega\bigr)^{-1}\!P" /></span>
          <span><M m="\alpha_t = \mu + \beta_1(y - TP\mu^x) - \Sigma\,\eta_t\,\mathbb{E}[X^y(t)]" /></span>
        </div>
      )}
    </ContentSlide>
  )
}
S08.frags = 5

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 9 — Theorem 2: Closed-Form Optimal Portfolio
// ─────────────────────────────────────────────────────────────────────────────
function S08b({ frag }) {
  return (
    <ContentSlide title="Theorem 2 &amp; Corollary: The Hedging Demand" stripe="var(--blue)">
      {/* ── Top row: math left, intuition right ── */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', minWidth: 0 }}>
        {/* LEFT */}
        <div style={{ flex: '0 0 52%', display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
          <div style={{ border: '2px solid var(--green)', borderRadius: 6, overflow: 'hidden', margin: 0 }}>
            <div style={{ background: 'var(--green)', color: 'white', padding: '4px 14px', fontSize: '0.78em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              Theorem 2: Hedging Demand, Closed Form
            </div>
            <div style={{ background: '#F0FDF4', padding: '8px 14px', fontSize: '0.86em' }}>
              <D m="\frac{1}{\gamma}\bigl(A(t)x + b(t)\bigr) = \frac{M(t)}{\gamma}\,\Sigma^{-1}\!\bigl(\tilde\mu(t,x,y) - r_f\mathbf{1}\bigr)" />
            </div>
          </div>
          <div className="thm gold" style={{ margin: 0 }}>
            <div className="thm-lbl gold">View Conviction Factor <span style={{ textTransform: 'none' }}><M m="M(t)" /></span></div>
            <div className="thm-body" style={{ fontSize: '0.80em' }}>
              <D m="M(t) = (\gamma-1)\!\left(1-\tfrac{t}{T}\right)P^\top\Omega^{-1}P\cdot\!\left(\gamma\Sigma^{-1}+\left(1-\tfrac{t}{T}\right)P^\top\Omega^{-1}P\right)^{\!-1}" />
              <span className="xs c-muted">View precision / total precision × <M m="(\gamma{-}1)" />. &ensp; <M m="M(T)=0" />; &ensp; <M m="M\equiv 0" /> when <M m="\gamma=1" />.</span>
            </div>
          </div>
        </div>
        {/* RIGHT: intuition — frag 1 */}
        {frag >= 1 && (
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            <div className="thm" style={{ margin: 0 }}>
              <div className="thm-lbl">Why does hedging amplify?</div>
              <div className="thm-body" style={{ fontSize: '0.84em' }}>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: 18, lineHeight: 1.7 }}>
                  <li>Views shift <M m="\tilde\mu(t,x,y)" />; they <strong>change what you invest in</strong>. The hedge opens <strong>no new position</strong>: it <strong>amplifies</strong> the view-adjusted MV bet.</li>
                  <li>The bridge pulls <M m="X^y(t)" /> toward <M m="y" />; <strong>high returns now</strong> mean <strong>higher <M m="\tilde\mu" /> later</strong>. Holding more <em>today</em> pre-loads the position your future self will want.</li>
                  <li><strong>Stronger views</strong> (smaller <M m="\Omega" />) → <strong>larger <M m="M(t)" /></strong> → <strong>more amplification</strong>. Vanishes at <M m="T" /> as views expire.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ── Bottom: full portfolio centered — frag 2 ── */}
      {frag >= 2 && (
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
          <div style={{ minWidth: '72%', maxWidth: '90%', border: '2px solid var(--navy)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: 'var(--navy)', color: 'white', padding: '4px 14px', fontSize: '0.78em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>
              Corollary: Closed-Form Optimal Policy
            </div>
            <div style={{ background: '#F8FAFF', padding: '10px 16px', fontSize: '0.84em', textAlign: 'center' }}>
              <D m="\pi^*(t,x) = \underbrace{\frac{1}{\gamma}\Sigma^{-1}\!\bigl(\tilde\mu(t,x,y){-}r_f\mathbf{1}\bigr)}_{\text{MV}} + \underbrace{\frac{M(t)}{\gamma}\Sigma^{-1}\!\bigl(\tilde\mu(t,x,y){-}r_f\mathbf{1}\bigr)}_{\text{hedging}} = \frac{1+M(t)}{\gamma}\,\Sigma^{-1}\!\bigl(\tilde\mu(t,x,y){-}r_f\mathbf{1}\bigr)" />
            </div>
          </div>
        </div>
      )}
    </ContentSlide>
  )
}
S08b.frags = 2

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 9 — Empirical Results
// ─────────────────────────────────────────────────────────────────────────────
function S09({ frag }) {
  return (
    <ContentSlide title="DBL Dominates: At Every Frequency, With Less Trading" stripe="var(--blue)">
      {/* Setup strip */}
      <div style={{ fontSize: '0.70em', color: '#666', marginBottom: 5 }}>
        Monte Carlo · 5 assets (S&amp;P/ASX 50) · 3 views · <M m="T=1\text{ yr}" /> · DBL vs. RCBL · continuous / daily / weekly · <M m="\alpha=0.4" /> (precise views)
      </div>

      {/* Figure area — flex:1 fills all remaining space above the comment strip */}
      <div style={{ display: 'flex', gap: 10, flex: 1, minHeight: 0 }}>

        {/* EF — wide when frag < 2, narrows when turnovers appear */}
        <div style={{
          flex: frag >= 2 ? 1 : 3,
          minWidth: 0, display: 'flex', flexDirection: 'column',
          transition: 'flex 0.4s ease'
        }}>
          <div style={{ fontSize: '0.70em', fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>Efficient Frontier</div>
          <div style={{ flex: 1, background: '#F8FAFF', border: '1px solid var(--border)', borderRadius: 4, padding: 4, minHeight: 0 }}>
            <img src="figures/frontier_0.4-1.png" alt="Efficient Frontier"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>

        {/* DBL Turnover — hidden until frag 2 */}
        <div style={{
          flex: frag >= 2 ? 1 : 0,
          minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          opacity: frag >= 2 ? 1 : 0,
          transition: 'flex 0.4s ease, opacity 0.3s ease'
        }}>
          <div style={{ fontSize: '0.70em', fontWeight: 700, color: 'var(--green)', marginBottom: 3, whiteSpace: 'nowrap' }}>Turnover: DBL</div>
          <div style={{ flex: 1, background: '#F0FDF4', border: '1px solid var(--green)', borderRadius: 4, padding: 4, minHeight: 0 }}>
            <img src="figures/turnover_0.4_DBL-1.png" alt="Turnover DBL"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>

        {/* RCBL Turnover — hidden until frag 2 */}
        <div style={{
          flex: frag >= 2 ? 1 : 0,
          minWidth: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column',
          opacity: frag >= 2 ? 1 : 0,
          transition: 'flex 0.4s ease, opacity 0.3s ease'
        }}>
          <div style={{ fontSize: '0.70em', fontWeight: 700, color: 'var(--red)', marginBottom: 3, whiteSpace: 'nowrap' }}>
            Turnover: RCBL <span style={{ fontWeight: 400, color: '#888' }}>(y-axis capped)</span>
          </div>
          <div style={{ flex: 1, background: '#FEF2F2', border: '1px solid var(--red)', borderRadius: 4, padding: 4, minHeight: 0 }}>
            <img src="figures/turnover_0.4_CBL-1.png" alt="Turnover RCBL"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* Comment strip — fixed height, absolutely cross-fades between frontier & turnover comment */}
      <div style={{ position: 'relative', height: 62, marginTop: 7, flexShrink: 0 }}>
        {/* Frontier comment — visible frag 1 & 2 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#F0FDF4', border: '1px solid var(--green)', borderRadius: 5,
          padding: '7px 13px', fontSize: '0.86em', lineHeight: 1.45,
          opacity: frag === 1 || frag === 2 ? 1 : 0,
          transition: 'opacity 0.25s ease', pointerEvents: 'none'
        }}>
          <span className="bold c-green">Frontier: </span>DBL dominates RCBL at <em>all</em> rebalancing frequencies.
          Performance gap is largest when views are precise (<M m="\alpha=0.4" />); RCBL degrades sharply as rebalancing thins because it does not hedge changes in <M m="X^y(t)" />
        </div>
        {/* Turnover comment — visible frag 3 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#FEF2F2', border: '1px solid var(--red)', borderRadius: 5,
          padding: '7px 13px', fontSize: '0.86em', lineHeight: 1.45,
          opacity: frag >= 3 ? 1 : 0,
          transition: 'opacity 0.25s ease', pointerEvents: 'none'
        }}>
          <span className="bold c-red">Turnover: </span>DBL has lower trading volume across all risk-aversion levels.
          RCBL makes large reactive adjustments at each epoch; the y-axis is capped to be readable; the actual gap is even larger
        </div>
      </div>
    </ContentSlide>
  )
}
S09.frags = 3

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 10 — Other Results & Part I Summary
// ─────────────────────────────────────────────────────────────────────────────
function S10({ frag }) {
  return (
    <ContentSlide title="Other Results &amp; Part I Summary" stripe="var(--blue)">
      <div style={{ display: 'flex', gap: 18, flex: 1, minHeight: 0 }}>

        {/* ── LEFT (40%): Extensions ── */}
        <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
          <div style={{ fontSize: '0.88em', fontWeight: 700, color: 'var(--navy)', letterSpacing: '.02em', marginBottom: 2, lineHeight: 1.3 }}>
            Our Framework Extends Naturally to Different Information Structures
          </div>

          {/* Timeline cascade */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '3px solid var(--blue)', paddingLeft: 12, flex: 1 }}>

            {/* Extension 1 */}
            <div style={{ position: 'relative', paddingBottom: 10 }}>
              <div style={{ position: 'absolute', left: -18, top: 6, width: 10, height: 10, borderRadius: '50%', background: 'var(--blue)', border: '2px solid white', boxShadow: '0 0 0 2px var(--blue)' }} />
              <div className="thm navy" style={{ margin: 0 }}>
                <div className="thm-lbl">View Revisions</div>
                <div className="thm-body" style={{ fontSize: '0.83em' }}>
                  Expert updates view at <M m="t_1,\dots,t_M" /> during <M m="[0,T]" />. Bridge <strong>resets</strong> at each revision epoch; state variables reset accordingly. <span className="bold c-blue">Closed-form persists.</span>
                </div>
              </div>
            </div>

            {/* Extension 2 */}
            <div style={{ position: 'relative', paddingBottom: 10 }}>
              <div style={{ position: 'absolute', left: -18, top: 6, width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', border: '2px solid white', boxShadow: '0 0 0 2px var(--gold)' }} />
              <div className="thm gold" style={{ margin: 0 }}>
                <div className="thm-lbl gold">Short-Term / Quarterly Views</div>
                <div className="thm-body" style={{ fontSize: '0.83em' }}>
                  Views on sub-intervals <M m="[T_j,T_{j+1}]" /> (e.g. quarterly over 1-year horizon). Adjusted views are <strong>independent</strong> across periods; each is its own bridge problem. <span className="bold c-gold">Closed-form persists.</span>
                </div>
              </div>
            </div>

            {/* Extension 3 */}
            <div style={{ position: 'relative', paddingBottom: 0 }}>
              <div style={{ position: 'absolute', left: -18, top: 6, width: 10, height: 10, borderRadius: '50%', background: 'var(--green)', border: '2px solid white', boxShadow: '0 0 0 2px var(--green)' }} />
              <div className="thm green" style={{ margin: 0 }}>
                <div className="thm-lbl green">Multiple Views at Different Horizons</div>
                <div className="thm-body" style={{ fontSize: '0.83em' }}>
                  Several views at <M m="t=0" />, each over a different horizon <M m="T_1,\dots,T_K" />. HJB solution structure is <strong>invariant</strong> to filtration complexity. <span className="bold c-green">Closed-form persists.</span>
                </div>
              </div>
            </div>
          </div>

          <Key style={{ marginTop: 4, fontSize: '0.78em' }}>
            Any information structure → Generalized Brownian Bridge → Closed-form <M m="\pi^*" />
          </Key>
        </div>

        {/* Divider */}
        <div style={{ width: 1, background: 'var(--border)', flexShrink: 0, alignSelf: 'stretch' }} />

        {/* ── RIGHT (60%): Summary ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
          <div style={{ fontSize: '0.88em', fontWeight: 700, color: 'var(--navy)', letterSpacing: '.02em', marginBottom: 4 }}>
            Main Results
          </div>

          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 12, flex: 1, fontSize: '0.86em', lineHeight: 1.6 }}>
            <Frag at={1} frag={frag}>
              <li>
                We give a <strong>framework to embed forward-looking views</strong> into continuous-time portfolio models, allowing <strong>mismatched horizons</strong> between the view and the investment period
              </li>
            </Frag>
            <Frag at={2} frag={frag}>
              <li>
                We show the conditioned price process is always a <strong>Generalized Brownian Bridge</strong>, even when views are noisy. View noise simply <strong>extends the effective horizon</strong> to <M m="\tilde{T} = T + \omega^2/\sigma^2" />
              </li>
            </Frag>
            <Frag at={3} frag={frag}>
              <li>
                We solve the portfolio problem in <strong>closed form</strong>; the hedging demand <strong>amplifies</strong> the view-adjusted MV bet proportionally to the view conviction factor <M m="M(t)" />
              </li>
            </Frag>
            <Frag at={4} frag={frag}>
              <li>
                Empirically, DBL <strong>strictly dominates</strong> the rebalanced classical BL strategy at every frequency, with <strong>lower turnover</strong>, and graceful degradation as views become uninformative
              </li>
            </Frag>
          </ul>

          <Frag at={4} frag={frag}>
            <Insight style={{ marginTop: 6 }}>DBL is tractable; it outperforms.</Insight>
          </Frag>
        </div>
      </div>
    </ContentSlide>
  )
}
S10.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 11 — Part II Divider: Factor Models
// ─────────────────────────────────────────────────────────────────────────────
function S11() {
  return (
    <DarkSlide
      accent="var(--gold)"
      eyebrow="PART II"
      eyebrowSize="1.1em"
      title="Dynamic Factor Models with Forward-Looking Views"
      sub={
        <span>
          Part I gave us a framework for incorporating views into dynamic models.
          But outcomes don't move in isolation;{' '}
          they're shaped by an economic context the practitioner can observe and forecast.{' '}
          In Part II,{' '}
          <span style={{ color: '#F6C94E', fontWeight: 700 }}>views target future covariates</span>
          : the context that drives outcomes, not just the outcomes themselves.
        </span>
      }
      footer="Abdelhakmi & Lim (2025) · Working Paper · Dynamic Factor Models with Forward-Looking Views"
    />
  )
}
S11.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 12 — Factor Models: Setup & Motivation
// ─────────────────────────────────────────────────────────────────────────────
function S12({ frag }) {
  return (
    <ContentSlide title="Contextual Decision-Making: Views on the Evolving State" stripe="var(--gold)">

      {/* Motivation — always visible */}
      <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 14, marginBottom: 10, fontSize: '0.88em', lineHeight: 1.65, color: '#222' }}>
        In many decision problems, an <strong style={{ color: 'var(--navy)' }}>evolving context</strong> shapes how outcomes behave;
        and the decision-maker's <strong style={{ color: 'var(--gold)' }}>views target that context directly</strong>:
        <div style={{ display: 'flex', gap: 22, marginTop: 7 }}>
          <span>📈 <strong>Portfolio:</strong> macro factors (GDP, spreads) drive returns; analyst forecasts future factor levels</span>
          <span>📦 <strong>Inventory:</strong> demand covariates shape sales; manager forecasts future market conditions</span>
          <span>⚡ <strong>Energy trading:</strong> weather &amp; load factors drive prices; trader forecasts future grid states</span>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>

        {/* LEFT — Model setup (frag 1) */}
        <div style={{ flex: '0 0 42%', opacity: frag >= 1 ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <div style={{ border: '1.5px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: '#F3F4F6', padding: '5px 13px', fontSize: '0.74em', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#444' }}>
              The Model: Three Objects
            </div>
            <div style={{ padding: '8px 13px', fontSize: '0.83em', lineHeight: 1.6 }}>
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: 'var(--navy)', fontWeight: 700 }}>Covariates</span>
                <span style={{ color: '#888', fontSize: '0.85em' }}>: <M m="d" /> factors, <M m="X(t)\in\mathbb{R}^d" /></span>
                <D m="dX(t) = \Theta(\mu - X(t))\,dt + L^X\,dW^X(t)" />
              </div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: 'var(--green)', fontWeight: 700 }}>Returns</span>
                <span style={{ color: '#888', fontSize: '0.85em' }}>: <M m="N" /> assets, <M m="\beta\in\mathbb{R}^{N\times d}" /></span>
                <D m="dR(t) = \bigl(\alpha + \beta X(t)\bigr)dt + L^S\,dW(t)" />
                <div style={{ fontSize: '0.84em', color: '#666', marginTop: -2 }}>
                  <M m="\Sigma^{S,X} = L^S(L^X)^\top \neq 0" /> (factor-return correlation)
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>Views</span>
                <span style={{ color: '#888', fontSize: '0.85em' }}>: <M m="K" /> views, <M m="P\in\mathbb{R}^{K\times d}" /></span>
                <D m="Y = PX(T) + \varepsilon,\quad \varepsilon \sim \mathcal{N}(0,\Omega)" />
                <div style={{ fontSize: '0.84em', color: '#666', marginTop: -2 }}>
                  Conditioning on <M m="Y=y" /> is the operation this paper studies.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Effects: always rendered, opacity-only toggle to prevent layout shift */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Effect 1 */}
          <div style={{ opacity: frag >= 2 ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <div style={{ border: '2px solid var(--navy)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ background: 'var(--navy)', color: 'white', padding: '5px 13px', fontSize: '0.74em', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                Effect 1: Covariate Dynamics Transform
              </div>
              <div style={{ padding: '10px 14px', fontSize: '0.87em', lineHeight: 1.65, background: '#F8FAFF' }}>
                Given views, <M m="X^y(t) = X(t)\mid Y" /> becomes a <strong>mean-reverting bridge</strong>; the view distorts both the <strong>reversion speed</strong> <M m="\tilde\Theta(t)" /> and the <strong>long-run level</strong> <M m="\tilde\mu(t,y)" />.
              </div>
            </div>
          </div>
          {/* Effect 2 */}
          <div style={{ opacity: frag >= 3 ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <div style={{ border: '2px solid var(--gold)', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ background: 'var(--gold)', color: 'white', padding: '5px 13px', fontSize: '0.74em', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                Effect 2: Return Predictions Deform
              </div>
              <div style={{ padding: '10px 14px', fontSize: '0.87em', lineHeight: 1.65, background: '#FFFBEB' }}>
                Both the <strong>intercept</strong> <M m="\tilde\alpha(t,y)" /> and the <strong>slope</strong> <M m="\tilde\beta(t)" /> of expected returns become time-varying; views change <strong>how context is used</strong> to predict future outcomes.
                <span style={{ display: 'block', marginTop: 5, color: '#555', fontSize: '0.90em' }}>This only arises when factors and returns are correlated; invisible in the asset-returns-only case.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ opacity: frag >= 4 ? 1 : 0, transition: 'opacity 0.3s ease', marginTop: 8 }}>
        <Key>
          <span style={{ fontSize: '1.05em' }}>The view bends both the <strong>state trajectory</strong> and the <strong>return predictions</strong>. What does the optimal portfolio look like under this dual transformation?</span>
        </Key>
      </div>
    </ContentSlide>
  )
}
S12.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 13 — The Mean-Reverting Bridge (MrB)
// ─────────────────────────────────────────────────────────────────────────────
function S13({ frag }) {
  return (
    <ContentSlide title="MrB: Conditional Factor Dynamics and Return Loadings" stripe="var(--gold)">
      <div className="col-5545">
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Frag at={0} frag={frag}>
            <div className="thm" style={{ marginBottom: 8 }}>
              <div className="thm-lbl">Proposition: Posterior Factor SDE (MrB)</div>
              <div className="thm-body">
                Under <M m="\mathbb{Q} = \mathbb{P}(\cdot\mid Y=y)" />, the conditional factor process satisfies:
                <D m="dX^y(t) = \tilde\Theta(t)\bigl(\tilde\mu(t,y) - X^y(t)\bigr)\,dt + L^X\,dW^\mathbb{Q}(t)" />
                with time-varying reversion rate <M m="\tilde\Theta(t) = \Theta + L^X\eta(t)Pe^{-\Theta(T-t)}" /> and view-adjusted mean <M m="\tilde\mu(t,y)" />.
              </div>
            </div>
          </Frag>
          <Frag at={1} frag={frag}>
            <div className="thm gold" style={{ marginBottom: 6 }}>
              <div className="thm-lbl gold">Effective Horizon (Scalar Case)</div>
              <div className="thm-body">
                For <M m="d=1" />, <M m="Y = X(T)+\varepsilon" />, <M m="\varepsilon\sim\mathcal{N}(0,\omega^2)" />:
                <D m="\tilde{T} = T + \delta, \qquad \tilde{y} = e^{-\theta\delta}\,y + (1-e^{-\theta\delta})\,\mu" />
                <div style={{ fontSize: '0.82em', color: '#888', marginTop: -2 }}>
                  where <M m="\delta = \tfrac{1}{2\theta}\ln\!\left(1 + \tfrac{2\theta\omega^2}{\sigma^2}\right)" />
                </div>
              </div>
            </div>
          </Frag>
          {/* Figure — 4 overlaid images, cross-fading through frags 1→2→3→4 */}
          <div style={{
            flex: 1, minHeight: 0, position: 'relative',
            border: '1px solid var(--border)', borderRadius: 5, overflow: 'hidden', background: '#fafafa',
            opacity: frag >= 1 ? 1 : 0, transition: 'opacity 0.3s ease'
          }}>
            {[
              { src: 'figures/MrB_empty.png',   alt: 'Empty axes',        at: 1 },
              { src: 'figures/MrB_free.png',    alt: 'Free OU paths',     at: 2 },
              { src: 'figures/MrB_view.png',    alt: 'View y at T',       at: 3 },
              { src: 'figures/MrB_bridges.png', alt: 'Bridge paths',      at: 4 },
            ].map(({ src, alt, at }) => (
              <img key={src} src={src} alt={alt}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                         objectFit: 'contain', objectPosition: 'center',
                         opacity: frag >= at ? 1 : 0, transition: 'opacity 0.4s ease' }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Frag at={5} frag={frag}>
            <div className="thm navy" style={{ marginBottom: 10 }}>
              <div className="thm-lbl">Theorem: Conditional Return SDE</div>
              <div className="thm-body">
                Under <M m="\mathbb{Q}" />, asset returns follow:
                <D m="dR^y(t) = \Bigl(\tilde\alpha(t,y) + \tilde\beta(t)\,X^y(t)\Bigr)dt + L^S\,dW^\mathbb{Q}(t)" />
                <div style={{ fontSize: '0.82em', color: '#555', marginTop: 2 }}>
                  <M m="\tilde\beta(t) = \beta - L^S\eta(t)Pe^{-\Theta(T-t)}" />: view tilts factor loadings; collapses to <M m="\beta" /> at <M m="t=T" />
                </div>
              </div>
            </div>
          </Frag>
          <Frag at={6} frag={frag}>
            <div style={{ fontSize: '0.88em', fontStyle: 'italic', color: '#555', padding: '5px 10px', borderLeft: '3px solid var(--gold)', marginBottom: 8 }}>
              Views about future covariates <M m="X(T)" /> change how current covariates <M m="X(t)" /> are used to predict returns; the same factor, a different loading.
            </div>
          </Frag>
          <Frag at={7} frag={frag}>
            <div className="thm gold" style={{ flex: 1 }}>
              <div className="thm-lbl gold">Two-Period Example</div>
              <div className="thm-body" style={{ fontSize: '0.87em' }}>
                <D m="X_T = a\,X_0 + \xi,\quad R_T = \alpha + \beta\,X_0 + \nu" />
                <D m="Y = X_T + \varepsilon,\;\varepsilon \sim \mathcal{N}(0,\omega^2),\;\operatorname{Cov}(\nu,\xi)=c\neq 0" />
                <div style={{ opacity: frag >= 8 ? 1 : 0, transition: 'opacity 0.35s ease', marginTop: 10 }}>
                  <div style={{ fontSize: '0.78em', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                    Returns model with views
                  </div>
                  <D m="R_T^y = \tilde\alpha(y) + \tilde\beta\,X_0 + \nu^{\mathbb{Q}}" />
                  <div style={{ fontSize: '0.82em', color: '#888', marginTop: -2 }}>
                    <M m="\tilde\beta = \beta - \tfrac{c\,a}{\sigma_\xi^2+\omega^2} \neq \beta" /> iff <M m="\operatorname{Cov}(\nu,\xi) \neq 0" />
                    <br />
                    <M m="\tilde\alpha(y) = \alpha + \tfrac{c\,y}{\sigma_\xi^2+\omega^2} \neq \alpha" /> iff <M m="\operatorname{Cov}(\nu,\xi) \neq 0" />
                  </div>
                </div>
              </div>
            </div>
          </Frag>
        </div>
      </div>
    </ContentSlide>
  )
}
S13.frags = 8

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 14 — Factor Models: Optimal Portfolio & Results
// ─────────────────────────────────────────────────────────────────────────────
function S14({ frag }) {
  return (
    <ContentSlide title="Factor Models: Optimal Portfolio & Empirical Results" stripe="var(--gold)">
      <div className="col-5545">
        <div>
          <Frag at={0} frag={frag}>
            <div className="thm" style={{ marginBottom: 8 }}>
              <div className="thm-lbl">Optimal Portfolio (Factor Setting)</div>
              <div className="thm-body">
                The optimal portfolio under factor views (Theorem):
                <D m="\pi^*(t) = \underbrace{\frac{1}{\gamma}(\Sigma^S)^{-1}\bigl(\tilde\alpha(t,y) + \tilde\beta(t)X^y(t) - r_f\mathbf{1}\bigr)}_{\text{MV term with view-adjusted drift}} + \underbrace{\frac{1}{\gamma}\bigl(A(t)X^y(t)+b(t)\bigr)}_{\text{hedging demand}}" />
                <span className="xs c-muted"><M m="A(t)" /> solves a Riccati ODE; <M m="b(t)" /> a linear ODE, both in closed form</span>
              </div>
            </div>
          </Frag>
          <Frag at={1} frag={frag}>
            <div className="thm gold" style={{ marginBottom: 8 }}>
              <div className="thm-lbl gold">What Changes vs. No Views</div>
              <div className="thm-body">
                Without views: <M m="\tilde\beta(t) = \beta" />, <M m="A(t)=0" />: standard factor model portfolio
                <br /><br />
                With factor views: <M m="\tilde\beta(t) = \beta - L^S\eta(t)Pe^{-\Theta(T-t)}" /> becomes time-varying; portfolio tilt adjusts as view horizon approaches
                <br /><br />
                When <M m="\Sigma^{S,X}=0" /> (no factor-return correlation), views affect factor paths but leave <M m="\tilde\beta(t)=\beta" /> unchanged
              </div>
            </div>
          </Frag>
        </div>
        <div>
          <Frag at={2} frag={frag}>
            <div className="thm green" style={{ marginBottom: 8 }}>
              <div className="thm-lbl green">Empirical Performance</div>
              <div className="thm-body">
                Applied to Fama–French 5-factor model, views on factors:
                <br /><br />
                • <strong>+11% Sharpe</strong> vs. factor model without views
                <br />
                • <strong>Outperforms DBL</strong> when factors are persistent; OU mean reversion adds structure that GBM misses
                <br />
                • <strong>Robustness:</strong> performance degrades gracefully as factor views become noisier
              </div>
            </div>
          </Frag>
          <Frag at={3} frag={frag}>
            <div className="thm navy">
              <div className="thm-lbl">Comparison: DBL vs. Factor Model</div>
              <div className="thm-body xs">
                <div className="two-col" style={{ gap: 8 }}>
                  <div>
                    <span className="c-blue bold">DBL (Part I):</span><br />
                    · GBM log-returns <M m="X(t)" /><br />
                    · Views <M m="Y=PX(T)+\sqrt{T}\varepsilon" /><br />
                    · Effective horizon <M m="\tilde{T}_i=1/H_{ii}" /><br />
                    · Brownian bridge structure
                  </div>
                  <div>
                    <span className="c-gold bold">Factor Model (Part II):</span><br />
                    · OU factors <M m="dX=\Theta(\mu-X)dt+L^X dW" /><br />
                    · Views <M m="Y=PX(T)+\varepsilon" /><br />
                    · Effective horizon <M m="\tilde{T}=T+\delta" /><br />
                    · Time-varying <M m="\tilde\Theta(t),\,\tilde\beta(t)" />
                  </div>
                </div>
              </div>
            </div>
          </Frag>
        </div>
      </div>
    </ContentSlide>
  )
}
S14.frags = 3

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 14b — Optimal Policy: Two Channels of View Impact
// ─────────────────────────────────────────────────────────────────────────────
function S14b({ frag }) {
  return (
    <ContentSlide title="Optimal Policy: Two Channels of View Impact" stripe="var(--gold)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Optimal portfolio formula */}
        <Frag at={0} frag={frag}>
          <div className="thm" style={{ marginBottom: 0 }}>
            <div className="thm-lbl">Theorem: Optimal Portfolio under Factor Views</div>
            <div className="thm-body">
              <D m="\pi^*(t) = \underbrace{\frac{1}{\gamma}(\Sigma^S)^{-1}\bigl(\tilde\alpha(t,y) + \tilde\beta(t)\,X^y(t) - r_f\mathbf{1}\bigr)}_{\text{(1) MV term}} \;+\; \underbrace{\frac{1}{\gamma}\bigl(A(t)\,X^y(t)+b(t)\bigr)}_{\text{(2) Hedging demand}}" />
            </div>
          </div>
        </Frag>

        {/* Two channels */}
        <Frag at={1} frag={frag}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, padding: '8px 12px', borderLeft: '3px solid var(--navy)', background: '#f5f7ff', borderRadius: 3, fontSize: '0.87em' }}>
              <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>(1) MV term</div>
              Views change <M m="\tilde\alpha(t,y)" /> and <M m="\tilde\beta(t) = \beta - L^S\eta(t)Pe^{-\Theta(T-t)}" />: the loading on <M m="X^y(t)" /> is no longer <M m="\beta" />.
            </div>
            <div style={{ flex: 1, padding: '8px 12px', borderLeft: '3px solid var(--gold)', background: '#fffbeb', borderRadius: 3, fontSize: '0.87em' }}>
              <div style={{ fontWeight: 700, color: '#92610a', marginBottom: 4 }}>(2) Hedging demand</div>
              <M m="A(t)" /> and <M m="b(t)" /> hedge investment opportunity set risk. Their ODEs also depend on <M m="\tilde\beta(t)" /> and <M m="\tilde\Theta(t)" />: views enter here too.
            </div>
          </div>
        </Frag>

        {/* ODEs */}
        <Frag at={2} frag={frag}>
          <div className="thm gold" style={{ marginTop: 2 }}>
            <div className="thm-lbl gold"><M m="A(t)" /> and <M m="b(t)" />: ODE System (backward, <M m="A(T)=b(T)=0" />)</div>
            <div className="thm-body" style={{ fontSize: '0.78em' }}>
              <div className="two-col" style={{ gap: 14 }}>
                <div>
                  <span style={{ fontWeight: 600 }}><M m="A(t)" />: matrix Riccati:</span>
                  <D m={`A'(t) + \\tfrac{1-\\gamma}{\\gamma}\\tilde\\beta(t)^\\top(\\Sigma^S)^{-1}\\tilde\\beta(t) \\\\
                    + A(t)\\!\\left(\\Sigma^X + \\tfrac{1-\\gamma}{\\gamma}(\\Sigma^{S,X})^\\top(\\Sigma^S)^{-1}\\Sigma^{S,X}\\right)\\!A(t) \\\\
                    + A(t)\\!\\left(\\tfrac{1-\\gamma}{\\gamma}(\\Sigma^{S,X})^\\top(\\Sigma^S)^{-1}\\tilde\\beta(t) - \\tilde\\Theta(t)\\right) \\\\
                    + \\left(\\cdots\\right)^\\top\\! A(t) = 0`} />
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}><M m="b(t)" />: linear ODE:</span>
                  <D m={`b'(t) + \\tfrac{1-\\gamma}{\\gamma}\\!\\left(\\tilde\\beta(t)^\\top + A(t)(\\Sigma^{S,X})^\\top\\right)\\!(\\Sigma^S)^{-1} \\\\
                    \\cdot\\!\\left(\\Sigma^{S,X}b(t) + \\tilde\\alpha(t,y) - r_f\\mathbf{1}_N\\right) \\\\
                    + \\left(A(t)\\Sigma^X - \\tilde\\Theta(t)^\\top\\right)\\!b(t) \\\\
                    + A(t)\\tilde\\Theta(t)\\tilde\\mu(t,y) = 0`} />
                </div>
              </div>
              <div style={{ color: '#888', fontSize: '0.9em', marginTop: 6 }}>
                Both driven by <M m="\tilde\beta(t)" /> and <M m="\tilde\Theta(t)" />: views enter both channels; impact on hedging not transparent from ODEs alone.
              </div>
            </div>
          </div>
        </Frag>

        {/* Simplification callout */}
        <Frag at={3} frag={frag}>
          <div style={{ borderLeft: '3px solid var(--gold)', padding: '7px 12px', fontStyle: 'italic', fontSize: '0.88em', color: '#555' }}>
            <strong style={{ fontStyle: 'normal', color: 'var(--navy)' }}>Simplification (Theorem 5.2):</strong> The investor solves the same Riccati system as if there were no views, with constant coefficients <M m="(\beta,\Theta)" />.
            The beliefs <M m="(y,\Omega)" /> appear only in the terminal conditions: <M m="A_1(T) = -P^\top\Omega^{-1}P" /> and <M m="b_1(T) = P^\top\Omega^{-1}y" />.

          </div>
        </Frag>

      </div>
    </ContentSlide>
  )
}
S14b.frags = 3

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 14c — Robustness to Misspecification
// ─────────────────────────────────────────────────────────────────────────────
function S14c({ frag }) {
  return (
    <ContentSlide title="Robustness to Misspecification" stripe="var(--gold)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>

        {/* ── TOP ROW: two equal fixed boxes, always in layout ── */}
        <div style={{ display: 'flex', gap: 10 }}>
          {/* Left — equation */}
          <div style={{
            flex: 1, background: '#f0f4ff', border: '1px solid #c8d4f0',
            borderRadius: 5, padding: '9px 14px', fontSize: '0.82em',
          }}>
            <D m="\mathrm{d}R^y(t) = \bigl(\tilde\alpha(t,y) + \tilde\beta(t)\,X^y(t)\bigr)\,\mathrm{d}t + L^S\,\mathrm{d}W^Q(t)" />
            <div style={{ marginTop: 6, color: 'var(--navy)' }}>
              <M m="\tilde\beta(t)" /> drives return sensitivity.&nbsp;
              <strong>What if <M m="\hat\beta=(1+\varepsilon_\beta)\beta" /> is wrong?</strong>
            </div>
          </div>

          {/* Right — κ setup, same size, fades in at frag 2 */}
          <div style={{
            flex: 1, background: '#f0f4ff', border: '1px solid #c8d4f0',
            borderRadius: 5, padding: '9px 13px', fontSize: '0.82em', color: 'var(--navy)',
            opacity: frag >= 2 ? 1 : 0, transition: 'opacity 0.4s',
          }}>
            <div><span style={{ fontWeight: 700 }}>View model: </span><M m="Y=PX_T+\varepsilon,\;\Omega=\kappa\,\Omega_0" /></div>
            <div style={{ color: '#555', marginTop: 3 }}>small <M m="\kappa" />: precise &middot; large <M m="\kappa" />: noisy</div>
            <div style={{ marginTop: 6 }}><span style={{ fontWeight: 700 }}>Misspecification:</span></div>
            <div style={{ marginTop: 2 }}>investor uses <M m="\hat\kappa=(1+\varepsilon_\kappa)\kappa_{\mathrm{true}}" /></div>
            <div style={{ color: '#555', marginTop: 3 }}>
              <M m="\varepsilon_\kappa<0" />: overconfident &middot; <M m="\varepsilon_\kappa>0" />: conservative
            </div>
          </div>
        </div>

        {/* ── GRAPH ROW: two equal columns, always in layout ── */}
        <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0 }}>

          {/* Left — beta graph, fades in at frag 1 */}
          <div style={{
            flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6,
            opacity: frag >= 1 ? 1 : 0, transition: 'opacity 0.4s',
          }}>
            <div style={{ fontSize: '0.83em', fontWeight: 600, color: 'var(--navy)' }}>
              Loading misspecification (<M m="\hat\beta=(1+\varepsilon_\beta)\beta" />): VOI
            </div>
            <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', background: '#fafafa' }}>
              <img src="figures/robustness_beta.png" alt="Beta misspecification VOI"
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
            </div>
            <div style={{ fontSize: '0.80em', color: '#555', lineHeight: 1.4 }}>
              VOI stays <strong>positive</strong> across all errors. Slight underestimation even <em>helps</em>.
            </div>
          </div>

          {/* Right — omega graph, fades in at frag 3 */}
          <div style={{
            flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6,
            opacity: frag >= 3 ? 1 : 0, transition: 'opacity 0.4s',
          }}>
            <div style={{ fontSize: '0.83em', fontWeight: 600, color: 'var(--navy)' }}>
              Precision misspecification (<M m="\hat\kappa=(1+\varepsilon_\kappa)\kappa" />): VOI
            </div>
            <div style={{ flex: 1, minHeight: 0, border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', background: '#fafafa' }}>
              <img src="figures/robustness_Omega.png" alt="Precision misspecification VOI"
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
            </div>
            <div style={{ fontSize: '0.80em', color: '#555', lineHeight: 1.4 }}>
              Overconfidence (<M m="\varepsilon_\kappa<-30\%" />) flips VOI <strong style={{ color: 'var(--red)' }}>negative</strong>.
            </div>
          </div>
        </div>

        {/* ── Bottom callout — own click ── */}
        <div style={{
          borderLeft: '3px solid var(--gold)', padding: '7px 12px',
          background: '#fffbeb', borderRadius: 3, fontSize: '0.88em', color: '#444',
          opacity: frag >= 4 ? 1 : 0, transition: 'opacity 0.4s',
        }}>
          Views remain valuable under misspecification; VOI stays positive across all <M m="\beta" /> errors,
          and is highest when <M m="\beta" /> is <em>underestimated</em>.
          Precision is different: underestimating is safe, but overconfidence causes investors to overreact to noise
          and VOI turns <strong style={{ color: 'var(--red)' }}>negative</strong>.
        </div>

      </div>
    </ContentSlide>
  )
}
S14c.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 15 — Part II Summary
// ─────────────────────────────────────────────────────────────────────────────
function S15({ frag }) {
  return (
    <ContentSlide title="Part II: Summary" stripe="var(--gold)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'center' }}>

        {/* Setup — always visible */}
        <Insight>Views about future covariates do two things simultaneously.</Insight>

        {/* Top boxes — frag 1 */}
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ flex: 1, opacity: frag >= 1 ? 1 : 0, transition: 'opacity 0.4s' }}>
            <Thm color="gold" label="① Change covariate prediction">
              Conditioning on the view pins the OU process; factors bridge toward the view target
              rather than the unconditional mean. The effective horizon <M m="\widetilde T > T" /> measures
              how valuable the view is.
            </Thm>
          </div>
          <div style={{ flex: 1, opacity: frag >= 1 ? 1 : 0, transition: 'opacity 0.4s' }}>
            <Thm label="② Change how covariates predict returns">
              The return loading shifts: <M m="\tilde\beta(t)\neq\beta" /> whenever returns and
              factors co-move (<M m="\Sigma^{S,X}\neq 0" />). The same factor carries different
              predictive content under the view measure.
            </Thm>
          </div>
        </div>

        {/* Flow down to optimal policy — frag 2 */}
        <div style={{ opacity: frag >= 2 ? 1 : 0, transition: 'opacity 0.4s' }}>

          {/* Two arrows */}
          <div style={{ display: 'flex', gap: 14, marginBottom: 2 }}>
            <div style={{ flex: 1, textAlign: 'center', fontSize: '1.5em', color: 'var(--gold)', lineHeight: 1 }}>↓</div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: '1.5em', color: 'var(--navy)', lineHeight: 1 }}>↓</div>
          </div>

          {/* Optimal policy label */}
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.95em', color: 'var(--navy)', background: '#eef1f8', border: '1px solid #c8d4f0', borderRadius: 5, padding: '6px 0', marginBottom: 6 }}>
            Both affect the optimal portfolio <M m="\pi^*(t)" />
          </div>

          {/* Two outcome boxes */}
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flex: 1, background: '#fffbeb', border: '2px solid var(--gold)', borderRadius: 6, padding: '8px 14px', textAlign: 'center', fontSize: '0.90em', fontWeight: 600, color: 'var(--navy)' }}>
              Hedging demand
            </div>
            <div style={{ flex: 1, background: '#f0f4ff', border: '2px solid var(--navy)', borderRadius: 6, padding: '8px 14px', textAlign: 'center', fontSize: '0.90em', fontWeight: 600, color: 'var(--navy)' }}>
              Risk-return tradeoff
            </div>
          </div>

        </div>

      </div>
    </ContentSlide>
  )
}
S15.frags = 2

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 16 — Part III Divider: Secretary / DRO
// ─────────────────────────────────────────────────────────────────────────────
function S16() {
  return (
    <DarkSlide
      accent="var(--red)"
      eyebrow="PART III"
      eyebrowSize="1.1em"
      title="When Worst-Case Isn't Robust: DRO and the Secretary Problem"
      sub="Sequential stopping hinges on an exploration-exploitation tradeoff: stop now, or keep searching. Under model misspecification, does a robust decision-maker explore more, or less? We show it is neither: worst-case optimization leaves the stopping rule unchanged, and genuine robustness requires redesigning the process itself."
      footer="Abdelhakmi & Lim (Working paper) · When Worst-Case Isn't Robust: On the Limitations of Distributionally Robust Formulations in Secretary Problems"
    />
  )
}
S16.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 17 — Secretary Problems
// ─────────────────────────────────────────────────────────────────────────────
function S17({ frag }) {
  return (
    <ContentSlide title="Secretary Problems" stripe="var(--red)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>

        {/* Row 1: Setting + Decision rule side by side */}
        <div className="col-5545" style={{ gap: 10 }}>
          <div className="thm">
            <div className="thm-lbl">The Setting</div>
            <div className="thm-body" style={{ fontSize: '.88em' }}>
              <M m="N" /> items arrive sequentially. At each step, observe the item's <em>relative rank</em> among those seen. <strong>Accept or reject immediately, no recall.</strong>
              <br /><br />
              <strong>Objective:</strong> select the single best item.
            </div>
          </div>
          {/* Candidate flow diagram */}
          <div style={{ background: '#f8f9ff', border: '1.5px solid #c8d4f0', borderRadius: 6, padding: '8px 10px' }}>
            <CandidateFlow />
            <div style={{ marginTop: 5, fontSize: '0.76em', color: '#666', lineHeight: 1.45, borderTop: '1px solid #e8edf5', paddingTop: 5 }}>
              <strong>Classic result (uniform arrivals):</strong> skip the first <M m="\lfloor N/e \rfloor" /> items, then accept the next record-setter. Success probability <M m="\to 1/e \approx 36.8\%" />.
            </div>
          </div>
        </div>

        {/* Row 2: Applications — compact */}
        <Frag at={1} frag={frag}>
          <div style={{ background: '#fafafa', border: '1px solid #e4e8f0', borderRadius: 6, padding: '7px 12px' }}>
            <div style={{ fontSize: '0.68em', fontWeight: 700, color: '#c8830a', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>
              Applications: canonical across OR/OM and CS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px 14px', fontSize: '.76em', color: '#444' }}>
              <div style={{ color: '#888', fontSize: '.8em', fontWeight: 700, textTransform: 'uppercase', paddingBottom: 2 }}>Operations Management</div>
              <div style={{ color: '#888', fontSize: '.8em', fontWeight: 700, textTransform: 'uppercase', paddingBottom: 2 }}>Finance &amp; Markets</div>
              <div style={{ color: '#888', fontSize: '.8em', fontWeight: 700, textTransform: 'uppercase', paddingBottom: 2 }}>Algorithms &amp; ML</div>
              <div>Hiring &amp; talent acquisition</div><div>VC deal flow</div><div>Online selection algorithms</div>
              <div>Procurement auctions</div><div>Asset &amp; real estate offers</div><div>Prophet inequalities</div>
              <div>Gig platform matching (Uber, Lyft)</div><div>Ad auction allocation</div><div>Matching markets</div>
            </div>
          </div>
        </Frag>

        {/* Row 3: Results — prominent, revealed one by one */}
        <Frag at={2} frag={frag}>
          <div style={{ fontSize: '0.82em', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6, marginBottom: 7, paddingLeft: 10, borderLeft: '4px solid var(--red)' }}>
            This paper: Secretary Problems under model misspecification
          </div>
        </Frag>
        <div className="two-col" style={{ gap: 12 }}>
          {/* Result I */}
          <Frag at={3} frag={frag}>
            <div style={{ background: 'var(--red)', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2em', fontWeight: 900, color: 'rgba(255,255,255,0.25)', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>I</div>
              <div>
                <div style={{ fontWeight: 800, color: 'white', fontSize: '.92em', marginBottom: 5, lineHeight: 1.2 }}>Traditional robustness methods fail</div>
                <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: '.82em', lineHeight: 1.4 }}>DRO produces solutions that are <em>highly sensitive</em> to misspecification</div>
              </div>
            </div>
          </Frag>
          {/* Result II */}
          <Frag at={4} frag={frag}>
            <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2em', fontWeight: 900, color: 'rgba(255,255,255,0.20)', lineHeight: 1, flexShrink: 0, marginTop: 2 }}>II</div>
              <div>
                <div style={{ fontWeight: 800, color: 'white', fontSize: '.92em', marginBottom: 5, lineHeight: 1.2 }}>Secretary Problems are fragile by construction</div>
                <div style={{ color: 'rgba(255,255,255,0.78)', fontSize: '.82em', lineHeight: 1.4 }}>We identify the root cause and propose mechanisms to fix this</div>
              </div>
            </div>
          </Frag>
        </div>

      </div>
    </ContentSlide>
  )
}
S17.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 18 — DRO Formulation
// ─────────────────────────────────────────────────────────────────────────────
function UncertaintyBallSVG() {
  // Circle center (88,88), radius 68. Q is inside at ~75% radius.
  // P at center. eta arrow from P outward to left boundary.
  return (
    <svg width="170" height="160" viewBox="0 0 170 160" style={{ flexShrink: 0 }}>
      <defs>
        <marker id="ub-eta" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#D97706" />
        </marker>
        <marker id="ub-pq" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#1B2F5E" />
        </marker>
      </defs>
      {/* Uncertainty ball — large circle, Q clearly inside */}
      <circle cx="88" cy="88" r="68" fill="rgba(36,99,235,0.04)" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6,3" />
      {/* P &#x2192; Q arrow with arrowhead (Q inside circle) */}
      <line x1="88" y1="88" x2="121" y2="50" stroke="#1B2F5E" strokeWidth="1.6" markerEnd="url(#ub-pq)" />
      {/* H(Q||P) label &#x2014; left of diagonal */}
      <text x="82" y="62" fontSize="11.5" fill="#1B2F5E"
        fontFamily="KaTeX_Math, serif" fontStyle="italic" textAnchor="middle">
        <tspan fontFamily="KaTeX_Caligraphic, serif">H</tspan>
        <tspan>(</tspan>
        <tspan fill="#C0392B" fontFamily="KaTeX_AMS, serif">&#x211A;</tspan>
        <tspan fontFamily="KaTeX_Math, serif"> &#x2225; </tspan>
        <tspan fontFamily="KaTeX_AMS, serif">&#x2119;</tspan>
        <tspan fontFamily="KaTeX_Math, serif">)</tspan>
      </text>
      {/* P dot */}
      <circle cx="88" cy="88" r="4" fill="#1B2F5E" />
      {/* P label — \mathbb{P} */}
      <text x="96" y="94" fontSize="15" fill="#1B2F5E"
        fontFamily="KaTeX_AMS, KaTeX_Main, serif">&#x2119;</text>
      {/* Q dot — inside circle */}
      <circle cx="121" cy="50" r="4" fill="#C0392B" />
      {/* Q label — \mathbb{Q} */}
      <text x="129" y="56" fontSize="15" fill="#C0392B"
        fontFamily="KaTeX_AMS, KaTeX_Main, serif">&#x211A;</text>
      {/* &#x3b7; arrow: FROM P outward to LEFT boundary of circle */}
      <line x1="88" y1="88" x2="22" y2="88"
        stroke="#D97706" strokeWidth="1.6" strokeDasharray="5,3"
        markerEnd="url(#ub-eta)" />
      {/* &#x3b7; label below arrow */}
      <text x="52" y="107" fontSize="14" fill="#D97706"
        fontFamily="KaTeX_Math, serif" fontStyle="italic">&#x3b7;</text>
    </svg>
  )
}

function S18({ frag }) {
  return (
    <ContentSlide title="Distributionally Robust Secretary Problem" stripe="var(--red)">
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 6 }}>

        {/* ── Step 0: Nominal model — always visible ── */}
        <div className="col-6040" style={{ gap: 12, alignItems: 'start' }}>
          {/* Left: general formulation */}
          <div>
            <div style={{ fontSize: '0.70em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--navy)', marginBottom: 5 }}>
              Nominal Model <M m="\mathbb{P}" />
            </div>
            <div style={{ fontSize: '0.79em', color: 'var(--text)', lineHeight: 1.5, marginBottom: 6 }}>
              N items with values X<sub>1</sub>,&#x2026;,X<sub>N</sub> drawn from joint distribution <strong><M m="\mathbb{P}" /></strong>.
              At each period observe information <M m="\mathcal{F}_n" />, accept or reject, <strong>no recall</strong>.
            </div>
            <D m="\max_{\tau}\;\mathbb{E}_{\mathbb{P}}[r_\tau] \;=\; \max_{\tau}\;\mathbb{P}[r_\tau = 1], \qquad r_n = \mathbf{1}\!\Bigl(X_n = \max_{1 \le i \le N} X_i\Bigr)" />
            <div style={{ fontSize: '0.68em', color: 'var(--muted)', marginTop: 2, paddingLeft: 14, lineHeight: 1.4 }}>
              Maximize expected reward <M m="\equiv" /> maximize probability of selecting the best item
            </div>
          </div>
          {/* Right: variants */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ fontSize: '0.70em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--navy)', marginBottom: 1 }}>
              Variants: differ in <M m="\mathbb{P}" /> and <M m="\mathcal{F}_n" />
            </div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)', borderRadius: '0 4px 4px 0', padding: '4px 10px' }}>
              <div style={{ fontSize: '0.68em', fontWeight: 700, color: 'var(--blue)', marginBottom: 2 }}>Classical (Rank-Only)</div>
              <div style={{ fontSize: '0.71em', color: 'var(--muted)', lineHeight: 1.35 }}><M m="\mathbb{P}" /> = uniform permutation &#xb7; observe rank Y<sub>n</sub> &#xb7; optimal: 1/e rule</div>
            </div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '3px solid var(--green)', borderRadius: '0 4px 4px 0', padding: '4px 10px' }}>
              <div style={{ fontSize: '0.68em', fontWeight: 700, color: 'var(--green)', marginBottom: 2 }}>Full-Information</div>
              <div style={{ fontSize: '0.71em', color: 'var(--muted)', lineHeight: 1.35 }}>X<sub>i</sub> ~ i.i.d. F (known) &#xb7; observe true value X<sub>n</sub> &#xb7; optimal: &#x2248; 58%</div>
            </div>
            <div style={{ background: 'white', border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)', borderRadius: '0 4px 4px 0', padding: '4px 10px' }}>
              <div style={{ fontSize: '0.68em', fontWeight: 700, color: 'var(--gold)', marginBottom: 2 }}>Bayesian / Non-i.i.d.</div>
              <div style={{ fontSize: '0.71em', color: 'var(--muted)', lineHeight: 1.35 }}>Prior on <M m="\mathbb{P}" /> &#xb7; Bayesian learning &#xb7; general information structure</div>
            </div>
          </div>
        </div>

        {/* ── Step 1: DRO penalized formulation ── */}
        <Frag at={1} frag={frag}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(192,57,43,0.04)', border: '1px solid rgba(192,57,43,0.18)', borderRadius: 4, padding: '7px 12px' }}>
              <div style={{ fontSize: '0.70em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--red)', marginBottom: 4 }}>
                DRO: Penalized Formulation
              </div>
              <D m="\max_{\tau}\;\inf_{\mathbb{Q}}\Bigl\{\,\mathbb{Q}[\text{success}]\;+\;\tfrac{1}{\eta}\,\mathcal{H}(\mathbb{Q}\,\|\,\mathbb{P})\,\Bigr\}" />
              <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
                <div style={{ flex: 1, background: 'rgba(36,99,235,0.07)', borderLeft: '3px solid var(--blue)', borderRadius: '0 3px 3px 0', padding: '4px 8px' }}>
                  <div style={{ fontSize: '0.63em', fontWeight: 800, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 1 }}>
                    &#x2191; Decision-Maker
                  </div>
                  <div style={{ fontSize: '0.71em', color: 'var(--text)', lineHeight: 1.35 }}>
                    Chooses &#x3c4; to <strong>maximize</strong> worst-case success
                  </div>
                </div>
                <div style={{ flex: 1, background: 'rgba(192,57,43,0.07)', borderLeft: '3px solid var(--red)', borderRadius: '0 3px 3px 0', padding: '4px 8px' }}>
                  <div style={{ fontSize: '0.63em', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 1 }}>
                    &#x2191; Nature
                  </div>
                  <div style={{ fontSize: '0.71em', color: 'var(--text)', lineHeight: 1.35 }}>
                    Chooses &#x211a; to <strong>minimize</strong>, pays penalty <M m="\tfrac{1}{\eta}\mathcal{H}(\mathbb{Q}\|\mathbb{P})" />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '0.63em', color: 'var(--muted)', marginTop: 4 }}>
                We use KL divergence; results extend to general &#x3c6;-divergence (&#x3c7;&#xb2;, TV) and Wasserstein distance
              </div>
            </div>
            <UncertaintyBallSVG />
          </div>
        </Frag>

        {/* ── Step 2: Adversarial E-E tradeoff ── */}
        <Frag at={2} frag={frag}>
          <div style={{ background: '#FFF1F1', border: '1px solid rgba(192,57,43,0.28)', borderRadius: 4, padding: '8px 12px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <div style={{ fontSize: '0.70em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--red)' }}>
                Adversarial Game: At Each Period n &#x2208; &#x7b;1,&#x2026;,N&#x7d;
              </div>
              <div style={{ flex: 1, height: 1, background: 'rgba(192,57,43,0.25)' }} />
              <div style={{ fontSize: '0.62em', fontWeight: 700, color: 'var(--red)', background: 'rgba(192,57,43,0.12)', padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                The Robustness–Exploration–Exploitation Tradeoff
              </div>
            </div>
            {/* Worst-case value function — appears at frag=2 (no Frag wrapper, inside the frag=2 box) */}
            <D m="R_n^{\eta} = \max\!\left\{\begin{array}{l} \inf_{\mathbb{Q}}\Bigl\{\mathbb{Q}[\text{current item is the best}]+\tfrac{1}{\eta}\mathcal{H}(\mathbb{Q}\|\mathbb{P}_n)\Bigr\} \\[3pt] \inf_{\mathbb{Q}}\Bigl\{\mathbb{Q}[\text{finding the best in the future}]+\tfrac{1}{\eta}\mathcal{H}(\mathbb{Q}\|\mathbb{P}_n)\Bigr\} \end{array}\right." />
            {/* Two-column game layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignItems: 'stretch', marginTop: 6 }}>
              {/* Exploit card — appears at frag=3 */}
              <Frag at={3} frag={frag}>
                <div style={{ background: 'rgba(192,57,43,0.09)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 4, padding: '7px 10px', height: '100%' }}>
                  <div style={{ fontSize: '0.65em', fontWeight: 800, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Exploit: Choose Current Item
                  </div>
                  <div style={{ fontSize: '0.71em', color: 'var(--text)', lineHeight: 1.4 }}>
                    Nature shows a <strong style={{ color: 'var(--blue)' }}>good future</strong>, making you regret stopping.
                  </div>
                </div>
              </Frag>
              {/* Explore card — appears at frag=4 */}
              <Frag at={4} frag={frag}>
                <div style={{ background: 'rgba(27,47,94,0.07)', border: '1px solid rgba(27,47,94,0.25)', borderRadius: 4, padding: '7px 10px', height: '100%' }}>
                  <div style={{ fontSize: '0.65em', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    Explore: Reject Current Item
                  </div>
                  <div style={{ fontSize: '0.71em', color: 'var(--text)', lineHeight: 1.4 }}>
                    Nature shows a <strong style={{ color: 'var(--red)' }}>bad future</strong>, making you regret not stopping.
                  </div>
                </div>
              </Frag>
            </div>
          </div>
        </Frag>
      </div>
    </ContentSlide>
  )
}
S18.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 19 — Main Theorem: Nominal = DRO Optimal
// ─────────────────────────────────────────────────────────────────────────────
function S19({ frag }) {
  return (
    <ContentSlide title="The Nominal Policy is Worst-Case Optimal" stripe="var(--red)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Central theorem — always visible, prominent */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(27,47,94,0.06) 0%, rgba(36,99,235,0.05) 100%)',
          border: '2px solid var(--navy)',
          borderRadius: 8,
          padding: '22px 32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.95em', fontWeight: 800, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>
            Theorem: DRO Invariance
          </div>
          <div style={{ fontSize: '0.78em', color: '#555', marginBottom: 10 }}>
            For any <M m="\eta > 0" />, any variant; holds for both <M m="\phi" />-divergence and <M m="\ell_1" /> Wasserstein
          </div>
          <D m="\pi^*_{\mathrm{DRO}}(\eta) \;=\; \pi^*_{\mathrm{nominal}} \qquad \forall\,\eta > 0" />
          <div style={{ fontSize: '0.76em', color: '#555', marginTop: 8, fontStyle: 'italic' }}>
            DRO does <strong style={{ fontStyle: 'normal', color: 'var(--navy)' }}>not</strong> change the optimal policy.
          </div>
        </div>

        {/* Special case */}
        <Frag at={1} frag={frag}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(180,150,60,0.08)', border: '1px solid rgba(180,150,60,0.4)', borderRadius: 5, padding: '9px 16px' }}>
            <span style={{ fontSize: '0.62em', fontWeight: 800, color: '#9a7d20', textTransform: 'uppercase', letterSpacing: '0.09em', whiteSpace: 'nowrap' }}>Special Case</span>
            <span style={{ width: 1, height: 16, background: 'rgba(180,150,60,0.4)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.76em', color: 'var(--text)' }}>
              The <M m="1/e" /> policy is worst-case optimal for the classic setting.
            </span>
          </div>
        </Frag>

        {/* Proof sketch */}
        <Frag at={2} frag={frag}>
          <div style={{ fontSize: '0.72em', color: '#666', fontStyle: 'italic', lineHeight: 1.5, paddingLeft: 10, borderLeft: '3px solid rgba(100,100,100,0.2)' }}>
            <strong style={{ fontStyle: 'normal', color: 'var(--text)' }}>Proof.</strong>{' '}
            It follows from the binary property of the objective.
          </div>
        </Frag>

        {/* Bridge question */}
        <Frag at={3} frag={frag}>
          <Insight>
            Does this mean the Secretary Problem is robust?
          </Insight>
        </Frag>

      </div>
    </ContentSlide>
  )
}
S19.frags = 3

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 20 — Mean-Sensitivity Tradeoff
// ─────────────────────────────────────────────────────────────────────────────
function makeCurvePath(p, toX, toY, etaMax) {
  const pts = []
  for (let i = 0; i <= 120; i++) {
    const eta = (i / 120) * etaMax
    const g = Math.exp(-eta)
    const f = (g * p) / (1 + (g - 1) * p)
    pts.push(`${toX(eta).toFixed(1)},${toY(f).toFixed(1)}`)
  }
  return 'M ' + pts.join(' L ')
}

function WCProbChart({ frag }) {
  const p = 1 / Math.E          // 1/e policy nominal prob
  const S = p * (1 - p)         // ≈ 0.233

  const left = 55, right = 420, top = 16, bottom = 278
  const W = right - left, H = bottom - top
  const etaMax = 6, fMax = 0.42

  const toX = (eta) => left + (eta / etaMax) * W
  const toY = (f)   => bottom - (f / fMax) * H

  // Actual 1/e curve + tangent
  const curvePath = makeCurvePath(p, toX, toY, etaMax)
  const etaHit = p / S
  const tx1 = toX(0), ty1 = toY(p), tx2 = toX(Math.min(etaHit, etaMax * 0.92)), ty2 = toY(0)

  // Example curves: all start at (0, 1/e), target sensitivity Sval.
  // Formula: f(η) = g_α · p₀ / (1+(g_α−1)·p₀), g_α = exp(−α·η), α = Sval/(p₀(1−p₀))
  // This gives f(0) = p₀ = 1/e  and  f′(0) = −Sval  exactly.
  const p0 = 1 / Math.E
  const p0var = p0 * (1 - p0)   // ≈ 0.233
  const exData = [
    { Sval: 0.01, color: '#16a34a' },
    { Sval: 0.10, color: '#d97706' },
    { Sval: 0.25, color: '#dc2626' },
  ].map(({ Sval, color }) => {
    const alpha = Sval / p0var
    const path = (() => {
      const pts = []
      for (let i = 0; i <= 120; i++) {
        const eta = (i / 120) * etaMax
        const g = Math.exp(-alpha * eta)
        const f = (g * p0) / (1 + (g - 1) * p0)
        pts.push(`${toX(eta).toFixed(1)},${toY(f).toFixed(1)}`)
      }
      return 'M ' + pts.join(' L ')
    })()
    return { Sval, color, alpha, path }
  })

  const xTicks = [0, 1, 2, 3, 4, 5, 6]
  const yTicks = [0, 0.1, 0.2, 0.3]

  const showExamples = frag === 2
  const showFull    = frag >= 3
  const fadeEx   = { opacity: showExamples ? 1 : 0, transition: 'opacity 0.35s' }
  const fadeFull = { opacity: showFull    ? 1 : 0, transition: 'opacity 0.35s' }

  return (
    <svg width="440" height="315" viewBox="0 0 440 315" style={{ fontFamily: 'Inter,sans-serif', overflow: 'visible' }}>
      {/* Grid */}
      {yTicks.slice(1).map(y => (
        <line key={y} x1={left} y1={toY(y)} x2={right} y2={toY(y)} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {/* Axes */}
      <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
      <line x1={left} y1={top}    x2={left} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
      {/* X ticks */}
      {xTicks.map(x => (
        <g key={x}>
          <line x1={toX(x)} y1={bottom} x2={toX(x)} y2={bottom + 4} stroke="#64748b" strokeWidth="1" />
          <text x={toX(x)} y={bottom + 16} textAnchor="middle" fontSize="11" fill="#64748b">{x}</text>
        </g>
      ))}
      {/* Y ticks */}
      {yTicks.map(y => (
        <g key={y}>
          <line x1={left - 4} y1={toY(y)} x2={left} y2={toY(y)} stroke="#64748b" strokeWidth="1" />
          <text x={left - 8} y={toY(y) + 4} textAnchor="end" fontSize="11" fill="#64748b">{y.toFixed(1)}</text>
        </g>
      ))}
      {/* Axis labels */}
      <text x={(left + right) / 2} y={308} textAnchor="middle" fontSize="12" fill="#475569">η (robustness level)</text>
      <text x={13} y={(top + bottom) / 2} textAnchor="middle" fontSize="11" fill="#475569"
        transform={`rotate(-90,13,${(top + bottom) / 2})`}>Worst-case success prob.</text>

      {/* === frag=2: 3 curves, all start at (0, 1/e), different S === */}
      <g style={fadeEx}>
        {/* Shared start dot */}
        <circle cx={toX(0)} cy={toY(p0)} r="5" fill="#1B2F5E" />
        {exData.map(({ Sval, color, path }) => {
          // Tangent: slope = −Sval. Hits 0 at η = p0/Sval (may be off-chart).
          // Draw to whichever comes first: η where tangent=0, or chart right edge.
          const eHitX = Math.min(p0 / Sval, etaMax)
          const eHitY = Math.max(0, p0 - Sval * eHitX)
          return (
            <g key={Sval}>
              <path d={path} fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.9" />
              <line x1={toX(0)} y1={toY(p0)} x2={toX(eHitX)} y2={toY(eHitY)}
                stroke={color} strokeWidth="1.3" strokeDasharray="5,3" strokeOpacity="0.45" />
            </g>
          )
        })}
        {/* Labels: S=0.01 near right end (high up), others along curve */}
        {exData.map(({ Sval, color, alpha }) => {
          const etaL = Sval < 0.05 ? 4.5 : Sval < 0.20 ? 2.0 : 1.0
          const gL = Math.exp(-alpha * etaL)
          const fL = (gL * p0) / (1 + (gL - 1) * p0)
          return (
            <text key={Sval} x={toX(etaL) + 6} y={toY(fL) - 5} fontSize="10.5" fill={color} fontWeight="700">
              {`𝒮 = ${Sval.toFixed(2)}`}
            </text>
          )
        })}
        <text x={toX(3.8)} y={toY(0.07)} fontSize="10.5" fill="#334155" fontWeight="700" textAnchor="middle">
          steeper slope = lower robustness
        </text>
      </g>

      {/* === frag>=3: actual 1/e curve + tangent === */}
      <g style={fadeFull}>
        <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#e05a4e" strokeWidth="2" strokeDasharray="6,3" />
        <path d={curvePath} fill="none" stroke="#dc2626" strokeWidth="2.8" />
        <text x={toX(0.6)} y={toY(p - S * 0.3) + 4} fontSize="11" fill="#e05a4e" fontStyle="italic">slope = −𝒮 ≈ −0.23</text>
      </g>

      {/* Dot at η=0 — always visible */}
      <circle cx={toX(0)} cy={toY(p)} r="5.5" fill="#1B2F5E" />
      <text x={toX(0) + 10} y={toY(p) - 10} fontSize="11.5" fill="#1B2F5E" fontWeight="700">1/e ≈ 0.37</text>
      <line x1={toX(0)} y1={toY(p)} x2={toX(0)} y2={bottom} stroke="#1B2F5E" strokeWidth="1" strokeDasharray="3,3" style={{ opacity: 0.3 }} />
    </svg>
  )
}

function S20({ frag }) {
  return (
    <ContentSlide title="The Mean-Sensitivity Tradeoff" stripe="var(--red)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

        {/* Formula — always visible */}
        <div style={{ background: 'rgba(27,47,94,0.04)', border: '1px solid rgba(27,47,94,0.15)', borderRadius: 5, padding: '10px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.62em', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 6 }}>
            Proposition 4.3: DRO Expansion
          </div>
          <D m="\sup_{\tau}\inf_{\mathbb{Q}}\!\left\{\mathbb{Q}[\text{success}]+\tfrac{1}{\eta}\mathcal{H}(\mathbb{Q}\|\mathbb{P})\right\} \;=_{\eta\to 0}\; \sup_{\tau}\,\mathbb{P}[\text{success}] - \tfrac{\eta}{2}\,\mathcal{S}_{\tau}^{\mathbb{P}} + o(\eta)" />
          {/* Sensitivity definition */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(27,47,94,0.1)' }}>
            <div style={{ fontSize: '0.65em', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>
              Worst-Case Sensitivity
            </div>
            <div>
              <M m="\mathcal{S}_{\tau}^{\mathbb{P}} \;:=\; \lim_{\eta\to 0}\dfrac{1}{\eta}\Bigl(\mathbb{P}[\text{success}] - \mathbb{Q}^*_{\eta}[\text{success}]\Bigr)" />
            </div>
          </div>
          <div style={{ fontSize: '0.66em', color: '#666', marginTop: 5 }}>
            How quickly expected reward decays under worst-case deviations from the nominal model &nbsp;·&nbsp; <strong style={{ color: 'var(--text)' }}><M m="= \mathrm{Var}_\mathbb{P}[r_\tau]" /> under KL</strong>
          </div>
          <div style={{ fontSize: '0.60em', color: '#94a3b8', marginTop: 4, fontStyle: 'italic', textAlign: 'right' }}>
            (see, e.g., Gotoh, Kim &amp; Lim, 2020, 2021)
          </div>
        </div>

        {/* Bottom: graph left, text right */}
        <div style={{ display: 'grid', gridTemplateColumns: '455px 1fr', gap: 16, alignItems: 'start' }}>

          {/* Graph */}
          <Frag at={1} frag={frag}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 5, padding: '8px 4px 4px 4px' }}>
              <WCProbChart frag={frag} />
            </div>
          </Frag>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
            <Frag at={4} frag={frag}>
              <div className="thm red">
                <div className="thm-lbl red">Proposition 4.2: Maximum Sensitivity</div>
                <div className="thm-body" style={{ fontWeight: 700, color: 'var(--red)', fontSize: '0.92em' }}>
                  Among all stopping policies, the 1/e rule has the highest worst-case sensitivity.
                </div>
              </div>
            </Frag>
          </div>
        </div>

      </div>
    </ContentSlide>
  )
}
S20.frags = 4  // frag1=dot, frag2=examples, frag3=1/e curve, frag4=proposition

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 21 — The Performance-Sensitivity Frontier
// ─────────────────────────────────────────────────────────────────────────────
function FrontierChart({ frag }) {
  const p0 = 1 / Math.E          // 1/e ≈ 0.368
  const S0 = p0 * (1 - p0)       // ≈ 0.233

  // Square chart: same range on both axes → each 0.05 step is physically identical
  const left = 55, right = 435, top = 16, bottom = 396
  const W = right - left   // 380
  const H = bottom - top   // 380 — equal to W
  const Smax = 0.40, Emax = 0.40  // same range → same pixel-per-unit

  const toX = (S) => left + (S / Smax) * W
  const toY = (E) => bottom - (E / Emax) * H

  // Frontier: parametrize by p ∈ [0, p0]
  const N = 150
  const fPts = Array.from({ length: N + 1 }, (_, i) => {
    const p = (i / N) * p0
    return [p * (1 - p), p]
  })
  const frontierPath = 'M ' + fPts.map(([S, E]) => `${toX(S).toFixed(1)},${toY(E).toFixed(1)}`).join(' L ')

  // Unattainable shading: above the frontier, up to chart bounds
  const shadePath = 'M ' + [
    ...fPts.map(([S, E]) => `${toX(S).toFixed(1)},${toY(E).toFixed(1)}`),
    `${toX(S0).toFixed(1)},${toY(Emax).toFixed(1)}`,
    `${toX(0).toFixed(1)},${toY(Emax).toFixed(1)}`,
  ].join(' L ') + ' Z'

  // Shared ticks: 0.05 step on both axes (0.00 → 0.40)
  const ticks = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]

  const showDot  = frag >= 1
  const showFull = frag >= 2

  return (
    <svg width="490" height="438" viewBox="0 0 490 438" style={{ fontFamily: 'Inter,sans-serif', overflow: 'visible' }}>
      {showFull && <path d={shadePath} fill="rgba(100,116,139,0.07)" />}

      {/* Grid — square cells */}
      {ticks.slice(1).map(v => (
        <g key={v}>
          <line x1={left} y1={toY(v)} x2={right} y2={toY(v)} stroke="#e2e8f0" strokeWidth="1" />
          <line x1={toX(v)} y1={top} x2={toX(v)} y2={bottom} stroke="#e2e8f0" strokeWidth="1" />
        </g>
      ))}

      {/* Axes */}
      <line x1={left} y1={bottom} x2={right + 6} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
      <line x1={left} y1={bottom + 6} x2={left} y2={top - 6} stroke="#64748b" strokeWidth="1.5" />

      {/* Ticks + labels */}
      {ticks.map(v => (
        <g key={v}>
          <line x1={toX(v)} y1={bottom} x2={toX(v)} y2={bottom + 4} stroke="#64748b" strokeWidth="1" />
          <text x={toX(v)} y={bottom + 15} textAnchor="middle" fontSize="10" fill="#64748b">{v.toFixed(2)}</text>
          <line x1={left - 4} y1={toY(v)} x2={left} y2={toY(v)} stroke="#64748b" strokeWidth="1" />
          <text x={left - 7} y={toY(v) + 3.5} textAnchor="end" fontSize="10" fill="#64748b">{v.toFixed(2)}</text>
        </g>
      ))}

      {/* Axis labels */}
      <text x={(left + right) / 2} y={bottom + 30} textAnchor="middle" fontSize="11.5" fill="#dc2626" fontWeight="700">
        𝒮  (worst-case sensitivity)
      </text>
      <text x={14} y={(top + bottom) / 2} textAnchor="middle" fontSize="11.5" fill="#2463EB" fontWeight="700"
        transform={`rotate(-90,14,${(top + bottom) / 2})`}>p  (performance)</text>

      {/* Frontier */}
      {showFull && (
        <>
          <path d={frontierPath} fill="none" stroke="#dc2626" strokeWidth="2.5" />
          <text x={toX(0.06)} y={toY(0.36)} fontSize="10" fill="#94a3b8" fontStyle="italic" textAnchor="middle">unattainable</text>
          <text x={toX(0.14)} y={toY(0.06)} fontSize="10" fill="#dc2626" fontStyle="italic" textAnchor="middle">convex frontier</text>
        </>
      )}

      {/* 1/e dot */}
      {showDot && (
        <>
          <circle cx={toX(S0)} cy={toY(p0)} r="6" fill="#1B2F5E" />
          <text x={toX(S0) - 11} y={toY(p0) - 11} fontSize="10.5" fontWeight="700" fill="#1B2F5E" textAnchor="end">1/e rule</text>
          <text x={toX(S0) - 11} y={toY(p0) + 2} fontSize="10" textAnchor="end">
            <tspan fill="#2463EB" fontWeight="600">p ≈ 0.37</tspan>
            <tspan fill="#94a3b8">,  </tspan>
            <tspan fill="#dc2626" fontWeight="600">𝒮 ≈ 0.23</tspan>
          </text>
        </>
      )}
    </svg>
  )
}

function S21({ frag }) {
  return (
    <ContentSlide title="The Performance-Sensitivity Frontier" stripe="var(--red)">
      <div style={{ display: 'flex', gap: 20, height: '100%' }}>

        {/* ── Left: intro + chart (vertically centred) ── */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          <div style={{ fontSize: '0.92em', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.45 }}>
            Define each policy by its{' '}
            <span style={{ color: 'var(--blue)' }}>performance</span>
            {' '}and its{' '}
            <span style={{ color: 'var(--red)' }}>worst-case sensitivity</span>.
          </div>
          <FrontierChart frag={frag} />
        </div>

        {/* ── Right: commentary ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>

          <div className="thm navy">
            <div className="thm-lbl navy">DRO Expansion  (<span style={{ textTransform: 'none' }}>η → 0</span>)</div>
            <div className="thm-body">
              <D m="\mathrm{DRO}(\eta) \;=_{\eta\to 0}\; \sup_\tau\, \mathbb{P}[\text{success}] \;-\; \tfrac{\eta}{2}\,\mathcal{S}^\mathbb{P}_\tau \;+\; o(\eta)" />
            </div>
          </div>

          <Frag at={3} frag={frag}>
            <div className="thm gold">
              <div className="thm-lbl gold">The Tradeoff is Very Expensive</div>
              <div className="thm-body">
                On a <strong>convex</strong> frontier, every unit of misspecification
                costs more in <strong>performance</strong> than it saves in robustness.
              </div>
            </div>
          </Frag>

          <Frag at={4} frag={frag}>
            <div className="insight">
              DRO gets stuck at the 1/e rule, which has both the{' '}
              <span style={{ color: 'var(--blue)' }}>highest p</span>
              {' '}and the{' '}
              <span style={{ color: 'var(--red)' }}>highest 𝒮</span>
            </div>
          </Frag>

        </div>
      </div>
    </ContentSlide>
  )
}
S21.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 22 — Root Cause: Exploration Shocks
// ─────────────────────────────────────────────────────────────────────────────
function S22({ frag }) {
  return (
    <ContentSlide title="Root Cause: Exploration Shocks" stripe="var(--red)">
      <Intuition>
        Why is the frontier convex for secretary problems but concave for prophet/inventory? The answer lies in the structure of <strong>irreversible exploration</strong>.
      </Intuition>
      <div className="col-5545" style={{ marginTop: 8 }}>
        <div>
          <Frag at={1} frag={frag}>
            <div className="thm" style={{ marginBottom: 8 }}>
              <div className="thm-lbl">Exploration Shocks: Definition</div>
              <div className="thm-body">
                Define the <strong>exploration shock</strong> at stage <M m="n" />:
                <D m="\Xi_{n,\kappa} = \sum_{n'=n}^{N}\bigl(p_{n'+1,\kappa} - p_{n',\kappa}\bigr)^2" />
                This is the <em>quadratic variation</em> of the success-probability process along the optimal path: how much the best-pick probability fluctuates during exploration.
              </div>
            </div>
          </Frag>
          <Frag at={2} frag={frag}>
            <div className="thm red" style={{ marginBottom: 8 }}>
              <div className="thm-lbl red">Theorem D: Frontier Curvature</div>
              <div className="thm-body">
                The frontier is convex if and only if:
                <D m="\mathbb{E}[\Xi_{n,\kappa}] \geq \mathbb{E}\!\left[\bigl(p_N - p_n\bigr)^2\right]" />
                Secretary problems satisfy this condition; exploration shocks <em>dominate</em> terminal uncertainty.
              </div>
            </div>
          </Frag>
        </div>
        <div>
          <Frag at={3} frag={frag}>
            <div className="thm navy" style={{ marginBottom: 8 }}>
              <div className="thm-lbl">Economic Intuition</div>
              <div className="thm-body">
                In secretary problems, you <em>must</em> explore without recall. Every stage introduces uncertainty: "Is this the best I'll see?"
                <br /><br />
                This exploration uncertainty is <strong>irreducible at the policy level</strong>. The harder you try to be robust (more conservative threshold), the more performance you sacrifice. The tradeoff is structural.
              </div>
            </div>
          </Frag>
          <Frag at={4} frag={frag}>
            <Insight>
              Secretary problems are fragile not despite optimal stopping, but <em>because</em> of it. Exploration is the source of fragility.
            </Insight>
          </Frag>
        </div>
      </div>
    </ContentSlide>
  )
}
S22.frags = 4

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 23 — When Worst-Case Isn't Robust
// ─────────────────────────────────────────────────────────────────────────────

// All K-stopping frontiers share the SAME curve S = p(1-p).
// Square grid: 5 equal intervals on each axis (0.05 on S, 0.20 on p) → equal pixel spacing.
// visibleK: how many segments to render (1=K1 only, 2=K1+K2, 5=all)
function MultiKFrontier({ visibleK = 5 }) {
  const step = 48
  const nS = 5, nP = 5
  const left = 52, top = 8
  const W = nS * step, H = nP * step
  const right = left + W, bottom = top + H
  const Smax = 0.25, Emax = 1.00

  const toX = (S) => left + (S / Smax) * W
  const toY = (p) => bottom - (p / Emax) * H

  const kSegs = [
    { k: '1', p0: 0,          p1: 1 / Math.E, color: '#ea580c' },
    { k: '2', p0: 1 / Math.E, p1: 0.56,        color: '#2563eb' },
    { k: '3', p0: 0.56,       p1: 0.67,         color: '#16a34a' },
    { k: '4', p0: 0.67,       p1: 0.75,         color: '#7c3aed' },
    { k: 'N', p0: 0.75,       p1: 1.00,         color: '#374151', dash: '5,3' },
  ]

  const visibleSegs = kSegs.slice(0, visibleK)

  const makeSeg = (p0, p1, n = 60) =>
    Array.from({ length: n + 1 }, (_, i) => {
      const p = p0 + (i / n) * (p1 - p0)
      return [p * (1 - p), p]
    })

  const segPaths = visibleSegs.map(({ p0, p1 }) => {
    const pts = makeSeg(p0, p1)
    return 'M ' + pts.map(([S, p]) => `${toX(S).toFixed(1)},${toY(p).toFixed(1)}`).join(' L ')
  })

  const sTicks = [0, 0.05, 0.10, 0.15, 0.20, 0.25]
  const pTicks = [0, 0.20, 0.40, 0.60, 0.80, 1.00]
  const svgW = right + 12
  const svgH = bottom + 30

  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ fontFamily: 'Inter,sans-serif', overflow: 'visible' }}>
      {/* square grid */}
      {sTicks.slice(1).map(v => (
        <line key={`sg${v}`} x1={toX(v)} y1={top} x2={toX(v)} y2={bottom} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {pTicks.slice(1).map(v => (
        <line key={`pg${v}`} x1={left} y1={toY(v)} x2={right} y2={toY(v)} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {/* axes */}
      <line x1={left} y1={bottom} x2={right + 5} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
      <line x1={left} y1={bottom + 4} x2={left} y2={top - 4} stroke="#64748b" strokeWidth="1.5" />
      {/* S ticks + labels */}
      {sTicks.map(v => (
        <g key={`xt${v}`}>
          <line x1={toX(v)} y1={bottom} x2={toX(v)} y2={bottom + 4} stroke="#64748b" strokeWidth="1" />
          <text x={toX(v)} y={bottom + 14} textAnchor="middle" fontSize="9" fill="#64748b">{v.toFixed(2)}</text>
        </g>
      ))}
      {/* p ticks + labels */}
      {pTicks.map(v => (
        <g key={`yt${v}`}>
          <line x1={left - 4} y1={toY(v)} x2={left} y2={toY(v)} stroke="#64748b" strokeWidth="1" />
          <text x={left - 6} y={toY(v) + 3.5} textAnchor="end" fontSize="9" fill="#64748b">{v.toFixed(2)}</text>
        </g>
      ))}
      {/* axis labels */}
      <text x={(left + right) / 2} y={bottom + 28} textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="600">
        𝒮 (sensitivity)
      </text>
      <text x={12} y={(top + bottom) / 2} textAnchor="middle" fontSize="10" fill="#2463EB" fontWeight="600"
        transform={`rotate(-90,12,${(top + bottom) / 2})`}>p (performance)</text>
      {/* Colored arch segments */}
      {visibleSegs.map(({ k, color, dash }, i) => (
        <path key={k} d={segPaths[i]} fill="none" stroke={color} strokeWidth="2.8"
          strokeDasharray={dash || undefined} strokeLinecap="round" />
      ))}
      {/* Endpoint dots + K labels */}
      {visibleSegs.map(({ k, p1, color }) => {
        const S1 = p1 * (1 - p1)
        return (
          <g key={k}>
            <circle cx={toX(S1)} cy={toY(p1)} r="4" fill={color} />
            <text x={toX(S1) + 6} y={toY(p1) + (k === 'N' ? 14 : 4)} fontSize="9.5" fontWeight="700" fill={color}>
              K={k}
            </text>
          </g>
        )
      })}
      {/* "unattainable" label inside arch */}
      <text x={toX(0.12)} y={toY(0.78)} fontSize="9" fill="#94a3b8" fontStyle="italic" textAnchor="middle">
        unattainable
      </text>
    </svg>
  )
}

function S23({ frag }) {
  // frag 0: Why DRO Fails (always visible)
  // frag 1: Root Cause appears
  // frag 2: Fix 1 appears
  // frag 3: Graph appears (K=1 only)
  // frag 4: K=2 added
  // frag 5: K=3, K=4, K=N added
  // frag 6: Fix 2 appears
  const visibleK = frag <= 3 ? 1 : frag === 4 ? 2 : 5

  return (
    <ContentSlide title="When Worst-Case Isn't Robust: Robustness via Process Design" stripe="var(--red)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>

        {/* ── TOP ROW: Why DRO Fails + Root Cause — equal height ── */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch' }}>

          {/* Why DRO Fails — always visible, text vertically centered */}
          <div style={{
            flex: '0 0 360px',
            background: '#FEF2F2',
            border: '2px solid var(--red)',
            borderRadius: 6,
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{ fontWeight: 700, color: 'var(--red)', fontSize: '0.82em', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
              Why DRO Fails
            </div>
            <div style={{ fontSize: '0.88em', lineHeight: 1.5 }}>
              The performance–sensitivity frontier is <strong>convex</strong>: a structural
              feature of the <strong>problem itself</strong> (binary reward), not of any particular policy.
            </div>
          </div>

          {/* Root Cause — frag 1 */}
          <div style={{ flex: 1 }}>
            <Frag at={1} frag={frag}>
              <div className="thm" style={{ marginBottom: 0 }}>
                <div className="thm-lbl">Root Cause: Exploration Shocks</div>
                <div className="thm-body" style={{ fontSize: '0.85em' }}>
                  Let <M m="p_n = \mathbb{P}[\text{success}\mid\mathcal{F}_n]" />. Sensitivity to
                  misspecification arises because <strong>exploration alters the reward
                  function</strong>; each new observation reshapes future payoffs.
                  The cumulative exploration shock:
                  <D m="\Xi_{n,\kappa}=\sum_{n'=n}^{N}\!\bigl(p_{n'+1,\kappa}-p_{n',\kappa}\bigr)^{2}" />
                </div>
              </div>
            </Frag>
          </div>

        </div>

        {/* ── BOTTOM ROW: Fixes (left) | Chart (right) ── */}
        <div style={{ display: 'flex', gap: 20, flex: 1, alignItems: 'flex-start' }}>

          {/* Fixes */}
          <div style={{ flex: '0 0 360px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Frag at={2} frag={frag}>
              <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: 12 }}>
                <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '0.78em', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                  Fix 1: Give the DM More Stopping Freedom
                </div>
                <div style={{ fontSize: '0.88em', lineHeight: 1.45 }}>
                  Allow <M m="K" /> stopping opportunities; get the reward if <em>any</em> of
                  them is the best. When <M m="K = N" />, the DM is guaranteed to select
                  the best candidate.
                </div>
              </div>
            </Frag>

            <Frag at={6} frag={frag}>
              <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 12 }}>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.78em', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>
                  Fix 2: Change the Payoff Structure
                </div>
                <div style={{ fontSize: '0.88em', lineHeight: 1.45 }}>
                  Replace "pick the best" with a <strong>competitive ratio</strong> against a
                  prophet. Prophet inequalities yield <em>concave</em> frontiers.
                </div>
              </div>
            </Frag>
          </div>

          {/* K-frontier chart — appears at frag 3, segments added progressively */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Frag at={3} frag={frag}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: '0.78em', fontWeight: 600, color: 'var(--navy)', textAlign: 'center' }}>
                  K-Stopping Frontiers
                </div>
                <MultiKFrontier visibleK={visibleK} />
              </div>
            </Frag>
          </div>

        </div>

      </div>
    </ContentSlide>
  )
}
S23.frags = 6

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 25 — Industry Collab (brief)
// ─────────────────────────────────────────────────────────────────────────────
// ─── Dark chapter header ───────────────────────────────────────────────────
function S25() {
  return (
    <DarkSlide
      accent="var(--green)"
      eyebrow="Part IV"
      title="Data-Driven Sequential Decision-Making in Practice"
      sub="Applying the thesis framework to real-world settings; industry collaborations with SIA and NUS Executive Education Office."
      footer="Abdelhakmi · Keppo · Tan (2021–2026)"
    />
  )
}
S25.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 25b — Both industry projects on one slide
// ─────────────────────────────────────────────────────────────────────────────
function S25b() {
  return (
    <ContentSlide title="Learning for Decision-Making in Partially Observed, Shifting Environments" stripe="var(--green)">
      <div className="two-col" style={{ gap: 20, height: '100%' }}>

        {/* ── PROJECT 1: SIA Pilot Training ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderRight: '1px solid var(--border)', paddingRight: 20 }}>
          <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '0.78em', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 4, borderBottom: '2px solid var(--green)' }}>
            SIA: Personalized Pilot Training
          </div>
          <Intuition>
            Pilot competency is <em>latent and evolving</em>, yet training follows <strong>standardized programs</strong> that cannot adapt in real time to individual skill trajectories. Observed only through noisy simulator grades and instructor assessments.
          </Intuition>
          <div className="thm navy" style={{ flex: 1 }}>
            <div className="thm-lbl">Approach</div>
            <div className="thm-body" style={{ fontSize: '0.86em' }}>
              <strong>Observable Behaviors (OBs):</strong> exploit the causal structure of grading; instructors assess OBs, so we extract OBs from grades to recover true latent skills. Kalman filtering with OBs sharply reduces estimation uncertainty.
              <br /><br />
              <strong>Common context across pilots</strong> (→ Part II: common shocks) enables cross-pilot data pooling; the system learns from all pilots simultaneously.
              <br /><br />
              <strong>Constrained RL policy</strong> selects the next simulator scenario from the estimated skill state (→ Part I: dynamic control under partial information).
            </div>
          </div>
          <div style={{ borderLeft: '3px solid var(--green)', paddingLeft: 10, fontSize: '0.82em', color: '#445', lineHeight: 1.45 }}>
            Tractable POMDP; real-time personalisation in a safety-critical environment.
          </div>
        </div>

        {/* ── PROJECT 2: NUS Exec Ed ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
          <div style={{ fontWeight: 700, color: 'var(--blue)', fontSize: '0.78em', textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: 4, borderBottom: '2px solid var(--blue)' }}>
            NUS Exec Ed: Marketing Budget Allocation
          </div>
          <Intuition>
            Allocate a fixed budget across programs and global markets. Attractiveness evolves with <strong>unknown drift</strong>, observed only through noisy Google Analytics traffic data.
          </Intuition>
          <div className="thm navy" style={{ flex: 1 }}>
            <div className="thm-lbl">Approach</div>
            <div className="thm-body" style={{ fontSize: '0.86em' }}>
              <strong>VAR(1) state-space model:</strong> program attractiveness follows a Vector Autoregression of order 1; unknown parameters filtered sequentially from web analytics via Kalman filter.
              <br /><br />
              <strong>Estimate-then-optimise:</strong> mean-variance allocation with binary campaign activation and operational budget constraints; resource allocation under <em>persistent</em> uncertainty.
            </div>
          </div>
          <div style={{ borderLeft: '3px solid var(--blue)', paddingLeft: 10, fontSize: '0.82em', color: '#445', lineHeight: 1.45 }}>
            Currently implementing and testing with real office data; first adaptive quantitative tool replacing static heuristic spend.
          </div>
        </div>

      </div>
    </ContentSlide>
  )
}
S25b.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 26 — Contributions Divider
// ─────────────────────────────────────────────────────────────────────────────
function S26() {
  return (
    <DarkSlide
      accent="var(--gold)"
      eyebrow="Synthesis"
      title="Thesis Contributions at a Glance"
      sub="Three papers. One theme. Sequential decisions under uncertainty, with partial information, distributional ambiguity, and adaptive learning."
      footer="Abdelhakmi (2026) · Ph.D. Thesis"
    />
  )
}
S26.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 27 — Contributions
// ─────────────────────────────────────────────────────────────────────────────
function S27({ frag }) {
  const li = { marginBottom: 10, paddingLeft: 4 }
  return (
    <ContentSlide title="Contributions at a Glance" stripe="var(--gold)">
      <div className="three-col" style={{ gap: 14, flex: 1 }}>
        <Frag at={0} frag={frag}>
          <Card color="blue" title="Part I: Dynamic Black–Litterman" style={{ height: '100%', padding: '16px 18px' }}>
            <strong>First framework to embed forward-looking views into a continuous-time dynamic model.</strong>
            <ul style={{ marginTop: 16, paddingLeft: 16, fontSize: '0.88em', lineHeight: 1.65 }}>
              <li style={li}>Mismatched horizons: no horizon-matching constraint</li>
              <li style={li}>A view transforms the return process into a Brownian bridge</li>
              <li style={li}>New hedging demand: hedge the predictor, not just the asset</li>
            </ul>
          </Card>
        </Frag>
        <Frag at={1} frag={frag}>
          <Card color="gold" title="Part II: Dynamic Factor Models" style={{ height: '100%', padding: '16px 18px' }}>
            <strong>Views on the drivers reshape how contextual information is used.</strong>
            <ul style={{ marginTop: 16, paddingLeft: 16, fontSize: '0.88em', lineHeight: 1.65 }}>
              <li style={li}>Forecasts target future factor states, not outcomes directly</li>
              <li style={li}>Dual transformation: factor dynamics <em>and</em> loadings become time-varying</li>
              <li style={li}>Changes what you hold <em>and</em> how you read the current state</li>
            </ul>
          </Card>
        </Frag>
        <Frag at={2} frag={frag}>
          <Card color="red" title="Part III: Rethinking Robustness" style={{ height: '100%', padding: '16px 18px' }}>
            <strong>When does worst-case optimization actually make you robust?</strong>
            <ul style={{ marginTop: 16, paddingLeft: 16, fontSize: '0.88em', lineHeight: 1.65 }}>
              <li style={li}>DRO leaves the nominal policy unchanged, across all variants and uncertainty sets</li>
              <li style={li}>The Robustness Paradox: DRO-optimal yet maximally sensitive</li>
              <li style={li}>True robustness requires process redesign, not a better objective</li>
            </ul>
          </Card>
        </Frag>
      </div>
      <Frag at={3} frag={frag}>
        <Key style={{ marginTop: 10 }}>
          How to optimally <strong>incorporate forward-looking information</strong> into sequential decisions, and when <strong>worst-case optimization fails</strong> to deliver robustness.
        </Key>
      </Frag>
    </ContentSlide>
  )
}
S27.frags = 3

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 28 — Future Research
// ─────────────────────────────────────────────────────────────────────────────
function S28({ frag }) {
  const li = { marginBottom: 5, paddingLeft: 4 }
  return (
    <ContentSlide title="Future Research Directions" stripe="var(--navy)">
      <div className="three-col" style={{ gap: 12, marginTop: 20 }}>
        <Frag at={0} frag={frag}>
          <Card color="blue" title="Forward-Looking Views Beyond Finance" style={{}}>
            <strong>Extend to operational settings; rethink what a "view" can be.</strong>
            <ul style={{ marginTop: 10, paddingLeft: 16, fontSize: '0.88em', lineHeight: 1.6 }}>
              <li style={li}>Inventory management and revenue management with expert forecasts</li>
              <li style={li}>AI and LLM outputs as structured forward-looking signals</li>
              <li style={li}>How to embed model-generated reasoning into dynamic decision models</li>
            </ul>
          </Card>
        </Frag>
        <Frag at={1} frag={frag}>
          <Card color="red" title="Robustness and Exploration–Exploitation" style={{}}>
            <strong>How does ambiguity aversion reshape exploration vs. exploitation?</strong>
            <ul style={{ marginTop: 10, paddingLeft: 16, fontSize: '0.88em', lineHeight: 1.6 }}>
              <li style={li}>Extends to Prophet Inequalities, Pandora's Box, newsvendor</li>
              <li style={li}>Effect is nuanced; can increase <em>or</em> decrease exploration</li>
              <li style={li}>General theory of ambiguity aversion in dynamic sequential problems</li>
            </ul>
          </Card>
        </Frag>
        <Frag at={2} frag={frag}>
          <Card color="green" title="Robustness via Process Design" style={{}}>
            <strong>Achieve robustness through operational levers, not objective reformulation.</strong>
            <ul style={{ marginTop: 10, paddingLeft: 16, fontSize: '0.88em', lineHeight: 1.6 }}>
              <li style={li}>Hedge exploration shocks through mechanism design</li>
              <li style={li}>Newsvendor: supply options, secondary markets, batching</li>
              <li style={li}>Not all hedges work; identify which levers create genuine robustness</li>
            </ul>
          </Card>
        </Frag>
      </div>
      <Frag at={3} frag={frag}>
        <Key style={{ marginTop: 14 }}>
          A unified understanding of how <strong>information incorporation</strong> and <strong>robustness</strong> interact in sequential decision-making, across finance, operations, and beyond.
        </Key>
      </Frag>
    </ContentSlide>
  )
}
S28.frags = 3

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 29 — Thank You
// ─────────────────────────────────────────────────────────────────────────────
function S29() {
  return (
    <div className="slide dark-slide" style={{ position: 'relative' }}>
      <div className="dark-accent" style={{ background: 'var(--blue)' }} />
      <div className="dark-footer"><span>Abdelhakmi · Ph.D. Defense · NUS · May 2026</span></div>
      <div className="dark-body" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '.7em', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(100,170,255,.9)', marginBottom: 18 }}>Thank You</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7em', fontWeight: 700, color: 'white', lineHeight: 1.25, marginBottom: 20 }}>
          Data-Driven Sequential Decision-Making:<br/>Forward-Looking Information and Robustness<br/>in Dynamic Uncertain Environments
        </div>
        <div style={{ width: 320, height: 2, background: 'var(--blue)', margin: '0 auto 20px' }} />
        <div style={{ color: 'rgba(180,210,255,.85)', fontSize: '.75em', lineHeight: 1.9 }}>
          <div>Anas Abdelhakmi · National University of Singapore</div>
          <div style={{ marginTop: 8 }}>
            <span style={{ color: 'rgba(100,170,255,.8)' }}>Part I:</span> Dynamic Black–Litterman &nbsp;·&nbsp;
            <span style={{ color: 'rgba(100,170,255,.8)' }}>Part II:</span> Dynamic Factor Models with Forward-Looking Views
          </div>
          <div>
            <span style={{ color: 'rgba(100,170,255,.8)' }}>Part III:</span> Robust Secretary Problems
          </div>
          <div style={{ marginTop: 14, fontSize: '.88em', color: 'rgba(150,180,220,.7)' }}>
            Supervised by Prof. Andrew E.B. Lim &amp; Prof. Jussi Keppo
          </div>
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Questions?', 'Comments?', 'Discussion?'].map(t => (
            <span key={t} style={{
              fontSize: '.62em', padding: '5px 16px', borderRadius: 20,
              border: '1px solid rgba(36,99,235,.5)', color: 'rgba(150,200,255,.8)',
              fontWeight: 500
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
S29.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE S_Office — IORA & Advisors
// ─────────────────────────────────────────────────────────────────────────────
function SOffice() {
  return (
    <div className="slide dark-slide" style={{ position: 'relative' }}>
      <div className="dark-accent" style={{ background: 'var(--blue)' }} />
      <div className="dark-footer"><span>Abdelhakmi · Ph.D. Defense · NUS · May 2026</span></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 40px 50px' }}>
        <div style={{ fontSize: '.68em', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(100,170,255,.9)', marginBottom: 16 }}>With Gratitude</div>
        <img src="figures/iora_office.png" alt="IORA group" style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,.5)' }} />
        <div style={{ marginTop: 18, color: 'rgba(180,210,255,.9)', fontSize: '.80em', textAlign: 'center', lineHeight: 1.6 }}>
          My advisors <strong style={{ color: 'white' }}>Prof. Andrew Lim</strong> and <strong style={{ color: 'white' }}>Prof. Jussi Keppo</strong>,<br/>
          and the incredible <strong style={{ color: 'white' }}>IORA community</strong> at NUS.
        </div>
      </div>
    </div>
  )
}
SOffice.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE S_Friends — Singapore friends
// ─────────────────────────────────────────────────────────────────────────────
function SFriends() {
  return (
    <div className="slide dark-slide" style={{ position: 'relative' }}>
      <div className="dark-accent" style={{ background: 'var(--blue)' }} />
      <div className="dark-footer"><span>Abdelhakmi · Ph.D. Defense · NUS · May 2026</span></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 40px 50px' }}>
        <div style={{ fontSize: '.68em', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(100,170,255,.9)', marginBottom: 16 }}>Friends</div>
        <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
          <img src="figures/friends_beach.jpg" alt="Beach volleyball" style={{ width: '62%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,.5)' }} />
          <img src="figures/friends_dinner.jpg" alt="Dinner" style={{ width: '35%', maxHeight: 400, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,.5)' }} />
        </div>
        <div style={{ marginTop: 18, color: 'rgba(180,210,255,.9)', fontSize: '.80em', textAlign: 'center', lineHeight: 1.6 }}>
          To my friends in Singapore. Saturday beach volleyball, great food, and somehow great ideas.<br/>
          <strong style={{ color: 'white' }}>You made this journey unforgettable.</strong>
        </div>
      </div>
    </div>
  )
}
SFriends.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE S_Family — Family
// ─────────────────────────────────────────────────────────────────────────────
function SFamily() {
  return (
    <div className="slide dark-slide" style={{ position: 'relative' }}>
      <div className="dark-accent" style={{ background: 'var(--blue)' }} />
      <div className="dark-footer"><span>Abdelhakmi · Ph.D. Defense · NUS · May 2026</span></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 40px 50px' }}>
        <div style={{ fontSize: '.68em', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(100,170,255,.9)', marginBottom: 16 }}>Family</div>
        <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
          <img src="figures/family_nus.jpg" alt="Family at NUS" style={{ width: '55%', maxHeight: 420, objectFit: 'cover', objectPosition: 'top', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,.5)' }} />
          <img src="figures/family_cooking.jpg" alt="Family cooking" style={{ width: '42%', maxHeight: 420, objectFit: 'cover', borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,.5)' }} />
        </div>
        <div style={{ marginTop: 18, color: 'rgba(180,210,255,.9)', fontSize: '.80em', textAlign: 'center', lineHeight: 1.6 }}>
          <strong style={{ color: 'white', fontSize: '1.1em' }}>To my family.</strong>
        </div>
      </div>
    </div>
  )
}
SFamily.frags = 0

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
// Short sidebar labels for each slide (same order as SLIDES array)
S01.label  = 'Title'
S02.label  = 'Thesis at a Glance'
S03.label  = '◆ Part I: Dynamic BL'
S04.label  = 'Forward-Looking Views'
S05.label  = 'Model Setup'
S06.label  = 'Proposition 1'
S07.label  = 'Theorem 1 — Bridge'
S08.label  = 'Theorem 1 (cont.)'
S08b.label = 'Control Problem'
S09.label  = 'Theorem 2 — Hedging'
S10.label  = 'DBL Dominates'
S11.label  = 'Other Results & Summary'
S12.label  = '◆ Part II: MrB'
S13.label  = 'Contextual Decisions'
S14b.label = 'MrB Factor Dynamics'
S14c.label = 'Optimal Portfolio'
S15.label  = 'Two Channels'
S16.label  = 'Robustness & Summary'
S17.label  = '◆ Part III: Secretary'
S18.label  = 'DRO Formulation'
S19.label  = 'Nominal = DRO Optimal'
S20.label  = 'Main Theorem'
S21.label  = 'The Paradox'
S23.label  = "When Worst-Case Isn't Robust"
S25.label  = '◆ Industry Collab'
S25b.label = 'Projects'
S26.label  = '◆ Contributions'
S27.label  = 'Contributions'
S28.label  = 'Future Research'
S29.label     = 'Thank You'
SOffice.label = 'IORA & Advisors'
SFriends.label = 'Friends'
SFamily.label  = 'Family'

export const SLIDES = [
  S01, S02, S03, S04, S05, S06, S07, S08, S08b, S09, S10,
  S11, S12, S13, S14b, S14c, S15, S16, S17, S18, S19, S20,
  S21, S23, S25, S25b, S26, S27, S28, S29, SOffice, SFriends, SFamily
]
