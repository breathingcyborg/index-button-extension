export const downloadJson = (json: Object, filename: string = 'service-account.json') => {

    // Convert object to JSON string
    const jsonString = JSON.stringify(json, null, 2);

    // Create a Blob object from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; // Filename you want to download

    // Append the anchor element to the body
    document.body.appendChild(a);

    // Trigger the click event on the anchor element
    a.click();

    // Clean up: Remove the anchor element
    document.body.removeChild(a);

    // Optionally, revoke the URL to release memory
    URL.revokeObjectURL(url);
  };