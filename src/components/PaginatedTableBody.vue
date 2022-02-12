<template>
    <tbody class="align-middle">
        <template v-for="(song, index) in paginatedItems">
            <tr style="text-align: left;" :key="song.id">
                <th scope="row">{{ index + 1 }}</th>
                <td><slot name="add_title" :song="song"></slot> {{ song.title }}</td>
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
            page: 1
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
    }

}
</script>