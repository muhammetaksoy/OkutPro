export enum Endpoint {

  auth_login = 'Logon/Authenticate',
  auth_register = 'Logon/Register',
  auth_addPhoneNumber = 'Logon/AddPhoneNumber',
  auth_verifySms = 'Logon/VerifySms',


  

  product_get = 'product/get',
  product_list = 'product/list',
  product_listBySearch = 'product/listBySearch',
  product_paged = 'product/paged',
  product_create = 'product/create',
  product_update = 'product/update',
  product_delete = 'product/delete',
  product_pricetype_list = 'product/pricetype/list',

  category_list = 'category/list',
  category_paged = 'category/paged',
  category_create = 'category/create',
  category_update = 'category/update',
  category_delete = 'category/delete',

  firm_get = 'firm/get',
  firm_list = 'firm/list',
  firm_update = 'firm/update',
}
