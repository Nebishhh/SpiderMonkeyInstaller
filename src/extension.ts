declare module 'unzipper';

import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import { exec } from 'child_process';
import * as path from 'path';
import * as unzipper from 'unzipper';

export function activate(context: vscode.ExtensionContext) {
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

function downloadFile(url: string, dest: string, cb: () => void) {
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	const file = fs.createWriteStream(dest);
	https.get(url, (response) => {
		response.pipe(file);
		file.on('finish', () => {
			file.close(cb);
		});
	}).on('error', (err: any) => {
		fs.unlink(dest, () => {});
		vscode.window.showErrorMessage('❌ Download error: ' + err.message);
	});
}

function extractZip(zipPath: string, dest: string, cb: () => void) {
	fs.createReadStream(zipPath)
		.pipe(unzipper.Extract({ path: dest }))
		.on('close', cb)
		.on('error', (err: any) => vscode.window.showErrorMessage('❌ Extraction error: ' + err.message));
}

function setEnvironmentVariable(name: string, value: string) {
	exec(`setx ${name} "${value}"`, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`❌ Error setting env variable ${name}: ${error.message}`);
			return;
		}
		vscode.window.showInformationMessage(`✅ Environment variable ${name} set!`);
	});
}

export function deactivate() {}
