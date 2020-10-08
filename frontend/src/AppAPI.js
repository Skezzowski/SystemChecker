const serverBaseUrl = new URL("http://localhost:3001");

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
  const reqUrl = new URL("/data", serverBaseUrl);
  return fetch(reqUrl, {
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

export function getSystemPastData(numberOfData) {
  if (numberOfData === undefined || numberOfData < 0) {
    return;
  }

  const reqUrl = new URL("/data", serverBaseUrl);
  reqUrl.search = new URLSearchParams({ numberOfData });

  return fetch(reqUrl).then((data) => {
    if (data.status !== 200) {
      throw new Error();
    }
    return data.json();
  });
}
