import {mapState, useStore} from "vuex";
import {computed} from "vue";

export function useState(mapper) {
    const store = useStore();
    const storeStateFns = mapState(mapper);
    const storeState = {}
    Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({$store: store});
        storeState[fnKey] = computed(fn);
    })

    return storeState
}