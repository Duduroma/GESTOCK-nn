# Entidades e Atributos - Sistema Gestock

## 📋 Índice
1. [Entidades Principais (Aggregate Roots)](#entidades-principais)
2. [Entidades de Valor](#entidades-de-valor)
3. [Value Objects (IDs)](#value-objects-ids)
4. [Enums](#enums)

---

## Entidades Principais (Aggregate Roots)

### 1. **Produto**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/produto/Produto.java`

**Atributos:**
- `ProdutoId id` (final, imutável)
- `String codigo`
- `String nome`
- `String unidadePeso`
- `double peso`
- `boolean perecivel`
- `boolean ativo`

**Métodos principais:**
- `atualizar(String nome, String unidadePeso, double peso)`
- `calcularPesoTotal(int quantidade)`
- `inativar()`
- `ativar()`

---

### 2. **Cliente**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/cliente/Cliente.java`

**Atributos:**
- `ClienteId id` (final, imutável)
- `String nome`
- `String documento` (CPF/CNPJ)
- `String email`
- `List<Estoque> estoques` (final, relação 1:N)

**Métodos principais:**
- `adicionarEstoque(Estoque estoque)`
- `possuiEstoques()`

---

### 3. **Estoque**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/estoque/Estoque.java`

**Atributos:**
- `EstoqueId id` (final, imutável)
- `ClienteId clienteId` (final, imutável)
- `String nome`
- `String endereco`
- `int capacidade`
- `boolean ativo`
- `Map<ProdutoId, SaldoProduto> saldos` (final)
- `Map<ProdutoId, ROP> rops` (final)
- `List<Movimentacao> movimentacoes` (final)
- `List<ReservaRegistro> reservas` (final)

**Métodos principais:**
- `registrarEntrada(ProdutoId, int, String, String, Map<String, String>)`
- `registrarSaida(ProdutoId, int, String, String)`
- `reservar(ProdutoId, int)`
- `liberarReserva(ProdutoId, int)`
- `consumirReservaComoSaida(ProdutoId, int, String, String)`
- `transferir(ProdutoId, Estoque, int, String, String)`
- `definirROP(ProdutoId, double, int, int)`
- `getSaldoFisico(ProdutoId)`
- `getSaldoReservado(ProdutoId)`
- `getSaldoDisponivel(ProdutoId)`
- `atingiuROP(ProdutoId)`

---

### 4. **Fornecedor**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/fornecedor/Fornecedor.java`

**Atributos:**
- `FornecedorId id` (final, imutável)
- `String nome`
- `String cnpj`
- `String contato`
- `LeadTime leadTimeMedio`
- `boolean ativo`
- `Map<ProdutoId, Cotacao> cotacoes` (final)

**Métodos principais:**
- `atualizarDados(String nome, String contato)`
- `registrarCotacao(ProdutoId, double, int)`
- `obterMelhorCotacao()`
- `recalibrarLeadTime(List<Integer>)`
- `obterCotacaoPorProduto(ProdutoId)`
- `removerCotacao(ProdutoId)`
- `inativar()`
- `ativar()`

---

### 5. **Pedido**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/pedido/Pedido.java`

**Atributos:**
- `PedidoId id` (final, imutável)
- `ClienteId clienteId` (final, imutável)
- `FornecedorId fornecedorId` (final, imutável)
- `LocalDate dataCriacao` (final, imutável)
- `LocalDate dataPrevistaEntrega`
- `EstoqueId estoqueId`
- `List<ItemPedido> itens` (final)
- `CustoPedido custo`
- `StatusPedido status`

**Métodos principais:**
- `adicionarItem(ItemPedido)`
- `registrarCusto(CustoPedido)`
- `enviar()`
- `registrarRecebimento()`
- `iniciarTransporte()`
- `cancelar()`
- `concluir()`
- `calcularTotalItens()`
- `calcularPesoTotal(Function<ProdutoId, Double>)`

---

### 6. **Alerta**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/alerta/Alerta.java`

**Atributos:**
- `AlertaId id` (final, imutável)
- `ProdutoId produtoId` (final, imutável)
- `EstoqueId estoqueId` (final, imutável)
- `LocalDateTime dataGeracao` (final, imutável)
- `FornecedorId fornecedorSugerido`
- `boolean ativo`

**Métodos principais:**
- `desativar()`
- `atualizarFornecedorSugerido(FornecedorId)`

---

## Entidades de Valor

### 7. **ItemPedido**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/pedido/ItemPedido.java`

**Atributos:**
- `ProdutoId produtoId` (final, imutável)
- `int quantidade` (final, imutável)
- `BigDecimal precoUnitario` (final, imutável)

**Métodos principais:**
- `getSubtotal()`
- `calcularPesoTotal(double pesoPorUnidade)`

---

### 8. **Cotacao**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/fornecedor/Cotacao.java`

**Atributos:**
- `CotacaoId id` (final, imutável)
- `ProdutoId produtoId` (final, imutável)
- `double preco`
- `int prazoDias`
- `boolean validadeAtiva`

**Métodos principais:**
- `atualizar(double novoPreco, int novoPrazo)`
- `definirValidadeAtiva(boolean)`

---

### 9. **Movimentacao**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/estoque/Movimentacao.java`

**Atributos:**
- `Long id` (final, imutável)
- `TipoMovimentacao tipo` (final, imutável)
- `ProdutoId produtoId` (final, imutável)
- `int quantidade` (final, imutável)
- `LocalDateTime dataHora` (final, imutável)
- `String responsavel` (final, imutável)
- `String motivo` (final, imutável)
- `Map<String, String> meta` (final, imutável)

---

### 10. **ReservaRegistro**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/estoque/ReservaRegistro.java`

**Atributos:**
- `ProdutoId produtoId` (final, imutável)
- `int quantidade` (final, imutável)
- `LocalDateTime dataHora` (final, imutável)
- `Tipo tipo` (final, imutável) - Enum: RESERVA ou LIBERACAO

**Métodos estáticos:**
- `reserva(ProdutoId, int)`
- `liberacao(ProdutoId, int)`

---

### 11. **Transferencia**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/estoque/Transferencia.java`

**Atributos:**
- `Long id` (final, imutável)
- `ProdutoId produtoId` (final, imutável)
- `EstoqueId estoqueOrigemId` (final, imutável)
- `EstoqueId estoqueDestinoId` (final, imutável)
- `int quantidade` (final, imutável)
- `LocalDateTime dataHora` (final, imutável)
- `String responsavel` (final, imutável)
- `String motivo` (final, imutável)

---

## Value Objects

### 12. **SaldoProduto** (Record)
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/estoque/SaldoProduto.java`

**Atributos:**
- `int fisico`
- `int reservado`

**Métodos calculados:**
- `disponivel()` → retorna `fisico - reservado`

**Métodos de transformação:**
- `comEntrada(int qtd)`
- `comSaida(int qtd)`
- `comReserva(int qtd)`
- `comLiberacao(int qtd)`

**Método estático:**
- `zero()`

---

### 13. **ROP** (Reorder Point)
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/produto/ROP.java`

**Atributos:**
- `double consumoMedio` (final, imutável)
- `int leadTimeDias` (final, imutável)
- `int estoqueSeguranca` (final, imutável)
- `int valorROP` (final, imutável) - calculado: `(consumoMedio × leadTimeDias) + estoqueSeguranca`

---

### 14. **LeadTime**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/fornecedor/LeadTime.java`

**Atributos:**
- `int dias` (final, imutável)

---

### 15. **CustoPedido**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/pedido/CustoPedido.java`

**Atributos:**
- `BigDecimal valorItens` (final, imutável)
- `BigDecimal frete` (final, imutável)
- `BigDecimal custosLogisticos` (final, imutável)

**Métodos calculados:**
- `getValorTotal()` → retorna `valorItens + frete + custosLogisticos`

---

### 16. **LoteValidade**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/produto/LoteValidade.java`

**Atributos:**
- `String lote` (final, imutável)
- `LocalDate validade` (final, imutável)

**Métodos:**
- `validadeProxima()` → retorna `true` se vence em até 7 dias

---

### 17. **CodigoProduto**
**Localização:** `dominio-principal/src/main/java/dev/gestock/sge/dominio/principal/produto/CodigoProduto.java`

**Atributos:**
- `String valor` (final, imutável) - armazenado em maiúsculas e trimado

---

## Value Objects (IDs)

### 18. **ProdutoId**
**Atributos:**
- `Long id` (final, imutável)

---

### 19. **ClienteId**
**Atributos:**
- `Long id` (final, imutável)

---

### 20. **EstoqueId**
**Atributos:**
- `Long id` (final, imutável)

---

### 21. **FornecedorId**
**Atributos:**
- `Long id` (final, imutável)

---

### 22. **PedidoId**
**Atributos:**
- `Long id` (final, imutável)

---

### 23. **AlertaId**
**Atributos:**
- `Long id` (final, imutável)

---

### 24. **CotacaoId**
**Atributos:**
- `Long id` (final, imutável)

---

## Enums

### 25. **StatusPedido**
**Valores:**
- `CRIADO`
- `ENVIADO`
- `EM_TRANSPORTE`
- `RECEBIDO`
- `CANCELADO`
- `CONCLUIDO`

---

### 26. **TipoMovimentacao**
**Valores:**
- `ENTRADA`
- `SAIDA`

---

### 27. **ReservaRegistro.Tipo**
**Valores:**
- `RESERVA`
- `LIBERACAO`

---

## 📊 Resumo Estatístico

- **Total de Entidades Principais (Aggregate Roots):** 6
- **Total de Entidades de Valor:** 5
- **Total de Value Objects:** 12
- **Total de Value Objects (IDs):** 7
- **Total de Enums:** 3
- **TOTAL GERAL:** 33 classes/records/enums

---

## 🔗 Relacionamentos Principais

- **Cliente** → possui muitos **Estoque** (1:N)
- **Estoque** → pertence a um **Cliente** (N:1)
- **Estoque** → contém saldos de muitos **Produto** (N:M via Map)
- **Estoque** → possui ROPs de muitos **Produto** (N:M via Map)
- **Estoque** → registra muitas **Movimentacao** (1:N)
- **Estoque** → registra muitas **ReservaRegistro** (1:N)
- **Fornecedor** → possui muitas **Cotacao** (1:N via Map)
- **Pedido** → pertence a um **Cliente** (N:1)
- **Pedido** → pertence a um **Fornecedor** (N:1)
- **Pedido** → pode estar vinculado a um **Estoque** (N:1, opcional)
- **Pedido** → contém muitos **ItemPedido** (1:N)
- **ItemPedido** → referencia um **Produto** (N:1)
- **Alerta** → referencia um **Produto** (N:1)
- **Alerta** → referencia um **Estoque** (N:1)
- **Alerta** → pode sugerir um **Fornecedor** (N:1, opcional)
- **Cotacao** → referencia um **Produto** (N:1)

