const test = {
    state: {
        count : 0,
    },

    mutations: {
        increment(state){
            state.count++
        }
    },
    action: {
        increment(context){
            context.commit("increment")
        }
    }
}

export default test;