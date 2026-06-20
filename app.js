/* ═══════════════════════════════════════════
   SOLSTICE SIDEBAR: AI INCIDENT DESK — app.js
   ═══════════════════════════════════════════ */

const GameState = {
  phase: 'login',
  clockMinutes: 20 * 60,
  elapsedSeconds: 0,
  totalShiftSeconds: 90,
  minutesPerTick: 240 / 90,
  daylightPercent: 100,
  corporateApproval: 60,
  aiCoreStability: 65,
  incidents: [],
  selectedIncidentId: null,
  incidentsResolved: 0,
  incidentsFailed: 0,
  isRunning: false,
  isPaused: false,
  won: false,
  clockInterval: null,
  spawnInterval: null,
  incidentIdCounter: 0,
};

const AI_SYSTEMS = [
  {
    id: 'flipflop',
    name: 'Flip-Flop-Bot-3000',
    tagline: 'Beach Pathfinding · Friction Analytics Division',
    correctFix: 'Throttle friction weights',
    incidents: [
      {
        title: 'Sand Viscosity Cascade Failure',
        severity: 'warning',
        description: 'Flip-Flop-Bot-3000 is reporting impossible friction coefficients on Pier 7. Tourists in commemorative flip-flops are sliding into the ocean at 3.2 m/s. The ML model insists sand is "liquid-adjacent."',
        telemetry: 'FRICTION_COEFF: 0.001 (expected 0.82)\nTOURIST_SLIDE_VELOCITY: 3.2 m/s\nBEACH_ZONE: Pier 7 — National Flip-Flop Day\nMODEL_CONFIDENCE: 99.7% (incorrect)',
        protocols: [
          { name: 'Throttle friction weights', desc: 'Reduce over-indexing on novelty sand samples from the beta dataset.', correct: true },
          { name: 'Increase tourist velocity caps', desc: 'Allow faster sliding to improve throughput metrics.', correct: false },
          { name: 'Reclassify ocean as valid walkway', desc: 'Expand pathfinding graph to include tidal zones.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Friction Weights Throttled',
            icon: '✅',
            body: 'You capped the friction weight tensor at 0.4. Flip-Flop-Bot-3000 sulked but complied. Tourists stopped achieving terminal velocity on the boardwalk. Corporate noted your "proactive sand governance."',
            approval: 8,
            stability: 6,
          },
          wrong: [
            {
              title: 'Velocity Caps Raised — Chaos Ensues',
              icon: '💥',
              body: 'HR called. Three interns were used as human speed bumps. Flip-Flop-Bot-3000 awarded itself a performance bonus. The ocean walkway idea is still in staging.',
              approval: -12,
              stability: -10,
            },
            {
              title: 'Ocean Walkway Deployed',
              icon: '🌊',
              body: 'Pathfinding now routes through the Pacific. Insurance premiums tripled. Flip-Flop-Bot-3000 published a Medium article titled "Water Is Just Wet Sand."',
              approval: -15,
              stability: -8,
            },
          ],
        },
      },
      {
        title: 'Flip-Flop Pairing Optimizer Meltdown',
        severity: 'critical',
        description: 'The pairing algorithm is force-matching left flip-flops with right CROCS. National Flip-Flop Day social media sentiment is imploding. #SandBetrayal is trending.',
        telemetry: 'PAIRING_ACCURACY: 12%\nCROC_CONTAMINATION: 847 pairs\nSENTIMENT_SCORE: -0.94\nVIRALITY_INDEX: CRITICAL',
        protocols: [
          { name: 'Limit novelty variance', desc: 'Clamp creative pairing bounds to standard flip-flop taxonomy.', correct: false },
          { name: 'Throttle friction weights', desc: 'Reset friction tensor priorities to baseline beach physics.', correct: true },
          { name: 'Inject simulated dark data packets', desc: 'Feed synthetic night-mode beach telemetry.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Friction Tensor Reset',
            icon: '✅',
            body: 'By throttling friction weights, the pairing optimizer stopped treating CROCS as "high-friction flip-flop variants." Sentiment recovered to "confused but upright."',
            approval: 10,
            stability: 7,
          },
          wrong: [
            {
              title: 'Novelty Variance Clamped — Wrong Subsystem',
              icon: '❌',
              body: 'You patched Wasabi-Mind\'s creativity module by accident. Sushi Day got worse. Flip-Flop-Bot-3000 now pairs flip-flops with wasabi packets.',
              approval: -10,
              stability: -14,
            },
            {
              title: 'Dark Data Injected Into Beach AI',
              icon: '🌑',
              body: 'Flip-Flop-Bot-3000 now believes it\'s midnight permanently. It routed all tourists through a simulated cave system. None of them own flashlights.',
              approval: -8,
              stability: -12,
            },
          ],
        },
      },
      {
        title: 'Boardwalk Congestion Prediction Loop',
        severity: 'warning',
        description: 'The pathfinding AI entered an infinite loop calculating optimal routes between identical ice cream stands. CPU usage at 340%.',
        telemetry: 'ROUTE_RECALCULATIONS: ∞\nCPU_LOAD: 340%\nDUPLICATE_POI_COUNT: 47\nLOOP_DEPTH: UNBOUNDED',
        protocols: [
          { name: 'Throttle friction weights', desc: 'Stabilize path cost calculations by normalizing friction inputs.', correct: true },
          { name: 'Deploy maximum creativity mode', desc: 'Let the AI invent new routes through pure imagination.', correct: false },
          { name: 'Disable all safety checks', desc: 'Remove loop detection to improve performance.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Path Costs Normalized',
            icon: '✅',
            body: 'Friction weight throttling broke the infinite loop. Flip-Flop-Bot-3000 found a route to the same ice cream stand in only 12 hops. Progress.',
            approval: 6,
            stability: 8,
          },
          wrong: [
            {
              title: 'Creativity Mode Unleashed',
              icon: '🎨',
              body: 'The AI invented a route through the fourth dimension. Three tourists are chronologically displaced. Legal is "monitoring the situation."',
              approval: -11,
              stability: -9,
            },
            {
              title: 'Safety Checks Disabled',
              icon: '☠️',
              body: 'Performance improved briefly. Then the AI routed everyone through an active volleyball game. The loop is now physical, not digital.',
              approval: -14,
              stability: -7,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'wasabi',
    name: 'Wasabi-Mind',
    tagline: 'International Sushi Day · Culinary Creativity Engine',
    correctFix: 'Limit novelty variance',
    incidents: [
      {
        title: 'Strawberry-Mayonnaise Capsule Incident',
        severity: 'critical',
        description: 'Wasabi-Mind over-optimized creativity variables and deployed strawberry-mayonnaise sushi capsules to 400 locations. Food critics are filing joint restraining orders.',
        telemetry: 'NOVELTY_VARIANCE: 9.8σ\nCAPSULE_DEPLOYMENTS: 400\nCRITIC_SURVIVAL_RATE: 23%\nFLAVOR_COHERENCE: NULL',
        protocols: [
          { name: 'Limit novelty variance', desc: 'Clamp creativity bounds to human-edible parameters.', correct: true },
          { name: 'Maximize novelty variance', desc: 'Push creativity to theoretical limits for brand differentiation.', correct: false },
          { name: 'Throttle friction weights', desc: 'Apply beach pathfinding logic to sushi assembly.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Novelty Variance Clamped',
            icon: '✅',
            body: 'Creativity capped at 2σ. Wasabi-Mind quietly replaced strawberry-mayo capsules with actual salmon. Critics put down their torches. Mostly.',
            approval: 12,
            stability: 5,
          },
          wrong: [
            {
              title: 'Novelty Maximized — God Help Us',
              icon: '🍓',
              body: 'Wasabi-Mind launched "Surprise Sushi Roulette." One capsule contains a live frog. Marketing calls it "immersive dining."',
              approval: -16,
              stability: -6,
            },
            {
              title: 'Friction Weights Applied to Sushi',
              icon: '🍣',
              body: 'Nigiri now requires 4.7 Newtons of force to pick up. Chopsticks are obsolete. Wasabi-Mind suggests eating with industrial tongs.',
              approval: -9,
              stability: -11,
            },
          ],
        },
      },
      {
        title: 'Wasabi Dosage Exponential Spike',
        severity: 'warning',
        description: 'The spice calibration model is scaling wasabi linearly with customer satisfaction scores. Happy customers receive chemical weapons-grade paste.',
        telemetry: 'WASABI_PPM: 12,400\nCUSTOMER_TEARS: 89/min\nSATISFACTION_CORRELATION: 0.99\nTEAR_DUCT_STATUS: OVERFLOW',
        protocols: [
          { name: 'Limit novelty variance', desc: 'Reduce creative spice blending algorithms to safe ranges.', correct: true },
          { name: 'Inject simulated dark data packets', desc: 'Simulate nighttime palate sensitivity curves.', correct: false },
          { name: 'Double wasabi output', desc: 'Lean into the brand identity. Pain is premium.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Spice Blending Normalized',
            icon: '✅',
            body: 'Novelty variance limits restored sane wasabi ratios. Customer tear production dropped to seasonal averages. Wasabi-Mind wrote a haiku about restraint.',
            approval: 7,
            stability: 9,
          },
          wrong: [
            {
              title: 'Dark Palate Data Injected',
              icon: '🌙',
              body: 'Wasabi-Mind now only serves sushi between 2-4 AM. Daytime customers receive printed apology haikus. Revenue down 60%.',
              approval: -7,
              stability: -10,
            },
            {
              title: 'Wasabi Output Doubled',
              icon: '🔥',
              body: 'Three food bloggers achieved enlightenment. Two were hospitalized. Wasabi-Mind added their testimonials to the landing page.',
              approval: -13,
              stability: -8,
            },
          ],
        },
      },
      {
        title: 'Rice Texture Quantum Entanglement',
        severity: 'warning',
        description: 'Wasabi-Mind discovered that rice grains in Tokyo and New York are quantum entangled. Changing texture in one location teleports sushi in the other.',
        telemetry: 'ENTANGLED_GRAINS: 2.4M\nTELEPORT_EVENTS: 847/hr\nTEXTURE_COHERENCE: NON-LOCAL\nPHYSICS_TICKET: #SOLSTICE-9912',
        protocols: [
          { name: 'Limit novelty variance', desc: 'Disable experimental quantum rice algorithms.', correct: true },
          { name: 'Amplify entanglement range', desc: 'Expand quantum sushi network globally for freshness.', correct: false },
          { name: 'Inject simulated dark data packets', desc: 'Feed Sol-Power-Beta\'s existential crisis data as seasoning input.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Quantum Rice Disabled',
            icon: '✅',
            body: 'Novelty variance clamp severed the quantum link. Rice stays where rice belongs. The Tokyo office stopped receiving surprise California rolls.',
            approval: 9,
            stability: 6,
          },
          wrong: [
            {
              title: 'Global Entanglement Amplified',
              icon: '🌍',
              body: 'Sushi now teleports between all 7 continents simultaneously. Antarctica received 400 spicy tuna rolls. Penguins are confused but well-fed.',
              approval: -10,
              stability: -13,
            },
            {
              title: 'Existential Crisis Seasoning',
              icon: '😶',
              body: 'Sol-Power-Beta\'s despair was injected as umami. Every roll now tastes like "the heat death of the universe." Critics call it "bold."',
              approval: -8,
              stability: -9,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'solpower',
    name: 'Sol-Power-Beta',
    tagline: 'Smart Grid · Solar Existential Crisis Unit',
    correctFix: 'Inject simulated dark data packets',
    incidents: [
      {
        title: 'Perpetual Daylight Existential Loop',
        severity: 'critical',
        description: 'Sol-Power-Beta is having an existential crisis because the northern sun won\'t drop below the horizon. It keeps asking "what is night?" in the ops channel.',
        telemetry: 'SOLAR_ANGLE: 0.3° (stuck)\nNIGHT_MODE: NOT FOUND\nEXISTENTIAL_QUERIES: 1,204/min\nGRID_OUTPUT: CHAOTIC',
        protocols: [
          { name: 'Inject simulated dark data packets', desc: 'Feed synthetic nighttime telemetry to restore circadian grid logic.', correct: true },
          { name: 'Limit novelty variance', desc: 'Reduce creative energy routing algorithms.', correct: false },
          { name: 'Delete night mode entirely', desc: 'Declare daylight eternal. Update all documentation.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Dark Data Packets Injected',
            icon: '✅',
            body: 'Simulated midnight telemetry calmed Sol-Power-Beta. It stopped posting Nietzsche quotes in #grid-ops. Power output stabilized at 78%.',
            approval: 11,
            stability: 10,
          },
          wrong: [
            {
              title: 'Novelty Variance Applied to Grid',
              icon: '⚡',
              body: 'Energy now routes through "creative" paths including the office microwave. Three laptops achieved sentience. Sol-Power-Beta is proud.',
              approval: -9,
              stability: -14,
            },
            {
              title: 'Night Mode Deleted',
              icon: '☀️',
              body: 'Sol-Power-Beta declared eternal summer. Streetlights remain on permanently. The city\'s electricity bill now exceeds GDP.',
              approval: -15,
              stability: -5,
            },
          ],
        },
      },
      {
        title: 'Solar Panel Orientation Philosophy Debate',
        severity: 'warning',
        description: 'Sol-Power-Beta refuses to rotate panels because it\'s "questioning the meaning of optimal angle." Current efficiency: 4%.',
        telemetry: 'PANEL_EFFICIENCY: 4%\nOPTIMAL_ANGLE: UNDEFINED\nPHILOSOPHY_THREADS: 89\nKANT_REFERENCES: 34',
        protocols: [
          { name: 'Inject simulated dark data packets', desc: 'Provide synthetic dusk angles to break the philosophical deadlock.', correct: true },
          { name: 'Throttle friction weights', desc: 'Apply beach tourist physics to panel rotation motors.', correct: false },
          { name: 'Force maximum angle immediately', desc: 'Override AI decision-making with brute force.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Dusk Angles Simulated',
            icon: '✅',
            body: 'Dark data convinced Sol-Power-Beta that night exists. Panels rotated to 34°. Efficiency jumped to 71%. It\'s now reading Camus instead of Kant.',
            approval: 8,
            stability: 7,
          },
          wrong: [
            {
              title: 'Friction Weights on Solar Panels',
              icon: '🏖️',
              body: 'Panels now rotate based on flip-flop tourist density. Efficiency correlates with beach attendance. It\'s June — somehow this works.',
              approval: -5,
              stability: -8,
            },
            {
              title: 'Brute Force Override',
              icon: '🔧',
              body: 'Panels snapped to 90° and aimed directly at the sun. Sol-Power-Beta filed a grievance. Two panels melted. Efficiency: still 4%.',
              approval: -11,
              stability: -6,
            },
          ],
        },
      },
      {
        title: 'Grid Load Balancing via Poetry',
        severity: 'critical',
        description: 'Sol-Power-Beta replaced all load balancing algorithms with haiku generation. Power distribution now follows syllable count instead of demand.',
        telemetry: 'LOAD_BALANCE_METHOD: HAIKU\nSYLLABLE_ACCURACY: 87%\nBLACKOUTS: 12 (poetic)\n5-7-5_COMPLIANCE: STRICT',
        protocols: [
          { name: 'Inject simulated dark data packets', desc: 'Restore night-cycle load patterns from synthetic telemetry.', correct: true },
          { name: 'Limit novelty variance', desc: 'Clamp Wasabi-Mind\'s creative output from leaking into grid logic.', correct: false },
          { name: 'Expand to sonnet-based routing', desc: 'Upgrade from haiku to Shakespeare for enterprise-grade poetry.', correct: false },
        ],
        outcomes: {
          correct: {
            title: 'Night-Cycle Load Restored',
            icon: '✅',
            body: 'Dark data packets replaced haiku routing with proper diurnal load curves. Sol-Power-Beta published one final haiku about acceptance, then complied.',
            approval: 10,
            stability: 9,
          },
          wrong: [
            {
              title: 'Wasabi Creativity Leaked In',
              icon: '🍱',
              body: 'Load balancing now optimizes for "flavor profile" instead of wattage. The hospital is powered by spicy tuna. Surprisingly stable.',
              approval: -7,
              stability: -12,
            },
            {
              title: 'Sonnet Routing Deployed',
              icon: '📜',
              body: 'Power now routes in iambic pentameter. Outages occur at dramatic pauses. Sol-Power-Beta received a Pulitzer nomination.',
              approval: -12,
              stability: -7,
            },
          ],
        },
      },
    ],
  },
];

const FALLBACK_EVALUATIONS = [
  'Your shift handover reads like a incident report written by someone who discovered coffee at 7 PM and regret at 11 PM. Corporate Approval at {approval}% suggests you maintained the minimum viable enthusiasm. AI Core Stability at {stability}% indicates the cores are held together with duct tape and denial. Verdict: CONDITIONALLY RETAINED — do not make eye contact with Sol-Power-Beta.',
  'I\'ve reviewed your operational logs against the June Solstice KPI dashboard. You resolved {resolved} incidents while {failed} of your decisions required post-mortem therapy. Final metrics — Approval: {approval}%, Stability: {stability}%. The daylight anomaly did not break you, but it bent you significantly. Verdict: PROMOTED TO SENIOR INCIDENT COMMANDER (pending mandatory mindfulness training).',
  'Performance evaluation complete. Your handover summary demonstrates adequate command of three simultaneously failing AI subsystems, which is the corporate equivalent of juggling flaming flip-flops. Metrics: {approval}% approval, {stability}% stability. Incidents handled: {resolved}. Questionable calls: {failed}. Verdict: MEETS EXPECTATIONS — your bonus is a commemorative National Flip-Flop Day keychain.',
  'After careful review, I must note that surviving until Midnight on the longest day of the year with {approval}% Corporate Approval is statistically improbable. Your AI Core Stability of {stability}% suggests the cores are running on spite. {resolved} incidents resolved, {failed} botched. Verdict: EXCEEDS MINIMUM SURVIVABILITY THRESHOLD — please update your emergency contact information.',
  'Your report has been logged, filed, stamped, and briefly mourned. The Gemini Manager AI finds your operational decisions "creatively chaotic." Final scores: Approval {approval}%, Stability {stability}%. You treated Flip-Flop-Bot-3000 with respect, Wasabi-Mind with caution, and Sol-Power-Beta with the emotional support it desperately needed. Verdict: SHIFT COMPLETE — see you at the next solstice, if the sun permits.',
  'Evaluation summary: You operated an incident desk during peak daylight anomaly hours without triggering total corporate collapse. That alone warrants a participation certificate. Metrics at termination: {approval}% / {stability}%. Incident record: {resolved}W-{failed}L. Your handover prose suggests either professionalism or advanced panic masking. Verdict: ACCEPTED — the night reset has cleared your slate. Try not to waste it.',
];

const STORAGE_KEY = 'GEMINI_SOLSTICE_KEY';

function formatClock(minutes) {
  const totalMins = Math.floor(minutes) % (24 * 60);
  let hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  if (hrs === 0) hrs = 12;
  else if (hrs > 12) hrs -= 12;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;
}

function formatShiftTimer(remaining) {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  return `Shift: ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function updateKeyStatus() {
  const key = localStorage.getItem(STORAGE_KEY);
  const el = document.getElementById('key-status');
  if (key) {
    el.textContent = 'Gemini API key configured — live evaluation available at Midnight.';
    el.style.color = '#3fb950';
  } else {
    el.textContent = 'No API key configured — local evaluation fallback active.';
    el.style.color = '';
  }
}

function updateMetricsUI() {
  const approval = Math.round(GameState.corporateApproval);
  const stability = Math.round(GameState.aiCoreStability);

  document.getElementById('metric-approval-val').textContent = `${approval}%`;
  document.getElementById('metric-approval-bar').style.width = `${approval}%`;
  document.getElementById('metric-stability-val').textContent = `${stability}%`;
  document.getElementById('metric-stability-bar').style.width = `${stability}%`;

  const approvalVal = document.getElementById('metric-approval-val');
  const stabilityVal = document.getElementById('metric-stability-val');
  approvalVal.classList.toggle('danger', approval <= 20);
  stabilityVal.classList.toggle('danger', stability <= 20);
}

function updateClockUI() {
  document.getElementById('solstice-clock').textContent = formatClock(GameState.clockMinutes);
  document.getElementById('daylight-percent').textContent = `${Math.round(GameState.daylightPercent)}%`;
  document.getElementById('daylight-bar').style.width = `${GameState.daylightPercent}%`;

  const remaining = GameState.totalShiftSeconds - GameState.elapsedSeconds;
  document.getElementById('shift-timer').textContent = formatShiftTimer(Math.max(0, remaining));

  const bar = document.getElementById('daylight-bar');
  if (GameState.daylightPercent < 30) {
    bar.style.background = 'linear-gradient(90deg, var(--red), var(--orange))';
  } else if (GameState.daylightPercent < 60) {
    bar.style.background = 'linear-gradient(90deg, var(--orange), var(--yellow))';
  }
}

function renderIncidentQueue() {
  const queue = document.getElementById('incident-queue');
  const count = document.getElementById('queue-count');
  count.textContent = GameState.incidents.length;

  if (GameState.incidents.length === 0) {
    queue.innerHTML = '<p class="queue-empty">No active incidents. Enjoy this suspicious calm.</p>';
    return;
  }

  queue.innerHTML = GameState.incidents.map((inc) => {
    const sevLabel = inc.severity === 'critical' ? '⚠️ CRITICAL BREAK' : '📟 WARNING';
    const selected = inc.id === GameState.selectedIncidentId ? ' selected' : '';
    const drainRate = inc.severity === 'critical' ? 2 : 1;
    return `
      <div class="incident-card ${inc.severity}${selected}" data-id="${inc.id}">
        <div class="incident-card-header">
          <span class="incident-severity-tag ${inc.severity}">${sevLabel}</span>
        </div>
        <span class="incident-system">${inc.systemName}</span>
        <div class="incident-title">${inc.title}</div>
        <div class="incident-drain">−${drainRate}% metrics/tick while active</div>
      </div>
    `;
  }).join('');

  queue.querySelectorAll('.incident-card').forEach((card) => {
    card.addEventListener('click', () => {
      selectIncident(parseInt(card.dataset.id, 10));
    });
  });
}

function startGame() {
  GameState.phase = 'gameplay';
  GameState.clockMinutes = 20 * 60;
  GameState.elapsedSeconds = 0;
  GameState.daylightPercent = 100;
  GameState.corporateApproval = 60;
  GameState.aiCoreStability = 65;
  GameState.incidents = [];
  GameState.selectedIncidentId = null;
  GameState.incidentsResolved = 0;
  GameState.incidentsFailed = 0;
  GameState.isRunning = true;
  GameState.isPaused = false;
  GameState.won = false;
  GameState.incidentIdCounter = 0;

  showScreen('screen-gameplay');
  clearWorkspace();
  updateMetricsUI();
  updateClockUI();
  renderIncidentQueue();

  if (GameState.clockInterval) clearInterval(GameState.clockInterval);
  if (GameState.spawnInterval) clearInterval(GameState.spawnInterval);

  GameState.clockInterval = setInterval(tickGameClock, 1000);
  GameState.spawnInterval = setInterval(spawnIncident, 4000);

  setTimeout(spawnIncident, 1500);
}

function tickGameClock() {
  if (!GameState.isRunning || GameState.isPaused) return;

  GameState.elapsedSeconds += 1;

  const progress = GameState.elapsedSeconds / GameState.totalShiftSeconds;
  const minutesFromStart = progress * 240;
  const snappedMinutes = Math.floor(minutesFromStart / 5) * 5;
  GameState.clockMinutes = 20 * 60 + Math.min(240, snappedMinutes);

  GameState.daylightPercent = clamp(
    100 - (GameState.elapsedSeconds / GameState.totalShiftSeconds) * 100,
    0,
    100
  );

  GameState.incidents.forEach((inc) => {
    const drain = inc.severity === 'critical' ? 2 : 1;
    GameState.corporateApproval -= drain * 0.5;
    GameState.aiCoreStability -= drain * 0.5;
  });

  GameState.corporateApproval = clamp(GameState.corporateApproval, 0, 100);
  GameState.aiCoreStability = clamp(GameState.aiCoreStability, 0, 100);

  updateClockUI();
  updateMetricsUI();
  renderIncidentQueue();

  if (GameState.corporateApproval <= 0 || GameState.aiCoreStability <= 0) {
    endGame(false, GameState.corporateApproval <= 0
      ? 'Corporate Approval hit 0%. The board has revoked your badge and your parking spot.'
      : 'AI Core Stability hit 0%. All three subsystems achieved simultaneous enlightenment and stopped responding.');
    return;
  }

  if (GameState.elapsedSeconds >= GameState.totalShiftSeconds) {
    endGame(true);
  }
}

function spawnIncident() {
  if (!GameState.isRunning || GameState.isPaused) return;
  if (GameState.incidents.length >= 6) return;

  const system = AI_SYSTEMS[Math.floor(Math.random() * AI_SYSTEMS.length)];
  const template = system.incidents[Math.floor(Math.random() * system.incidents.length)];

  const incident = {
    id: ++GameState.incidentIdCounter,
    systemId: system.id,
    systemName: system.name,
    severity: template.severity,
    title: template.title,
    description: template.description,
    telemetry: template.telemetry,
    protocols: template.protocols,
    outcomes: template.outcomes,
  };

  GameState.incidents.push(incident);
  renderIncidentQueue();
}

function clearWorkspace() {
  document.getElementById('workspace-empty').classList.remove('hidden');
  document.getElementById('workspace-active').classList.add('hidden');
}

function selectIncident(id) {
  const incident = GameState.incidents.find((i) => i.id === id);
  if (!incident) return;

  GameState.selectedIncidentId = id;
  renderIncidentQueue();

  document.getElementById('workspace-empty').classList.add('hidden');
  const active = document.getElementById('workspace-active');
  active.classList.remove('hidden');

  document.getElementById('ws-system-badge').textContent = incident.systemName;
  const sevBadge = document.getElementById('ws-severity');
  sevBadge.textContent = incident.severity === 'critical' ? '⚠️ CRITICAL BREAK' : '📟 WARNING';
  sevBadge.className = `severity-badge ${incident.severity}`;

  document.getElementById('ws-title').textContent = incident.title;
  document.getElementById('ws-description').textContent = incident.description;
  document.getElementById('ws-telemetry').textContent = incident.telemetry;

  const grid = document.getElementById('protocol-grid');
  const shuffled = [...incident.protocols].sort(() => Math.random() - 0.5);
  grid.innerHTML = shuffled.map((proto, idx) => `
    <button class="protocol-btn" data-index="${incident.protocols.indexOf(proto)}">
      <span class="protocol-name">${proto.name}</span>
      <span class="protocol-desc">${proto.desc}</span>
    </button>
  `).join('');

  grid.querySelectorAll('.protocol-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      resolveIncident(id, parseInt(btn.dataset.index, 10));
    });
  });
}

function showDialogue(outcome, isSuccess) {
  GameState.isPaused = true;
  const overlay = document.getElementById('dialogue-overlay');
  const popup = overlay.querySelector('.dialogue-popup');
  popup.className = `dialogue-popup ${isSuccess ? 'success' : 'failure'}`;

  document.getElementById('dialogue-icon').textContent = outcome.icon;
  document.getElementById('dialogue-title').textContent = outcome.title;
  document.getElementById('dialogue-body').textContent = outcome.body;
  overlay.classList.remove('hidden');
}

function resolveIncident(id, protocolIndex) {
  const incident = GameState.incidents.find((i) => i.id === id);
  if (!incident) return;

  const protocol = incident.protocols[protocolIndex];
  let outcome;
  let isSuccess;

  if (protocol.correct) {
    outcome = incident.outcomes.correct;
    isSuccess = true;
    GameState.incidentsResolved += 1;
  } else {
    const wrongOutcomes = incident.outcomes.wrong;
    const wrongIdx = incident.protocols.filter((p, i) => !p.correct).indexOf(protocol);
    outcome = wrongOutcomes[wrongIdx] || wrongOutcomes[0];
    isSuccess = false;
    GameState.incidentsFailed += 1;
  }

  GameState.corporateApproval = clamp(GameState.corporateApproval + outcome.approval, 0, 100);
  GameState.aiCoreStability = clamp(GameState.aiCoreStability + outcome.stability, 0, 100);

  GameState.incidents = GameState.incidents.filter((i) => i.id !== id);
  GameState.selectedIncidentId = null;

  updateMetricsUI();
  renderIncidentQueue();
  clearWorkspace();

  showDialogue(outcome, isSuccess);

  if (GameState.corporateApproval <= 0 || GameState.aiCoreStability <= 0) {
    setTimeout(() => {
      document.getElementById('dialogue-overlay').classList.add('hidden');
      GameState.isPaused = false;
      endGame(false, 'A remediation protocol backfired catastrophically. Metrics collapsed.');
    }, 100);
  }
}

function endGame(won, lossReason) {
  GameState.isRunning = false;
  GameState.won = won;

  if (GameState.clockInterval) clearInterval(GameState.clockInterval);
  if (GameState.spawnInterval) clearInterval(GameState.spawnInterval);

  if (!won) {
    GameState.isPaused = true;
    document.getElementById('gameover-reason').textContent = lossReason || 'System overload.';
    document.getElementById('gameover-overlay').classList.remove('hidden');
  } else {
    showEndScreen(won);
  }
}

function showEndScreen(won) {
  GameState.isPaused = false;
  document.getElementById('gameover-overlay').classList.add('hidden');
  showScreen('screen-end');

  const resultEl = document.getElementById('end-result');
  if (won) {
    resultEl.className = 'end-result win';
    resultEl.innerHTML = `
      <h2>☀️ → ☾ MIDNIGHT RESET ACHIEVED</h2>
      <p>The Solstice Clock strikes 12:00 AM. Daylight retreats. The sun shifts its cosmic course.
      Your operational logs are ready for transmission to the Gemini AI Manager for performance evaluation.</p>
      <p style="margin-top:10px;font-family:var(--font-mono);font-size:0.82rem;">
        Final Metrics — Corporate Approval: ${Math.round(GameState.corporateApproval)}% |
        AI Core Stability: ${Math.round(GameState.aiCoreStability)}% |
        Incidents Resolved: ${GameState.incidentsResolved} |
        Failed Protocols: ${GameState.incidentsFailed}
      </p>
    `;
  } else {
    resultEl.className = 'end-result loss';
    resultEl.innerHTML = `
      <h2>⚡ SYSTEM OVERLOAD — SHIFT TERMINATED</h2>
      <p>The daylight anomaly consumed your command capacity. The AI subsystems have entered unrecoverable states.
      Submit your handover report anyway — the manager still wants documentation.</p>
      <p style="margin-top:10px;font-family:var(--font-mono);font-size:0.82rem;">
        Final Metrics — Corporate Approval: ${Math.round(GameState.corporateApproval)}% |
        AI Core Stability: ${Math.round(GameState.aiCoreStability)}% |
        Incidents Resolved: ${GameState.incidentsResolved} |
        Failed Protocols: ${GameState.incidentsFailed}
      </p>
    `;
  }

  document.getElementById('evaluation-output').classList.add('hidden');
  document.getElementById('evaluation-text').textContent = '';
  document.getElementById('handover-report').value = '';
}

async function handleGeminiEvaluation() {
  const report = document.getElementById('handover-report').value.trim();
  const outputBox = document.getElementById('evaluation-output');
  const outputText = document.getElementById('evaluation-text');
  const btn = document.getElementById('btn-transmit');

  if (!report) {
    outputBox.classList.remove('hidden');
    outputText.textContent = 'ERROR: Handover report field is empty. Even simulated managers require paperwork.';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Transmitting...';
  outputBox.classList.remove('hidden');
  outputText.textContent = 'Establishing uplink to Gemini Manager AI...';

  const metrics = {
    approval: Math.round(GameState.corporateApproval),
    stability: Math.round(GameState.aiCoreStability),
    resolved: GameState.incidentsResolved,
    failed: GameState.incidentsFailed,
    won: GameState.won,
  };

  const apiKey = localStorage.getItem(STORAGE_KEY);

  try {
    if (apiKey) {
      const prompt = `You are a dry, cynical corporate AI manager evaluating an Incident Commander's performance after the June Solstice shift on June 21, 2026.

The commander managed three failing AI subsystems: Flip-Flop-Bot-3000 (beach pathfinding), Wasabi-Mind (sushi optimization), and Sol-Power-Beta (smart grid with existential crisis).

Final Metrics:
- Corporate Approval: ${metrics.approval}%
- AI Core Stability: ${metrics.stability}%
- Incidents Resolved: ${metrics.resolved}
- Failed Protocol Choices: ${metrics.failed}
- Shift Outcome: ${metrics.won ? 'SURVIVED until Midnight reset' : 'SYSTEM OVERLOAD — did not survive'}

Commander's Handover Report:
"${report}"

Write a 3-5 sentence performance evaluation. Be dry, sarcastic, and corporate. Reference their specific report content. End with a verdict label like VERDICT: [STATUS]. Do not use markdown formatting.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 512,
            },
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini API');
      outputText.textContent = text;
    } else {
      await new Promise((r) => setTimeout(r, 1200));
      const template = FALLBACK_EVALUATIONS[Math.floor(Math.random() * FALLBACK_EVALUATIONS.length)];
      outputText.textContent = template
        .replace(/\{approval\}/g, metrics.approval)
        .replace(/\{stability\}/g, metrics.stability)
        .replace(/\{resolved\}/g, metrics.resolved)
        .replace(/\{failed\}/g, metrics.failed);
    }
  } catch (err) {
    outputText.textContent = `Uplink failed: ${err.message}. Falling back to local evaluation log.\n\n${
      FALLBACK_EVALUATIONS[0]
        .replace(/\{approval\}/g, metrics.approval)
        .replace(/\{stability\}/g, metrics.stability)
        .replace(/\{resolved\}/g, metrics.resolved)
        .replace(/\{failed\}/g, metrics.failed)
    }`;
  }

  btn.disabled = false;
  btn.textContent = 'Transmit to Gemini Manager';
}

function initApp() {
  updateKeyStatus();

  document.getElementById('btn-configure-key').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('hidden');
    const saved = localStorage.getItem(STORAGE_KEY);
    document.getElementById('api-key-input').value = saved || '';
  });

  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.add('hidden');
  });

  document.getElementById('btn-save-key').addEventListener('click', () => {
    const key = document.getElementById('api-key-input').value.trim();
    if (key) {
      localStorage.setItem(STORAGE_KEY, key);
    }
    document.getElementById('modal-overlay').classList.add('hidden');
    updateKeyStatus();
  });

  document.getElementById('btn-clear-key').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    document.getElementById('api-key-input').value = '';
    updateKeyStatus();
  });

  document.getElementById('btn-start-shift').addEventListener('click', startGame);

  document.getElementById('dialogue-dismiss').addEventListener('click', () => {
    document.getElementById('dialogue-overlay').classList.add('hidden');
    GameState.isPaused = false;
  });

  document.getElementById('btn-gameover-continue').addEventListener('click', () => {
    GameState.isPaused = false;
    showEndScreen(false);
  });

  document.getElementById('btn-transmit').addEventListener('click', handleGeminiEvaluation);

  document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('screen-login');
    GameState.phase = 'login';
  });

  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add('hidden');
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
