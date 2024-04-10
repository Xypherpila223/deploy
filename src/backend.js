document.getElementById('getStudentAccountsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    fetch('/admincrud')
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        data.forEach(student => {
          const studentDiv = document.createElement('div');
          studentDiv.textContent = `ID: ${student.ID}, Username: ${student.username}, Password: ${student.password}`;
          resultsDiv.appendChild(studentDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching student accounts:', error);
        const resultsDiv = document.getElementById('results');
        resultsDiv.textContent = 'Error fetching student accounts. Please try again.';
      });
  });
  