📄 SpiderMonkey Installer for VS Code
🛠 Project Overview
The SpiderMonkey Installer for VS Code is a Visual Studio Code extension that simplifies the downloading, installing, and configuring of the SpiderMonkey JavaScript engine on Windows.
This tool eliminates manual setup steps by automating:

Downloading the latest SpiderMonkey build

Extracting files

Setting environment variables (JS_HOME, PATH)

It’s designed to make SpiderMonkey setup fast, easy, and reliable for developers.

✨ Features
✅ One-click download and installation of SpiderMonkey

✅ Automatic extraction to a predefined directory

✅ Automatic configuration of system environment variables

✅ Integration with VS Code's Command Palette

✅ Simple, user-friendly installation messages

🧪 How It Works
Open Command Palette (Ctrl + Shift + P).

Search for Install SpiderMonkey.

The extension will:

Download SpiderMonkey.

Extract it locally.

Set up environment variables.

Ready to use! 🎯

🛠 Technology Stack
TypeScript (Extension development)

Node.js (File handling, downloads, system commands)

VS Code Extension API (Commands and interaction)

unzipper npm package (Extraction)

📦 Project Structure
pgsql
Copy
Edit
spidermonkey-installer/
├── src/
│   └── extension.ts    # Main extension code
├── package.json         # Extension configuration and metadata
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
⚡ Installation Instructions (For Developers)
To clone and run locally:

bash
Copy
Edit
git clone <your-repo-url>
cd spidermonkey-installer
npm install
npm run compile
Then press F5 in VS Code to launch the Extension Development Host.

🚀 Future Improvements
Allow users to select SpiderMonkey versions.

Add installation verification (sm --version check).

Publish on the VS Code Marketplace.

👥 Team Members
Hanan Mustofa

Nebiyou Dessalegn

Tewobsta Desta

📣 Notes
Tested on Windows 10/11 environments.

Ensure you restart your terminal/VS Code after installation to refresh environment variables.

The SpiderMonkey download link may need updates when new versions are released.

🎯 Final Message
This extension empowers developers to integrate SpiderMonkey into their workflow quickly and effortlessly — making JavaScript engine experimentation accessible for all.