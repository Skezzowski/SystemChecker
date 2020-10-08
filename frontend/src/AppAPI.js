const serverBaseUrl = "http://localhost:3001";

const postOptions = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export function sendSystemData(pcData) {
  if (!pcData.loaded) {
    return;
  }

  return fetch(serverBaseUrl + "/data", {
    ...postOptions,
    body: JSON.stringify(pcData),
  })
    .then((data) => {
      if (data.status === 200) {
      }
    })
    .catch((error) => {
      throw Error("Server unreachable");
    });
}
