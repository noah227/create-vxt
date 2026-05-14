export const vUtils = {
    isValidPackageName(projectName = "") {
        return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
    },
    toValidPackageName(projectName = "") {
        const name = projectName
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/^[._]/, '')
            .replace(/[^a-z0-9-~]+/g, '-')
        return name === "-" ? "" : name
    }
}