import type { PostgrestClient } from "@supabase/postgrest-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createFlatProxy } from "./createFlatProxy";

type SingleOrArray<T> = T | T[];

type Schemas<TKey extends string = string> = Record<
  TKey,
  {
    schema: z.AnyZodObject;
    primaryKey: string;
    defaults: readonly string[] | string[];
    refs: Record<string, { schema: TKey; relation: "1" | "*"; key: string }>;
  }
>;

type Create<
  TSchema extends z.AnyZodObject,
  TDefaults extends keyof z.TypeOf<TSchema>,
> = Omit<z.infer<TSchema>, TDefaults> &
  Partial<Pick<z.infer<TSchema>, TDefaults>>;

type Select<
  TSchemas extends Schemas,
  TKey extends keyof TSchemas,
  TSchema extends TSchemas[TKey] = TSchemas[TKey],
  TISchema extends z.infer<TSchema["schema"]> = z.infer<TSchema["schema"]>,
  TRefs extends TSchema["refs"] = TSchema["refs"],
> = {
  [TSchemaKey in keyof TISchema]?: boolean;
} & {
  [TRefKey in keyof TRefs]?:
    | boolean
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- comment
    | Query<TSchemas, TRefs[TRefKey]["schema"]>;
};

type Enumerable<T> = T | T[];
interface Operators {
  /** equals */
  eq?: string | number | boolean;
  /** greater than */
  gt?: string | number | boolean;
  gte?: string | number | boolean;
  lt?: string | number | boolean;
  lte?: string | number | boolean;
  neq?: string | number | boolean;
  like?: string | number | boolean;
  ilike?: string | number | boolean;
  match?: string | number | boolean;
  imatch?: string | number | boolean;
  in?: Enumerable<string | number | boolean>;
  is?: string | number | boolean | null;
  fts?: string | number | boolean;
  plfts?: string | number | boolean;
  phfts?: string | number | boolean;
  wfts?: string | number | boolean;
  cs?: string | number | boolean;
  cd?: string | number | boolean;
  ov?: string | number | boolean;
  sl?: string | number | boolean;
  sr?: string | number | boolean;
  nxr?: string | number | boolean;
  nxl?: string | number | boolean;
  adj?: string | number | boolean;
  not?: Operators;
}

type Where<
  TSchemas extends Schemas,
  TKey extends keyof TSchemas,
  TSchema extends TSchemas[TKey] = TSchemas[TKey],
  TISchema extends z.infer<TSchema["schema"]> = z.infer<TSchema["schema"]>,
> = {
  [TSchemaKey in keyof TISchema]?: NonNullable<TISchema[TSchemaKey]> extends
    | string
    | number
    | boolean
    ? Operators
    : never;
};

type Order<
  TSchemas extends Schemas,
  TKey extends keyof TSchemas,
  TSchema extends TSchemas[TKey] = TSchemas[TKey],
  TISchema extends z.infer<TSchema["schema"]> = z.infer<TSchema["schema"]>,
> = [keyof TISchema, "asc" | "desc"][];

export type Query<TSchemas extends Schemas, TKey extends keyof TSchemas> =
  | {
      select?: Select<TSchemas, TKey>;
      /** removes item if sub select is empty */
      inner?: boolean;
      where?: Where<TSchemas, TKey>;
      order?: Order<TSchemas, TKey>;
      limit?: number;
      offset?: number;
    }
  | true;

type UndefinedAble<
  TValue,
  TUndefinedAble extends true | false = true,
> = TUndefinedAble extends true ? TValue | undefined : TValue;

export type InferQuery<
  TQuery extends Query<TSchemas, TKey>,
  TSchemas extends Schemas = Schemas,
  TKey extends keyof TSchemas = keyof TSchemas,
  TSchema extends TSchemas[TKey] = TSchemas[TKey],
  TISchema extends z.infer<TSchema["schema"]> = z.infer<TSchema["schema"]>,
> = TQuery extends { select: infer TSelect }
  ? {
      [TFieldKey in keyof TSelect & string]: TFieldKey extends keyof TISchema
        ? TSelect[TFieldKey] extends true
          ? TISchema[TFieldKey]
          : never
        : TFieldKey extends keyof TSchema["refs"]
        ? TSelect[TFieldKey] extends infer TField
          ? TField extends true
            ? z.infer<TSchemas[TSchema["refs"][TFieldKey]["schema"]]["schema"]>
            : TField extends Query<
                TSchemas,
                TSchema["refs"][TFieldKey]["schema"]
              >
            ? TSchema["refs"][TFieldKey]["relation"] extends "*"
              ? InferQuery<
                  TField,
                  TSchemas,
                  TSchema["refs"][TFieldKey]["schema"]
                >[]
              : UndefinedAble<
                  InferQuery<
                    TField,
                    TSchemas,
                    TSchema["refs"][TFieldKey]["schema"]
                  >,
                  `${TFieldKey}Id` extends keyof TISchema
                    ? undefined extends TISchema[`${TFieldKey}Id`]
                      ? true
                      : false
                    : true
                >
            : never
          : never
        : never;
    }
  : TISchema;

// export type InferQuery<
//   TQuery extends Query<TSchemas, TKey>,
//   TSchemas extends Schemas = Schemas,
//   TKey extends keyof TSchemas = keyof TSchemas,
//   TSelect extends TQuery['select'] = TQuery['select'],
// > = TSelect extends undefined
//   ? 'undefined'
//   : TSelect extends Select<TSchemas, TKey>
//   ? TSelect
//   : z.infer<TSchemas[TKey]['schema']>;

// type ColumnsArr<TSchemas extends Schemas> = keyof TSchemas extends infer TKey
//   ? // @ts-ignore
//     [TKey, Columns<TSchemas, TKey>]
//   : never;

// type Columns<TSchemas extends Schemas, TKey extends keyof TSchemas> =
//   | (
//       | keyof z.infer<TSchemas[TKey]['schema']>
//       | keyof TSchemas[TKey]['refs']
//       | ([keyof TSchemas[TKey]['refs']] extends [infer TRefKey]
//           ? [TRefKey, Columns<TSchemas, TRefKey>]
//           : never)
//     )[]
//   // @ts-ignore
//   // | ColumnsArr<TSchemas, keyof TSchemas[TKey]['refs']>
//   // | [
//   //     keyof TSchemas[TKey]['refs'],
//   //     Columns<TSchemas, keyof TSchemas[TKey]['refs']>,
//   //   ]
//   | '*'
//   | never;

const postgrestErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.string().nullable().optional(),
  hint: z.string().nullable(),
});
export class PostgrestError extends Error {
  code: string | undefined;
  details: string | null | undefined;
  hint: string | null;

  constructor(error: z.infer<typeof postgrestErrorSchema>) {
    super(error.message);
    this.code = error.code;
    this.details = error.details;
    this.hint = error.hint;
  }
}

function getQuery<TSchemas extends Schemas, TKey extends keyof TSchemas>({
  schemas,
  key,
  query,
  path = [],
}: {
  schemas: TSchemas;
  key: TKey;
  query?: Query<TSchemas, TKey>;
  path?: string[];
}): [
  query: string,
  where: string[],
  order: string[],
  offset: string[],
  limit: string[],
] {
  if (query === true || !query?.select) {
    return ["*", [], [], [], []];
  }

  const { select, where, order, limit, offset } = query;
  const retWhere: string[] = [];
  const retOrder: string[] = [];
  const retLimit: string[] = [];
  const retOffset: string[] = [];

  const selectString = Object.entries(select)
    .map(([selectKey, _value]) => {
      const value = _value as Select<TSchemas, TKey> | boolean;

      if (typeof value === "boolean") {
        return value ? selectKey : "";
      }

      if (typeof value === "object") {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- comment
        const ref = schemas[key]!.refs[selectKey]!;
        const [
          embeddedSelect,
          embeddedWhere,
          embeddedOrder,
          embeddedLimit,
          embeddedOffset,
        ] = getQuery({
          schemas,
          key: ref.schema,
          query: value,
          path: [...path, ref.key],
        });
        retWhere.push(...embeddedWhere);
        retOrder.push(...embeddedOrder);
        retLimit.push(...embeddedLimit);
        retOffset.push(...embeddedOffset);
        return `${selectKey}:${ref.key}${
          value.inner ? "!inner" : ""
        }(${embeddedSelect})`;
      }

      return "";
    })
    .filter(Boolean)
    .join(",");

  function getOperators(operators: Operators): string {
    return Object.entries(operators)
      .map(([operator, value]) => {
        if (operator === "in") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- comment
          return `${operator}.(${value.join(",")})`;
        }
        return `${operator}.${
          value !== null && typeof value === "object"
            ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- comment
              getOperators(value)
            : value
        }`;
      })
      .join(".");
  }

  if (where) {
    retWhere.push(
      ...Object.entries(where).map(
        ([whereKey, filter]) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- comment
          `${[...path, whereKey].join(".")}=${getOperators(filter)}`
      )
    );
  }

  if (order) {
    retOrder.push(
      ...order.map(
        ([orderKey, direction]) =>
          `${[...path, "order"].join(".")}=${String(orderKey)}.${direction}`
      )
    );
  }

  if (limit) {
    retLimit.push(`${[...path, "limit"].join(".")}=${limit}`);
  }

  if (offset) {
    retOffset.push(`${[...path, "offset"].join(".")}=${offset}`);
  }

  return [selectString, retWhere, retOrder, retLimit, retOffset];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars, no-unused-vars -- comment
interface Rpc<TSchemas extends Schemas> {
  // searchArticles: (
  //   keyword: string,
  //   query: Query<TSchemas, 'articles'>,
  // ) => Promise<InferQuery<Query<TSchemas, 'articles'>>>;
}

export function createPostgrestProxy<TSchemas extends Schemas>(
  schemas: TSchemas,
  postgrestClient: PostgrestClient,
  supabaseClient: SupabaseClient
) {
  type PostgrestProxy = {
    [TKey in keyof TSchemas]: {
      query: <
        TQuery extends Query<TSchemas, TKey>,
        TSingle extends boolean = false,
      >(
        query?: TQuery,
        options?: { single?: TSingle; offset?: number; limit?: number }
      ) => Promise<
        TSingle extends true
          ? InferQuery<TQuery, TSchemas, TKey>
          : InferQuery<TQuery, TSchemas, TKey>[]
      >;
      // insert: (
      //   data: Create<TSchemas[TKey]['schema'], TSchemas[TKey]['defaults'][number]>,
      // ) => z.infer<TSchemas[TKey]['schema']>;
      insert: <
        TData extends SingleOrArray<
          Create<TSchemas[TKey]["schema"], TSchemas[TKey]["defaults"][number]>
        >,
      >(
        data: TData
      ) => Promise<
        TData extends unknown[]
          ? z.infer<TSchemas[TKey]["schema"]>[]
          : z.infer<TSchemas[TKey]["schema"]>
      >;
      update: (
        data: Partial<z.infer<TSchemas[TKey]["schema"]>>,
        id: string
      ) => Promise<z.infer<TSchemas[TKey]["schema"]>>;
      upsert: (
        data: z.infer<TSchemas[TKey]["schema"]>
      ) => Promise<z.infer<TSchemas[TKey]["schema"]>>;
      // upsert<TData extends z.infer<TSchemas[TKey]['schema']>>(data: TData): Promise<TData>;
    } & Rpc<TSchemas>;
  };

  return createFlatProxy<PostgrestProxy>((key) => ({
    async query(query, { single = false } = {}) {
      const session = (await supabaseClient.auth.getSession()).data.session;
      const [select, ...rest] = getQuery({ schemas, key, query });
      const url = `${postgrestClient.url}/${key}?select=${select}&${rest
        .flat()
        .join("&")}`;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- comment
      const data = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...postgrestClient.headers,
          ...(session && { Authorization: `Bearer ${session.access_token}` }),
          ...(single && { Accept: "application/vnd.pgrst.object+json" }),
        },
      }).then(async (res) => {
        if (!res.ok) {
          const error = postgrestErrorSchema.safeParse(await res.json());
          if (error.success) {
            throw new PostgrestError(error.data);
          }
          throw new Error(res.statusText);
        }
        return res.json();
      });
      // const b = await postgrestClient
      //   .from(key)
      //   .select(getQuery(schemas, key, query));
      // console.log(JSON.stringify(data, null, 2), getQuery(schemas, key, query));
      const returnValue = data as unknown as typeof single extends true
        ? InferQuery<NonNullable<typeof query>, TSchemas, typeof key>
        : InferQuery<NonNullable<typeof query>, TSchemas, typeof key>[];
      return returnValue;
    },
    // insert: (data) => {
    //   const { schema, defaults } = schemas[key];
    //   const mask = Object.fromEntries(defaults.map((key) => [key, true])) as {
    //     [TKey in keyof typeof schema]: true;
    //   };
    //   const { parse } = schema.merge(schema.pick(mask).partial());
    //   const parsedData = parse(data);

    //   return parsedData;
    // },
    async insert(data) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- comment
      const { schema, defaults } = schemas[key]!;
      const defaultsObj = Object.fromEntries(
        defaults.map((defaultKey) => [defaultKey, true])
      ) as Record<string, true>;
      const zSchema = schema
        .pick(defaultsObj)
        .partial()
        .and(schema.omit(defaultsObj));

      if (Array.isArray(data)) {
        const parsedData = z.array(zSchema).parse(data);
        const response = await supabaseClient
          .from(key)
          .insert(parsedData)
          .select("*");
        if (response.error) {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal -- comment
          throw response.error;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return -- comment
        return response.data as any;
      }

      const parsedData = zSchema.parse(data);
      const response = await supabaseClient
        .from(key)
        .insert(parsedData)
        .select("*")
        .single();
      if (response.error) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal -- comment
        throw response.error;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- comment
      return response.data;
    },
    async update(data, id) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- comment
      const { primaryKey, schema } = schemas[key]!;
      const parsedData = schema.partial().parse(data);
      const response = await supabaseClient
        .from(key)
        .update(parsedData)
        .eq(primaryKey, id)
        .select("*")
        .single();
      if (response.error) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal -- comment
        throw response.error;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- comment
      return response.data;
    },
    async upsert(data) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- comment
      const parsedData = schemas[key]!.schema.parse(data);
      await supabaseClient.from(key).upsert(parsedData);
      return parsedData;
    },
  }));
}
