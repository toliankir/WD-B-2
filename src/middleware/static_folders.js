const express = require('express');
const path = require('path');
const appRootDir = require('../helpers/app_root_dir');

module.exports = function (app) {
    app.use(express.static(path.join(appRootDir, 'public')));

    const jqueryDir = path.dirname(require.resolve('jquery'));
    app.use('/assets', express.static(jqueryDir));

    const bootstrapDir = path.dirname(path.dirname(require.resolve('bootstrap')));
    app.use('/assets', express.static(bootstrapDir));
}
