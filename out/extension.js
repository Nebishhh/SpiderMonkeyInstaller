"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const unzipper = __importStar(require("unzipper"));
function activate(context) {
    console.log('SpiderMonkey Installer Extension is now active!');
    let disposable = vscode.commands.registerCommand('spidermonkeyInstaller.installSpiderMonkey', async () => {
        const downloadUrl = 'https://ftp.mozilla.org/pub/spidermonkey/releases/91.7.0esr/arm64/spidermonkey-91.7.0esr.zip';
        const downloadPath = path.join(context.globalStorageUri.fsPath, 'spidermonkey.zip');
        const installDir = path.join(context.globalStorageUri.fsPath, 'SpiderMonkey');
        vscode.window.showInformationMessage('Downloading SpiderMonkey...');
        downloadFile(downloadUrl, downloadPath, () => {
            vscode.window.showInformationMessage('Extracting SpiderMonkey...');
            extractZip(downloadPath, installDir, () => {
                vscode.window.showInformationMessage('Setting environment variables...');
                setEnvironmentVariable('JS_HOME', installDir);
                setEnvironmentVariable('PATH', `${installDir};%PATH%`);
                vscode.window.showInformationMessage('✅ SpiderMonkey installation completed!');
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function downloadFile(url, dest, cb) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => { });
        vscode.window.showErrorMessage('❌ Download error: ' + err.message);
    });
}
function extractZip(zipPath, dest, cb) {
    fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: dest }))
        .on('close', cb)
        .on('error', (err) => vscode.window.showErrorMessage('❌ Extraction error: ' + err.message));
}
function setEnvironmentVariable(name, value) {
    (0, child_process_1.exec)(`setx ${name} "${value}"`, (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage(`❌ Error setting env variable ${name}: ${error.message}`);
            return;
        }
        vscode.window.showInformationMessage(`✅ Environment variable ${name} set!`);
    });
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map