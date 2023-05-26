export function loadFile(fileName, content) {
    let aLink = document.createElement('a')
    let blob = new Blob([content], {
        type: 'text/plain',
    })
    let evt = new Event('click')
    aLink.download = fileName
    aLink.href = URL.createObjectURL(blob)
    aLink.click()
    URL.revokeObjectURL(blob)
}
