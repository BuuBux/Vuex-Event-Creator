import { UserState } from '@/types/StateTyping';

const state: UserState = {
  user: { id: 'abc123', name: 'Adam Jahr' },
  registeredUsers: [
    {
      id: 'abc123',
      name: 'Adam Jahr',
    },
    {
      id: 'def456',
      name: 'Gregg Pollack',
    },
    {
      id: 'ghi789',
      name: 'Beth Swanson',
    },
    {
      id: 'jkl101',
      name: 'Mary Gordon',
    },
  ],
};

export default state;
