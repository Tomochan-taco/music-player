<template>
    <div class="container bg-dark" style="min-width: 960px;">
        <div class="row">
            <div class="col-3">
                <div class="p-4">
                    <playlists :selectedPlaylistSlug="selectedPlaylistSlug" @setPlaylist="set_playlist" />
                </div>
            </div>

            <div class="col-9">
                <table class="table mt-4 text-light">
                    <sort :songs="songs" @sortedSongs="sort_songs" />
                    <paginated :items="sortedSongs">
                        <template slot="custom_column" slot-scope="songList">
                            <a @click="delete_song(songList.song)" class="button is-small is-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>
                            </a>
                        </template>
                    </paginated>
                </table>

            </div>
        </div>
        <player />
    </div>
</template>

<script>
import MusicSort from '@/components/MusicSort.vue'
import PaginatedTableBody from '@/components/PaginatedTableBody.vue'
import Playlists from '@/components/Playlists.vue'

export default {
    components: {
        'sort': MusicSort,
        'paginated': PaginatedTableBody,
        'playlists': Playlists
    },
    data() {
        return {
            selectedPlaylist: {},
            selectedPlaylistSlug: this.$route.params.slug,
            songs: [],
            sortedSongs: []
        }
    },
    methods: {
        sort_songs(data) {
            this.sortedSongs = data
        },
        set_playlist (playlist) {
            this.selectedPlaylist = playlist
            this.songs = playlist.songs
        },
        delete_song(song) {
            this.selectedPlaylist.songs.splice(this.selectedPlaylist.songs.indexOf(song), 1)
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.selectedPlaylistSlug = to.params.slug
        next()
    }
}
</script>