import {
  Request,
  Response,
} from "https://raw.githubusercontent.com/use-seedling/seedling/master/src/data/index.ts";

export default (host: string, token: string): Function => {
  return async (request: Request, response: Response) => {
    if (!request.body) {
      return response.error("Missing GraphQL Query");
    }

    const [full, operationName] = request.body.match(/^query (\w+)/i) || [];

    if (!operationName) {
      return response.error("Malformed Query, can't retrieve Operation Name");
    }

    try {
      const res = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operationName,
          query: request.body,
          variables: request.attrs,
        }),
      });

      if (!res.ok) {
        if (res.status >= 500) {
          return response.retry(
            "Unexpected error, backing off and then trying again"
          );
        } else if (res.status >= 400 && res.status < 500) {
          return response.error("Network issue, request failed");
        }
      }

      return response.success(res.json());
    } catch (e) {
      return response.error("Something went wrong", e);
    }
  };
};
