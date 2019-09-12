const EDIT_FLAG = '/:boardnum/edit/:flag';

const routes = {
  edit: (id, flag) => {
    if (id) {
      console.log(id);
      return `/${id}/edit/${flag}`;
    } else {
      return EDIT_FLAG;
    }
  },
};

export default routes;
