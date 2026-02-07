# Selenium Automation Testing - DEMO
#### Web - Automated Testing
MDG 2026

---
# Environment Versions
- macOS Tahoe Version 26.2 (25C56)
- Homebrew 5.0.13
- node v25.5.0
- Yarn 1.22.22
- Google Chrome Version 144.0.7559.110
- ChromeDriver 144.0.7559.96
- Jest 30.2.0
- TypeScript 5.9.3
---
# Install Instruction
1. In terminal, navigate to project root directory
2. Run *yarn install*

---
# Test Suites
```
Status Legend

🔵 LEGACY  
⚫ TBD  
⚪ INCOMPLETE  
🟡 IN PROGRESS  
🟢 READY
```

### 🟢 ALL 🟢
- yarn test

### 🔵 SMOKE TEST 🔵
Pure TypeScript
- *yarn smoke-legacy*
### ⚪ SMOKE TEST ⚪
- *yarn smoke*
### 🟡 BUILD ACCEPTANCE TEST 🟡
- *mkdir logs*
- *touch CREDENTIALS.json*
```
CREDENTIALS.json template
{
	"personal": {
		"email": "",
		"password": ""
	},
	"demo": {
		"email": "",
		"password": ""
	}
}
```
- yarn bat
### ⚫ REGRESSION ⚫ 
- TBD
