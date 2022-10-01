// Fetch issues
const testAccessibility = async event => {
  event.preventDefault();

  const url = document.querySelector('#url').value;
  setLoading();

  const res = await fetch(`/api/test?url=${url}`);

  if (res.status !== 200) {
    setLoading(false);
    alert('Something went wrong!');
  } else {
    const { issues } = await res.json();
    addIssues(issues);
    setLoading(false);
  }
};

// Add issues to DOM
const addIssues = issues => {
  const issuesOutput = document.querySelector('#issues');

  issuesOutput.innerHTML = '';

  if (issues.length === 0) {
    issuesOutput.innerHTML = '<h4>No Issues Found 😊</h4>';
  } else {
    issues.forEach(issue => {
      const output = `
        <div class="card rounded bg-dark text-light mb-5 p-3">
          <div clas="card-body">
            <h4>${issue.message}</h4>
            <p class="p-3 my-3">
              ${escapeHTML(issue.context)}
            </p>
            
            <code class="bg-black p-2">
              CODE: ${issue.code}
            </code>

          </div>
        </div>
      `;

      issuesOutput.innerHTML += output;
    });
  }
};

// Set loading state
const setLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader');

  if (isLoading) {
    loader.style.display = 'block';
  } else {
    loader.style.display = 'none';
  }
};

// Escape HTML
const escapeHTML = html => {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

document.querySelector('#form').addEventListener('submit', testAccessibility);
