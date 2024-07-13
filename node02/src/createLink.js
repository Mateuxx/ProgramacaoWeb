export function createLink(filename) {
    return `<li><a href="/file?name=${encodeURIComponent(filename)}">${filename}</a></li>`;
}
