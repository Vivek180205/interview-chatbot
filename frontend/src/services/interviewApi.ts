const BASE_URL = "http://localhost:8080";

export const createSession = async (data: any) => {
  const response = await fetch(`${BASE_URL}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const completeSession = async (sessionId: number) => {
  const response = await fetch(`${BASE_URL}/session/${sessionId}`, {
    method: "PUT",
  });

  return response.text();
};

export const saveMessage = async (data: any) => {
  const response = await fetch(`${BASE_URL}/interview/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.text();
};

export const getMessages = async (sessionId: number) => {
  const response = await fetch(
    `${BASE_URL}/interview/messages/${sessionId}`
  );

  return response.json();
};