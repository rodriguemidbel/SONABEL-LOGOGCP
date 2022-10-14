
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
       {id: 1, usergroup_id: 1, name: 'Rondouba Rodrigue', username: 'U202101', password: 'admin2021', telephone: '66484220', email: 'rodrigue.midbel@gmail.com', adresse: 'Secteur 24',  statut:1, isconnected: false},
        {id: 2, usergroup_id: 1, name: 'Nikiema Laurent', username: 'U202102', password: 'admin', telephone: '77505873', email: 'lnikiema@gmail.com', adresse: 'Samandin', statut:1, isconnected: false},
        {id: 3, usergroup_id: 1, name: 'Topan Zakaria', username: 'U202103', password: 'admin', telephone: '76403214', email: 'ztopan@logo_services.com', adresse: 'Somgandé, secteur 13', statut:1, isconnected: false},
        {id: 4, usergroup_id: 1, name: 'SAWADOGO karim', username: 'sawadogo.karim', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 5, usergroup_id: 1, name: 'KOUGWINDEGA DRAMANE', username: 'kougwindega.dramane', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 6, usergroup_id: 1, name: 'ZIGANI Théodore', username: 'zigani.theodore', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 7, usergroup_id: 1, name: 'DIALLO Abdramane', username: 'diallo.abdramane', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 8, usergroup_id: 1, name: 'LOMPO Léa Claudine', username: 'lompo.lea', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 9, usergroup_id: 1, name: 'TRAORE Stéphanie', username: 'traore.stephanie', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 10, usergroup_id: 1, name: 'ZONGO Idrissa', username: 'zongo.idrissa', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 11, usergroup_id: 1, name: 'LAMIZANA Salif', username: 'lamizana.salif', password: 'SONABEL2020', telephone:'', email:'',adresse:'', statut:1, isconnected: false},
        {id: 12, usergroup_id: 1, name: 'TIENDREBEOGO Wend Kuni Viviane', username: 'tiendrebeogo.viviane', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 13, usergroup_id: 1, name: 'SAWADOGO Raissa', username: 'sawadogo.raissa', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 14, usergroup_id: 1, name: 'ZONGO Souleymane', username: 'zongo.souleymane', password: 'SONABEL2020', telephone:'', email:'', adresse:'',statut:1, isconnected: false},
        {id: 15, usergroup_id: 1, name: 'GOUBA Benjamin', username: 'gouba.benjamin', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 16, usergroup_id: 1, name: 'ZONGO Sayouba', username: 'zongo.sayouba', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 17, usergroup_id: 1, name: 'DMP', username: 'dmp', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 18, usergroup_id: 1, name: 'NADIE Abzeta', username: 'nadie.abzeta', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 19, usergroup_id: 1, name: 'DIANDA Martine', username: 'dianda.martine', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 20, usergroup_id: 1, name: 'TRAORE Amidou', username: 'traore.amidou', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false},
        {id: 21, usergroup_id: 1, name: 'TINTO Issoufou', username: 'tinto.issoufou', password: 'SONABEL2020', telephone:'', email:'', adresse:'', statut:1, isconnected: false}
      ]);
    });
};
