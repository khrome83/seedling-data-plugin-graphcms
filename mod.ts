export default (host: string, token: string): Function => {
  return async (
    attrs: object,
    body: string,
    skip?: Function,
    end?: Function,
    error: Function = () => {}
  ) => {
    if (!body) {
      return error("Missing GraphQL Query");
    }

    const [full, operationName] = body.match(/^query (\w+)/i) || [];

    if (!operationName) {
      return error("Malformed Query, can't retrieve Operation Name");
    }

    try {
      const output = await fetch(host, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operationName,
          query: body,
          variables: attrs,
        }),
      });

      return output.json();
    } catch (e) {
      return error("Something went wrong", e);
    }
  };
};
