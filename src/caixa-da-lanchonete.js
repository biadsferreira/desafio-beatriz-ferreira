class CaixaDaLanchonete {
   constructor() {
      this.cardapio = {
         cafe: { descricao: "Café", valor: 3.0 },
         chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
         suco: { descricao: "Suco Natural", valor: 6.2 },
         sanduiche: { descricao: "Sanduíche", valor: 6.5 },
         queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
         salgado: { descricao: "Salgado", valor: 7.25 },
         combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
         combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
      };
      this.formasPagamento = ["dinheiro", "debito", "credito"];
   }

   calcularValorDaCompra(formaDePagamento, itens) {
      if (!this.formasPagamento.includes(formaDePagamento)) {
         return "Forma de pagamento inválida!";
      }

      if (itens.length === 0) {
         return "Não há itens no carrinho de compra!";
      }

      let valorTotal = 0;
      const itensComprados = {};

      for (const itemInfo of itens) {
         const [itemCodigo, quantidade] = itemInfo.split(",");
         const item = this.cardapio[itemCodigo];

         if (!item) {
            return "Item inválido!";
         }

         if (!itensComprados[itemCodigo]) {
            itensComprados[itemCodigo] = { quantidade: 0, item };
         }

         itensComprados[itemCodigo].quantidade += parseInt(quantidade, 10);
      }

      for (const item of Object.values(itensComprados)) {
         valorTotal += item.item.valor * item.quantidade;
      }

      if (formaDePagamento === "dinheiro") {
         valorTotal *= 0.95; // 5% de desconto
      } else if (formaDePagamento === "credito") {
         valorTotal *= 1.03; // 3% de acréscimo
      }

      return `R$ ${valorTotal.toFixed(2)}`;
   }
}

module.exports = CaixaDaLanchonete;
