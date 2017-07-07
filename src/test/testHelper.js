export const document = {
  id: 2,
  title: 'pigs is pigs',
  content: 'pigs are great',
  access: 0,
  ownerId: 1,
  User: { firstname: 'mai', lastname: 'mai' },
  createdAt: '2017-07-06T04:57:21.797Z'
}

export const documents = [{
    title: 'test',
    content: 'test',
    access: 0,
    ownerId: 20,
    User: { firstName: 'mai', lastName: 'iles' }
  },
  {
    title: 'test',
    content: 'test',
    access: 0,
    ownerId: 20,
    User: { firstName: 'dami', lastName: 'peju' }
  }
];

export const manageDocument = {
    title: 'doc1',
    content: 'content',
    ownerId: 1,
    access: -1,
    id: 1,
    User: { firstname: 'mai', lastname: 'mai' },
    createdAt: '2017-07-06T04:57:21.797Z'
  };
export const manageDocument1 = {
    title: 'doc1',
    content: 'content',
    ownerId: 5,
    access: 0,
    id: 1,
    User: { firstname: 'mai', lastname: 'mai' },
    createdAt: '2017-07-06T04:57:21.797Z'
  };

export const noDocument = { title: '', content: '', access: '' };

export const documents2 = {
  documents: [
    { title: 'doc1', content: 'content', id: 1, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc2', content: 'content', id: 2, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc3', content: 'content', id: 31, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 4, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc3', content: 'content', id: 5, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 6, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc3', content: 'content', id: 7, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 8, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 9, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 10, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 11, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 12, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc3', content: 'content', id: 13, User: { firstname: 'mai', lastname: 'mai' } },
    { title: 'doc4', content: 'content', id: 14, User: { firstname: 'mai', lastname: 'mai' } }
  ],
  metaData: {
    'totalCount': 14,
    'pages': 2,
    'currentPage': 1,
    'pageSize': 12
    }
};

export const search = {
  query: '',
  access: '',
  limit: 1,
  offset: 1
};

export const metaData = { pageCount: 3, currentPage: 10 };

export const user = {
  id: 1,
  firstname: 'dami',
  lastname: 'dami',
  username: 'dami',
  password: 'dami',
  email: 'dami@dami.com',
  Role: { title: 'Admin' }
};
export const allUsers = {
  users: [
    { username: 'mai', id: 1, email: 'a@a.c', Role: { title: 'Admin' } },
    { username: 'ade', id: 2, email: 'b@b.c' },
    { username: 'tom', id: 3, email: 'c@c.c' },
    { username: 'hope', id: 4, email: 'd@d.c' }
  ],
  metaData: {
    'totalCount': 4,
    'pages': 2,
    'currentPage': 1,
    'pageSize': 2
    }
};
export const users = [
  {
    id: 1,
    firstname: 'mai',
    lastname: 'mai',
    username: 'mai',
    email: 'mai@mai.com',
    password: 'mai',
    Role: { title: 'Admin' }
  },
  {
    firstname: 'peju',
    lastname: 'peju',
    username: 'peju',
    email: 'peju@peju.com',
    password: 'peju'
  }
];
export const authUser = { id: 1, roleId: 1, expiresIn: '1hr', iat: 1498921548 };
export const authUser2 = { id: 2, roleId: 2, expiresIn: '1hr', iat: 1498921549 };
export const noUser = { id: '', roleId: '', expiresIn: '', iat: '' };
