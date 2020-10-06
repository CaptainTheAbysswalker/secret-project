function sendRequest(
  method,
  url,
  state
) {
  return fetch("https://secrethydra-server.herokuapp.com/" + url, {
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default sendRequest