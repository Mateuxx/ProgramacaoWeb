 (function() {
       const botao = document.getElementById('botao');
       const lista = document.getElementById('lista-tarefas');
       const inputNovoItem = document.getElementById('input-novo-item');
       const tarefas = ['Estudar para a prova', 'Desenvolver o trabalho prático', 'Resolver os exercícios dos slides'];
     
       tarefas.forEach(function(tarefa) {
         const listItem = document.createElement('li');
         listItem.innerHTML = tarefa;
         lista.appendChild(listItem);
       });  
       
       botao.addEventListener('click', function() {
         const listItem = document.createElement('li');
         listItem.innerHTML = inputNovoItem.value;
         inputNovoItem.value = '';
         lista.appendChild(listItem);
       });
     })();