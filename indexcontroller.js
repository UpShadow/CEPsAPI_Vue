const vcep = {
    data() {
        return { 
            estados: "",
            estado: "", 
            cidades: "",
            cidade: "", 
            referencia:"", 
            data: "",
            info: "",
        }
    },
    methods: {
        pegaCidade(estado) {
            axios
            .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ estado + '/municipios')
            .then(response => {
                this.cidades = response.data;
                this.cidade = this.cidades[0].nome;
            })
        },
        carregaCep() {
            axios
            .get('https://viacep.com.br/ws/' + this.estado + '/' + this.cidade + '/'+ this.referencia + '/json/')
            .then(response => { this.info = response.data })
            .catch(err => { this.info = err })
        },
    },
    mounted() {//executado no momento q carrega a pagina
        axios
            //carrega o estado e dps chama a função que carrega a cidade do estado
            .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => { 
                this.estados = response.data
                this.estado = this.estados[0].sigla
                this.pegaCidade(this.estado)
            }) 

    },
    template:
        `
        <div class="container border rounded mt-4 mb-4 pt-2 pb-3 w-25 min-vh-25 min-vw-25">
            <div class="d-flex flex-column pb-3 w-25">
                <span>Estado:</span>
                <select class="form-select form-select-sm" v-model="estado" @change="pegaCidade(estado)">
                    <option v-for="c in this.estados">{{c.sigla}}</option>
                </select>
            </div>

            <div class="d-flex flex-column pb-3 w-100">
                <span>Cidade:</span>
                <select class="form-select form-select-sm" v-model="cidade">
                    <option v-for="c in this.cidades">{{c.nome}}</option>
                </select>       
            </div>
            
            <div class="d-flex flex-column pb-3 w-100">
                <span>Digite uma referência:</span>
                <input name="referencia" type="text" v-model="referencia" size="30"/> 
            </div>

            <button @click="carregaCep()" class="d-grid gap-2 col-6 mx-auto btn btn-outline-dark">buscar CEPs</button>
        </div>

        <div>
            <table class="table table-striped table-hover border w-75 min-vh-75 min-vw-75 position-absolute top-50 start-50 translate-middle mt-5 mb-4">
                <thead>
                    <tr>
                        <th scope="col">CEP</th>
                        <th scope="col">Logradouro</th>
                        <th scope="col">Complemento</th>
                        <th scope="col">Bairro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="c in this.info">
                        <td>{{c.cep}}</td>
                        <td>{{c.logradouro}} </td>
                        <td>{{c.complemento}} </td>
                        <td>{{c.bairro}} </td>
                    </tr>
                </tbody>
            </table>
        </div>
        `
};

Vue.createApp(vcep).mount('#cep')//vcep = objeto, pode ter mais de 1