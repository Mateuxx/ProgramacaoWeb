import { Tech } from './helpersTypes'

export function listTechs (techs: Tech[]) {
    const list = techs.map( (t) =>{
        if(t.poweredByNodejs) {
            return`<li> ${t.name} - ${t.type} </li>`
        }
    })
    return `<ul>${list.join('')}</ul>`
    
}