# seedling-data-plugin-graphcms

A data plugin to handle queries to Graph CMS

1. (Recommended) Create a file called `.env` at the root of your project. Do not commit this to source control.

```do
 HOST="https://{region}.graphcms.com/v2/{id}/master"
 TOKEN="{token}"
```

- Replace `{region}` with the selected region from Graph CMS.
- Replace `{id}` with the ID to your endpoint.
- Replace `{token}` with the JWT token you generate for the endpint.

2. Create a new file in `/data` with the name `graphcms.ts`.

```ts
import graphcms from "https://deno.land/x/seedling_data_plugin_graphcms@0.0.1/mod.ts";

export default graphcms(Deno.env.get("HOST"), Deno.env.get("TOKEN"));
```

3. Use with seedling data directive. The text body of the directive is the query. Any attributes are used as variables.

```html
  <:data use="graphcms" id="asdoiasd9012340912jkadsf">
    query MyQuery($id: ID) {
      hero(where: {id: $id}) {
        name
        age
        planet
      }
    }
  </:data>
```

**Note** - This plugin requires the `--allow-net` command line parameter for Deno.
