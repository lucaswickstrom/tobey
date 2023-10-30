/* eslint-disable @typescript-eslint/no-unsafe-call -- comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- comment */

import { readFileSync, writeFileSync } from "node:fs";
import { ModelExporter, Parser } from "@dbml/core";
import camelcase from "camelcase";
import { plural, singular } from "pluralize";

const dbml = readFileSync("./schema.dbml", "utf-8");
const database = Parser.parse(dbml, "dbml");
// console.log(JSON.stringify(database.export()));

/** Converts name to pascal case and makes it in singular */
const typeName = (name: string) =>
  camelcase(singular(name), { pascalCase: true });

const schemaName = (name: string) => `${camelcase(singular(name))}Schema`;

const typeMap = {
  uuid: "string",
  text: "string",
  varchar: "string",
  int: "number",
  boolean: "boolean",
  timestamptz: "Date",
  geometry: "Geometry",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars -- comment
function generateType(
  table: (typeof database)["schemas"][0]["tables"][0],
  enums: string[]
) {
  let template = `type ${typeName(table.name)} = {\n`;
  table.fields.forEach((field) => {
    template += `  /**\n`;
    template += `   * ${field.type.type_name}\n`;
    if (field.dbdefault) {
      template += `   * default: ${field.dbdefault.value}\n`;
    }
    template += `   */\n`;
    template += `  ${field.name}`;

    if (!field.not_null) {
      template += "?";
    }

    template += ": ";

    if (enums.includes(field.type.type_name)) {
      template += `${typeName(field.type.type_name)}`;
    } else {
      // @ts-expect-error: comment
      template += typeMap[field.type.type_name] || "unknown";
    }

    template += `;\n`;
  });
  template += `};\n`;

  return template;
}

const zodMap = {
  uuid: "z.string().uuid()",
  text: "z.string()",
  varchar: "z.string()",
  int: "z.number().int()",
  boolean: "z.boolean()",
  timestamptz: "z.string()",
  geometry:
    'z.object({ type: z.literal("Point"), coordinates: z.tuple([z.number(), z.number()]) })',
};

function generateZodSchema(
  table: (typeof database)["schemas"][0]["tables"][0],
  enums: string[]
) {
  let template = `const ${schemaName(table.name)}`;
  // template += `: z.Schema<${typeName(table.name)}>`;
  template += ` = z.object({\n`;
  table.fields.forEach((field) => {
    template += `  ${field.name}: `;

    if (enums.includes(field.type.type_name)) {
      template += `${field.type.type_name}`;
    } else {
      const isArray = field.type.type_name.endsWith("[]");
      const name: keyof typeof zodMap = isArray
        ? field.type.type_name.slice(0, -2)
        : field.type.type_name;
      const zodType = zodMap[name] || "z.unknown()";
      if (isArray) {
        template += `z.array(${zodType})`;
      } else {
        template += zodType;
      }
    }

    if (!field.not_null) {
      template += ".optional()";
    }

    template += `,\n`;
  });
  template += `});\n`;

  return template;
}

function generateRefs(
  refs: (typeof database)["schemas"][0]["refs"],
  tableName: string
) {
  const template: [
    string,
    { relation: "1" | "*"; schema: string; key: string },
  ][] = [];
  refs.forEach((ref) => {
    ref.endpoints.forEach((endpoint) => {
      let [from, to] = ref.endpoints;

      if (!from || !to) {
        return;
      }

      const key = `${to.tableName}_${to.fields
        .map(({ name }) => name)
        .join("_")}_fkey`;
      let name =
        to.tableName === tableName
          ? to.fieldNames.join("_").replace(/Id/g, "")
          : to.tableName;

      if (to.tableName === tableName) {
        const _to = to;
        to = from;
        from = _to;
        // return;
      }
      if (endpoint.tableName !== tableName) {
        return;
      }

      const foundIndex = template.findIndex(
        ([templateKey]) => templateKey === name
      );
      const found = template[foundIndex];
      if (found) {
        if (found[1].key === key) {
          return;
        }
        template[foundIndex] = [
          camelcase(found[1].key.replace("Id_fkey", "")),
          found[1],
        ];
        name = camelcase(key.replace("Id_fkey", ""));
      }

      // console.log(1, name, to.relation, foundIndex, template);
      if (to.relation === "1") {
        name = singular(name);
      } else {
        name = plural(name);
      }
      // console.log(2, name, to.relation);

      template.push([
        name,
        { relation: to.relation, schema: to.tableName, key },
      ]);
    });
  });
  return JSON.stringify(Object.fromEntries(template));
}

let template = "import { z } from 'zod';\n\n";

database.schemas.forEach((schema) => {
  schema.enums.forEach(({ name, values }) => {
    template += `const ${name} = z.enum([ `;
    template += values
      .map(({ name: valueName }) => `'${valueName}'`)
      .join(" , ");
    template += ` ]);\n`;
    // template += `type ${typeName(name)} = z.infer<typeof ${name}>\n`;
    template += "\n";
  });

  const enums = schema.enums.map(({ name }) => name);

  schema.tables.forEach((table) => {
    // template += generateType(table, enums);
    template += generateZodSchema(table, enums);
    template += `export const ${table.name} = {\n`;
    template += `  schema: ${schemaName(table.name)},\n`;
    template += `  primaryKey: '${
      table.fields.find(({ pk }) => pk)?.name ?? ""
    }',\n`;
    template += `  defaults: [${table.fields
      .filter(({ dbdefault }) => dbdefault)
      .map(({ name }) => `'${name}'`)
      .join(", ")}],\n`;
    template += `  refs: ${generateRefs(schema.refs, table.name)},`;
    template += `} as const;\n\n`;
  });

  // template += 'const relations = {\n';
  // const relations: Record<string, Record<string, { fromFieldName: string, toFieldName: string, relation: '1' | '*'}>> = {}
  // schema.refs.forEach(({ endpoints: [from, to]}) => {
  //   relations[schemaName(from.tableName)] = {}
  // });

  writeFileSync("./src/schema.ts", template);
});

const postgres = ModelExporter.export(database.normalize(), "postgres");
writeFileSync("./supabase/seed.sql", postgres);
