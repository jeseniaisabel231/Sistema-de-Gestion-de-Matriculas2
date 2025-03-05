import { check, sleep } from "k6";
import http from "k6/http";

const token =
  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJqaG9ubWF0YTA0MjdAZ21haWwuY29tIiwiaWF0IjoxNzQxMTg5MDIxLCJleHAiOjE3NDEyMDM0MjF9.JsIKV1imjiUCKBrWGpr5Q3ycETVdb0R-DoiKW56IvTpWBOOQ7nqc9mOgCTkU-MV5";

export const options = {
  stages: [
    { duration: "5s", target: 100 },
    { duration: "10s", target: 200 },
  ],
};

export default function Homepage() {
  const BASE_URL = "https://sistema-de-gestion-de-conferencias.vercel.app";
  const headers = {
    "User-Agent": "k6",
    Authorization: `Bearer ${token}`,
  };

  let responses = http.batch([
    [
      "GET",
      `${BASE_URL}/modulo-conferencistas`,
      null,
      { tags: { ctype: "html" }, headers },
    ],
    [
      "GET",
      `${BASE_URL}/styles-OAZE2G5Y.css`,
      null,
      { tags: { ctype: "css" }, headers },
    ],
    [
      "GET",
      `${BASE_URL}/polyfills-FFHMD2TL.js`,
      null,
      { tags: { ctype: "js" }, headers },
    ],
    [
      "GET",
      `${BASE_URL}/main-TVQ5I5Y7.js`,
      null,
      { tags: { ctype: "js" }, headers },
    ],
    [
      "GET",
      `${BASE_URL}/chunk-4FKFCR2A.js`,
      null,
      { tags: { ctype: "js" }, headers },
    ],
  ]);
  check(responses, {
    "Login cargado exitosamente": (r) => r[0].status === 200,
    "Estilos cargados exitosamente": (r) => r[1].status === 200,
    "Polyfills cargados exitosamente": (r) => r[2].status === 200,
    "Main cargado exitosamente": (r) => r[3].status === 200,
  });

  sleep(1);
}
