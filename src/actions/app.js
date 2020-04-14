export const UPDATE_PAGE = 'UPDATE_PAGE';


export const navigate = (path) => (dispatch) => {
    const pathname = location.pathname;
  const page = pathname === '/' ? 'view1' : pathname.slice(1);
  dispatch(loadPage(page));

};

const loadPage = (page) => (dispatch) => {
  switch(page) {
    case 'view1':
      import('../components/my-view1.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'estimate':
      import('../components/my-view2.js');
      break;
    default:
      page = 'view404';
      import('../components/my-view404.js');
  }

  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

export const updateLocationURL = (url) => (dispatch) => {
    window.history.pushState({}, '', url);
    dispatch(navigate(window.location));
};
