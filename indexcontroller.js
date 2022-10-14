const vapp = {
    data(){
        return {mensagem:'Olá Vue'}
    },
    methods:{
        mudaMensagem(){
            this.mensagem='Olá Vue 3.0'
        }
    },
    template: 
    `{{mensagem}}
    <button @click="mudaMensagem()">Trocar mensagem</button>
    `
};

const vcep = {
    data() {
        return { info: "", cep:"19053300" }
    },
    methods:
    {
        carregar() {
            // https://viacep.com.br/ws/UF/Cidade/Referência/json/
            axios
            .get('https://viacep.com.br/ws/'+this.UF+'/'+this.Cidade+'/'+this.Referência+'/json/')
            .then(response => { this.info = response.data })        
        }
    },
    // mounted() {//executado no momento q carrega a pagina
    //     axios
    //         .get('https://viacep.com.br/ws/19053300/json/')
    //         .then(response => { this.info = response.data })
    // },

    template:
        `
        <div class="d-flex flex-column pb-3">
            <span>Estado:</span>
            <input name="uf" type="text" id="uf" size="2">
        </div>

        <div class="d-flex flex-column pb-3">
            <span>Cidade:</span>
            <input name="cidade" type="text" id="cidade" size="30">        
        </div>
        
        <div class="d-flex flex-column pb-3">
            <span>Digite uma referência:</span>
            <input name="referencia" type="text" id="ref" size="30"/> 
        </div>

        <button @click="carregar()">buscar CEPs</button>
        `
};

Vue.createApp(vapp).mount('#app')//vapp = objeto, pode ter mais de 1
Vue.createApp(vcep).mount('#cep')