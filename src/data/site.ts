export const site = {
  name: 'Wooo', greeting: 'hello astro', identity: 'Research Seal', identityEn: 'a seal doing research',
  role: 'Radio Astronomy Graduate Student', subclass: 'H I Galaxy Explorer', focus: 'H I & Radio Astronomy',
  location: 'H I Data Language', level: 4, exp: 1320, nextLevelExp: 2000,
  mainQuest: 'Find the first feasible, testable H I science question with accessible data',
  status: 'PHASE 1 · EXPLORATION ACTIVE',
}

export type Quest = {
  code: string; title: string; kind: 'MAIN' | 'ACTIVE' | 'SIDE'; status: 'active' | 'planned' | 'complete';
  purpose: string; doneWhen: string[]; deliverable: string; nextAction: string; progress: number; reward: string;
}

export const quests: Quest[] = [
  { code: 'MQ-01', title: 'Locate the First H I Science Question', kind: 'MAIN', status: 'active', progress: 24,
    purpose: 'Narrow a broad interest in neutral hydrogen into a question with accessible data, feasible methods, and a testable result.',
    doneWhen: ['Complete a question card: object, variable, mechanism, and control sample', 'Confirm one accessible dataset', 'Prepare a ten-minute proposal for discussion with the supervisor'],
    deliverable: 'One-page science question canvas + preliminary data list', nextAction: 'Read one H I review and extract three testable questions', reward: '+600 EXP · Unlock Independent Project', },
  { code: 'Q-01', title: 'Build the Core H I Literature Map', kind: 'ACTIVE', status: 'active', progress: 35,
    purpose: 'Build a structural view of the field: its major questions, established relations, common datasets, and methods.',
    doneWhen: ['Collect 15–20 core papers', 'Tag each paper by question, data, method, and conclusion', 'Map thematic links between papers'],
    deliverable: 'Searchable H I literature map', nextAction: 'Extract five main conclusions from the next review', reward: '+180 EXP · Literature Navigation Lv2', },
  { code: 'Q-02', title: 'Complete a Public H I Data Cube Workflow', kind: 'ACTIVE', status: 'active', progress: 52,
    purpose: 'Advance from knowing the concepts to independently reading, checking, and producing basic H I data products.',
    doneWhen: ['Read the FITS cube and header', 'Inspect noise, beam, velocity axis, and abnormal channels', 'Generate a spectrum, moment 0/1 maps, and a PV diagram'],
    deliverable: 'One reproducible analysis case', nextAction: 'Generate the first moment 0 map with coordinates and units', reward: '+250 EXP · Cube Analysis Lv2', },
  { code: 'Q-03', title: 'Reproduce One Key Paper Figure', kind: 'ACTIVE', status: 'active', progress: 18,
    purpose: 'Use reproduction to understand sample selection, variable definitions, uncertainty, and hidden assumptions.',
    doneWhen: ['Select the target figure and public data', 'Document the definition of every plotted variable', 'Explain the sources of differences from the original'],
    deliverable: 'Reproduced figure + discrepancy report + runnable code', nextAction: 'Choose a paper with public data and clearly defined figures', reward: '+220 EXP · Reproduction Lv1', },
  { code: 'SQ-01', title: 'Radio Unit Reference Card', kind: 'SIDE', status: 'planned', progress: 0,
    purpose: 'Reduce friction when converting Jy, beam, brightness temperature, and flux.',
    doneWhen: ['Collect common definitions', 'Add three worked examples'], deliverable: 'One-page reference card', nextAction: 'Create the unit table', reward: '+60 EXP', },
]

export const stages = [
  { name: 'Radio Foundations', state: 'complete', note: 'Core concepts and language' },
  { name: 'Data Language', state: 'current', note: 'FITS · WCS · Cube' },
  { name: 'H I Analysis', state: 'next', note: 'Moment · PV · Mass' },
  { name: 'Science Question', state: 'locked', note: 'Hypothesis and validation design' },
  { name: 'Independent Project', state: 'locked', note: 'Complete analysis loop' },
  { name: 'First Paper', state: 'locked', note: 'Writing · Submission · Revision' },
]

export const mapNodes = [
  { id: 'foundation', label: 'Research Foundations', zone: 'Core Tools', x: 8, y: 48, status: 'mastered', detail: 'Python, Linux, Git, LaTeX, and reproducible research records.' },
  { id: 'radio', label: 'Radio Foundations', zone: 'Radio Gateway', x: 28, y: 48, status: 'mastered', detail: 'Jansky, beam, system temperature, sensitivity, and radiative transfer.' },
  { id: 'instrument', label: 'Instruments & Observing', zone: 'Observatory Zone', x: 46, y: 22, status: 'available', detail: 'Single dishes, interferometers, calibration, RFI, and FAST observing modes.' },
  { id: 'hi', label: 'H I Data Language', zone: 'Current Region', x: 48, y: 56, status: 'current', detail: '21 cm physics, FITS cubes, velocity axes, noise, and basic data products.' },
  { id: 'hi-science', label: 'H I Galaxy Science', zone: 'Main Quest Region', x: 70, y: 48, status: 'available', detail: 'H I mass, scaling relations, kinematics, environment, and gas cycling.' },
  { id: 'pulsar', label: 'Pulsars', zone: 'Candidate Region', x: 48, y: 82, status: 'discovered', detail: 'Searches, dedispersion, folding, timing, and PTA.' },
  { id: 'transient', label: 'Radio Transients', zone: 'Distant Region', x: 69, y: 82, status: 'locked', detail: 'FRBs, radio bursts, localisation, and host environments.' },
  { id: 'cosmo', label: '21 cm Cosmology', zone: 'Distant Region', x: 88, y: 27, status: 'locked', detail: 'Cosmic dawn, reionisation, and intensity mapping.' },
]
export const mapEdges = [['foundation','radio'], ['radio','instrument'], ['radio','hi'], ['instrument','hi-science'], ['hi','hi-science'], ['hi','pulsar'], ['pulsar','transient'], ['hi-science','cosmo']]

export const skillBranches = [
  { name: 'FOUNDATION / CORE TOOLS', skills: [
    { name: 'Python', level: 3, status: 'mastered', proof: 'Independently modify analysis code' }, { name: 'Linux', level: 2, status: 'mastered', proof: 'SSH and basic command line' },
    { name: 'Git', level: 2, status: 'available', proof: 'Project version control' }, { name: 'Research Log', level: 2, status: 'available', proof: 'Markdown / Obsidian' }, ] },
  { name: 'DATA / DATA LANGUAGE', skills: [
    { name: 'FITS & Header', level: 2, status: 'current', proof: 'Read and interpret headers' }, { name: 'WCS & Units', level: 1, status: 'current', proof: 'Coordinate and unit conversion' },
    { name: 'Data Cube', level: 1, status: 'current', proof: 'Slices, spectra, and noise' }, { name: 'Quality Control', level: 0, status: 'locked', proof: 'Requires Data Cube Lv2' }, ] },
  { name: 'H I SCIENCE / NEUTRAL HYDROGEN', skills: [
    { name: '21 cm Physics', level: 1, status: 'available', proof: 'Transition and column density' }, { name: 'Moment Maps', level: 0, status: 'current', proof: 'Current upgrade target' },
    { name: 'H I Mass', level: 0, status: 'locked', proof: 'Requires Moment Maps Lv1' }, { name: 'H I Kinematics', level: 0, status: 'locked', proof: 'Requires Cube Analysis Lv2' }, ] },
  { name: 'RESEARCH / INDEPENDENT RESEARCH', skills: [
    { name: 'Literature Navigation', level: 1, status: 'current', proof: 'Core literature map in progress' }, { name: 'Figure Reproduction', level: 0, status: 'current', proof: 'Q-03 in progress' },
    { name: 'Question Design', level: 0, status: 'locked', proof: 'Unlock after the literature map' }, { name: 'Paper Narrative', level: 0, status: 'locked', proof: 'Unlock after an independent project' }, ] },
]

export const milestones = [
  { date: '2026.07', title: 'Entered the Radio Map', note: 'Shifted the research direction to H I and radio astronomy', state: 'complete' },
  { date: 'NOW', title: 'Build the Data Language', note: 'FITS, WCS, cubes, and basic image products', state: 'current' },
  { date: 'NEXT', title: 'Complete a Reproducible Case', note: 'Run a complete analysis workflow on a public dataset', state: 'next' },
  { date: 'LATER', title: 'Define the Science Question', note: 'Produce and discuss a one-page question canvas', state: 'locked' },
  { date: 'BOSS', title: 'First First-Author Paper', note: 'Research, writing, submission, and revision', state: 'locked' },
]
