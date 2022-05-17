$(document).ready(function () {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    $(".date").append(date)
    const API_KEY = 'a65162bffe460986db75c1475bcd1694'

    $('#search-btn').click(function () {
        let news = []
        const searchInput = $('#search-input').val()

        fetch(`https://gnews.io/api/v4/search?q=${searchInput}&token=${API_KEY}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                news = data.articles
                console.log(news)
                $('.grid-container').empty()
                news.forEach((newsItem, index) => {
                    $('.grid-container').append(`
                    <div data=${index} class="grid-item"  >
                        <div class="news-image">
                            <img src=${newsItem.image} alt=${newsItem.title}  />
                        </div>
                        <p>${newsItem.title}</p>
                    </div>
                `)
                });

                let index = 0
                let item

                $('.grid-item').click(function () {
                    $('.modal').toggleClass('active')
                    $('.news-section').toggleClass('active')

                    index = parseInt($(this).attr('data'))
                    item = news[index]

                    showNewsItem(item)
                })

                const showNewsItem = (item) => {
                    console.log(item)
                    $('.modal').empty()
                    $('.modal').append(`
                <div class="news-image">
                    <img src=${item.image} alt=${item.title}  />
                </div>
                <div class="news-text">
                    <i class="fa fa-times"></i>
                    <h2>${item.title}</h2>
                    <p class="news-url"><a href="${item.source.url}">Source: ${item.source.name}</a></p>
                    <p class="news-description">${item.description}</p>
                    <div class="buttons">
                        <button class="btn" id="prevBtn">&lt;</button>
                        <button class="btn" id="nextBtn">&gt;</button>
                    </div>
                </div>
                `)

                    $('#prevBtn').click(function () {
                        if (index >= 0) {
                            index = index - 1
                            index >= 0 && showNewsItem(news[index])
                        }
                    })

                    $('#nextBtn').click(function () {
                        if (index < news.length - 1) {
                            index = index + 1
                            showNewsItem(news[index])
                        }
                    })

                    $('.fa-times').click(function () {
                        $('.modal').toggleClass('active')
                    })
                    $('.fa-times').click(function () {
                        $('.news-section').toggleClass('active')
                    })
                }
            });
    })
})