# lista 1 

### Questão 01
-Apesar de termos algums atributos colocados em lugares diferentes como as tags: meta dentro do body, e não estando dentro do escopo da da tag <head> o principal erro de sintatico é não especificar a unidade de medida que será usada em width e height --> errado

Solução: por padrão ao usar  o width e height sem a unidade de medida, a unidade de medida padrão eh pixel(px), então eh a tag meta dentro de <head> mesmo!, este seria o erro sintático?

### questão 02
A importancia se da devido ao browser poder reservar o espaço que a imagem ocupará na tela mesmo antes de carregá-la, evitando que assim que a pagina seja carregado primeiro e as imagens depois o que pode causar mudanças no layout esperado de uma página

### Questão 03
Feita em código

### 4) Descreva o que são estilos inline, estilos embarcados, e estilos externos. Escolha um dos três tipos de estilo e demonstre sua utilização em um código HTML/CSS.

-Estilo Inline: São definidos diretamente dentro dos elementos HTMl usando os atributos, e são aplicados apenas ao elemnto especifico que estão definidos

-Estilo Embarcados: São definidos dentro do escopo da tag <head> do doc HTML, e concebidos dentro da tag <style> Eles se aplicam aos elementos ao elemenots nos quais foram especificaods

<style>

    p {
        font-size: 18px;
    }
    h1 {
        color: blue;
    }

</style>

-Estilo Externo: Semelhante ao embarcado, porem é definido em um arquivo separado no qual é vinculado ao HTML usando a tag  <link>. São aplicados a todos os elmentos do documentos nos quais é feito a referencia.

<link rel="stylesheet" type="text/css" href="styles.css">

Documento css: 


body {
    font-family: Arial, sans-serif;
}
h1 {
    color: green;
}
p {
    font-size: 18px;
}

### 