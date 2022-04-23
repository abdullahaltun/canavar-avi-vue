new Vue ({
    el:'#app',
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : []
    } ,
    methods : {
        start_game : function(){
            this.game_is_on = true
        },
        attack : function(){
            const point = Math.ceil(Math.random()*10)
            this.monster_heal-=point
            this.add_to_log({turn : 'P' , text: 'OYUNCU ATAGI('+ point +')'})
            this.monster_attack()
            console.log("M:"+ this.monster_heal)
            console.log("P:"+ this.player_heal)

        },
        special_attack : function(){
            const point = Math.ceil(Math.random()*25)
            this.monster_heal-=point
            this.add_to_log({turn : 'P' , text: 'ÖZEL OYUNCU ATAGI('+ point +')'})
            this.monster_attack()
            console.log("M:"+ this.monster_heal)
            console.log("P:"+ this.player_heal)
        },
        heal_up : function(){
            const point = Math.ceil(Math.random()*20)
            this.player_heal+=point
            this.add_to_log({turn : 'P' , text: 'İLKYARDIM('+ point +')'})
            this.monster_attack()
            console.log("M:"+ this.monster_heal)
            console.log("P:"+ this.player_heal)
        },
        give_up : function(){
            this.player_heal = 0
        },
        monster_attack : function (){
            const point = Math.ceil(Math.random()*15)
            this.player_heal-=point
            this.add_to_log({turn : 'M' , text: 'CANAVAR ATAGI('+ point +')'})
        },
        add_to_log : function (log){
            this.logs.push(log)
        }

    },
    watch : {
        player_heal : function (value) {
            if(value <= 0) {
             this.player_heal = 0
             if(confirm('Oyunu kaybettin,tekrar başlamak ister misin?')){
                 this.player_heal = 100
                 this.monster_heal = 100
                 this.logs = []
             }
            }
            else if (value >= 100) {
                this.player_heal = 100
            }
        },
        monster_heal : function (value) {
            if(value <= 0) {
                this.monster_heal = 0
                if(confirm('Oyunu kazandın,tekrar başlamak ister misin?')){
                    this.player_heal = 100
                    this.monster_heal = 100
                    this.logs = []
                }
            }
        }
    }
})