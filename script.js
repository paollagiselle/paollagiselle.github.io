//criando um array para as barras
let blocks = [];

//função para gerar as barras
//cria 10 barras,mas esse valor pode ser alterado
function generateBlocks(num = 10) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    blocks = [];
    
    //criando num barras
    for (let i = 0; i < num; i++) {
      // valor aleatório entre 1 e 100
      const value = Math.floor(Math.random() * 100) + 10;
  
      // contêiner da barra + número
      const barContainer = document.createElement("div");
      barContainer.style.display = "flex";
      barContainer.style.flexDirection = "column";
      barContainer.style.alignItems = "center";
  
      //criando a barra com altura proporcional ao número(value*3px)
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = value * 3 + "px";
      bar.dataset.value = value;
  
      //número abaixo barra
      const label = document.createElement("div");
      label.textContent = value;
      label.style.marginTop = "5px";
      label.style.fontSize = "0.8em";
      label.style.color = "#222";
  
      //montando a barra e o núemro no contêiner
      barContainer.appendChild(bar);
      barContainer.appendChild(label);
      container.appendChild(barContainer);
  
      //guardamos barContainer também
      blocks.push({ value, bar, barContainer });
    }
  }
  
//função para ordenar as barras
async function bubbleSort() {
  //n é o número de barras
  let n = blocks.length;

  //laço para ordenação, i é o número de elementos já no lugar certo,j as barras ainda não ordenadas
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      //barras que estão sendo comparadas em vermelho
      blocks[j].bar.style.backgroundColor = "red";
      blocks[j + 1].bar.style.backgroundColor = "red";
      
      //espera 1 segundo para visualização
      await sleep(1000);
      
      //se a barra da esquerda for maior que a da direita,chama a func de troca
      if (blocks[j].value > blocks[j + 1].value) {
        await swap(j, j + 1);
      }

      //restaurando a cor azul
      blocks[j].bar.style.backgroundColor = "steelblue";
      blocks[j + 1].bar.style.backgroundColor = "steelblue";
    }

    //barra finalizada em verde
    blocks[n - i - 1].bar.style.backgroundColor = "mediumseagreen";
  }

  //todas verdes no final
  blocks.forEach(b => (b.bar.style.backgroundColor = "mediumseagreen"));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//função de troca das barras,recebe os índices i e j para trocar de lugar
async function swap(i, j) {
    const container = document.getElementById("container");
  
    return new Promise(resolve => {
      //movendo as barras horizontalmente para simular a troca
      blocks[i].barContainer.style.transform = "translateX(35px)";
      blocks[j].barContainer.style.transform = "translateX(-35px)";
  
      setTimeout(() => {
        container.insertBefore(blocks[j].barContainer, blocks[i].barContainer);
  
        //resetando transform
        blocks[i].barContainer.style.transform = "translateX(0)";
        blocks[j].barContainer.style.transform = "translateX(0)";
  
        //troca no array
        const temp = blocks[i];
        blocks[i] = blocks[j];
        blocks[j] = temp;
  
        resolve();
      }, 300);
    });
  }
  
