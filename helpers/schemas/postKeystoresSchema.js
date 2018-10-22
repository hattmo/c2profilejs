const schema = {
  type: 'object',
  required: ['keystore', 'opt'],
  additionalProperties: false,
  properties: {
    keystore: {
      type: 'object',
      required: ['alias', 'password', 'id'],
      additionalProperties: false,
      properties: {
        alias: {
          type: 'string',
          pattern: '^\\w+$',
          maxLength: 250,
        },
        password: {
          type: 'string',
          pattern: '^\\w+$',
          minLength: 6,
          maxLength: 250,
        },
        id: {
          type: 'string',
          pattern: '^\\w+$',
          maxLength: 250,
        },
      },
    },
    opt: {
      type: 'object',
      required: ['dname'],
      additionalProperties: false,
      properties: {
        dname: {
          type: 'string',
          pattern: '^(((CN)|(OU)|O|L|S|C)=(\\w|\\.)+, )*(((CN)|(OU)|O|L|S|C)=(\\w|\\.)+)$',
          maxLength: 250,
        },
      },
    },
    ca: {
      type: 'string',
      pattern: '^\\w+$',
      maxLength: 250,
    },
  },
};

module.exports = schema;
