// public/scripts/app.js
document.getElementById('squareForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const input = document.getElementById('number').value;
  const resultDiv = document.getElementById('result');

  try {
    const response = await fetch('/api/square', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: input })
    });

    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p style="color: red">${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `
        <p>
          Das Quadrat von <strong>${data.input}</strong> ist <strong>${data.result}</strong>.
        </p>
      `;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p style="color: red">Fehler: ${err.message}</p>`;
  }
});