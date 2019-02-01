var apiURL = "https://www.peopleofprint.com/wp-json/wp/v2/posts"

window.onload = function () {
    var posts = new Vue({

        el: '#app',

        data: {
            posts: [],
            authors: ["45", "417", "407" ],
            currentAuthor: "45",
            ready : false
        },

        created: function () {
            this.fetchData()
        },

        methods: {
            fetchData: function () {
                vm = this
                fetch(apiURL).then(function (posts) {
                    posts.json().then(function (posts) {
                        posts.forEach(function (post) {
                            var imgURL = post._links['wp:featuredmedia'][0].href
                            fetch(imgURL).then(function (img) {
                                img.json().then(function (img) {
                                    post.img = img
                                    vm.posts.push(post)
                                    vm.ready = true
                                })
                            })
                        })
                    })
                })
            }
        }
    })
}
