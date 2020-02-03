export default {
  byId: {},
  createTask: {
    dayId: '',
    sectionId: '',
    loading: false,
  },
  selected: '',
};

export const tasksFixture = {
  createTask: {
    dayId: '5c7c2acdd21c2eb57ee8d1b4',
    sectionId: '5c7c2bc8085e7eb5a275d0c9',
    loading: false,
  },
  byId: {
    '5c7c2acdd21c2eb57ee8d1b4': {
      title: 'This is the task title',
      notes: '',
      time: 0,
    },
    '5c7c2aacd21c2eb57ee8d1ad': {
      title: 'This is another task title',
      notes: '',
      time: 0,
    },
  },
  selected: '5c7c2acdd21c2eb57ee8d1b4',
};
