const video = document.getElementById('video');
let attendance = [];

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream);
}

async function markAttendance() {
  const name = document.getElementById('name').value;
  if (!name) return alert('Enter Name');

  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detection) return alert('Face not detected');

  const now = new Date();
  const record = {
    name,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

  attendance.push(record);

  const table = document.getElementById('attendance');
  const row = table.insertRow();
  row.insertCell(0).innerText = record.name;
  row.insertCell(1).innerText = record.date;
  row.insertCell(2).innerText = record.time;
}

function downloadCSV() {
  let csv = 'Name,Date,Time\n';
  attendance.forEach(a => {
    csv += `${a.name},${a.date},${a.time}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'attendance.csv';
  a.click();
}
