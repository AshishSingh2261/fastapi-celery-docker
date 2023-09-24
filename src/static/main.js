(function() {
  console.log('Sanity Check!');
})();

function handleClick(type) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type: type }),
  })
  .then(response => response.json())
  .then(data => {
    getStatus(data.task_id, initialStatusPrint = true)
  })
}


function getStatus(taskID, initialStatusPrint) {
  fetch(`/tasks/${taskID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(res => {
    console.log(res);
    var taskStatus = res.task_status;
    var taskResult = res.task_result;
    if (taskStatus === 'SUCCESS' || taskStatus === 'FAILURE' || initialStatusPrint == true) {
        const html = `
        <tr>
            <td>${taskID}</td>
            <td>${taskStatus}</td>
            <td>${taskResult}</td>
        </tr>`;
        const newRow = document.getElementById('tasks').insertRow(0);
        newRow.innerHTML = html;
        initialStatusPrint = false;
    }

    if (taskStatus === 'SUCCESS' || taskStatus === 'FAILURE') return false;
    setTimeout(function() {
      getStatus(res.task_id, initialStatusPrint)
    }, 2000);
  })
  .catch(err => console.log(err));
}
