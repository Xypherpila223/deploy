function redirect() {
    fetch('/redirect')
      .then(response => {
        if (response.ok) {
          console.log('Redirecting...');
          window.location.href = response.url;
        } else {
          console.error('Failed to redirect');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  