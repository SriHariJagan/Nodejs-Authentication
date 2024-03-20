document.addEventListener('DOMContentLoaded', function() {
    generate();
  });
  
  function generate() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    // Generate random text
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    // Generate random number
    result += Math.floor(Math.random() * 1000);
  
    let btn = document.getElementById('output-text');
    btn.value = result;
  }