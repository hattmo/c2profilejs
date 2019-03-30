const schema = {
  type: "object",
  required: ["keystore"],
  additionalProperties: false,
  properties: {
    keystore: {
      type: "object",
      required: ["alias", "password", "id"],
      additionalProperties: false,
      properties: {
        alias: {
          type: "string",
          pattern: "^\\w+$",
          maxLength: 250,
        },
        password: {
          type: "string",
          pattern: "^\\w+$",
          minLength: 6,
          maxLength: 250,
        },
        id: {
          type: "string",
          pattern: "^\\w+$",
          maxLength: 250,
        },
      },
    },
    opt: {
      type: "object",
      additionalProperties: false,
      properties: {
        dname: {
          type: "array",
          items: {
            type: "object",
            required: ["key", "value"],
            properties: {
              additionalProperties: false,
              key: {
                type: "string",
                pattern: "^\\w+$",
                maxLength: 250,
              },
              value: {
                type: "string",
                pattern: "^(\\w|\\.)+$",
                maxLength: 250,
              },
            },
          },
        },
      },
    },
    ca: {
      type: "string",
      pattern: "^\\w+$",
      maxLength: 250,
    },
  },
};

export default schema;
