"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProfs = listProfs;
function listProfs(profs) {
    const list = profs.map((p) => `<li>${p.nome} - ${p.sala} </li>`);
    return `<ul> ${list.join('')} </ul>`;
}
