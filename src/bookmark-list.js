import $ from 'jquery';
import store from './store';
import cuid from 'cuid';
import api from './api';

function createHeadingSection() {
  return `
    <section class="heading">
      <h1>Bookmarks</h1>
    </section>
  `;
}

function createNewAndFilterButtonsSection() {
  return `
    <section class="buttons">
      <div class="left-button">
        <button id="new">+ New</button>
      </div>
      <div class="right-button">
        <form id="rating-filter">
          <label for='rating' class='sort'>SORT</label>
          <select name="" id="rating">
            <option value="">Filter By</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </form>
      </div>
    </section>
  `;
}


function createLiElement(singleBookmark) {
  if (singleBookmark.expanded) { // Check against expanded category
    return `
      <li id="${singleBookmark.id}">
        <div class="li-title expanded-title">
          <div class="left-li-block">
            <p>${singleBookmark.title}</p>
          </div>
          <div class="right-li-block">
            <p>${singleBookmark.rating} Stars</p>
          </div>
        </div>
        <div class="expanded-info">
          <div class="expanded-buttons">
            <div class="left-button">
              <button class="edit" id="edit">Edit</button>
            </div>
            <div class="right-button">
              <button id="delete" class="delete">Delete</button>
            </div>
          </div>
          <div class="expanded-top">
            <div class="visit-container">
            <a href="${singleBookmark.url}" target="_blank"><button class="visit-button" id="visit">Visit Site</button></a>
            </div>
            <div class="expanded-star">
              <p>${singleBookmark.rating} Stars</p>
            </div>
          </div>
          <div class="description">
            <div class="expanded-description">
              <p>${singleBookmark.desc}</p>
            </div>
          </div>
        </div>
      </li>
    `;
  }

  return `
    <li id="${singleBookmark.id}">
      <div class="li-title">
        <div class="left-li-block">
          <p>${singleBookmark.title}</p>
        </div>
        <div class="right-li-block">
          <p>${singleBookmark.rating} Stars</p>
        </div>
      </div>
    </li>
  `;
}

function createAllLiElements(allBookmarks, filter) {
  let filt = parseInt(filter);
  const filtArr = allBookmarks.filter(bookmark => parseInt(bookmark.rating) >= filt);
  const liArr = filtArr.map(bookmark => {
    return createLiElement(bookmark);
  });

  const liEl = liArr.join('');

  return `
    <section class="bookmark-display">
      <ul>
        ${liEl}
      </ul>
    </section>
  `;
}


function createFormSection() {
  if (store.error === 'url') {
    return `
      <section class="new-bookmark-section">
        <form id="new-bookmark-form">
          <div class="link-text-container">
            <label for="link-text">Make sure your url has http(s):// in front!</label>
            <input type="text" name="url" id="link-text" placeholder="https://" required>
          </div>
          <div class="description-container">
            <label for="link-text" class='addTit'>Add Title</label>
            <input type="text" name="title" id="link-title" placeholder="Link Title" required>
            <fieldset>
            <legend>Stars</legend>
            <div class="star-input">
              <p>Rating: </p>
              <div class="star">
                <label for="star-1">1</label>
                <input type="radio" name="rating" id="star-1" value="1">
              </div>
              <div class="star">
                <label for="star-2">2</label>
                <input type="radio" name="rating" id="star-2" value="2">
              </div>
              <div class="star">
                <label for="star-3">3</label>
                <input type="radio" name="rating" id="star-3" value="3">
              </div>
              <div class="star">
                <label for="star-4">4</label>
                <input type="radio" name="rating" id="star-4" value="4">
              </div>
              <div class="star">
                <label for="star-5">5</label>
                <input type="radio" name="rating" id="star-5" value="5" checked>
              </div>
            </div>
            </fieldset>
            <textarea name="desc" id="" cols="30" rows="10" placeholder="Add a description (optional)" value=""></textarea>
          </div>
        </form>
        <div class="form-buttons">
          <div class="left-button">
            <button id="cancel">Cancel</button>
          </div>
          <div class="right-button">
            <button type="submit" id="create" form="new-bookmark-form">Create</button>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="new-bookmark-section">
      <form id="new-bookmark-form">
        <div class="link-text-container">
          <label for="link-text">Add a new bookmark</label>
          <input type="text" name="url" id="link-text" placeholder="https://" required>
        </div>
        <div class="description-container">
          <label for="link-title" class='addTit'>Add Title</label>
          <input type="text" name="title" id="link-title" placeholder="Link Title" required>
          <fieldset>
          <legend>Stars</legend>
          <div class="star-input">
            <p>Rating: </p>
            <div class="star">
              <label for="star-1">1</label>
              <input type="radio" name="rating" id="star-1" value="1">
            </div>
            <div class="star">
              <label for="star-2">2</label>
              <input type="radio" name="rating" id="star-2" value="2">
            </div>
            <div class="star">
              <label for="star-3">3</label>
              <input type="radio" name="rating" id="star-3" value="3">
            </div>
            <div class="star">
              <label for="star-4">4</label>
              <input type="radio" name="rating" id="star-4" value="4">
            </div>
            <div class="star">
              <label for="star-5">5</label>
              <input type="radio" name="rating" id="star-5" value="5" checked>
            </div>
          </div>
          </fieldset>
          <label for='desc'>Description</label>
          <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Add a description (optional)" value=""></textarea>
        </div>
      </form>
      <div class="form-buttons">
        <div class="left-button">
          <button id="cancel">Cancel</button>
        </div>
        <div class="right-button">
          <button type="submit" id="create" form="new-bookmark-form">Create</button>
        </div>
      </div>
    </section>
  `;
}

function createUpdateSection() {
  if (store.error === 'url') {
    return `
      <section class="new-bookmark-section">
        <form id="update-bookmark-form">
          <div class="link-text-container">
            <label for="link-text">Make sure your url has http(s):// in front!</label>
            <input type="text" name="url" id="link-text" placeholder="https://" required>
          </div>
          <div class="description-container">
            <label for="link-title" class='addTit'>Add Title</label>
            <input type="text" name="title" id="link-title" placeholder="Link Title" required>
            <fieldset>
          <legend>Stars</legend>
            <div class="star-input">
              <p>Rating: </p>
              <div class="star">
                <label for="star-1">1</label>
                <input type="radio" name="rating" id="star-1" value="1">
              </div>
              <div class="star">
                <label for="star-2">2</label>
                <input type="radio" name="rating" id="star-2" value="2">
              </div>
              <div class="star">
                <label for="star-3">3</label>
                <input type="radio" name="rating" id="star-3" value="3">
              </div>
              <div class="star">
                <label for="star-4">4</label>
                <input type="radio" name="rating" id="star-4" value="4">
              </div>
              <div class="star">
                <label for="star-5">5</label>
                <input type="radio" name="rating" id="star-5" value="5" checked>
              </div>
            </div>
            </fieldset>
            <textarea name="desc" id="" cols="30" rows="10" placeholder="Add a description (optional)" value=""></textarea>
          </div>
        </form>
        <div class="form-buttons">
          <div class="left-button">
            <button id="cancel">Cancel</button>
          </div>
          <div class="right-button">
            <button type="submit" id="update" form="update-bookmark-form">Update</button>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="new-bookmark-section">
      <form id="update-bookmark-form">
        <div class="link-text-container">
          <label for="link-text">Update a bookmark</label>
          <input type="text" name="url" id="link-text" placeholder="https://" required>
        </div>
        <div class="description-container">
          <label for="link-title" class='addTit'>Add Title</label>
          <input type="text" name="title" id="link-title" placeholder="Link Title" required>

          <fieldset>
          <legend>Stars</legend>
          <div class="star-input">
            <p>Rating: </p>
            <div class="star">
              <label for="star-1">1</label>
              <input type="radio" name="rating" id="star-1" value="1">
            </div>
            <div class="star">
              <label for="star-2">2</label>
              <input type="radio" name="rating" id="star-2" value="2">
            </div>
            <div class="star">
              <label for="star-3">3</label>
              <input type="radio" name="rating" id="star-3" value="3">
            </div>
            <div class="star">
              <label for="star-4">4</label>
              <input type="radio" name="rating" id="star-4" value="4">
            </div>
            <div class="star">
              <label for="star-5">5</label>
              <input type="radio" name="rating" id="star-5" value="5" checked>
            </div>
          </div>
          </fieldset>
          <label for='desc'>Description</label>
          <textarea name="desc" id="desc" cols="30" rows="10" placeholder="Add a description (optional)" value=""></textarea>
        </div>
      </form>
      <div class="form-buttons">
        <div class="left-button">
          <button id="cancel">Cancel</button>
        </div>
        <div class="right-button">
          <button type="submit" id="update" form="update-bookmark-form">Update</button>
        </div>
      </div>
    </section>
  `;
}

function createHomePage() {
  const heading = createHeadingSection();
  const homeButtons = createNewAndFilterButtonsSection();
  const list = createAllLiElements(store.localBookmarks, store.filter);

  return heading + homeButtons + list;
}

function createFormPage() {
  const heading = createHeadingSection();
  const form = createFormSection();

  return heading + form;
}

function createEditPage() {
  const heading = createHeadingSection();
  const form = createUpdateSection();

  return heading + form;
}

function renderMain() {
  let createdPage = null;

  if (store.editing) {
    createdPage = createEditPage();
  } else if (store.adding) {
    createdPage = createFormPage();
  } else {
    createdPage = createHomePage();
  }

  $('body').html(createdPage);
}

function clickNew() {
  $('body').on('click', '#new', function (e) {
    e.preventDefault();
    store.adding = true;

    renderMain();
  });
}

function clickCancel() {
  $('body').on('click', '#cancel', function (e) {
    e.preventDefault();

    store.adding = false;
    store.editing = false;
    store.edId = null;

    renderMain();
    clickEdit();
    clickDelete();
  });
}

$.fn.extend({
  serializeJson: function (id = null) {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    o.id = cuid();
    return JSON.stringify(o);
  }
});

function submitNew() {
  $('body').on('submit', '#new-bookmark-form', function (e) {
    e.preventDefault();
    const url = $("input[name=url]").val();
    if (/^(http)s?:\/\/(.)*/g.test(url) === false) {
      store.error = 'url';
      renderMain();
    } else {
      let newObj = $(e.target).serializeJson();

      api.createBookmark(newObj)
        .then(obj => {
          store.addNewBookmark(obj);
          store.adding = false;
          store.error = null;
          renderMain();
        });
    }
  });
}

function clickBookmark() {
  $('body').on('click', '.li-title', function (e) {
    const id = $(this).parent().attr('id');
    const index = store.findIndex(id);

    // use id to update api and then re-render
    store.toggleExpanded(index);
    renderMain();
    clickEdit();
    clickDelete();
  });
}

function clickEdit() {
  $('li').on('click', '.edit', function (e) {
    const id = $(this).parent().parent().parent().parent().attr('id');
    const index = store.findIndex(id);

    store.editing = true;
    store.edId = id;

    renderMain();
    clickEdit();
    clickDelete();
  });
}

function submitUpdate() {
  $('body').on('submit', '#update-bookmark-form', function (e) {
    e.preventDefault();
    const url = $("input[name=url]").val();

    if (/^(http)s?:\/\/(.)*/g.test(url) === false) {
      store.error = 'url';
      renderMain();
    } else {
      const title = $("input[name=title]").val();
      const rating = $("input[name=rating]:checked").val();
      const desc = $("textarea[name=desc]").val();

      const newObj = JSON.stringify({
        url: url,
        title: title,
        rating: rating,
        desc: desc,
      });

      api.updateBookmark(store.edId, newObj)
        .then(() => {
          const parsedObj = JSON.parse(newObj);
          store.changeBookmark(store.edId, parsedObj);
          store.editing = false;
          store.edID = null;
          store.error = null;
          renderMain();
          clickEdit();
          clickDelete();
        });
    }

  });
}

function clickDelete() {
  $('li').on('click', '.delete', function () {
    const id = $(this).parent().parent().parent().parent().attr('id');
    api.deleteBookmark(id)
      .then(() => {
        store.removeBookmark(id);
        renderMain();
        clickEdit();
        clickDelete();
      });



    renderMain();
    clickEdit();
    clickDelete();
  });
}

function clickRatingFilter() {
  $('body').on('change', '#rating-filter', function (e) {
    const selectedVal = $('#rating-filter option:selected').val();
    if (selectedVal === '') {
      store.filter = '0';
    } else {
      store.filter = selectedVal;
    }

    renderMain();
  });
}

export default {
  renderMain,
  clickNew,
  clickCancel,
  submitNew,
  clickBookmark,
  clickEdit,
  submitUpdate,
  clickDelete,
  clickRatingFilter,
};