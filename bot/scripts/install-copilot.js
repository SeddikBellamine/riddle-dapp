const fs = require('fs');
const path = require('path');
const { chmodSync, mkdirSync } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const https = require('follow-redirects').https;

const streamPipeline = promisify(pipeline);

const platform = process.platform;
const arch = process.arch;

let copilotBinaryName = 'copilot';
let platformSegment = '';

if (platform === 'darwin') {
  platformSegment = arch === 'arm64' ? 'darwin-arm64' : 'darwin-amd64';
} else if (platform === 'linux') {
  platformSegment = arch === 'arm64' ? 'linux-arm64' : 'linux';
} else if (platform === 'win32') {
  platformSegment = 'windows';
  copilotBinaryName = 'copilot.exe';
} else {
  console.error(`Unsupported platform: ${platform}-${arch}`);
  process.exit(1);
}

const url = `https://github.com/aws/copilot-cli/releases/latest/download/copilot-${platformSegment}`;
const destDir = path.join(__dirname, '../bin');
const destPath = path.join(destDir, copilotBinaryName);

async function downloadCopilot() {
  try {
    mkdirSync(destDir, { recursive: true });

    const file = fs.createWriteStream(destPath);
    await new Promise((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download Copilot CLI: ${response.statusCode}`));
        } else {
          response.pipe(file);
        }

        file.on('finish', () => {
          file.close(resolve);
        });

        file.on('error', reject);
      }).on('error', reject);
    });

    chmodSync(destPath, 0o755);
    console.log(`✅ Copilot CLI installed at ${destPath}`);
  } catch (err) {
    console.error(`❌ Error installing Copilot CLI: ${err.message}`);
    process.exit(1);
  }
}

downloadCopilot();
