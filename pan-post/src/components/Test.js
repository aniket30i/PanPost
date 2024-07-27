async function verifyPAN(panNumber) {
  const url = "https://lab.pixel6.co/api/verify-pan.php";

  const requestBody = {
    panNumber: panNumber,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.status === "Success") {
      console.log(data);
    } else {
      console.log("false");
    }
  } catch (error) {
    console.error("Error verifying PAN:", error);
  }
}
