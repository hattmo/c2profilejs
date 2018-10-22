

const transform = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^(append ".+"|prepend ".+"|base64|base64url|mask|netbios|netbiosu)$',
  },
};

const termination = {
  type: 'string',
  pattern: '^(header ".+"|parameter ".+"|print|uri-append)$',
};

const options = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: false,
    properties: {
      key: {
        type: 'string',
      },
      value: {
        type: 'string',
      },
    },
  },
};

const mutation = {
  type: 'object',
  additionalProperties: false,
  required: ['termination'],
  properties: {
    transform,
    termination,
  },
};

const schema = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      pattern: '^\\w+$',
      maxLength: 250,
    },
    globaloptions: options,
    httpget: {
      type: 'object',
      additionalProperties: false,
      properties: {
        uri: {
          type: 'string',
        },
        verb: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        },
        client: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: options,
            parameter: options,
            metadata: mutation,
          },
        },
        server: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: options,
            parameter: options,
            output: mutation,
          },
        },
      },
    },
    httppost: {
      type: 'object',
      additionalProperties: false,
      properties: {
        uri: {
          type: 'string',
        },
        verb: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        },
        client: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: options,
            parameter: options,
            id: mutation,
            output: mutation,
          },
        },
        server: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: options,
            parameter: options,
            output: mutation,
          },
        },
      },
    },
    httpstager: {
      type: 'object',
      additionalProperties: false,
      properties: {
        uri_x86: {
          type: 'string',
        },
        uri_x64: {
          type: 'string',
        },
        server: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: options,
            parameter: options,
            output: mutation,
          },
        },
      },
    },
  },
};


module.exports = schema;
