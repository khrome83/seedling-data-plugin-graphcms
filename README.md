# seedling-data-plugin-graphcms

A data plugin to handle queries to Graph CMS

1. Create a new file in `/data` with the name `graphcms.ts`.

```ts
import graphcms from "https://raw.githubusercontent.com/use-seedling/seedling-data-plugin-graphcms/master/mod.ts";

// TODO: Update with ENV example

const host = "https://my-awesome-site.com/graphql";

// TODO: Update where to get JWT API Token
const token = "e9hasd9asd0123431jh4oliasdfouiasdoi1oi231209309fas=";

export default graphcms(host, token);
```

2. Use with seedling data directive. The text body of the directive is the query. Any attributes are used as variables.

```html
  <:data id="asdoiasd9012340912jkadsf">
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
