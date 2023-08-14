import React, { Component } from "react";
import CaixaDaLanchonete from "./caixa-da-lanchonete"; // Verifique o caminho correto

class LanchoneteApp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         formaDePagamento: "dinheiro",
         itens: [],
         valorTotal: 0,
         mensagem: "",
      };
      this.caixa = new CaixaDaLanchonete();
   }

   handleFormaPagamentoChange = (event) => {
      this.setState({ formaDePagamento: event.target.value });
   };

   handleItemChange = (event, item) => {
      const { itens } = this.state;
      const newItem = event.target.checked ? item : null;

      const updatedItens = itens.filter((i) => i !== item);
      if (newItem) {
         updatedItens.push(newItem);
      }

      this.setState({ itens: updatedItens });
   };

   calcularValorTotal = () => {
      const { formaDePagamento, itens } = this.state;
      const valorTotal = this.caixa.calcularValorDaCompra(
         formaDePagamento,
         itens
      );
      this.setState({ valorTotal });
   };

   render() {
      const { formaDePagamento, itens, valorTotal } = this.state;

      return (
         <div>
            <h1>Lanchonete App</h1>
            <div>
               <label>
                  Forma de Pagamento:
                  <select
                     value={formaDePagamento}
                     onChange={this.handleFormaPagamentoChange}
                  >
                     <option value="dinheiro">Dinheiro</option>
                     <option value="debito">Débito</option>
                     <option value="credito">Crédito</option>
                  </select>
               </label>
            </div>
            <div>
               <h2>Itens do Pedido</h2>
               {Object.keys(this.caixa.cardapio).map((itemCodigo) => {
                  const item = this.caixa.cardapio[itemCodigo];
                  return (
                     <label key={itemCodigo}>
                        <input
                           type="checkbox"
                           checked={itens.includes(item)}
                           onChange={(event) =>
                              this.handleItemChange(event, item)
                           }
                        />
                        {item.descricao}
                     </label>
                  );
               })}
            </div>
            <div>
               <button onClick={this.calcularValorTotal}>Calcular Valor</button>
            </div>
            <div>
               <h2>Valor Total</h2>
               <p>{`R$ ${valorTotal.toFixed(2)}`}</p>
            </div>
         </div>
      );
   }
}

export default LanchoneteApp;
