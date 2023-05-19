import Vue from 'vue'
import VueRouter from 'vue-router'
import Books from '../views/books/Books'
import AddBook from '../views/books/AddBook'
import EditBook from '../views/books/EditBook'
import Authors from '../views/authors/Authors'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: Books
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBook
  },
  {
    path: '/edit-book/:data',
    name: 'EditBook',
    component: EditBook
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
