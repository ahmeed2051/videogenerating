const FALLBACK_DATA = {
  themes: {
    education: {
      hooks: [
        'What if learning your next skill only took five minutes?',
        '3 lessons your teacher never told you about',
        'This micro-class might change your career overnight',
      ],
      beats: [
        'Relatable challenge learners face today',
        'Break down the topic into a visual, snackable metaphor',
        'Provide one practical exercise viewers can try immediately',
        'Wrap with a reflection question to drive comments',
      ],
      visuals: [
        'Clean infographics with animated callouts',
        'Split-screen expert demo with captioned steps',
        'Lightweight motion graphics highlighting stats',
      ],
      audio: [
        'Calm, upbeat background track at -18 LUFS',
        'Soft whoosh and sparkle sound design on transitions',
        'Tight voiceover pacing with 0.3s pauses between sections',
      ],
    },
    entertainment: {
      hooks: [
        "3 binge-worthy releases you can't miss this weekend",
        'What happens when a fan theory actually comes true?',
        'The behind-the-scenes twist everyone is talking about',
      ],
      beats: [
        'Open with a trending headline or clip that sparks curiosity',
        'Break down the plot or performance highlights with punchy lower-thirds',
        'Drop a behind-the-scenes fact or quote to surprise viewers',
        'Wrap with a watchlist recommendation and invite hot takes in comments',
      ],
      visuals: [
        'Rapid montage of posters or stills with neon overlays',
        'Picture-in-picture reaction shots synced to key moments',
        'Animated ticker for cast names, release dates, and streaming platforms',
      ],
      audio: [
        'Upbeat pop or synth track that hits on scene transitions',
        'Subtle crowd or studio ambience layered beneath commentary',
        'Voiceover with energetic emphasis and playful pauses for effect',
      ],
    },
    travel: {
      hooks: [
        'This hidden gem is only two hours from the city',
        'Stop scrolling and imagine waking up here tomorrow',
        'A weekend escape that feels like crossing continents',
      ],
      beats: [
        "Show the travel problem you're solving (budget, time, experience)",
        'Reveal location with cinematic b-roll and map overlays',
        'Break down top three experiences with estimated costs',
        'Finish with packing or booking pro-tip viewers can screenshot',
      ],
      visuals: [
        'Drone-inspired establishing shots with parallax text',
        'POV walking footage layered with playful stickers',
        'Texture-rich food close-ups with shallow depth-of-field',
      ],
      audio: [
        'Rhythmic travel beat with percussion hits on cuts',
        'Nature ambience stem to fill quiet transitions',
        'Voiceover with smiley tone and crisp consonants',
      ],
    },
    gaming: {
      hooks: [
        'Can you beat this boss without taking any damage?',
        "The speedrun trick pros won't tell you about",
        'Build the ultimate loadout using this underrated combo',
      ],
      beats: [
        "Kick off with an on-screen challenge countdown",
        'Reveal the strategy while replaying highlight moments',
        'Add split-second overlays for button inputs or gear stats',
        'Close with a viewer challenge and call for stitched duos',
      ],
      visuals: [
        'HUD-inspired frames with neon accent lighting',
        'Slow-motion replays with motion blur and chromatic aberration',
        'Stylized glitch transitions between clips',
      ],
      audio: [
        'Trap or drum-and-bass loop side-chained to commentary',
        'Layered controller clicks subtly mixed underneath',
        'Energetic delivery with emphasis on hype phrases',
      ],
    },
    wellness: {
      hooks: [
        'Take a 60-second reset with me',
        'Breathe in for 4, hold for 4, out for 4—ready?',
        'You only need the space beside your desk for this routine',
      ],
      beats: [
        'Invite the viewer to pause and mirror your breathing',
        'Guide through a grounded routine with soft lower-thirds',
        'Share one science-backed insight to build credibility',
        'Encourage journaling or hydration as a follow-up micro-habit',
      ],
      visuals: [
        'Soft gradients with floating particle animations',
        'Close-up of calm facial expressions and hand movements',
        'Minimalist typography with high legibility',
      ],
      audio: [
        'Lo-fi piano textures with warm vinyl noise',
        'ASMR-inspired foley for tactile movements',
        'Gentle voiceover with deliberate pacing and whispered sibilants',
      ],
    },
  },
  platforms: {
    youtube: {
      name: 'YouTube',
      duration: '6-8 minutes',
      cta: 'Invite viewers to subscribe and drop their own twists in the comments',
    },
    shorts: {
      name: 'YouTube Shorts',
      duration: '45-60 seconds',
      cta: 'Ask for a double-tap and encourage sharing the short with a friend',
    },
    tiktok: {
      name: 'TikTok',
      duration: '35-50 seconds',
      cta: 'Prompt viewers to stitch their attempt and follow for part two',
    },
    reels: {
      name: 'Instagram Reels',
      duration: '50-75 seconds',
      cta: 'Encourage a save for later and a DM to someone who needs the reminder',
    },
  },
  tones: {
    beginner: 'Keep explanations crystal clear and friendly for first-time viewers.',
    intermediate: 'Balance insights with jargon—they already know the basics.',
    expert: 'Deliver fast-paced breakdowns with data or references to stand out.',
  },
  pacings: {
    steady: 'Balanced',
    fast: 'Fast-paced',
    calm: 'Calming',
  },
  pacingCopy: {
    steady: 'Use mid-tempo editing—clean cuts every 3–4 seconds to keep a conversational feel.',
    fast: 'Accelerate the pacing with snappy jump cuts and kinetic text for each keyword.',
    calm: 'Lean into longer holds and cross-dissolves so viewers can breathe between beats.',
  },
  calls: [
    'Drop a comment with the next problem you want solved',
    'Tag a friend who needs to try this',
    'Download the free checklist linked in bio',
    'Screenshot the breakdown and build along with me',
  ],
};

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const API_BASE =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '';

const selectors = {
  form: document.getElementById('idea-form'),
  theme: document.getElementById('theme'),
  platform: document.getElementById('platform'),
  tone: document.getElementById('tone'),
  pacing: document.querySelectorAll('input[name="pacing"]'),
  meta: document.getElementById('idea-meta'),
  content: document.getElementById('idea-content'),
  title: document.getElementById('idea-title'),
  platformTag: document.getElementById('idea-platform'),
  pacingTag: document.getElementById('idea-pacing'),
  summary: document.getElementById('idea-summary'),
  outline: document.getElementById('idea-outline'),
  visuals: document.getElementById('idea-visuals'),
  audio: document.getElementById('idea-audio'),
  cta: document.getElementById('idea-cta'),
  demoButton: document.getElementById('demo-button'),
};

const state = {
  options: null,
  loading: false,
  usingFallback: false,
};

function buildSelect(select, entries) {
  select.innerHTML = '';
  for (const [value, label] of Object.entries(entries)) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  }
}

function getFallbackOptions() {
  return {
    themes: Object.fromEntries(
      Object.keys(FALLBACK_DATA.themes).map((key) => [key, key.charAt(0).toUpperCase() + key.slice(1)])
    ),
    platforms: Object.fromEntries(
      Object.entries(FALLBACK_DATA.platforms).map(([key, value]) => [key, value.name])
    ),
    tones: Object.fromEntries(
      Object.keys(FALLBACK_DATA.tones).map((key) => [key, key.charAt(0).toUpperCase() + key.slice(1)])
    ),
    pacings: { ...FALLBACK_DATA.pacings },
  };
}

function useFallbackOptions(message) {
  state.options = getFallbackOptions();
  state.usingFallback = true;
  buildSelect(selectors.theme, state.options.themes);
  buildSelect(selectors.platform, state.options.platforms);
  buildSelect(selectors.tone, state.options.tones);
  selectors.meta.textContent = message;
  selectors.meta.classList.remove('error');
}

async function fetchJSON(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Request failed');
  }
  return response.json();
}

async function loadOptions() {
  try {
    const data = await fetchJSON(`${API_BASE}/api/options`);
    state.options = data;
    state.usingFallback = false;
    buildSelect(selectors.theme, data.themes);
    buildSelect(selectors.platform, data.platforms);
    buildSelect(selectors.tone, data.tones);
    selectors.meta.textContent = 'Choose your preferences and generate a storyboard to see the details here.';
  } catch (error) {
    console.error(error);
    useFallbackOptions('Running in sample mode – start the backend for live generation.');
  }
}

function getSelectedPacing() {
  const checked = Array.from(selectors.pacing).find((input) => input.checked);
  return checked ? checked.value : 'steady';
}

function setLoading(isLoading) {
  state.loading = isLoading;
  const submitButton = selectors.form.querySelector('button[type="submit"]');
  submitButton.disabled = isLoading;
  submitButton.textContent = isLoading ? 'Generating…' : 'Generate storyboard';
}

function resetIdea() {
  selectors.content.hidden = true;
  selectors.meta.textContent = 'Choose your preferences and generate a storyboard to see the details here.';
  selectors.meta.classList.remove('error');
}

function createListItems(container, items) {
  container.innerHTML = '';
  items.forEach((item) => {
    const element = document.createElement('li');
    if (typeof item === 'string') {
      element.textContent = item;
    } else {
      element.textContent = item.description;
      if (item.estimated_time) {
        const time = document.createElement('span');
        time.className = 'outline-time';
        time.textContent = item.estimated_time;
        element.appendChild(time);
      }
    }
    container.appendChild(element);
  });
}

function generateFallbackIdea(payload) {
  const themeKey = payload.theme in FALLBACK_DATA.themes ? payload.theme : 'education';
  const platformKey = payload.platform in FALLBACK_DATA.platforms ? payload.platform : 'youtube';
  const toneKey = payload.tone in FALLBACK_DATA.tones ? payload.tone : 'beginner';
  const pacingKey = payload.pacing in FALLBACK_DATA.pacings ? payload.pacing : 'steady';

  const theme = FALLBACK_DATA.themes[themeKey];
  const platform = FALLBACK_DATA.platforms[platformKey];
  const tone = FALLBACK_DATA.tones[toneKey];
  const pacingLabel = FALLBACK_DATA.pacings[pacingKey];

  const hook = theme.hooks[Math.floor(Math.random() * theme.hooks.length)];
  const call = FALLBACK_DATA.calls[Math.floor(Math.random() * FALLBACK_DATA.calls.length)];

  const outline = theme.beats.map((beat, index) => {
    const seconds = Math.max(8, Math.round(beat.split(' ').length / 3.5) * 2);
    return {
      step: index + 1,
      description: beat,
      estimated_time: `${seconds}s of the ${platform.duration} runtime`,
    };
  });

  const summary = `Craft a ${platform.name} piece anchored by the hook “${hook}”. Target a ${toneKey} audience: ${tone} ${
    FALLBACK_DATA.pacingCopy[pacingKey]
  } Keep the runtime around ${platform.duration} and close with: ${call}.`;

  return {
    title: hook.includes('?') ? hook.replace('?', '!') : hook,
    hook,
    platform,
    tone,
    pacing: pacingLabel,
    summary,
    outline,
    visuals: theme.visuals,
    audio: theme.audio,
    call_to_action: call,
    generated_at: new Date().toISOString(),
  };
}

function renderIdea(idea) {
  selectors.content.hidden = false;
  selectors.title.textContent = idea.title;
  selectors.platformTag.textContent = `${idea.platform.name} • ${idea.platform.duration}`;
  selectors.pacingTag.textContent = `Pacing: ${idea.pacing}`;
  selectors.summary.textContent = idea.summary;

  selectors.outline.innerHTML = '';
  idea.outline.forEach((step) => {
    const item = document.createElement('li');
    const text = document.createElement('p');
    text.textContent = step.description;
    const time = document.createElement('span');
    time.className = 'outline-time';
    time.textContent = step.estimated_time;
    item.append(text, time);
    selectors.outline.appendChild(item);
  });

  createListItems(selectors.visuals, idea.visuals);
  createListItems(selectors.audio, idea.audio);
  selectors.cta.textContent = idea.call_to_action;
  selectors.meta.textContent = `Generated ${new Date(idea.generated_at).toLocaleString()} · ${idea.tone}`;
  selectors.meta.classList.remove('error');
}

async function generateIdea(payload) {
  setLoading(true);
  try {
    if (!state.usingFallback) {
      const idea = await fetchJSON(`${API_BASE}/api/ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      renderIdea(idea);
      return;
    }
    throw new Error('Using fallback data');
  } catch (error) {
    console.error(error);
    state.usingFallback = true;
    const idea = generateFallbackIdea(payload);
    renderIdea(idea);
    if (!selectors.meta.textContent.includes('sample data')) {
      selectors.meta.textContent += ' · sample data';
    }
  } finally {
    setLoading(false);
  }
}

function getCurrentSelections() {
  return {
    theme: selectors.theme.value,
    platform: selectors.platform.value,
    tone: selectors.tone.value,
    pacing: getSelectedPacing(),
  };
}

if (selectors.form) {
  selectors.form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.loading) return;
    generateIdea(getCurrentSelections());
  });

  selectors.form.addEventListener('reset', () => {
    setTimeout(() => {
      if (state.options) {
        selectors.theme.value = Object.keys(state.options.themes)[0];
        selectors.platform.value = Object.keys(state.options.platforms)[0];
        selectors.tone.value = Object.keys(state.options.tones)[0];
      }
      Array.from(selectors.pacing).forEach((input) => {
        input.checked = input.value === 'steady';
      });
      resetIdea();
    }, 0);
  });
}

if (selectors.demoButton) {
  selectors.demoButton.addEventListener('click', () => {
    if (!state.options) return;
    const themes = Object.keys(state.options.themes);
    const platforms = Object.keys(state.options.platforms);
    const tones = Object.keys(state.options.tones);
    const pacings = Object.keys(state.options.pacings || FALLBACK_DATA.pacings);
    selectors.theme.value = themes[Math.floor(Math.random() * themes.length)];
    selectors.platform.value = platforms[Math.floor(Math.random() * platforms.length)];
    selectors.tone.value = tones[Math.floor(Math.random() * tones.length)];
    const pacingValue = pacings[Math.floor(Math.random() * pacings.length)];
    Array.from(selectors.pacing).forEach((input) => {
      input.checked = input.value === pacingValue;
    });
    generateIdea(getCurrentSelections());
  });
}

resetIdea();
useFallbackOptions('Loading planner options…');
loadOptions();
