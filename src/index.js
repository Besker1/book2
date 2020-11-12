import './style.css';
import store from './store';
import templates from './templates';
import api from './api';
import $ from 'jquery';
// const setupEventListeners = () => {

//     main page event listeners

//     // change page to add bookmark form (add bookmark form button on main page)
//     window.addEventListener('click', (e)=>{
//         if (e.target.id === 'mainpage-button-newbookmark') {
//             store.page = 'add';
//             render();
//         }
//     });

//     // delete bookmark item with id
//     window.addEventListener('click', (e)=>{
//         // handle button click
//         if (e.target.classList.contains('bookmark-item-button-delete')) {
//             const id = e.target.parentNode.parentNode.id;
//             api.deleteBookmark(id, ()=>{
//                 render();
//             })
//         }
//     });

      

//     // individual bookmark item view descriptions on main page
//     window.addEventListener('click', (e)=>{
//         // handle button click
//         if (e.target.classList.contains('show') || e.target.classList.contains('bookmark-item') && !e.target.classList.contains('bookmark-item-button-delete')) {
//             e.target.classList.toggle("expanded");
//         }
//     });

//         // individual bookmark item view descriptions on main page

//     // filter by rating on main page
//     window.addEventListener('change', (e)=>{
//         // set the rating value in store
//         if (e.target.id === 'mainpage-filter') {
//             store.filter = Number(e.target.value);
//             render();
//         }
//     });

//         // filter by rating on main page
  


//     add bookmark page event listeners

//     // change page to main page (add bookmark form cancel button)
//     window.addEventListener('click', (e)=>{
//         // handle button click
//         if (e.target.id === 'addbookmark-cancel') {
//             store.page = 'main';
//             render();
//         }
//     });

    
//     // add bookmark form submit (add bookmark form submit button)
//     window.addEventListener('submit', (e)=>{
//         // handle form submit
//         if (e.target.id === 'addbookmark-form') {
//             e.preventDefault();
//             const form = e.target;
//             const formData = new FormData(form);
//             const title = formData.get("addbookmark-title");
//             const url = formData.get("addbookmark-url");
//             const desc = formData.get("addbookmark-description");
//             const rating = parseInt(formData.get("addbookmark-rating"));
            
//             const bookmark = {
//                 title,
//                 url,
//                 desc,
//                 rating
//             }

         

//             console.log('this is the bookmark app', bookmark) // eslint-disable-line no-console
//             api.createBookmark(bookmark, ()=>{
//                 store.page = 'main';
//                 render();
//             })
//         }
//     });
     

// }        

//// this is not part of the grading requirement, so this shouldn't bother you :)

//jquery breakdown

   // // change page to add bookmark form (add bookmark form button on main page)

   const newBookmark = ()=> {
      $("main").on('click', "#mainpage-button-newbookmark",(e) => {
      store.page = 'add';
      render();  
      console.log('i was clicked')

    })
   }
   

            // // delete bookmark item with id
    const handleDelete = () => {
       $('.bookmark-item-button-delete').on('click', (e) => {
              //     // handle button click
              console.log('click me delete')
          const id = e.target.parentNode.parentNode.id;
          api.deleteBookmark(id, ()=>{
              render();
          })
        })
    }
       
////expand the description view 
const hnadleExpansion = ()=>  {
$('main').on("click", '.bookmark-item-button-expand',(e) =>{
  console.log('click me expand')
  $('.bookmark-item-content-wrapper').toggleClass("expanded")
  render();
})
}

//handle filter values
const handleFilter = () => {
  $('main').on('change', 'select', (e) => {
                // set the rating value in store
          store.filter = Number($('select').val());
          render();
      })
}
  
//handle cancel button
const handleCancel = () => {

    $('#addbookmark-cancel').on('click', (e) => {
      store.page = 'main';
      render();
    })
}

    // // add bookmark form submit (add bookmark form submit button)
  const addBookmark = () => {
   $('main').on('submit', "#addbookmark-form", (e) => {
              e.preventDefault();
              const title = $("#addbookmark-title").val()
              const url = $('#addbookmark-url').val()
              const desc = $("#addbookmark-description").val()
              const rating  = $("#addbookmark-rating").val()

              const bookmark = {
                title,
                url,
                desc,
                rating
            }

            api.createBookmark(bookmark, ()=>{
              store.page = 'main';
              render();
          })
            })

    }

const render = () => {
    // run template function based on current page
    // if main render main page
    // if add render add bookmark page
    let main = ''

    console.log(store.page == 'add')
    if ( store.page === 'main' ) {
       api.getBookmarks(bookmarks => {
            store.bookmarks = bookmarks.map(b => {
                if ("expanded" in b) return b;
                return {...b,expanded:false}

            });
            
            main = templates.main_page(store); //render main page using template function templates.main_page;
            $('main').html(main)
          });
    }

    if ( store.page === 'add' ) {
        main= templates.addbookmark_page();//render add bookmark page using template function templates.addbookmark_page;
        $('main').html(main)
      }


}

const main = () => {
    // setup event listeners
    // setupEventListeners();
    // then render
    render();
    handleCancel();
    handleDelete();
    handleFilter();
    hnadleExpansion();
    addBookmark()
    newBookmark()
}

$(main);