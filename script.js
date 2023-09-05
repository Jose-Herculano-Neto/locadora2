class Veiculo {
  constructor(placa, marca, modelo) {
    this.placa = placa;
    this.marca = marca;
    this.modelo = modelo;
    this.alugado = false;
  }

  alugar() {
    if (!this.alugado) {
      this.alugado = true;
      return true;
    }
    return false;
  }

  devolver() {
    if (this.alugado) {
      this.alugado = false;
      return true;
    }
    return false;
  }
}

class Frota {
  constructor() {
    this.veiculos = [];
  }

  listarDisponiveis() {
    return this.veiculos.filter((veiculo) => !veiculo.alugado);
  }

  listarAlugados() {
    return this.veiculos.filter((veiculo) => veiculo.alugado);
  }

  cadastrarVeiculo(placa, marca, modelo) {
    const veiculo = new Veiculo(placa, marca, modelo);
    this.veiculos.push(veiculo);
    return veiculo;
  }

  excluirVeiculo(placa) {
    const index = this.veiculos.findIndex((veiculo) => veiculo.placa === placa);
    if (index !== -1) {
      if (!this.veiculos[index].alugado) {
        this.veiculos.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  alugarVeiculo(placa) {
    const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);
    if (veiculo && !veiculo.alugado) {
      veiculo.alugar();
      return true;
    }
    return false;
  }

  devolverVeiculo(placa) {
    const veiculo = this.veiculos.find((veiculo) => veiculo.placa === placa);
    if (veiculo && veiculo.alugado) {
      veiculo.devolver();
      return true;
    }
    return false;
  }
}

const frota = new Frota();

document.addEventListener('DOMContentLoaded', () => {
  const cadastrarForm = document.getElementById('cadastrar-form');
  const alugarForm = document.getElementById('alugar-form');
  const devolverForm = document.getElementById('devolver-form');
  const excluirForm = document.getElementById('excluir-form');
  const veiculosDisponiveis = document.getElementById('veiculos-disponiveis');
  const veiculosAlugados = document.getElementById('veiculos-alugados');

  cadastrarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const placa = document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;

    const veiculo = frota.cadastrarVeiculo(placa, marca, modelo);
    atualizarListas();
    cadastrarForm.reset();
  });

  alugarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const placa = document.getElementById('placa-alugar').value;

    if (frota.alugarVeiculo(placa)) {
      atualizarListas();
    } else {
      alert('O veículo não está disponível para aluguel.');
    }

    alugarForm.reset();
  });

  devolverForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const placa = document.getElementById('placa-devolver').value;

    if (frota.devolverVeiculo(placa)) {
      atualizarListas();
    } else {
      alert('O veículo não está alugado ou não existe.');
    }

    devolverForm.reset();
  });

  excluirForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const placa = document.getElementById('placa-excluir').value;

    if (frota.excluirVeiculo(placa)) {
      atualizarListas();
    } else {
      alert('Não foi possível excluir o veículo.');
    }

    excluirForm.reset();
  });

  function atualizarListas() {
    veiculosDisponiveis.innerHTML = '';
    veiculosAlugados.innerHTML = '';

    const disponiveis = frota.listarDisponiveis();
    const alugados = frota.listarAlugados();

    disponiveis.forEach((veiculo) => {
      const li = document.createElement('li');
      li.textContent = `${veiculo.placa} - ${veiculo.marca} ${veiculo.modelo}`;
      veiculosDisponiveis.appendChild(li);
    });

    alugados.forEach((veiculo) => {
      const li = document.createElement('li');
      li.textContent = `${veiculo.placa} - ${veiculo.marca} ${veiculo.modelo}`;
      veiculosAlugados.appendChild(li);
    });
  }

  atualizarListas(); 
});
