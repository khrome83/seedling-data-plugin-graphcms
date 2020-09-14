import {
  assertEquals,
} from "https://deno.land/std@0.69.0/testing/asserts.ts";
import { denock } from "https://deno.land/x/denock@0.2.0/mod.ts";
import graphcms from "./mod.ts";

const response = {
  success: (data: object) => {
    return data;
  },
  skip: (data: object) => {
    return data;
  },
  error: (data: object) => {
    return data;
  },
  end: (data: object) => {
    return data;
  },
  retry: (data: object) => {
    return data;
  },
};

Deno.test("GraphCMS request from data directive", async () => {
  const request = {
    attrs: {
      id: "cka5lzgxk02s701761t7scrb0",
    },
    body: `query MyQuery($id: ID) {
      marketingSocialProof(where: {id: $id}) {
        __typename
        id
      }
    }`,
    root: Deno.cwd(),
  };

  denock({
    method: "POST",
    protocol: "https",
    host: "example.com",
    headers: [
      { header: "content-type", value: "application/json" },
      {
        header: "authorization",
        value: `Bearer asdjasdajsdaskjd`,
      },
    ],
    path: "/graphql",
    requestBody: {
      operationName: "MyQuery",
      query: request.body,
      variables: request.attrs,
    },
    replyStatus: 200,
    responseBody: {
      data: {
        marketingSocialProof: {
          __typename: "MarketingSocialProof",
          id: "cka5lzgxk02s701761t7scrb0",
        },
      },
    },
  });

  const graph = graphcms("https://example.com/graphql", "asdjasdajsdaskjd");

  const output = await graph(request, response);
  const expected = {
    marketingSocialProof: {
      __typename: "MarketingSocialProof",
      id: "cka5lzgxk02s701761t7scrb0",
    },
  };

  assertEquals(output, expected);
});
