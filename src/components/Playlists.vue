<template>
    <div class="card text-start border-0 bg-dark" :class="{'is-active': selectedPlaylistSlug === undefined}">
        <router-link to="/" style="text-decoration: none;">
            <div class="card-header border-0 p-1 mb-2" style="color: #ffa500;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                </svg>　
                ホーム
            </div>
        </router-link>
        <div class="card-header border-0 p-1" style="color: #ffa500;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-list" viewBox="0 0 16 16">
            <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
            <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
            <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
            <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
            </svg>　
            プレイリスト
        </div>


        <ul class="list-unstyled">
            <template v-for="(playlist, index) in playlists">
                <router-link v-if="!playlist.editing" :to="'/playlist/' + playlist.slug" :key="playlist.slug" :class="{'is-active': selectedPlaylistSlug === playlist.slug}" style="text-decoration: none; color: white;">
                    <li class="bg-transparent text-light border-bottom my-1">{{ playlist.name }}</li>
                </router-link>

                <form v-if="playlist.editing" @submit.prevent="edit_playlist(index)">
                    <div class="form-group">
                        <input type="text" class="form-control mb-1" v-model="playlist.name">
                        <button type="submit" class="btn btn-outline-info"><small>決定</small></button>
                    </div>
                </form>

                <div style="color: lime;">
                    <a title="編集" @click="edit_playlist(index)" style="margin-right: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </a>
                    <a title="削除" @click="delete_playlist(index)" style="margin-right: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </a>

                    <template v-if="addingEnabled">
                        <a v-if="!playlist.adding" @click="add_songs(index)" title="追加" style="margin-right: 10px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </a>
                        <a v-if="playlist.adding" @click="add_songs(index)" title="削除" style="margin-right: 10px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </a>
                    </template>
                </div>

            </template>
        </ul>

        <form @submit.prevent="add_playlist">
            <div class="input-group pt-3" style="width: 90%;">
                <input type="text" class="form-control" placeholder="プレイリスト #1" v-model="newPlaylistName">
                <button class="input-group-text bg-success bg-gradient text-light" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>&nbsp;
                    追加
                </button>
            </div>
        </form>
        <small class="text-light">※ 半角英数のみ使用可</small>
    </div>
</template>

<script>
import localforage from 'localforage'

export default {
    props: {
        addingEnabled: {
            type: Boolean,
            default: false,
            required: false
        },
        selectedPlaylistSlug: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            newPlaylistName: '',
            playlists: []
        }
    },
    watch: {
        playlists: {
            handler(playlists) {
                localforage.setItem('playlists', playlists)
            },
            deep: true
        },
        selectedPlaylistSlug(slug) {
            this.$emit('setPlaylist', this.playlists.find(pl => pl.slug === slug))
        }
    },
    methods: {
        add_playlist() {
            this.playlists.push({
                name: this.newPlaylistName,
                slug: this.slugify(this.newPlaylistName),
                adding: false,
                editing: false,
                songs: []
            })
            this.newPlaylistName = ''
        },
        add_songs(index) {
            this.playlists[index].adding = !this.playlists[index].adding

            this.$emit('setActivePlaylists', this.playlists.filter(pl => pl.adding === true))
        },
        delete_playlist(index) {
            this.playlists.splice(index, 1)
        },
        edit_playlist(index) {
            this.playlists[index].editing = !this.playlists[index].editing
        },
        slugify(name) {
            return name.toString().toLowerCase().trim()
            .replace(/\s+/g, '-')
            .replace(/&/g, '-and-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')

        }
    },
    created() {
        localforage.getItem('playlists')
        .then(data => {
            if (data !== null) {
                this.playlists = data

                this.playlists.forEach((pl, index) => {
                    this.playlists[index].adding = false
                    this.playlists[index].editing = false
                })
            }
        })
        .then(() => {
            if (this.selectedPlaylistSlug !== undefined) {
                this.$emit('setPlaylist', this.playlists.find(pl => pl.slug === this.selectedPlaylistSlug))
            }
        })
    }

}
</script>