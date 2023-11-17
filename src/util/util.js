import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getSongDetails() {
  const id = localStorage.getItem("id");

  const response = await fetch("https://stg.dhunjam.in/account/admin/" + id);

  if (!response.ok) {
    const error = new Error("Something went Wrong");
    error.info = "An error occurred while fetching the data";
    throw error;
  }

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export async function sendSongDetails(songData) {
  const id = localStorage.getItem("id");

  const response = await fetch(`https://stg.dhunjam.in/account/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(songData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("Something went Wrong");
    error.info = "An error occurred while updating the songs details";
    throw error;
  }

  return response.json();
}
