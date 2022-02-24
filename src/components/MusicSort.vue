<template>
    <thead class="align-middle bg-dark">
        <tr style="text-align: left; color: #ffa500;">
            <th scope="col" style="width: 10%;">#</th>
            <th scope="col" style="width: 25%;">
                <a @click="change_sort('title')">タイトル
                    <svg v-if="sortBy == 'title' && sortDirection == 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                    <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                    <svg v-if="sortBy == 'title' && sortDirection == 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </a>
            </th>
            <th scope="col" style="width: 25%;">
                <a @click="change_sort('artist')">アーティスト
                    <svg v-if="sortBy == 'artist' && sortDirection == 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                    <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                    <svg v-if="sortBy == 'artist' && sortDirection == 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </a>
            </th>
            <th scope="col" style="width: 25%;">
                <a @click="change_sort('album')">アルバム
                    <svg v-if="sortBy == 'album' && sortDirection == 'asc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
                    <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                    <svg v-if="sortBy == 'album' && sortDirection == 'desc'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </a>
            </th>
            <th scope="col" style="width: 10%;"></th>
            <th scope="col" style="width: 5%;"></th>
        </tr>
    </thead>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            sortBy: '',
            sortDirection: 'asc'
        }
    },
    watch: {
        songs() {
            this.sort_songs()
        }
    },
    methods: {
        change_sort(column) {
            if (this.sortBy === column && this.sortDirection === 'asc') {
                this.sortDirection = 'desc'
            } else {
                this.sortDirection = 'asc'
            }
            this.sortBy = column

            this.sort_songs()
        },
        sort_songs(column) {
            if (this.sortBy === '') {
                this.$emit('sortedSongs', this.songs)
                return
            }

            let sortModifier = (this.sortDirection === 'asc') ? 1 : -1

            let sortedSongs = this.songs.slice().sort((a, b) => {
                let colA = a[this.sortBy].toUpperCase()
                let colB = b[this.sortBy].toUpperCase()

                if (colA < colB) {
                    return -1 * sortModifier
                }
                if (colA > colB) {
                    return 1 * sortModifier
                }
                return 0
            })
            this.$emit('sortedSongs', sortedSongs)
        }
    }
}
</script>