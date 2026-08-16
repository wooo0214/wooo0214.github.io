export const site = {
  name: 'Wooo', greeting: 'hello astro', identity: 'Research Seal', identityEn: 'a seal doing research',
  role: 'Radio Astronomy Graduate Student', subclass: 'H I Galaxy Explorer', focus: 'H I & Radio Astronomy',
  location: 'FAST Data Processing', level: 4, exp: 1320, nextLevelExp: 2000,
  mainQuest: 'Process FAST data and maintain a reproducible research record',
  status: 'PHASE 3 · FAST DATA PROCESSING',
}

export type Quest = {
  code: string; title: string; kind: 'MAIN' | 'ACTIVE' | 'SIDE'; status: 'active' | 'planned' | 'complete';
  purpose: string; doneWhen: string[]; deliverable: string; nextAction: string; progress: number; reward: string;
}

export const quests: Quest[] = [
  { code: 'MQ-01', title: 'Process FAST Data', kind: 'MAIN', status: 'active', progress: 58,
    purpose: 'Build a careful, reproducible record of ongoing FAST data processing without publishing unfinished scientific conclusions.',
    doneWhen: ['Keep raw data separate from derived products', 'Record data-quality checks and analysis assumptions', 'Prepare a private research summary for group discussion'],
    deliverable: 'Reproducible FAST data-processing record', nextAction: 'Continue processing the FAST dataset and record the next verified checkpoint', reward: '+600 EXP · Unlock Validated Analysis', },
  { code: 'Q-01', title: 'Build the Core H I Literature Map', kind: 'ACTIVE', status: 'active', progress: 58,
    purpose: 'Build a structural view of the field: its major questions, established relations, common datasets, and methods.',
    doneWhen: ['Collect 15–20 core papers', 'Tag each paper by question, data, method, and conclusion', 'Map thematic links between papers'],
    deliverable: 'Searchable H I literature map', nextAction: 'Turn the reading notes into a question–method–data matrix', reward: '+180 EXP · Literature Navigation Lv2', },
  { code: 'Q-02', title: 'Review the FAST Dataset', kind: 'ACTIVE', status: 'active', progress: 76,
    purpose: 'Inspect the FAST data structure, quality, and derived products while keeping unfinished results private.',
    doneWhen: ['Inspect the supplied data structure', 'Record quality checks and anomalies', 'Separate diagnostic plots from publishable results'],
    deliverable: 'Private FAST data review', nextAction: 'Complete the next data-quality review and update the research log', reward: '+250 EXP · Validated Data Review', },
  { code: 'Q-03', title: 'Prepare a Reproducible Figure', kind: 'ACTIVE', status: 'active', progress: 18,
    purpose: 'Use a figure or diagnostic plot to make the current FAST data-processing step inspectable.',
    doneWhen: ['Choose one approved diagnostic output', 'Record its input and processing context', 'Explain what the figure does and does not establish'],
    deliverable: 'Private diagnostic figure + note', nextAction: 'Select one FAST processing diagnostic for the research log', reward: '+220 EXP · Figure Record Lv1', },
  { code: 'Q-04', title: 'Maintain a Reproducible Workspace', kind: 'ACTIVE', status: 'active', progress: 45,
    purpose: 'Keep the research workspace organized so that data, scripts, notes, and derived products remain distinguishable.',
    doneWhen: ['Separate source data from derived products', 'Record the environment and analysis date privately', 'Keep a recoverable copy of the working notes'],
    deliverable: 'Private workspace checklist', nextAction: 'Review the current FAST data-processing workspace', reward: '+180 EXP · Reproducibility Lv2', },
  { code: 'Q-05', title: 'Document FAST Data Processing', kind: 'ACTIVE', status: 'active', progress: 72,
    purpose: 'Record the current processing stage and quality checks without exposing unfinished research details.',
    doneWhen: ['Keep raw and derived products separate', 'Record quality-control decisions', 'Mark unfinished interpretations as private'],
    deliverable: 'Private FAST processing log', nextAction: 'Add the next verified processing checkpoint', reward: '+300 EXP · Research Log Lv2', },
  { code: 'Q-06', title: 'Review the FAST Tracking Dataset', kind: 'ACTIVE', status: 'active', progress: 32,
    purpose: 'Continue reviewing the FAST tracking dataset while preserving the distinction between data processing and scientific conclusions.',
    doneWhen: ['Complete the next dataset review', 'Record data-quality flags', 'Keep unfinished results private'],
    deliverable: 'FAST tracking dataset review', nextAction: 'Continue processing the FAST tracking dataset', reward: '+260 EXP · Data Review Lv1', },
  { code: 'SQ-01', title: 'Radio Unit Reference Card', kind: 'SIDE', status: 'planned', progress: 70,
    purpose: 'Reduce friction when converting Jy, beam, brightness temperature, column density, and H I mass.',
    doneWhen: ['Collect common definitions', 'Add three worked examples'], deliverable: 'One-page reference card', nextAction: 'Format a general FAST data-processing reference card', reward: '+60 EXP', },
]

export const stages = [
  { name: 'Radio Foundations', state: 'complete', note: 'Core concepts and language' },
  { name: 'Data Language', state: 'complete', note: 'FITS · WCS · velocity axes' },
  { name: 'Research Setup', state: 'complete', note: 'Organized tools and research records' },
  { name: 'FAST Data Processing', state: 'current', note: 'Data review and reproducible records' },
  { name: 'Validated Analysis', state: 'next', note: 'Approved results and interpretation' },
  { name: 'Science Question', state: 'locked', note: 'Hypothesis and validation design' },
  { name: 'Independent Project', state: 'locked', note: 'Complete analysis loop' },
  { name: 'First Paper', state: 'locked', note: 'Writing · Submission · Revision' },
]

export const mapNodes = [
  { id: 'foundation', label: 'Research Foundations', zone: 'Core Tools', x: 8, y: 48, status: 'mastered', detail: 'Python, Linux, Git, LaTeX, and reproducible research records.' },
  { id: 'radio', label: 'Radio Foundations', zone: 'Radio Gateway', x: 28, y: 48, status: 'mastered', detail: 'Jansky, beam, system temperature, sensitivity, and radiative transfer.' },
  { id: 'instrument', label: 'Instruments & Observing', zone: 'Observatory Zone', x: 46, y: 22, status: 'available', detail: 'Single dishes, interferometers, calibration, RFI, and FAST observing modes.' },
  { id: 'hi', label: 'FAST Data Processing', zone: 'Current Region', x: 48, y: 56, status: 'current', detail: 'Processing FAST data, reviewing quality, and maintaining a private research record.' },
  { id: 'hi-science', label: 'H I Galaxy Science', zone: 'Main Quest Region', x: 70, y: 48, status: 'available', detail: 'H I mass, scaling relations, kinematics, environment, and gas cycling.' },
  { id: 'pulsar', label: 'Pulsars', zone: 'Candidate Region', x: 48, y: 82, status: 'discovered', detail: 'Searches, dedispersion, folding, timing, and PTA.' },
  { id: 'transient', label: 'Radio Transients', zone: 'Distant Region', x: 69, y: 82, status: 'locked', detail: 'FRBs, radio bursts, localisation, and host environments.' },
  { id: 'cosmo', label: '21 cm Cosmology', zone: 'Distant Region', x: 88, y: 27, status: 'locked', detail: 'Cosmic dawn, reionisation, and intensity mapping.' },
]
export const mapEdges = [['foundation','radio'], ['radio','instrument'], ['radio','hi'], ['instrument','hi-science'], ['hi','hi-science'], ['hi','pulsar'], ['pulsar','transient'], ['hi-science','cosmo']]

export const skillBranches = [
  { name: 'FOUNDATION / CORE TOOLS', skills: [
    { name: 'Python', level: 3, status: 'mastered', proof: 'Run and modify analysis code' }, { name: 'Linux', level: 3, status: 'mastered', proof: 'Command line and file management' },
    { name: 'Git', level: 2, status: 'available', proof: 'Project version control' }, { name: 'Research Log', level: 3, status: 'available', proof: 'Structured LaTeX research notes' }, ] },
  { name: 'DATA / DATA LANGUAGE', skills: [
    { name: 'FITS & Data Structure', level: 3, status: 'mastered', proof: 'Inspect supplied data structures' }, { name: 'Data Processing', level: 2, status: 'current', proof: 'Maintain traceable derived products' },
    { name: 'Data Review', level: 1, status: 'current', proof: 'Record quality checks and anomalies' }, { name: 'Quality Control', level: 2, status: 'mastered', proof: 'Keep data-quality decisions explicit' }, ] },
  { name: 'H I SCIENCE / NEUTRAL HYDROGEN', skills: [
    { name: 'FAST Data Basics', level: 2, status: 'mastered', proof: 'Understand the public scientific context' }, { name: 'Diagnostic Figures', level: 1, status: 'current', proof: 'Turn processing checks into inspectable figures' },
    { name: 'Validated Results', level: 0, status: 'locked', proof: 'Requires approved research outputs' }, { name: 'Scientific Interpretation', level: 0, status: 'locked', proof: 'Requires validated results' }, ] },
  { name: 'RESEARCH / INDEPENDENT RESEARCH', skills: [
    { name: 'Literature Navigation', level: 2, status: 'mastered', proof: 'Organized public background reading' }, { name: 'Figure Reproduction', level: 0, status: 'current', proof: 'Q-03 in progress' },
    { name: 'Question Design', level: 0, status: 'locked', proof: 'Unlock after the literature map' }, { name: 'Paper Narrative', level: 0, status: 'locked', proof: 'Unlock after an independent project' }, ] },
]

export const milestones = [
  { date: '2026.07', title: 'Entered the Radio Map', note: 'Shifted the research direction to H I and radio astronomy', state: 'complete' },
  { date: '2026.08', title: 'Process FAST Data', note: 'Review data quality and maintain a private, reproducible research record', state: 'current' },
  { date: 'NEXT', title: 'Prepare an Approved Result', note: 'Move from private processing notes to an approved scientific output', state: 'next' },
  { date: 'LATER', title: 'Define the Science Question', note: 'Produce and discuss a one-page question canvas', state: 'locked' },
  { date: 'BOSS', title: 'First First-Author Paper', note: 'Research, writing, submission, and revision', state: 'locked' },
]
