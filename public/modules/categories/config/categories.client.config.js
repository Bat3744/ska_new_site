'use strict';

// Configuring the Articles module
angular.module('categories').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'Categories', 'categories', 'dropdown', '/categories(/create)?');
        Menus.addSubMenuItem('topbar', 'categories', 'Liste des categories', 'categories');
        Menus.addSubMenuItem('topbar', 'categories', 'Créer une catégorie', 'categories/create');
    }
]);