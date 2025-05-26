
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Email
 * 
 */
export type Email = $Result.DefaultSelection<Prisma.$EmailPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model KeyInformation
 * 
 */
export type KeyInformation = $Result.DefaultSelection<Prisma.$KeyInformationPayload>
/**
 * Model LinkOrAttachment
 * 
 */
export type LinkOrAttachment = $Result.DefaultSelection<Prisma.$LinkOrAttachmentPayload>
/**
 * Model TaskLog
 * 
 */
export type TaskLog = $Result.DefaultSelection<Prisma.$TaskLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TaskStatus: {
  todo: 'todo',
  in_progress: 'in_progress',
  complete: 'complete'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const Urgency: {
  low: 'low',
  medium: 'medium',
  high: 'high'
};

export type Urgency = (typeof Urgency)[keyof typeof Urgency]


export const EmailCategory: {
  Academic_Classes: 'Academic_Classes',
  Clubs_Extracurriculars: 'Clubs_Extracurriculars',
  Recruiting_Career: 'Recruiting_Career',
  University_Administration: 'University_Administration',
  Social_Events: 'Social_Events',
  Work_Internship: 'Work_Internship',
  Personal_Finance: 'Personal_Finance',
  General_Announcement: 'General_Announcement',
  Other: 'Other'
};

export type EmailCategory = (typeof EmailCategory)[keyof typeof EmailCategory]


export const EmailStatus: {
  pending: 'pending',
  processed: 'processed',
  error: 'error'
};

export type EmailStatus = (typeof EmailStatus)[keyof typeof EmailStatus]

}

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type Urgency = $Enums.Urgency

export const Urgency: typeof $Enums.Urgency

export type EmailCategory = $Enums.EmailCategory

export const EmailCategory: typeof $Enums.EmailCategory

export type EmailStatus = $Enums.EmailStatus

export const EmailStatus: typeof $Enums.EmailStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.email`: Exposes CRUD operations for the **Email** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Emails
    * const emails = await prisma.email.findMany()
    * ```
    */
  get email(): Prisma.EmailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.keyInformation`: Exposes CRUD operations for the **KeyInformation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KeyInformations
    * const keyInformations = await prisma.keyInformation.findMany()
    * ```
    */
  get keyInformation(): Prisma.KeyInformationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.linkOrAttachment`: Exposes CRUD operations for the **LinkOrAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LinkOrAttachments
    * const linkOrAttachments = await prisma.linkOrAttachment.findMany()
    * ```
    */
  get linkOrAttachment(): Prisma.LinkOrAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.taskLog`: Exposes CRUD operations for the **TaskLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskLogs
    * const taskLogs = await prisma.taskLog.findMany()
    * ```
    */
  get taskLog(): Prisma.TaskLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Email: 'Email',
    Task: 'Task',
    Event: 'Event',
    KeyInformation: 'KeyInformation',
    LinkOrAttachment: 'LinkOrAttachment',
    TaskLog: 'TaskLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "email" | "task" | "event" | "keyInformation" | "linkOrAttachment" | "taskLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Email: {
        payload: Prisma.$EmailPayload<ExtArgs>
        fields: Prisma.EmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findFirst: {
            args: Prisma.EmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          findMany: {
            args: Prisma.EmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          create: {
            args: Prisma.EmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          createMany: {
            args: Prisma.EmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          delete: {
            args: Prisma.EmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          update: {
            args: Prisma.EmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          deleteMany: {
            args: Prisma.EmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>[]
          }
          upsert: {
            args: Prisma.EmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmailPayload>
          }
          aggregate: {
            args: Prisma.EmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmail>
          }
          groupBy: {
            args: Prisma.EmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmailCountArgs<ExtArgs>
            result: $Utils.Optional<EmailCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      KeyInformation: {
        payload: Prisma.$KeyInformationPayload<ExtArgs>
        fields: Prisma.KeyInformationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KeyInformationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KeyInformationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>
          }
          findFirst: {
            args: Prisma.KeyInformationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KeyInformationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>
          }
          findMany: {
            args: Prisma.KeyInformationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>[]
          }
          create: {
            args: Prisma.KeyInformationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>
          }
          createMany: {
            args: Prisma.KeyInformationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KeyInformationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>[]
          }
          delete: {
            args: Prisma.KeyInformationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>
          }
          update: {
            args: Prisma.KeyInformationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>
          }
          deleteMany: {
            args: Prisma.KeyInformationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KeyInformationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KeyInformationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>[]
          }
          upsert: {
            args: Prisma.KeyInformationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KeyInformationPayload>
          }
          aggregate: {
            args: Prisma.KeyInformationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKeyInformation>
          }
          groupBy: {
            args: Prisma.KeyInformationGroupByArgs<ExtArgs>
            result: $Utils.Optional<KeyInformationGroupByOutputType>[]
          }
          count: {
            args: Prisma.KeyInformationCountArgs<ExtArgs>
            result: $Utils.Optional<KeyInformationCountAggregateOutputType> | number
          }
        }
      }
      LinkOrAttachment: {
        payload: Prisma.$LinkOrAttachmentPayload<ExtArgs>
        fields: Prisma.LinkOrAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkOrAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkOrAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>
          }
          findFirst: {
            args: Prisma.LinkOrAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkOrAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>
          }
          findMany: {
            args: Prisma.LinkOrAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>[]
          }
          create: {
            args: Prisma.LinkOrAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>
          }
          createMany: {
            args: Prisma.LinkOrAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkOrAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>[]
          }
          delete: {
            args: Prisma.LinkOrAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>
          }
          update: {
            args: Prisma.LinkOrAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.LinkOrAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkOrAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkOrAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.LinkOrAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkOrAttachmentPayload>
          }
          aggregate: {
            args: Prisma.LinkOrAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLinkOrAttachment>
          }
          groupBy: {
            args: Prisma.LinkOrAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkOrAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkOrAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<LinkOrAttachmentCountAggregateOutputType> | number
          }
        }
      }
      TaskLog: {
        payload: Prisma.$TaskLogPayload<ExtArgs>
        fields: Prisma.TaskLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findFirst: {
            args: Prisma.TaskLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findMany: {
            args: Prisma.TaskLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          create: {
            args: Prisma.TaskLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          createMany: {
            args: Prisma.TaskLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          delete: {
            args: Prisma.TaskLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          update: {
            args: Prisma.TaskLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          deleteMany: {
            args: Prisma.TaskLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          upsert: {
            args: Prisma.TaskLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          aggregate: {
            args: Prisma.TaskLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskLog>
          }
          groupBy: {
            args: Prisma.TaskLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskLogCountArgs<ExtArgs>
            result: $Utils.Optional<TaskLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    email?: EmailOmit
    task?: TaskOmit
    event?: EventOmit
    keyInformation?: KeyInformationOmit
    linkOrAttachment?: LinkOrAttachmentOmit
    taskLog?: TaskLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    emails: number
    tasks: number
    events: number
    keyInfo: number
    taskLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | UserCountOutputTypeCountEmailsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    events?: boolean | UserCountOutputTypeCountEventsArgs
    keyInfo?: boolean | UserCountOutputTypeCountKeyInfoArgs
    taskLogs?: boolean | UserCountOutputTypeCountTaskLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountKeyInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeyInformationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }


  /**
   * Count Type EmailCountOutputType
   */

  export type EmailCountOutputType = {
    tasks: number
    taskLogs: number
    events: number
    keyInformation: number
  }

  export type EmailCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | EmailCountOutputTypeCountTasksArgs
    taskLogs?: boolean | EmailCountOutputTypeCountTaskLogsArgs
    events?: boolean | EmailCountOutputTypeCountEventsArgs
    keyInformation?: boolean | EmailCountOutputTypeCountKeyInformationArgs
  }

  // Custom InputTypes
  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmailCountOutputType
     */
    select?: EmailCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeCountTaskLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }

  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * EmailCountOutputType without action
   */
  export type EmailCountOutputTypeCountKeyInformationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeyInformationWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    linksOrAttachments: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    linksOrAttachments?: boolean | TaskCountOutputTypeCountLinksOrAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountLinksOrAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkOrAttachmentWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    linksOrAttachments: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    linksOrAttachments?: boolean | EventCountOutputTypeCountLinksOrAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountLinksOrAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkOrAttachmentWhereInput
  }


  /**
   * Count Type KeyInformationCountOutputType
   */

  export type KeyInformationCountOutputType = {
    linksOrAttachments: number
  }

  export type KeyInformationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    linksOrAttachments?: boolean | KeyInformationCountOutputTypeCountLinksOrAttachmentsArgs
  }

  // Custom InputTypes
  /**
   * KeyInformationCountOutputType without action
   */
  export type KeyInformationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformationCountOutputType
     */
    select?: KeyInformationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KeyInformationCountOutputType without action
   */
  export type KeyInformationCountOutputTypeCountLinksOrAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkOrAttachmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    forwardingemail: string | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    forwardingemail: string | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    forwardingemail: number
    created_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    forwardingemail?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    forwardingemail?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    forwardingemail?: true
    created_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    forwardingemail: string
    created_at: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    forwardingemail?: boolean
    created_at?: boolean
    emails?: boolean | User$emailsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    keyInfo?: boolean | User$keyInfoArgs<ExtArgs>
    taskLogs?: boolean | User$taskLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    forwardingemail?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    forwardingemail?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    forwardingemail?: boolean
    created_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "forwardingemail" | "created_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | User$emailsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    keyInfo?: boolean | User$keyInfoArgs<ExtArgs>
    taskLogs?: boolean | User$taskLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      emails: Prisma.$EmailPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
      keyInfo: Prisma.$KeyInformationPayload<ExtArgs>[]
      taskLogs: Prisma.$TaskLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      forwardingemail: string
      created_at: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emails<T extends User$emailsArgs<ExtArgs> = {}>(args?: Subset<T, User$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    keyInfo<T extends User$keyInfoArgs<ExtArgs> = {}>(args?: Subset<T, User$keyInfoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    taskLogs<T extends User$taskLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$taskLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly forwardingemail: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.emails
   */
  export type User$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    cursor?: EmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.keyInfo
   */
  export type User$keyInfoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    where?: KeyInformationWhereInput
    orderBy?: KeyInformationOrderByWithRelationInput | KeyInformationOrderByWithRelationInput[]
    cursor?: KeyInformationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KeyInformationScalarFieldEnum | KeyInformationScalarFieldEnum[]
  }

  /**
   * User.taskLogs
   */
  export type User$taskLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Email
   */

  export type AggregateEmail = {
    _count: EmailCountAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  export type EmailMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fromEmail: string | null
    originalSubject: string | null
    summary: string | null
    category: $Enums.EmailCategory | null
    status: $Enums.EmailStatus | null
    originalReceivedAt: Date | null
    processedAt: Date | null
  }

  export type EmailMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fromEmail: string | null
    originalSubject: string | null
    summary: string | null
    category: $Enums.EmailCategory | null
    status: $Enums.EmailStatus | null
    originalReceivedAt: Date | null
    processedAt: Date | null
  }

  export type EmailCountAggregateOutputType = {
    id: number
    userId: number
    fromEmail: number
    originalSubject: number
    summary: number
    category: number
    status: number
    originalReceivedAt: number
    processedAt: number
    _all: number
  }


  export type EmailMinAggregateInputType = {
    id?: true
    userId?: true
    fromEmail?: true
    originalSubject?: true
    summary?: true
    category?: true
    status?: true
    originalReceivedAt?: true
    processedAt?: true
  }

  export type EmailMaxAggregateInputType = {
    id?: true
    userId?: true
    fromEmail?: true
    originalSubject?: true
    summary?: true
    category?: true
    status?: true
    originalReceivedAt?: true
    processedAt?: true
  }

  export type EmailCountAggregateInputType = {
    id?: true
    userId?: true
    fromEmail?: true
    originalSubject?: true
    summary?: true
    category?: true
    status?: true
    originalReceivedAt?: true
    processedAt?: true
    _all?: true
  }

  export type EmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Email to aggregate.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Emails
    **/
    _count?: true | EmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmailMaxAggregateInputType
  }

  export type GetEmailAggregateType<T extends EmailAggregateArgs> = {
        [P in keyof T & keyof AggregateEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmail[P]>
      : GetScalarType<T[P], AggregateEmail[P]>
  }




  export type EmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmailWhereInput
    orderBy?: EmailOrderByWithAggregationInput | EmailOrderByWithAggregationInput[]
    by: EmailScalarFieldEnum[] | EmailScalarFieldEnum
    having?: EmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmailCountAggregateInputType | true
    _min?: EmailMinAggregateInputType
    _max?: EmailMaxAggregateInputType
  }

  export type EmailGroupByOutputType = {
    id: string
    userId: string
    fromEmail: string | null
    originalSubject: string | null
    summary: string | null
    category: $Enums.EmailCategory | null
    status: $Enums.EmailStatus | null
    originalReceivedAt: Date | null
    processedAt: Date
    _count: EmailCountAggregateOutputType | null
    _min: EmailMinAggregateOutputType | null
    _max: EmailMaxAggregateOutputType | null
  }

  type GetEmailGroupByPayload<T extends EmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmailGroupByOutputType[P]>
            : GetScalarType<T[P], EmailGroupByOutputType[P]>
        }
      >
    >


  export type EmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromEmail?: boolean
    originalSubject?: boolean
    summary?: boolean
    category?: boolean
    status?: boolean
    originalReceivedAt?: boolean
    processedAt?: boolean
    tasks?: boolean | Email$tasksArgs<ExtArgs>
    taskLogs?: boolean | Email$taskLogsArgs<ExtArgs>
    events?: boolean | Email$eventsArgs<ExtArgs>
    keyInformation?: boolean | Email$keyInformationArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | EmailCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromEmail?: boolean
    originalSubject?: boolean
    summary?: boolean
    category?: boolean
    status?: boolean
    originalReceivedAt?: boolean
    processedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fromEmail?: boolean
    originalSubject?: boolean
    summary?: boolean
    category?: boolean
    status?: boolean
    originalReceivedAt?: boolean
    processedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["email"]>

  export type EmailSelectScalar = {
    id?: boolean
    userId?: boolean
    fromEmail?: boolean
    originalSubject?: boolean
    summary?: boolean
    category?: boolean
    status?: boolean
    originalReceivedAt?: boolean
    processedAt?: boolean
  }

  export type EmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fromEmail" | "originalSubject" | "summary" | "category" | "status" | "originalReceivedAt" | "processedAt", ExtArgs["result"]["email"]>
  export type EmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Email$tasksArgs<ExtArgs>
    taskLogs?: boolean | Email$taskLogsArgs<ExtArgs>
    events?: boolean | Email$eventsArgs<ExtArgs>
    keyInformation?: boolean | Email$keyInformationArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | EmailCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EmailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Email"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      taskLogs: Prisma.$TaskLogPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
      keyInformation: Prisma.$KeyInformationPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fromEmail: string | null
      originalSubject: string | null
      summary: string | null
      category: $Enums.EmailCategory | null
      status: $Enums.EmailStatus | null
      originalReceivedAt: Date | null
      processedAt: Date
    }, ExtArgs["result"]["email"]>
    composites: {}
  }

  type EmailGetPayload<S extends boolean | null | undefined | EmailDefaultArgs> = $Result.GetResult<Prisma.$EmailPayload, S>

  type EmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmailCountAggregateInputType | true
    }

  export interface EmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Email'], meta: { name: 'Email' } }
    /**
     * Find zero or one Email that matches the filter.
     * @param {EmailFindUniqueArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmailFindUniqueArgs>(args: SelectSubset<T, EmailFindUniqueArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Email that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmailFindUniqueOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmailFindUniqueOrThrowArgs>(args: SelectSubset<T, EmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmailFindFirstArgs>(args?: SelectSubset<T, EmailFindFirstArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Email that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindFirstOrThrowArgs} args - Arguments to find a Email
     * @example
     * // Get one Email
     * const email = await prisma.email.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmailFindFirstOrThrowArgs>(args?: SelectSubset<T, EmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Emails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Emails
     * const emails = await prisma.email.findMany()
     * 
     * // Get first 10 Emails
     * const emails = await prisma.email.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const emailWithIdOnly = await prisma.email.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmailFindManyArgs>(args?: SelectSubset<T, EmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Email.
     * @param {EmailCreateArgs} args - Arguments to create a Email.
     * @example
     * // Create one Email
     * const Email = await prisma.email.create({
     *   data: {
     *     // ... data to create a Email
     *   }
     * })
     * 
     */
    create<T extends EmailCreateArgs>(args: SelectSubset<T, EmailCreateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Emails.
     * @param {EmailCreateManyArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmailCreateManyArgs>(args?: SelectSubset<T, EmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Emails and returns the data saved in the database.
     * @param {EmailCreateManyAndReturnArgs} args - Arguments to create many Emails.
     * @example
     * // Create many Emails
     * const email = await prisma.email.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmailCreateManyAndReturnArgs>(args?: SelectSubset<T, EmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Email.
     * @param {EmailDeleteArgs} args - Arguments to delete one Email.
     * @example
     * // Delete one Email
     * const Email = await prisma.email.delete({
     *   where: {
     *     // ... filter to delete one Email
     *   }
     * })
     * 
     */
    delete<T extends EmailDeleteArgs>(args: SelectSubset<T, EmailDeleteArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Email.
     * @param {EmailUpdateArgs} args - Arguments to update one Email.
     * @example
     * // Update one Email
     * const email = await prisma.email.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmailUpdateArgs>(args: SelectSubset<T, EmailUpdateArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Emails.
     * @param {EmailDeleteManyArgs} args - Arguments to filter Emails to delete.
     * @example
     * // Delete a few Emails
     * const { count } = await prisma.email.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmailDeleteManyArgs>(args?: SelectSubset<T, EmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmailUpdateManyArgs>(args: SelectSubset<T, EmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Emails and returns the data updated in the database.
     * @param {EmailUpdateManyAndReturnArgs} args - Arguments to update many Emails.
     * @example
     * // Update many Emails
     * const email = await prisma.email.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Emails and only return the `id`
     * const emailWithIdOnly = await prisma.email.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmailUpdateManyAndReturnArgs>(args: SelectSubset<T, EmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Email.
     * @param {EmailUpsertArgs} args - Arguments to update or create a Email.
     * @example
     * // Update or create a Email
     * const email = await prisma.email.upsert({
     *   create: {
     *     // ... data to create a Email
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Email we want to update
     *   }
     * })
     */
    upsert<T extends EmailUpsertArgs>(args: SelectSubset<T, EmailUpsertArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Emails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailCountArgs} args - Arguments to filter Emails to count.
     * @example
     * // Count the number of Emails
     * const count = await prisma.email.count({
     *   where: {
     *     // ... the filter for the Emails we want to count
     *   }
     * })
    **/
    count<T extends EmailCountArgs>(
      args?: Subset<T, EmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmailAggregateArgs>(args: Subset<T, EmailAggregateArgs>): Prisma.PrismaPromise<GetEmailAggregateType<T>>

    /**
     * Group by Email.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmailGroupByArgs['orderBy'] }
        : { orderBy?: EmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Email model
   */
  readonly fields: EmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Email.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Email$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Email$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    taskLogs<T extends Email$taskLogsArgs<ExtArgs> = {}>(args?: Subset<T, Email$taskLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Email$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Email$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    keyInformation<T extends Email$keyInformationArgs<ExtArgs> = {}>(args?: Subset<T, Email$keyInformationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Email model
   */
  interface EmailFieldRefs {
    readonly id: FieldRef<"Email", 'String'>
    readonly userId: FieldRef<"Email", 'String'>
    readonly fromEmail: FieldRef<"Email", 'String'>
    readonly originalSubject: FieldRef<"Email", 'String'>
    readonly summary: FieldRef<"Email", 'String'>
    readonly category: FieldRef<"Email", 'EmailCategory'>
    readonly status: FieldRef<"Email", 'EmailStatus'>
    readonly originalReceivedAt: FieldRef<"Email", 'DateTime'>
    readonly processedAt: FieldRef<"Email", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Email findUnique
   */
  export type EmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findUniqueOrThrow
   */
  export type EmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email findFirst
   */
  export type EmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findFirstOrThrow
   */
  export type EmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Email to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Emails.
     */
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email findMany
   */
  export type EmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter, which Emails to fetch.
     */
    where?: EmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Emails to fetch.
     */
    orderBy?: EmailOrderByWithRelationInput | EmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Emails.
     */
    cursor?: EmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Emails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Emails.
     */
    skip?: number
    distinct?: EmailScalarFieldEnum | EmailScalarFieldEnum[]
  }

  /**
   * Email create
   */
  export type EmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to create a Email.
     */
    data: XOR<EmailCreateInput, EmailUncheckedCreateInput>
  }

  /**
   * Email createMany
   */
  export type EmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Email createManyAndReturn
   */
  export type EmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to create many Emails.
     */
    data: EmailCreateManyInput | EmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email update
   */
  export type EmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The data needed to update a Email.
     */
    data: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
    /**
     * Choose, which Email to update.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email updateMany
   */
  export type EmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
  }

  /**
   * Email updateManyAndReturn
   */
  export type EmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * The data used to update Emails.
     */
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyInput>
    /**
     * Filter which Emails to update
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Email upsert
   */
  export type EmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * The filter to search for the Email to update in case it exists.
     */
    where: EmailWhereUniqueInput
    /**
     * In case the Email found by the `where` argument doesn't exist, create a new Email with this data.
     */
    create: XOR<EmailCreateInput, EmailUncheckedCreateInput>
    /**
     * In case the Email was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmailUpdateInput, EmailUncheckedUpdateInput>
  }

  /**
   * Email delete
   */
  export type EmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    /**
     * Filter which Email to delete.
     */
    where: EmailWhereUniqueInput
  }

  /**
   * Email deleteMany
   */
  export type EmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Emails to delete
     */
    where?: EmailWhereInput
    /**
     * Limit how many Emails to delete.
     */
    limit?: number
  }

  /**
   * Email.tasks
   */
  export type Email$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Email.taskLogs
   */
  export type Email$taskLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * Email.events
   */
  export type Email$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Email.keyInformation
   */
  export type Email$keyInformationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    where?: KeyInformationWhereInput
    orderBy?: KeyInformationOrderByWithRelationInput | KeyInformationOrderByWithRelationInput[]
    cursor?: KeyInformationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KeyInformationScalarFieldEnum | KeyInformationScalarFieldEnum[]
  }

  /**
   * Email without action
   */
  export type EmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    emailId: string | null
    userId: string | null
    title: string | null
    dueDate: Date | null
    description: string | null
    urgency: $Enums.Urgency | null
    status: $Enums.TaskStatus | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    emailId: string | null
    userId: string | null
    title: string | null
    dueDate: Date | null
    description: string | null
    urgency: $Enums.Urgency | null
    status: $Enums.TaskStatus | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    emailId: number
    userId: number
    title: number
    dueDate: number
    description: number
    urgency: number
    status: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    emailId?: true
    userId?: true
    title?: true
    dueDate?: true
    description?: true
    urgency?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    emailId?: true
    userId?: true
    title?: true
    dueDate?: true
    description?: true
    urgency?: true
    status?: true
    createdAt?: true
    completedAt?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    emailId?: true
    userId?: true
    title?: true
    dueDate?: true
    description?: true
    urgency?: true
    status?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    emailId: string | null
    userId: string
    title: string
    dueDate: Date | null
    description: string | null
    urgency: $Enums.Urgency
    status: $Enums.TaskStatus
    createdAt: Date
    completedAt: Date | null
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    userId?: boolean
    title?: boolean
    dueDate?: boolean
    description?: boolean
    urgency?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    email?: boolean | Task$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    linksOrAttachments?: boolean | Task$linksOrAttachmentsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    userId?: boolean
    title?: boolean
    dueDate?: boolean
    description?: boolean
    urgency?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    email?: boolean | Task$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    emailId?: boolean
    userId?: boolean
    title?: boolean
    dueDate?: boolean
    description?: boolean
    urgency?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
    email?: boolean | Task$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    emailId?: boolean
    userId?: boolean
    title?: boolean
    dueDate?: boolean
    description?: boolean
    urgency?: boolean
    status?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "emailId" | "userId" | "title" | "dueDate" | "description" | "urgency" | "status" | "createdAt" | "completedAt", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | Task$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    linksOrAttachments?: boolean | Task$linksOrAttachmentsArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | Task$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | Task$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      email: Prisma.$EmailPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
      linksOrAttachments: Prisma.$LinkOrAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      emailId: string | null
      userId: string
      title: string
      dueDate: Date | null
      description: string | null
      urgency: $Enums.Urgency
      status: $Enums.TaskStatus
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    email<T extends Task$emailArgs<ExtArgs> = {}>(args?: Subset<T, Task$emailArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    linksOrAttachments<T extends Task$linksOrAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Task$linksOrAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly emailId: FieldRef<"Task", 'String'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly description: FieldRef<"Task", 'String'>
    readonly urgency: FieldRef<"Task", 'Urgency'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.email
   */
  export type Task$emailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
  }

  /**
   * Task.linksOrAttachments
   */
  export type Task$linksOrAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    where?: LinkOrAttachmentWhereInput
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    cursor?: LinkOrAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkOrAttachmentScalarFieldEnum | LinkOrAttachmentScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    emailId: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    description: string | null
    isRecurringHint: boolean | null
    createdAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    emailId: string | null
    title: string | null
    startTime: Date | null
    endTime: Date | null
    location: string | null
    description: string | null
    isRecurringHint: boolean | null
    createdAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    userId: number
    emailId: number
    title: number
    startTime: number
    endTime: number
    location: number
    description: number
    isRecurringHint: number
    createdAt: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    title?: true
    startTime?: true
    endTime?: true
    location?: true
    description?: true
    isRecurringHint?: true
    createdAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    title?: true
    startTime?: true
    endTime?: true
    location?: true
    description?: true
    isRecurringHint?: true
    createdAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    title?: true
    startTime?: true
    endTime?: true
    location?: true
    description?: true
    isRecurringHint?: true
    createdAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    userId: string
    emailId: string | null
    title: string
    startTime: Date
    endTime: Date
    location: string | null
    description: string | null
    isRecurringHint: boolean
    createdAt: Date
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    description?: boolean
    isRecurringHint?: boolean
    createdAt?: boolean
    email?: boolean | Event$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    linksOrAttachments?: boolean | Event$linksOrAttachmentsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    description?: boolean
    isRecurringHint?: boolean
    createdAt?: boolean
    email?: boolean | Event$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    description?: boolean
    isRecurringHint?: boolean
    createdAt?: boolean
    email?: boolean | Event$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    userId?: boolean
    emailId?: boolean
    title?: boolean
    startTime?: boolean
    endTime?: boolean
    location?: boolean
    description?: boolean
    isRecurringHint?: boolean
    createdAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "emailId" | "title" | "startTime" | "endTime" | "location" | "description" | "isRecurringHint" | "createdAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | Event$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    linksOrAttachments?: boolean | Event$linksOrAttachmentsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | Event$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | Event$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      email: Prisma.$EmailPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
      linksOrAttachments: Prisma.$LinkOrAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      emailId: string | null
      title: string
      startTime: Date
      endTime: Date
      location: string | null
      description: string | null
      isRecurringHint: boolean
      createdAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    email<T extends Event$emailArgs<ExtArgs> = {}>(args?: Subset<T, Event$emailArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    linksOrAttachments<T extends Event$linksOrAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Event$linksOrAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly userId: FieldRef<"Event", 'String'>
    readonly emailId: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly startTime: FieldRef<"Event", 'DateTime'>
    readonly endTime: FieldRef<"Event", 'DateTime'>
    readonly location: FieldRef<"Event", 'String'>
    readonly description: FieldRef<"Event", 'String'>
    readonly isRecurringHint: FieldRef<"Event", 'Boolean'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.email
   */
  export type Event$emailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
  }

  /**
   * Event.linksOrAttachments
   */
  export type Event$linksOrAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    where?: LinkOrAttachmentWhereInput
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    cursor?: LinkOrAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkOrAttachmentScalarFieldEnum | LinkOrAttachmentScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model KeyInformation
   */

  export type AggregateKeyInformation = {
    _count: KeyInformationCountAggregateOutputType | null
    _min: KeyInformationMinAggregateOutputType | null
    _max: KeyInformationMaxAggregateOutputType | null
  }

  export type KeyInformationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    emailId: string | null
    info: string | null
    sourceHint: string | null
    createdAt: Date | null
  }

  export type KeyInformationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    emailId: string | null
    info: string | null
    sourceHint: string | null
    createdAt: Date | null
  }

  export type KeyInformationCountAggregateOutputType = {
    id: number
    userId: number
    emailId: number
    info: number
    sourceHint: number
    createdAt: number
    _all: number
  }


  export type KeyInformationMinAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    info?: true
    sourceHint?: true
    createdAt?: true
  }

  export type KeyInformationMaxAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    info?: true
    sourceHint?: true
    createdAt?: true
  }

  export type KeyInformationCountAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    info?: true
    sourceHint?: true
    createdAt?: true
    _all?: true
  }

  export type KeyInformationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KeyInformation to aggregate.
     */
    where?: KeyInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyInformations to fetch.
     */
    orderBy?: KeyInformationOrderByWithRelationInput | KeyInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KeyInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyInformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KeyInformations
    **/
    _count?: true | KeyInformationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KeyInformationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KeyInformationMaxAggregateInputType
  }

  export type GetKeyInformationAggregateType<T extends KeyInformationAggregateArgs> = {
        [P in keyof T & keyof AggregateKeyInformation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKeyInformation[P]>
      : GetScalarType<T[P], AggregateKeyInformation[P]>
  }




  export type KeyInformationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KeyInformationWhereInput
    orderBy?: KeyInformationOrderByWithAggregationInput | KeyInformationOrderByWithAggregationInput[]
    by: KeyInformationScalarFieldEnum[] | KeyInformationScalarFieldEnum
    having?: KeyInformationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KeyInformationCountAggregateInputType | true
    _min?: KeyInformationMinAggregateInputType
    _max?: KeyInformationMaxAggregateInputType
  }

  export type KeyInformationGroupByOutputType = {
    id: string
    userId: string
    emailId: string | null
    info: string
    sourceHint: string | null
    createdAt: Date
    _count: KeyInformationCountAggregateOutputType | null
    _min: KeyInformationMinAggregateOutputType | null
    _max: KeyInformationMaxAggregateOutputType | null
  }

  type GetKeyInformationGroupByPayload<T extends KeyInformationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KeyInformationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KeyInformationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KeyInformationGroupByOutputType[P]>
            : GetScalarType<T[P], KeyInformationGroupByOutputType[P]>
        }
      >
    >


  export type KeyInformationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    info?: boolean
    sourceHint?: boolean
    createdAt?: boolean
    email?: boolean | KeyInformation$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    linksOrAttachments?: boolean | KeyInformation$linksOrAttachmentsArgs<ExtArgs>
    _count?: boolean | KeyInformationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["keyInformation"]>

  export type KeyInformationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    info?: boolean
    sourceHint?: boolean
    createdAt?: boolean
    email?: boolean | KeyInformation$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["keyInformation"]>

  export type KeyInformationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    info?: boolean
    sourceHint?: boolean
    createdAt?: boolean
    email?: boolean | KeyInformation$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["keyInformation"]>

  export type KeyInformationSelectScalar = {
    id?: boolean
    userId?: boolean
    emailId?: boolean
    info?: boolean
    sourceHint?: boolean
    createdAt?: boolean
  }

  export type KeyInformationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "emailId" | "info" | "sourceHint" | "createdAt", ExtArgs["result"]["keyInformation"]>
  export type KeyInformationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | KeyInformation$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    linksOrAttachments?: boolean | KeyInformation$linksOrAttachmentsArgs<ExtArgs>
    _count?: boolean | KeyInformationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KeyInformationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | KeyInformation$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type KeyInformationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | KeyInformation$emailArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $KeyInformationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KeyInformation"
    objects: {
      email: Prisma.$EmailPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
      linksOrAttachments: Prisma.$LinkOrAttachmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      emailId: string | null
      info: string
      sourceHint: string | null
      createdAt: Date
    }, ExtArgs["result"]["keyInformation"]>
    composites: {}
  }

  type KeyInformationGetPayload<S extends boolean | null | undefined | KeyInformationDefaultArgs> = $Result.GetResult<Prisma.$KeyInformationPayload, S>

  type KeyInformationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KeyInformationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KeyInformationCountAggregateInputType | true
    }

  export interface KeyInformationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KeyInformation'], meta: { name: 'KeyInformation' } }
    /**
     * Find zero or one KeyInformation that matches the filter.
     * @param {KeyInformationFindUniqueArgs} args - Arguments to find a KeyInformation
     * @example
     * // Get one KeyInformation
     * const keyInformation = await prisma.keyInformation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KeyInformationFindUniqueArgs>(args: SelectSubset<T, KeyInformationFindUniqueArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KeyInformation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KeyInformationFindUniqueOrThrowArgs} args - Arguments to find a KeyInformation
     * @example
     * // Get one KeyInformation
     * const keyInformation = await prisma.keyInformation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KeyInformationFindUniqueOrThrowArgs>(args: SelectSubset<T, KeyInformationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KeyInformation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationFindFirstArgs} args - Arguments to find a KeyInformation
     * @example
     * // Get one KeyInformation
     * const keyInformation = await prisma.keyInformation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KeyInformationFindFirstArgs>(args?: SelectSubset<T, KeyInformationFindFirstArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KeyInformation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationFindFirstOrThrowArgs} args - Arguments to find a KeyInformation
     * @example
     * // Get one KeyInformation
     * const keyInformation = await prisma.keyInformation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KeyInformationFindFirstOrThrowArgs>(args?: SelectSubset<T, KeyInformationFindFirstOrThrowArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KeyInformations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KeyInformations
     * const keyInformations = await prisma.keyInformation.findMany()
     * 
     * // Get first 10 KeyInformations
     * const keyInformations = await prisma.keyInformation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const keyInformationWithIdOnly = await prisma.keyInformation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KeyInformationFindManyArgs>(args?: SelectSubset<T, KeyInformationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KeyInformation.
     * @param {KeyInformationCreateArgs} args - Arguments to create a KeyInformation.
     * @example
     * // Create one KeyInformation
     * const KeyInformation = await prisma.keyInformation.create({
     *   data: {
     *     // ... data to create a KeyInformation
     *   }
     * })
     * 
     */
    create<T extends KeyInformationCreateArgs>(args: SelectSubset<T, KeyInformationCreateArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KeyInformations.
     * @param {KeyInformationCreateManyArgs} args - Arguments to create many KeyInformations.
     * @example
     * // Create many KeyInformations
     * const keyInformation = await prisma.keyInformation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KeyInformationCreateManyArgs>(args?: SelectSubset<T, KeyInformationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KeyInformations and returns the data saved in the database.
     * @param {KeyInformationCreateManyAndReturnArgs} args - Arguments to create many KeyInformations.
     * @example
     * // Create many KeyInformations
     * const keyInformation = await prisma.keyInformation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KeyInformations and only return the `id`
     * const keyInformationWithIdOnly = await prisma.keyInformation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KeyInformationCreateManyAndReturnArgs>(args?: SelectSubset<T, KeyInformationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KeyInformation.
     * @param {KeyInformationDeleteArgs} args - Arguments to delete one KeyInformation.
     * @example
     * // Delete one KeyInformation
     * const KeyInformation = await prisma.keyInformation.delete({
     *   where: {
     *     // ... filter to delete one KeyInformation
     *   }
     * })
     * 
     */
    delete<T extends KeyInformationDeleteArgs>(args: SelectSubset<T, KeyInformationDeleteArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KeyInformation.
     * @param {KeyInformationUpdateArgs} args - Arguments to update one KeyInformation.
     * @example
     * // Update one KeyInformation
     * const keyInformation = await prisma.keyInformation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KeyInformationUpdateArgs>(args: SelectSubset<T, KeyInformationUpdateArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KeyInformations.
     * @param {KeyInformationDeleteManyArgs} args - Arguments to filter KeyInformations to delete.
     * @example
     * // Delete a few KeyInformations
     * const { count } = await prisma.keyInformation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KeyInformationDeleteManyArgs>(args?: SelectSubset<T, KeyInformationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KeyInformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KeyInformations
     * const keyInformation = await prisma.keyInformation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KeyInformationUpdateManyArgs>(args: SelectSubset<T, KeyInformationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KeyInformations and returns the data updated in the database.
     * @param {KeyInformationUpdateManyAndReturnArgs} args - Arguments to update many KeyInformations.
     * @example
     * // Update many KeyInformations
     * const keyInformation = await prisma.keyInformation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KeyInformations and only return the `id`
     * const keyInformationWithIdOnly = await prisma.keyInformation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KeyInformationUpdateManyAndReturnArgs>(args: SelectSubset<T, KeyInformationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KeyInformation.
     * @param {KeyInformationUpsertArgs} args - Arguments to update or create a KeyInformation.
     * @example
     * // Update or create a KeyInformation
     * const keyInformation = await prisma.keyInformation.upsert({
     *   create: {
     *     // ... data to create a KeyInformation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KeyInformation we want to update
     *   }
     * })
     */
    upsert<T extends KeyInformationUpsertArgs>(args: SelectSubset<T, KeyInformationUpsertArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KeyInformations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationCountArgs} args - Arguments to filter KeyInformations to count.
     * @example
     * // Count the number of KeyInformations
     * const count = await prisma.keyInformation.count({
     *   where: {
     *     // ... the filter for the KeyInformations we want to count
     *   }
     * })
    **/
    count<T extends KeyInformationCountArgs>(
      args?: Subset<T, KeyInformationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KeyInformationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KeyInformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KeyInformationAggregateArgs>(args: Subset<T, KeyInformationAggregateArgs>): Prisma.PrismaPromise<GetKeyInformationAggregateType<T>>

    /**
     * Group by KeyInformation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KeyInformationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KeyInformationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KeyInformationGroupByArgs['orderBy'] }
        : { orderBy?: KeyInformationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KeyInformationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKeyInformationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KeyInformation model
   */
  readonly fields: KeyInformationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KeyInformation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KeyInformationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    email<T extends KeyInformation$emailArgs<ExtArgs> = {}>(args?: Subset<T, KeyInformation$emailArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    linksOrAttachments<T extends KeyInformation$linksOrAttachmentsArgs<ExtArgs> = {}>(args?: Subset<T, KeyInformation$linksOrAttachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KeyInformation model
   */
  interface KeyInformationFieldRefs {
    readonly id: FieldRef<"KeyInformation", 'String'>
    readonly userId: FieldRef<"KeyInformation", 'String'>
    readonly emailId: FieldRef<"KeyInformation", 'String'>
    readonly info: FieldRef<"KeyInformation", 'String'>
    readonly sourceHint: FieldRef<"KeyInformation", 'String'>
    readonly createdAt: FieldRef<"KeyInformation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KeyInformation findUnique
   */
  export type KeyInformationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * Filter, which KeyInformation to fetch.
     */
    where: KeyInformationWhereUniqueInput
  }

  /**
   * KeyInformation findUniqueOrThrow
   */
  export type KeyInformationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * Filter, which KeyInformation to fetch.
     */
    where: KeyInformationWhereUniqueInput
  }

  /**
   * KeyInformation findFirst
   */
  export type KeyInformationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * Filter, which KeyInformation to fetch.
     */
    where?: KeyInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyInformations to fetch.
     */
    orderBy?: KeyInformationOrderByWithRelationInput | KeyInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KeyInformations.
     */
    cursor?: KeyInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyInformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KeyInformations.
     */
    distinct?: KeyInformationScalarFieldEnum | KeyInformationScalarFieldEnum[]
  }

  /**
   * KeyInformation findFirstOrThrow
   */
  export type KeyInformationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * Filter, which KeyInformation to fetch.
     */
    where?: KeyInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyInformations to fetch.
     */
    orderBy?: KeyInformationOrderByWithRelationInput | KeyInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KeyInformations.
     */
    cursor?: KeyInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyInformations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KeyInformations.
     */
    distinct?: KeyInformationScalarFieldEnum | KeyInformationScalarFieldEnum[]
  }

  /**
   * KeyInformation findMany
   */
  export type KeyInformationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * Filter, which KeyInformations to fetch.
     */
    where?: KeyInformationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KeyInformations to fetch.
     */
    orderBy?: KeyInformationOrderByWithRelationInput | KeyInformationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KeyInformations.
     */
    cursor?: KeyInformationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KeyInformations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KeyInformations.
     */
    skip?: number
    distinct?: KeyInformationScalarFieldEnum | KeyInformationScalarFieldEnum[]
  }

  /**
   * KeyInformation create
   */
  export type KeyInformationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * The data needed to create a KeyInformation.
     */
    data: XOR<KeyInformationCreateInput, KeyInformationUncheckedCreateInput>
  }

  /**
   * KeyInformation createMany
   */
  export type KeyInformationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KeyInformations.
     */
    data: KeyInformationCreateManyInput | KeyInformationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KeyInformation createManyAndReturn
   */
  export type KeyInformationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * The data used to create many KeyInformations.
     */
    data: KeyInformationCreateManyInput | KeyInformationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KeyInformation update
   */
  export type KeyInformationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * The data needed to update a KeyInformation.
     */
    data: XOR<KeyInformationUpdateInput, KeyInformationUncheckedUpdateInput>
    /**
     * Choose, which KeyInformation to update.
     */
    where: KeyInformationWhereUniqueInput
  }

  /**
   * KeyInformation updateMany
   */
  export type KeyInformationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KeyInformations.
     */
    data: XOR<KeyInformationUpdateManyMutationInput, KeyInformationUncheckedUpdateManyInput>
    /**
     * Filter which KeyInformations to update
     */
    where?: KeyInformationWhereInput
    /**
     * Limit how many KeyInformations to update.
     */
    limit?: number
  }

  /**
   * KeyInformation updateManyAndReturn
   */
  export type KeyInformationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * The data used to update KeyInformations.
     */
    data: XOR<KeyInformationUpdateManyMutationInput, KeyInformationUncheckedUpdateManyInput>
    /**
     * Filter which KeyInformations to update
     */
    where?: KeyInformationWhereInput
    /**
     * Limit how many KeyInformations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * KeyInformation upsert
   */
  export type KeyInformationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * The filter to search for the KeyInformation to update in case it exists.
     */
    where: KeyInformationWhereUniqueInput
    /**
     * In case the KeyInformation found by the `where` argument doesn't exist, create a new KeyInformation with this data.
     */
    create: XOR<KeyInformationCreateInput, KeyInformationUncheckedCreateInput>
    /**
     * In case the KeyInformation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KeyInformationUpdateInput, KeyInformationUncheckedUpdateInput>
  }

  /**
   * KeyInformation delete
   */
  export type KeyInformationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    /**
     * Filter which KeyInformation to delete.
     */
    where: KeyInformationWhereUniqueInput
  }

  /**
   * KeyInformation deleteMany
   */
  export type KeyInformationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KeyInformations to delete
     */
    where?: KeyInformationWhereInput
    /**
     * Limit how many KeyInformations to delete.
     */
    limit?: number
  }

  /**
   * KeyInformation.email
   */
  export type KeyInformation$emailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Email
     */
    select?: EmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Email
     */
    omit?: EmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmailInclude<ExtArgs> | null
    where?: EmailWhereInput
  }

  /**
   * KeyInformation.linksOrAttachments
   */
  export type KeyInformation$linksOrAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    where?: LinkOrAttachmentWhereInput
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    cursor?: LinkOrAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkOrAttachmentScalarFieldEnum | LinkOrAttachmentScalarFieldEnum[]
  }

  /**
   * KeyInformation without action
   */
  export type KeyInformationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
  }


  /**
   * Model LinkOrAttachment
   */

  export type AggregateLinkOrAttachment = {
    _count: LinkOrAttachmentCountAggregateOutputType | null
    _min: LinkOrAttachmentMinAggregateOutputType | null
    _max: LinkOrAttachmentMaxAggregateOutputType | null
  }

  export type LinkOrAttachmentMinAggregateOutputType = {
    id: string | null
    type: string | null
    identifier: string | null
    description: string | null
    taskId: string | null
    eventId: string | null
    keyInformationId: string | null
    createdAt: Date | null
  }

  export type LinkOrAttachmentMaxAggregateOutputType = {
    id: string | null
    type: string | null
    identifier: string | null
    description: string | null
    taskId: string | null
    eventId: string | null
    keyInformationId: string | null
    createdAt: Date | null
  }

  export type LinkOrAttachmentCountAggregateOutputType = {
    id: number
    type: number
    identifier: number
    description: number
    taskId: number
    eventId: number
    keyInformationId: number
    createdAt: number
    _all: number
  }


  export type LinkOrAttachmentMinAggregateInputType = {
    id?: true
    type?: true
    identifier?: true
    description?: true
    taskId?: true
    eventId?: true
    keyInformationId?: true
    createdAt?: true
  }

  export type LinkOrAttachmentMaxAggregateInputType = {
    id?: true
    type?: true
    identifier?: true
    description?: true
    taskId?: true
    eventId?: true
    keyInformationId?: true
    createdAt?: true
  }

  export type LinkOrAttachmentCountAggregateInputType = {
    id?: true
    type?: true
    identifier?: true
    description?: true
    taskId?: true
    eventId?: true
    keyInformationId?: true
    createdAt?: true
    _all?: true
  }

  export type LinkOrAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkOrAttachment to aggregate.
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkOrAttachments to fetch.
     */
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkOrAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkOrAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkOrAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LinkOrAttachments
    **/
    _count?: true | LinkOrAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkOrAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkOrAttachmentMaxAggregateInputType
  }

  export type GetLinkOrAttachmentAggregateType<T extends LinkOrAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateLinkOrAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLinkOrAttachment[P]>
      : GetScalarType<T[P], AggregateLinkOrAttachment[P]>
  }




  export type LinkOrAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkOrAttachmentWhereInput
    orderBy?: LinkOrAttachmentOrderByWithAggregationInput | LinkOrAttachmentOrderByWithAggregationInput[]
    by: LinkOrAttachmentScalarFieldEnum[] | LinkOrAttachmentScalarFieldEnum
    having?: LinkOrAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkOrAttachmentCountAggregateInputType | true
    _min?: LinkOrAttachmentMinAggregateInputType
    _max?: LinkOrAttachmentMaxAggregateInputType
  }

  export type LinkOrAttachmentGroupByOutputType = {
    id: string
    type: string
    identifier: string
    description: string
    taskId: string | null
    eventId: string | null
    keyInformationId: string | null
    createdAt: Date
    _count: LinkOrAttachmentCountAggregateOutputType | null
    _min: LinkOrAttachmentMinAggregateOutputType | null
    _max: LinkOrAttachmentMaxAggregateOutputType | null
  }

  type GetLinkOrAttachmentGroupByPayload<T extends LinkOrAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkOrAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkOrAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkOrAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], LinkOrAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type LinkOrAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    identifier?: boolean
    description?: boolean
    taskId?: boolean
    eventId?: boolean
    keyInformationId?: boolean
    createdAt?: boolean
    task?: boolean | LinkOrAttachment$taskArgs<ExtArgs>
    event?: boolean | LinkOrAttachment$eventArgs<ExtArgs>
    keyInformation?: boolean | LinkOrAttachment$keyInformationArgs<ExtArgs>
  }, ExtArgs["result"]["linkOrAttachment"]>

  export type LinkOrAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    identifier?: boolean
    description?: boolean
    taskId?: boolean
    eventId?: boolean
    keyInformationId?: boolean
    createdAt?: boolean
    task?: boolean | LinkOrAttachment$taskArgs<ExtArgs>
    event?: boolean | LinkOrAttachment$eventArgs<ExtArgs>
    keyInformation?: boolean | LinkOrAttachment$keyInformationArgs<ExtArgs>
  }, ExtArgs["result"]["linkOrAttachment"]>

  export type LinkOrAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    identifier?: boolean
    description?: boolean
    taskId?: boolean
    eventId?: boolean
    keyInformationId?: boolean
    createdAt?: boolean
    task?: boolean | LinkOrAttachment$taskArgs<ExtArgs>
    event?: boolean | LinkOrAttachment$eventArgs<ExtArgs>
    keyInformation?: boolean | LinkOrAttachment$keyInformationArgs<ExtArgs>
  }, ExtArgs["result"]["linkOrAttachment"]>

  export type LinkOrAttachmentSelectScalar = {
    id?: boolean
    type?: boolean
    identifier?: boolean
    description?: boolean
    taskId?: boolean
    eventId?: boolean
    keyInformationId?: boolean
    createdAt?: boolean
  }

  export type LinkOrAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "identifier" | "description" | "taskId" | "eventId" | "keyInformationId" | "createdAt", ExtArgs["result"]["linkOrAttachment"]>
  export type LinkOrAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | LinkOrAttachment$taskArgs<ExtArgs>
    event?: boolean | LinkOrAttachment$eventArgs<ExtArgs>
    keyInformation?: boolean | LinkOrAttachment$keyInformationArgs<ExtArgs>
  }
  export type LinkOrAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | LinkOrAttachment$taskArgs<ExtArgs>
    event?: boolean | LinkOrAttachment$eventArgs<ExtArgs>
    keyInformation?: boolean | LinkOrAttachment$keyInformationArgs<ExtArgs>
  }
  export type LinkOrAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | LinkOrAttachment$taskArgs<ExtArgs>
    event?: boolean | LinkOrAttachment$eventArgs<ExtArgs>
    keyInformation?: boolean | LinkOrAttachment$keyInformationArgs<ExtArgs>
  }

  export type $LinkOrAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LinkOrAttachment"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs> | null
      event: Prisma.$EventPayload<ExtArgs> | null
      keyInformation: Prisma.$KeyInformationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      identifier: string
      description: string
      taskId: string | null
      eventId: string | null
      keyInformationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["linkOrAttachment"]>
    composites: {}
  }

  type LinkOrAttachmentGetPayload<S extends boolean | null | undefined | LinkOrAttachmentDefaultArgs> = $Result.GetResult<Prisma.$LinkOrAttachmentPayload, S>

  type LinkOrAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkOrAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkOrAttachmentCountAggregateInputType | true
    }

  export interface LinkOrAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LinkOrAttachment'], meta: { name: 'LinkOrAttachment' } }
    /**
     * Find zero or one LinkOrAttachment that matches the filter.
     * @param {LinkOrAttachmentFindUniqueArgs} args - Arguments to find a LinkOrAttachment
     * @example
     * // Get one LinkOrAttachment
     * const linkOrAttachment = await prisma.linkOrAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkOrAttachmentFindUniqueArgs>(args: SelectSubset<T, LinkOrAttachmentFindUniqueArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LinkOrAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkOrAttachmentFindUniqueOrThrowArgs} args - Arguments to find a LinkOrAttachment
     * @example
     * // Get one LinkOrAttachment
     * const linkOrAttachment = await prisma.linkOrAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkOrAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkOrAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkOrAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentFindFirstArgs} args - Arguments to find a LinkOrAttachment
     * @example
     * // Get one LinkOrAttachment
     * const linkOrAttachment = await prisma.linkOrAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkOrAttachmentFindFirstArgs>(args?: SelectSubset<T, LinkOrAttachmentFindFirstArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkOrAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentFindFirstOrThrowArgs} args - Arguments to find a LinkOrAttachment
     * @example
     * // Get one LinkOrAttachment
     * const linkOrAttachment = await prisma.linkOrAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkOrAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkOrAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LinkOrAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LinkOrAttachments
     * const linkOrAttachments = await prisma.linkOrAttachment.findMany()
     * 
     * // Get first 10 LinkOrAttachments
     * const linkOrAttachments = await prisma.linkOrAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkOrAttachmentWithIdOnly = await prisma.linkOrAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LinkOrAttachmentFindManyArgs>(args?: SelectSubset<T, LinkOrAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LinkOrAttachment.
     * @param {LinkOrAttachmentCreateArgs} args - Arguments to create a LinkOrAttachment.
     * @example
     * // Create one LinkOrAttachment
     * const LinkOrAttachment = await prisma.linkOrAttachment.create({
     *   data: {
     *     // ... data to create a LinkOrAttachment
     *   }
     * })
     * 
     */
    create<T extends LinkOrAttachmentCreateArgs>(args: SelectSubset<T, LinkOrAttachmentCreateArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LinkOrAttachments.
     * @param {LinkOrAttachmentCreateManyArgs} args - Arguments to create many LinkOrAttachments.
     * @example
     * // Create many LinkOrAttachments
     * const linkOrAttachment = await prisma.linkOrAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkOrAttachmentCreateManyArgs>(args?: SelectSubset<T, LinkOrAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LinkOrAttachments and returns the data saved in the database.
     * @param {LinkOrAttachmentCreateManyAndReturnArgs} args - Arguments to create many LinkOrAttachments.
     * @example
     * // Create many LinkOrAttachments
     * const linkOrAttachment = await prisma.linkOrAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LinkOrAttachments and only return the `id`
     * const linkOrAttachmentWithIdOnly = await prisma.linkOrAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkOrAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkOrAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LinkOrAttachment.
     * @param {LinkOrAttachmentDeleteArgs} args - Arguments to delete one LinkOrAttachment.
     * @example
     * // Delete one LinkOrAttachment
     * const LinkOrAttachment = await prisma.linkOrAttachment.delete({
     *   where: {
     *     // ... filter to delete one LinkOrAttachment
     *   }
     * })
     * 
     */
    delete<T extends LinkOrAttachmentDeleteArgs>(args: SelectSubset<T, LinkOrAttachmentDeleteArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LinkOrAttachment.
     * @param {LinkOrAttachmentUpdateArgs} args - Arguments to update one LinkOrAttachment.
     * @example
     * // Update one LinkOrAttachment
     * const linkOrAttachment = await prisma.linkOrAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkOrAttachmentUpdateArgs>(args: SelectSubset<T, LinkOrAttachmentUpdateArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LinkOrAttachments.
     * @param {LinkOrAttachmentDeleteManyArgs} args - Arguments to filter LinkOrAttachments to delete.
     * @example
     * // Delete a few LinkOrAttachments
     * const { count } = await prisma.linkOrAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkOrAttachmentDeleteManyArgs>(args?: SelectSubset<T, LinkOrAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkOrAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LinkOrAttachments
     * const linkOrAttachment = await prisma.linkOrAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkOrAttachmentUpdateManyArgs>(args: SelectSubset<T, LinkOrAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkOrAttachments and returns the data updated in the database.
     * @param {LinkOrAttachmentUpdateManyAndReturnArgs} args - Arguments to update many LinkOrAttachments.
     * @example
     * // Update many LinkOrAttachments
     * const linkOrAttachment = await prisma.linkOrAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LinkOrAttachments and only return the `id`
     * const linkOrAttachmentWithIdOnly = await prisma.linkOrAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LinkOrAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkOrAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LinkOrAttachment.
     * @param {LinkOrAttachmentUpsertArgs} args - Arguments to update or create a LinkOrAttachment.
     * @example
     * // Update or create a LinkOrAttachment
     * const linkOrAttachment = await prisma.linkOrAttachment.upsert({
     *   create: {
     *     // ... data to create a LinkOrAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LinkOrAttachment we want to update
     *   }
     * })
     */
    upsert<T extends LinkOrAttachmentUpsertArgs>(args: SelectSubset<T, LinkOrAttachmentUpsertArgs<ExtArgs>>): Prisma__LinkOrAttachmentClient<$Result.GetResult<Prisma.$LinkOrAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LinkOrAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentCountArgs} args - Arguments to filter LinkOrAttachments to count.
     * @example
     * // Count the number of LinkOrAttachments
     * const count = await prisma.linkOrAttachment.count({
     *   where: {
     *     // ... the filter for the LinkOrAttachments we want to count
     *   }
     * })
    **/
    count<T extends LinkOrAttachmentCountArgs>(
      args?: Subset<T, LinkOrAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkOrAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LinkOrAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkOrAttachmentAggregateArgs>(args: Subset<T, LinkOrAttachmentAggregateArgs>): Prisma.PrismaPromise<GetLinkOrAttachmentAggregateType<T>>

    /**
     * Group by LinkOrAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkOrAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkOrAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkOrAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: LinkOrAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkOrAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkOrAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LinkOrAttachment model
   */
  readonly fields: LinkOrAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LinkOrAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkOrAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends LinkOrAttachment$taskArgs<ExtArgs> = {}>(args?: Subset<T, LinkOrAttachment$taskArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    event<T extends LinkOrAttachment$eventArgs<ExtArgs> = {}>(args?: Subset<T, LinkOrAttachment$eventArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    keyInformation<T extends LinkOrAttachment$keyInformationArgs<ExtArgs> = {}>(args?: Subset<T, LinkOrAttachment$keyInformationArgs<ExtArgs>>): Prisma__KeyInformationClient<$Result.GetResult<Prisma.$KeyInformationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LinkOrAttachment model
   */
  interface LinkOrAttachmentFieldRefs {
    readonly id: FieldRef<"LinkOrAttachment", 'String'>
    readonly type: FieldRef<"LinkOrAttachment", 'String'>
    readonly identifier: FieldRef<"LinkOrAttachment", 'String'>
    readonly description: FieldRef<"LinkOrAttachment", 'String'>
    readonly taskId: FieldRef<"LinkOrAttachment", 'String'>
    readonly eventId: FieldRef<"LinkOrAttachment", 'String'>
    readonly keyInformationId: FieldRef<"LinkOrAttachment", 'String'>
    readonly createdAt: FieldRef<"LinkOrAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LinkOrAttachment findUnique
   */
  export type LinkOrAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which LinkOrAttachment to fetch.
     */
    where: LinkOrAttachmentWhereUniqueInput
  }

  /**
   * LinkOrAttachment findUniqueOrThrow
   */
  export type LinkOrAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which LinkOrAttachment to fetch.
     */
    where: LinkOrAttachmentWhereUniqueInput
  }

  /**
   * LinkOrAttachment findFirst
   */
  export type LinkOrAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which LinkOrAttachment to fetch.
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkOrAttachments to fetch.
     */
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkOrAttachments.
     */
    cursor?: LinkOrAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkOrAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkOrAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkOrAttachments.
     */
    distinct?: LinkOrAttachmentScalarFieldEnum | LinkOrAttachmentScalarFieldEnum[]
  }

  /**
   * LinkOrAttachment findFirstOrThrow
   */
  export type LinkOrAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which LinkOrAttachment to fetch.
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkOrAttachments to fetch.
     */
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkOrAttachments.
     */
    cursor?: LinkOrAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkOrAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkOrAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkOrAttachments.
     */
    distinct?: LinkOrAttachmentScalarFieldEnum | LinkOrAttachmentScalarFieldEnum[]
  }

  /**
   * LinkOrAttachment findMany
   */
  export type LinkOrAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which LinkOrAttachments to fetch.
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkOrAttachments to fetch.
     */
    orderBy?: LinkOrAttachmentOrderByWithRelationInput | LinkOrAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LinkOrAttachments.
     */
    cursor?: LinkOrAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkOrAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkOrAttachments.
     */
    skip?: number
    distinct?: LinkOrAttachmentScalarFieldEnum | LinkOrAttachmentScalarFieldEnum[]
  }

  /**
   * LinkOrAttachment create
   */
  export type LinkOrAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a LinkOrAttachment.
     */
    data: XOR<LinkOrAttachmentCreateInput, LinkOrAttachmentUncheckedCreateInput>
  }

  /**
   * LinkOrAttachment createMany
   */
  export type LinkOrAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LinkOrAttachments.
     */
    data: LinkOrAttachmentCreateManyInput | LinkOrAttachmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LinkOrAttachment createManyAndReturn
   */
  export type LinkOrAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many LinkOrAttachments.
     */
    data: LinkOrAttachmentCreateManyInput | LinkOrAttachmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LinkOrAttachment update
   */
  export type LinkOrAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a LinkOrAttachment.
     */
    data: XOR<LinkOrAttachmentUpdateInput, LinkOrAttachmentUncheckedUpdateInput>
    /**
     * Choose, which LinkOrAttachment to update.
     */
    where: LinkOrAttachmentWhereUniqueInput
  }

  /**
   * LinkOrAttachment updateMany
   */
  export type LinkOrAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LinkOrAttachments.
     */
    data: XOR<LinkOrAttachmentUpdateManyMutationInput, LinkOrAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which LinkOrAttachments to update
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * Limit how many LinkOrAttachments to update.
     */
    limit?: number
  }

  /**
   * LinkOrAttachment updateManyAndReturn
   */
  export type LinkOrAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update LinkOrAttachments.
     */
    data: XOR<LinkOrAttachmentUpdateManyMutationInput, LinkOrAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which LinkOrAttachments to update
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * Limit how many LinkOrAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LinkOrAttachment upsert
   */
  export type LinkOrAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the LinkOrAttachment to update in case it exists.
     */
    where: LinkOrAttachmentWhereUniqueInput
    /**
     * In case the LinkOrAttachment found by the `where` argument doesn't exist, create a new LinkOrAttachment with this data.
     */
    create: XOR<LinkOrAttachmentCreateInput, LinkOrAttachmentUncheckedCreateInput>
    /**
     * In case the LinkOrAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkOrAttachmentUpdateInput, LinkOrAttachmentUncheckedUpdateInput>
  }

  /**
   * LinkOrAttachment delete
   */
  export type LinkOrAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
    /**
     * Filter which LinkOrAttachment to delete.
     */
    where: LinkOrAttachmentWhereUniqueInput
  }

  /**
   * LinkOrAttachment deleteMany
   */
  export type LinkOrAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkOrAttachments to delete
     */
    where?: LinkOrAttachmentWhereInput
    /**
     * Limit how many LinkOrAttachments to delete.
     */
    limit?: number
  }

  /**
   * LinkOrAttachment.task
   */
  export type LinkOrAttachment$taskArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
  }

  /**
   * LinkOrAttachment.event
   */
  export type LinkOrAttachment$eventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
  }

  /**
   * LinkOrAttachment.keyInformation
   */
  export type LinkOrAttachment$keyInformationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KeyInformation
     */
    select?: KeyInformationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KeyInformation
     */
    omit?: KeyInformationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KeyInformationInclude<ExtArgs> | null
    where?: KeyInformationWhereInput
  }

  /**
   * LinkOrAttachment without action
   */
  export type LinkOrAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkOrAttachment
     */
    select?: LinkOrAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkOrAttachment
     */
    omit?: LinkOrAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkOrAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model TaskLog
   */

  export type AggregateTaskLog = {
    _count: TaskLogCountAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  export type TaskLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    emailId: string | null
    prompt: string | null
    response: string | null
    success: boolean | null
    error: string | null
    createdAt: Date | null
  }

  export type TaskLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    emailId: string | null
    prompt: string | null
    response: string | null
    success: boolean | null
    error: string | null
    createdAt: Date | null
  }

  export type TaskLogCountAggregateOutputType = {
    id: number
    userId: number
    emailId: number
    prompt: number
    response: number
    success: number
    error: number
    createdAt: number
    _all: number
  }


  export type TaskLogMinAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    prompt?: true
    response?: true
    success?: true
    error?: true
    createdAt?: true
  }

  export type TaskLogMaxAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    prompt?: true
    response?: true
    success?: true
    error?: true
    createdAt?: true
  }

  export type TaskLogCountAggregateInputType = {
    id?: true
    userId?: true
    emailId?: true
    prompt?: true
    response?: true
    success?: true
    error?: true
    createdAt?: true
    _all?: true
  }

  export type TaskLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLog to aggregate.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskLogs
    **/
    _count?: true | TaskLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskLogMaxAggregateInputType
  }

  export type GetTaskLogAggregateType<T extends TaskLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskLog[P]>
      : GetScalarType<T[P], AggregateTaskLog[P]>
  }




  export type TaskLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithAggregationInput | TaskLogOrderByWithAggregationInput[]
    by: TaskLogScalarFieldEnum[] | TaskLogScalarFieldEnum
    having?: TaskLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskLogCountAggregateInputType | true
    _min?: TaskLogMinAggregateInputType
    _max?: TaskLogMaxAggregateInputType
  }

  export type TaskLogGroupByOutputType = {
    id: string
    userId: string
    emailId: string
    prompt: string
    response: string | null
    success: boolean
    error: string | null
    createdAt: Date
    _count: TaskLogCountAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  type GetTaskLogGroupByPayload<T extends TaskLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
            : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
        }
      >
    >


  export type TaskLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    prompt?: boolean
    response?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
    email?: boolean | EmailDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    prompt?: boolean
    response?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
    email?: boolean | EmailDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    emailId?: boolean
    prompt?: boolean
    response?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
    email?: boolean | EmailDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectScalar = {
    id?: boolean
    userId?: boolean
    emailId?: boolean
    prompt?: boolean
    response?: boolean
    success?: boolean
    error?: boolean
    createdAt?: boolean
  }

  export type TaskLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "emailId" | "prompt" | "response" | "success" | "error" | "createdAt", ExtArgs["result"]["taskLog"]>
  export type TaskLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | EmailDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | EmailDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    email?: boolean | EmailDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskLog"
    objects: {
      email: Prisma.$EmailPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      emailId: string
      prompt: string
      response: string | null
      success: boolean
      error: string | null
      createdAt: Date
    }, ExtArgs["result"]["taskLog"]>
    composites: {}
  }

  type TaskLogGetPayload<S extends boolean | null | undefined | TaskLogDefaultArgs> = $Result.GetResult<Prisma.$TaskLogPayload, S>

  type TaskLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskLogCountAggregateInputType | true
    }

  export interface TaskLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskLog'], meta: { name: 'TaskLog' } }
    /**
     * Find zero or one TaskLog that matches the filter.
     * @param {TaskLogFindUniqueArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskLogFindUniqueArgs>(args: SelectSubset<T, TaskLogFindUniqueArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TaskLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskLogFindUniqueOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskLogFindFirstArgs>(args?: SelectSubset<T, TaskLogFindFirstArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TaskLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TaskLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskLogs
     * const taskLogs = await prisma.taskLog.findMany()
     * 
     * // Get first 10 TaskLogs
     * const taskLogs = await prisma.taskLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskLogFindManyArgs>(args?: SelectSubset<T, TaskLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TaskLog.
     * @param {TaskLogCreateArgs} args - Arguments to create a TaskLog.
     * @example
     * // Create one TaskLog
     * const TaskLog = await prisma.taskLog.create({
     *   data: {
     *     // ... data to create a TaskLog
     *   }
     * })
     * 
     */
    create<T extends TaskLogCreateArgs>(args: SelectSubset<T, TaskLogCreateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TaskLogs.
     * @param {TaskLogCreateManyArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskLogCreateManyArgs>(args?: SelectSubset<T, TaskLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskLogs and returns the data saved in the database.
     * @param {TaskLogCreateManyAndReturnArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskLogs and only return the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TaskLog.
     * @param {TaskLogDeleteArgs} args - Arguments to delete one TaskLog.
     * @example
     * // Delete one TaskLog
     * const TaskLog = await prisma.taskLog.delete({
     *   where: {
     *     // ... filter to delete one TaskLog
     *   }
     * })
     * 
     */
    delete<T extends TaskLogDeleteArgs>(args: SelectSubset<T, TaskLogDeleteArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TaskLog.
     * @param {TaskLogUpdateArgs} args - Arguments to update one TaskLog.
     * @example
     * // Update one TaskLog
     * const taskLog = await prisma.taskLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskLogUpdateArgs>(args: SelectSubset<T, TaskLogUpdateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TaskLogs.
     * @param {TaskLogDeleteManyArgs} args - Arguments to filter TaskLogs to delete.
     * @example
     * // Delete a few TaskLogs
     * const { count } = await prisma.taskLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskLogDeleteManyArgs>(args?: SelectSubset<T, TaskLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskLogs
     * const taskLog = await prisma.taskLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskLogUpdateManyArgs>(args: SelectSubset<T, TaskLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLogs and returns the data updated in the database.
     * @param {TaskLogUpdateManyAndReturnArgs} args - Arguments to update many TaskLogs.
     * @example
     * // Update many TaskLogs
     * const taskLog = await prisma.taskLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TaskLogs and only return the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskLogUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TaskLog.
     * @param {TaskLogUpsertArgs} args - Arguments to update or create a TaskLog.
     * @example
     * // Update or create a TaskLog
     * const taskLog = await prisma.taskLog.upsert({
     *   create: {
     *     // ... data to create a TaskLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskLog we want to update
     *   }
     * })
     */
    upsert<T extends TaskLogUpsertArgs>(args: SelectSubset<T, TaskLogUpsertArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogCountArgs} args - Arguments to filter TaskLogs to count.
     * @example
     * // Count the number of TaskLogs
     * const count = await prisma.taskLog.count({
     *   where: {
     *     // ... the filter for the TaskLogs we want to count
     *   }
     * })
    **/
    count<T extends TaskLogCountArgs>(
      args?: Subset<T, TaskLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskLogAggregateArgs>(args: Subset<T, TaskLogAggregateArgs>): Prisma.PrismaPromise<GetTaskLogAggregateType<T>>

    /**
     * Group by TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskLogGroupByArgs['orderBy'] }
        : { orderBy?: TaskLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskLog model
   */
  readonly fields: TaskLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    email<T extends EmailDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmailDefaultArgs<ExtArgs>>): Prisma__EmailClient<$Result.GetResult<Prisma.$EmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TaskLog model
   */
  interface TaskLogFieldRefs {
    readonly id: FieldRef<"TaskLog", 'String'>
    readonly userId: FieldRef<"TaskLog", 'String'>
    readonly emailId: FieldRef<"TaskLog", 'String'>
    readonly prompt: FieldRef<"TaskLog", 'String'>
    readonly response: FieldRef<"TaskLog", 'String'>
    readonly success: FieldRef<"TaskLog", 'Boolean'>
    readonly error: FieldRef<"TaskLog", 'String'>
    readonly createdAt: FieldRef<"TaskLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskLog findUnique
   */
  export type TaskLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findUniqueOrThrow
   */
  export type TaskLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findFirst
   */
  export type TaskLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findFirstOrThrow
   */
  export type TaskLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findMany
   */
  export type TaskLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLogs to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog create
   */
  export type TaskLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskLog.
     */
    data: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
  }

  /**
   * TaskLog createMany
   */
  export type TaskLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskLog createManyAndReturn
   */
  export type TaskLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskLog update
   */
  export type TaskLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskLog.
     */
    data: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
    /**
     * Choose, which TaskLog to update.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog updateMany
   */
  export type TaskLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskLogs.
     */
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyInput>
    /**
     * Filter which TaskLogs to update
     */
    where?: TaskLogWhereInput
    /**
     * Limit how many TaskLogs to update.
     */
    limit?: number
  }

  /**
   * TaskLog updateManyAndReturn
   */
  export type TaskLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * The data used to update TaskLogs.
     */
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyInput>
    /**
     * Filter which TaskLogs to update
     */
    where?: TaskLogWhereInput
    /**
     * Limit how many TaskLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskLog upsert
   */
  export type TaskLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskLog to update in case it exists.
     */
    where: TaskLogWhereUniqueInput
    /**
     * In case the TaskLog found by the `where` argument doesn't exist, create a new TaskLog with this data.
     */
    create: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
    /**
     * In case the TaskLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
  }

  /**
   * TaskLog delete
   */
  export type TaskLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter which TaskLog to delete.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog deleteMany
   */
  export type TaskLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLogs to delete
     */
    where?: TaskLogWhereInput
    /**
     * Limit how many TaskLogs to delete.
     */
    limit?: number
  }

  /**
   * TaskLog without action
   */
  export type TaskLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TaskLog
     */
    omit?: TaskLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    forwardingemail: 'forwardingemail',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EmailScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fromEmail: 'fromEmail',
    originalSubject: 'originalSubject',
    summary: 'summary',
    category: 'category',
    status: 'status',
    originalReceivedAt: 'originalReceivedAt',
    processedAt: 'processedAt'
  };

  export type EmailScalarFieldEnum = (typeof EmailScalarFieldEnum)[keyof typeof EmailScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    emailId: 'emailId',
    userId: 'userId',
    title: 'title',
    dueDate: 'dueDate',
    description: 'description',
    urgency: 'urgency',
    status: 'status',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    emailId: 'emailId',
    title: 'title',
    startTime: 'startTime',
    endTime: 'endTime',
    location: 'location',
    description: 'description',
    isRecurringHint: 'isRecurringHint',
    createdAt: 'createdAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const KeyInformationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    emailId: 'emailId',
    info: 'info',
    sourceHint: 'sourceHint',
    createdAt: 'createdAt'
  };

  export type KeyInformationScalarFieldEnum = (typeof KeyInformationScalarFieldEnum)[keyof typeof KeyInformationScalarFieldEnum]


  export const LinkOrAttachmentScalarFieldEnum: {
    id: 'id',
    type: 'type',
    identifier: 'identifier',
    description: 'description',
    taskId: 'taskId',
    eventId: 'eventId',
    keyInformationId: 'keyInformationId',
    createdAt: 'createdAt'
  };

  export type LinkOrAttachmentScalarFieldEnum = (typeof LinkOrAttachmentScalarFieldEnum)[keyof typeof LinkOrAttachmentScalarFieldEnum]


  export const TaskLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    emailId: 'emailId',
    prompt: 'prompt',
    response: 'response',
    success: 'success',
    error: 'error',
    createdAt: 'createdAt'
  };

  export type TaskLogScalarFieldEnum = (typeof TaskLogScalarFieldEnum)[keyof typeof TaskLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EmailCategory'
   */
  export type EnumEmailCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailCategory'>
    


  /**
   * Reference to a field of type 'EmailCategory[]'
   */
  export type ListEnumEmailCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailCategory[]'>
    


  /**
   * Reference to a field of type 'EmailStatus'
   */
  export type EnumEmailStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailStatus'>
    


  /**
   * Reference to a field of type 'EmailStatus[]'
   */
  export type ListEnumEmailStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailStatus[]'>
    


  /**
   * Reference to a field of type 'Urgency'
   */
  export type EnumUrgencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Urgency'>
    


  /**
   * Reference to a field of type 'Urgency[]'
   */
  export type ListEnumUrgencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Urgency[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    forwardingemail?: StringFilter<"User"> | string
    created_at?: DateTimeNullableFilter<"User"> | Date | string | null
    emails?: EmailListRelationFilter
    tasks?: TaskListRelationFilter
    events?: EventListRelationFilter
    keyInfo?: KeyInformationListRelationFilter
    taskLogs?: TaskLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    forwardingemail?: SortOrder
    created_at?: SortOrderInput | SortOrder
    emails?: EmailOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
    keyInfo?: KeyInformationOrderByRelationAggregateInput
    taskLogs?: TaskLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    forwardingemail?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    created_at?: DateTimeNullableFilter<"User"> | Date | string | null
    emails?: EmailListRelationFilter
    tasks?: TaskListRelationFilter
    events?: EventListRelationFilter
    keyInfo?: KeyInformationListRelationFilter
    taskLogs?: TaskLogListRelationFilter
  }, "id" | "email" | "forwardingemail">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    forwardingemail?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    forwardingemail?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type EmailWhereInput = {
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    id?: StringFilter<"Email"> | string
    userId?: UuidFilter<"Email"> | string
    fromEmail?: StringNullableFilter<"Email"> | string | null
    originalSubject?: StringNullableFilter<"Email"> | string | null
    summary?: StringNullableFilter<"Email"> | string | null
    category?: EnumEmailCategoryNullableFilter<"Email"> | $Enums.EmailCategory | null
    status?: EnumEmailStatusNullableFilter<"Email"> | $Enums.EmailStatus | null
    originalReceivedAt?: DateTimeNullableFilter<"Email"> | Date | string | null
    processedAt?: DateTimeFilter<"Email"> | Date | string
    tasks?: TaskListRelationFilter
    taskLogs?: TaskLogListRelationFilter
    events?: EventListRelationFilter
    keyInformation?: KeyInformationListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EmailOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fromEmail?: SortOrderInput | SortOrder
    originalSubject?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    originalReceivedAt?: SortOrderInput | SortOrder
    processedAt?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
    taskLogs?: TaskLogOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
    keyInformation?: KeyInformationOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type EmailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmailWhereInput | EmailWhereInput[]
    OR?: EmailWhereInput[]
    NOT?: EmailWhereInput | EmailWhereInput[]
    userId?: UuidFilter<"Email"> | string
    fromEmail?: StringNullableFilter<"Email"> | string | null
    originalSubject?: StringNullableFilter<"Email"> | string | null
    summary?: StringNullableFilter<"Email"> | string | null
    category?: EnumEmailCategoryNullableFilter<"Email"> | $Enums.EmailCategory | null
    status?: EnumEmailStatusNullableFilter<"Email"> | $Enums.EmailStatus | null
    originalReceivedAt?: DateTimeNullableFilter<"Email"> | Date | string | null
    processedAt?: DateTimeFilter<"Email"> | Date | string
    tasks?: TaskListRelationFilter
    taskLogs?: TaskLogListRelationFilter
    events?: EventListRelationFilter
    keyInformation?: KeyInformationListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EmailOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fromEmail?: SortOrderInput | SortOrder
    originalSubject?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    originalReceivedAt?: SortOrderInput | SortOrder
    processedAt?: SortOrder
    _count?: EmailCountOrderByAggregateInput
    _max?: EmailMaxOrderByAggregateInput
    _min?: EmailMinOrderByAggregateInput
  }

  export type EmailScalarWhereWithAggregatesInput = {
    AND?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    OR?: EmailScalarWhereWithAggregatesInput[]
    NOT?: EmailScalarWhereWithAggregatesInput | EmailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Email"> | string
    userId?: UuidWithAggregatesFilter<"Email"> | string
    fromEmail?: StringNullableWithAggregatesFilter<"Email"> | string | null
    originalSubject?: StringNullableWithAggregatesFilter<"Email"> | string | null
    summary?: StringNullableWithAggregatesFilter<"Email"> | string | null
    category?: EnumEmailCategoryNullableWithAggregatesFilter<"Email"> | $Enums.EmailCategory | null
    status?: EnumEmailStatusNullableWithAggregatesFilter<"Email"> | $Enums.EmailStatus | null
    originalReceivedAt?: DateTimeNullableWithAggregatesFilter<"Email"> | Date | string | null
    processedAt?: DateTimeWithAggregatesFilter<"Email"> | Date | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    emailId?: StringNullableFilter<"Task"> | string | null
    userId?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    description?: StringNullableFilter<"Task"> | string | null
    urgency?: EnumUrgencyFilter<"Task"> | $Enums.Urgency
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    linksOrAttachments?: LinkOrAttachmentListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    emailId?: SortOrderInput | SortOrder
    userId?: SortOrder
    title?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    urgency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    email?: EmailOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    linksOrAttachments?: LinkOrAttachmentOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    emailId?: StringNullableFilter<"Task"> | string | null
    userId?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    description?: StringNullableFilter<"Task"> | string | null
    urgency?: EnumUrgencyFilter<"Task"> | $Enums.Urgency
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    linksOrAttachments?: LinkOrAttachmentListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    emailId?: SortOrderInput | SortOrder
    userId?: SortOrder
    title?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    urgency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    emailId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    userId?: UuidWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    urgency?: EnumUrgencyWithAggregatesFilter<"Task"> | $Enums.Urgency
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    userId?: UuidFilter<"Event"> | string
    emailId?: StringNullableFilter<"Event"> | string | null
    title?: StringFilter<"Event"> | string
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    location?: StringNullableFilter<"Event"> | string | null
    description?: StringNullableFilter<"Event"> | string | null
    isRecurringHint?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    linksOrAttachments?: LinkOrAttachmentListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrderInput | SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isRecurringHint?: SortOrder
    createdAt?: SortOrder
    email?: EmailOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    linksOrAttachments?: LinkOrAttachmentOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    userId?: UuidFilter<"Event"> | string
    emailId?: StringNullableFilter<"Event"> | string | null
    title?: StringFilter<"Event"> | string
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    location?: StringNullableFilter<"Event"> | string | null
    description?: StringNullableFilter<"Event"> | string | null
    isRecurringHint?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    linksOrAttachments?: LinkOrAttachmentListRelationFilter
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrderInput | SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isRecurringHint?: SortOrder
    createdAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    userId?: UuidWithAggregatesFilter<"Event"> | string
    emailId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    title?: StringWithAggregatesFilter<"Event"> | string
    startTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    location?: StringNullableWithAggregatesFilter<"Event"> | string | null
    description?: StringNullableWithAggregatesFilter<"Event"> | string | null
    isRecurringHint?: BoolWithAggregatesFilter<"Event"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type KeyInformationWhereInput = {
    AND?: KeyInformationWhereInput | KeyInformationWhereInput[]
    OR?: KeyInformationWhereInput[]
    NOT?: KeyInformationWhereInput | KeyInformationWhereInput[]
    id?: StringFilter<"KeyInformation"> | string
    userId?: UuidFilter<"KeyInformation"> | string
    emailId?: StringNullableFilter<"KeyInformation"> | string | null
    info?: StringFilter<"KeyInformation"> | string
    sourceHint?: StringNullableFilter<"KeyInformation"> | string | null
    createdAt?: DateTimeFilter<"KeyInformation"> | Date | string
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    linksOrAttachments?: LinkOrAttachmentListRelationFilter
  }

  export type KeyInformationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrderInput | SortOrder
    info?: SortOrder
    sourceHint?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    email?: EmailOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    linksOrAttachments?: LinkOrAttachmentOrderByRelationAggregateInput
  }

  export type KeyInformationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KeyInformationWhereInput | KeyInformationWhereInput[]
    OR?: KeyInformationWhereInput[]
    NOT?: KeyInformationWhereInput | KeyInformationWhereInput[]
    userId?: UuidFilter<"KeyInformation"> | string
    emailId?: StringNullableFilter<"KeyInformation"> | string | null
    info?: StringFilter<"KeyInformation"> | string
    sourceHint?: StringNullableFilter<"KeyInformation"> | string | null
    createdAt?: DateTimeFilter<"KeyInformation"> | Date | string
    email?: XOR<EmailNullableScalarRelationFilter, EmailWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    linksOrAttachments?: LinkOrAttachmentListRelationFilter
  }, "id">

  export type KeyInformationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrderInput | SortOrder
    info?: SortOrder
    sourceHint?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: KeyInformationCountOrderByAggregateInput
    _max?: KeyInformationMaxOrderByAggregateInput
    _min?: KeyInformationMinOrderByAggregateInput
  }

  export type KeyInformationScalarWhereWithAggregatesInput = {
    AND?: KeyInformationScalarWhereWithAggregatesInput | KeyInformationScalarWhereWithAggregatesInput[]
    OR?: KeyInformationScalarWhereWithAggregatesInput[]
    NOT?: KeyInformationScalarWhereWithAggregatesInput | KeyInformationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KeyInformation"> | string
    userId?: UuidWithAggregatesFilter<"KeyInformation"> | string
    emailId?: StringNullableWithAggregatesFilter<"KeyInformation"> | string | null
    info?: StringWithAggregatesFilter<"KeyInformation"> | string
    sourceHint?: StringNullableWithAggregatesFilter<"KeyInformation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KeyInformation"> | Date | string
  }

  export type LinkOrAttachmentWhereInput = {
    AND?: LinkOrAttachmentWhereInput | LinkOrAttachmentWhereInput[]
    OR?: LinkOrAttachmentWhereInput[]
    NOT?: LinkOrAttachmentWhereInput | LinkOrAttachmentWhereInput[]
    id?: StringFilter<"LinkOrAttachment"> | string
    type?: StringFilter<"LinkOrAttachment"> | string
    identifier?: StringFilter<"LinkOrAttachment"> | string
    description?: StringFilter<"LinkOrAttachment"> | string
    taskId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    eventId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    keyInformationId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    createdAt?: DateTimeFilter<"LinkOrAttachment"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    event?: XOR<EventNullableScalarRelationFilter, EventWhereInput> | null
    keyInformation?: XOR<KeyInformationNullableScalarRelationFilter, KeyInformationWhereInput> | null
  }

  export type LinkOrAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    taskId?: SortOrderInput | SortOrder
    eventId?: SortOrderInput | SortOrder
    keyInformationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    task?: TaskOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
    keyInformation?: KeyInformationOrderByWithRelationInput
  }

  export type LinkOrAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LinkOrAttachmentWhereInput | LinkOrAttachmentWhereInput[]
    OR?: LinkOrAttachmentWhereInput[]
    NOT?: LinkOrAttachmentWhereInput | LinkOrAttachmentWhereInput[]
    type?: StringFilter<"LinkOrAttachment"> | string
    identifier?: StringFilter<"LinkOrAttachment"> | string
    description?: StringFilter<"LinkOrAttachment"> | string
    taskId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    eventId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    keyInformationId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    createdAt?: DateTimeFilter<"LinkOrAttachment"> | Date | string
    task?: XOR<TaskNullableScalarRelationFilter, TaskWhereInput> | null
    event?: XOR<EventNullableScalarRelationFilter, EventWhereInput> | null
    keyInformation?: XOR<KeyInformationNullableScalarRelationFilter, KeyInformationWhereInput> | null
  }, "id">

  export type LinkOrAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    taskId?: SortOrderInput | SortOrder
    eventId?: SortOrderInput | SortOrder
    keyInformationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LinkOrAttachmentCountOrderByAggregateInput
    _max?: LinkOrAttachmentMaxOrderByAggregateInput
    _min?: LinkOrAttachmentMinOrderByAggregateInput
  }

  export type LinkOrAttachmentScalarWhereWithAggregatesInput = {
    AND?: LinkOrAttachmentScalarWhereWithAggregatesInput | LinkOrAttachmentScalarWhereWithAggregatesInput[]
    OR?: LinkOrAttachmentScalarWhereWithAggregatesInput[]
    NOT?: LinkOrAttachmentScalarWhereWithAggregatesInput | LinkOrAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LinkOrAttachment"> | string
    type?: StringWithAggregatesFilter<"LinkOrAttachment"> | string
    identifier?: StringWithAggregatesFilter<"LinkOrAttachment"> | string
    description?: StringWithAggregatesFilter<"LinkOrAttachment"> | string
    taskId?: StringNullableWithAggregatesFilter<"LinkOrAttachment"> | string | null
    eventId?: StringNullableWithAggregatesFilter<"LinkOrAttachment"> | string | null
    keyInformationId?: StringNullableWithAggregatesFilter<"LinkOrAttachment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LinkOrAttachment"> | Date | string
  }

  export type TaskLogWhereInput = {
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    id?: StringFilter<"TaskLog"> | string
    userId?: UuidFilter<"TaskLog"> | string
    emailId?: StringFilter<"TaskLog"> | string
    prompt?: StringFilter<"TaskLog"> | string
    response?: StringNullableFilter<"TaskLog"> | string | null
    success?: BoolFilter<"TaskLog"> | boolean
    error?: StringNullableFilter<"TaskLog"> | string | null
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
    email?: XOR<EmailScalarRelationFilter, EmailWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TaskLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    prompt?: SortOrder
    response?: SortOrderInput | SortOrder
    success?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    email?: EmailOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type TaskLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    userId?: UuidFilter<"TaskLog"> | string
    emailId?: StringFilter<"TaskLog"> | string
    prompt?: StringFilter<"TaskLog"> | string
    response?: StringNullableFilter<"TaskLog"> | string | null
    success?: BoolFilter<"TaskLog"> | boolean
    error?: StringNullableFilter<"TaskLog"> | string | null
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
    email?: XOR<EmailScalarRelationFilter, EmailWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TaskLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    prompt?: SortOrder
    response?: SortOrderInput | SortOrder
    success?: SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TaskLogCountOrderByAggregateInput
    _max?: TaskLogMaxOrderByAggregateInput
    _min?: TaskLogMinOrderByAggregateInput
  }

  export type TaskLogScalarWhereWithAggregatesInput = {
    AND?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    OR?: TaskLogScalarWhereWithAggregatesInput[]
    NOT?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskLog"> | string
    userId?: UuidWithAggregatesFilter<"TaskLog"> | string
    emailId?: StringWithAggregatesFilter<"TaskLog"> | string
    prompt?: StringWithAggregatesFilter<"TaskLog"> | string
    response?: StringNullableWithAggregatesFilter<"TaskLog"> | string | null
    success?: BoolWithAggregatesFilter<"TaskLog"> | boolean
    error?: StringNullableWithAggregatesFilter<"TaskLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TaskLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    events?: EventCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationUncheckedCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUncheckedUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EmailCreateInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogCreateNestedManyWithoutEmailInput
    events?: EventCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationCreateNestedManyWithoutEmailInput
    user: UserCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateInput = {
    id?: string
    userId: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutEmailInput
    events?: EventUncheckedCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUpdateManyWithoutEmailNestedInput
    events?: EventUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUpdateManyWithoutEmailNestedInput
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutEmailNestedInput
    events?: EventUncheckedUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type EmailCreateManyInput = {
    id?: string
    userId: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
  }

  export type EmailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    email?: EmailCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutTasksInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    emailId?: string | null
    userId: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: EmailUpdateOneWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    emailId?: string | null
    userId: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventCreateInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    email?: EmailCreateNestedOneWithoutEventsInput
    user: UserCreateNestedOneWithoutEventsInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    userId: string
    emailId?: string | null
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneWithoutEventsNestedInput
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    userId: string
    emailId?: string | null
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyInformationCreateInput = {
    id?: string
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    email?: EmailCreateNestedOneWithoutKeyInformationInput
    user: UserCreateNestedOneWithoutKeyInfoInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutKeyInformationInput
  }

  export type KeyInformationUncheckedCreateInput = {
    id?: string
    userId: string
    emailId?: string | null
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutKeyInformationInput
  }

  export type KeyInformationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneWithoutKeyInformationNestedInput
    user?: UserUpdateOneRequiredWithoutKeyInfoNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutKeyInformationNestedInput
  }

  export type KeyInformationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutKeyInformationNestedInput
  }

  export type KeyInformationCreateManyInput = {
    id?: string
    userId: string
    emailId?: string | null
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
  }

  export type KeyInformationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyInformationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentCreateInput = {
    id?: string
    type: string
    identifier: string
    description: string
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutLinksOrAttachmentsInput
    event?: EventCreateNestedOneWithoutLinksOrAttachmentsInput
    keyInformation?: KeyInformationCreateNestedOneWithoutLinksOrAttachmentsInput
  }

  export type LinkOrAttachmentUncheckedCreateInput = {
    id?: string
    type: string
    identifier: string
    description: string
    taskId?: string | null
    eventId?: string | null
    keyInformationId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutLinksOrAttachmentsNestedInput
    event?: EventUpdateOneWithoutLinksOrAttachmentsNestedInput
    keyInformation?: KeyInformationUpdateOneWithoutLinksOrAttachmentsNestedInput
  }

  export type LinkOrAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    keyInformationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentCreateManyInput = {
    id?: string
    type: string
    identifier: string
    description: string
    taskId?: string | null
    eventId?: string | null
    keyInformationId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    keyInformationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateInput = {
    id?: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
    email: EmailCreateNestedOneWithoutTaskLogsInput
    user: UserCreateNestedOneWithoutTaskLogsInput
  }

  export type TaskLogUncheckedCreateInput = {
    id?: string
    userId: string
    emailId: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type TaskLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneRequiredWithoutTaskLogsNestedInput
    user?: UserUpdateOneRequiredWithoutTaskLogsNestedInput
  }

  export type TaskLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateManyInput = {
    id?: string
    userId: string
    emailId: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type TaskLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EmailListRelationFilter = {
    every?: EmailWhereInput
    some?: EmailWhereInput
    none?: EmailWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type KeyInformationListRelationFilter = {
    every?: KeyInformationWhereInput
    some?: KeyInformationWhereInput
    none?: KeyInformationWhereInput
  }

  export type TaskLogListRelationFilter = {
    every?: TaskLogWhereInput
    some?: TaskLogWhereInput
    none?: TaskLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KeyInformationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    forwardingemail?: SortOrder
    created_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    forwardingemail?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    forwardingemail?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumEmailCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailCategory | EnumEmailCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailCategoryNullableFilter<$PrismaModel> | $Enums.EmailCategory | null
  }

  export type EnumEmailStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailStatus | EnumEmailStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailStatusNullableFilter<$PrismaModel> | $Enums.EmailStatus | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EmailCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromEmail?: SortOrder
    originalSubject?: SortOrder
    summary?: SortOrder
    category?: SortOrder
    status?: SortOrder
    originalReceivedAt?: SortOrder
    processedAt?: SortOrder
  }

  export type EmailMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromEmail?: SortOrder
    originalSubject?: SortOrder
    summary?: SortOrder
    category?: SortOrder
    status?: SortOrder
    originalReceivedAt?: SortOrder
    processedAt?: SortOrder
  }

  export type EmailMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fromEmail?: SortOrder
    originalSubject?: SortOrder
    summary?: SortOrder
    category?: SortOrder
    status?: SortOrder
    originalReceivedAt?: SortOrder
    processedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumEmailCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailCategory | EnumEmailCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmailCategory | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmailCategoryNullableFilter<$PrismaModel>
    _max?: NestedEnumEmailCategoryNullableFilter<$PrismaModel>
  }

  export type EnumEmailStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailStatus | EnumEmailStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmailStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmailStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumEmailStatusNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUrgencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyFilter<$PrismaModel> | $Enums.Urgency
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type EmailNullableScalarRelationFilter = {
    is?: EmailWhereInput | null
    isNot?: EmailWhereInput | null
  }

  export type LinkOrAttachmentListRelationFilter = {
    every?: LinkOrAttachmentWhereInput
    some?: LinkOrAttachmentWhereInput
    none?: LinkOrAttachmentWhereInput
  }

  export type LinkOrAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    description?: SortOrder
    urgency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    description?: SortOrder
    urgency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    emailId?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    dueDate?: SortOrder
    description?: SortOrder
    urgency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type EnumUrgencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyWithAggregatesFilter<$PrismaModel> | $Enums.Urgency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUrgencyFilter<$PrismaModel>
    _max?: NestedEnumUrgencyFilter<$PrismaModel>
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    description?: SortOrder
    isRecurringHint?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    description?: SortOrder
    isRecurringHint?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    title?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    location?: SortOrder
    description?: SortOrder
    isRecurringHint?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type KeyInformationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    info?: SortOrder
    sourceHint?: SortOrder
    createdAt?: SortOrder
  }

  export type KeyInformationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    info?: SortOrder
    sourceHint?: SortOrder
    createdAt?: SortOrder
  }

  export type KeyInformationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    info?: SortOrder
    sourceHint?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskNullableScalarRelationFilter = {
    is?: TaskWhereInput | null
    isNot?: TaskWhereInput | null
  }

  export type EventNullableScalarRelationFilter = {
    is?: EventWhereInput | null
    isNot?: EventWhereInput | null
  }

  export type KeyInformationNullableScalarRelationFilter = {
    is?: KeyInformationWhereInput | null
    isNot?: KeyInformationWhereInput | null
  }

  export type LinkOrAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    taskId?: SortOrder
    eventId?: SortOrder
    keyInformationId?: SortOrder
    createdAt?: SortOrder
  }

  export type LinkOrAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    taskId?: SortOrder
    eventId?: SortOrder
    keyInformationId?: SortOrder
    createdAt?: SortOrder
  }

  export type LinkOrAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    identifier?: SortOrder
    description?: SortOrder
    taskId?: SortOrder
    eventId?: SortOrder
    keyInformationId?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailScalarRelationFilter = {
    is?: EmailWhereInput
    isNot?: EmailWhereInput
  }

  export type TaskLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    success?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    success?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    emailId?: SortOrder
    prompt?: SortOrder
    response?: SortOrder
    success?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
  }

  export type EmailCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type KeyInformationCreateNestedManyWithoutUserInput = {
    create?: XOR<KeyInformationCreateWithoutUserInput, KeyInformationUncheckedCreateWithoutUserInput> | KeyInformationCreateWithoutUserInput[] | KeyInformationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutUserInput | KeyInformationCreateOrConnectWithoutUserInput[]
    createMany?: KeyInformationCreateManyUserInputEnvelope
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
  }

  export type TaskLogCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskLogCreateWithoutUserInput, TaskLogUncheckedCreateWithoutUserInput> | TaskLogCreateWithoutUserInput[] | TaskLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutUserInput | TaskLogCreateOrConnectWithoutUserInput[]
    createMany?: TaskLogCreateManyUserInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type EmailUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type KeyInformationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<KeyInformationCreateWithoutUserInput, KeyInformationUncheckedCreateWithoutUserInput> | KeyInformationCreateWithoutUserInput[] | KeyInformationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutUserInput | KeyInformationCreateOrConnectWithoutUserInput[]
    createMany?: KeyInformationCreateManyUserInputEnvelope
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskLogCreateWithoutUserInput, TaskLogUncheckedCreateWithoutUserInput> | TaskLogCreateWithoutUserInput[] | TaskLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutUserInput | TaskLogCreateOrConnectWithoutUserInput[]
    createMany?: TaskLogCreateManyUserInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EmailUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutUserInput | EmailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutUserInput | EmailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutUserInput | EmailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type EventUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type KeyInformationUpdateManyWithoutUserNestedInput = {
    create?: XOR<KeyInformationCreateWithoutUserInput, KeyInformationUncheckedCreateWithoutUserInput> | KeyInformationCreateWithoutUserInput[] | KeyInformationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutUserInput | KeyInformationCreateOrConnectWithoutUserInput[]
    upsert?: KeyInformationUpsertWithWhereUniqueWithoutUserInput | KeyInformationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: KeyInformationCreateManyUserInputEnvelope
    set?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    disconnect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    delete?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    update?: KeyInformationUpdateWithWhereUniqueWithoutUserInput | KeyInformationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: KeyInformationUpdateManyWithWhereWithoutUserInput | KeyInformationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: KeyInformationScalarWhereInput | KeyInformationScalarWhereInput[]
  }

  export type TaskLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskLogCreateWithoutUserInput, TaskLogUncheckedCreateWithoutUserInput> | TaskLogCreateWithoutUserInput[] | TaskLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutUserInput | TaskLogCreateOrConnectWithoutUserInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutUserInput | TaskLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskLogCreateManyUserInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutUserInput | TaskLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutUserInput | TaskLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type EmailUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput> | EmailCreateWithoutUserInput[] | EmailUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EmailCreateOrConnectWithoutUserInput | EmailCreateOrConnectWithoutUserInput[]
    upsert?: EmailUpsertWithWhereUniqueWithoutUserInput | EmailUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EmailCreateManyUserInputEnvelope
    set?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    disconnect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    delete?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    connect?: EmailWhereUniqueInput | EmailWhereUniqueInput[]
    update?: EmailUpdateWithWhereUniqueWithoutUserInput | EmailUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EmailUpdateManyWithWhereWithoutUserInput | EmailUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EmailScalarWhereInput | EmailScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EventCreateManyUserInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type KeyInformationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<KeyInformationCreateWithoutUserInput, KeyInformationUncheckedCreateWithoutUserInput> | KeyInformationCreateWithoutUserInput[] | KeyInformationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutUserInput | KeyInformationCreateOrConnectWithoutUserInput[]
    upsert?: KeyInformationUpsertWithWhereUniqueWithoutUserInput | KeyInformationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: KeyInformationCreateManyUserInputEnvelope
    set?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    disconnect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    delete?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    update?: KeyInformationUpdateWithWhereUniqueWithoutUserInput | KeyInformationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: KeyInformationUpdateManyWithWhereWithoutUserInput | KeyInformationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: KeyInformationScalarWhereInput | KeyInformationScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskLogCreateWithoutUserInput, TaskLogUncheckedCreateWithoutUserInput> | TaskLogCreateWithoutUserInput[] | TaskLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutUserInput | TaskLogCreateOrConnectWithoutUserInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutUserInput | TaskLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskLogCreateManyUserInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutUserInput | TaskLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutUserInput | TaskLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskCreateNestedManyWithoutEmailInput = {
    create?: XOR<TaskCreateWithoutEmailInput, TaskUncheckedCreateWithoutEmailInput> | TaskCreateWithoutEmailInput[] | TaskUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmailInput | TaskCreateOrConnectWithoutEmailInput[]
    createMany?: TaskCreateManyEmailInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskLogCreateNestedManyWithoutEmailInput = {
    create?: XOR<TaskLogCreateWithoutEmailInput, TaskLogUncheckedCreateWithoutEmailInput> | TaskLogCreateWithoutEmailInput[] | TaskLogUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutEmailInput | TaskLogCreateOrConnectWithoutEmailInput[]
    createMany?: TaskLogCreateManyEmailInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutEmailInput = {
    create?: XOR<EventCreateWithoutEmailInput, EventUncheckedCreateWithoutEmailInput> | EventCreateWithoutEmailInput[] | EventUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: EventCreateOrConnectWithoutEmailInput | EventCreateOrConnectWithoutEmailInput[]
    createMany?: EventCreateManyEmailInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type KeyInformationCreateNestedManyWithoutEmailInput = {
    create?: XOR<KeyInformationCreateWithoutEmailInput, KeyInformationUncheckedCreateWithoutEmailInput> | KeyInformationCreateWithoutEmailInput[] | KeyInformationUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutEmailInput | KeyInformationCreateOrConnectWithoutEmailInput[]
    createMany?: KeyInformationCreateManyEmailInputEnvelope
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutEmailsInput = {
    create?: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskUncheckedCreateNestedManyWithoutEmailInput = {
    create?: XOR<TaskCreateWithoutEmailInput, TaskUncheckedCreateWithoutEmailInput> | TaskCreateWithoutEmailInput[] | TaskUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmailInput | TaskCreateOrConnectWithoutEmailInput[]
    createMany?: TaskCreateManyEmailInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutEmailInput = {
    create?: XOR<TaskLogCreateWithoutEmailInput, TaskLogUncheckedCreateWithoutEmailInput> | TaskLogCreateWithoutEmailInput[] | TaskLogUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutEmailInput | TaskLogCreateOrConnectWithoutEmailInput[]
    createMany?: TaskLogCreateManyEmailInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutEmailInput = {
    create?: XOR<EventCreateWithoutEmailInput, EventUncheckedCreateWithoutEmailInput> | EventCreateWithoutEmailInput[] | EventUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: EventCreateOrConnectWithoutEmailInput | EventCreateOrConnectWithoutEmailInput[]
    createMany?: EventCreateManyEmailInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type KeyInformationUncheckedCreateNestedManyWithoutEmailInput = {
    create?: XOR<KeyInformationCreateWithoutEmailInput, KeyInformationUncheckedCreateWithoutEmailInput> | KeyInformationCreateWithoutEmailInput[] | KeyInformationUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutEmailInput | KeyInformationCreateOrConnectWithoutEmailInput[]
    createMany?: KeyInformationCreateManyEmailInputEnvelope
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumEmailCategoryFieldUpdateOperationsInput = {
    set?: $Enums.EmailCategory | null
  }

  export type NullableEnumEmailStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmailStatus | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TaskUpdateManyWithoutEmailNestedInput = {
    create?: XOR<TaskCreateWithoutEmailInput, TaskUncheckedCreateWithoutEmailInput> | TaskCreateWithoutEmailInput[] | TaskUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmailInput | TaskCreateOrConnectWithoutEmailInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutEmailInput | TaskUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: TaskCreateManyEmailInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutEmailInput | TaskUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutEmailInput | TaskUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskLogUpdateManyWithoutEmailNestedInput = {
    create?: XOR<TaskLogCreateWithoutEmailInput, TaskLogUncheckedCreateWithoutEmailInput> | TaskLogCreateWithoutEmailInput[] | TaskLogUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutEmailInput | TaskLogCreateOrConnectWithoutEmailInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutEmailInput | TaskLogUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: TaskLogCreateManyEmailInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutEmailInput | TaskLogUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutEmailInput | TaskLogUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type EventUpdateManyWithoutEmailNestedInput = {
    create?: XOR<EventCreateWithoutEmailInput, EventUncheckedCreateWithoutEmailInput> | EventCreateWithoutEmailInput[] | EventUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: EventCreateOrConnectWithoutEmailInput | EventCreateOrConnectWithoutEmailInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutEmailInput | EventUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: EventCreateManyEmailInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutEmailInput | EventUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: EventUpdateManyWithWhereWithoutEmailInput | EventUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type KeyInformationUpdateManyWithoutEmailNestedInput = {
    create?: XOR<KeyInformationCreateWithoutEmailInput, KeyInformationUncheckedCreateWithoutEmailInput> | KeyInformationCreateWithoutEmailInput[] | KeyInformationUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutEmailInput | KeyInformationCreateOrConnectWithoutEmailInput[]
    upsert?: KeyInformationUpsertWithWhereUniqueWithoutEmailInput | KeyInformationUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: KeyInformationCreateManyEmailInputEnvelope
    set?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    disconnect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    delete?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    update?: KeyInformationUpdateWithWhereUniqueWithoutEmailInput | KeyInformationUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: KeyInformationUpdateManyWithWhereWithoutEmailInput | KeyInformationUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: KeyInformationScalarWhereInput | KeyInformationScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmailsInput
    upsert?: UserUpsertWithoutEmailsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmailsInput, UserUpdateWithoutEmailsInput>, UserUncheckedUpdateWithoutEmailsInput>
  }

  export type TaskUncheckedUpdateManyWithoutEmailNestedInput = {
    create?: XOR<TaskCreateWithoutEmailInput, TaskUncheckedCreateWithoutEmailInput> | TaskCreateWithoutEmailInput[] | TaskUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutEmailInput | TaskCreateOrConnectWithoutEmailInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutEmailInput | TaskUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: TaskCreateManyEmailInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutEmailInput | TaskUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutEmailInput | TaskUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutEmailNestedInput = {
    create?: XOR<TaskLogCreateWithoutEmailInput, TaskLogUncheckedCreateWithoutEmailInput> | TaskLogCreateWithoutEmailInput[] | TaskLogUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutEmailInput | TaskLogCreateOrConnectWithoutEmailInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutEmailInput | TaskLogUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: TaskLogCreateManyEmailInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutEmailInput | TaskLogUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutEmailInput | TaskLogUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutEmailNestedInput = {
    create?: XOR<EventCreateWithoutEmailInput, EventUncheckedCreateWithoutEmailInput> | EventCreateWithoutEmailInput[] | EventUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: EventCreateOrConnectWithoutEmailInput | EventCreateOrConnectWithoutEmailInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutEmailInput | EventUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: EventCreateManyEmailInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutEmailInput | EventUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: EventUpdateManyWithWhereWithoutEmailInput | EventUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type KeyInformationUncheckedUpdateManyWithoutEmailNestedInput = {
    create?: XOR<KeyInformationCreateWithoutEmailInput, KeyInformationUncheckedCreateWithoutEmailInput> | KeyInformationCreateWithoutEmailInput[] | KeyInformationUncheckedCreateWithoutEmailInput[]
    connectOrCreate?: KeyInformationCreateOrConnectWithoutEmailInput | KeyInformationCreateOrConnectWithoutEmailInput[]
    upsert?: KeyInformationUpsertWithWhereUniqueWithoutEmailInput | KeyInformationUpsertWithWhereUniqueWithoutEmailInput[]
    createMany?: KeyInformationCreateManyEmailInputEnvelope
    set?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    disconnect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    delete?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    connect?: KeyInformationWhereUniqueInput | KeyInformationWhereUniqueInput[]
    update?: KeyInformationUpdateWithWhereUniqueWithoutEmailInput | KeyInformationUpdateWithWhereUniqueWithoutEmailInput[]
    updateMany?: KeyInformationUpdateManyWithWhereWithoutEmailInput | KeyInformationUpdateManyWithWhereWithoutEmailInput[]
    deleteMany?: KeyInformationScalarWhereInput | KeyInformationScalarWhereInput[]
  }

  export type EmailCreateNestedOneWithoutTasksInput = {
    create?: XOR<EmailCreateWithoutTasksInput, EmailUncheckedCreateWithoutTasksInput>
    connectOrCreate?: EmailCreateOrConnectWithoutTasksInput
    connect?: EmailWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type LinkOrAttachmentCreateNestedManyWithoutTaskInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutTaskInput, LinkOrAttachmentUncheckedCreateWithoutTaskInput> | LinkOrAttachmentCreateWithoutTaskInput[] | LinkOrAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutTaskInput | LinkOrAttachmentCreateOrConnectWithoutTaskInput[]
    createMany?: LinkOrAttachmentCreateManyTaskInputEnvelope
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
  }

  export type LinkOrAttachmentUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutTaskInput, LinkOrAttachmentUncheckedCreateWithoutTaskInput> | LinkOrAttachmentCreateWithoutTaskInput[] | LinkOrAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutTaskInput | LinkOrAttachmentCreateOrConnectWithoutTaskInput[]
    createMany?: LinkOrAttachmentCreateManyTaskInputEnvelope
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
  }

  export type EnumUrgencyFieldUpdateOperationsInput = {
    set?: $Enums.Urgency
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type EmailUpdateOneWithoutTasksNestedInput = {
    create?: XOR<EmailCreateWithoutTasksInput, EmailUncheckedCreateWithoutTasksInput>
    connectOrCreate?: EmailCreateOrConnectWithoutTasksInput
    upsert?: EmailUpsertWithoutTasksInput
    disconnect?: EmailWhereInput | boolean
    delete?: EmailWhereInput | boolean
    connect?: EmailWhereUniqueInput
    update?: XOR<XOR<EmailUpdateToOneWithWhereWithoutTasksInput, EmailUpdateWithoutTasksInput>, EmailUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type LinkOrAttachmentUpdateManyWithoutTaskNestedInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutTaskInput, LinkOrAttachmentUncheckedCreateWithoutTaskInput> | LinkOrAttachmentCreateWithoutTaskInput[] | LinkOrAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutTaskInput | LinkOrAttachmentCreateOrConnectWithoutTaskInput[]
    upsert?: LinkOrAttachmentUpsertWithWhereUniqueWithoutTaskInput | LinkOrAttachmentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: LinkOrAttachmentCreateManyTaskInputEnvelope
    set?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    disconnect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    delete?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    update?: LinkOrAttachmentUpdateWithWhereUniqueWithoutTaskInput | LinkOrAttachmentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: LinkOrAttachmentUpdateManyWithWhereWithoutTaskInput | LinkOrAttachmentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
  }

  export type LinkOrAttachmentUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutTaskInput, LinkOrAttachmentUncheckedCreateWithoutTaskInput> | LinkOrAttachmentCreateWithoutTaskInput[] | LinkOrAttachmentUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutTaskInput | LinkOrAttachmentCreateOrConnectWithoutTaskInput[]
    upsert?: LinkOrAttachmentUpsertWithWhereUniqueWithoutTaskInput | LinkOrAttachmentUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: LinkOrAttachmentCreateManyTaskInputEnvelope
    set?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    disconnect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    delete?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    update?: LinkOrAttachmentUpdateWithWhereUniqueWithoutTaskInput | LinkOrAttachmentUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: LinkOrAttachmentUpdateManyWithWhereWithoutTaskInput | LinkOrAttachmentUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
  }

  export type EmailCreateNestedOneWithoutEventsInput = {
    create?: XOR<EmailCreateWithoutEventsInput, EmailUncheckedCreateWithoutEventsInput>
    connectOrCreate?: EmailCreateOrConnectWithoutEventsInput
    connect?: EmailWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type LinkOrAttachmentCreateNestedManyWithoutEventInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutEventInput, LinkOrAttachmentUncheckedCreateWithoutEventInput> | LinkOrAttachmentCreateWithoutEventInput[] | LinkOrAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutEventInput | LinkOrAttachmentCreateOrConnectWithoutEventInput[]
    createMany?: LinkOrAttachmentCreateManyEventInputEnvelope
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
  }

  export type LinkOrAttachmentUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutEventInput, LinkOrAttachmentUncheckedCreateWithoutEventInput> | LinkOrAttachmentCreateWithoutEventInput[] | LinkOrAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutEventInput | LinkOrAttachmentCreateOrConnectWithoutEventInput[]
    createMany?: LinkOrAttachmentCreateManyEventInputEnvelope
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EmailUpdateOneWithoutEventsNestedInput = {
    create?: XOR<EmailCreateWithoutEventsInput, EmailUncheckedCreateWithoutEventsInput>
    connectOrCreate?: EmailCreateOrConnectWithoutEventsInput
    upsert?: EmailUpsertWithoutEventsInput
    disconnect?: EmailWhereInput | boolean
    delete?: EmailWhereInput | boolean
    connect?: EmailWhereUniqueInput
    update?: XOR<XOR<EmailUpdateToOneWithWhereWithoutEventsInput, EmailUpdateWithoutEventsInput>, EmailUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type LinkOrAttachmentUpdateManyWithoutEventNestedInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutEventInput, LinkOrAttachmentUncheckedCreateWithoutEventInput> | LinkOrAttachmentCreateWithoutEventInput[] | LinkOrAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutEventInput | LinkOrAttachmentCreateOrConnectWithoutEventInput[]
    upsert?: LinkOrAttachmentUpsertWithWhereUniqueWithoutEventInput | LinkOrAttachmentUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: LinkOrAttachmentCreateManyEventInputEnvelope
    set?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    disconnect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    delete?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    update?: LinkOrAttachmentUpdateWithWhereUniqueWithoutEventInput | LinkOrAttachmentUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: LinkOrAttachmentUpdateManyWithWhereWithoutEventInput | LinkOrAttachmentUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
  }

  export type LinkOrAttachmentUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutEventInput, LinkOrAttachmentUncheckedCreateWithoutEventInput> | LinkOrAttachmentCreateWithoutEventInput[] | LinkOrAttachmentUncheckedCreateWithoutEventInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutEventInput | LinkOrAttachmentCreateOrConnectWithoutEventInput[]
    upsert?: LinkOrAttachmentUpsertWithWhereUniqueWithoutEventInput | LinkOrAttachmentUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: LinkOrAttachmentCreateManyEventInputEnvelope
    set?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    disconnect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    delete?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    update?: LinkOrAttachmentUpdateWithWhereUniqueWithoutEventInput | LinkOrAttachmentUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: LinkOrAttachmentUpdateManyWithWhereWithoutEventInput | LinkOrAttachmentUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
  }

  export type EmailCreateNestedOneWithoutKeyInformationInput = {
    create?: XOR<EmailCreateWithoutKeyInformationInput, EmailUncheckedCreateWithoutKeyInformationInput>
    connectOrCreate?: EmailCreateOrConnectWithoutKeyInformationInput
    connect?: EmailWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutKeyInfoInput = {
    create?: XOR<UserCreateWithoutKeyInfoInput, UserUncheckedCreateWithoutKeyInfoInput>
    connectOrCreate?: UserCreateOrConnectWithoutKeyInfoInput
    connect?: UserWhereUniqueInput
  }

  export type LinkOrAttachmentCreateNestedManyWithoutKeyInformationInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutKeyInformationInput, LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput> | LinkOrAttachmentCreateWithoutKeyInformationInput[] | LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput | LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput[]
    createMany?: LinkOrAttachmentCreateManyKeyInformationInputEnvelope
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
  }

  export type LinkOrAttachmentUncheckedCreateNestedManyWithoutKeyInformationInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutKeyInformationInput, LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput> | LinkOrAttachmentCreateWithoutKeyInformationInput[] | LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput | LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput[]
    createMany?: LinkOrAttachmentCreateManyKeyInformationInputEnvelope
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
  }

  export type EmailUpdateOneWithoutKeyInformationNestedInput = {
    create?: XOR<EmailCreateWithoutKeyInformationInput, EmailUncheckedCreateWithoutKeyInformationInput>
    connectOrCreate?: EmailCreateOrConnectWithoutKeyInformationInput
    upsert?: EmailUpsertWithoutKeyInformationInput
    disconnect?: EmailWhereInput | boolean
    delete?: EmailWhereInput | boolean
    connect?: EmailWhereUniqueInput
    update?: XOR<XOR<EmailUpdateToOneWithWhereWithoutKeyInformationInput, EmailUpdateWithoutKeyInformationInput>, EmailUncheckedUpdateWithoutKeyInformationInput>
  }

  export type UserUpdateOneRequiredWithoutKeyInfoNestedInput = {
    create?: XOR<UserCreateWithoutKeyInfoInput, UserUncheckedCreateWithoutKeyInfoInput>
    connectOrCreate?: UserCreateOrConnectWithoutKeyInfoInput
    upsert?: UserUpsertWithoutKeyInfoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutKeyInfoInput, UserUpdateWithoutKeyInfoInput>, UserUncheckedUpdateWithoutKeyInfoInput>
  }

  export type LinkOrAttachmentUpdateManyWithoutKeyInformationNestedInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutKeyInformationInput, LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput> | LinkOrAttachmentCreateWithoutKeyInformationInput[] | LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput | LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput[]
    upsert?: LinkOrAttachmentUpsertWithWhereUniqueWithoutKeyInformationInput | LinkOrAttachmentUpsertWithWhereUniqueWithoutKeyInformationInput[]
    createMany?: LinkOrAttachmentCreateManyKeyInformationInputEnvelope
    set?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    disconnect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    delete?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    update?: LinkOrAttachmentUpdateWithWhereUniqueWithoutKeyInformationInput | LinkOrAttachmentUpdateWithWhereUniqueWithoutKeyInformationInput[]
    updateMany?: LinkOrAttachmentUpdateManyWithWhereWithoutKeyInformationInput | LinkOrAttachmentUpdateManyWithWhereWithoutKeyInformationInput[]
    deleteMany?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
  }

  export type LinkOrAttachmentUncheckedUpdateManyWithoutKeyInformationNestedInput = {
    create?: XOR<LinkOrAttachmentCreateWithoutKeyInformationInput, LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput> | LinkOrAttachmentCreateWithoutKeyInformationInput[] | LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput[]
    connectOrCreate?: LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput | LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput[]
    upsert?: LinkOrAttachmentUpsertWithWhereUniqueWithoutKeyInformationInput | LinkOrAttachmentUpsertWithWhereUniqueWithoutKeyInformationInput[]
    createMany?: LinkOrAttachmentCreateManyKeyInformationInputEnvelope
    set?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    disconnect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    delete?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    connect?: LinkOrAttachmentWhereUniqueInput | LinkOrAttachmentWhereUniqueInput[]
    update?: LinkOrAttachmentUpdateWithWhereUniqueWithoutKeyInformationInput | LinkOrAttachmentUpdateWithWhereUniqueWithoutKeyInformationInput[]
    updateMany?: LinkOrAttachmentUpdateManyWithWhereWithoutKeyInformationInput | LinkOrAttachmentUpdateManyWithWhereWithoutKeyInformationInput[]
    deleteMany?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutLinksOrAttachmentsInput = {
    create?: XOR<TaskCreateWithoutLinksOrAttachmentsInput, TaskUncheckedCreateWithoutLinksOrAttachmentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutLinksOrAttachmentsInput
    connect?: TaskWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutLinksOrAttachmentsInput = {
    create?: XOR<EventCreateWithoutLinksOrAttachmentsInput, EventUncheckedCreateWithoutLinksOrAttachmentsInput>
    connectOrCreate?: EventCreateOrConnectWithoutLinksOrAttachmentsInput
    connect?: EventWhereUniqueInput
  }

  export type KeyInformationCreateNestedOneWithoutLinksOrAttachmentsInput = {
    create?: XOR<KeyInformationCreateWithoutLinksOrAttachmentsInput, KeyInformationUncheckedCreateWithoutLinksOrAttachmentsInput>
    connectOrCreate?: KeyInformationCreateOrConnectWithoutLinksOrAttachmentsInput
    connect?: KeyInformationWhereUniqueInput
  }

  export type TaskUpdateOneWithoutLinksOrAttachmentsNestedInput = {
    create?: XOR<TaskCreateWithoutLinksOrAttachmentsInput, TaskUncheckedCreateWithoutLinksOrAttachmentsInput>
    connectOrCreate?: TaskCreateOrConnectWithoutLinksOrAttachmentsInput
    upsert?: TaskUpsertWithoutLinksOrAttachmentsInput
    disconnect?: TaskWhereInput | boolean
    delete?: TaskWhereInput | boolean
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutLinksOrAttachmentsInput, TaskUpdateWithoutLinksOrAttachmentsInput>, TaskUncheckedUpdateWithoutLinksOrAttachmentsInput>
  }

  export type EventUpdateOneWithoutLinksOrAttachmentsNestedInput = {
    create?: XOR<EventCreateWithoutLinksOrAttachmentsInput, EventUncheckedCreateWithoutLinksOrAttachmentsInput>
    connectOrCreate?: EventCreateOrConnectWithoutLinksOrAttachmentsInput
    upsert?: EventUpsertWithoutLinksOrAttachmentsInput
    disconnect?: EventWhereInput | boolean
    delete?: EventWhereInput | boolean
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutLinksOrAttachmentsInput, EventUpdateWithoutLinksOrAttachmentsInput>, EventUncheckedUpdateWithoutLinksOrAttachmentsInput>
  }

  export type KeyInformationUpdateOneWithoutLinksOrAttachmentsNestedInput = {
    create?: XOR<KeyInformationCreateWithoutLinksOrAttachmentsInput, KeyInformationUncheckedCreateWithoutLinksOrAttachmentsInput>
    connectOrCreate?: KeyInformationCreateOrConnectWithoutLinksOrAttachmentsInput
    upsert?: KeyInformationUpsertWithoutLinksOrAttachmentsInput
    disconnect?: KeyInformationWhereInput | boolean
    delete?: KeyInformationWhereInput | boolean
    connect?: KeyInformationWhereUniqueInput
    update?: XOR<XOR<KeyInformationUpdateToOneWithWhereWithoutLinksOrAttachmentsInput, KeyInformationUpdateWithoutLinksOrAttachmentsInput>, KeyInformationUncheckedUpdateWithoutLinksOrAttachmentsInput>
  }

  export type EmailCreateNestedOneWithoutTaskLogsInput = {
    create?: XOR<EmailCreateWithoutTaskLogsInput, EmailUncheckedCreateWithoutTaskLogsInput>
    connectOrCreate?: EmailCreateOrConnectWithoutTaskLogsInput
    connect?: EmailWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTaskLogsInput = {
    create?: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EmailUpdateOneRequiredWithoutTaskLogsNestedInput = {
    create?: XOR<EmailCreateWithoutTaskLogsInput, EmailUncheckedCreateWithoutTaskLogsInput>
    connectOrCreate?: EmailCreateOrConnectWithoutTaskLogsInput
    upsert?: EmailUpsertWithoutTaskLogsInput
    connect?: EmailWhereUniqueInput
    update?: XOR<XOR<EmailUpdateToOneWithWhereWithoutTaskLogsInput, EmailUpdateWithoutTaskLogsInput>, EmailUncheckedUpdateWithoutTaskLogsInput>
  }

  export type UserUpdateOneRequiredWithoutTaskLogsNestedInput = {
    create?: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskLogsInput
    upsert?: UserUpsertWithoutTaskLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskLogsInput, UserUpdateWithoutTaskLogsInput>, UserUncheckedUpdateWithoutTaskLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumEmailCategoryNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailCategory | EnumEmailCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailCategoryNullableFilter<$PrismaModel> | $Enums.EmailCategory | null
  }

  export type NestedEnumEmailStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailStatus | EnumEmailStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailStatusNullableFilter<$PrismaModel> | $Enums.EmailStatus | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumEmailCategoryNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailCategory | EnumEmailCategoryFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailCategory[] | ListEnumEmailCategoryFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailCategoryNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmailCategory | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmailCategoryNullableFilter<$PrismaModel>
    _max?: NestedEnumEmailCategoryNullableFilter<$PrismaModel>
  }

  export type NestedEnumEmailStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmailStatus | EnumEmailStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EmailStatus[] | ListEnumEmailStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEmailStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.EmailStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEmailStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumEmailStatusNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUrgencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyFilter<$PrismaModel> | $Enums.Urgency
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedEnumUrgencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Urgency | EnumUrgencyFieldRefInput<$PrismaModel>
    in?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Urgency[] | ListEnumUrgencyFieldRefInput<$PrismaModel>
    not?: NestedEnumUrgencyWithAggregatesFilter<$PrismaModel> | $Enums.Urgency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUrgencyFilter<$PrismaModel>
    _max?: NestedEnumUrgencyFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EmailCreateWithoutUserInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogCreateNestedManyWithoutEmailInput
    events?: EventCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationCreateNestedManyWithoutEmailInput
  }

  export type EmailUncheckedCreateWithoutUserInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutEmailInput
    events?: EventUncheckedCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutUserInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput>
  }

  export type EmailCreateManyUserInputEnvelope = {
    data: EmailCreateManyUserInput | EmailCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    email?: EmailCreateNestedOneWithoutTasksInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    emailId?: string | null
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutUserInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    email?: EmailCreateNestedOneWithoutEventsInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutUserInput = {
    id?: string
    emailId?: string | null
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventCreateManyUserInputEnvelope = {
    data: EventCreateManyUserInput | EventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type KeyInformationCreateWithoutUserInput = {
    id?: string
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    email?: EmailCreateNestedOneWithoutKeyInformationInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutKeyInformationInput
  }

  export type KeyInformationUncheckedCreateWithoutUserInput = {
    id?: string
    emailId?: string | null
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutKeyInformationInput
  }

  export type KeyInformationCreateOrConnectWithoutUserInput = {
    where: KeyInformationWhereUniqueInput
    create: XOR<KeyInformationCreateWithoutUserInput, KeyInformationUncheckedCreateWithoutUserInput>
  }

  export type KeyInformationCreateManyUserInputEnvelope = {
    data: KeyInformationCreateManyUserInput | KeyInformationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskLogCreateWithoutUserInput = {
    id?: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
    email: EmailCreateNestedOneWithoutTaskLogsInput
  }

  export type TaskLogUncheckedCreateWithoutUserInput = {
    id?: string
    emailId: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type TaskLogCreateOrConnectWithoutUserInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutUserInput, TaskLogUncheckedCreateWithoutUserInput>
  }

  export type TaskLogCreateManyUserInputEnvelope = {
    data: TaskLogCreateManyUserInput | TaskLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EmailUpsertWithWhereUniqueWithoutUserInput = {
    where: EmailWhereUniqueInput
    update: XOR<EmailUpdateWithoutUserInput, EmailUncheckedUpdateWithoutUserInput>
    create: XOR<EmailCreateWithoutUserInput, EmailUncheckedCreateWithoutUserInput>
  }

  export type EmailUpdateWithWhereUniqueWithoutUserInput = {
    where: EmailWhereUniqueInput
    data: XOR<EmailUpdateWithoutUserInput, EmailUncheckedUpdateWithoutUserInput>
  }

  export type EmailUpdateManyWithWhereWithoutUserInput = {
    where: EmailScalarWhereInput
    data: XOR<EmailUpdateManyMutationInput, EmailUncheckedUpdateManyWithoutUserInput>
  }

  export type EmailScalarWhereInput = {
    AND?: EmailScalarWhereInput | EmailScalarWhereInput[]
    OR?: EmailScalarWhereInput[]
    NOT?: EmailScalarWhereInput | EmailScalarWhereInput[]
    id?: StringFilter<"Email"> | string
    userId?: UuidFilter<"Email"> | string
    fromEmail?: StringNullableFilter<"Email"> | string | null
    originalSubject?: StringNullableFilter<"Email"> | string | null
    summary?: StringNullableFilter<"Email"> | string | null
    category?: EnumEmailCategoryNullableFilter<"Email"> | $Enums.EmailCategory | null
    status?: EnumEmailStatusNullableFilter<"Email"> | $Enums.EmailStatus | null
    originalReceivedAt?: DateTimeNullableFilter<"Email"> | Date | string | null
    processedAt?: DateTimeFilter<"Email"> | Date | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    emailId?: StringNullableFilter<"Task"> | string | null
    userId?: UuidFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    description?: StringNullableFilter<"Task"> | string | null
    urgency?: EnumUrgencyFilter<"Task"> | $Enums.Urgency
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    createdAt?: DateTimeFilter<"Task"> | Date | string
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
  }

  export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
  }

  export type EventUpdateManyWithWhereWithoutUserInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutUserInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    userId?: UuidFilter<"Event"> | string
    emailId?: StringNullableFilter<"Event"> | string | null
    title?: StringFilter<"Event"> | string
    startTime?: DateTimeFilter<"Event"> | Date | string
    endTime?: DateTimeFilter<"Event"> | Date | string
    location?: StringNullableFilter<"Event"> | string | null
    description?: StringNullableFilter<"Event"> | string | null
    isRecurringHint?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type KeyInformationUpsertWithWhereUniqueWithoutUserInput = {
    where: KeyInformationWhereUniqueInput
    update: XOR<KeyInformationUpdateWithoutUserInput, KeyInformationUncheckedUpdateWithoutUserInput>
    create: XOR<KeyInformationCreateWithoutUserInput, KeyInformationUncheckedCreateWithoutUserInput>
  }

  export type KeyInformationUpdateWithWhereUniqueWithoutUserInput = {
    where: KeyInformationWhereUniqueInput
    data: XOR<KeyInformationUpdateWithoutUserInput, KeyInformationUncheckedUpdateWithoutUserInput>
  }

  export type KeyInformationUpdateManyWithWhereWithoutUserInput = {
    where: KeyInformationScalarWhereInput
    data: XOR<KeyInformationUpdateManyMutationInput, KeyInformationUncheckedUpdateManyWithoutUserInput>
  }

  export type KeyInformationScalarWhereInput = {
    AND?: KeyInformationScalarWhereInput | KeyInformationScalarWhereInput[]
    OR?: KeyInformationScalarWhereInput[]
    NOT?: KeyInformationScalarWhereInput | KeyInformationScalarWhereInput[]
    id?: StringFilter<"KeyInformation"> | string
    userId?: UuidFilter<"KeyInformation"> | string
    emailId?: StringNullableFilter<"KeyInformation"> | string | null
    info?: StringFilter<"KeyInformation"> | string
    sourceHint?: StringNullableFilter<"KeyInformation"> | string | null
    createdAt?: DateTimeFilter<"KeyInformation"> | Date | string
  }

  export type TaskLogUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutUserInput, TaskLogUncheckedUpdateWithoutUserInput>
    create: XOR<TaskLogCreateWithoutUserInput, TaskLogUncheckedCreateWithoutUserInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutUserInput, TaskLogUncheckedUpdateWithoutUserInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutUserInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskLogScalarWhereInput = {
    AND?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    OR?: TaskLogScalarWhereInput[]
    NOT?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    id?: StringFilter<"TaskLog"> | string
    userId?: UuidFilter<"TaskLog"> | string
    emailId?: StringFilter<"TaskLog"> | string
    prompt?: StringFilter<"TaskLog"> | string
    response?: StringNullableFilter<"TaskLog"> | string | null
    success?: BoolFilter<"TaskLog"> | boolean
    error?: StringNullableFilter<"TaskLog"> | string | null
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
  }

  export type TaskCreateWithoutEmailInput = {
    id?: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTasksInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutEmailInput = {
    id?: string
    userId: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutEmailInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutEmailInput, TaskUncheckedCreateWithoutEmailInput>
  }

  export type TaskCreateManyEmailInputEnvelope = {
    data: TaskCreateManyEmailInput | TaskCreateManyEmailInput[]
    skipDuplicates?: boolean
  }

  export type TaskLogCreateWithoutEmailInput = {
    id?: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTaskLogsInput
  }

  export type TaskLogUncheckedCreateWithoutEmailInput = {
    id?: string
    userId: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type TaskLogCreateOrConnectWithoutEmailInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutEmailInput, TaskLogUncheckedCreateWithoutEmailInput>
  }

  export type TaskLogCreateManyEmailInputEnvelope = {
    data: TaskLogCreateManyEmailInput | TaskLogCreateManyEmailInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutEmailInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutEventsInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutEmailInput = {
    id?: string
    userId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutEmailInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutEmailInput, EventUncheckedCreateWithoutEmailInput>
  }

  export type EventCreateManyEmailInputEnvelope = {
    data: EventCreateManyEmailInput | EventCreateManyEmailInput[]
    skipDuplicates?: boolean
  }

  export type KeyInformationCreateWithoutEmailInput = {
    id?: string
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutKeyInfoInput
    linksOrAttachments?: LinkOrAttachmentCreateNestedManyWithoutKeyInformationInput
  }

  export type KeyInformationUncheckedCreateWithoutEmailInput = {
    id?: string
    userId: string
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedCreateNestedManyWithoutKeyInformationInput
  }

  export type KeyInformationCreateOrConnectWithoutEmailInput = {
    where: KeyInformationWhereUniqueInput
    create: XOR<KeyInformationCreateWithoutEmailInput, KeyInformationUncheckedCreateWithoutEmailInput>
  }

  export type KeyInformationCreateManyEmailInputEnvelope = {
    data: KeyInformationCreateManyEmailInput | KeyInformationCreateManyEmailInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutEmailsInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    tasks?: TaskCreateNestedManyWithoutUserInput
    events?: EventCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmailsInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationUncheckedCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmailsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
  }

  export type TaskUpsertWithWhereUniqueWithoutEmailInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutEmailInput, TaskUncheckedUpdateWithoutEmailInput>
    create: XOR<TaskCreateWithoutEmailInput, TaskUncheckedCreateWithoutEmailInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutEmailInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutEmailInput, TaskUncheckedUpdateWithoutEmailInput>
  }

  export type TaskUpdateManyWithWhereWithoutEmailInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutEmailInput>
  }

  export type TaskLogUpsertWithWhereUniqueWithoutEmailInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutEmailInput, TaskLogUncheckedUpdateWithoutEmailInput>
    create: XOR<TaskLogCreateWithoutEmailInput, TaskLogUncheckedCreateWithoutEmailInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutEmailInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutEmailInput, TaskLogUncheckedUpdateWithoutEmailInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutEmailInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutEmailInput>
  }

  export type EventUpsertWithWhereUniqueWithoutEmailInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutEmailInput, EventUncheckedUpdateWithoutEmailInput>
    create: XOR<EventCreateWithoutEmailInput, EventUncheckedCreateWithoutEmailInput>
  }

  export type EventUpdateWithWhereUniqueWithoutEmailInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutEmailInput, EventUncheckedUpdateWithoutEmailInput>
  }

  export type EventUpdateManyWithWhereWithoutEmailInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutEmailInput>
  }

  export type KeyInformationUpsertWithWhereUniqueWithoutEmailInput = {
    where: KeyInformationWhereUniqueInput
    update: XOR<KeyInformationUpdateWithoutEmailInput, KeyInformationUncheckedUpdateWithoutEmailInput>
    create: XOR<KeyInformationCreateWithoutEmailInput, KeyInformationUncheckedCreateWithoutEmailInput>
  }

  export type KeyInformationUpdateWithWhereUniqueWithoutEmailInput = {
    where: KeyInformationWhereUniqueInput
    data: XOR<KeyInformationUpdateWithoutEmailInput, KeyInformationUncheckedUpdateWithoutEmailInput>
  }

  export type KeyInformationUpdateManyWithWhereWithoutEmailInput = {
    where: KeyInformationScalarWhereInput
    data: XOR<KeyInformationUpdateManyMutationInput, KeyInformationUncheckedUpdateManyWithoutEmailInput>
  }

  export type UserUpsertWithoutEmailsInput = {
    update: XOR<UserUpdateWithoutEmailsInput, UserUncheckedUpdateWithoutEmailsInput>
    create: XOR<UserCreateWithoutEmailsInput, UserUncheckedCreateWithoutEmailsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmailsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmailsInput, UserUncheckedUpdateWithoutEmailsInput>
  }

  export type UserUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUpdateManyWithoutUserNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUncheckedUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EmailCreateWithoutTasksInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    taskLogs?: TaskLogCreateNestedManyWithoutEmailInput
    events?: EventCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationCreateNestedManyWithoutEmailInput
    user: UserCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateWithoutTasksInput = {
    id?: string
    userId: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutEmailInput
    events?: EventUncheckedCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutTasksInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutTasksInput, EmailUncheckedCreateWithoutTasksInput>
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailCreateNestedManyWithoutUserInput
    events?: EventCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationUncheckedCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type LinkOrAttachmentCreateWithoutTaskInput = {
    id?: string
    type: string
    identifier: string
    description: string
    createdAt?: Date | string
    event?: EventCreateNestedOneWithoutLinksOrAttachmentsInput
    keyInformation?: KeyInformationCreateNestedOneWithoutLinksOrAttachmentsInput
  }

  export type LinkOrAttachmentUncheckedCreateWithoutTaskInput = {
    id?: string
    type: string
    identifier: string
    description: string
    eventId?: string | null
    keyInformationId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentCreateOrConnectWithoutTaskInput = {
    where: LinkOrAttachmentWhereUniqueInput
    create: XOR<LinkOrAttachmentCreateWithoutTaskInput, LinkOrAttachmentUncheckedCreateWithoutTaskInput>
  }

  export type LinkOrAttachmentCreateManyTaskInputEnvelope = {
    data: LinkOrAttachmentCreateManyTaskInput | LinkOrAttachmentCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type EmailUpsertWithoutTasksInput = {
    update: XOR<EmailUpdateWithoutTasksInput, EmailUncheckedUpdateWithoutTasksInput>
    create: XOR<EmailCreateWithoutTasksInput, EmailUncheckedCreateWithoutTasksInput>
    where?: EmailWhereInput
  }

  export type EmailUpdateToOneWithWhereWithoutTasksInput = {
    where?: EmailWhereInput
    data: XOR<EmailUpdateWithoutTasksInput, EmailUncheckedUpdateWithoutTasksInput>
  }

  export type EmailUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskLogs?: TaskLogUpdateManyWithoutEmailNestedInput
    events?: EventUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUpdateManyWithoutEmailNestedInput
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskLogs?: TaskLogUncheckedUpdateManyWithoutEmailNestedInput
    events?: EventUncheckedUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUpdateManyWithoutUserNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUncheckedUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LinkOrAttachmentUpsertWithWhereUniqueWithoutTaskInput = {
    where: LinkOrAttachmentWhereUniqueInput
    update: XOR<LinkOrAttachmentUpdateWithoutTaskInput, LinkOrAttachmentUncheckedUpdateWithoutTaskInput>
    create: XOR<LinkOrAttachmentCreateWithoutTaskInput, LinkOrAttachmentUncheckedCreateWithoutTaskInput>
  }

  export type LinkOrAttachmentUpdateWithWhereUniqueWithoutTaskInput = {
    where: LinkOrAttachmentWhereUniqueInput
    data: XOR<LinkOrAttachmentUpdateWithoutTaskInput, LinkOrAttachmentUncheckedUpdateWithoutTaskInput>
  }

  export type LinkOrAttachmentUpdateManyWithWhereWithoutTaskInput = {
    where: LinkOrAttachmentScalarWhereInput
    data: XOR<LinkOrAttachmentUpdateManyMutationInput, LinkOrAttachmentUncheckedUpdateManyWithoutTaskInput>
  }

  export type LinkOrAttachmentScalarWhereInput = {
    AND?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
    OR?: LinkOrAttachmentScalarWhereInput[]
    NOT?: LinkOrAttachmentScalarWhereInput | LinkOrAttachmentScalarWhereInput[]
    id?: StringFilter<"LinkOrAttachment"> | string
    type?: StringFilter<"LinkOrAttachment"> | string
    identifier?: StringFilter<"LinkOrAttachment"> | string
    description?: StringFilter<"LinkOrAttachment"> | string
    taskId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    eventId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    keyInformationId?: StringNullableFilter<"LinkOrAttachment"> | string | null
    createdAt?: DateTimeFilter<"LinkOrAttachment"> | Date | string
  }

  export type EmailCreateWithoutEventsInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationCreateNestedManyWithoutEmailInput
    user: UserCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateWithoutEventsInput = {
    id?: string
    userId: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutEventsInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutEventsInput, EmailUncheckedCreateWithoutEventsInput>
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationUncheckedCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type LinkOrAttachmentCreateWithoutEventInput = {
    id?: string
    type: string
    identifier: string
    description: string
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutLinksOrAttachmentsInput
    keyInformation?: KeyInformationCreateNestedOneWithoutLinksOrAttachmentsInput
  }

  export type LinkOrAttachmentUncheckedCreateWithoutEventInput = {
    id?: string
    type: string
    identifier: string
    description: string
    taskId?: string | null
    keyInformationId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentCreateOrConnectWithoutEventInput = {
    where: LinkOrAttachmentWhereUniqueInput
    create: XOR<LinkOrAttachmentCreateWithoutEventInput, LinkOrAttachmentUncheckedCreateWithoutEventInput>
  }

  export type LinkOrAttachmentCreateManyEventInputEnvelope = {
    data: LinkOrAttachmentCreateManyEventInput | LinkOrAttachmentCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type EmailUpsertWithoutEventsInput = {
    update: XOR<EmailUpdateWithoutEventsInput, EmailUncheckedUpdateWithoutEventsInput>
    create: XOR<EmailCreateWithoutEventsInput, EmailUncheckedCreateWithoutEventsInput>
    where?: EmailWhereInput
  }

  export type EmailUpdateToOneWithWhereWithoutEventsInput = {
    where?: EmailWhereInput
    data: XOR<EmailUpdateWithoutEventsInput, EmailUncheckedUpdateWithoutEventsInput>
  }

  export type EmailUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUpdateManyWithoutEmailNestedInput
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUncheckedUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LinkOrAttachmentUpsertWithWhereUniqueWithoutEventInput = {
    where: LinkOrAttachmentWhereUniqueInput
    update: XOR<LinkOrAttachmentUpdateWithoutEventInput, LinkOrAttachmentUncheckedUpdateWithoutEventInput>
    create: XOR<LinkOrAttachmentCreateWithoutEventInput, LinkOrAttachmentUncheckedCreateWithoutEventInput>
  }

  export type LinkOrAttachmentUpdateWithWhereUniqueWithoutEventInput = {
    where: LinkOrAttachmentWhereUniqueInput
    data: XOR<LinkOrAttachmentUpdateWithoutEventInput, LinkOrAttachmentUncheckedUpdateWithoutEventInput>
  }

  export type LinkOrAttachmentUpdateManyWithWhereWithoutEventInput = {
    where: LinkOrAttachmentScalarWhereInput
    data: XOR<LinkOrAttachmentUpdateManyMutationInput, LinkOrAttachmentUncheckedUpdateManyWithoutEventInput>
  }

  export type EmailCreateWithoutKeyInformationInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogCreateNestedManyWithoutEmailInput
    events?: EventCreateNestedManyWithoutEmailInput
    user: UserCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateWithoutKeyInformationInput = {
    id?: string
    userId: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutEmailInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutEmailInput
    events?: EventUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutKeyInformationInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutKeyInformationInput, EmailUncheckedCreateWithoutKeyInformationInput>
  }

  export type UserCreateWithoutKeyInfoInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    events?: EventCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutKeyInfoInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutKeyInfoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutKeyInfoInput, UserUncheckedCreateWithoutKeyInfoInput>
  }

  export type LinkOrAttachmentCreateWithoutKeyInformationInput = {
    id?: string
    type: string
    identifier: string
    description: string
    createdAt?: Date | string
    task?: TaskCreateNestedOneWithoutLinksOrAttachmentsInput
    event?: EventCreateNestedOneWithoutLinksOrAttachmentsInput
  }

  export type LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput = {
    id?: string
    type: string
    identifier: string
    description: string
    taskId?: string | null
    eventId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentCreateOrConnectWithoutKeyInformationInput = {
    where: LinkOrAttachmentWhereUniqueInput
    create: XOR<LinkOrAttachmentCreateWithoutKeyInformationInput, LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput>
  }

  export type LinkOrAttachmentCreateManyKeyInformationInputEnvelope = {
    data: LinkOrAttachmentCreateManyKeyInformationInput | LinkOrAttachmentCreateManyKeyInformationInput[]
    skipDuplicates?: boolean
  }

  export type EmailUpsertWithoutKeyInformationInput = {
    update: XOR<EmailUpdateWithoutKeyInformationInput, EmailUncheckedUpdateWithoutKeyInformationInput>
    create: XOR<EmailCreateWithoutKeyInformationInput, EmailUncheckedCreateWithoutKeyInformationInput>
    where?: EmailWhereInput
  }

  export type EmailUpdateToOneWithWhereWithoutKeyInformationInput = {
    where?: EmailWhereInput
    data: XOR<EmailUpdateWithoutKeyInformationInput, EmailUncheckedUpdateWithoutKeyInformationInput>
  }

  export type EmailUpdateWithoutKeyInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUpdateManyWithoutEmailNestedInput
    events?: EventUpdateManyWithoutEmailNestedInput
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateWithoutKeyInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutEmailNestedInput
    events?: EventUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type UserUpsertWithoutKeyInfoInput = {
    update: XOR<UserUpdateWithoutKeyInfoInput, UserUncheckedUpdateWithoutKeyInfoInput>
    create: XOR<UserCreateWithoutKeyInfoInput, UserUncheckedCreateWithoutKeyInfoInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutKeyInfoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutKeyInfoInput, UserUncheckedUpdateWithoutKeyInfoInput>
  }

  export type UserUpdateWithoutKeyInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutKeyInfoInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LinkOrAttachmentUpsertWithWhereUniqueWithoutKeyInformationInput = {
    where: LinkOrAttachmentWhereUniqueInput
    update: XOR<LinkOrAttachmentUpdateWithoutKeyInformationInput, LinkOrAttachmentUncheckedUpdateWithoutKeyInformationInput>
    create: XOR<LinkOrAttachmentCreateWithoutKeyInformationInput, LinkOrAttachmentUncheckedCreateWithoutKeyInformationInput>
  }

  export type LinkOrAttachmentUpdateWithWhereUniqueWithoutKeyInformationInput = {
    where: LinkOrAttachmentWhereUniqueInput
    data: XOR<LinkOrAttachmentUpdateWithoutKeyInformationInput, LinkOrAttachmentUncheckedUpdateWithoutKeyInformationInput>
  }

  export type LinkOrAttachmentUpdateManyWithWhereWithoutKeyInformationInput = {
    where: LinkOrAttachmentScalarWhereInput
    data: XOR<LinkOrAttachmentUpdateManyMutationInput, LinkOrAttachmentUncheckedUpdateManyWithoutKeyInformationInput>
  }

  export type TaskCreateWithoutLinksOrAttachmentsInput = {
    id?: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
    email?: EmailCreateNestedOneWithoutTasksInput
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutLinksOrAttachmentsInput = {
    id?: string
    emailId?: string | null
    userId: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskCreateOrConnectWithoutLinksOrAttachmentsInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutLinksOrAttachmentsInput, TaskUncheckedCreateWithoutLinksOrAttachmentsInput>
  }

  export type EventCreateWithoutLinksOrAttachmentsInput = {
    id?: string
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
    email?: EmailCreateNestedOneWithoutEventsInput
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutLinksOrAttachmentsInput = {
    id?: string
    userId: string
    emailId?: string | null
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
  }

  export type EventCreateOrConnectWithoutLinksOrAttachmentsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutLinksOrAttachmentsInput, EventUncheckedCreateWithoutLinksOrAttachmentsInput>
  }

  export type KeyInformationCreateWithoutLinksOrAttachmentsInput = {
    id?: string
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
    email?: EmailCreateNestedOneWithoutKeyInformationInput
    user: UserCreateNestedOneWithoutKeyInfoInput
  }

  export type KeyInformationUncheckedCreateWithoutLinksOrAttachmentsInput = {
    id?: string
    userId: string
    emailId?: string | null
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
  }

  export type KeyInformationCreateOrConnectWithoutLinksOrAttachmentsInput = {
    where: KeyInformationWhereUniqueInput
    create: XOR<KeyInformationCreateWithoutLinksOrAttachmentsInput, KeyInformationUncheckedCreateWithoutLinksOrAttachmentsInput>
  }

  export type TaskUpsertWithoutLinksOrAttachmentsInput = {
    update: XOR<TaskUpdateWithoutLinksOrAttachmentsInput, TaskUncheckedUpdateWithoutLinksOrAttachmentsInput>
    create: XOR<TaskCreateWithoutLinksOrAttachmentsInput, TaskUncheckedCreateWithoutLinksOrAttachmentsInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutLinksOrAttachmentsInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutLinksOrAttachmentsInput, TaskUncheckedUpdateWithoutLinksOrAttachmentsInput>
  }

  export type TaskUpdateWithoutLinksOrAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: EmailUpdateOneWithoutTasksNestedInput
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutLinksOrAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventUpsertWithoutLinksOrAttachmentsInput = {
    update: XOR<EventUpdateWithoutLinksOrAttachmentsInput, EventUncheckedUpdateWithoutLinksOrAttachmentsInput>
    create: XOR<EventCreateWithoutLinksOrAttachmentsInput, EventUncheckedCreateWithoutLinksOrAttachmentsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutLinksOrAttachmentsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutLinksOrAttachmentsInput, EventUncheckedUpdateWithoutLinksOrAttachmentsInput>
  }

  export type EventUpdateWithoutLinksOrAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneWithoutEventsNestedInput
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutLinksOrAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyInformationUpsertWithoutLinksOrAttachmentsInput = {
    update: XOR<KeyInformationUpdateWithoutLinksOrAttachmentsInput, KeyInformationUncheckedUpdateWithoutLinksOrAttachmentsInput>
    create: XOR<KeyInformationCreateWithoutLinksOrAttachmentsInput, KeyInformationUncheckedCreateWithoutLinksOrAttachmentsInput>
    where?: KeyInformationWhereInput
  }

  export type KeyInformationUpdateToOneWithWhereWithoutLinksOrAttachmentsInput = {
    where?: KeyInformationWhereInput
    data: XOR<KeyInformationUpdateWithoutLinksOrAttachmentsInput, KeyInformationUncheckedUpdateWithoutLinksOrAttachmentsInput>
  }

  export type KeyInformationUpdateWithoutLinksOrAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneWithoutKeyInformationNestedInput
    user?: UserUpdateOneRequiredWithoutKeyInfoNestedInput
  }

  export type KeyInformationUncheckedUpdateWithoutLinksOrAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmailCreateWithoutTaskLogsInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutEmailInput
    events?: EventCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationCreateNestedManyWithoutEmailInput
    user: UserCreateNestedOneWithoutEmailsInput
  }

  export type EmailUncheckedCreateWithoutTaskLogsInput = {
    id?: string
    userId: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutEmailInput
    events?: EventUncheckedCreateNestedManyWithoutEmailInput
    keyInformation?: KeyInformationUncheckedCreateNestedManyWithoutEmailInput
  }

  export type EmailCreateOrConnectWithoutTaskLogsInput = {
    where: EmailWhereUniqueInput
    create: XOR<EmailCreateWithoutTaskLogsInput, EmailUncheckedCreateWithoutTaskLogsInput>
  }

  export type UserCreateWithoutTaskLogsInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    events?: EventCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTaskLogsInput = {
    id?: string
    email: string
    forwardingemail: string
    created_at?: Date | string | null
    emails?: EmailUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    events?: EventUncheckedCreateNestedManyWithoutUserInput
    keyInfo?: KeyInformationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTaskLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
  }

  export type EmailUpsertWithoutTaskLogsInput = {
    update: XOR<EmailUpdateWithoutTaskLogsInput, EmailUncheckedUpdateWithoutTaskLogsInput>
    create: XOR<EmailCreateWithoutTaskLogsInput, EmailUncheckedCreateWithoutTaskLogsInput>
    where?: EmailWhereInput
  }

  export type EmailUpdateToOneWithWhereWithoutTaskLogsInput = {
    where?: EmailWhereInput
    data: XOR<EmailUpdateWithoutTaskLogsInput, EmailUncheckedUpdateWithoutTaskLogsInput>
  }

  export type EmailUpdateWithoutTaskLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutEmailNestedInput
    events?: EventUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUpdateManyWithoutEmailNestedInput
    user?: UserUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type EmailUncheckedUpdateWithoutTaskLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutEmailNestedInput
    events?: EventUncheckedUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type UserUpsertWithoutTaskLogsInput = {
    update: XOR<UserUpdateWithoutTaskLogsInput, UserUncheckedUpdateWithoutTaskLogsInput>
    create: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskLogsInput, UserUncheckedUpdateWithoutTaskLogsInput>
  }

  export type UserUpdateWithoutTaskLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    events?: EventUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    forwardingemail?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    emails?: EmailUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    events?: EventUncheckedUpdateManyWithoutUserNestedInput
    keyInfo?: KeyInformationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EmailCreateManyUserInput = {
    id?: string
    fromEmail?: string | null
    originalSubject?: string | null
    summary?: string | null
    category?: $Enums.EmailCategory | null
    status?: $Enums.EmailStatus | null
    originalReceivedAt?: Date | string | null
    processedAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: string
    emailId?: string | null
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type EventCreateManyUserInput = {
    id?: string
    emailId?: string | null
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
  }

  export type KeyInformationCreateManyUserInput = {
    id?: string
    emailId?: string | null
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
  }

  export type TaskLogCreateManyUserInput = {
    id?: string
    emailId: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type EmailUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUpdateManyWithoutEmailNestedInput
    events?: EventUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutEmailNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutEmailNestedInput
    events?: EventUncheckedUpdateManyWithoutEmailNestedInput
    keyInformation?: KeyInformationUncheckedUpdateManyWithoutEmailNestedInput
  }

  export type EmailUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromEmail?: NullableStringFieldUpdateOperationsInput | string | null
    originalSubject?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableEnumEmailCategoryFieldUpdateOperationsInput | $Enums.EmailCategory | null
    status?: NullableEnumEmailStatusFieldUpdateOperationsInput | $Enums.EmailStatus | null
    originalReceivedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    email?: EmailUpdateOneWithoutTasksNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneWithoutEventsNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyInformationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneWithoutKeyInformationNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutKeyInformationNestedInput
  }

  export type KeyInformationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutKeyInformationNestedInput
  }

  export type KeyInformationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: NullableStringFieldUpdateOperationsInput | string | null
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: EmailUpdateOneRequiredWithoutTaskLogsNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyEmailInput = {
    id?: string
    userId: string
    title: string
    dueDate?: Date | string | null
    description?: string | null
    urgency?: $Enums.Urgency
    status?: $Enums.TaskStatus
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type TaskLogCreateManyEmailInput = {
    id?: string
    userId: string
    prompt: string
    response?: string | null
    success: boolean
    error?: string | null
    createdAt?: Date | string
  }

  export type EventCreateManyEmailInput = {
    id?: string
    userId: string
    title: string
    startTime: Date | string
    endTime: Date | string
    location?: string | null
    description?: string | null
    isRecurringHint?: boolean
    createdAt?: Date | string
  }

  export type KeyInformationCreateManyEmailInput = {
    id?: string
    userId: string
    info: string
    sourceHint?: string | null
    createdAt?: Date | string
  }

  export type TaskUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: EnumUrgencyFieldUpdateOperationsInput | $Enums.Urgency
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskLogUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTaskLogsNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    success?: BoolFieldUpdateOperationsInput | boolean
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurringHint?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KeyInformationUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutKeyInfoNestedInput
    linksOrAttachments?: LinkOrAttachmentUpdateManyWithoutKeyInformationNestedInput
  }

  export type KeyInformationUncheckedUpdateWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linksOrAttachments?: LinkOrAttachmentUncheckedUpdateManyWithoutKeyInformationNestedInput
  }

  export type KeyInformationUncheckedUpdateManyWithoutEmailInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    info?: StringFieldUpdateOperationsInput | string
    sourceHint?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentCreateManyTaskInput = {
    id?: string
    type: string
    identifier: string
    description: string
    eventId?: string | null
    keyInformationId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneWithoutLinksOrAttachmentsNestedInput
    keyInformation?: KeyInformationUpdateOneWithoutLinksOrAttachmentsNestedInput
  }

  export type LinkOrAttachmentUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    keyInformationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    keyInformationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentCreateManyEventInput = {
    id?: string
    type: string
    identifier: string
    description: string
    taskId?: string | null
    keyInformationId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutLinksOrAttachmentsNestedInput
    keyInformation?: KeyInformationUpdateOneWithoutLinksOrAttachmentsNestedInput
  }

  export type LinkOrAttachmentUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    keyInformationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    keyInformationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentCreateManyKeyInformationInput = {
    id?: string
    type: string
    identifier: string
    description: string
    taskId?: string | null
    eventId?: string | null
    createdAt?: Date | string
  }

  export type LinkOrAttachmentUpdateWithoutKeyInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    task?: TaskUpdateOneWithoutLinksOrAttachmentsNestedInput
    event?: EventUpdateOneWithoutLinksOrAttachmentsNestedInput
  }

  export type LinkOrAttachmentUncheckedUpdateWithoutKeyInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkOrAttachmentUncheckedUpdateManyWithoutKeyInformationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    eventId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}