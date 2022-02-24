<template>
    <tbody class="align-middle">
        <template v-for="(song, index) in paginatedItems">
            <tr style="text-align: left;" :key="song.id">
                <audio id="sound" :src="song.songSrc"></audio>
                <th scope="row" style="vertical-align: middle;">
                    <span style="padding-right: 10px;">{{ index + 1 }}</span>
                    <span v-if="isPlaying && currentSongIndex === index" @click="stopSong(index)" style="display: inline-block; vertical-align: middle;" class="text-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                        </svg>
                    </span>
                    <span v-else @click="playSong(index)" style="display: inline-block; vertical-align: middle;" class="text-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                        </svg>
                    </span>
                </th>
                <td>
                    {{ song.title }} &nbsp;
                    <slot name="add_title" :song="song"></slot> 
                </td>
                <td>{{ song.artist }}</td>
                <td>{{ song.album }}</td>
                <td><img style="height: 50px;" :src="song.src" /></td>
                <td><slot name="custom_column" :song="song"></slot></td>
            </tr>
        </template>
    </tbody>
</template>

<script>

export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        per_page: {
            type: Number,
            required: false,
            default: 10
        }
    },
    data() {
        return {
            page: 1,
            isPlaying: false,
            currentSongIndex: 0
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.items.length / this.per_page)
        },
        paginatedItems() {
            return this.items.slice(0, this.page * this.per_page)
        }
    },
    created() {
        window.addEventListener('scroll', e => {
            if (this.page >= this.totalPages) return
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
                this.page++
            }
        })
    },
    watch: {
        items() {
            this.page = 1
        }
    },
    methods: {
        playSong(index) {
            this.currentSongIndex = index;
            this.isPlaying = true;
            document.getElementById('sound').pause();
            document.getElementById('sound').currentTime = 0;
            document.getElementById('sound').play();
        },
        stopSong(index) {
            this.isPlaying = false,
            document.getElementById('sound').pause();
            document.getElementById('sound').currentTime = 0;
        }
    }

}
</script>