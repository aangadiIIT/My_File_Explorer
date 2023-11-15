document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');
    const fileList = document.getElementById('fileList');
  
    // Fetch and display file list on page load
    fetch('/list')
      .then(response => response.json())
      .then(files => {
        files.forEach(file => {
          appendToFileList(file);
        });
      })
      .catch(error => console.error('Error fetching file list:', error));
  
    // Handle form submission for file upload
    uploadForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(uploadForm);
  
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(files => {
          fileList.innerHTML = ''; // Clear the current list
          files.forEach(file => {
            appendToFileList(file);
          });
        })
        .catch(error => console.error('Error uploading file:', error));
    });
  
    // Handle file deletion
    fileList.addEventListener('click', function (event) {
      if (event.target.tagName === 'BUTTON') {
        const filename = event.target.dataset.filename;
  
        fetch('/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename }),
        })
          .then(response => response.text())
          .then(message => {
            console.log(message);
            fileList.removeChild(event.target.parentElement);
          })
          .catch(error => console.error('Error deleting file:', error));
      }
    });
  
    // Helper function to append a file to the list
    function appendToFileList(file) {
      const li = document.createElement('li');
      li.innerHTML = `${file} <button data-filename="${file}">Delete</button>`;
      fileList.appendChild(li);
    }
  });
  