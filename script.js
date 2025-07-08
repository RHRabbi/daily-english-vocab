async function loadWords() {
  const res = await fetch('data/words1.json');
  const data = await res.json();

  const today = new Date().toISOString().split('T')[0];
  const words = data[today] || [];

  const container = document.getElementById('words');
  container.innerHTML = '';

  if (words.length === 0) {
    container.innerHTML = '<p>No words available for today.</p>';
    return;
  }

  words.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'word-card';
    div.innerHTML = `
      <h3>
        ${index + 1}. ${item.word} 
        <button onclick="speak('${item.word}')">🔊</button>
      </h3>
      <p><strong>Pronunciation:</strong> ${item.pronunciation || 'N/A'}</p>
      <p><strong>বাংলা অর্থ:</strong> ${item.meaning}</p>
      <p><strong>উদাহরণ বাক্য:</strong> ${item.example}</p>
    `;
    container.appendChild(div);
  });
}

function speak(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support speech synthesis.');
  }
}

loadWords();
