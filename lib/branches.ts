// ─────────────────────────────────────────────────────────────
// TASA branch directory
//
// Branches marked `// sample` were placeholders drawn from institutions
// already referenced on the site — confirm or remove them. The rest were
// supplied by TASA. Fill in each officer's details as they are confirmed;
// leave a field out and the site shows "To be confirmed".
//
// When the database is provisioned this file can be swapped for a
// Prisma query (see .claude/docs/DATABASE_SCHEMA.md → branches).
// ─────────────────────────────────────────────────────────────

export type OfficerRole = 'Chairperson' | 'Secretary' | 'PRO';

export type Officer = {
  role: OfficerRole;
  name?: string;
  phone?: string; // e.g. '+27 81 234 5678'
  email?: string;
};

export type BranchType = 'University' | 'College' | 'High School' | 'International';

export type Branch = {
  slug: string; // URL: /branches/<slug>
  name: string; // e.g. 'TASA UWC'
  institution: string;
  type: BranchType;
  province: Province;
  city?: string; // campus town; omit if not confirmed
  email?: string; // branch inbox, if any
  meeting?: { day: string; time: string; venue: string };
  officers: Officer[];
};

export const provinces = [
  'Western Cape',
  'Gauteng',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Free State',
  'Northern Cape',
  'International',
] as const;

export type Province = (typeof provinces)[number];

/** The three officers every branch lists, in display order. */
export const officerRoles: { role: OfficerRole; title: string }[] = [
  { role: 'Chairperson', title: 'Chairperson' },
  { role: 'Secretary', title: 'Secretary' },
  { role: 'PRO', title: "Public Relations Officer (PRO)" },
];

const tbc = (): Officer[] => officerRoles.map(({ role }) => ({ role }));

const b = (
  slug: string,
  name: string,
  institution: string,
  province: Province,
  city?: string,
  type: BranchType = 'University'
): Branch => ({ slug, name, institution, type, province, city, officers: tbc() });

export const branches: Branch[] = [
  // Western Cape
  b('uwc', 'TASA UWC', 'University of the Western Cape', 'Western Cape', 'Bellville'), // sample
  b('cput', 'TASA CPUT', 'Cape Peninsula University of Technology', 'Western Cape', 'Cape Town'), // sample

  // Gauteng
  b('up', 'TASA UP', 'University of Pretoria', 'Gauteng', 'Pretoria'),
  b('tut-soshanguve-north', 'TASA TUT Soshanguve North', 'Tshwane University of Technology — Soshanguve North Campus', 'Gauteng', 'Soshanguve'),
  b('tut-soshanguve-south', 'TASA TUT Soshanguve South', 'Tshwane University of Technology — Soshanguve South Campus', 'Gauteng', 'Soshanguve'),
  b('tut-pretoria', 'TASA TUT Pretoria', 'Tshwane University of Technology — Pretoria Main Campus', 'Gauteng', 'Pretoria'),
  b('tut-arcadia', 'TASA TUT Arcadia', 'Tshwane University of Technology — Arcadia Campus', 'Gauteng', 'Pretoria'),
  b('vut', 'TASA VUT', 'Vaal University of Technology', 'Gauteng', 'Vanderbijlpark'),
  b('uj', 'TASA UJ', 'University of Johannesburg', 'Gauteng', 'Auckland Park'), // sample
  b('unisa', 'TASA UNISA', 'University of South Africa', 'Gauteng', 'Pretoria'), // sample

  // KwaZulu-Natal
  b('ukzn-westville', 'TASA UKZN Westville', 'University of KwaZulu-Natal, Westville Campus', 'KwaZulu-Natal', 'Durban'), // sample

  // Eastern Cape
  b('nmu', 'TASA NMU', 'Nelson Mandela University', 'Eastern Cape'),
  b('wsu', 'TASA WSU', 'Walter Sisulu University', 'Eastern Cape'),

  // Limpopo
  b('ul', 'TASA UL', 'University of Limpopo', 'Limpopo'),

  // Mpumalanga
  b('tut-emalahleni', 'TASA TUT eMalahleni', 'Tshwane University of Technology — eMalahleni Campus', 'Mpumalanga', 'eMalahleni (Witbank)'),
  b('tut-mbombela', 'TASA TUT Mbombela', 'Tshwane University of Technology — Mbombela Campus', 'Mpumalanga', 'Mbombela'),
  b('ump', 'TASA UMP', 'University of Mpumalanga', 'Mpumalanga', 'Mbombela'), // sample

  // North West
  b('nwu', 'TASA NWU', 'North-West University', 'North West'),

  // Free State
  b('ufs', 'TASA UFS', 'University of the Free State', 'Free State'),

  // International
  b('lesotho', 'TASA Lesotho', 'Kingdom of Lesotho', 'International', 'Lesotho', 'International'),
];

/* ── Helpers ─────────────────────────────────────────────── */

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}

export function branchesIn(province: Province) {
  return branches.filter((b) => b.province === province).sort((a, b) => a.name.localeCompare(b.name));
}

/** Officer for a role, always returned (empty details if not yet captured). */
export function officer(branch: Branch, role: OfficerRole): Officer {
  return branch.officers.find((o) => o.role === role) ?? { role };
}
