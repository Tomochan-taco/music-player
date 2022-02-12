<template class="bg-dark">
    <div class="container" style="min-width: 960px;">
        <div class="row">
            <div class="col-3">
                <div class="p-4 sticky-top">
                    <playlists addingEnabled @setActivePlaylists="set_active_playlists" />
                </div>
            </div>

            <div class="col-9">
                <table class="table table-striped table-hover mt-4">
                    <sort :songs="filteredSongs" @sortedSongs="sortSongs" class="sticky-top" />
                    <paginated :items="sortedSongs">
                        <template slot="add_title" slot-scope="songList" v-if="activePlaylists.length > 0">
                            <a @click="add_song(songList.song, $event.target)" class="text-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
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
import MusicData from '@/assets/list.json'
import MusicSort from '@/components/MusicSort.vue'
import PaginatedTableBody from '@/components/PaginatedTableBody.vue'
import Playlists from '@/components/Playlists.vue'
import SongPlayer from '@/components/SongPlayer.vue'

export default {
    components: {
        'sort': MusicSort,
        'paginated': PaginatedTableBody,
        'playlists': Playlists,
        'player': SongPlayer
    },
    data() {
        return {
            songs: MusicData,
            filteredSongs: MusicData,
            sortedSongs: MusicData,
            activePlaylists: [],
        }
    },
    methods: {
        filter_songs(data) {
            this.filteredSongs = data
        },
        sortSongs(data) {
            this.sortedSongs = data
        },
        set_active_playlists(playlists) {
            this.activePlaylists = playlists
        },
        add_song(song, e) {
            e.closest("tr").classList.add('flash')
            setTimeout(() => e.closest("tr").classList.remove('flash'), 1000)
            this.activePlaylists.forEach((pl, index) => {
                this.activePlaylists[index].songs.push(song)
            })
        }
    }
}
</script>

