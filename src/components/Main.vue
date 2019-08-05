<template>
  <div>
    <header>
      <h1>Reading List</h1>
    </header>
    <div class="wrapper">
      <div class="left">
        <h2>Find Books</h2>
        <input type="text" name="search_term" v-model="search_term" v-on:keyup.enter="search" />&nbsp;
        <button @click="search">Search</button>
        <ul v-if="book_search_results.length > 0" v-model="book_search_results" class="search_list">
          <li v-for="(book, index) in book_search_results" class="search_list__item">
            <span @click="addBook(index)" class="add_book_icon">&plus;</span>
            <i>{{book.title}}</i> | {{book.author}}
          </li>
        </ul>
      </div>

      <div class="right">
        <!--<Detail title="default title" v-if="books.length > 0" />-->
        <div v-if="books.length > 0">
          <h2>Reading List</h2>
          <p><i>(click &amp; drag to reorder list, or click to view additional information)</i></p>
          <draggable v-model="books" group="people" @start="drag=true" @end="drag=false">
            <div v-for="(book, index) in books" class="list__book">
              <span @click="showDetail(book)" class="list__book__title">
                {{index+1}}. <i>{{book.title}}</i> | {{book.author}}
              </span>
              <span @click="removeBook(index)" class="close-thik"></span>
            </div>
          </draggable>
          <div>
            Sort by: 
            <button @click="sortBooks('title')">Title</button>&nbsp;
            <button @click="sortBooks('pageCount')">Page Count</button>
          </div>
        </div>
      </div>

    </div>
    <footer>
      <p>powered by <a href="https://developers.google.com/books/" target="_blank">Google Books API</a></p>
    </footer>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
  name: 'Main',
  props: {
  },
  data() {
    return {
      book_search_results: [],
      books: [],
      search_term: '',
    }
  },
  components: {
    draggable
  },
  methods: {
    addBook: function (index) {
      this.books.push(this.book_search_results[index]);
    },
    removeBook: function (index) {
      this.books.splice(index, 1);
    },
    showDetail: function (book) {
      this.$router.push({ 
        name: 'detail', 
        params: { 
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          date: book.date,
          pageCount: book.pageCount
        } 
      });
    },
    sortBooks: function (option) {
      if (this.books.length > 0) {
        let booksArray = this.books.slice(0);
        if (option === "title") {
          function compare(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) 
              return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) 
              return 1;
            return 0;
          }
          this.books = booksArray.sort(compare);
        }
        if (option === "pageCount") {
          function compare(a, b) {
            if (a.pageCount < b.pageCount) 
              return -1;
            if (a.pageCount > b.pageCount) 
              return 1;
            return 0;
          }
          this.books = booksArray.sort(compare);
        }
      }
    },
    search: function () {
      var encoded_search_term = encodeURI(this.search_term);
      this.book_search_results = [];
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + encoded_search_term)
      .then(response => {
        var authors = [];
        response.data.items.forEach(item => {
          var authors = item.volumeInfo.authors.join(',');
          //console.log(item.volumeInfo);
          this.book_search_results.push({ 
            title: item.volumeInfo.title, 
            author: authors, 
            publisher: item.volumeInfo.publisher,
            date: item.volumeInfo.publishedDate,
            pageCount: parseInt(item.volumeInfo.pageCount)
          });
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
}

.center {
  text-align: center;
}

.left {
  flex: 0 0 50%;
}

.right {
  flex: 1;
}

.add_book_icon {
  background: #008000;
  border: 1px solid black;
  color: #FFFFFF;
  cursor: default;
  font-weight: 700;
  padding: 6px 10px;
  margin-right: 0.5em;
}

.list__book {
  border: 1px solid grey;
  margin: 24px auto;
  padding: 8px;
  text-align: left;
  width: 75%;
}

.list__book__title {
  cursor: default;
}

ul.search_list {
  border: 1px solid #DEDEDE;
  list-style-type: none;
  padding: 1em;
  text-align: left;
  width: 100%;
}

.search_list__item {
  margin: 16px 0;
  padding: 0;
}

a {
  color: #42b983;
}

.close-thik:after {
  background: #800000;
  border: 1px solid #000000;
  color: #FFFFFF;
  content: '✖'; /* UTF-8 symbol */
  cursor: default;
  margin: -4px;
  padding: 0 4px 2px 4px;
  float: right;
}

footer {
  font-size: 0.8em;
  font-style: italic;
}
</style>
