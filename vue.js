window.onload = function () {
    var posts = new Vue({

        el: '#app',

        data: {
            posts: [],
            authors: [],
            currentAuthor: "",
            apiURL: "https://www.peopleofprint.com",
            ready : false
        },

        created: function () {
            this.fetchData()
        },


        methods: {
            fetchData: function () {
                vm = this
                vm.ready = false
                vm.posts =  []
                endurl = "/wp-json/wp/v2/posts"
                url = vm.apiURL + endurl
                fetch(url).then(function (posts) {
                    posts.json().then(function (posts) {
                        vm.fetchAuthors(posts, vm)
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
            },

            fetchAuthors(posts, vm){
                const authorsTable = []
                vm.authors = posts.map(p =>{
                    authorsTable.push(p.author)
                })
                vm.authors = [...new Set(authorsTable)]
                vm.currentAuthor = vm.authors[0]
            }
        }
    })
}
