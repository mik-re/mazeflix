import {mapActions, mapState} from "vuex";
import {actionTypes} from "@/store/modules/shows";
import MfxLoader from "@/components/Loader.vue";
import MfxErrorMessage from "@/components/ErrorMessage.vue";

export default {
    components: {
        MfxLoader,
        MfxErrorMessage
    },
    created() {
        //while routing through the app
        //shows are saved in the store.
        //don't need to call the service
        if (this.shows) return;

        this.fetchShowsFeed()
    },
    methods: {
        ...mapActions({
            fetchShowsFeed: actionTypes.fetchShowsFeed
        }),
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.shows.isSubmitting,
            shows: state => state.shows.shows,
            error: state => state.shows.validationErrors,
            categories: state => state.shows.categories
        }),
    }
}