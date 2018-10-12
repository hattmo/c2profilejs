

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

const headparam = {
  type: 'array',
  items: {
    type: 'string',
    pattern: '^".+" ".+"$',
  },
};

const mutation = {
  type: 'object',
  additionalProperties: false,
  properties: {
    transform,
    termination,
  },
};

const schema = {
  type: 'object',
  additionalProperties: false,
  properties: {
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
            header: headparam,
            parameter: headparam,
            metadata: mutation,
          },
        },
        server: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: headparam,
            parameter: headparam,
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
            header: headparam,
            parameter: headparam,
            id: mutation,
            output: mutation,
          },
        },
        server: {
          type: 'object',
          additionalProperties: false,
          properties: {
            header: headparam,
            parameter: headparam,
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
            header: headparam,
            parameter: headparam,
            output: mutation,
          },
        },
      },
    },
  },
};


module.exports = schema;
