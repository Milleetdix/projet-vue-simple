var apiURL = 'https://www.peopleofprint.com/wp-json/wp/v2/posts'


window.onload = function () {
    var posts = new Vue({

        el: '#app',

        data: {
            posts: [],
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
                            var imgURL = "https://www.peopleofprint.com/wp-json/wp/v2/media/"+post.featured_media
                            console.log(imgURL)
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
