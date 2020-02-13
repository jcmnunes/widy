declare module '@meanie/mongoose-to-json' {
  function toJson(): void;
  export = toJson;
}

declare module 'mongoose-mongodb-errors' {
  function mongodbErrorHandler(): void;
  export = mongodbErrorHandler;
}
