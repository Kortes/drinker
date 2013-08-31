//process.env.YENV = 'production';

MAKE.decl('Arch', {

    libraries: {
        'libs/bem-bl': {
           type: 'git',
           url: 'git://github.com/bem/bem-bl.git',
           treeish: '0.3'
        },
        'libs/clever-bem-lib': {
           type: 'git',
           url: 'git@bitbucket.org:cleversite/clever-bem-lib.git',
           treeish: '0.6.2'
        }
    }
});

MAKE.decl('BundleNode', {
    getTechs: function() {
        return this.__base().concat([]);
    }
});

MAKE.decl('BundlesLevelNode', {
     buildMergedBundle: function() {
         return true;
     }
});
