async function loadWords() {
  const res = await fetch('data/words.json');
  const data = await res.json();

  const today = new Date().toISOString().split('T')[0];
  const words = data[today] || [];

  const container = document.getElementById('words');
  container.innerHTML = '';

  if (words.length === 0) {
    container.innerHTML = '<p>No data available for today.</p>';
    return;
  }

  words.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'word-card';
    div.innerHTML = `
      <h3>${index + 1}. ${item.word}</h3>
      <p><strong>বাংলা অর্থ:</strong> ${item.meaning}</p>
      <p><strong>উদাহরণ বাক্য:</strong> ${item.example}</p>
    `;
    container.appendChild(div);
  });
}

loadWords();
