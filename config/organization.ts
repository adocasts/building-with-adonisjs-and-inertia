export const activeCookieName = 'active_organization'

export const defaults = {
  accessLevel: [
    {
      name: 'Free',
      color: '#6ee7b7',
      isDefault: true,
      order: 0,
    },
    {
      name: 'Paid',
      color: '#67e8f9',
      order: 1,
    },
  ],
  difficulties: [
    {
      name: 'Easy',
      color: '#6ee7b7',
      isDefault: true,
      order: 0,
    },
    {
      name: 'Medium',
      color: '#67e8f9',
      order: 1,
    },
    {
      name: 'Hard',
      color: '#a5b4fc',
      order: 2,
    },
    {
      name: 'Expert',
      color: '#f0abfc',
      order: 3,
    },
  ],
  statuses: [
    {
      name: 'Not Started',
      color: '#cbd5e1',
      isDefault: true,
      order: 0,
    },
    {
      name: 'Planned',
      color: '#f0abfc',
      order: 1,
    },
    {
      name: 'Recorded',
      color: '#a5b4fc',
      order: 2,
    },
    {
      name: 'Edited',
      color: '#67e8f9',
      order: 3,
    },
    {
      name: 'Done',
      color: '#6ee7b7',
      order: 4,
    },
  ],
}
