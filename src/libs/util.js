let util = {};
util.title = function (title) {
    /*TODO 2. 修改title */
    title = title ? title : '';
    window.document.title = title;
};

/*Cookie*/
util.setCookie = function (cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    //console.info(document.cookie);
};

util.getCookie = function (cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return null;
};

util.combine = function (rows) {
    function exists(rows, parentId) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id === parentId) return true;
        }
        return false;
    }

    let nodes = [];
    // get the top level nodes
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (!exists(rows, row.parent_id)) {
            nodes.push(row);
        }
    }

    let toDo = [];
    for (let i = 0; i < nodes.length; i++) {
        toDo.push(nodes[i]);
    }
    while (toDo.length) {
        let node = toDo.shift();    // the parent node
        // get the children nodes
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            if (row.parent_id === node.id) {
                let child = row;
                if (node.children) {
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
};

export default util;