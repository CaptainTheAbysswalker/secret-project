function sendRequest(
  method,
  url,
  data
) {
  return fetch("http://secrethydra-server.herokuapp.com/" + url, {
    method: method,
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).then((res) => res.json());
}

export default sendRequest