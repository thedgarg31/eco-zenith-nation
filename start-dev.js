const { spawn } = require('child_process');
const path = require('path');

console.log('Starting development servers...');

// Start backend server
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

backend.on('error', (error) => {
  console.error('Backend server error:', error);
});

frontend.on('error', (error) => {
  console.error('Frontend server error:', error);
});