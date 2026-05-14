import {cancel, confirm, intro, isCancel, outro, text} from "@clack/prompts"
import {TUserInput} from "./types";
import path from "node:path"
import {ableToUseDir, copyFiles, emptyDir} from "./utils";
import fs from "node:fs"
import {vUtils} from "./utils.external";

async function main() {
	intro("create-vxt --- To create an extension app based on vite.")

	const userInput: TUserInput = {
		appName: "",
		appFullPath: "",
		shouldOverwriteExistDir: false,
		cwd: process.cwd()
	}

	// Args prepare: User input.
	const appName = await text({
		message: "Name of your extension:",
		placeholder: "MyExtension"
	})

	if (isCancel(appName)) {
		cancel("Operation cancelled")
		return process.exit(0)
	}

	userInput.appName = appName
	// Name validate
	if (!vUtils.isValidPackageName(appName)) {
		const result = await text({
			message: "Invalid name, input again: ",
			initialValue: vUtils.toValidPackageName(appName),
			validate(value) {
				return vUtils.isValidPackageName(value) ? undefined : "Invalid name, try again!"
			}
		})
		if (isCancel(result)) {
			cancel("Operation cancelled")
			return process.exit(0)
		}
		userInput.appName = result
	}

	userInput.appFullPath = path.join(userInput.cwd, userInput.appName)

	if (!ableToUseDir(userInput)) {
		const result = await confirm({
			message: `<${userInput.appName}> is not empty, overwrite and continue?`,
			initialValue: false
		})

		if (isCancel(result)) {
			cancel("Operation cancelled")
			return process.exit(0)
		}

		userInput.shouldOverwriteExistDir = result
		if (!userInput.shouldOverwriteExistDir) {
			// won't overwrite, operation cancelled!
			cancel("Won't overwrite, operation cancelled")
			process.exit(0)
		}
	}

	// Start!
	// Prepare directory
	if (userInput.shouldOverwriteExistDir) emptyDir(userInput.appFullPath)
	if (!fs.existsSync(userInput.appFullPath)) fs.mkdirSync(userInput.appFullPath)


	copyFiles(userInput)

	console.log(userInput)
	outro("App created, have fun!")
}

void main()