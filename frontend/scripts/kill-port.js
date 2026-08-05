import { execSync } from 'child_process';

const ports = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['5173', '8080'];

for (const port of ports) {
  try {
    if (process.platform === 'win32') {
      const stdout = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const lines = stdout.split('\n');
      const pids = new Set();
      for (const line of lines) {
        if (line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') pids.add(pid);
        }
      }
      for (const pid of pids) {
        console.log(`[kill-port] Terminating process on port ${port} (PID: ${pid})...`);
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        } catch (e) {}
      }
    } else {
      try {
        execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
      } catch (e) {}
    }
  } catch (e) {
    // Port was not in use
  }
}
