const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');
const yearSpan = document.getElementById('year');

const timelineStage = document.getElementById('timelineStage');
const nodes = Array.from(document.querySelectorAll('.event-node'));
const eventCard = document.getElementById('eventCard');
const eventTitle = document.getElementById('eventTitle');
const eventPreview = document.getElementById('eventPreview');
const eventCode = document.getElementById('eventCode');
const eventCodeInner = eventCode ? eventCode.querySelector('code') || eventCode : null;

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

const savedTheme = localStorage.getItem(STORAGE_KEY);
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

const steps = {
  step1: { title: 'Débuts', preview: 'Tout a commencé quand j’étais encore très jeune, vers l’âge de 11–12 ans. Mon père récupérait des ordinateurs dans des vide-greniers, et moi, je m’amusais à les réparer...', full: `// EVENT: DEBUTS\nTout a commencé quand j’étais encore très jeune, vers l’âge de 11–12 ans.\nMon père récupérait des ordinateurs dans des vide-greniers, et moi, je m’amusais à faire ce que les autres voulaient éviter : les réparer.\nAu final, c’était souvent de petits problèmes : une RAM ou un disque dur défectueux, un système d’exploitation à réinstaller, des drivers manquants,\nou encore des ordinateurs revendus simplement parce que le mot de passe avait été oublié — alors qu’il me fallait parfois moins de cinq minutes pour contourner le problème.` },
  step2: { title: 'Scolarité', preview: 'Ensuite, comme beaucoup d’autres à cet âge, j’ai consacré une grande partie de mon temps sur les jeux vidéo, tout en poursuivant ma scolarité...', full: `// EVENT: SCOLARITE\nEnsuite, comme beaucoup d’autres à cet âge, j’ai consacré une grande partie de mon temps sur les jeux vidéo, tout en poursuivant ma scolarité, d’abord au collège puis au lycée Mongazon à Angers.\nJe n’étais pas le meilleur élève, mais pas non plus le moins bon.\nJ’aimais aller à l’école, et à côté de ça, je savais déjà que j’avais une certaine appétence pour l’informatique — sans forcément chercher à comprendre pourquoi.` },
  step3: { title: 'Déclic', preview: 'Au début de mes études, j’ai aussi fait plusieurs petits boulots... puis les premiers outils d’IA générative ont commencé à se démocratiser...', full: `// EVENT: DECLIC IA\nAu début de mes études, j’ai aussi fait plusieurs petits boulots, notamment agent d’accueil pour les matchs du SCO d’Angers avec Pavona Agency,\nainsi qu’employé de rayon à Brico Dépôt.\nC’est à cette période que les premiers outils d’IA générative, comme ChatGPT, ont commencé à se démocratiser.\nAvant cela, je faisais partie de ceux qui associaient surtout l’intelligence artificielle à des robots ou à quelque chose de très abstrait.\nJe n’imaginais pas à quel point l’IA pouvait être révolutionnaire dans des usages concrets.\nCette découverte a été un déclic.` },
  step4: { title: 'Spécialisation', preview: 'J’ai compris plus concrètement ce que je voulais faire : me spécialiser dans ce domaine...', full: `// EVENT: SPECIALISATION\nJ’ai compris plus concrètement ce que je voulais faire : me spécialiser dans ce domaine, comprendre comment ces systèmes sont conçus,\nce qu’ils rendent possible, et jusqu’où on peut aller avec eux.\nAu-delà de l’aspect technologique, j’ai tout de suite perçu leur potentiel et les perspectives professionnelles qu’offre cette spécialisation.` },
  step5: { title: 'Stage', preview: 'Dans cette logique, j’ai réalisé un stage de deux mois chez Nameshield à Angers...', full: `// EVENT: STAGE NAMESHIELD\nDans cette logique, j’ai réalisé un stage de deux mois chez Nameshield à Angers.\nCette expérience m’a permis de découvrir le fonctionnement concret d’une équipe en entreprise : travail collaboratif, outils de communication et de suivi,\nimportance des tests, enjeux liés à la production.\nJ’y ai notamment travaillé sur la conception d’une méthode optimale de suppression massive de clés dans une base de données Redis,\nce qui m’a apporté une première expérience technique en environnement professionnel, avec de vraies contraintes de performance et de fiabilité.` },
  step6: { title: 'Australie', preview: 'Durant cette période, j’ai traversé une épreuve personnelle importante... puis je suis parti en Australie...', full: `// EVENT: AUSTRALIE\nDurant cette période, j’ai également traversé une épreuve personnelle importante avec le décès de mon père.\nPour prendre du recul et faire mon deuil, je suis parti juste après ce stage pendant un an et demi en Australie, entre Melbourne et Adelaide.\nCette expérience m’a permis de me ressourcer, de découvrir une autre culture, d’apprendre à me débrouiller seul, à sortir de ma zone de confort,\nà rencontrer des locaux, et à améliorer significativement mon anglais.` },
  step7: { title: 'Retour', preview: 'À mon retour, j’ai décidé de rentrer définitivement à Angers pour me consacrer sérieusement à mes études...', full: `// EVENT: RETOUR\nÀ mon retour, j’ai décidé de rentrer définitivement à Angers pour me consacrer sérieusement à mes études\net à la concrétisation de projets professionnels.` },
  step8: { title: 'Objectif', preview: 'Aujourd’hui, je suis en 3ᵉ année de Licence Informatique, et je sais à quel point il est important d’avoir un profil réellement livrable...', full: `// EVENT: OBJECTIF\nAujourd’hui, je suis en 3ᵉ année de Licence Informatique, et je sais à quel point il est important d’avoir un profil réellement livrable sur le marché du travail :\nnon seulement avec des compétences académiques solides, mais aussi avec des expériences professionnelles concrètes.\nC’est dans cette logique que je recherche actuellement une alternance afin de préparer un Master Informatique spécialisé en Intelligence Artificielle.\n\nMon objectif est clair : continuer à développer des compétences techniques solides, apprendre aux côtés de professionnels,\net m’inscrire dans une trajectoire où je pourrai transformer ma passion de toujours en expertise utile, concrète et durable.` }
};

const points = nodes
  .map((node) => ({ node, step: node.dataset.step, x: Number(node.dataset.x) / 100 }))
  .sort((a, b) => a.x - b.x);

let selectedStep = 'step8';
let selectedX = 0.94;
let typingTimer = null;
let hoverStep = null;
const CURSOR_PREVIEW_THRESHOLD_PX = 14;
const EVENT_SWITCH_HIT_PX = 3;

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function setCursorFromClientX(clientX) {
  if (!timelineStage) return;
  const rect = timelineStage.getBoundingClientRect();
  const x = clamp(clientX - rect.left, 0, rect.width);
  timelineStage.style.setProperty('--cursor-x', `${x}px`);
  return { x, width: rect.width };
}

function setCursorFromRatio(ratio) {
  if (!timelineStage) return;
  const rect = timelineStage.getBoundingClientRect();
  const x = clamp(ratio, 0, 1) * rect.width;
  timelineStage.style.setProperty('--cursor-x', `${x}px`);
}

function setActiveNodes(step) {
  nodes.forEach((node) => {
    node.classList.toggle('active', node.dataset.step === step);
  });
}

function stopTyping() {
  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }
  if (eventCode) {
    eventCode.classList.remove('typing');
  }
}

function positionCard(step) {
  if (!timelineStage || !eventCard) return;

  const p = points.find((item) => item.step === step);
  if (!p) return;

  const stageRect = timelineStage.getBoundingClientRect();
  const cardRect = eventCard.getBoundingClientRect();

  const pointX = p.x * stageRect.width;
  const pointY = (parseFloat(p.node.style.top || '50') / 100) * stageRect.height;

  const half = cardRect.width / 2;
  const leftPx = clamp(pointX, half + 12, stageRect.width - half - 12);
  const topPx = clamp(pointY + 24, 12, stageRect.height - cardRect.height - 12);

  eventCard.style.left = `${(leftPx / stageRect.width) * 100}%`;
  eventCard.style.top = `${topPx}px`;

  const tail = clamp(pointX - (leftPx - half), 18, cardRect.width - 18);
  eventCard.style.setProperty('--tail-left', `${tail}px`);
}

function updateCard(step, keepExpanded = false) {
  const data = steps[step];
  if (!data || !eventCard || !eventTitle || !eventPreview || !eventCode) return;

  eventTitle.textContent = data.title;
  eventPreview.textContent = data.preview;

  if (eventCodeInner) {
    eventCodeInner.textContent = data.full;
  } else {
    eventCode.textContent = data.full;
  }

  if (!keepExpanded) {
    eventCard.classList.remove('expanded');
    stopTyping();
  }

  requestAnimationFrame(() => {
    positionCard(step);
  });
}

function startTyping(step) {
  const data = steps[step];
  if (!data || !eventCodeInner) return;

  stopTyping();
  eventCodeInner.textContent = '';
  eventCode.classList.add('typing');

  let i = 0;
  const full = data.full;

  typingTimer = setInterval(() => {
    i += 1;
    eventCodeInner.textContent = full.slice(0, i);
    if (i >= full.length) {
      stopTyping();
    }
  }, 9);
}

function previewStep(step) {
  if (eventCard && eventCard.classList.contains('expanded')) {
    return;
  }
  hoverStep = step;
  setActiveNodes(step);
  updateCard(step, false);
}

function syncPreviewWithCursor(cursorX, stageWidth) {
  if (!points.length || !stageWidth) return;
  const cursorRatio = cursorX / stageWidth;

  // If user opened a full event text by click, keep it until the cursor is truly on another event point.
  if (eventCard && eventCard.classList.contains('expanded')) {
    const pointUnderCursor = points.find((p) => Math.abs((p.x * stageWidth) - cursorX) <= EVENT_SWITCH_HIT_PX);
    if (pointUnderCursor && pointUnderCursor.step !== selectedStep) {
      stopTyping();
      eventCard.classList.remove('expanded');
      hoverStep = pointUnderCursor.step;
      setActiveNodes(pointUnderCursor.step);
      updateCard(pointUnderCursor.step, false);
    }
    return;
  }

  // Default behavior: show preview of the closest event on the LEFT of the cursor.
  let leftPoint = points[0];
  for (let i = 0; i < points.length; i += 1) {
    if (points[i].x <= cursorRatio) {
      leftPoint = points[i];
    } else {
      break;
    }
  }

  if (leftPoint && hoverStep !== leftPoint.step) {
    previewStep(leftPoint.step);
  }
}

function selectStep(step, expand = false) {
  selectedStep = step;
  const p = points.find((item) => item.step === step);
  if (p) {
    selectedX = p.x;
    setCursorFromRatio(selectedX);
  }

  setActiveNodes(step);
  updateCard(step, expand);

  if (expand && eventCard) {
    eventCard.classList.add('expanded');
    startTyping(step);
  }
}

if (timelineStage) {
  timelineStage.addEventListener('mousemove', (event) => {
    const pos = setCursorFromClientX(event.clientX);
    if (pos) {
      syncPreviewWithCursor(pos.x, pos.width);
    }
  });

  timelineStage.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (touch) {
      const pos = setCursorFromClientX(touch.clientX);
      if (pos) {
        syncPreviewWithCursor(pos.x, pos.width);
      }
    }
  }, { passive: true });

  timelineStage.addEventListener('mouseleave', () => {
    hoverStep = null;
    setCursorFromRatio(selectedX);
    setActiveNodes(selectedStep);
    updateCard(selectedStep, eventCard?.classList.contains('expanded'));
  });
}

nodes.forEach((node) => {
  node.addEventListener('mouseenter', () => {
    previewStep(node.dataset.step);
  });

  node.addEventListener('focus', () => {
    previewStep(node.dataset.step);
  });

  node.addEventListener('click', () => {
    const same = node.dataset.step === selectedStep;
    const expanded = Boolean(eventCard && eventCard.classList.contains('expanded'));

    if (same && expanded) {
      stopTyping();
      if (eventCard) {
        eventCard.classList.remove('expanded');
      }
      updateCard(selectedStep, false);
      return;
    }

    selectStep(node.dataset.step, true);
  });
});

if (eventCard) {
  eventCard.addEventListener('click', () => {
    if (!eventCard.classList.contains('expanded')) {
      eventCard.classList.add('expanded');
      startTyping(hoverStep || selectedStep);
    }
  });
}

window.addEventListener('resize', () => {
  positionCard(hoverStep || selectedStep);
  setCursorFromRatio(selectedX);
});

selectStep('step8', false);

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
