document.write("<div class='flex-container'>")

for (let i = 1; i <= 10; i++) {
    document.write("<table>")
    document.write("<tr>")
    document.write("<th colspan='2' > Produtos de " +i+ "</th>")
    document.write("<tr>")
    
    
    for (let x = 1; x <= 10; x++) {
        document.write("<tr>")
        document.write("<td>"+ i +"x" + x + "</td>")
        document.write("<td>"+ i*x+ "</td>")
        document.write("</tr>")
    }
    document.write("</table>")
}

document.write("<div>")
